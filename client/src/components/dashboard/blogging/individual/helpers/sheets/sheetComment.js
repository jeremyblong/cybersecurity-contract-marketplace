import React, { useState } from 'react';
import "./styles.css";
import Sheet from 'react-modal-sheet';
import { Button, Container, Row, Col, Card, CardHeader, CardBody, CardFooter, InputGroupAddon, Form, FormGroup, Label, Input, InputGroupText, InputGroup } from "reactstrap";
import { NotificationManager } from "react-notifications";
import axios from "axios";


const RestrictedBlogLeaveCommentHelperPane = ({ selectedComment, setBlogData, userData, blogID, isMessagePaneOpen, setMessagePaneOpenState }) => {

    const [ commentText, setCommentText ] = useState("");

    const submitReply = () => {
        console.log("submitReply running/ran!");

        const signedinLastProfileFile = typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null;

        const config = {
            signedinUserID: userData.uniqueId,
            signedinLastProfileFile, 
            signedinUserNameFull: `${userData.firstName} ${userData.lastName}`, 
            signedinMemberSince: userData.registrationDate,
            accountType: userData.accountType,
            blogID,
            commentText,
            selectedComment
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/submit/comment/sub/reply/blog/content/restricted/response`, config).then((res) => {
            if (res.data.message === "Successfully left your comment on this blog!") {
                console.log(res.data);

                const { blog } = res.data;
            
                setBlogData(blog);

                setMessagePaneOpenState(false);

                NotificationManager.success("Successfully 'marked' your unique blog view! We mark each view for analytics and other related required information, this information will NOT contain any vulnerable data!", "Successfully marked 'blog' view!", 4750);

            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to gather this specific blog post data, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to gather this specific blog post data, please reload the page or contact support if this problem persists...", "Error upload/updating post & profile!", 4750);
        })
    }

    return (
        <div>
            <Sheet isOpen={isMessagePaneOpen} onClose={() => setMessagePaneOpenState(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <div className='margin-medium-button-pane'>
                        <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }} onClick={() => setMessagePaneOpenState(false)}>Close/Exit Pane</Button>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Container fluid={true}>
                        <Row style={{ marginTop: "25px" }}>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card className='shadow'>
                                    <CardHeader className={"b-l-info b-r-info"}>
                                        <h2 className='header-deposit-card-funds'>You're replying to the selected comment, this will be a <em>reply</em> to the OP's original response/comment..</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <FormGroup className="m-form__group">
                                                <Label>Description/Response To Original Comment ~ <em style={{ color: "red", textDecorationLine: "underline" }}>You must enter between 25 - 225 characters before posting..</em></Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend"><InputGroupText>{"Response"}</InputGroupText></InputGroupAddon>
                                                    <Input value={commentText} className="form-control" onChange={(e) => {

                                                        const value = e.target.value;

                                                        setCommentText(value);
                                                    }} name={"commentText"} type={"text"} placeholder={"Enter your custom message to post on this blog posting.."} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                    <CardFooter className={"b-l-info b-r-info"}>
                                        <Button disabled={typeof commentText !== "undefined" && commentText.length >= 25 && commentText.length <= 225 ? false : true} className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }} onClick={() => submitReply()}>Submit Reply To Comment</Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}

export default RestrictedBlogLeaveCommentHelperPane;