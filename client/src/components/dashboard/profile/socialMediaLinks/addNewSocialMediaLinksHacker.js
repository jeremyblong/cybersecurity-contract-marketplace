import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardBody, CardHeader, FormGroup, CardFooter, Button, InputGroupAddon, InputGroupText, InputGroup, Label, Input } from "reactstrap";
import Breadcrumb from '../../../../layout/breadcrumb';
import { connect } from "react-redux";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';


const AddNewSocialMediaLinksHackerHelper = ({ userData }) => {
    const [ social, setSocialData ] = useState({
        facebook: "",
        instagram: "",
        github: "",
        linkedin: "",
        bugcrowd: "",
        cobalt: "",
        gitlab: "",
        twitter: "",
        hackerrank: "",
        hackthebox: "",
        youtube: "",
        tiktok: ""
    })

    const handleSocialProfileLinksUpdate = () => {
        console.log("handleSocialProfileLinksUpdate clicked/ran..");

        const configuration = {
            id: userData.uniqueId,
            accountType: userData.accountType,
            socials: social
        }

        confirmAlert({
            title: `Are you sure you'd like to update these 'social-media' links?`,
            message: `You're about to update your social media links, ONLY modified fields will be updated but if you have an existing value in a modified field, it will override the previous value. Are you sure you'd like to continue?`,
            buttons: [
              {
                label: 'Yes, Make Changes!',
                onClick: () => {
                    axios.post(`${process.env.REACT_APP_BASE_URL}/update/both/account/type/social/media/links`, configuration).then((res) => {
                        if (res.data.message === "Successfully updated socials for this account!") {
                            console.log(res.data);
            
                            setSocialData({
                                facebook: "",
                                instagram: "",
                                github: "",
                                linkedin: "",
                                bugcrowd: "",
                                cobalt: "",
                                gitlab: "",
                                twitter: "",
                                hackerrank: "",
                                hackthebox: "",
                                youtube: "",
                                tiktok: ""
                            })
            
                            NotificationManager.success("We've successfully updated your account 'social links' and your changes should NOW be publically available/live for the public to see/view!", "Successfully updated your social-links!", 4750);
                        } else {
                            console.log("err", res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
              },
              {
                label: 'No, Cancel.',
                onClick: () => {
                    console.log("Cancelled..");
                }
              }
            ]
        });
    }
    return (
        <Fragment>
            <Breadcrumb parent="Enter Your 'Social-Media' Links/Accounts" title="Social Media Link's" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className='b-l-primary b-r-primary'>
                                <h3>Enter your 'social' links <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>(social media)</strong>, enter as many or few as you'd like however we recommend adding them all (if applicable)</h3>
                                <p>Enter your social media links/accounts to better populate your public account information so other user's can check-out your relevant work history and/or previous projects or work..</p>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>Facebook Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social'><i class="fa fa-brands fa-facebook-square"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.facebook} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            facebook: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'facebook' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social'>{"FaceBook"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>Instagram Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social'><i class="fa fa-brands fa-instagram"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.instagram} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            instagram: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'instagram' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social'>{"Instagram"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>GitHub Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social-reddish'><i class="fa fa-brands fa-github-square"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.github} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            github: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'github' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social-reddish'>{"GitHub"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>LinkedIn Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social-reddish'><i class="fa fa-brands fa-linkedin"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.linkedin} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            linkedin: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'linkedin' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social-reddish'>{"LinkedIn"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>Bugcrowd Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social'><i class="fa fa-solid fa-bug"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.bugcrowd} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            bugcrowd: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'bugcrowd' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social'>{"Bugcrowd"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>Cobalt Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social'><i class="fa fa-solid fa-question"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.cobalt} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            cobalt: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'cobalt' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social'>{"Cobalt"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>GitLab Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social-reddish'><i class="fa fa-brands fa-gitlab"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.gitlab} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            gitlab: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'gitlab' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social-reddish'>{"GitLab"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>Twitter Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social-reddish'><i class="fa fa-brands fa-twitter-square"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.twitter} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            twitter: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'twitter' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social-reddish'>{"Twitter"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>HackerRank Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social'><i class="fa fa-solid fa-code"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.hackerrank} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            hackerrank: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'hacker-rank' social URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social'>{"HackerRank"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>HackTheBox Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social'><i class="fa fa-solid fa-code"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.hackthebox} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            hackthebox: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'hack-the-box' social profile URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social'>{"HackTheBox"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>YouTube Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social-reddish'><i class="fa fa-brands fa-youtube"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.youtube} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            youtube: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'youtube' social URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social-reddish'>{"YouTube"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <FormGroup className=" mb-0">
                                            <Label>TikTok Social Link</Label>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend"><InputGroupText className='input-group-text-social-reddish'><i class="fa fa-solid fa-question"></i></InputGroupText></InputGroupAddon>
                                                    <Input value={social.tiktok} onChange={(e) => setSocialData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            tiktok: e.target.value
                                                        }
                                                    })} className="form-control" type="text" placeholder={"Enter your 'TikTok' social URL.."} />
                                                <InputGroupAddon addonType="append"><InputGroupText className='input-group-text-social-reddish'>{"TikTok"}</InputGroupText></InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className={"b-l-primary b-r-primary"}>
                                <Button onClick={handleSocialProfileLinksUpdate} className="btn-square-success" outline style={{ width: "100%" }} color={"success-2x"} type="submit">Update Social-Media Link(s)</Button>
                            </CardFooter>
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
export default connect(mapStateToProps, { })(AddNewSocialMediaLinksHackerHelper);