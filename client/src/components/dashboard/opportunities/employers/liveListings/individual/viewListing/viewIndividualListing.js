import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, Media, Button, Badge, CardHeader, Input, InputGroup, ListGroupItem, ListGroup, FormGroup, Label } from 'reactstrap';
import one from '../../../../../../../assets/images/job-search/1.jpg';
import two from '../../../../../../../assets/images/job-search/6.jpg';
import { useLocation, useHistory }  from 'react-router-dom';
import { Share, SimilarJobs, SeniorUXDesigner } from "../../../../../../../constant";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connect } from "react-redux";
import _ from 'lodash';
import "./styles.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import AccordionWithOpenandCloseIcon from "./helpers/accordion/index.js";
import Calendar from 'react-calendar';
import { DateRange } from 'react-date-range';
import ReactPlayer from 'react-player';
import FileViewer from 'react-file-viewer';
import { Modal } from 'react-responsive-modal';
import { renderProfilePicVideo } from "./helpers/profilePicVideo/displayPicOrVideo.js";
import moment from "moment";
import { NotificationManager } from 'react-notifications';
import { saveApplicationDetailsProgress } from "../../../../../../../redux/actions/hackers/applyToEmployerListing/applicationInfo.js";
import MessagingPanePrivateHelper from "./helpers/messagingPane/messagingHelper.js";
import RenderCommentsEmployerListingHelper from "./helpers/comments/renderComments.js";

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

