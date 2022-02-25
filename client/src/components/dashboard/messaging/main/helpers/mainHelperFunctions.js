import React,{ Fragment, useState, Component } from 'react';
import { Media, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';
import moment from "moment";
import start_conversion from '../../../../../assets/images/start-conversion.jpg';

const handleCheckGroupType = (e, setGroupType, setMessageListState, setChannelState) => {
    const checked = e.target.checked;

    setChannelState(null);

    setMessageListState([]);

    setGroupType({
        groupType: checked === true ? "Public Convo's" : "Private Convo's",
        checked
    })
}
const handleMessagePressPrivateConvos = (message, channel, sb, setMessageInput, addNewMessageCallback) => {
    console.log("handleMessagePressPrivateConvos clicked/ran...");

    const params = new sb.UserMessageParams();

    params.message = message;
    params.customType = "private";
    // params.data = DATA;
    params.mentionType = 'users';
    params.mentionedUserIds = [];
    // params.metaArrays = [   // A pair of key-value
    //     new sendBirds.me.MessageMetaArray('itemType', ['tablet']),
    //     new sendBirds.me.MessageMetaArray('quality', ['best', 'good'])
    // ];
    params.translationTargetLanguages = ['en'];   // French and German
    params.pushNotificationDeliveryOption = 'default';  // Either 'default' or 'suppress'

    channel.sendUserMessage(params, (userMessage, error) => {
        if (error) {
            // Handle error.
            console.log("error sendUserMessage... : ", error);
        } else {
            const messageId = userMessage.messageId;

            console.log("Send message SUCCESS private convos --- :", messageId, userMessage);

            setMessageInput("");

            addNewMessageCallback(userMessage);
        }
    });
}
const handleListItemClickPrivateChannel = (item, SBData, setChannelState, setMessageListState) => {
    console.log("handleListItemClickPrivateChannel clicked... : ", item);

    SBData.GroupChannel.getChannel(item.url, (groupChannel, error) => {
        if (error) {
            // Handle error.
            console.log("getChannel : ", error);
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

            groupChannel.markAsDelivered();

            setChannelState(groupChannel);

            groupChannel.markAsRead();

            // Pass the params as an argument to the `getMessagesByTimestamp()` method.
            groupChannel.getMessagesByTimestamp(TIMESTAMP, params, (messages, error) => {
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
const renderOnlineStatus = (item, userData) => {
    for (let index = 0; index < item.members.length; index++) {
        const user = item.members[index];
        if (user.userId !== userData.uniqueId) {
            return user.connectionStatus;
        }
        if ((item.members.length - 1) === index) {
            return user.connectionStatus;
        }
    }
}
const renderNicknamePrivateGroup = (item, userData) => {
    for (let index = 0; index < item.members.length; index++) {
        const user = item.members[index];
        if (user.userId !== userData.uniqueId) {
            return user.nickname;
        }
        if ((item.members.length - 1) === index) {
            return user.nickname;
        }
    }
}
const renderNickname = (item, userData) => {
    for (let index = 0; index < item.operators.length; index++) {
        const user = item.operators[index];
        if (user.userId !== userData.uniqueId) {
            return user.nickname;
        }
        if ((item.operators.length - 1) === index) {
            return "Chat Invite Pending...";
        }
    }
}
const renderStatus = (item, userData) => {
    for (let index = 0; index < item.operators.length; index++) {
        const user = item.operators[index];
        if (user.userId !== userData.uniqueId) {
            return user.isActive;
        }
        if ((item.operators.length - 1) === index) {
            return user.isActive;
        }
    }
}
const renderLastProfilePicMainUser = (user) => {
    const reversed = user.profilePicsVideos.reverse();

    for (let index = 0; index < reversed.length; index++) {
        const item = reversed[index];
        if (item.type.includes("image")) {
            return `${process.env.REACT_APP_ASSET_LINK}/${item.link}`;
            break;
        }
    }
}
const onKeyPressPrivateSubmitted = (e) => {
    console.log("onKeyPressPrivateSubmitted pressed...", e);
}
const onKeyPressPublicSubmitted = (e) => {
    console.log("onKeyPressPublicSubmitted pressed...", e);
}
class RenderMessagListActualMessages extends Component {
constructor (props) {
    super(props);

    this.state = {

    }
}
    handleMessageClickPopover = (item, index) => {
        console.log("handleMessageClickPopover item/index", item, index);

        const { channel } = this.props;

        if (channel !== null) {

            console.log("CHANNEL ISNT NULL handleMessageClickPopover ~ ...");

            this.setState({
                [`popoverCustom${channel.url}${index}`]: true
            }) 
        } 
    }

    closeMessagePopover = (item, index) => {
        console.log("closeMessagePopover item/index", item, index);

        const { channel } = this.props;

        if (channel !== null) {

            console.log("CHANNEL ISNT NULL closeMessagePopover ~ ...");

            this.setState({
                [`popoverCustom${channel.url}${index}`]: false
            })   
        } 
    }
    render () {
        const { messageList, channel, userData } = this.props;
        return (
            <Fragment>
                <ul className={"ul-messages-custom-reinvented"}>
                    {messageList.length > 0 ? messageList.map((item, index) => {
                        {/* const participators = allMembers.chats.find(x => x.id === item.sender); */}
                        return (
                            <li key={index} className="clearfix">
                                <div id={`popoverCustom${channel.url}${index}`} onClick={() => this.handleMessageClickPopover(item, index)} className={`message add-hover-message-convo-individual my-message ${item._sender.userId !== userData.uniqueId ? '' : 'float-right'}`}>
                                    <Popover className={"custom-chat-popover"} isOpen={this.state[`popoverCustom${channel.url}${index}`]} toggle={() => this.closeMessagePopover(item, index)} placement="bottom" target={`popoverCustom${channel.url}${index}`}>
                                        <div onMouseLeave={() => {
                                            console.log("mouse LEFT.");

                                            this.closeMessagePopover(item, index)
                                        }}>
                                            <PopoverHeader> ~ Message Actions/Modification's ~ </PopoverHeader>
                                            <PopoverBody>
                                                <ListGroup>
                                                    <ListGroupItem className="list-group-item-action custom-message-action-listgroup" onClick={() => null} active>{"DELETE This Message (Permanently Remove)"}</ListGroupItem>
                                                    <ListGroupItem className="list-group-item-action custom-message-action-listgroup" onClick={() => null}>{"PIN This Message (Note MSG As IMPORTANT)"}</ListGroupItem>
                                                    <ListGroupItem className="list-group-item-action custom-message-action-listgroup" onClick={() => null} active>{"MARK As Read (Show You've Seen It)"}</ListGroupItem>
                                                    <ListGroupItem className="list-group-item-action custom-message-action-listgroup" onClick={() => null}>{"ADD Extra Data To Existing MSG (MODIFY Message)"}</ListGroupItem>
                                                </ListGroup>
                                            </PopoverBody>
                                        </div>
                                    </Popover>
                                    <Media src={item._sender.plainProfileUrl}
                                        className={`rounded-circle ${item._sender.userId !== userData.uniqueId ? 'float-left' : 'float-right'} custom-chat-user-image chat-user-img img-30`} alt="" />
                                    <div className="message-data text-right">
                                        <span className={item._sender.userId !== userData.uniqueId ? "message-data-time message-data-time-custom-left float-left" : "message-data-time message-data-time-custom-right float-right"}>{moment(item.createdAt).format("MM/DD/YYYY, h:mm:ss a")} by {item._sender.nickname}</span>
                                    </div>
                                    {item.message}
                                    <div className={item._sender.userId !== userData.uniqueId ? "delivery-status-wrapper-right" : "delivery-status-wrapper-left"}>
                                        <p className={item._sender.userId !== userData.uniqueId ? "delivery-confirmation-right" : "delivery-confirmation-left"}>{item.sendingStatus === "succeeded" ? "Delivered!" : "Pending Delivery..."}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    }) : <div>
                        <Media className="img-fluid" src={start_conversion} alt="start conversion " />
                    </div>}
                </ul>
            </Fragment>
        );
    }
}
export default {
    handleCheckGroupType,
    handleListItemClickPrivateChannel,
    renderOnlineStatus,
    renderNicknamePrivateGroup,
    renderNickname,
    renderStatus,
    handleMessagePressPrivateConvos,
    renderLastProfilePicMainUser,
    onKeyPressPublicSubmitted,
    onKeyPressPrivateSubmitted,
    RenderMessagListActualMessages
};