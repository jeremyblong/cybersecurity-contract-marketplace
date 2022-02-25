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
import messagingHelpers from "./helpers/displayMessages/displayMessages.js";
import _ from "lodash";
import typingIndicator from "../../../../../assets/gifs/typing-white.gif";


const { RenderMessagListStreaming } = messagingHelpers;

const renderProfilePictureOrVideo = (arr) => {
    // last image will be rendered
    const reversed = arr.reverse();

    for (let index = 0; index < reversed.length; index++) {
        const item = reversed[index];
        if (item.type.includes("image")) {
            return <Media src={`${process.env.REACT_APP_ASSET_LINK}/${item.link}`} className="rounded-circle" alt="" />;
        }
    };
}
const RenderLiveStreamPlayer = React.memo(({ videoUrl }) => {
    console.log("videoUrl", videoUrl);
    useEffect(() => {
      return false;
    }, [])
    return (
        <Fragment>
            <Card style={{ height: "100%" }} className="ribbon-wrapper">
                <CardBody className={"ribbon-wrapped-streaming-card"}>
                    <div className="ribbon ribbon-clip ribbon-info">LIVE FEED!</div>
                    {videoUrl !== null ? <ReactHlsPlayer 
                        className={"custom-streaming-player"}
                        src={videoUrl}
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        height="95%"
                    /> : <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                        <p>
                            <Skeleton containerClassName={"stretch-bars"} count={30} />
                        </p>
                    </SkeletonTheme>}
                </CardBody>
            </Card>
        </Fragment>
    );
});

