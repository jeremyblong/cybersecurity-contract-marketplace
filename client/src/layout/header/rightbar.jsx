import React, { Fragment, useState, useEffect } from 'react';
import man from '../../assets/images/dashboard/profile.jpg'
import { FileText, LogIn, Mail, User, MessageSquare, Bell, Minimize, Search, ShoppingCart, Minus, Plus, X, DollarSign } from 'react-feather';
import Bookmark from "../../layout/bookmark"
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate,
} from 'react-switch-lang';
import { saveSendbirdInitialData } from "../../redux/actions/messaging/initialization/initSBLogic.js";
import { English, Deutsch, Español, Français, Português, 简体中文, Notification, ViewAll, MessageBox, Account, Inbox, LogOut, AinChavez, CheckOut, OrderTotal, GoToShopingBag } from '../../constant'
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { authentication } from "../../redux/actions/authentication/auth.js";
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { saveListingData } from "../../redux/actions/employer/listings/listingData.js";
import { saveSoftwareListingInfo } from "../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";
// language imports...
import en from '../../assets/i18n/en.json';
import es from '../../assets/i18n/es.json';
import pt from '../../assets/i18n/pt.json';
import fr from '../../assets/i18n/fr.json';
import du from '../../assets/i18n/du.json';
import cn from '../../assets/i18n/cn.json';
import ae from '../../assets/i18n/ae.json';
import { InputGroup, InputGroupAddon, Button, Media, ListGroupItem, Row, Col } from 'reactstrap';
import { updateCourseInformationData } from "../../redux/actions/courses/createNewCourse/index.js";
import "./styles.css";
import ReactPlayer from "react-player";
import moment from "moment";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


// translation logic...
setTranslations({ en, es, pt, fr, du, cn, ae });
setDefaultLanguage('en');
setLanguageCookie();

