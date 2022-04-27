import React, {Fragment,useState,useEffect} from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, Media, Badge, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import JobFilter from './helpers/filter/filterJobs.js';
import { Link, useHistory }  from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connect } from "react-redux";
import "./styles.css";
import moment from "moment";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const LiveEmployerListingsHelper = ({ userData }) => {

    const history = useHistory();

    const [ listings, setListings ] = useState([]);
    const [ selectedQueries, setSelectedQueries ] = useState([]);
    const [ promotedListings, setPromotedListings ] = useState([]);

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

    useEffect(() => {
        
        const configuration = {
            params: {
                alreadyPooled: []
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/employer/listings/general/promoted/only`, configuration).then((res) => {
            if (res.data.message === "Gathered general employer listings!") {
                console.log(res.data);

                const { listings } = res.data;

                setPromotedListings(listings);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    
    const calculateFilterType = (listing) => {
        console.log("calculateFilterType listing", listing);

        const hackerCount = selectedQueries.filter((item) => item.type === 'required-hackers').map((item) => item.num);
        const tokensSelected = selectedQueries.filter((item) => item.type === "tokens-to-apply-contract").map((item) => item.num);
        const currentNumberOfApplicants = selectedQueries.filter((item) => item.type === "total-current-applicants").map((item) => item.num);

        const maxApplicantsNum =  Math.max.apply(null, currentNumberOfApplicants);

        const returningOperations = ( 
            selectedQueries.indexOf(listing.typeOfHack.value) !== -1 || 
            selectedQueries.includes("filter-by-likes-highest") ? Math.max.apply(Math, () => listing.likes) : null || 
            selectedQueries.includes("filter-by-dislikes-highest") ? Math.min.apply(Math, () => listing.dislikes) : null ||
            hackerCount.includes(listing.maxNumberOfApplicants.value) || 
            tokensSelected.includes(listing.tokensRequiredToApply.value) || 
            listing.applicants.length <= maxApplicantsNum
        );
        // maxNumberOfApplicants.value
        return returningOperations;
    }

    const calculateSort = (a, b) => {
        console.log("a b", a, b);
        if (selectedQueries.includes("newest")) {
            return new Date(b.systemDate) - new Date(a.systemDate);
        } else {
            return new Date(a.systemDate) - new Date(b.systemDate);
        }
    }

    console.log("selectedQueries", selectedQueries);

    const renderMainContent = () => {
        
        if (selectedQueries.includes("oldest") || selectedQueries.includes("newest")) {
            const sorted = listings.sort((a, b) => calculateSort(a, b));

            console.log("sorted", sorted);

            return (
                <Fragment>
                    {sorted.filter((listing) => calculateFilterType(listing)).map((listing, i) => {
                        console.log("sorted listing", listing);
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
                </Fragment>
            );
        } else {

            return (
                <Fragment>
                    {listings.filter((listing) => calculateFilterType(listing)).map((listing, i) => {
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
                </Fragment>
            );
        }
    }

    console.log("selectedQueries", selectedQueries);
    return (
        <Fragment>
            <Breadcrumb parent="Active Hacking Opportunities" title="Hacking Jobs & Promoted Contracts (Top Row ONLY)"/>
            <Container fluid={true}>
                <Row>
                    <Col xl="12 xl-100" sm="12" lg="12" md="12">
                        <Container fluid={true}>
                            <Card className='placeholder-promoted-card'>
                                <div className='spacer-top-portion-promoted'>
                                    <h2 className='boosted-listings-title'>These are <strong style={{ textDecorationLine: "underline" }}>BOOSTED LISTINGS</strong> in which the employer has <strong style={{ textDecorationLine: "underline" }}>paid</strong> to promote for a limited time..</h2>
                                    <hr />
                                    <p className='lead lead-boosted'>These are our <strong>TOP</strong> employer listings's and/or contracted jobs! These user's have showed interest in making their <strong>listing</strong> visibile and these employer's are <em>generally</em> MUCH more serious about such contracted gigs/jobs - you're in good hands with these listings...</p>
                                    <hr />
                                </div>
                                <Row className='overflow-x-scrolley'>
                                    <div className='row-promoted-listings-flex'>
                                        {typeof promotedListings !== "undefined" && promotedListings.length > 0 ? promotedListings.map((listing, i) => {
                                            console.log("promotedListings", listing);
                                            return (
                                                <Col xl="6 xl-100" key={i}>
                                                    <Card className={`${false ? 'shadowey-promoted-card' : 'shadowey-promoted-card ribbon-vertical-left-wrapper'}`}>
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
                                        }) : <Fragment>
                                            <div className='no-promoted-listings-wrapper centered-both-ways'>
                                                <img src={require("../../../../../../assets/images/no-promoted-listings.png")} className={"longer-image-no-promoted"} />
                                            </div>  
                                        </Fragment>}
                                    </div>
                                </Row>
                            </Card>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <JobFilter selectedQueries={selectedQueries} setSelectedQueries={setSelectedQueries} />
                    <Col xl="9 xl-60">
                        <Row>
                            {typeof listings !== "undefined" && listings.length > 0 ? renderMainContent() : <Fragment>
                            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                <p>
                                    <Skeleton count={65} />
                                </p>
                            </SkeletonTheme>
                            </Fragment>}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <div className="centered-both-ways">
                        <Pagination className="m-b-30" aria-label="Page navigation example">
                            <ul className="pagination pagination-lg pagination-secondary">
                                <PaginationItem><PaginationLink href={null}>{"Previous"}</PaginationLink></PaginationItem>
                                <PaginationItem active><PaginationLink href={null}>{"1"}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href={null}>{"2"}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href={null}>{"3"}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink href={null}>{"Next"}</PaginationLink></PaginationItem>
                            </ul>
                        </Pagination>
                    </div>
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