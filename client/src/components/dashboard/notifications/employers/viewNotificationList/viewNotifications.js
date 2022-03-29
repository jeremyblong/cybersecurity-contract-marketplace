import React, { Fragment, useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Media } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import _ from "lodash";
import ReactPlayer from 'react-player';
import PaginationEmployerListingHelper from "../../../universal/pagination/paginationHelper.js";
import moment from "moment";
import { useHistory } from 'react-router-dom';


// pagination settings and/or setup
const itemsPerPage = 15;


const ViewNotificationListHelper = ({ userData }) => {

    const history = useHistory();

    const [ notifications, setNotifications ] = useState([]);
    const [ ready, setReady ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageCount, setPageCount ] = useState(0);
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ immutableData, setImmutableData ] = useState([]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setPageCount(Math.ceil(immutableData.length / itemsPerPage));

        setNotifications(immutableData.slice(itemOffset, endOffset));
        
    }, [ itemOffset, itemsPerPage ]);


    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId,
                accountType: userData.accountType 
            }
        }

        const promises = [];

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/account/notifications`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered notifications!") {
                console.log("successfully bookmarked profile...:", res.data);

                const { notifications } = res.data;

                for (let index = 0; index < notifications.length; index++) {
                    const notify = notifications[index];
                    
                    promises.push(new Promise(async (resolve, reject) => {
                        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/profile/pic/video/only`, {
                            params: {
                                uniqueId: notify.metadata.from
                            }
                        })

                        if (result.data.message === "Gathered resource!") {
                            const file = result.data.file;

                            notify.profilePicVideo = file;

                            resolve(notify);
                        } else {
                            resolve(null);
                        }
                    }))
                }

                Promise.all(promises).then((passedData) => {
                    console.log("passedData", passedData);

                    const endOffset = itemOffset + itemsPerPage;

                    setPageCount(Math.ceil(passedData.length / itemsPerPage));

                    setNotifications(passedData.slice(itemOffset, endOffset));
                    setImmutableData(passedData);
                    setReady(true);
                })
            } else {
                console.log("err", res.data);

                NotificationManager.error("An unknown error has occurred while attempting to gather related profile notifications! Please reload the page or contact support if the problem persists..", "Error occurred while fetching notifications!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error has occurred while attempting to gather related profile notifications! Please reload the page or contact support if the problem persists..", "Error occurred while fetching notifications!", 4750);
        })
    }, []);


    const renderProfilePicVideo = (last) => {
        if (last !== null && _.has(last, "link")) {
            if (last.type.includes("video")) {
                // video logic
                return (
                    <Media className="notification-pic-video" body>
                        <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"notification-pic-video"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                    </Media>
                );
            } else {
                // image logic
                return <Media className="notification-pic-video" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
            }  
        } else {
            // image logic
            return <Media className="notification-pic-video" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
        } 
    }

    const calculateWhereToRedirect = (data) => {
        console.log("calculateWhereToRedirect ran...!");

        if (_.has(data, "action") && data.action === "video-invite") {
            history.push(`/start/video/interview/chat/employer/${data.metadata.attachments.attachment.generatedRoomID}`);
        } else {
            
        }
    }

    const handleNotificationClick = (notification) => {
        console.log("handleNotificationClick clicked..");

        const configuration = {
            notification,
            uniqueId: userData.uniqueId,
            accountType: userData.accountType
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/mark/notification/viewed/both/account/types`, configuration).then(async (res) => {
            if (res.data.message === "Marked notification as seen!") {
                console.log("Marked notification as seen!...:", res.data);

                const { notification } = res.data;

                const findIndexNotification = notifications.findIndex((item) => item !== null && item.id === notification.id);

                const shallowCopy = [...notifications];

                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/profile/pic/video/only`, {
                    params: {
                        uniqueId: notification.metadata.from
                    }
                })

                if (result.data.message === "Gathered resource!") {
                    const file = result.data.file;

                    console.log("file", file);

                    notification.profilePicVideo = file;

                    shallowCopy[findIndexNotification] = notification;

                    console.log("shallowCopy", shallowCopy);

                    setNotifications(shallowCopy);

                    NotificationManager.success("We've successfully marked this notification as 'read' or 'seen' - you will be redirected momentarily IF this notification has any related logic, otherwise no action will be taken.", "Successfully marked as viewed/seen!", 4750);

                    calculateWhereToRedirect(notification);
                } else {
                    NotificationManager.error("An unknown error has occurred while attempting mark notification as 'viewed' & process notification logic! Please reload the page or contact support if the problem persists..", "Error occurred while fetching notifications!", 4750);
                }

                // setNotifications(notifications);
            } else {
                console.log("err", res.data);

                NotificationManager.error("An unknown error has occurred while attempting mark notification as 'viewed' & process notification logic! Please reload the page or contact support if the problem persists..", "Error occurred while fetching notifications!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error has occurred while attempting mark notification as 'viewed' & process notification logic! Please reload the page or contact support if the problem persists..", "Error occurred while fetching notifications!", 4750);
        })
    }

    return (
        <Fragment>
            <Breadcrumb parent="Notification(s), Changes & Updates" title="View & Manage Your Notification's!" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow-notification-card'>
                            <CardHeader className='b-l-primary b-r-primary'>
                                <h4 className='header-notification'>View your notifications, manage updates & more! (click notifications to be redirected approriately)</h4>
                                <p className='lead'>Click certain notifications will redirect you to the approriate changes/updates. Some notifications will not be linked to anything however some will, you can view your 'already viewed' notifications by the tinted color...</p>
                            </CardHeader>
                            <CardBody>
                                <ListGroup>
                                    {typeof notifications !== "undefined" && notifications.length > 0 ? notifications.map((notification, index) => {
                                        if (notification !== null) {
                                            return (
                                                <Fragment key={index}>
                                                    <ListGroupItem onClick={() => handleNotificationClick(notification)} className={notification.seenRead === true ? "list-group-item-action flex-column align-items-start notification-custom-notification active" : "list-group-item-action flex-column align-items-start notification-custom-notification"}>
                                                        <Row>
                                                            <Col sm="12" md="1" lg="1" xl="1">
                                                                {renderProfilePicVideo(notification.profilePicVideo)}
                                                            </Col>
                                                            <Col sm="12" md="11" lg="11" xl="11">
                                                                <div className="d-flex w-100 justify-content-between">
                                                                    <h5 className="mb-1 maxed-title-notification">{notification.title}</h5><small>{moment(notification.date).fromNow()}</small>
                                                                </div>
                                                                <p className="mb-1">{notification.description}</p>
                                                                <small>{notification.dateString}</small>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        }
                                    }) : <Fragment>
                                        <img src={require("../../../../../assets/images/no-current-notifications.png")} className={"no-notifications-img"} />
                                    </Fragment>}
                                </ListGroup>
                                <div className='notification-pagination-wrapper'>
                                    <PaginationEmployerListingHelper itemsPerPage={itemsPerPage} loopingData={immutableData} currentPage={currentPage} pageCount={pageCount} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage}  />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(ViewNotificationListHelper);