// actual component starts...
const Rightbar = ({ userData, SBData, balance, ready, authenticated, data, authentication, saveListingData, saveSoftwareListingInfo, saveSendbirdInitialData, updateCourseInformationData }) => {
  const history = useHistory();

  const [searchresponsive, setSearchresponsive] = useState(false)
  const [langdropdown, setLangdropdown] = useState(false)
  const [moonlight, setMoonlight] = useState(false)
  const [selected, setSelected] = useState("en");
  const [ notifications, setNotifications ] = useState([]);
  const [cartDropdown, setCartDropDown] = useState(false)
  const [notificationDropDown, setNotificationDropDown] = useState(false)
  const [chatDropDown, setChatDropDown] = useState(false);
  const [groupChannels, setGroupChannels] = useState([]);

  useEffect(() => {
    if (typeof userData !== "undefined" && userData !== null) {
      console.log("running!!!!!");

      const configuration = {
          params: {
              uniqueId: userData.uniqueId,
              accountType: userData.accountType 
          }
      }

      const promises = [];

      axios.get(`${process.env.REACT_APP_BASE_URL}/gather/account/notifications`, configuration).then((res) => {
          if (res.data.message === "Successfully gathered notifications!") {
              console.log("successfully gathered notifications..:", res.data);

              const { notifications } = res.data;

              for (let index = 0; index < notifications.length; index++) {
                  const notify = notifications[index];
                  
                  promises.push(new Promise(async (resolve, reject) => {
                      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/profile/pic/video/only`, {
                          params: {
                              uniqueId: notify.metadata.from
                          }
                      })

                      if (result.data.message === "Gathered resource!") {
                          const file = result.data.file;

                          notify.profilePicVideo = file;

                          resolve(notify);
                      } else {
                          resolve(null);
                      }
                  }))
              }

              Promise.all(promises).then((passedData) => {
                  console.log("passedData", passedData);

                  setNotifications(passedData);
              })
          } else {
              console.log("err", res.data);

              // NotificationManager.error("An unknown error has occurred while attempting to gather related profile notifications! Please reload the page or contact support if the problem persists..", "Error occurred while fetching notifications!", 4750);
          }
        }).catch((err) => {
            console.log(err);

            // NotificationManager.error("An unknown error has occurred while attempting to gather related profile notifications! Please reload the page or contact support if the problem persists..", "Error occurred while fetching notifications!", 4750);
        })
      }
    }, [userData]);

  const handleSetLanguage = (key) => {
    setLanguage(key);
    setSelected(key)
  };

  useEffect(() => {
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true)
    }
  }, []);

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.remove("open");
    }
  }

  const LanguageSelection = (language) => {
    if (language) {
      setLangdropdown(!language)
    } else {
      setLangdropdown(!language)
    }
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light)
      document.body.className = "light"
      localStorage.setItem('layout_version', 'light');
    } else {
      setMoonlight(!light)
      document.body.className = "dark-only"
      localStorage.setItem('layout_version', 'dark-only');
    }
  }
  const handleDeauthentication = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/logout`, {
      params: {
        uniqueId: data.uniqueId,
        accountType: data.accountType
      },
      withCredentials: true
    }).then((res) => {
      if (res.data.message === "Successfully logged out!") {
        console.log("res.data - logout", res.data);

        NotificationManager.info('You have successfully logged-out!', 'Successfully deauthenticated...', 3000);

        authentication({});
        saveListingData({});
        updateCourseInformationData({});
        saveSendbirdInitialData({});
        saveSoftwareListingInfo({});
      } else {
        console.log("err", res.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  // gather availiable pending balance

  const handlePreviewActivate = () => {
    confirmAlert({
      title: 'Want to Sign-Out?',
      message: "Are you sure you'd like to sign-out? This will take your status 'offline' and will sign you out.",
      buttons: [
        {
          label: 'Sign-out',
          onClick: () => {
            handleDeauthentication();
          }
        },
        {
          label: 'Cancel',
          onClick: () => {
            console.log("do nothing...");
          }
        }
      ]
    });
  }
  const renderAccountType = (accountType) => {
    if (accountType === "hackers") {
      return "Hacker";
    } else {
      return "Employer";
    }
  }
  const renderProfilePicVideo = (last) => {

    if (last !== null && _.has(last, "link")) {
      if (last.type.includes("video")) {
        // video logic
        return <ReactPlayer playing={true} loop={true} muted={true} controls={false} width={"100%"} className={"b-r-10 topbar-right-video-profile"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />;
      } else {
        // image logic
        return <img className="b-r-10 blue-medium-border-addition" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} alt="" />;
      }
    } else {
      // image logic
      return <img className="b-r-10 blue-medium-border-addition" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} alt="" />;
    }
  }

  useEffect(() => {
    if (_.has(SBData, "OpenChannel") && authenticated === true) {
      console.log("true ran............................");

      const listQuery = SBData.GroupChannel.createMyGroupChannelListQuery();
      listQuery.includeEmpty = true;
      listQuery.memberStateFilter = 'joined_only';    // 'all', 'joined_only', 'invited_only', 'invited_by_friend', and 'invited_by_non_friend'
      listQuery.order = 'latest_last_message';    // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
      listQuery.limit = 20;   // The value of pagination limit could be set up to 100.

      if (listQuery.hasNext) {
        listQuery.next((groupChannels, error) => {
          if (error) {
            console.log("Err fetching previous msgs..", error);
          } else {
            console.log("Gathered channels!", groupChannels);

            setGroupChannels(groupChannels.slice(0, 5));
          }
        });
      }
    } else {
      console.log("else ran................................");
    }
  }, [SBData]);

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
  const renderProfilePicVideoNotification = (last) => {
    if (last !== null && _.has(last, "link")) {
        if (last.type.includes("video")) {
            // video logic
            return (
                <Media className="notification-pic-video pic-vid-min-height-width" body>
                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"notification-pic-video pic-vid-min-height-width"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />
                </Media>
            );
        } else {
            // image logic
            return <Media className="notification-pic-video pic-vid-min-height-width" body alt="profile-picture-sub" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} data-intro="This is Profile image" />;
        }  
    } else {
        // image logic
        return <Media className="notification-pic-video pic-vid-min-height-width" body alt="profile-picture-sub" src={process.env.REACT_APP_PLACEHOLDER_IMAGE} data-intro="This is Profile image" />;
    } 
  }
  console.log("rightbar notifications", notifications);
  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="language-nav">
            <div className={`translate_wrapper ${langdropdown ? 'active' : ''}`}>
              <div className="current_lang">
                <div className="lang" onClick={() => LanguageSelection(langdropdown)}>
                  <i className={`flag-icon flag-icon-${selected === "en" ? "us" : selected === "du" ? "de" : selected}`}></i>
                  <span className="lang-txt">{selected}</span>
                </div>
              </div>
              <div className={`more_lang ${langdropdown ? 'active' : ''}`}>
                <div className="lang" onClick={() => handleSetLanguage('en')}><i className="flag-icon flag-icon-us"></i><span className="lang-txt">{English}<span> {"(US)"}</span></span></div>
                <div className="lang" onClick={() => handleSetLanguage('du')}><i className="flag-icon flag-icon-de"></i><span className="lang-txt">{Deutsch}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('es')}><i className="flag-icon flag-icon-es"></i><span className="lang-txt">{Español}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('fr')}><i className="flag-icon flag-icon-fr"></i><span className="lang-txt">{Français}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('pt')}><i className="flag-icon flag-icon-pt"></i><span className="lang-txt">{Português}<span> {"(BR)"}</span></span></div>
                <div className="lang" onClick={() => handleSetLanguage('cn')}><i className="flag-icon flag-icon-cn"></i><span className="lang-txt">{简体中文}</span></div>
                <div className="lang" onClick={() => handleSetLanguage('ae')}><i className="flag-icon flag-icon-ae"></i><span className="lang-txt">{"لعربية"}<span> {"(ae)"}</span></span></div>
              </div>
            </div>
          </li>
          <li><span className="header-search"><Search onClick={() => SeacrhResposive(searchresponsive)} /></span></li>
          <li className="onhover-dropdown">
            <div className="notification-box" onClick={() => setNotificationDropDown(!notificationDropDown)}><Bell /><span className="badge badge-pill badge-secondary">2</span></div>
            <ul className={`notification-dropdown notification-dropdown-custom onhover-show-div ${notificationDropDown ? "active" : ""}`}>
              <li>
                <Bell />
                <h6 className="f-18 mb-0">Recently Received Notification(s)</h6>
              </li>
              {typeof notifications !== "undefined" && notifications.length > 0 ? notifications.slice(0, 7).map((notification, index) => {
                console.log("notification", notification)
                if (notification !== null) {
                    return (
                        <Fragment key={index}>
                            <ListGroupItem className={notification.seenRead === true ? "list-group-item-action flex-column align-items-start notification-custom-notification dropdown-notification-top-bar active" : "list-group-item-action flex-column align-items-start notification-custom-notification dropdown-notification-top-bar"}>
                                <Row>
                                    <Col sm="12" md="2" lg="2" xl="2">
                                        {renderProfilePicVideoNotification(notification.profilePicVideo)}
                                    </Col>
                                    <Col sm="12" md="10" lg="10" xl="10">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1 maxed-title-notification">{notification.title.slice(0, 55)}{typeof notification.title !== "undefined" && notification.title.length >= 55 ? "..." : ""}</h5><small>{moment(notification.date).fromNow()}</small>
                                        </div>
                                        <p className="mb-1">{notification.description.slice(0, 125)}{typeof notification.description !== "undefined" && notification.description.length >= 125 ? "..." : ""}</p>
                                        <small>{notification.dateString}</small>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </Fragment>
                    );
                }
              }) : <Fragment>
                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                    <p>
                        <Skeleton count={20} />
                    </p>
                </SkeletonTheme>
              </Fragment>}
              {/* <li>
                <p><i className="fa fa-circle-o mr-3 font-primary"> </i>{DeliveryProcessing} <span className="pull-right">{"10 min."}</span></p>
              </li> */}
              <li><button onClick={() => {
                if (data.accountType === "employers") {
                  history.push("/employer/notifications");
                } else {
                  history.push("/hacker/notifications");
                }
              }} className="btn btn-primary" >Check All Notification's</button>
              </li>
            </ul>
          </li>
          {/* <Bookmark /> */}
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}><i className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i></div>
          </li> {/*
          <li className="cart-nav onhover-dropdown">
            <div className="cart-box" onClick={() => setCartDropDown(!cartDropdown)}><ShoppingCart /><span className="badge badge-pill badge-primary">{"2"}</span></div>
            <ul className={`cart-dropdown onhover-show-div ${cartDropdown ? "active" : ""}`}>
              <li>
                <h6 className="mb-0 f-20">Shopping Cart</h6><ShoppingCart />
              </li>
              <li className="mt-0">
                <div className="media" ><img className="img-fluid rounded-circle mr-3 img-60" src={require("../../assets//images/ecommerce/01.jpg")} alt="" />
                  <div className="media-body"><span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                    <p>{"Yellow(#fcb102)"}</p>
                    <div className="qty-box">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <button className="btn quantity-left-minus" type="button" data-type="minus" data-field=""><Minus /></button>
                        </InputGroupAddon>
                        <input className="form-control input-number" type="text" name="quantity" defaultValue="1" />
                        <InputGroupAddon addonType="prepend">
                          <button className="btn quantity-right-plus" type="button" data-type="plus" data-field=""><Plus /></button>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <h6 className="text-right text-muted">{"$299.00"}</h6>
                  </div>
                  <div className="close-circle"><a href={null}><X /></a></div>
                </div>
              </li>
              <li className="mt-0">
                <div className="media" ><img className="img-fluid rounded-circle mr-3 img-60" src={require("../../assets//images/ecommerce/03.jpg")} alt="" />
                  <div className="media-body"><span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                    <p>{"Yellow(#fcb102)"}</p>
                    <div className="qty-box">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <button className="btn quantity-left-minus" type="button" data-type="minus" data-field=""><Minus /></button>
                        </InputGroupAddon>
                        <input className="form-control input-number" type="text" name="quantity" defaultValue="1" />
                        <InputGroupAddon addonType="prepend">
                          <button className="btn quantity-right-plus" type="button" data-type="plus" data-field=""><Plus /></button>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <h6 className="text-right text-muted">{"$299.00"}</h6>
                  </div>
                  <div className="close-circle"><a href={null}><X /></a></div>
                </div>
              </li>
              <li>
                <div className="total">
                  <h6 className="mb-2 mt-0 text-muted">{OrderTotal} : <span className="f-right f-20">{"$598.00"}</span></h6>
                </div>
              </li>
              <li>
                <Button color="primary" className="btn btn-block view-cart">{GoToShopingBag}</Button>
                <Button color="secondary" className="btn-block view-cart mt-2">{CheckOut}</Button>
              </li>
            </ul>
          </li> */}
          <li className="onhover-dropdown" onClick={() => setChatDropDown(!chatDropDown)}><MessageSquare />
            <ul className={`chat-dropdown onhover-show-div ${chatDropDown ? "active" : ""}`}>
              <li>
                <MessageSquare />
                <h6 className="f-18 mb-0">{MessageBox}</h6>
              </li>
              {groupChannels.map((item, i) => {
                return (
                  <li key={i}>
                    <div className="media">
                      <img className="img-fluid rounded-circle mr-3" src={item.coverUrl} alt="" />
                      <div className={`status-circle ${renderOnlineStatus(item, userData)}`}></div>
                      <div className="media-body"><span>{item.creator.nickname}</span>
                        <p>{item.data}</p>
                      </div>
                      <p className="f-12 font-success">{moment(item.createdAt).fromNow()}</p>
                    </div>
                  </li>
                );
              })}
              <li className="text-center"> <button onClick={() => {
                history.push("/messaging/main")
              }} className="btn btn-primary">{ViewAll}</button></li>
            </ul>
          </li>
          <li className="maximize"><a className="text-dark" href={null} onClick={goFull}><Minimize /></a></li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              {typeof data.profilePicsVideos !== "undefined" && data.profilePicsVideos.length > 0 ? renderProfilePicVideo(data.profilePicsVideos[data.profilePicsVideos.length - 1]) : <img className="b-r-10" src={man} alt="" />}
              <div className="media-body"><span>{authenticated === true ? `${data.firstName} ${data.lastName}` : "Un-authenticated"}</span>
                <p className="mb-0 font-roboto">{authenticated === true ? renderAccountType(data.accountType) : "Un-authenticated"}<i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={() => {
                history.push("/both/accounts/view/balance/info");
              }}><DollarSign /><span style={{ color: "#f73164" }}>Account Balance: ${ready === false ? "---" : balance}</span></li>
              <li onClick={() => {
                history.push("/funding/top/off/balance/both");
              }}><DollarSign /><span>Deposit Funds Into Account</span></li>
              <li onClick={() => {
                if (data.accountType === "employers") {
                  console.log("employer ran.");

                  history.push("/employer/profile/main/display/personal");
                } else {
                  console.log("hacker ran.");

                  history.push("/hacker/profile/main/display/personal");
                }
              }}><User /><span>{Account} </span></li>
              {data.accountType === "hackers" ? <li className={"row-wrap"} onClick={() => {
                history.push(`/hacker/profile/individual/view/${data.uniqueId}`);
              }}><FileText /><span className={"row-wrap"}>View Public H&shy;acker-Account</span></li> : <li className={"row-wrap"} onClick={() => {
                history.push(`/employer/individual/profile/main/${data.uniqueId}`)
              }}><FileText /><span className={"row-wrap"}>View Public E&shy;mployer-Account</span></li>}
              <li onClick={() => {
                history.push("/messaging/main");
              }}><Mail /><span>{Inbox}</span></li>
              {data.accountType === "employers" ? <li><User /><span><strong style={{ color: "blue", textDecorationLine: "underline" }}>{typeof data.applicants !== "undefined" ? data.applicants.length : "0"}</strong>{" Current Applicant(s)"}</span></li> : null}
              <li><LogIn /><span onClick={handlePreviewActivate}>{LogOut}</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}

const mapStateToProps = (state) => {
  return {
    data: state.auth.data,
    SBData: _.has(state.sendbirdInitData, "sendbirdInitData") ? state.sendbirdInitData.sendbirdInitData : null,
    authenticated: (_.has(state.auth, "data") && Object.keys(state.auth.data).length > 0) ? true : false,
    userData: state.auth.data
  }
}
export default connect(mapStateToProps, { authentication, saveListingData, saveSoftwareListingInfo, saveSendbirdInitialData, updateCourseInformationData })(translate(Rightbar));