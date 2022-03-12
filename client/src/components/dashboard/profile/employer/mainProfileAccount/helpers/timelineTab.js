import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Media, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import one from "../../../../../../assets/images/user/1.jpg";
import three from "../../../../../../assets/images/user/3.jpg";
import two from "../../../../../../assets/images/user/2.png";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import timeline2 from "../../../../../../assets/images/social-app/timeline-2.png";
import { MoreVertical } from 'react-feather';
import LeftBar from './leftBar';
import RightBar from './rightBar';
import { ELANA, JasonBorne, AlexendraDhadio, OliviaJon, IssaBell, MoreCommnets } from "../../../../../../constant";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import helpers from "./miscFunctions/helperFunctions.js";
import _ from "lodash";

const { renderProfilePicVideoSmallRounded } = helpers;

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
});
   

const TimelineTabEmployerProfileHelper = ({ employerData, activeHearts }) => {

    const [ location, setLocation ] = useState(null);

    useEffect(() => {
        axios.get(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(employerData.currentCompanyAddress.addressPostalCode)}.json?key=${process.env.REACT_APP_TOMTOM_API_KEY}&countrySet=US`).then((res) => {
            if (res.data) {
                console.log("res.data", res.data);
                
                const { results } = res.data;

                for (let index = 0; index < results.length; index++) {
                    const el = results[index];
                    
                    if (el.type === "Geography") {
                        setLocation(el);
                        break;
                    }
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <Fragment>
        <Row>
            <Col xl="3 xl-40 box-col-4" lg="12" md="5">
                <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc4">
                    <Row>
                        <LeftBar activeHearts={activeHearts} employerData={employerData} />
                    </Row>
                </div>
            </Col>
            <Col xl="6 xl-60 box-col-8" lg="12" md="7">
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <div className="new-users-social">
                                    <Media>
                                        {renderProfilePicVideoSmallRounded(_.has(employerData, "profilePicsVideos") && typeof employerData.profilePicsVideos !== "undefined" && employerData.profilePicsVideos.length > 0 ? employerData.profilePicsVideos[employerData.profilePicsVideos.length - 1] : null)}
                                        <Media body>
                                            <h6 className="mb-0 f-w-700">Employer Approx. Location</h6>
                                            <p>{`${employerData.firstName} ${employerData.lastName}`}</p>
                                        </Media>
                                    </Media>
                                </div>
                                <div className='map-content-wrapper'>
                                    <h4 className='map-header-employer-profile'>Employer <strong>GENERAL</strong> location (NOT the employer's actual location - ONLY APPROX.)</h4>
                                    <p className='leader-employer-profile'>This is the employer's approx. location so you can 'ballpark' which contracted gigs are appropriate VS which jobs arent <strong>IF</strong> you're looking for a <strong>physical hack contract</strong> - this will generally just show the relevant city based on a <strong>zip-code lookup</strong>.</p>
                                    {location !== null ? <Map
                                        center={[location.position.lon, location.position.lat]}
                                        zoom={[10]}
                                        style="mapbox://styles/mapbox/streets-v9"
                                        containerStyle={{
                                            height: "275px",
                                            width: '100%',
                                            border: "2px solid grey"
                                        }}
                                    >
                                        <Marker
                                            coordinates={[location.position.lon, location.position.lat]}
                                            anchor="bottom"
                                        >
                                            <img src={require("../../../../../../assets/icons/location.png")}/>
                                        </Marker>
                                    </Map> : <Fragment>
                                        <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                            <p>
                                                <Skeleton count={35} />
                                            </p>
                                        </SkeletonTheme>
                                    </Fragment>}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <div className="new-users-social">
                                    <Media>
                                        <Media className="rounded-circle image-radius m-r-15" src={one} alt="" />
                                        <Media body>
                                            <h6 className="mb-0 f-w-700">{ELANA}</h6>
                                            <p>{"January, 12,2019"}</p>
                                        </Media><span className="pull-right mt-0"><MoreVertical /></span>
                                    </Media>
                                </div>
                                <Media className="img-fluid" alt="" src={timeline2} />
                                <div className="timeline-content">
                                    <p>
                                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed urna in justo euismod condimentum. Fusce placerat enim et odio molestie sagittis."}
                                    </p>
                                    <div className="like-content"><span><i className="fa fa-heart font-danger"></i></span><span className="pull-right comment-number"><span>{"20"} </span><span><i className="fa fa-share-alt mr-0"></i></span></span><span className="pull-right comment-number"><span>{"10"} </span><span><i className="fa fa-comments-o"></i></span></span></div>
                                    <div className="social-chat">
                                        <div className="your-msg">
                                            <Media>
                                                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                <Media body><span className="f-w-600">{JasonBorne} <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                    <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                                </Media>
                                            </Media>
                                        </div>
                                        <div className="other-msg">
                                            <Media>
                                                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={two} />
                                                <Media body><span className="f-w-600">{AlexendraDhadio} <span>{"1 Month Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                    <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
                                                </Media>
                                            </Media>
                                        </div>
                                        <div className="other-msg">
                                            <Media>
                                                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={three} />
                                                <Media body><span className="f-w-600">{OliviaJon} <span>{"15 Days Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                    <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
                                                </Media>
                                            </Media>
                                        </div>
                                        <div className="your-msg">
                                            <Media>
                                                <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                                <Media body><span className="f-w-600">{IssaBell} <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                                    <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                                </Media>
                                            </Media>
                                        </div>
                                        <div className="text-center"><a href={null}>{MoreCommnets}</a></div>
                                    </div>
                                    <div className="comments-box">
                                        <Media>
                                            <Media className="img-50 img-fluid m-r-20 rounded-circle" alt="" src={one} />
                                            <Media body>
                                                <InputGroup className="text-box">
                                                    <Input className="form-control input-txt-bx" type="text" name="message-to-send" placeholder="Post Your commnets" />
                                                    <InputGroupAddon addonType="append">
                                                        <Button color="transparent"><i className="fa fa-smile-o">  </i></Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Media>
                                        </Media>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col xl="3 xl-100 box-col-12">
                    <div className="default-according style-1 faq-accordion job-accordion" id="accordionoc1">
                        <Row>
                            <RightBar employerData={employerData} />
                        </Row>
                    </div>
                </Col>
        </Row>
        </Fragment>
    );
};

export default TimelineTabEmployerProfileHelper;