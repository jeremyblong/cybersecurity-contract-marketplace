import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Media, Badge } from 'reactstrap';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import LeftBar from './leftBar';
import RightBar from './rightBar';
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import helpers from "./miscFunctions/helperFunctions.js";
import _ from "lodash";
import { Link, useHistory }  from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connect } from "react-redux";
import moment from "moment";


const { renderProfilePicVideoSmallRounded } = helpers;

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
});
   

const TimelineTabEmployerProfileHelper = ({ employerData, activeHearts, userData }) => {

    const [ location, setLocation ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ listings, setListingsData ] = useState([]);

    const history = useHistory();

    const handleRedirectIndividualPage = (listing) => {
        console.log("listing passed: ", listing);

        history.push(`/view/individual/employer/listing/public/${listing.uniqueId}`, { listing });
    }

    useEffect(() => {
        setTimeout(() => {
            if (_.has(employerData, "currentCompanyAddress")) {
                axios.get(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(employerData.currentCompanyAddress.addressPostalCode)}.json?key=${process.env.REACT_APP_TOMTOM_API_KEY}&countrySet=US`).then((res) => {
                    if (res.data) {
                        console.log("res.data", res.data);
                        
                        const { results } = res.data;

                        for (let index = 0; index < results.length; index++) {
                            const el = results[index];
                            
                            if (el.type === "Geography") {
                                setLocation(el);
                                setReady(true);
                                break;
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                setReady(true);
            }
        }, 575)
    }, []);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/related/employer/listings/employer/account`, {
            params: {
                id: employerData.uniqueId
            }
        }).then((res) => {
            if (res.data.message === "Gathered related listings to choose from!") {
                console.log(res.data);

                const { listings } = res.data;

                setListingsData(listings);
            } else {
                console.log("Err", res.data);
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
                            <Card className='shadow-card-employer'>
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
                                        </Map> : ready === true ? <img src={require("../../../../../../assets/images/no-loc.png")} className={"no-loc-image"} /> : <Fragment>
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
                            {typeof listings !== "undefined" && listings.length > 0 ? listings.map((listing, i) => {
                                console.log("listing", listing);
                                return (
                                    <Card key={i} className={`${false ? 'shadow-card-employer' : 'ribbon-vertical-left-wrapper shadow-card-employer'}`}>
                                        <div className="job-search">
                                            <CardBody id="custom-cardbody-listing-map">
                                                <Media>
                                                    <img className="img-40 img-fluid m-r-20" src={require(`../../../../../../assets/images/user/6.jpg`)} alt="" />
                                                    <Media body>
                                                        <h6 className="f-w-600">
                                                            <Link className="heavy-blue" to={`${process.env.PUBLIC_URL}/app/jobSearch/job-detail`}> 
                                                                {listing.publicCompanyName}
                                                            </Link>
                                                            {(listing.applicants.includes(userData.uniqueId) ?
                                                                <span className="badge badge-primary pull-right">
                                                                    {"Already Applied!"}
                                                                </span>
                                                                : <div className="ribbon ribbon-bookmark ribbon-vertical-left ribbon-secondary">
                                                                    <i className="icofont icofont-love"></i>
                                                                </div>
                                                            )}
                                                        </h6>
                                                        <p>XP Reward: <em className="heavy-blue">{listing.experienceAndCost.experience}</em> <strong>~</strong> <em className="heavy-blue">{listing.tokensRequiredToApply.value}</em> tokens required to apply...</p>
                                                    </Media>
                                                </Media>
                                                <p style={{ marginTop: "0px" }}>Preferred applicant rank: <em className="heavy-blue">{listing.requiredRankToApply.label}</em></p>
                                                <p style={{ marginTop: "-15px" }}>Posted on: <em className="heavy-blue">{moment(listing.systemDate).fromNow()}</em></p>
                                                <div className="spacing-bottom">
                                                    {typeof listing.hashtags !== "undefined" && listing.hashtags.length > 0 ? listing.hashtags.map((tag, indexxxx) => {
                                                        return <Badge key={indexxxx} color="info" pill>{tag.text}</Badge>;
                                                    }) : null}
                                                </div>
                                                <ReactMarkdown className="custom-markdown-container" children={listing.listingDescription} remarkPlugins={[remarkGfm]} />
                                                <div className="btn-redirect-listing-container-wrapper">
                                                    <Button onClick={() => {
                                                        handleRedirectIndividualPage(listing);
                                                    }} style={{ width: "100%" }} className="btn-pill btn-air-info" outline color="info-2x">Visit/View Listing</Button>
                                                </div>
                                            </CardBody>
                                        </div>
                                    </Card>
                                )
                            }) : <Fragment>
                                <Card>
                                    <CardBody>
                                        <img src={require("../../../../../../assets/images/no-listings-availiable.png")} className={"no-listings-availiable"} />
                                    </CardBody>
                                </Card>
                            </Fragment>}
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
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(TimelineTabEmployerProfileHelper);