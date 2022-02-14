import React, { Fragment, useState, useEffect } from "react";
import { CardBody, CardHeader, Card, Row, Container, Col, ListGroup, ListGroupItem, TabContent, TabPane, Input, FormGroup, InputGroup, InputGroupAddon, Label, PopoverBody, Popover, PopoverHeader, Media } from "reactstrap";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import ReactPlayer from "react-player";

const CreateACommunityForumRelatedHelper = ({ userData, openPaneSheet }) => {
    const [ activeTab, setActiveTab ] = useState("1");
    const [ searchText, setSearchText ] = useState("");
    const [ searching, setSearching ] = useState(false);
    const [ matchedUsers, setMatchedUsers ] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const config = {
            params: {
                alreadyPooled: []
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/random/starting/users/restricted`, config).then((res) => {
            if (res.data.message === "Successfully fetched the desired users!") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("Err critical", err);
        })
    }, [])


    const handleUserSearch = () => {
        console.log("handleUserSearch ran/running");

        setSearching(true);

        const config = {
            params: {
                alreadyPooled: []
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
                            </CardBody>
                        </Card>
                        <Card className="invite-users-community-card">
                            <CardBody>
                                <FormGroup id={"searching-popover"} className=" mb-0 input-wrapper-people-list">
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
                                    {searching === true ? <div className="searching-results-forum-users">
                                        {typeof matchedUsers !== "undefined" && matchedUsers.length > 0 ? matchedUsers.map((user, index) => {
                                            console.log("user", user);
                                            return (
                                                <Fragment key={index}>
                                                    <ListGroupItem className="list-group-item-action list-row-mapped-forum flex-column align-items-start">
                                                        <Row>
                                                            <Col sm="12" md="2" lg="2" xl="2">
                                                                {renderProfilePicVideoMapped(typeof user.profilePicsVideos !== "undefined" && user.profilePicsVideos.length > 0 ? user.profilePicsVideos[user.profilePicsVideos.length - 1] : null)}
                                                            </Col>
                                                            <Col className="stretch-forum-col" sm="12" md="10" lg="10" xl="10">
                                                                <div className="d-flex w-100 stretch-width-listgroup-inner justify-content-between">
                                                                    <h5 className="mb-1">{`${user.firstName} ${user.lastName}`}</h5><small className="text-muted">{user.accountType === "employers" ? "Employer Account" : "Hacker Account"}</small>
                                                                </div>
                                                                <p className="mb-1">{"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit."}</p>
                                                                <small className="text-muted">{"Donec id elit non mi porta."}</small>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        }) : null}
                                    </div> : null}
                                </FormGroup>
                            </CardBody>
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