const  ViewIndividualLiveStreamHelper = ({ location, information, SBData })  => {
    // create history obj for redirects
    const history = useHistory();
    const [ state, setState ] = useState({ nav1: null, nav2: null });
    const [ userCount, setUserCount ] = useState(0);
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
    const [ channel, setChannelData ] = useState(null);
    const [ userList, setUserListState ] = useState([]);
    const [ messages, setMessagesState ] = useState([]);
    // chat end
    const slider1 = useRef();
    const slider2 = useRef();

    useEffect(() => () => {
        console.log("Unmounted....");

        const CHANNEL_URL = location.state.stream.channelUrl;

        SBData.OpenChannel.getChannel(CHANNEL_URL, (openChannel, error) => {
            if (error) {
                // Handle error.
                console.log("error getting channel to LEAVE group...:", error);
            } else {
                openChannel.exit((response, error) => {
                    if (error) {
                        // Handle error.
                        console.log("Error EXITING stream (attempting to exit) ...: ", error);
                    } else {
                        console.log("EXIT channel SUCCESS!", response);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {

        if (_.has(location.state, "stream") && typeof location.state.stream !== "undefined") {
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

                    const CHANNEL_URL = location.state.stream.channelUrl;

                    SBData.OpenChannel.getChannel(CHANNEL_URL, (openChannel, error) => {
                        if (error) {
                            // Handle error.
                            console.log("error GETTING channel...:", error);
                        }

                        const listQuery = openChannel.createPreviousMessageListQuery();
                        listQuery.limit = 100;
                        listQuery.reverse = true;
                        listQuery.customType = "public";

                        // Retrieving previous messages.
                        listQuery.load((messageList, error) => {
                            if (error) {
                                // Handle error.
                                console.log("error gathering old messages...:", error);
                            } else {
                                setMessagesState(messageList);
                            }
                        });
                    
                        // Call the instance method of the result object in the "openChannel" parameter of the callback function.
                        openChannel.enter((response, error) => {
                            if (error) {
                                // Handle error.
                                console.log("error entering channel...:", error);
                            } else {
                                console.log("successfully entered channel...", response);

                                setChannelData(openChannel);

                                setUserData(user);
                            }
                        });
                    });
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
        } else {
            history.push("/view/all/live/streams/general")
        }
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
    const renderSendbirdLiveCommands = () => {
        const channelHandler = new SBData.ChannelHandler();

        channelHandler.onUserEntered = (openChannel, user) => {
            console.log("onUserEntered entered", openChannel, user);
            // update current count...
            setUserCount(openChannel.participantCount);
             // update current user list...
            setUserListState(prevState => {
                return [...prevState, user];
            });
        };
        channelHandler.onUserExited = (openChannel, user) => {
            console.log("onUserExited exited", openChannel, user);
            // update current count...
            setUserCount(openChannel.participantCount);
            // update current user list...
            setUserListState(prevState => {
                return prevState.filter((item, idx) => {
                    if (item.userId !== user.userId) {
                        return true;
                    }
                })
            });
        };
        channelHandler.onMessageReceived = (channelRecieved, message) => {
            console.log("message recieved~! : ", channelRecieved, message);

            if (channel !== null && channelRecieved.url === channel.url) {
                setMessagesState(prevState => {
                    return [message, ...prevState]
                })
            } 
        };
        if (_.has(location.state, "stream")) {
            const CHANNEL_URL = location.state.stream.channelUrl;

            SBData.addChannelHandler(CHANNEL_URL, channelHandler);
        }
    }
    const handleMessagePress = (e) => {
        if (e.key === "Enter" || e === "send") {

        }
    }
    const chatMenuToggle = () => {
        setMenuToggle(!menuToggle)
    }
    const handleOpenMessageSend = () => {
        const params = new SBData.UserMessageParams();

        params.message = messageInput;
        params.translationTargetLanguages = ['en'];   // French and German
        params.pushNotificationDeliveryOption = 'default';  // Either 'default' or 'suppress'

        channel.sendUserMessage(params, (userMessage, error) => {
            if (error) {
                // Handle error.
                console.log("error sending message...:", error);
            } else {
                const messageId = userMessage.messageId;

                console.log("successfully sent msg!", messageId, userMessage);

                setMessagesState(prevState => {
                    return [userMessage, ...prevState]
                })
                setMessageInput("");
            }
        });
    }
    console.log("userData", userData);
    return (
        <Fragment>
            <Breadcrumb parent="Live Streaming" title="Individual Live Stream (Currently LIVE)"/>
            <Container fluid={true}>
                {renderSendbirdLiveCommands()}
                <Row>
                    <Col>
                    <Card>
                        <Row className="product-page-main">
                            <Col sm="12" md="12" lg="7" xl="7">
                                <RenderLiveStreamPlayer videoUrl={videoUrl} />
                            </Col>
                            <Col sm="12" md="12" lg="5" xl="5 xl-100">
                                <Card className={"streaming-chat-card-wrapper"}>
                                    {userData !== null ? <CardBody className={"streaming-chat-card-body p-0"}>
                                        <Row className="chat-box">
                                        <Col className="pr-0 chat-right-aside">
                                            <div className="chat">
                                            <div className="chat-header clearfix">
                                                {renderProfilePictureOrVideo(_.has(userData, "profilePicsVideos") && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos : <Media src={"../../../../../assets/images/placeholder.png"} className="rounded-circle" alt="" />)}
                                                <div className="about">
                                                    <div className="name">
                                                        Streamed by <strong style={{ textDecorationLine: "underline" }}>{`${userData.firstName} ${userData.lastName}`}</strong>
                                                    </div>
                                                    <div className="status digits" >
                                                        {true ? 'online' : selectedUser.lastSeenDate} w/<strong style={{ color: "blue", textDecorationLine: "underline" }}>{userCount}</strong> Current Viewer's
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
                                                <RenderMessagListStreaming userData={information} messageList={messages} channel={channel} userData={userData} />
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
                                                            onKeyPress={(e) => {
                                                                handleMessagePress(e)
                                                            }}
                                                            onChange={(e) => handleMessageChange(e.target.value)}
                                                        />
                                                        <InputGroupAddon addonType="append">
                                                            <Button color="primary" onClick={() => handleOpenMessageSend()} >{Send}</Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                                </Row>
                                            </div>
                                            </div>
                                            {/* {typingStatus === true ? <div className={"typing-indicator-wrapper"}>
                                                <img src={typingIndicator} className={"typing-animation"} />
                                            </div> : null} */}
                                        </Col>
                                    </Row>
                                </CardBody> : null}
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <BottomContainerHelper channel={channel} userData={userData} streamData={streamData} /></Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        information: state.auth.data,
        SBData: state.sendbirdInitData.sendbirdInitData
    }
}
export default connect(mapStateToProps, {  })(withRouter(ViewIndividualLiveStreamHelper));
