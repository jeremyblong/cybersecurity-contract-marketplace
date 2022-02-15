import React, { Fragment, useState, useEffect } from "react";
import { CardBody, CardHeader, Card, Row, Container, Col, Button, ListGroup, InputGroupText, ListGroupItem, TabContent, TabPane, Input, FormGroup, InputGroup, InputGroupAddon, Label, Media, Tooltip } from "reactstrap";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import ReactPlayer from "react-player";
import moment from "moment";
import ImageUploader from 'react-images-upload';
import { NotificationManager } from "react-notifications";
import uuid from "react-uuid";

const CreateACommunityForumRelatedHelper = ({ userData, openPaneSheet, setOptions, setProgress }) => {
    const [ activeTab, setActiveTab ] = useState("1");
    const [ searchText, setSearchText ] = useState("");
    const [ searching, setSearching ] = useState(false);
    const [ matchedUsers, setMatchedUsers ] = useState([]);
    const [ selectedUsers, setSelected ] = useState([]);
    const [ communityName, setCommunityText ] = useState("");
    const [ error, setError ] = useState("");
    const [ selectedOption, setSelectedOption ] = useState("");
    const [ popoverOpen, setPopoverState ] = useState(false);
    const [ selectedPicture, setSelectedPicture ] = useState(null);

    const history = useHistory();

    const handleUserSearch = () => {
        console.log("handleUserSearch ran/running");

        setSearching(true);

        const config = {
            params: {
                searchText
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/matching/users/restricted/data`, config).then((res) => {
            if (res.data.message === "Successfully fetched the desired users!") {
                console.log(res.data);

                const { users } = res.data;

                setMatchedUsers(users);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Err critical", err);
        })

        setSearchText("");
    }
    const renderProfilePicVideoMapped = (last) => {
        if (last !== null && _.has(last, "link")) {
            if (last.type.includes("video")) {
                // video logic
                return (
                    <Media className="forum-media-chunk" body>
                        <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"media-body mapped-rounded-pic-video-forum"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                    </Media>
                );
            } else {
                // image logic
                return <Media className="rounded-circle profile-pic-forum-mapped" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
            }  
        } else {
            // image logic
            return <Media className="rounded-circle profile-pic-forum-mapped" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
        } 
    }
    const onDrop = (picture) => {

        const pic = picture[0];

        const data = new FormData();

        data.append("file", pic);

        const config = {
            onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                setProgress(percentCompleted);
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/upload/misc/file`, data, config).then((res) => {
            if (res.data.message === "Successfully uploaded file!") {
                console.log(res.data);

                const { file } = res.data;

                // update current file in main component
                NotificationManager.success(`We've successfully uploaded your file! Please proceed with the rest of this form logic to create your new 'community'!`, 'Successfully uploaded file!', 4500);

                setSelectedPicture(file);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const saveChangeAndSelectedUsers = () => {
        console.log("saveChangeAndSelectedUsers clicked.");

        const { accountType, uniqueId } = userData;

        const config = {
            id: uniqueId,
            selectedUsers,
            accountType,
            communityName,
            groupVisibility: selectedOption,
            selectedPicture
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/send/invites/create/group`, config).then((res) => {
            if (res.data.message === "Successfully updated relevant information!") {
                console.log(res.data);

                const { community } = res.data;

                setMatchedUsers([]);
                setSelected([]);
                setOptions(prevState => {
                    return [...prevState, community]
                });
                openPaneSheet(false);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Err critical", err);
        })

    }
    const calculateDisabled = () => {
        console.log("calculateDisabled clicked/ran."); 

        if (typeof communityName !== "undefined" && communityName.length > 0 && typeof selectedUsers !== "undefined" && selectedUsers.length > 0 && typeof selectedOption !== "undefined" && selectedOption.length > 0) {
            return false;
        } else {
            return true;
        }
    }
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className="pane-create-community-card">
                            <CardHeader className="b-l-info b-r-info">
                                <h3>Create a new <a className="create-forum-post-a" href={null}>community</a> & invite your friends!</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="5" lg="5" xl="5" sm="5 tab-javascript">
                                        <ListGroup className="nav-primary nav-pills">
                                            <ListGroupItem href={null} className={activeTab === '1' ? 'list-group-item-action active' : ''} onClick={() => setActiveTab('1')}>What is a community?</ListGroupItem>
                                        </ListGroup>
                                        <ListGroup>
                                            <ListGroupItem href={null} className={activeTab === '2' ? 'list-group-item-action active' : ''} onClick={() => setActiveTab('2')}>Create a community</ListGroupItem>
                                        </ListGroup>
                                        <ListGroup>
                                            <ListGroupItem href={null} className={activeTab === '3' ? 'list-group-item-action active' : ''} onClick={() => setActiveTab('3')}>Rules & Conditions</ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                    <Col md="7" lg="7" xl="7" sm="7">
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1" className="fade show tabpane-forum-create-community">If you're new to our platform, you may be wondering... What the heck is a community? Communities are sub-thread's essentially. Communities are fundamentally just a group of people/users that chose to participate in a certain subject or specific group about a certain subject. Ex. c/coderGalore would be all about coding and the 'glamor' that comes with it! Sub-threads (or communities) are just nested forums within a particular subject or category.</TabPane>
                                            <TabPane tabId="2" className="fade show tabpane-forum-create-community">Cant't seem to find that specific community that you're looking for? You can start your own (IF the same has not been taken yet or if it's not too identical to another group)! This is the form you should use to create a new 'community' of your choosing, you'll be able to invite friends to this group/community as well via the form logic below...</TabPane>
                                            <TabPane tabId="3" className="fade show tabpane-forum-create-community">Before you create your new community, make sure to THOUGHLY review our rules & condition's prior to creating your sub-thread. We moderate & monitor all threads/sub-threads and/or communities for any unacceptable behavior such as illegal services, scamming or attempting to scam, trash talking other users and much more in which you can find in our 'Rules & Conditions' or via the FAQ page found <a className="emphisize-redirect-forum" onClick={() => {
                                                openPaneSheet(false);

                                                if (userData.accountType === "employers") {
                                                    history.push("/frequently/asked/questions/main/employer");
                                                } else {
                                                    history.push("/frequently/asked/questions/main/hacker");
                                                }
                                            }}>HERE</a>. IF you're found to violate ANY of the subjected rules & conditions, your account will be immediately & permanently <strong>BANNED</strong> and any remaining funds in your account <strong>will be SEIZED.</strong>. Please be respectful of your peer's and our platform as a whole.</TabPane>
                                        </TabContent>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <ImageUploader
                                            className="imageuploader-forum-community"
                                            withIcon={true}
                                            buttonText='Select an image for your MAIN community picture'
                                            onChange={onDrop}
                                            withPreview={true}
                                            singleImage={true}
                                            imgExtension={['.jpg', '.gif', '.png']}
                                            maxFileSize={5242880}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="invite-users-community-card">
                            <CardBody>
                                <FormGroup id={"searching-popover"} className=" mb-0 input-wrapper-people-list">
                                    <FormGroup id={"forum-pop-111"} className=" m-form__group">
                                        <Label>Select a community name <img onClick={() => setPopoverState(prevState => !prevState)} src={require("../../../../../assets/icons/info.png")} className={"info-icon-forum"} /></Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{"c/"}</InputGroupText></InputGroupAddon>
                                            <Input onChange={(e) => {

                                                const value = e.target.value;

                                                if (value.length !== 0) {
                                                    if (value.match(/^[a-zA-Z\_]+$/g)) {
                                                        if (typeof value !== "undefined" && value.length > 5 && value.length <= 21) {

                                                            setError("");

                                                            setCommunityText(value);
                                                        } else {
                                                            setError("A community name is required & it must be less than 21 characters in length");

                                                            setCommunityText(value);
                                                        }
                                                    } 
                                                } else {
                                                    setCommunityText(value);
                                                }
                                            }} value={communityName} name={"communityName"} placeholder={"c/enterYourCommunity"} className="form-control" type="text" />
                                            <InputGroupAddon addonType="prepend"><InputGroupText>{`${21 - communityName.length} Characters remaining`}</InputGroupText></InputGroupAddon>
                                            {popoverOpen === true ? <div onMouseLeave={() => setPopoverState(false)} className="rise-above-pop">
                                                <p>Names cannot have spaces (e.g., "r/bookclub" not "r/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "r/FansOfAcme" not "r/Acme"). </p>
                                            </div> : null}
                                        </InputGroup>
                                        {typeof error !== "undefined" && error.length > 0 ? <p className="forum-error-text">{error}</p> : null}
                                    </FormGroup>
                                    <Row>
                                        <Col className="col-radio-forum" sm="12" md="4" lg="4" xl="4">
                                            <Card className="option-input-forum-card">
                                                <Media className="p-20">
                                                    <div className="radio radio-success mr-3">
                                                        <Input checked={selectedOption === "public" ? true : false} onClick={() => setSelectedOption("public")} id="radio11111" type="radio" name="radio1" />
                                                        <Label for="radio11111"></Label>
                                                    </div>
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge">Public Community<span className="badge badge-success pull-right digits">{"PUBLIC"}</span></h6>
                                                        <p>{"Anyone can view, post, and comment to this community"}</p>
                                                    </Media>
                                                </Media>
                                            </Card>
                                        </Col>
                                        <Col className="col-radio-forum" sm="12" md="4" lg="4" xl="4">
                                            <Card className="option-input-forum-card">
                                                <Media className="p-20">
                                                    <div className="radio radio-secondary mr-3">
                                                        <Input checked={selectedOption === "restricted" ? true : false} onClick={() => setSelectedOption("restricted")} id="radio22222" type="radio" name="radio1" />
                                                        <Label for="radio22222"></Label>
                                                    </div>
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge">Restricted Community<span className="badge badge-secondary pull-right digits">{"RESTRICTED"}</span></h6>
                                                        <p>{"Anyone can view this community, but only approved users can post"}</p>
                                                    </Media>
                                                </Media>
                                            </Card>
                                        </Col>
                                        <Col className="col-radio-forum" sm="12" md="4" lg="4" xl="4">
                                            <Card className="option-input-forum-card">
                                                <Media className="p-20">
                                                    <div className="radio radio-info mr-3">
                                                        <Input checked={selectedOption === "private" ? true : false} onClick={() => setSelectedOption("private")} id="radio33333" type="radio" name="radio1" />
                                                        <Label for="radio33333"></Label>
                                                    </div>
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge">Private Community<span className="badge badge-info pull-right digits">{"PRIVATE"}</span></h6>
                                                        <p>{"Only approved users can view and submit to this community"}</p>
                                                    </Media>
                                                </Media>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Label>Search for hacker's by 'first' & 'last' name</Label>
                                    <InputGroup className="mb-3">
                                        {typeof searchText !== "undefined" && searchText.length > 0 ? <InputGroupAddon onClick={handleUserSearch} style={{ borderLeft: "1px solid #ced4da" }} className={"searching-addon-list-people-left"} addonType="append">
                                            <i class="fa fa-search fa-2x" aria-hidden="true"></i>
                                        </InputGroupAddon> : null}
                                        <Input placeholder={"Search for any user's with either their first name or last name, or you can search for them both..."} onChange={(e) => {
                                            const value = e.target.value;

                                            setSearchText(value);
                                        }} value={searchText} className="form-control custom-search-bar-people" type="text" aria-label=""/>
                                        {typeof searchText !== "undefined" && searchText.length > 0 ? <InputGroupAddon onClick={() => {
                                            setSearchText("");
                                            setSearching(false);
                                        }} className={"searching-addon-list-people-right"} addonType="append">
                                            <i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
                                        </InputGroupAddon> : null}
                                    </InputGroup>
                                    {searching === true ? <Row className="searching-results-forum-users">
                                        {typeof matchedUsers !== "undefined" && matchedUsers.length > 0 ? matchedUsers.map((user, index) => {
                                            console.log("user", user);
                                            return (
                                                <Col sm="6" md="6" lg="6" xl="6" key={index} className="col-wrap-forum">
                                                    <ListGroupItem onClick={() => {
                                                        setSelected(prevState => [...prevState, user]);
                                                        setSearching(false);
                                                    }} className="list-group-item-action list-row-mapped-forum align-items-start">
                                                        <Row>
                                                            <Col sm="12" md="2" lg="2" xl="2">
                                                                {renderProfilePicVideoMapped(typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0 ? user.profilePicsVideos[user.profilePicsVideos.length - 1] : null)}
                                                            </Col>
                                                            <Col className="stretch-forum-col" sm="12" md="10" lg="10" xl="10">
                                                                <div className="d-flex w-100 stretch-width-listgroup-inner justify-content-between">
                                                                    <h5 className="mb-1">{`${user.firstName} ${user.lastName}`}</h5><small className="text-muted">{user.accountType === "employers" ? "Employer Account" : "Hacker Account"}</small>
                                                                </div>
                                                                <p className="mb-1">{`This user has completed ${user.completedJobs} gigs/jobs & has approx. ${user.currentlyFollowedBy.length} follower's`}</p>
                                                                <small className="text-muted">Member Since {moment(user.registrationDate).fromNow()}</small>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                </Col>
                                            );
                                        }) : null}
                                    </Row> : null}
                                </FormGroup>
                            </CardBody>
                        </Card>
                        <Card className="invite-users-community-card">
                            {typeof selectedUsers !== "undefined" && selectedUsers.length > 0 ? selectedUsers.map((user, index) => {
                                return (
                                    <Col sm="12" md="12" lg="12" xl="12" key={index}>
                                        <ListGroupItem className="list-group-item-action list-row-mapped-forum align-items-start">
                                            <Row>
                                                <Col sm="12" md="2" lg="2" xl="2">
                                                    {renderProfilePicVideoMapped(typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0 ? user.profilePicsVideos[user.profilePicsVideos.length - 1] : null)}
                                                </Col>
                                                <Col className="stretch-forum-col" sm="12" md="10" lg="10" xl="10">
                                                    <div className="d-flex w-100 stretch-width-listgroup-inner justify-content-between">
                                                        <h5 className="mb-1">{`${user.firstName} ${user.lastName}`}</h5><small className="text-muted">{user.accountType === "employers" ? "Employer Account" : "Hacker Account"}</small>
                                                    </div>
                                                    <p className="mb-1">{`This user has completed ${user.completedJobs} gigs/jobs & has approx. ${user.currentlyFollowedBy.length} follower's`}</p>
                                                    <div className="position-bottom-right-forum">
                                                        <img onClick={() => {
                                                            setSelected(prevState => prevState.filter((x) => x.uniqueId !== user.uniqueId));
                                                        }} src={require("../../../../../assets/icons/close-64.png")} className={"close-icon-forum"} />
                                                    </div>
                                                    <small className="text-muted">Member Since {moment(user.registrationDate).fromNow()}</small>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </Col>
                                );
                            }) : null}
                            <hr />
                            <Button disabled={calculateDisabled()} onClick={saveChangeAndSelectedUsers} className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }}>Send Invites & Create Community/Group</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default {
    CreateACommunityForumRelatedHelper
};