const ViewIndividualJobListingHelper = ({ userData, saveApplicationDetailsProgress }) => {
    
    const passedData = useLocation();
    const history = useHistory();
    
    const [ data, setData ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ fileModal, setFileModal ] = useState(false);
    const [ file, setFile ] = useState(null);
    const [ employerInfo, setEmployerInfo ] = useState(null);
    const [ messagePaneOpen, setMessagePaneState ] = useState(false);

    const [JobData,setJobData] = useState([{
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "292a60dc-46db-421a-8ed5-a401942aca07"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "a29f1b98-2fcc-460e-a748-483538676e89"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "85f073fa-9700-4f49-982d-3cd479a6f001"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "10f1e2f4-d0d5-419a-831c-59299a8187ad"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "885cdc2e-12e3-4a9a-a147-9d390cd92f7b"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "f583586e-d52c-4e45-aa7e-94c42f8eb949"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "08f549ff-c5c5-4eec-826e-7323c9fcfa52"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "29df568c-dd4c-4df2-b3ce-0d4a779835ce"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "cc5f6436-14f8-445d-9ec8-60d00a5e436d"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "160f69d6-6e3a-4da7-9630-f53085469403"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "69ac0d19-329f-4f4d-a2ac-31a6c150b7e8"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted",
        uniqueId: "e502944e-c780-45d0-b494-a0add9c0e9e2"
    }]);

    const generateRandomNumber = (num) => {
        return Math.floor(Math.random() * num) + 1;
    }

    useEffect(() => {
        if (typeof passedData.state !== "undefined" && _.has(passedData.state, "listing")) {
            const { assetArray, typeOfHack, testingDatesHackers, rulesOfEngagement, publicCompanyName, outOfScopeVulnerabilities, listingDescription, hashtags, businessAddress, requiredRankToApply, experienceAndCost, desiredSkills, maxNumberOfApplicants, disclosureVisibility, tokensRequiredToApply, listingVisibility, estimatedCompletionDate, uploadedFiles, applicants, postedBy } = passedData.state.listing;

            const newDatesArray = [];

            axios.get(`${process.env.REACT_APP_BASE_URL}/retrieve/related/employer/core/information`, {
                params: {
                    uniqueId: postedBy
                }
            }).then((res) => {
                if (res.data.message === "Gathered relevant information!") {
                    console.log(res.data);

                    const { user } = res.data;

                    setEmployerInfo(user);

                    for (let index = 0; index < testingDatesHackers.length; index++) {
                        const selectedDate = testingDatesHackers[index];
                        
                        const { startDate, endDate, key } = selectedDate;
        
                        const newData = {
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                            key
                        }
        
                        newDatesArray.push(newData);
                    }
        
                    const newData = {
                        ...passedData.state.listing,
                        assetArray, 
                        typeOfHack, 
                        testingDatesHackers: newDatesArray, 
                        rulesOfEngagement, 
                        publicCompanyName, 
                        outOfScopeVulnerabilities, 
                        listingDescription, 
                        hashtags, 
                        businessAddress, 
                        requiredRankToApply, 
                        experienceAndCost, 
                        desiredSkills, 
                        maxNumberOfApplicants, 
                        disclosureVisibility, 
                        tokensRequiredToApply, 
                        listingVisibility, 
                        estimatedCompletionDate, 
                        uploadedFiles,
                        applicants
                    };
        
                    setData(newData);
                    setReady(true);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        };
    }, []);

    const onError = (err, other) => {
        console.log("ERRRRR:", err, other);
    }
    const renderColor = (i) => {
        switch (i) {
            case 1:
                return "txt-success";
                break;
            case 2:
                return "txt-info";
                break;
            case 3:
                return "txt-danger";
                break;
            case 4:
                return "txt-warning";
                break;
            case 5:
                return "txt-dark";
                break;
            default:
                return "txt-success";
                break;
        }
    }
    const calculateFileType = (type) => {
        switch (type) {
            case "video/mp4":
                return "mp4";
                break;
            case "image/png":
                return "png";
                break;
            case "image/jpeg":
                return "jpeg";
                break;
            case "image/gif":
                return "gif";
                break;
            case "image/bmp":
                return "bmp";
                break;
            case "application/pdf":
                return "pdf";
                break;
            case "text/csv":
                return "csv";
                break;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "xlsx";
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "docx";
                break;
            case "video/webm":
                return "webm";
                break;
            case "audio/mpeg":
                return "mp3";
                break;
            default:
                break;
        }
    }
    const handleRedirectToHackingBettingPages = (item) => {
        console.log("handleRedirectToHackingBettingPages ran... : ", item);

        history.push("/employer/listing/betting/bidding/main/page", { item, listing: data });
    }
    const renderContent = () => {
        if (ready === true) {
            return (
                <Fragment>
                    <Col sm="12" md="12" lg="12" xl="12 xl-100">
                        <Card>
                            <div className="job-search">
                                <CardBody>
                                    <Media>
                                        <img className="img-40 img-fluid m-r-20" src={one} alt="" />
                                        <Media body>
                                            <h6 className="f-w-600">
                                                <a href={null}>{data.publicCompanyName}</a>
                                                <span className="pull-right">
                                                    <div> 
                                                        {userData.accountType === "hackers" ? <Button onClick={() => {
                                                            // apply logic (hackers ONLY)...
                                                            if (userData.accountType === "hackers") {
                                                                saveApplicationDetailsProgress({});
                                                                handleHackerApplyLogic(data);
                                                            } else {
                                                                NotificationManager.error("You do NOT have proper account privileges, This option is ONLY availiable to 'hackers'.", "ONLY hacker's are allowed to use this link!", 4500);
                                                            }
                                                        }} style={{ width: "275px" }} className="btn-square info" outline color="info-2x">{"Apply for this job (As a hacker)"}</Button> : null}
                                                    </div>
                                                </span>
                                            </h6>
                                            <p>XP Reward: <em className="heavy-blue">{data.experienceAndCost.experience}</em> <strong>~</strong> <em className="heavy-blue">{data.tokensRequiredToApply.value}</em> tokens required to apply...</p>
                                        </Media>
                                    </Media>
                                    <Row style={{ marginTop: "20px" }}>
                                        <Col sm="12" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">General Details</h5>
                                                </CardHeader>
                                                <CardBody>
                                                    <AccordionWithOpenandCloseIcon data={data} />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="12" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">Expected Completion Date</h5>
                                                </CardHeader>
                                                <CardBody>
                                                    <Calendar
                                                        value={new Date(data.estimatedCompletionDate)}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="12" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">Available Testing Dates</h5>
                                                </CardHeader>
                                                <CardBody>
                                                    <DateRange 
                                                        showDateDisplay={false}
                                                        ranges={data.testingDatesHackers}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "20px" }}>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">Location Details</h5>
                                                    {/* tokensRequiredToApply */}
                                                </CardHeader>
                                                <CardBody>
                                                    {!_.has(data.businessAddress, "position") ? <div className="job-description">
                                                        <p>This listing is a <em style={{ color: "blue", textDecorationLine: "underline" }}>{"DIGITAL hack ONLY"}</em> in which a physical hack is <em style={{ color: "blue", textDecorationLine: "underline" }}>{"NOT"}</em> required/permitted.</p>
                                                        <hr />
                                                        <p><em style={{ color: "blue", textDecorationLine: "underline" }}>{"IF SELECTED"}</em> by the employer of this listing - you will be testing "digital" assets such as REST API endpoints, websites or anything else "client-facing" or "accessible" to the general public - <em style={{ color: "blue", textDecorationLine: "underline" }}>{"private"}</em> testing is <em style={{ color: "blue", textDecorationLine: "underline" }}>{"NOT"}</em> permitted...</p>
                                                    </div> : <div className="job-description">
                                                        <p>Location details are <em style={{ textDecorationLine: "underline" }}>approximate</em> and accurate/detailed address and location information will be released once hired or selected by the employer.</p>
                                                        <p>This listing/employer is located in <em style={{ color: "blue" }}>{data.businessAddress.address.municipality}, {data.businessAddress.address.countrySubdivisionName}</em> in the <em style={{ color: "blue" }}>{data.businessAddress.address.country}</em></p>
                                                        <hr />
                                                        <Map
                                                            style="mapbox://styles/mapbox/streets-v9"
                                                            containerStyle={{
                                                                height: '275px',
                                                                width: '100%'
                                                            }}
                                                            center={[data.businessAddress.position.lon, data.businessAddress.position.lat]}
                                                        >
                                                            <Marker
                                                                style={{ maxWidth: "45px", maxHeight: "45px" }}
                                                                coordinates={[data.businessAddress.position.lon, data.businessAddress.position.lat]}
                                                                anchor="bottom">
                                                                <img src={require("../../../../../../../assets/images/location.png")}/>
                                                            </Marker>
                                                        </Map>
                                                    </div>}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">Reward/Payout Per Asset</h6>
                                        <ListGroup>
                                            {typeof data.assetArray !== "undefined" && data.assetArray.length > 0 ? data.assetArray.map((asset, index) => {
                                                return (
                                                    <ListGroupItem key={index} className="list-group-item flex-column align-items-start">
                                                        <Row style={{ paddingBottom: "12px" }}>
                                                            <ListGroupItem active>{asset.name}</ListGroupItem>
                                                        </Row>
                                                        <Row>
                                                            <Col md="3" lg="3" sm="6">
                                                                <FormGroup>
                                                                    <Label><span style={{ color: "#ffc800" }}>Low</span> Severity Bounty Reward</Label>
                                                                    <InputGroup>
                                                                    <Input value={`$${(asset.lowSeverity).toFixed(2)}`} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="3" lg="3" sm="6">
                                                                <FormGroup>
                                                                    <Label><span style={{ color: "#ed3824" }}>Medium</span> Severity Bounty Reward</Label>
                                                                    <InputGroup>
                                                                    <Input value={`$${(asset.mediumSeverity).toFixed(2)}`} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="3" lg="3" sm="6">
                                                                <FormGroup>
                                                                    <Label><span style={{ color: "#8f0091" }}>High</span> Severity Bounty Reward</Label>
                                                                    <InputGroup>
                                                                    <Input value={`$${(asset.highSeverity).toFixed(2)}`} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="3" lg="3" sm="6">
                                                                <FormGroup>
                                                                    <Label><span style={{ color: "#b30211" }}>Critical</span> Severity Bounty Reward</Label>
                                                                    <InputGroup>
                                                                    <Input value={`$${(asset.criticalSeverity).toFixed(2)}`} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                );
                                            }) : null}
                                        </ListGroup>
                                    </div>
                                    <div className="file-content">
                                        <CardBody className="file-manager">
                                            <h4 className="mb-3">All Uploaded Files</h4>
                                            <h6>Uploaded file(s) from this employer - these are public - check them out before applying, they are important!</h6>
                                            <ul className="files">
                                                {typeof data.uploadedFiles !== "undefined" && data.uploadedFiles.length > 0 ? data.uploadedFiles.map((file, index) => {
                                                    if (file.type === "video/mp4") {
                                                        return (
                                                            <li className="file-box" key={index}>
                                                                <div className="file-top">
                                                                    <ReactPlayer playing={true} muted={true} url={`${process.env.REACT_APP_ASSET_LINK}/${file.onlineID}`} className="stretch-both-ways" />
                                                                </div>
                                                                <div className="file-bottom">
                                                                    <h6>{file.name} </h6>
                                                                    {/* <p className="mb-1">{data.size}</p> */}
                                                                    <p> <b>{"File Type"} : </b>{file.type}</p>
                                                                    <Button style={{ width: "100%" }} onClick={() => {
                                                                        setFileModal(true);
                                                                        setFile(file);
                                                                    }} color="primary mr-1">View File</Button>
                                                                </div>
                                                            </li>
                                                        );
                                                    } else if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
                                                        return (
                                                            <li className="file-box" key={index}>
                                                                <div className="file-top"><img src={`${process.env.REACT_APP_ASSET_LINK}/${file.onlineID}`} className="stretch-both-ways" /><i className="fa fa-ellipsis-v f-14 ellips"></i>
                                                                </div>
                                                                <div className="file-bottom">
                                                                    <h6>{file.name} </h6>
                                                                    {/* <p className="mb-1">{data.size}</p> */}
                                                                    <p> <b>{"File Type"} : </b>{file.type}</p>
                                                                    <Button style={{ width: "100%" }} onClick={() => {
                                                                        setFileModal(true);
                                                                        setFile(file);
                                                                    }} color="primary mr-1">View File</Button>
                                                                </div>
                                                            </li>
                                                        );
                                                    } else {
                                                        return (
                                                            <li className="file-box" key={index}>
                                                                <div className="file-top"><i className={`fa fa-file-text-o ${renderColor(index)}`}></i><i className="fa fa-ellipsis-v f-14 ellips"></i>
                                                                </div>
                                                                <div className="file-bottom">
                                                                    <h6>{file.name} </h6>
                                                                    {/* <p className="mb-1">{data.size}</p> */}
                                                                    <p> <b>{"File Type"} : </b>{file.type}</p>
                                                                    <Button style={{ width: "100%" }} onClick={() => {
                                                                        setFileModal(true);
                                                                        setFile(file);
                                                                    }} color="primary mr-1">View File</Button>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                }) : null}
                                            </ul>
                                        </CardBody>
                                    </div>
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">Hashtags</h6>
                                        <div>
                                            {typeof data.hashtags !== "undefined" && data.hashtags.length > 0 ? data.hashtags.map((tag, indexxxx) => {
                                                return <Badge style={{ fontSize: "13px" }} key={indexxxx} color="info">{tag.text}</Badge>;
                                            }) : null}
                                        </div>
                                    </div>
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">Desired Skills</h6>
                                        <div>
                                            {typeof data.desiredSkills !== "undefined" && data.desiredSkills.length > 0 ? data.desiredSkills.map((skill, indexxxx) => {
                                                return <Badge style={{ fontSize: "13px", marginTop: "5px" }} key={indexxxx} color="primary">{skill.label}</Badge>;
                                            }) : null}
                                        </div>
                                    </div>
                                    
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">Listing Description</h6>
                                        <ReactMarkdown className="markdown-listing-individual-container" children={data.listingDescription} remarkPlugins={[remarkGfm]} />
                                    </div>
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">Rules Of Engagement (Strict Enforcement!)</h6>
                                        <ReactMarkdown className="markdown-listing-individual-container" children={data.rulesOfEngagement} remarkPlugins={[remarkGfm]} />
                                    </div>
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">Out-Of-Scope Vulnerabilities</h6>
                                        <ReactMarkdown className="markdown-listing-individual-container" children={data.outOfScopeVulnerabilities} remarkPlugins={[remarkGfm]} />
                                    </div>

                                    <RenderCommentsEmployerListingHelper data={data} userData={userData} />
                                    
                                    <div className="job-description">
                                        <Button color="primary mr-1"><span><i className="fa fa-check"></i></span> {"Save this job"}</Button>
                                        <Button color="primary"><span><i className="fa fa-share-alt"></i></span> {Share}</Button>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                        <div className="header-faq">
                            <h6 className="mb-0 f-w-600">{SimilarJobs}</h6>
                        </div>
                        <Row>
                            {JobData.slice(0, 4).map((data, i) => {
                                return (
                                    <Col xl="6 xl-100" key={i}>
                                        <Card>
                                            <div className="job-search">
                                                <CardBody>
                                                    <Media>
                                                        <img className="img-40 img-fluid m-r-20" src={require(`../../../../../../../assets/images/user/10.jpg`)} alt="" />
                                                        <Media body>
                                                            <h6 className="f-w-600"><a href={null}>{data.job_name}</a>
                                                                {(data.badgeType === 'primary' ? <span className="badge badge-primary pull-right">{data.badgeValue}</span>
                                                                    : ''
                                                                )}
                                                            </h6>
                                                            <p>{data.job_area} <span>{data.job_city}</span>
                                                                <span>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning-o"></i>
                                                                </span>
                                                            </p>
                                                        </Media>
                                                    </Media>
                                                    <p>{data.job_description}</p>
                                                </CardBody>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })}
                            <Col xl="12">
                                <Card>
                                    <div className="job-search">
                                        <CardBody>
                                            <Media>
                                                <img className="img-40 img-fluid m-r-20" src={two} alt="" />
                                                <Media body>
                                                    <h6 className="f-w-600"><a href={null}>{SeniorUXDesigner}</a><span className="pull-right">{"5 days ago"}</span></h6>
                                                    <p>{"Sutherland"} <span>{"Lelystad, Netherlands"} </span><span><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning"></i><i className="fa fa-star font-warning-half-o"></i><i className="fa fa-star font-warning-o"></i></span></p>
                                                </Media>
                                            </Media>
                                            <p>{"Woody equal ask saw sir weeks aware decay. Entrance prospect removing we packages strictly is no smallest he. For hopes may chief get hours day rooms. Oh no turned behind polite piqued enough at. Forbade few through inquiry blushes you. Cousin no itself eldest it in dinner latter missed no."}</p>
                                        </CardBody>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Fragment>
            );
        } else {
            return (
                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                    <p>
                        <Skeleton count={50} />
                    </p>
                </SkeletonTheme>
            );
        }
    }
    const handleHackerApplyLogic = (data) => {
        console.log("handleHackerApplyLogic clicked.");

        setTimeout(() => {
            history.push(`/hacker/apply/employer/listing/${data.uniqueId}`, { listingData: data });
        },  500);
    }
    const checkAccountTypeAndAlreadyApplied = () => {
        if (typeof passedData.state !== "undefined" && _.has(passedData.state, "listing")) {
            if (userData.accountType === "hackers") {
                if (passedData.state.listing.applicantIDArray.includes(userData.uniqueId)) {
                    return false;
                } else {
                    return true;
                }   
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    const renderHeaderConditionally = () => {
        
        if (ready === true) {
            return (
                <Row>
                    <Col sm="12">
                    <Card className="card hovercard text-center">
                        <CardHeader id="override-cardheader">
                            {_.has(employerInfo, "profileBannerImage") ? <img src={`${process.env.REACT_APP_ASSET_LINK}/${employerInfo.profileBannerImage.link}`} id="banner-photo-cover-all" /> : <img src={require('../../../../../../../assets/images/banner/2.jpg')} id="banner-photo-cover-all" />}
                        </CardHeader>
                        <div className="user-image">
                        <div className="avatar">
                            {renderProfilePicVideo(employerInfo.profilePicsVideos)}
                        </div>
                        
                        </div>
                        <div id="custom-info-override" className="info">
                        <Row>
                            <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                            <Row >
                                <Col md="6">
                                <div className="ttl-info text-left">
                                    <h6 className={"very-top-header"}>Experience & Cost-To-Post</h6><span className={"span-very-top-sub"}>{data.experienceAndCost.label}</span>
                                </div>
                                </Col>
                                <Col md="6">
                                <div className="ttl-info text-left ttl-sm-mb-0">
                                    <h6 className={"very-top-header"}>MAX Number Of Applicants</h6><span className={"span-very-top-sub"}>{data.maxNumberOfApplicants.label}</span>
                                </div>
                                </Col>
                            </Row>
                            </Col>
                            <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                            <div className="user-designation">
                                <div className="title"><a target="_blank" href={null}>{data.publicCompanyName}</a></div>
                                <div className="desc mt-2">Poster's Company Name</div>
                            </div>
                            </Col>
                            <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                            <Row>
                                <Col md="6">
                                <div className="ttl-info text-left ttl-xs-mt">
                                    <h6 className={"very-top-header"}>{process.env.REACT_APP_CRYPTO_TOKEN_NAME} Tokens Required/Apply</h6><span className={"span-very-top-sub"}>{data.tokensRequiredToApply.label}</span>
                                </div>
                                </Col>
                                <Col md="6">
                                <div className="ttl-info text-left ttl-sm-mb-0">
                                    <h6 className={"very-top-header"}>Posted Date/Time-Ago</h6><span className={"span-very-top-sub"}>Posted {moment(data.systemDate).fromNow()}</span>
                                </div>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                        <hr />
                        <Row style={{ paddingTop: "17.5px", paddingBottom: "17.5px" }}>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Button style={{ width: "100%" }} className={"btn-square btn-air-info"} onClick={() => setMessagePaneState(true)} outline color={"info-2x"}><strong>Private</strong> Message This User</Button>
                            </Col>
                        </Row>
                        <div className="social-media step4" data-intro="This is your Social details">
                            <ul className="list-inline">
                            <li className="list-inline-item"><a href={null}><i className="fa fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href={null}><i className="fa fa-google-plus"></i></a></li>
                            <li className="list-inline-item"><a href={null}><i className="fa fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href={null}><i className="fa fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href={null}><i className="fa fa-rss"></i></a></li>
                            </ul>
                        </div>
                        <div className="follow">
                            <Row style={{ paddingTop: "17.5px", paddingBottom: "17.5px" }}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    {checkAccountTypeAndAlreadyApplied() ? <Button style={{ width: "100%" }} className={"btn-square btn-air-success"} onClick={() => {
                                        // apply logic (hackers ONLY)...
                                        if (userData.accountType === "hackers") {
                                            saveApplicationDetailsProgress({});
                                            handleHackerApplyLogic(data);
                                        } else {
                                            NotificationManager.error("You do NOT have proper account privileges, This option is ONLY availiable to 'hackers'.", "ONLY hacker's are allowed to use this link!", 4500);
                                        }
                                    }} outline color={"success-2x"}>Apply to this listing (As a hacker)</Button> : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" lg="6" xl="6" md="6" className="centered-both-ways">
                                    <Card className="custom-card-top-bar">
                                        <CardHeader className="b-r-primary border-3">
                                            <h5 className="text-right">Listing Core Information / Previous Interactions</h5>
                                        </CardHeader>
                                        <CardBody className="b-l-primary border-3 add-border-bottom-thin-listing">
                                            <div className="list-listview-wrapper-wrap">
                                                <ListGroupItem className="listgroupitem-list-custom">
                                                    <ListGroup>
                                                        <p className="lead-list-group-item"><strong style={{ fontSize: "17.5px" }}>{generateRandomNumber(17)}</strong> people have already been hired for this job/gig</p>
                                                    </ListGroup>
                                                </ListGroupItem>
                                                <ListGroupItem className="listgroupitem-list-custom-active active">
                                                    <ListGroup>
                                                        <p className="lead-list-group-item"><strong style={{ fontSize: "17.5px" }}>{generateRandomNumber(33)}</strong> total hackers are required for this listing</p>
                                                    </ListGroup>
                                                </ListGroupItem>
                                                <ListGroupItem className="listgroupitem-list-custom">
                                                    <ListGroup>
                                                        <p className="lead-list-group-item"><strong style={{ fontSize: "17.5px" }}>{generateRandomNumber(100)}</strong> total <strong style={{ fontSize: "17.5px" }}>CURRENT</strong> applicants</p>
                                                    </ListGroup>
                                                </ListGroupItem>
                                                <ListGroupItem className="listgroupitem-list-custom-active active">
                                                    <ListGroup>
                                                        <p className="lead-list-group-item"><strong style={{ fontSize: "17.5px" }}>{generateRandomNumber(325)}</strong> people are <strong style={{ fontSize: "17.5px" }}>currently bidding</strong> on this job/listing</p>
                                                    </ListGroup>
                                                </ListGroupItem>
                                                <ListGroupItem className="listgroupitem-list-custom">
                                                    <ListGroup>
                                                        <p className="lead-list-group-item">Job expected to be <strong style={{ fontSize: "17.5px" }}>completed/done</strong> in <strong style={{ fontSize: "17.5px" }}>{moment(data.estimatedCompletionDate).fromNow(true)}</strong> from now</p>
                                                    </ListGroup>
                                                </ListGroupItem>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12" lg="6" xl="6" md="6" className="centered-both-ways">
                                    <Card className="custom-card-top-bar">
                                        <CardHeader className="b-l-primary border-3">
                                            <h5 className="text-left">Bidding/Betting - Want to wager bets on this listing?!</h5>
                                        </CardHeader>
                                        <CardBody className="b-r-primary border-3 add-border-bottom-thin-listing">
                                            <p className="text-left">Would you like to wager a bet on these hackers hacking in this listing? If you're confused what this means or how it works, <a style={{ color: "red", fontWeight: "bold" }} href={null}>READ THE RULES & REGULATIONS OF BETTING HERE.</a></p>
                                            <hr />
                                            <p>Click the button below to access the bidding portion/actions of this application ({process.env.REACT_APP_APPLICATION_NAME}) as well as ALL bets on this application are given/recieved in <strong style={{ color: "blue", fontWeight: "bold" }}>{process.env.REACT_APP_CRYPTO_TOKEN_NAME}</strong> which CAN BE cashed out for actual <strong>fiat money/financial's</strong>.</p>
                                            <hr />
                                            <Button onClick={() => {
                                                handleRedirectToHackingBettingPages(employerInfo);
                                            }} style={{ width: "100%" }} className="btn-pill btn-air-info" outline color="info-2x">View/Manage Betting Actions & Data</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                {/* <Col col="6" className="text-md-right border-right">
                                    <div className="follow-num counter">{"25869"}</div><span>Follower</span>
                                </Col>
                                <Col col="6" className="text-md-left">
                                    <div className="follow-num counter">{"659887"}</div><span>Following</span>
                                </Col> */}
                            </Row>
                            <Row style={{ paddingTop: "17.5px", paddingBottom: "17.5px" }}>
                                <Col sm="12" md="12" lg="12" xl="12">
                                    {checkAccountTypeAndAlreadyApplied() ? <Button style={{ width: "100%" }} className={"btn-square btn-air-success"} onClick={() => {
                                        // apply logic (hackers ONLY)...
                                        if (userData.accountType === "hackers") {
                                            saveApplicationDetailsProgress({});
                                            handleHackerApplyLogic(data);
                                        } else {
                                            NotificationManager.error("You do NOT have proper account privileges, This option is ONLY availiable to 'hackers'.", "ONLY hacker's are allowed to use this link!", 4500);
                                        }
                                    }} outline color={"success-2x"}>Apply to this listing (As a hacker)</Button> : null}
                                </Col>
                            </Row>
                        </div>
                        </div>
                    </Card>
                    </Col>
                </Row>
            );
        } 
    }
    return (
        <Fragment>
            <Breadcrumb parent="Active Hacking Opportunities" title="Individual Job Details"/>
            <Container fluid={true}>
                <div className="user-profile">
                    {renderHeaderConditionally()}
                </div>
                <Row>
                    {/* <JobFilter /> */}
                    {renderContent()}
                </Row>
            </Container>
            <MessagingPanePrivateHelper employerID={employerInfo !== null ? employerInfo.uniqueId : null} employerName={employerInfo !== null ? `${employerInfo.firstName} ${employerInfo.lastName}` : "Unknown - Loading..."} messagePaneOpen={messagePaneOpen} setMessagePaneState={setMessagePaneState} />
            {file !== null ? <Modal open={fileModal} onClose={() => {
                setFileModal(false);
            }} classNames={{
                modal: 'customModal'
            }} center>
                <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                    <Card>
                        <CardBody>
                            <h3 className="text-left">File Details/Preview</h3>  
                            <div className="my-fileviewer-custom-wrapper">
                                {calculateFileType(file.type) === ("png" || "jpg" || "jpeg") ? <img className='modal-stretched-both' src={`${process.env.REACT_APP_ASSET_LINK}/${file.onlineID}`} /> : <FileViewer
                                    fileType={calculateFileType(file.type)}
                                    filePath={`${process.env.REACT_APP_ASSET_LINK}/${file.onlineID}`}
                                    onError={onError}
                                />}
                            </div>
                        </CardBody>
                        <div className="create-space">
                            <Button style={{ width: "100%" }} onClick={() => {
                                setFileModal(false);
                            }} color="secondary mr-1">Close/Exit Modal</Button>
                        </div>
                    </Card>
                </Col>
            </Modal> : null}
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { saveApplicationDetailsProgress })(ViewIndividualJobListingHelper);