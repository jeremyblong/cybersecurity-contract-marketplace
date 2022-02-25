import React, { Component, Fragment } from 'react'
import VerifyButton from "@passbase/button/react";
import ReactPlayer from 'react-player';
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import "../styles.css";
import { connect } from "react-redux";
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { authentication } from "../../../../../redux/actions/authentication/auth.js";

class InitializeVerificationFlowHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        
    }
}
    handleSubmissionOfVerification = (identityAccessKey) => {
        console.log("handleSubmissionOfVerification ran!", identityAccessKey);

        axios.post(`${process.env.REACT_APP_BASE_URL}/save/identity/access/key/verification/flow`, {
            identityAccessKey,
            uniqueId: this.props.userData.uniqueId,
            accountType: "hackers"
        }).then((res) => {
            if (res.data.message === "Saved verification data!") {
                console.log(res.data);

                const { user } = res.data;

                this.props.authentication(user);

                NotificationManager.success(`You've successfully completed the required verification process/flow, we are reviewing your information and will notify you when approved.`, 'Completed Verification Flow!', 4500);
            } else {
                console.log("err", res.data);

                NotificationManager.error("We experienced an error while saving your completed verification data...", 'ERROR saving verification data!', 4500);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <Fragment>
                <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100vh"} className={"full-screen-player"} wrapper={"div"} url={require("../../../../../assets/video/verification.mp4")} />
                <div className="centered-container-video-overlay">
                    <Container fluid={false}>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card style={{ paddingTop: "25px" }}>
                                    <CardHeader className="b-l-secondary border-3">
                                        <h5>Start your verification flow by clicking the button below to get started!</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <p>
                                            {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}
                                            {"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"}
                                            {"of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting"}
                                            {"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"}
                                            {"unknown printer took a galley of type and scrambled."}
                                        </p>
                                        <hr />
                                        <VerifyButton
                                            apiKey={process.env.REACT_APP_PASSBASE_PUBLISHABLE_API_KEY}
                                            onSubmitted={(identityAccessKey) => {
                                                console.log("onSubmitted - identityAccessKey", identityAccessKey);

                                                this.handleSubmissionOfVerification(identityAccessKey);
                                            }}
                                            onFinish={(identityAccessKey) => {
                                                console.log("onFinish - identityAccessKey", identityAccessKey);
                                            }}
                                            onError={(errorCode) => {
                                                console.log("errorCode", errorCode);

                                                NotificationManager.error("Unfortunately, an error occurred during the verification process and we were unable to complete the verification process/flow.", 'ERROR Completing Verification!', 4500);
                                            }}
                                            onStart={() => {
                                                console.log("started flow...!");
                                            }}
                                            prefillAttributes={{
                                                email: this.props.userData.email
                                            }}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { authentication })(InitializeVerificationFlowHelper);

