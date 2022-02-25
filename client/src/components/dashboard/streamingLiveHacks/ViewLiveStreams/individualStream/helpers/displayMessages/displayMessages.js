import React,{ Fragment, useState, Component } from 'react';
import { Media, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';
import moment from "moment";
import start_conversion from '../../../../../../../assets/images/start-conversion.jpg';


class RenderMessagListStreaming extends Component {
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
        const { messageList, channel, userData, index } = this.props;

        console.log("userData in DISPLAY MESSAGING", userData);
        return (
            <Fragment>
                <ul className={"ul-messages-custom"}>
                    {messageList.length > 0 ? messageList.map((item, index) => {
                        console.log("item/message - :", item);
                        {/* const participators = allMembers.chats.find(x => x.id === item.sender); */}
                        return (
                            <li key={index} className="clearfix">
                                <div id={`popoverCustom${channel.url}${index}`} onClick={() => this.handleMessageClickPopover(item, index)} className={`message add-hover-message-convo-individual my-message ${item._sender.userId !== userData.uniqueId ? '' : 'float-right'}`}>
                                    <Popover className={"custom-chat-popover"} isOpen={this.state[`popoverCustom${channel.url}${index}`]} toggle={() => this.closeMessagePopover(item, index)} placement="bottom" target={`popoverCustom${channel.url}${index}`}>
                                        <div onMouseLeave={() => {
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
                                        className={`rounded-circle ${item._sender.userId !== userData.uniqueId ? 'float-left' : 'float-right'} chat-user-img custom-chat-user-image img-30`} alt="" />
                                    <div className="message-data text-right">
                                        <span className={item._sender.userId !== userData.uniqueId ? "message-data-time message-data-time-custom-left float-left" : "message-data-time message-data-time-custom-right float-right"}>{moment(item.createdAt).format("MM/DD, h:mm a")} by {item._sender.nickname.length > 0 ? item._sender.nickname : "Unknown Participant."}</span>
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
    RenderMessagListStreaming
};
