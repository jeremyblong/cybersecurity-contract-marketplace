import React, { Fragment, useState, useMemo } from 'react';
import { Container, Col, Row, Card, CardHeader, CardFooter, CardBody, Button, Input, FormGroup, InputGroupAddon, InputGroup, Label, InputGroupText } from 'reactstrap';
import "./styles.css";
import SimpleMDE from "react-simplemde-editor";
import { confirmAlert } from 'react-confirm-alert'; 
import { NotificationManager } from 'react-notifications';
import axios from "axios";

const CreateANewBlogPostHelper = (props) => {
    const [ data, setData ] = useState({
        title: "",
        subtitle: "",
        body: "",
        accessCode: ""
    })
    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
          autofocus: false,
          spellChecker: false,
        }
    }, []);

    const handleFinalSubmissionCall = () => {
        console.log("handleFinalSubmissionCall running/ran..");

        const configuration = {
            data
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/submit/new/blog/post/admin`, configuration).then((res) => {
            if (res.data.message === "Successfully submitted data!") {
                console.log("Successfully submitted data!", res.data);

                setData({
                    title: "",
                    subtitle: "",
                    body: "",
                    accessCode: ""
                });

                NotificationManager.success("Successfully updated/uploaded your new blog posting and the information that was just added should NOW BE LIVE!", "Successfully saved/updated changes!", 4750);
            } else if (res.data.message === "Password provided does NOT match system password.") {
                
                NotificationManager.error("The password PROVIDED/COLLECTED does NOT match the system password on file, Request has been denied & system administrators have been notified.", "System administrators have been notified of failed attempt.", 4750);
            } else {
                console.log("ERROR Successfully submitted data!...:", res.data);

                NotificationManager.error("An unknown error occurred while attempting to save your updated/related information regarding this 'new blog post', if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
            }
        }).catch((err) => {
            console.log("CRITICAL Successfully submitted data!...:", err);

            NotificationManager.error("An unknown error occurred while attempting to save your updated/related information regarding this 'new blog post', if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
        })
    }

    const handleSubmissionAndCreate = () => {
        const { title, subtitle, body, accessCode } = data;
        if ((typeof title !== "undefined" && title.length >= 25) && (typeof subtitle !== "undefined" && subtitle.length >= 25) && (typeof body !== "undefined" && body.length >= 100) && (typeof accessCode !== "undefined" && accessCode.length > 0)) {
            confirmAlert({
                title: 'Ready to post this blog post(ing)?',
                message: `Are you sure you're ready to post this specific blog post? If so, please click on 'continue' to proceed posting..`,
                buttons: [
                  {
                    label: 'Yes, Continue Posting!',
                    onClick: () => {
                        console.log("handleSubmissionAndCreate ran/clicked..");

                        handleFinalSubmissionCall()
                    }
                  },
                  {
                    label: 'No, Cancel/Revise.',
                    onClick: () => {
                        console.log("Canelled");
                    }
                  }
                ]
            });
        } else {
            NotificationManager.warning("You MUST enter AT-LEAST 25 character's for both the 'title' and 'subtitle' and AT-LEAST 100 character's for the 'body/content' section.", "Double check your character count!", 4750);
        }
    }
    return (
        <Fragment>
            <div className='spacer-top-unauth'>
                <Container fluid={true}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className={"shadow"}>
                                <CardHeader className={"b-r-info b-l-info"}>
                                    <h2 className='new-blog-post-header'>Create a new blog post <strong style={{ color: "red" }}>(***ADMIN'S ONLY***)</strong></h2>
                                    <p className='lead'><strong>Any attempts</strong> from any <strong>unauthorized</strong> user's will automatically be rejected. If you found this page by accident or for whatever other reasons, congratulations. Please be nice and leave us alone, thanks :)</p>
                                </CardHeader>
                                <CardBody>
                                    <div className='spacer-top-auth'>
                                        <FormGroup className=" m-form__group">
                                            <Label>Enter the MAIN post <strong>title</strong></Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend"><InputGroupText>{"Post Title"}</InputGroupText></InputGroupAddon>
                                                <Input onChange={(e) => setData(prevState => {
                                                    return {
                                                        ...prevState,
                                                        title: e.target.value
                                                    }
                                                })} value={data.title} className="form-control" type="text" placeholder="Enter a post 'title'.."/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup className=" m-form__group">
                                            <Label>Enter the post <strong>sub-title</strong></Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend"><InputGroupText>{"Sub-title"}</InputGroupText></InputGroupAddon>
                                                <Input onChange={(e) => setData(prevState => {
                                                    return {
                                                        ...prevState,
                                                        subtitle: e.target.value
                                                    }
                                                })} value={data.subtitle} className="form-control" type="text" placeholder="Enter a post 'sub-title'.."/>
                                            </InputGroup>
                                        </FormGroup>
                                        <Label>Enter the <strong>actual</strong> post content (actual content)</Label>
                                        <SimpleMDE
                                            id="post-content-custom"
                                            placeholder={`## Summary:
                                                [Add summary of the vulnerability]

                                                ## Steps to Reproduce:
                                                [Add details for how we can reproduce the issue. Please ensure reproducibility of the issue.]

                                                1. [add step]
                                                2. [add step]
                                                3. [add step]

                                                ## Impact
                                                [This session is very important as it helps us to assess the severity of the issue. To help you with filling in this session, we think that answering the following questions may help:
                                                How does the issue affect the business or the user? 
                                                What can the attacker get through the issue? 
                                                Can the issue be escalated further? If so, how?

                                                ## Mitigation
                                                [Please give a brief description of how the bug could be fixed.]


                                                ## Supporting Material/References:
                                                [list any additional material (e.g. screenshots, logs, etc.)]

                                                * [attachment / reference]
                                            `}
                                            onChange={(value) => setData(prevState => {
                                                return {
                                                    ...prevState,
                                                    body: value
                                                }
                                            })}
                                            value={data.body}
                                            options={autofocusNoSpellcheckerOptions}
                                        />
                                        <FormGroup style={{ marginTop: "15px" }} className=" m-form__group">
                                            <Label>Enter <strong>*admin*</strong> access-token/key</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend"><InputGroupText>{"Access-Token"}</InputGroupText></InputGroupAddon>
                                                <Input onChange={(e) => setData(prevState => {
                                                    return {
                                                        ...prevState,
                                                        accessCode: e.target.value
                                                    }
                                                })} value={data.accessCode} className="form-control" type="text" placeholder="Enter 'access-token' to allow posting of this post.."/>
                                            </InputGroup>
                                        </FormGroup>
                                    </div>
                                </CardBody>
                                <CardFooter className={"b-l-info b-r-info"}>
                                    <Button className='btn-square-success' onClick={handleSubmissionAndCreate} style={{ width: "100%" }} outline color={"success-2x"}>Submit New Blog Post & Continue</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
}

export default CreateANewBlogPostHelper;