import React,{ Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, Button, Media, CardBody, Form, FormGroup, Input, InputGroup, InputGroupAddon, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import BottomContainerHelper from './helpers/bottomContainer/container.js';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import start_conversion from '../../../../../assets/images/start-conversion.jpg';
import { Picker } from 'emoji-mart'
import { Send } from '../../../../../constant';
import uuid from 'react-uuid';
import moment from 'moment';
import ReactHlsPlayer from 'react-hls-player';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { NotificationManager } from "react-notifications";
import "./styles.css";
import axios from "axios";
import ReactPlayer from "react-player";
import _ from "lodash";

const  ViewIndividualLiveStreamHelper = ({ location, information })  => {
    // create history obj for redirects
    const history = useHistory();
    const [ state, setState ] = useState({ nav1: null, nav2: null });
    const [ streamData, setStreamData ] = useState(null);
    // eslint-disable-next-line
    const generated = uuid();
    // chat begin
    const allMembers = [];
    const chats = [];
    const selectedUser = {
        image: require("../../../../../assets/images/placeholder.png"),
        online: false,
        id: generated,
        name: "Jeremy Blong",
        image: require("../../../../../assets/images/placeholder.png"),
        lastSeenDate: moment().format("MM/DD/YYYY hh:mm:ss a")
    };
    const currentUser = {
        id: generated
    };
    const [ messageInput, setMessageInput ] = useState('');
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const [ menuToggle, setMenuToggle ] = useState(false);
    const [ videoUrl, setVideoUrlState ] = useState(null);
    const [ userData, setUserData ] = useState(null);
    // chat end
    const slider1 = useRef();
    const slider2 = useRef();

    useEffect(() => {

        setVideoUrlState(`https://stream.mux.com/${location.state.stream.playback_id}.m3u8`);
        setStreamData(location.state.stream);

        const configuration = {
            params: {
                uniqueId: information.uniqueId
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/core/anonymous/user/data`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered core user information!") {
                console.log(res.data);

                const { user } = res.data;

                setUserData(user);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("Error while gathering user data for this listing - some data will NOT be complete...", "Could NOT gather user!", 5000);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("Error while gathering user data for this listing - some data will NOT be complete...", "Could NOT gather user!", 5000);
        })

        setState({
            nav1: slider1.current,
            nav2: slider2.current
          });
      } , []);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }
  
    const addEmoji = (emoji) =>  {
        const text = `${messageInput}${emoji.native}`;
        setShowEmojiPicker(false);
        setMessageInput(text)
    }

    const handleMessageChange = (message) => {
        setMessageInput(message)
    }

    const handleMessagePress = (e) => {
        if (e.key === "Enter" || e === "send") {

            var container = document.querySelector(".chat-history");
            setTimeout(function () {
                container.scrollBy({ top: 200, behavior: 'smooth' });
            }, 310)

            let currentUserId = currentUser.id;
            let selectedUserId = selectedUser.id;
            let selectedUserName = selectedUser.name;
           
            if (messageInput.length > 0) {

                setMessageInput('');
                setTimeout(() => {
                    const replyMessage = "Hey This is " + selectedUserName + ", Sorry I busy right now, I will text you later";
                    if (selectedUser.online === true)
                        document.querySelector(".status-circle").classList.add('online');
                        selectedUser.online = true;

                }, 5000);
            }
        }
    }

    const chatMenuToggle = () => {
        setMenuToggle(!menuToggle)
    }
    const selectedChat = (allMembers && chats && selectedUser) ? chats.find(x => x.users.includes(currentUser.id) && x.users.includes(selectedUser.id)) : null;

    const renderLiveStreamPlayer = () => {
        if (videoUrl !== null) {
            return (
                <Fragment>
                    <Card style={{ height: "100%" }} className="ribbon-wrapper">
                        <CardBody className={"ribbon-wrapped-streaming-card"}>
                            <div className="ribbon ribbon-clip ribbon-info">LIVE FEED!</div>
                            <ReactHlsPlayer 
                                className={"custom-streaming-player"}
                                src={videoUrl}
                                autoPlay={true}
                                controls={true}
                                width="100%"
                                height="95%"
                            />
                        </CardBody>
                    </Card>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                        <p>
                            <Skeleton containerClassName={"stretch-bars"} count={30} />
                        </p>
                    </SkeletonTheme>
                </Fragment>
            );
        }
    }
    const renderProfilePictureOrVideo = (last) => {
        // last image will be rendered
        if (!last.type.includes("video")) {
            return (
                <Fragment>
                    <Media src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} className="rounded-circle" alt="" />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} className="rounded-circle media media-body" alt="" />
                </Fragment>
            );
        }
    }
    console.log("userData", userData);
    return (
        <Fragment>
            <Breadcrumb parent="Live Streaming" title="Individual Live Stream (Currently LIVE)"/>
            <Container fluid={true}>
                <Row>
                    <Col>
                    <Card>
                        <Row className="product-page-main">
                            <Col sm="12" md="12" lg="7" xl="7">
                                {renderLiveStreamPlayer()}
                            </Col>
                            <Col sm="12" md="12" lg="5" xl="5 xl-100">
                                <Card className={"streaming-chat-card-wrapper"}>
                                    {userData !== null ? <CardBody className={"streaming-chat-card-body p-0"}>
                                        <Row className="chat-box">
                                        <Col className="pr-0 chat-right-aside">
                                            <div className="chat">
                                            <div className="chat-header clearfix">
                                                {renderProfilePictureOrVideo(_.has(userData, "profilePicsVideos") && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : <Media src={"../../../../../assets/images/placeholder.png"} className="rounded-circle" alt="" />)}
                                                <div className="about">
                                                    <div className="name">
                                                        Streamed by <strong style={{ textDecorationLine: "underline" }}>{`${userData.firstName} ${userData.lastName}`}</strong>
                                                    </div>
                                                    <div className="status digits" >
                                                        {true ? 'online' : selectedUser.lastSeenDate}
                                                    </div>
                                                </div>
                                                <ul className="list-inline float-left float-sm-right chat-menu-icons">
                                                    <li className="list-inline-item"><a href={null}><i className="icon-search"></i></a></li>
                                                    <li className="list-inline-item"><a href={null}><i className="icon-clip"></i></a></li>
                                                    <li className="list-inline-item"><a href={null}><i className="icon-headphone-alt"></i></a></li>
                                                    <li className="list-inline-item"><a href={null}><i className="icon-video-camera"></i></a></li>
                                                    <li className="list-inline-item toogle-bar" onClick={() => chatMenuToggle()}><a href={null}><i className="icon-menu"></i></a></li>
                                                </ul>
                                            </div>
                                            <div className="chat-history chat-msg-box custom-scrollbar" >
                                                <ul>
                                                    {typeof selectedChat !== "undefined" && selectedChat.messages.length > 0 ? selectedChat.messages.map((item, index) => {
                                                        const participators = allMembers.chats.find(x => x.id === item.sender);
                                                        return (
                                                            <li key={index} className="clearfix">
                                                                <div className={`message my-message ${item.sender !== currentUser.id ? '' : 'float-right'}`}>
                                                                    <Media src={selectedUser.image}
                                                                        className={`rounded-circle ${item.sender !== currentUser.id ? 'float-left' : 'float-right'} chat-user-img img-30`} alt="" />
                                                                    <div className="message-data text-right">
                                                                        <span className="message-data-time">{item.time}</span>
                                                                    </div>
                                                                    {item.text}
                                                                </div>
                                                            </li>
                                                        );
                                                    }) :
                                                        <div>
                                                            <Media className="img-fluid" src={start_conversion} alt="start conversion " />
                                                        </div>
                                                    }
                                                </ul>
                                            </div>
                                            <div className="chat-message clearfix">
                                                <Row>
                                                <div className="mb-2">
                                                {showEmojiPicker ? (
                                                        <Picker set="apple" emojiSize={30} onSelect={addEmoji} />
                                                ) : null}
                                                </div>
                                                <Col xl="12" className="d-flex">
                                                    <div className="smiley-box bg-primary">
                                                    
                                                        <div className="picker" onClick={() => toggleEmojiPicker()}>
                                                        <Media src={require('../../../../../assets/images/smiley.png')}  alt=""/>
                                                        </div>

                                                    </div>
                                                    <InputGroup className="text-box">
                                                        <Input
                                                            type="text"
                                                            className="form-control input-txt-bx"
                                                            placeholder="Type a message......"
                                                            value={messageInput}
                                                            onKeyPress={(e) => handleMessagePress(e)}
                                                            onChange={(e) => handleMessageChange(e.target.value)}
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <Button color="primary" onClick={() => handleMessagePress('send')} >{Send}</Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                                </Row>
                                            </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody> : null}
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <BottomContainerHelper userData={userData} streamData={streamData} /></Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        information: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(withRouter(ViewIndividualLiveStreamHelper));
