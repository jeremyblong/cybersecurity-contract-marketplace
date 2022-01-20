import React, { Component } from 'react';
import * as SendBird from "sendbird";
import { connect } from "react-redux";
import { saveSendbirdInitialData } from "./redux/actions/messaging/initialization/initSBLogic.js";
import _ from "lodash";


const returnSendbirdObj = (signedIn) => {
    return new SendBird({ appId: process.env.REACT_APP_SENDBIRD_APP_ID, localCacheEnabled: signedIn });
}

class MountingLogicRedux extends Component {
constructor(props) {
    super(props);

    this.state = {
        profilePic: "",
        updatedAlready: false
    }
}
    componentDidUpdate(prevProps, prevState) {
        const { saveSendbirdInitialData, authenticated, SBData } = this.props;

        if (prevProps.SBData !== SBData) {
            console.log("prevProps", prevProps, prevState, SBData);

            saveSendbirdInitialData(returnSendbirdObj(authenticated));
        }
    }
    renderOnceUpdateProfileSendbirdInfo = () => {
        // deconstruct
        const { authenticated, accountData, SBData, saveSendbirdInitialData } = this.props;
        // reverse array to get MOST recent array item
        const reversed = accountData.profilePicsVideos.reverse();

        if (SBData !== null && SBData.currentUser !== null) {
            for (let index = 0; index < reversed.length; index++) {
                const item = reversed[index];
                // check if image
                if (item.type.includes("image")) {
                    // create SB (sendbird) core-obj-data
                    const sb = returnSendbirdObj(authenticated);
                    // data to be given to sendbird
                    const fullName = `${accountData.firstName} ${accountData.lastName}`;
                    const profilePicture = `${process.env.REACT_APP_ASSET_LINK}/${item.link}`;
                   // update profile information - SENDBIRD related...
                    sb.updateCurrentUserInfo(fullName, profilePicture, (response, error) => {
                        if (error) {
                            // Handle error.
                            console.log("error while updating to lastest info!", error);
                        } else {
                            console.log("SUCCESSFULLY updated profile sendbird information!", response);
                        }
                    });
                    break;
                } 
            }
        } else {
            saveSendbirdInitialData(returnSendbirdObj(true))
        }
    }
    render () {
        const { authenticated, accountData } = this.props;
        const { updatedAlready } = this.state;
        // run other SENDBIRD Logic init
        if (authenticated === true) {
            // create sendbird data obj
            const sb = returnSendbirdObj(authenticated);
            
            console.log("validating - connecting user MESSAGING logic...", sb);
            
            sb.connect(accountData.uniqueId, (user, error) => {
                if (error) {
                    // Handle error.
                    console.log("Messaging connection error... :", error);
                }
                // The user is connected to Sendbird server.
                console.log(`The user - ${accountData.uniqueId} - is connected to Sendbird server`, user);

                if (!updatedAlready) {
                    this.renderOnceUpdateProfileSendbirdInfo();
                } 
            });
        }
        return null;
    }
}
const mapStateToProps = (state) => {
    console.log("Stateeeeeee", state);
    return {
        authenticated: _.has(state.auth.data, "accountType") ? true : false,
        accountData: state.auth.data,
        SBData: _.has(state.sendbirdInitData, "sendbirdInitData") ? state.sendbirdInitData.sendbirdInitData : null
    }
}
export default connect(mapStateToProps, { saveSendbirdInitialData })(MountingLogicRedux);