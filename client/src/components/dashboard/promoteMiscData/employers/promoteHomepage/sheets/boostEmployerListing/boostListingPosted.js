import React, { useState, useEffect, Fragment } from 'react';
import "./styles.css";
import Sheet from 'react-modal-sheet';
import { Button, Container, Row, Col, Card, CardHeader, CardBody, Progress, Badge, Label }  from "reactstrap";
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactPlayer from 'react-player';
import moment from "moment";


const BoostAlreadyPostedEmployerListingPaneHelper = ({ userData, listingBoostSelected, employerListingPromotePane, setSheetOpenEmployerListingPromote }) => {

    const [ listings, setListingData ] = useState([]);
    const [ selected, setSelected ] = useState(null);
    const [ fullySelected, setFullySelected ] = useState(null);

    useEffect(() => {

        const configuration = {
            params: {
                id: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/related/employer/listings/employer/account`, configuration).then((res) => {
            if (res.data.message === "Gathered related listings to choose from!") {
                console.log(res.data);

                const { listings } = res.data;

                setListingData(listings);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const calculateTier = (tier) => {
        switch (tier) {
            case "tier-1":
                return "Tier One (1)";
                break;
            case "tier-2":
                return "Tier Two (2)";
                break;
            case "tier-3":
                return "Tier Three (3)";
                break;
            default:
                break;
        }
    }
    const calculateFirstImage = (listing) => {
        console.log("uploadedFiles", listing.uploadedFiles);

        const files = listing.uploadedFiles;

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (file.type.includes("image")) {
                return (
                    <Fragment>
                        <img src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className={"last-displayed rounded-circle mr-1"} />
                    </Fragment>
                );
                break;
            } else if (file.type.includes("video")) {
                return (
                    <Fragment>
                        <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"last-displayed rounded-circle mr-1"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                    </Fragment>
                );
                break;
            }
        }
    }
    return (
        <div>
            <Sheet draggable={false} isOpen={employerListingPromotePane} onClose={() => setSheetOpenEmployerListingPromote(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <div className='margin-medium-button-pane'>
                        <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }} onClick={() => setSheetOpenEmployerListingPromote(false)}>Close/Exit Pane</Button>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Container fluid={true}>
                        <Row style={{ marginTop: "25px" }}>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card className='bordered-shadowed-card-deposit'>
                                    <CardHeader className={"b-l-info b-r-info"}>
                                        <h2 className='header-deposit-card-funds'>You've selected {listingBoostSelected} which means you have selected the <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>{calculateTier(listingBoostSelected)}</strong> boost 'tier' which cooresponding between 1 and 3 (3 being the most intensive 'boost')</h2>
                                        <p className='lead'>Please select the <strong style={{ color: "#7366ff" }}>previously posted employer listing</strong> you'd like to promote and select your payment method (if applicable - you may need to add a payment method). We will display your previously posted <strong style={{ color: "#7366ff" }}>ACTIVE</strong> contracts to allow you to choose from..</p>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>"
                                            {typeof listings !== "undefined" && listings.length > 0 ? listings.map((listing, index) => {
                                                const views = listing.totalViews;
                                                const progress = Math.round(views / 1000);
                                                return (
                                                    <Col key={index} sm="12" md="4" lg="4" xl="4">
                                                        <div onClick={() => {
                                                            setSelected(listing.id);
                                                            setFullySelected(listing);
                                                        }} className={selected === listing.id ? "project-box project-boxed-shadowized-selected" : "project-box project-boxed-shadowized"}>
                                                            <span className={`badge badge-primary`}>Min Lvl. To Apply: {listing.requiredRankToApply.label}</span>
                                                            <h6>{listing.publicCompanyName}</h6>
                                                            <div className="media">
                                                                {/* {<img className="img-20 mr-1 rounded-circle" src={calculateFirstImage(listing)} alt="" />} */}
                                                                {calculateFirstImage(listing)}
                                                                <p className='posted-by-date'>Posted {moment(listing.systemDate).fromNow()}</p>
                                                            </div>
                                                            <div className='align-proper-loc'>
                                                                <Label className={"hash-label"}>Related Hashtag's</Label><br />
                                                                {typeof listing.hashtags !== "undefined" && listing.hashtags.length > 0 ? listing.hashtags.map((tag, idx) => {
                                                                    return (
                                                                        <Badge key={idx} color={"primary"} className={"slim-border-badge"} style={{ color: "#fff" }}>{tag.text}</Badge>
                                                                    );
                                                                }) : null}
                                                            </div>
                                                            <ReactMarkdown className='listing-desc-selectable' children={listing.listingDescription} remarkPlugins={[remarkGfm]} />
                                                            <Row className="details">
                                                                <Col xs="6"><span>Total Applicants: </span></Col>
                                                                <Col xs="6" className={'text-primary'}>{listing.applicantIDArray.length}</Col>
                                                                <Col xs="6"> <span>Likes: </span></Col>
                                                                <Col xs="6" className={'text-primary'}>{listing.likes}</Col>
                                                                <Col xs="6"> <span>Dislikes: </span></Col>
                                                                <Col xs="6" className={'text-primary'}>{listing.dislikes}</Col>
                                                            </Row>
                                                            <div className="customers">
                                                                <ul>
                                                                    <li className="d-inline-block"><img className="img-30 rounded-circle min-rounded" src={require("../../../../../../../assets/images/placeholder.png")} alt="" /></li>
                                                                    <li className="d-inline-block"><img className="img-30 rounded-circle min-rounded" src={require("../../../../../../../assets/images/placeholder.png")} alt="" /></li>
                                                                    <li className="d-inline-block"><img className="img-30 rounded-circle min-rounded" src={require("../../../../../../../assets/images/placeholder.png")} alt="" /></li>
                                                                    <li className="d-inline-block ml-2">
                                                                    <p className="f-12">{`+${listing.viewedBy.length - 3 > 0 ? listing.viewedBy.length : 0} More`}</p>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="project-status mt-4">
                                                                <div className="media mb-0">
                                                                    <p>{progress}% </p>
                                                                    <div className="media-body text-right"><span>Time Till Est. Completion Date</span></div>
                                                                </div>
                                                                {progress === "100" ?
                                                                    <Progress className="sm-progress-bar" color="success" value={progress} style={{ height: "5px" }} />
                                                                    :
                                                                    <Progress className="sm-progress-bar" striped color="primary" value={progress} style={{ height: "5px" }} />
                                                                }
                                                                
                                                            </div>
                                                            <div className="project-status mt-4">
                                                                <Button className='btn-square-info' color='info-2x' outline style={{ width: "100%" }}>Promote This Listing!</Button>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                );
                                            }) : null}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardBody className='bordered-shadowed-card-deposit'>
                                        <h2 style={{ textDecorationLine: "underline" }} className='header-deposit-card-funds'>Please select the payment method you'd like to use for this transaction..</h2>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}

export default BoostAlreadyPostedEmployerListingPaneHelper;