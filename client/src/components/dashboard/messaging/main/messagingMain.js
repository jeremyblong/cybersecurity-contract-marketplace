import React,{useState,useEffect, Fragment} from 'react';
import Breadcrumb from '../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, Media, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, Button, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
import four from '../../../../assets/images/user/4.jpg';
import one from '../../../../assets/images/user/1.jpg';
import two from '../../../../assets/images/user/2.png';
import errorImg from '../../../../assets/images/search-not-found.png';
import {Picker} from 'emoji-mart'
import { CALL, STATUS, PROFILE, EricaHughes, VincentPorter, Active, ChataApp_p1, ChataApp_p2, Following, Follower, MarkJecno, Send } from '../../../../constant';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.css";
import helpers from "./helpers/mainHelperFunctions.js";
import typingIndicator from "../../../../assets/gifs/typing-white.gif";

const { 
    handleCheckGroupType,
    handleListItemClickPrivateChannel,
    renderOnlineStatus,
    renderNicknamePrivateGroup,
    renderNickname,
    renderStatus,
    renderLastProfilePicMainUser,
    handleMessagePressPrivateConvos,
    onKeyPressPublicSubmitted,
    onKeyPressPrivateSubmitted,
    RenderMessagListActualMessages
} = helpers;

const MessagingMainHelper = ({ SBData, userData }) =>  {

    const channelHandler = new SBData.ChannelHandler();

    const history = useHistory();

    const allMembers = [];
    const chats = [];
    const selectedUser = [];
    const currentUser = [];
    const [ searchKeyword, setSearchKeyword ] = useState('');
    const [ messageInput, setMessageInput ] = useState('');
    const [ showEmojiPicker,setShowEmojiPicker ] = useState(false)
    const [ menuToggle, setMenuToggle ] = useState(false);
    const [ activeTab, setActiveTab ] = useState('1');
    const [ openGroupChannels, setOpenGroupState ] = useState([]);
    const [ messageList, setMessageListState ] = useState([]);
    const [ channel, setChannelState ] = useState(null);
    const [ activelyTyping, setTypingStatusState ] = useState(false);
    const [ pictureChat, setPictureChatState ] = useState(null);
    const [ popover, setPopoverState ] = useState({});
    const [ groupType, setGroupType ] = useState({
        groupType: "Private Convo's",
        checked: false
    });
    const [ privateGroupChannels, setPrivateGroupChannels ] = useState([]);

    useEffect(() => {
        // set profile picture (prevent constant re-render's)
        setPictureChatState(renderLastProfilePicMainUser(userData));
        // OPEN CHANNELS
        const openChannelListQuery = SBData.OpenChannel.createOpenChannelListQuery();
        openChannelListQuery.includeEmpty = true;
        openChannelListQuery.memberStateFilter = 'all';    // 'all', 'joined_only', 'invited_only', 'invited_by_friend', and 'invited_by_non_friend'
        openChannelListQuery.order = 'latest_last_message';    // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
        openChannelListQuery.limit = 20;   // The value of pagination limit could be set up to 100.
        // CLOSED/PRIVATE CHANNELS
        const closedPrivateChannelListQuery = SBData.GroupChannel.createMyGroupChannelListQuery();
        closedPrivateChannelListQuery.includeEmpty = true;
        closedPrivateChannelListQuery.memberStateFilter = 'all';    // 'all', 'joined_only', 'invited_only', 'invited_by_friend', and 'invited_by_non_friend'
        closedPrivateChannelListQuery.order = 'latest_last_message';    // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
        closedPrivateChannelListQuery.limit = 20;   // The value of pagination limit could be set up to 100.

        if (openChannelListQuery.hasNext) {
            openChannelListQuery.next((groupChannels, error) => {
                if (error) {
                    // Handle error.
                    console.log("openChannelListQuery gather groups errror :", error);
                } else {
                    console.log("looping...?", groupChannels);

                    setOpenGroupState(groupChannels);
                    // loop through channels
                    groupChannels.forEach(channel => {
                        // looping over channels
                        console.log("channel...:", channel);
                    });
                }
            });
        } 
        if (closedPrivateChannelListQuery.hasNext) {
            closedPrivateChannelListQuery.next((groupChannels, error) => {
                if (error) {
                    // Handle error.
                    console.log("GROUP CHANNELS FETCH ERROR... :", error);
                } else {

                    console.log("GATHERED group channels (private msging) : ", groupChannels);

                    setPrivateGroupChannels(groupChannels);

                    // groupChannels.forEach(channel => {

                    // });
                }
            });
        }
    }, []);
    
    const dynamicImage = (image) => {
        // return images(`./${image}`);
    }
    
    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }
  
    const addEmoji = (emoji) =>  {
        const text = `${messageInput}${emoji.native}`;
        setShowEmojiPicker(false);
        setMessageInput(text)
    }

    const changeChatClick = (e, selectedUserId) => {
        handleSearchKeyword('');
    }

    const handleSearchKeyword = (keyword) => {
        console.log("searching for keyword...", keyword);
    }

    const handleMessageChange = (message) => {
        setMessageInput(message)
    }

    const handleMessagePressPublicConversations = (e) => {
        if (e.key === "Enter" || e === "send") {
        //     const params = new SBData.UserMessageParams();

        //     params.message = messageInput;
        //     params.customType = "group";
        //     params.data = {
        //         type: "custom-object-data"
        //     };
        //     params.mentionType = 'users';  // Either 'users' or 'channel'
        //     params.mentionedUserIds = [userData.uniqueId, null]; // Or mentionedUsers = Array<User>;
        //     // params.metaArrays = [  // A pair of key-value
        //     //     new sendBirds.me.MessageMetaArray('itemType', ['tablet']),
        //     //     new sendBirds.me.MessageMetaArray('quality', ['best', 'good'])
        //     // ];
        //     params.translationTargetLanguages = ["en"]; // French and German
        //     params.pushNotificationDeliveryOption = 'default'; // Either 'default' or 'suppress'
            
        //     channel.sendUserMessage(params, (userMessage, error) => {
        //         if (error) {
        //             // Handle error.
        //             console.log("sending msg error... :", error);
        //         } else {
        //             const messageId = userMessage.messageId;

        //             console.log("mess-age...:", messageId, userMessage);
        //         }
        //     });
        }
    }

    const chatMenuToggle = () => {
        // setMenuToggle(!menuToggle)
    }

    const handleListItemClick = (item) => {
        console.log("handleListItemClick clicked", item);

        SBData.OpenChannel.getChannel(item.url, (openChannel, error) => {
            if (error) {
                // Handle error.
                console.log("getChannel error: ", error);
            } else {
                const params = new SBData.MessageListParams();
                // create param's for message log/chat
                params.prevResultSize = 25;
                params.nextResultSize = 25;
                params.isInclusive = true;
                params.reverse = true;
                params.replyType = "all";
                params.includeThreadInfo = true;
                params.includeParentMessageInfo = true;
                // create timestamp
                const TIMESTAMP = Date.now();

                console.log("openChannel", openChannel);

                setChannelState(openChannel);

                // Pass the params as an argument to the `getMessagesByTimestamp()` method.
                openChannel.getMessagesByTimestamp(TIMESTAMP, params, (messages, error) => {
                    if (error) {
                        // Handle error.
                        console.log("error getMessagesByTimestamp :", error);
                    } else {
                        console.log("messages", messages);

                        setMessageListState(messages);
                    }
                });
            }
        });
    }
    const renderConversationPeopleList = () => {
        if (groupType.groupType === "Private Convo's") {
            // private conversation's mapped
            if (privateGroupChannels.length > 0) {
                return (
                    <ul className="list">
                        {privateGroupChannels.map((item, i) => {
                            return (
                                <li onClick={() => handleListItemClickPrivateChannel(item, SBData, setChannelState, setMessageListState)} className={`clearfix ${true ? 'active add-hover-message-convo' : 'add-hover-message-convo'}`}
                                    key={i}>
                                    <img src={item.coverUrl} className="rounded-circle user-image" alt="" />
                                    <div className={`status-circle ${renderOnlineStatus(item, userData)}`}></div>
                                    <div className="about">
                                    <div className="name">{renderNicknamePrivateGroup(item, userData)}</div>
                                        <div className="status">
                                            {item.name.slice(0, 25)}{item.name.length > 25 ? "..." : ""}
                                        </div>
                                    </div>
                                </li>);
                        })
                        }
                    </ul>
                );
            } else {
                return <Media className="img-fluid m-auto" src={errorImg} alt=""/>;
            }
        } else {
            // public/everyone conversation's mapped
            if (openGroupChannels.length > 0) {
                return (
                    <ul className="list">
                        {openGroupChannels.map((item, i) => {
                            return (
                                <li onClick={() => handleListItemClick(item)} className={`clearfix ${true ? 'active add-hover-message-convo' : 'add-hover-message-convo'}`}
                                    key={i}>
                                    <img src={item.coverUrl} className="rounded-circle user-image" alt="" />
                                    <div className={`status-circle ${renderStatus(item, userData) ? 'online' : 'offline'}`}></div>
                                    <div className="about">
                                    <div className="name">{renderNickname(item, userData)}</div>
                                        <div className="status">
                                            {item.name.slice(0, 25)}{item.name.length > 25 ? "..." : ""}
                                        </div>
                                    </div>
                                </li>);
                        })
                        }
                    </ul>
                );
            } else {
                return <Media className="img-fluid m-auto" src={errorImg} alt=""/>;
            }
        }
    }
    const renderChatMessagingChangesConditionally = () => {
        channelHandler.onMessageReceived = (channelRecieved, message) => {
            console.log("message recieved~! : ", channelRecieved, message);

            if (channel !== null && channelRecieved.url === channel.url) {
                setMessageListState(prevState => {
                    return [message, ...prevState]
                })
            } 
        };
        channelHandler.onTypingStatusUpdated = (groupChannel, typing) => {
            console.log("typing initiated...")
            if (channel !== null && channel.url === groupChannel.url) {
                // change 'show typing indicator' status to TRUE
                setTypingStatusState(true);

                setTimeout(() => {
                    setTypingStatusState(false);
                }, 5000);   
            } 
        };

        SBData.addChannelHandler(userData.uniqueId, channelHandler);
    }
    const addNewMessageCallback = (newMessage) => {
        setMessageListState(prevState => {
            return [newMessage, ...prevState]
        })
    }
    const mainInputBlurred = (e) => {
        console.log("blurred input!");

        if (channel !== null) {
            console.log("end typing...");

            channel.endTyping();
        }
    }
    const handleTypingState = (e) => {
        if (e.key === "Enter") {

            if (channel !== null) {
                console.log("STOP typing...");
                
                channel.stopTyping();
            } else {
                console.log("stop typing - channel doesnt exist.")
            }
        } else {

            if (channel !== null) {
                console.log("start typing...");
                
                channel.startTyping();
            } else {
                console.log("start typing - channel doesnt exist.")
            }
        }
    }
    return (
        (allMembers && chats && selectedUser) ?
        <Fragment>
        <Breadcrumb parent="Messaging" title="Private/Group Messaging"/>
        <Container fluid={true}>
            {renderChatMessagingChangesConditionally()}
            <Row>
              <Col sm="12" className="call-chat-sidebar">
                <Card className={"add-shadow-chat-card"}>
                  <CardBody className="chat-body">
                    <div className="chat-box">
                      <div className="chat-left-aside">
                        <div className="media">
                        <Media  src={pictureChat} className="rounded-circle user-image" alt="" />
                        <div className="about custom-msg-about">
                            <div className="name f-w-600">{`${userData.firstName} ${userData.lastName}`}</div>
                            <div className="status custom-chat-row">
                                {userData.accountType === "hackers" ? "hacker" : "employer"}
                                <div className="checkbox checkbox-success checkbox-custom-group-change">
                                    <Input checked={groupType.checked} onChange={(e) => handleCheckGroupType(e, setGroupType, setMessageListState, setChannelState)} id="checkbox-primary" type="checkbox" defaultChecked/>
                                    <Label for="checkbox-primary"><strong style={{ textDecorationLine: "underline" }}>{groupType.checked === true ? "Public" : "Private"}</strong> Convo's</Label>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="people-list">
                          <div className="search">
                            <Form className="theme-form">
                              <FormGroup className="form-group">
                              <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="search"
                                    defaultValue={searchKeyword}
                                    onChange={(e) => handleSearchKeyword(e.target.value)}
                                />
                                <i className="fa fa-search"></i>
                              </FormGroup>
                            </Form>
                          </div>
                          {renderConversationPeopleList()}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="call-chat-body">
                <Card className={"add-shadow-chat-card"}>
                  <CardBody className="p-0">
                    <Row className="chat-box">
                      <Col className="pr-0 chat-right-aside">
                        <div className="chat">
                         <div className="chat-header clearfix">
                            <Media src={dynamicImage(selectedUser.thumb)} className="rounded-circle" alt="" />
                            <div className="about">
                                <div className="name">
                                    {selectedUser.name}
                                </div>
                                <div className="status digits" >
                                    {selectedUser.online ? 'online' : selectedUser.lastSeenDate}
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
                        <div className="chat-history chat-msg-box custom-scrollbar">
                            {messageList.length > 0 ? <p className="subject-title">Subject/Title: {channel.data}</p> : null}
                            <RenderMessagListActualMessages messageList={messageList} channel={channel} userData={userData} />
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
                                    <Media src={require('../../../../assets/images/smiley.png')}  alt=""/>
                                    </div>

                                </div>
                                <InputGroup className="text-box">
                                    <Input
                                        type="text"
                                        className="form-control input-txt-bx"
                                        placeholder="Type a message......"
                                        value={messageInput}
                                        onBlur={(e) => mainInputBlurred(e)}
                                        onKeyPress={(e) => {
                                            handleTypingState(e);
                                            // conditional check to see which function to run (GROUP/1v1 messaging conversation)
                                            if (groupType.groupType === "Private Convo's") {
                                                onKeyPressPrivateSubmitted(e);
                                            } else {
                                                onKeyPressPublicSubmitted(e);
                                            }
                                        }}
                                        onChange={(e) => handleMessageChange(e.target.value)}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" onClick={() => {
                                            if (groupType.groupType === "Private Convo's") {
                                                handleMessagePressPrivateConvos(messageInput, channel, SBData, setMessageInput, addNewMessageCallback);
                                            } else {
                                                handleMessagePressPublicConversations('send')
                                            }
                                        }} >{Send}</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                              </Col>
                            </Row>
                          </div>
                        </div>
                        {activelyTyping === true ? <div className={"typing-indicator-wrapper"}>
                            <img src={typingIndicator} className={"typing-animation"} />
                        </div> : null}
                      </Col>
                      <Col className={`pl-0 chat-menu ${menuToggle ? 'show' : ''}`}>
                            <Nav tabs className="nav  border-tab nav-primary">
                                <NavItem  id="myTab" role="tablist">
                                    <NavLink tag="a" href={null} className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                        {CALL}
                                    </NavLink>
                                </NavItem>
                                <NavItem  id="myTab" role="tablist">
                                    <NavLink tag="a" href={null} className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                        {STATUS}
                                    </NavLink>
                                </NavItem>
                                <NavItem  id="myTab" role="tablist">
                                    <NavLink tag="a" href={null} className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                        {PROFILE}
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="people-list">
                                        <ul className="list digits custom-scrollbar">
                                            <li className="clearfix"><Media className="rounded-circle user-image" src={four} alt="" />
                                                <div className="about">
                                                    <div className="name">{EricaHughes}</div>
                                                    <div className="status"><i className="fa fa-share font-success"></i>  {"5 May, 4:40 PM"}</div>
                                                </div>
                                            </li>
                                            <li className="clearfix"><Media className="rounded-circle user-image mt-0" src={one} alt="" />
                                                <div className="about">
                                                    <div className="name">{VincentPorter}
                                                        <div className="status">
                                                        <i className="fa fa-reply font-danger"></i>  {"5 May, 5:30 PM"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            {allMembers.filter(x => x.id !== currentUser.id).map((member, i) =>
                                                <li className="clearfix" key={i} onClick={(e) => changeChatClick(e, member.id)}>
                                                    <Media src={dynamicImage(member.thumb)} className="rounded-circle user-image" alt="" />
                                                    <div className="about">
                                                        <div className="name">{member.name}</div>
                                                        <div className="status">
                                                            {member.reply}
                                                            {member.status}
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="people-list">
                                        <div className="search">
                                            <Form className="theme-form">
                                                <FormGroup>
                                                    <Input className="form-control" type="text" placeholder="Write Status..." /><i className="fa fa-pencil"></i>
                                                </FormGroup>
                                            </Form>
                                        </div>
                                    </div>
                                    <div className="status">
                                        <p className="font-dark">{Active}</p>
                                        <hr />
                                        <p>
                                            {ChataApp_p1}
                                            <i className="icofont icofont-emo-heart-eyes font-danger f-20"></i>
                                            <i className="icofont icofont-emo-heart-eyes font-danger f-20 m-l-5"></i>
                                        </p>
                                        <hr />
                                        <p>{ChataApp_p2}<i className="icofont icofont-emo-rolling-eyes font-success f-20"></i></p>
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="user-profile">
                                        <div className="image">
                                            <div className="avatar text-center"><Media body alt="" src={two} /></div>
                                            <div className="icon-wrapper"><i className="icofont icofont-pencil-alt-5"></i></div>
                                        </div>
                                        <div className="user-content text-center">
                                            <h5 className="text-uppercase">{MarkJecno}</h5>
                                            <div className="social-media">
                                                <ul className="list-inline">
                                                    <li className="list-inline-item"><a href={null}><i className="fa fa-facebook"></i></a></li>
                                                    <li className="list-inline-item"><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                                    <li className="list-inline-item"><a href={null}><i className="fa fa-twitter"></i></a></li>
                                                    <li className="list-inline-item"><a href={null}><i className="fa fa-instagram"></i></a></li>
                                                    <li className="list-inline-item"><a href={null}><i className="fa fa-rss"></i></a></li>
                                                </ul>
                                            </div>
                                            <hr />
                                            <div className="follow text-center">
                                                <Row>
                                                    <Col className="border-right"><span>{Following}</span>
                                                        <div className="follow-num">{"236k"}</div>
                                                    </Col>
                                                    <Col><span>{Follower}</span>
                                                        <div className="follow-num">{"3691k"}</div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr />
                                            <div className="text-center digits">
                                                <p className="mb-0">{"Mark.jecno23@gmail.com"}</p>
                                                <p className="mb-0">{"+91 365 - 658 - 1236"}</p>
                                                <p className="mb-0">{"Fax: 123-4560"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                    <Card className='shadowy-card-videos'>
                        <CardBody>
                            <h4 className='redirect-helper'>Redirect to manage your pending & active video calling requests?</h4>
                            <p className='lead'>By clicking the button below, you will be redirected to the appropriate page where you'll be able to manage and initialize <strong>LIVE VIDEO CALLING</strong> & much more! Check it out..</p>
                            <hr />
                            <Button className='btn-square-info' color='info-2x' outline style={{ width: "100%" }} onClick={() => {
                                history.push("/view/pending/video/calling");
                            }}>Video Calling/Chat Related Action's</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
          </Container>
        </Fragment>
        : 
        <div className="loading"></div>
    );
}
const mapStateToProps = (state) => {
    return {
        SBData: state.sendbirdInitData.sendbirdInitData,
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(MessagingMainHelper);