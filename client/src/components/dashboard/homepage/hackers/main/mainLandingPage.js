import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Media, Button, CardFooter } from 'reactstrap'
import DatePicker from "react-datepicker";
import ApexCharts from 'react-apexcharts'
import ChartistChart from 'react-chartist';
import Knob from "knob";
import { Currentlysale, Marketvalue } from '../../chartsData/apex-charts-data'
import { smallchart1data, smallchart1option, smallchart2data, smallchart2option, smallchart3data, smallchart3option, smallchart4data, smallchart4option } from '../../chartsData/chartist-charts-data'
import { Send, Clock } from 'react-feather';
import { Dashboard, Summary, Notification, MarketValue, Chat, New, Tomorrow, Yesterday, Daily, Weekly, Monthly, Store, Online, ReferralEarning, CashBalance, SalesForcasting, ProductOrderValue, Yearly, Today, Year, Month, Day, RightNow } from '../../../../../constant'
import axios from "axios";
import { connect } from "react-redux";
import { authentication } from "../../../../../redux/actions/authentication/auth.js";
import { NotificationManager } from 'react-notifications';
import "../../styles.css";
import { useHistory } from 'react-router-dom';
import "./styles.css";
import helpers from "./helpers/miscFunctions.js";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from "lodash";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import moment from "moment";



const { renderProfilePicVideoMainPageImg } = helpers;



const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  interactive: false
});

