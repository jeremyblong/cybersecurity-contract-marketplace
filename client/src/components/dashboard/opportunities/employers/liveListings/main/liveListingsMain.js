import React, {Fragment,useState,useEffect} from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Container,Row,Col,Card,CardBody,Media,Badge,Button } from 'reactstrap';
import JobFilter from './helpers/filter/filterJobs.js';
import { Link, useHistory }  from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connect } from "react-redux";
import "./styles.css";
import moment from "moment";

const LiveEmployerListingsHelper = ({ userData }) => {

    const history = useHistory();

    const [ listings, setListings ] = useState([]);

    const handleRedirectIndividualPage = (listing) => {
        console.log("listing passed: ", listing);

        history.push(`/view/individual/employer/listing/public/${listing.uniqueId}`, { listing });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/employer/listings/general`).then((res) => {
            if (res.data.message === "Gathered general employer listings!") {
                console.log(res.data);

                const { listings } = res.data;

                setListings(listings);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <Fragment>
            <Breadcrumb parent="Active Hacking Opportunities" title="Hacking Jobs"/>
            <Container fluid={true}>
                <Row>
                    <JobFilter />
                    <Col xl="9 xl-60">
                        <Row>
                            {listings.map((listing, i) => {
                                console.log("listing", listing);
                                return (
                                    <Col xl="6 xl-100" key={i}>
                                        <Card className={`${false ? '' : 'ribbon-vertical-left-wrapper'}`}>
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
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(LiveEmployerListingsHelper);