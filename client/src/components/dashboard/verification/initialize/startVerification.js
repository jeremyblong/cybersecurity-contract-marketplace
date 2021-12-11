import React, { Component, Fragment } from 'react'
import VerifyButton from "@passbase/button/react";
import ReactPlayer from 'react-player';
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import "./styles.css";

class InitializeVerificationFlowHelper extends Component {
constructor (props) {
    super(props);

    this.state = {

    }
}
    render() {
        return (
            <Fragment>
                <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100vh"} className={"full-screen-player"} wrapper={"div"} url={require("../../../../assets/video/verification.mp4")} />
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
                                            }}
                                            onFinish={(identityAccessKey) => {
                                                console.log("onFinish - identityAccessKey", identityAccessKey);
                                            }}
                                            onError={(errorCode) => {
                                                console.log("errorCode", errorCode);
                                            }}
                                            onStart={() => {
                                                console.log("started flow...!");
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

export default InitializeVerificationFlowHelper;

