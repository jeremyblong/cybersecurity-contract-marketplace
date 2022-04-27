import React, { Fragment, useState, useMemo } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, CardHeader, Nav, NavItem, TabContent, TabPane, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button, Dropdown, DropdownItem, DropdownMenu, PaginationLink, Pagination, PaginationItem } from 'reactstrap'
import { Grid, List, Link, Share2, Trash2, Tag, Edit2, Bookmark } from 'react-feather';
import { useEffect } from 'react';
import { AddBookmark, EditBookmark, WebUrl, Title, Description, Group, General, Save, Cancel, MyBookmark, Notification, Collection, MyBookmarks } from "../../../../../constant";
import "./styles.css";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import ShowMoreText from "react-show-more-text";
import moment from "moment";
import { useHistory } from "react-router-dom";
import helpers from "./helpers/miscFunctions.js";

const { renderImageOrVideo } = helpers;

const ManageApplicantsMainHelper = ({ userData }) => {
    // create redirect possiblity
    const history = useHistory();

    const [editrow, setEditrow] = useState({})
    const [bookmarklist, setBookmarklist] = useState([]);
    const [ isExpanded, setExpandedState ] = useState({
        open0: false,
        open1: false,
        open2: false,
        open3: false,
        open4: false,
        open5: false,
        open6: false,
        open7: false,
        open8: false,
        open9: false // 10 reached
    });
    const [activeGigsJobs, setActiveGigsJobs] = useState([{
        website_url: "https://www.google.com",
        title: "This is my custom title :)",
        collection: "Unknown",
        desc: "Mauris turpis ligula, ornare sed metus et, tincidunt rutrum ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In laoreet dapibus felis, sit amet interdum metus consequat ac. Quisque eget mi eu dui iaculis fermentum tempus quis dolor. In efficitur accumsan est, eget mattis tortor rhoncus quis. Donec purus magna, sollicitudin ac bibendum id, vehicula ut enim. Nunc maximus lacinia elit et ultricies.",
        image: "https://cybersecurity-platform.s3.amazonaws.com/placeholder.png",
        fillstar: true
    }, {
        website_url: "https://www.wecodewithclarity.com",
        title: "This is my custom title :)",
        collection: "Unknown",
        desc: "Mauris turpis ligula, ornare sed metus et, tincidunt rutrum ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In laoreet dapibus felis, sit amet interdum metus consequat ac. Quisque eget mi eu dui iaculis fermentum tempus quis dolor. In efficitur accumsan est, eget mattis tortor rhoncus quis. Donec purus magna, sollicitudin ac bibendum id, vehicula ut enim. Nunc maximus lacinia elit et ultricies.",
        image: "https://cybersecurity-platform.s3.amazonaws.com/placeholder.png",
        fillstar: true
    }, {
        website_url: "https://www.yahoo.com",
        title: "This is my custom title :)",
        collection: "Unknown",
        desc: "Mauris turpis ligula, ornare sed metus et, tincidunt rutrum ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In laoreet dapibus felis, sit amet interdum metus consequat ac. Quisque eget mi eu dui iaculis fermentum tempus quis dolor. In efficitur accumsan est, eget mattis tortor rhoncus quis. Donec purus magna, sollicitudin ac bibendum id, vehicula ut enim. Nunc maximus lacinia elit et ultricies.",
        image: "https://cybersecurity-platform.s3.amazonaws.com/placeholder.png",
        fillstar: true
    }, {
        website_url: "https://www.t-mobile-inc.com",
        title: "This is my custom title :)",
        collection: "Unknown",
        desc: "Mauris turpis ligula, ornare sed metus et, tincidunt rutrum ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In laoreet dapibus felis, sit amet interdum metus consequat ac. Quisque eget mi eu dui iaculis fermentum tempus quis dolor. In efficitur accumsan est, eget mattis tortor rhoncus quis. Donec purus magna, sollicitudin ac bibendum id, vehicula ut enim. Nunc maximus lacinia elit et ultricies.",
        image: "https://cybersecurity-platform.s3.amazonaws.com/placeholder.png",
        fillstar: true
    }, {
        website_url: "https://www.github.net",
        title: "This is my custom title :)",
        collection: "Unknown",
        desc: "Mauris turpis ligula, ornare sed metus et, tincidunt rutrum ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In laoreet dapibus felis, sit amet interdum metus consequat ac. Quisque eget mi eu dui iaculis fermentum tempus quis dolor. In efficitur accumsan est, eget mattis tortor rhoncus quis. Donec purus magna, sollicitudin ac bibendum id, vehicula ut enim. Nunc maximus lacinia elit et ultricies.",
        image: "https://cybersecurity-platform.s3.amazonaws.com/placeholder.png",
        fillstar: true
    }]); // useSelector(content => content.Bookmarkapp.mybookmarkdata);
    const [activeTab, setActiveTab] = useState('1');
    const [ user, setUserData ] = useState(null);
    const [addModal, setaddModal] = useState(false)
    const [editModal, seteditModal] = useState(false)
    const [tagModal, setTagModal] = useState(false)
    const [gridView,setgridView] = useState(true);
    const [ activeBool, showActiveJobsMapped ] = useState(false);
    const [ uniqueJobArray, setUniqueJobArrayState ] = useState([]);
    const [ currentSelectedMap, setCurrentSelectedMap ] = useState("");
    // ADD toggle
    const addToggle = () => { setaddModal(!addModal) }
    // EDIT toggle
    const editToggle = () => { seteditModal(!editModal) }
    // TAG toggle
    const tagToggle = () => { setTagModal(!tagModal) }
    // MOUNTED component...
    useEffect(() => {
        const configuration = {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/general/user/data`, configuration).then((res) => {
            if (res.data.message === "Gathered user!") {
                // deconstruct user object from api-request
                const { user } = res.data;
                // log response
                console.log(res.data);

                const uniqueJobIDArray = [];

                if (typeof user.applicants !== "undefined" && user.applicants.length > 0) {
                    for (let index = 0; index < user.applicants.length; index++) {
                        const gigID = user.applicants[index].employerPostedJobId;
                        if (!uniqueJobIDArray.includes(gigID)) {
                            uniqueJobIDArray.push(gigID);
                        }
                        // check for END of array/loop
                        if ((user.applicants.length - 1) === index) {
                            setUniqueJobArrayState(uniqueJobIDArray);
                            setUserData(user);
                        }
                    }
                } else {
                    setUserData(user);
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    },[])

    const ADDUrl = (event) => {
        if (event.target.files.length === 0)
        return;
        //Image upload validation
        let mimeType = event.target.files[0].type;

        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        let reader = new FileReader();
        // fileReady logic start....
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            // setAddImgUrl(reader.result)
        }
    }

    const onSubmit = data => {
        if (data !== '') {

            setaddModal(false)
        } else {
            // errors.showMessages();
        }
    };
    const Gridbookmark = () => {
        setgridView(true)
    }

    const Listbookmark = () => {
        setgridView(false)
    }
    const calculateFileType = (applicant) => {
        const type = applicant.attachedFiles[applicant.attachedFiles.length - 1].type;

        switch (type) {
            case "video/mp4":
                return "mp4";
                break;
            case "image/png":
                return "png";
                break;
            case "image/jpeg":
                return "jpeg";
                break;
            case "image/jpg":
                return "jpg";
                break;
            case "image/gif":
                return "gif";
                break;
            case "image/bmp":
                return "bmp";
                break;
            case "application/pdf":
                return "pdf";
                break;
            case "text/csv":
                return "csv";
                break;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "xlsx";
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "docx";
                break;
            case "video/webm":
                return "webm";
                break;
            case "audio/mpeg":
                return "mp3";
                break;
            default:
                break;
        }
    };
    const changeExpandedState = (index) => {
        setExpandedState(prevState => {
            return {
                ...prevState,
                [`open${index}`]: ![`open${index}`]
            }
        });
    }
    const handleRedirectToApplication = (applicant) => {
        history.push(`/view/individual/application/employer/${applicant.applicantId}`, { applicant });
    }
    const renderMainContentMapped = (applicant, index) => {
        // return data...
        return (
            <Col style={{ marginBottom: "25px" }} xl="4 xl-50" md="6" sm="6" xs="6" key={index}>
                <div className="ribbon ribbon-clip-bottom-right ribbon-secondary absolute-ribbon-styled">File Preview</div>
                <Card className="card-with-border bookmark-customized-list-individual shadow shadow-showcase">
                    <div className="details-website">
                        <div className={"img-fluid-wrapper-custom"}>
                            {(calculateFileType(applicant)) !== ("pdf" && "csv" && "xlsx" && "docx") ? 
                            renderImageOrVideo(applicant) : <Fragment>
                                <div className="centered-both-ways icon-container-minimum-specs">
                                    <div className="custom-folder-icon-wradivper-p">
                                        <div className="ribbon-wrapper-bottom">
                                            <i id="custom-folder-icon-second-one" className={`fa fa-folder f-36 txt-info`}></i>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>}
                        </div>
                        <div className="desciption-data"> 
                            <div className="title-bookmark">
                                <h6 className="title_0 title-card-top-top">Applicant Name: {applicant.applicantName}</h6>
                                <h6 className="title_0 title-card-top-top">Fully Completed Jobs: {applicant.submittedUserData.completedJobs}</h6>
                                <h6 className="title_0 title-card-top-top">EXP/XP Points: {applicant.submittedUserData.points}</h6>
                                <h6 className="title_0 title-card-top-top">Applicant Username: {applicant.submittedUserData.username}</h6>
                                <hr />
                                <Label className="text-left-align-custom"><strong>Technical Approach: </strong></Label>
                                <ShowMoreText
                                    lines={4}
                                    more="Show More..."
                                    less="Show Less..."
                                    onClick={() => {
                                        changeExpandedState(index);
                                    }}
                                    expanded={isExpanded[`open${index}`]}
                                    width={300}
                                >
                                    {applicant.technicalApproachToHack}
                                </ShowMoreText>
                                <hr />
                                <Row className="row-two-tab">
                                    <Col md="6" lg="6" xl="6" sm="12" xs="12">
                                        <Label className="text-left-align-custom"><strong>Applied: </strong></Label>
                                        <p className="subbed-text">{moment(applicant.dateApplied).fromNow()}</p>
                                    </Col>
                                    <Col md="6" lg="6" xl="6" sm="12" xs="12">
                                        <Label className="text-left-align-custom"><strong>User Betting On "Self": </strong></Label>
                                        <p className="subbed-text">{applicant.bettingOnSelfSelected === true ? "Yes - Opted-in!" : "No, opted-out from betting."}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="centered-both-ways btn-push-bottom">
                            <Button onClick={() => {
                                handleRedirectToApplication(applicant);
                            }} style={{ width: "100%" }} className="btn-square btn-air-secondary" outline color="secondary-2x">View Application</Button>
                        </div>
                    </div>
                </Card>
            </Col>
        )
    }
    const handleSelectedJobChange = (id) => {
        console.log("handleSelectedJobChange clicked...", id);

        setCurrentSelectedMap(id);
        showActiveJobsMapped(false);
    }
    return (
        <Fragment>
        <Breadcrumb parent="Active Applicant's & Other Related Data" title="Applicant's for posted gigs/jobs and listing's" />
            <Container fluid={true}>
                <div className="email-wrap bookmark-wrap">
                <Row>
                    <Col xl="3" className="box-col-6">
                    <div className="email-left-aside">
                        <Card>
                        <CardBody className="shadow shadow-showcase">
                            <div className="email-app-sidebar left-bookmark">
                            <div className="media">
                                <div className="media-size-email"><img className="mr-3 rounded-circle" src={require("../../../../../assets/images/user/user.png")} alt="" /></div>
                                <div className="media-body">
                                    <h6 className="f-w-600" style={{ textDecorationLine: "underline", color: "#7366ff" }}>{user !== null ? `${user.firstName} ${user.lastName}` : "Loading..."}</h6>
                                    <p>{user !== null && _.has(user, "title") ? user.title : "No title provided."}</p>
                                </div>
                            </div>
                            <Nav className="main-menu" role="tablist">
                                <li>
                                    <hr />
                                </li>
                                <NavItem>
                                    <span className="main-title">Created LIVE Employer Listing(s)</span>
                                </NavItem>
                                <NavItem className={"customized-nav-item"}>
                                    <CardBody className="dropdown-basic">
                                        <Dropdown toggle={() => {}}>
                                            <div className={"allow-full-height-dropdown"}>
                                                <Button color={"primary"} className="dropbtn customized-dropdown-btn" >Active Jobs W/Applicant's ({typeof uniqueJobArray !== "undefined" && uniqueJobArray.length > 0 ? uniqueJobArray.length : 0}) <span><i className="icofont icofont-arrow-down"></i></span></Button>
                                                <DropdownMenu id={"custom-dropdown-links"} className="dropdown-content">
                                                    {typeof uniqueJobArray !== "undefined" && uniqueJobArray !== null && uniqueJobArray.length > 0 ? uniqueJobArray.map((link, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <DropdownItem className={"dropdown-link-custom-header"} header>Job ID - {link}</DropdownItem>
                                                                <DropdownItem className={"list-group-item custom-listgroup-mapped-keys"} style={{ textDecorationLine: "underline", fontWeight: 450 }} onClick={() => handleSelectedJobChange(link)}>{"View Associated Job Applicant's"}</DropdownItem>
                                                            </Fragment>
                                                        );
                                                    }) : null}
                                                </DropdownMenu>
                                            </div>
                                        </Dropdown>
                                    </CardBody>
                                </NavItem>
                                <li>
                                    <hr />
                                </li>
                                <Modal className="fade show modal-bookmark" isOpen={tagModal} toggle={tagToggle} size="lg">
                                <ModalHeader className="modal-title" toggle={tagToggle}>
                                    {"Create Tag"}
                                </ModalHeader>
                                <ModalBody>
                                    <Form className="form-bookmark needs-validation">
                                        <div className="form-row">
                                            <FormGroup className="col-md-12">
                                                <Label>{"Tag Name"}</Label>
                                                <Input type="text"/>
                                            </FormGroup>
                                            <FormGroup className="col-md-12 mb-0">
                                                <Label>{"Tag color"}</Label>
                                                <Input type="color" defaultValue="#563d7c"/>
                                            </FormGroup>
                                        </div>
                                    <Button color="secondary" onClick={tagToggle}>{Save}</Button>
                                    <Button color="primary m-l-5" onClick={tagToggle}>{Cancel}</Button>
                                    </Form>
                                </ModalBody>
                                </Modal>
                            </Nav>
                            </div>
                        </CardBody>
                        </Card>
                    </div>
                    </Col>
                    <Col xl="9" md="12" className="box-col-12">
                    <div className="email-right-aside bookmark-tabcontent">
                        <Card className="email-body radius-left">
                        <div className="pl-0">
                            <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Card className="mb-0">
                                <CardHeader>
                                    <h3 style={{ textDecorationLine: "underline", color: "#f73164" }} className="mb-0">{"Active Jobs/Gigs (Employer listings recruiting hacker's for physical/digital hack's)"}</h3>
                                    <hr />
                                    {typeof currentSelectedMap !== "undefined" && currentSelectedMap.length > 0 ? <h6 className="custom-selected-indicator">You've selected the listing with an ID of <strong style={{ color: "blue" }}>{currentSelectedMap}</strong></h6> : <h6 className="custom-selected-indicator">You <strong style={{ color: "blue" }}> have NOT </strong> selected a listing/posted-job yet, if you'd like to see the applicant for a specific job, click the coresponding ID to view any/all applicant's for that listing/gig!</h6>}
                                </CardHeader>
                                <CardBody className="shadow shadow-showcase">
                                    <div className={`details-bookmark text-center ${gridView ? '' : 'list-bookmark'}`}>
                                        <Row>
                                            {_.has(user, "applicants") && user.applicants.length > 0 ? user.applicants.filter((applicant, idx) => {
                                                if (_.isEqual(applicant.employerPostedJobId, currentSelectedMap)) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }).map((applicant, index) => renderMainContentMapped(applicant, index)) : <div className="no-favourite"><span>You do <strong style={{ color: "blue", textDecorationLine: "underline" }}>NOT</strong> have any active listings in this category, start posting new software, hardware or employer listings to get more involved!</span></div>}
                                        </Row>
                                    </div>
                                </CardBody>
                                </Card>
                            </TabPane>
                            <TabPane tabId="2">
                                <Card className="mb-0">
                                <CardHeader className="d-flex">
                                    <h3 style={{ textDecorationLine: "underline", color: "#a927f9" }} className="mb-0">Software for sale listings (listings selling <strong style={{ fontStyle: "italic" }}>software only</strong> such as code, CLI-commands, etc... (any digital software)</h3>
                                    <ul>
                                        <li><a className="grid-bookmark-view"><Grid/></a></li>
                                        <li><a className="list-layout-view"><List/></a></li>
                                    </ul>
                                </CardHeader>
                                <CardBody>
                                    <div className="details-bookmark text-center">
                                        <Row></Row>
                                        <div className="no-favourite"><span>You do <strong style={{ color: "blue", textDecorationLine: "underline" }}>NOT</strong> have any active listings in this category, start posting new software, hardware or employer listings to get more involved!</span></div>
                                    </div>
                                </CardBody>
                                </Card>
                            </TabPane>
                            <TabPane tabId="3">
                                <Card className="mb-0">
                                <CardHeader className="d-flex">
                                    <h3 style={{ textDecorationLine: "underline", color: "#a927f9" }} className="mb-0">Hardware for sale listings (listings selling <strong style={{ fontStyle: "italic" }}>hardware only</strong> such as rasberry pie's, Wifi Adapters, Proxmark3 RDV4 Kit, Packet Squirrel, etc... (any PHYSICAL hardware devices)</h3>
                                    <ul>
                                        <li><a className="grid-bookmark-view"><Grid onClick={Gridbookmark}/></a></li>
                                        <li><a className="list-layout-view"><List onClick={Listbookmark}/></a></li>
                                    </ul>
                                </CardHeader>
                                <CardBody>
                                    <div className={`details-bookmark text-center ${gridView ? '' : 'list-bookmark'}`}>
                                    <Row>
                                        {bookmarklist.length > 0 ?
                                            bookmarklist.map((data, index) => {
                                                return(
                                                    <Col xl="3 xl-50" md="4" key={index}>
                                                    <Card className="card-with-border bookmark-card o-hidden">
                                                    <div className="details-website">
                                                        <img className="img-fluid" src={`https://cybersecurity-platform.s3.amazonaws.com/placeholder.png`} alt="" />
                                                        <div className={`favourite-icon favourite_0 ${data.fillstar ? 'favourite' : ''}`} onClick={(e) => {
                                                            // addToFavourites
                                                        }} ><a><i className="fa fa-star" ></i></a></div>
                                                        <div className="desciption-data">
                                                        <div className="title-bookmark">
                                                            <h6 className="title_0">{data.title}</h6>
                                                            <p className="weburl_0">{data.website_url}</p>
                                                            <div className="hover-block">
                                                            <ul>
                                                                <li><a onClick={() => {
                                                                    // editbookmarkdata(data)
                                                                }}><Edit2 /></a></li>
                                                                <li><a><Link /></a></li>
                                                                <li><a><Share2 /></a></li>
                                                                <li><a onClick={() => {
                                                                    // Removefrombookmark(data.id)
                                                                }}><Trash2 /></a></li>
                                                                <li className="pull-right text-right"><a><Tag /></a></li>
                                                            </ul>
                                                            </div>
                                                            <div className="content-general">
                                                            <p className="desc_0">{data.desc}</p><span className="collection_0">{data.collection}</span>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </Card>
                                                    </Col>
                                                
                                                )
                                                })
                                                : <div className="no-favourite"><span>You do <strong style={{ color: "blue", textDecorationLine: "underline" }}>NOT</strong> have any active listings in this category, start posting new software, hardware or employer listings to get more involved!</span></div>
                                            }
                                    </Row> 
                                    </div>
                                </CardBody>
                                </Card>
                            </TabPane>
                            <TabPane tabId="4">
                                <Card className="mb-0">
                                <CardHeader className="d-flex">
                                    <h6 className="mb-0">{Notification}</h6>
                                    <ul>
                                        <li><a className="grid-bookmark-view"><Grid/></a></li>
                                        <li><a className="list-layout-view"><List/></a></li>
                                    </ul>
                                </CardHeader>
                                <CardBody>
                                    <div className="details-bookmark text-center">
                                    <Row></Row>
                                    <div className="no-favourite"><span>You do <strong style={{ color: "blue", textDecorationLine: "underline" }}>NOT</strong> have any active listings in this category, start posting new software, hardware or employer listings to get more involved!</span></div>
                                    </div>
                                </CardBody>
                                </Card>
                            </TabPane>
                            <Modal isOpen={editModal} toggle={editToggle} size="lg">
                                <ModalHeader toggle={editToggle}>{EditBookmark}</ModalHeader>
                                <ModalBody>
                                    <div className="form-row">
                                        <div className="contact-profile">
                                            <img className="rounded-circle img-100" src={`https://cybersecurity-platform.s3.amazonaws.com/placeholder.png`} alt="" />
                                            <div className="icon-wrapper">
                                                <i className="icofont icofont-pencil-alt-5">
                                                    <input className="upload" name="imageurl" type="file" />
                                                </i>
                                            </div>
                                        </div>
                                        <FormGroup className="col-md-12">
                                            <Label>{WebUrl}</Label>
                                            <Input className="form-control" name="url" type="text" defaultValue={editrow.website_url} autoComplete="off" innerRef={null} />
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                            <Label>{Title}</Label>
                                            <Input className="form-control" name="title" type="text" defaultValue={editrow.title} autoComplete="off" innerRef={null} />
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                            <Label>{Description}</Label>
                                            <Input className="form-control" name="desc" type="textarea" defaultValue={editrow.desc} autoComplete="off" innerRef={null}></Input>
                                        </FormGroup>
                                        <FormGroup className="col-md-6 mb-0">
                                            <Label>{Group}</Label>
                                            <Input className="js-example-basic-single" type="select" name="group" innerRef={null}>
                                            <option value="bookmark">{MyBookmark}s</option>
                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <Button color="secondary" className="mr-1">{Save}</Button>
                                    <Button color="primary" onClick={editToggle}>{Cancel}</Button>
                                </ModalBody>
                            </Modal>
                            </TabContent>
                        </div>
                        </Card>
                    </div>
                    </Col>
                </Row>
                </div>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(ManageApplicantsMainHelper);
