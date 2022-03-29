import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import moment from "moment";
import ReactPlayer from 'react-player';

const ManageVariousVideoCallsHelper = ({ userData }) => {

    const history = useHistory();


    const [ pending, setPending ] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/general/user/data`, {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }).then((res) => {
            if (res.data.message === "Gathered user!") {
                console.log(res.data);

                const { user } = res.data;

                setPending(user.pendingVideoCalls);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("critical err", err);
        })
    }, []); 


    return (
        <Fragment>
            <Breadcrumb parent="Manage Your Video Related Calling Data!" title="Video Interview Invite's, Cancel/Manage Pending Calls & More.."/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"shadow"}>
                            <CardHeader className={"b-l-info b-r-info"}>
                                <h3 className='header-video-interviews'>View, manage and initiate various video chat's & other related video based logic! You will be able to cancel interviews, join them, edit them and much more.. Simply click the relevant interview to get started!</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <div className='video-overflow-x-scroller'>
                                        {typeof pending !== "undefined" && pending.length > 0 ? pending.sort((a, b) => {
                                            return new Date(b.date) - new Date(a.date);
                                        }).map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <Col sm="12" md="6" lg="6" xl="6">
                                                        <Card className='shadow'>
                                                            <CardBody>
                                                                <div className="product-page-details">
                                                                    <h3>Scheduled for <em style={{ textDecorationLine: "underline" }}>{moment(item.date_picked).format("MM/DD/YYYY")}</em></h3>
                                                                </div>
                                                                <div className="product-price f-28">
                                                                    Exact Time: <em style={{ textDecorationLine: "underline" }}>{item.time.label}</em>
                                                                </div>
                                                                <hr/>
                                                                <p>{`You have a scheduled video call with ${item.with} at approx. ${item.time.label} on the date of ${moment(item.date_picked).format("MM/DD/YYYY")}. Please reach out to this user if you're confused as to why this video call has been initialized - typically employer's will 'vett' various hacker'
                                                                s BEFORE pulling the trigger and actually hiring a contractor/hacker. Good luck!`}</p>
                                                                <hr/>
                                                                <div>
                                                                    <table className="product-page-width">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td> <b>Room Name &nbsp;&nbsp;&nbsp;:</b></td>
                                                                                <td>{item.roomName}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <b>With &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                                                <td className="txt-success">{item.with}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <hr/>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <h6 className="product-title">{"Created:"}</h6>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <h6 className="product-title">{moment(item.date).fromNow()} on {moment(item.date).format("MM/DD/YYYY")}</h6>
                                                                    </Col>
                                                                </Row>
                                                                <hr/>
                                                                <div className="m-t-15">
                                                                    <Button color="success-2x" outline style={{ width: "47.5%" }} className="m-r-10" onClick={() => {
                                                                        history.push(`/start/video/interview/chat/employer/${item.roomName}`);
                                                                    }}>
                                                                        <i className="fa fa-solid fa-video mr-1"></i>View/Activate Video Call
                                                                    </Button>
                                                                    <Button color="danger-2x" outline style={{ width: "47.5%" }} className="m-r-10" onClick={() => {}}>
                                                                        <i className="fa fa-solid fa-ban mr-1"></i>Cancel/Modify Call
                                                                    </Button>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col> 
                                                </Fragment>
                                            );
                                        }) : <Fragment>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <Card className='shadow'>
                                                    <CardBody>
                                                        <video autoPlay={true} loop={true} width="100%" height="775" controls>
                                                            <source src={require("../../../../../assets/video/no-pending-calls.mp4")} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Fragment>}
                                    </div>
                                </Row>
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
export default connect(mapStateToProps, { })(ManageVariousVideoCallsHelper);