import React, { Fragment, useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import { Container, Row, Col, Card, CardBody, Button, Form, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import "./styles.css";
import uuid from "react-uuid";
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import axios from 'axios';


const MessagingPaneMessageEmployerHelper = ({ messagePaneOpen, setMessagePaneState, employerName, SBData, userData, employerID }) => {

    const [ formData, setFormData ] = useState({
        subject: "",
        message: ""
    });
    const handleInputChange = (e) => {
        const { value, name } = e.target;

        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const handleFormSubmission = () => {
        console.log("handleFormSubmission ran...!");

        const reversedProfilePicVideos = userData.profilePicsVideos.reverse();

        let coverURLImage = "";
        const generatedChannelID = uuid();

        for (let index = 0; index < reversedProfilePicVideos.length; index++) {
            const item = reversedProfilePicVideos[index];
            
            if (item.type.includes("image")) {
                coverURLImage = `${process.env.REACT_APP_ASSET_LINK}/${item.link}`;
                break;
            }
        }
        console.log(coverURLImage, userData.uniqueId, employerID, formData.subject, generatedChannelID);

        const params = new SBData.GroupChannelParams();
        params.isEphemeral = false;
        params.isPublic = false;
        params.isSuper = false;
        params.isDistinct = true;
        params.addUserIds([userData.uniqueId, employerID]);
        params.operatorUserIds = [userData.uniqueId];
        // params.channelUrl = generatedChannelID; // In a group channel, you can create a new channel by specifying its unique channel URL in a 'GroupChannelParams' object.
        params.coverUrl = coverURLImage;
        // params.creator = `${userData.firstName} ${userData.lastName}`;
        params.data = formData.subject;
        params.customType = "private";

        console.log("sbdata", SBData, coverURLImage);
        // params.channelUrl = generatedChannelID; 
        // START BACK UP HERE!!!
        SBData.GroupChannel.createChannel(params, (groupChannel, error) => {
            if (error) {
                // Handle error.
                console.log("opening channel error occurred... :", error);
            } else {
                const channelUrl = groupChannel.channelUrl;

                const invitedUsers = [employerID];

                groupChannel.inviteWithUserIds(invitedUsers, (response, error) => {
                    if (error) {
                        // Handle error.
                        console.log("groupChannel inviteWithUserIds error :", error);
                    } else {
                        console.log("inviteWithUserIds SUCCESS...! :");

                        const sendMsgParams = new SBData.UserMessageParams();
                        sendMsgParams.message = formData.message;
                        sendMsgParams.pushNotificationDeliveryOption = 'default'; 

                        groupChannel.sendUserMessage(sendMsgParams, (message, errorrrr) => {
                            if (errorrrr) {
                                // Handle error.
                                console.log("sendUserMessage err :", errorrrr);
                            } else {
                                // close pane! success on all requests...!
                                setMessagePaneState(false);
                            }
                        });
                    }
                });

                console.log("openChannel - channelUrl: ", groupChannel, channelUrl);
            }
        });
    }
    const handleMessageSubmission = () => {
        const { subject, message } = formData;

        if (typeof subject !== "undefined" && subject.length > 0) {
            if (typeof message !== "undefined" && message.length > 0) {
                handleFormSubmission();
            } else {
                NotificationManager.warning("You MUST complete (fill-out) the 'message' field/input before proceeding...!", "Fill-out the 'message' field!", 4500);
            }
        } else {
            NotificationManager.warning("You MUST complete (fill-out) the 'subject' line/input before proceeding...!", "Fill-out the 'subject' line!", 4500);
        }
    }
    return (
        <Fragment>
            <Sheet isOpen={messagePaneOpen} onClose={() => setMessagePaneState(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                        <Sheet.Content>
                            <Container fluid={true}>
                                <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                                    <Card className={"card-shadow-messaging-initialize"}>
                                        <CardBody>
                                            <h3>Create a new <strong>private message</strong> to {employerName}</h3>
                                            <p className="lead">This will send a "Private Message" to <strong style={{ textDecorationLine: "underline" }}>ONLY</strong> the employer/poster of this listing - this information is encrypted & protected for privacy.</p>
                                            <hr />
                                            <Form>
                                                    <div className="form-row">
                                                        <Col md="12 mb-3">
                                                            <Label>Message Title/Subject</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>{"Msg Subject"}</InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input onChange={handleInputChange} value={formData.subject} className="form-control" name="subject" type="text" placeholder="Subject or title..." />
                                                            </InputGroup>
                                                        </Col>
                                                    </div>
                                                    <div className="form-row">
                                                        <Col md="12 mb-3">
                                                            <Label>Message Content</Label>
                                                            <Input onChange={handleInputChange} value={formData.message} className="form-control" rows={12} name="message" type="textarea" placeholder="Enter your chat message here,  this is essential your 'private message' text..." />
                                                        </Col>
                                                    </div>
                                                    <div className={"centered-both-ways"}>
                                                        <Button onClick={handleMessageSubmission} style={{ width: "75%" }} outline color="info-2x">{"Submit/Send Message!"}</Button>
                                                    </div>
                                                </Form>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Container>
                        </Sheet.Content>
                    </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        SBData: state.sendbirdInitData.sendbirdInitData,
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(MessagingPaneMessageEmployerHelper);