const MainLandingPageHackerHelper = ({ authentication, userData }) => {

  const history = useHistory();

  const [daytimes,setDayTimes] = useState();
  const [ user, setUserData ] = useState(null);
  const [ locationError, setLocationErr ] = useState("");
  const today = new Date()
  const curHr = today.getHours()
  const curMi = today.getMinutes()
  const [meridiem,setMeridiem] = useState("AM")
  // eslint-disable-next-line
  const [date, setDate] = useState({ date: new Date() });
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date());
  const [ paymentData, setPaymentData ] = useState({
    available: 0,
    instant: 0,
    pending: 0,
    ready: false
  })
  const handleChange = date => {
    setDate(date)
  };

  useEffect(() => {

    if (userData.accountType === "employers") {
      history.replace("/dashboard/employer");
    }

    if ("geolocation" in navigator) {
        console.log("Available");

        if (userData.accountType === "hackers") {
            navigator.geolocation.getCurrentPosition((position) => {
              console.log("Latitude is :", position.coords.latitude);
              //
              console.log("Longitude is :", position.coords.longitude);

              const location = {
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude
              };

              const { uniqueId } = userData;

              axios.post(`${process.env.REACT_APP_BASE_URL}/save/user/geolocation`, {
                  accountType: "hackers",
                  location,
                  id: uniqueId
              }).then((res) => {
                  if (res.data.message === "Successfully saved location data to account!") {
                      console.log(res.data);

                      const { user } = res.data;

                      console.log("user", user.value);

                      if (user.value !== null) {
                          authentication(user.value);

                          NotificationManager.success(`We've successfully updated your location so you have a better tailored user experience with our location-based services.`, 'Updated your location!', 3500);
                      }

                      // NotificationManager.success(`We've successfully updated your location so you have a better tailored user experience with our location-based services.`, 'Updated your location!', 3500);
                  } else {
                      console.log("err", res.data);

                      NotificationManager.error(`We've encountered an error updating your current location for our location-based services...`, 'Error updating location!', 3500);
                  }
              }).catch((err) => {
                  console.log(err);
              });
          }, (error) => {
              console.log("error gathering location - : ", error.message);

              if (error.message === "User denied geolocation prompt") {

                  setLocationErr(error.message);
              }
          });
        }
      } else {
        console.log("Not Available");
    }
 
    if (curHr < 12) {
      setDayTimes('Good Morning')
    }else if (curHr < 18) {
      setDayTimes('Good Afternoon')
    }else {
      setDayTimes('Good Evening')
    }

    if(curHr >= 12){
     setMeridiem('PM')
    }else{
      setMeridiem('AM')
    }
    
    // var ordervalue1 = Knob({
    //   value: 60,
    //   angleOffset: 0,
    //   thickness: 0.3,
    //   width: 65,
    //   fgColor: "#7366ff",
    //   readOnly: false,
    //   dynamicDraw: true,
    //   tickColorizeValues: true,
    //   bgColor: '#eef5fb',
    //   lineCap: 'round',
    //   displayPrevious: false
    // })
    // document.getElementById('ordervalue1').appendChild(ordervalue1);

    var ordervalue2 = Knob({
      value: 60,
      angleOffset: 0,
      thickness: 0.3,
      fgColor: "#7366ff",
      readOnly: false,
      width: 65,
      dynamicDraw: true,
      lineCap: 'round',
      displayPrevious: false
    })
    document.getElementById('ordervalue2').appendChild(ordervalue2);

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // fetch user data

    const configgg = {
      params: {
        accountType: userData.accountType,
        id: userData.uniqueId
      }
    }

    axios.get(`${process.env.REACT_APP_BASE_URL}/gather/general/user/data`, configgg).then((res) => {
        if (res.data.message === "Gathered user!") {
            console.log(res.data);

            const { user } = res.data;

            setUserData(user);

        } else {
            console.log("err", res.data);

            NotificationManager.error("An unknown error occurred while attempting to fetch this user's data/information...", "Error occurred while fetching user's data!", 4750);
        }
    }).catch((err) => {
        console.log(err);
    })
  }, [])

  const renderSkelatonLoading = (lines) => {
    return (
        <Fragment>
            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                <p>
                    <Skeleton count={lines} />
                </p>
            </SkeletonTheme>
        </Fragment>
    );
  }

  console.log("U.S.E.R :", user);

  const renderTopLeft = () => {
    if (user !== null) {
      const lastPicVid = user.profilePicsVideos[user.profilePicsVideos.length - 1];
      const bannerImageVideo = `${process.env.REACT_APP_ASSET_LINK}/${user.profileBannerImage.link}`;
      return (
        <Fragment>
          <Card className="o-hidden">
            <img src={bannerImageVideo} className={"backgroundcard-image"} />
            <CardBody className='ontop-other'>
              <div className="media">
                <div className="badge-groups w-100">
                  <div className="badge f-12">
                    <Clock style={{ width:"16px", height:"16px" }} className="mr-1"/>
                    <span id="txt">{curHr}:{curMi < 10 ? "0"+curMi :curMi} {meridiem}</span>
                  </div>
                  <div className="badge f-12"><i className="fa fa-spin fa-cog f-14"></i></div>
                </div>
              </div>
              <div className="greeting-user text-center">
                <div className="profile-vector">{renderProfilePicVideoMainPageImg(lastPicVid)}</div>
                <h4 style={{ marginTop: "32.5px" }} className="f-w-600 white-text-custom"><span id="greeting">{daytimes}</span> <span className="right-circle"><i className="fa fa-check-circle f-14 middle"></i></span></h4>
                <p className='white-text-custom'><span> {"Today's earrning is $405 & your sales increase rate is 3.7 over the last 24 hours"}</span></p>
                <div className="whatsnew-btn"><a className="btn btn-primary" href={null}>{"Whats New !"}</a></div>
                <div className="left-icon"><i className="fa fa-bell"> </i></div>
              </div>
            </CardBody>
          </Card>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {renderSkelatonLoading(22)}
        </Fragment>
      );
    }
  }
  useEffect(() => {
    
  }, [])
  useEffect(() => {
    const config = {
        params: {
            uniqueId: userData.uniqueId,
            accountType: "hackers"
        }
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/gather/availiable/stripe/bal`, config).then((res) => {
        if (res.data.message === "Gathered balance!") {

              const { bal } = res.data;

              for (let index = 0; index < bal.instant_available.length; index++) {
                  const element = bal.instant_available[index];
                  if (element.currency === "usd") {
                    setPaymentData(prevState => {
                      return {
                        ...prevState,
                        instant: element
                      }
                    })
                    break;
                  }
              }
              for (let index = 0; index < bal.available.length; index++) {
                  const element = bal.available[index];
                  if (element.currency === "usd") {
                    setPaymentData(prevState => {
                      return {
                        ...prevState,
                        available: element
                      }
                    })
                    break;
                  }
              }
              for (let index = 0; index < bal.pending.length; index++) {
                  const element = bal.pending[index];
                  if (element.currency === "usd") {
                    setPaymentData(prevState => {
                      return {
                        ...prevState,
                        pending: element
                      }
                    })
                    break;
                  }
              }

              setPaymentData(prevState => {
                return {
                  ...prevState,
                  ready: true
                }
              });
          } else {
              console.log("err", res.data);
              
              NotificationManager.warning("An unknown error has occurred while attempting to fetch your related balance related information, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
          }
    }).catch((err) => {
        console.log(err);

        NotificationManager.warning("An unknown error has occurred while attempting to fetch your related balance related information, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
    })
  }, []);

  console.log("paymentData", paymentData);


  const handleNotificationClick = (notification) => {
    console.log("handleNotificationClick", notification);
  }

  const viewAllNotifications = () => {
    history.push("/hacker/notifications");
  }

  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="Default" />
      <Container fluid={true}>
        {typeof locationError !== "undefined" && locationError.length > 0 ? <p style={{ color: "red" }} className="lead">{locationError}</p> : null}
        <Row className="second-chart-list third-news-update">
          <Col xl="4 xl-50" lg="12" className="morning-sec box-col-12">
            {renderTopLeft()}
          </Col>
          <Col xl="8 xl-100" className="dashboard-sec box-col-12">
            <Card className="earning-card shadow">
              <CardBody className="p-0">
                <Row className="m-0">
                  <Col xl="3" className="earning-content p-0">
                    <Row className="m-0 chart-left">
                      <Col xl="12" className="p-0 left_side_earning">
                        <h5>{Dashboard}</h5>
                        <p className="font-roboto">{"Overview of last month"}</p>
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning">
                        <h5>{"$4055.56"} </h5>
                        <p className="font-roboto">{"This Month Earning"}</p>
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning">
                        <h5>{"$1004.11"}</h5>
                        <p className="font-roboto">{"This Month Profit"}</p>
                      </Col>
                      <Col xl="12" className="p-0 left_side_earning">
                        <h5>{"90%"}</h5>
                        <p className="font-roboto">{"This Month Sale"}</p>
                      </Col>
                      <Col xl="12" className="p-0 left-btn"><a className="btn btn-gradient" href={null}>{Summary}</a></Col>
                    </Row>
                  </Col>
                  <Col xl="9" className="p-0">
                    <div className="chart-right">
                      <Row className="m-0 p-tb">
                        <Col xl="8" md="8" sm="8" className="col-12 p-0">
                          <div className="inner-top-left">
                            <ul className="d-flex list-unstyled">
                              <li>{Daily}</li>
                              <li className="active">{Weekly}</li>
                              <li>{Monthly}</li>
                              <li>{Yearly}</li>
                            </ul>
                          </div>
                        </Col>
                        <Col xl="4" md="4" sm="4" className="col-12 p-0 justify-content-end">
                          <div className="inner-top-right">
                            <ul className="d-flex list-unstyled justify-content-end">
                              <li>{Online}</li>
                              <li>{Store}</li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl="12">
                          <CardBody className="p-0">
                            <div className="current-sale-container">
                              <ApexCharts id="chart-currently" options={Currentlysale.options} series={Currentlysale.series} type='area' height={240} />
                            </div>
                          </CardBody>
                        </Col>
                      </Row>
                    </div>
                    <Row className="border-top m-0">
                      <Col xl="4" md="6" sm="6" className="pl-0">
                        <div className="media p-0">
                          <div className="media-left"><i className="icofont icofont-crown"></i></div>
                          <div className="media-body">
                            <h6>{ReferralEarning}</h6>
                            <p>{"$5,000.20"}</p>
                          </div>
                        </div>
                      </Col>
                      <Col xl="4" md="6" sm="6">
                        <div className="media p-0">
                          <div className="media-left bg-secondary"><i className="icofont icofont-heart-alt"></i></div>
                          <div className="media-body">
                            <h6>{CashBalance}</h6>
                            <p>{"$2,657.21"}</p>
                          </div>
                        </div>
                      </Col>
                      <Col xl="4" md="12" className="pr-0">
                        <div className="media p-0">
                          <div className="media-left"><i className="icofont icofont-cur-dollar"></i></div>
                          <div className="media-body">
                            <h6>{SalesForcasting}</h6>
                            <p>{"$9,478.50"}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="9 xl-100" className="chart_data_left box-col-12">
            <Card className={"shadow"}>
              <CardBody className="p-0">
                <Row className="m-0 chart-main">
                  <Col xl="3" md="6" sm="6" className="p-0 box-col-6">
                    <div className="media align-items-center">
                      <div className="hospital-small-chart">
                        <div className="small-bar">
                          <ChartistChart
                            className="small-chart flot-chart-container"
                            data={smallchart1data}
                            options={smallchart1option}
                            type={'Bar'}
                            listener={{
                              'draw': function (data) {
                                if (data.type === 'bar') {
                                  data.element.attr({
                                    style: 'stroke-width: 3px'
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="right-chart-content">
                          <h4>{paymentData.ready === true ? `$${(paymentData.available.amount / 100)}` : "Loading..."}</h4><span>Available Bal.</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xl="3" md="6" sm="6" className="p-0 box-col-6">
                    <div className="media align-items-center">
                      <div className="hospital-small-chart">
                        <div className="small-bar">
                          <ChartistChart
                            className="small-chart1 flot-chart-container"
                            data={smallchart2data}
                            options={smallchart2option}
                            type={'Bar'}
                            listener={{
                              'draw': function (data) {
                                if (data.type === 'bar') {
                                  data.element.attr({
                                    style: 'stroke-width: 3px'
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="right-chart-content">
                          <h4>{paymentData.ready === true ? `$${(paymentData.pending.amount / 100)}` : "Loading..."}</h4><span>Pending Bal.</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xl="3" md="6" sm="6" className="p-0 box-col-6">
                    <div className="media align-items-center">
                      <div className="hospital-small-chart">
                        <div className="small-bar">
                          <ChartistChart
                            className="small-chart2 flot-chart-container"
                            data={smallchart3data}
                            options={smallchart3option}
                            type={'Bar'}
                            listener={{
                              'draw': function (data) {
                                if (data.type === 'bar') {
                                  data.element.attr({
                                    style: 'stroke-width: 3px'
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="right-chart-content">
                          <h4>{user !== null && user.stripeAccountVerified === true ? "Verified!" : "NOT Verified."}</h4><span>Payment Acct. Verficiation</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xl="3" md="6" sm="6" className="p-0 box-col-6">
                    <div className="media border-none align-items-center">
                      <div className="hospital-small-chart">
                        <div className="small-bar">
                          <ChartistChart
                            className="small-chart3 flot-chart-container"
                            data={smallchart4data}
                            options={smallchart4option}
                            type={'Bar'}
                            listener={{
                              'draw': function (data) {
                                if (data.type === 'bar') {
                                  data.element.attr({
                                    style: 'stroke-width: 3px'
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="right-chart-content">
                          <h4>{user !== null && _.has(user, "tokens") ? user.tokens : "Loading..."}</h4><span>Account Token's</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" className="chart_data_right box-col-12">
            <Card className={"shadow"}>
              <CardBody>
                <div className="media align-items-center">
                  <div className="media-body right-chart-content">
                    <h4>{user !== null && _.has(user, "fullyVerified") && user.fullyVerified === true ? "Verified!" : "NOT Verified."}<span className="new-box">Verification Status</span></h4><span>Account Verification Status</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" className="chart_data_right second d-none">
            <Card className={"shadow"}>
              <CardBody>
                <div className="media align-items-center">
                  <div className="media-body right-chart-content">
                    <h4>{"$95,000"}<span className="new-box">{New}</span></h4><span>{ProductOrderValue}</span>
                  </div>
                  <div className="knob-block text-center">
                    <div className="knob1" id="ordervalue2"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50" className="news box-col-6">
            <Card className={"shadow"}>
              <CardHeader>
                <div className="header-top">
                  <h5 className="m-0">Recently Viewed 'Profile View's</h5>
                  <div className="card-header-right-icon">
                    <select className="button btn btn-primary">
                      <option>{Today}</option>
                      <option>{Tomorrow}</option>
                      <option>{Yesterday}</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <ListGroup>
                  {user !== null && typeof user.recentlyViewedProfileViews !== "undefined" && user.recentlyViewedProfileViews.length > 0 ? user.recentlyViewedProfileViews.slice(0, 4).map((viewer, index) => {
                      if (viewer !== null) {
                        return (
                            <Fragment key={index}>
                                <ListGroupItem onClick={() => {}} className={"list-group-item-action flex-column align-items-start notification-custom-notification"}>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1" style={{ marginRight: "12.5px" }}>{`${viewer.viewerName} has viewed your profile..`}</h5><br /><small>{`The viewer ${viewer.viewerName} has viewed your profile on ${moment(viewer.viewedOnLegibleDate).format("MM/DD/YYYY")} - This is a 'profile view' which means they visited your particular profile!`}</small>
                                            </div>
                                            <p className="mb-1">Has been a member since {moment(viewer.memberSince).fromNow()}...</p>
                                            <small>{viewer.viewedOnLegibleDate}</small>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </Fragment>
                          );
                        }
                    }) : <Fragment>
                        <img src={require("../../../../../assets/images/no-current-notifications.png")} className={"no-notifications-img"} />
                    </Fragment>}
                </ListGroup>
              </CardBody>
              <div className="card-footer">
                <div className="bottom-btn"><a href={null}>{"More..."}</a></div>
              </div>
            </Card>
          </Col>
          <Col xl="4 xl-50" className="appointment-sec box-col-6">
            <Row>
              <Col xl="12" className="appointment">
                <Card className={"shadow"}>
                  <CardHeader className='b-l-primary b-r-primary'>
                    <h4>Your current location (this is private information)</h4>
                  </CardHeader>
                  <CardBody style={{ marginTop: "27.5px" }} className="pt-0">
                    <Map
                      style="mapbox://styles/mapbox/streets-v9"
                      containerStyle={{
                        height: "275px",
                        width: '100%',
                        border: "3px solid grey"
                      }}
                      center={_.has(userData, "userLatestLocation") ? [userData.userLatestLocation.longitude, userData.userLatestLocation.latitude] : [104.9903, 39.7392]}
                    >
                      <Marker
                        coordinates={_.has(userData, "userLatestLocation") ? [userData.userLatestLocation.longitude, userData.userLatestLocation.latitude] : [104.9903, 39.7392]}
                        anchor="bottom"
                      >
                        <img src={require("../../../../../assets/icons/location.png")}/>
                      </Marker>
                    </Map>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="12" className="alert-sec">
                <Card className="bg-img shadow">
                  <CardHeader>
                    <div className="header-top">
                      <h5 className="m-0">{"Alert"}  </h5>
                      <div className="dot-right-icon"><i className="fa fa-ellipsis-h"></i></div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="body-bottom">
                      <h6>  {"10% off For drama lights Couslations..."}</h6><span className="font-roboto">{"Lorem Ipsum is simply dummy...It is a long established fact that a reader will be distracted by "} </span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl="4 xl-50" className="notification notification-custom box-col-6">
            <Card className="shadow-md-custom">
              <CardHeader className="card-no-border">
                <div className="header-top">
                  <h5 className="m-0">{Notification}</h5>
                  <div className="card-header-right-icon">
                    <select className="button btn btn-primary">
                      <option>{Today}</option>
                      <option>{Tomorrow}</option>
                      <option>{Yesterday}</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <ListGroup>
                  {user !== null && typeof user.notifications !== "undefined" && user.notifications.length > 0 ? user.notifications.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3).map((notification, index) => {
                      if (notification !== null) {
                        return (
                            <Fragment key={index}>
                                <ListGroupItem onClick={() => handleNotificationClick(notification)} className={notification.seenRead === true ? "list-group-item-action flex-column align-items-start notification-custom-notification active" : "list-group-item-action flex-column align-items-start notification-custom-notification"}>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1 maxed-title-notification" style={{ marginRight: "82.5px" }}>{notification.title.slice(0, 75)}{typeof notification.title !== "undefined" && notification.title.length >= 75 ? "..." : ""}</h5><small>{moment(notification.date).fromNow()}</small>
                                            </div>
                                            <p className="mb-1">{notification.description.slice(0, 100)}{typeof notification.description !== "undefined" && notification.description.length >= 100 ? "..." : ""}</p>
                                            <small>{notification.dateString}</small>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </Fragment>
                          );
                        }
                    }) : <Fragment>
                        <img src={require("../../../../../assets/images/no-current-notifications.png")} className={"no-notifications-img"} />
                    </Fragment>}
                </ListGroup>
              </CardBody>
              <CardFooter>
                <Button className={"btn-square-info"} color={"info-2x"} style={{ width: "100%" }} outline onClick={() => viewAllNotifications()}>View All Notification's</Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xl="4 xl-50" className="appointment box-col-6">
            <Card className={"shadow"}>
              <CardHeader>
                <div className="header-top">
                  <h5 className="m-0">{MarketValue}</h5>
                  <div className="card-header-right-icon">
                    <select className="button btn btn-primary">
                      <option>{Year}</option>
                      <option>{Month}</option>
                      <option>{Day}</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="radar-chart">
                  <ApexCharts id="marketchart" options={Marketvalue.options} series={Marketvalue.series} type='radar' height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-100" className="chat-sec box-col-6">
            <Card className="chat-default shadow">
              <CardHeader className="card-no-border">
                <div className="media media-dashboard">
                  <div className="media-body">
                    <h5 className="mb-0">{Chat}</h5>
                  </div>
                  <div className="icon-box"><i className="fa fa-ellipsis-h"></i></div>
                </div>
              </CardHeader>
              <CardBody className="chat-box">
                <div className="chat">
                  <div className="media left-side-chat">
                    <div className="media-body d-flex">
                      <div className="img-profile"> <img className="img-fluid" src={require("../../../../../assets/images/User.jpg")} alt="Profile" /></div>
                      <div className="main-chat">
                        <div className="message-main"><span className="mb-0">{"Hi deo, Please send me link."}</span></div>
                        <div className="sub-message message-main"><span className="mb-0">{RightNow}</span></div>
                      </div>
                    </div>
                    <p className="f-w-400">{"7:28 PM"}</p>
                  </div>
                  <div className="media right-side-chat">
                    <p className="f-w-400">{"7:28 PM"}</p>
                    <div className="media-body text-right">
                      <div className="message-main pull-right"><span className="mb-0 text-left">{"How can do for you"}</span>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div className="media left-side-chat">
                    <div className="media-body d-flex">
                      <div className="img-profile"> <img className="img-fluid" src={require("../../../../../assets/images/User.jpg")} alt="Profile" /></div>
                      <div className="main-chat">
                        <div className="sub-message message-main mt-0"><span>{"It's argenty"}</span></div>
                      </div>
                    </div>
                    <p className="f-w-400">{"7:28 PM"}</p>
                  </div>
                  <div className="media right-side-chat">
                    <div className="media-body text-right">
                      <div className="message-main pull-right"><span className="loader-span mb-0 text-left" id="wave"><span className="dot"></span><span className="dot"></span><span className="dot"></span></span></div>
                    </div>
                  </div>
                  <div className="input-group">
                    <input className="form-control" id="mail" type="text" placeholder="Type Your Message..." name="text" />
                    <div className="send-msg"><Send /></div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50" lg="12" className="calendar-sec box-col-6">
            <Card className="gradient-primary o-hidden shadow">
              <CardBody>
                <div className="default-datepicker">
                  <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    inline
                  />
                </div><span className="default-dots-stay overview-dots full-width-dots"><span className="dots-group"><span className="dots dots1"></span><span className="dots dots2 dot-small"></span><span className="dots dots3 dot-small"></span><span className="dots dots4 dot-medium"></span><span className="dots dots5 dot-small"></span><span className="dots dots6 dot-small"></span><span className="dots dots7 dot-small-semi"></span><span className="dots dots8 dot-small-semi"></span><span className="dots dots9 dot-small">                </span></span></span>
              </CardBody>
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
export default connect(mapStateToProps, { authentication })(MainLandingPageHackerHelper);