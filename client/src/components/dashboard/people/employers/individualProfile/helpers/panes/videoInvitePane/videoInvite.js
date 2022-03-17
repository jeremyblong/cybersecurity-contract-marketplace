import React, { Fragment } from 'react';
import Sheet from 'react-modal-sheet';
import { Container, Row, Col, Card, CardBody, Button, CardHeader, CardFooter, Form, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import "./styles.css";
import uuid from "react-uuid";
import { NotificationManager } from 'react-notifications';
import Breadcrumb from '../../../../../../../../layout/breadcrumb';

const VideoInvitePaneInviteEmployerHelper = ({ videoInterviewPane, setVideoInterviewStartPane }) => {
    return (
        <Fragment>
            <Sheet isOpen={videoInterviewPane} onClose={() => setVideoInterviewStartPane(false)}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div className='marginized-header'>
                            <Button className='btn-square-danger' color={"danger-2x"} style={{ width: "100%" }} outline onClick={() => setVideoInterviewStartPane(false)}>Cancel/Close Pane</Button>
                        </div>
                    </Sheet.Header>
                        <div className='inner-container-invite'>
                            <Breadcrumb parent="Send An Invite & Start A Video Interview!" title="Initialize A Video Interview With This User!" />
                            <Sheet.Content>
                                <Container fluid={true}>
                                    <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                                        <Card className={"card-shadow-messaging-initialize"}>
                                            <CardHeader className={"b-l-primary b-r-primary"}>
                                                <h3>Select the various settings/options for your invite. You will be inviting this user via a notification to join your desired video interview at the appropriate selected time!</h3>
                                            </CardHeader>
                                            <CardBody>
                                                
                                            </CardBody>
                                            <CardFooter className={"b-l-primary b-r-primary"}>
                                                <p className='lead'>This is going to invite {""} to an interview at the selected date & time. Please show up approx. 5-10 min early and be considerate of your peer's time..</p>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                </Container>
                            </Sheet.Content>
                        </div>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}

export default VideoInvitePaneInviteEmployerHelper;