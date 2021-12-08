import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../../../layout/breadcrumb';
import { Container,Row,Col,Card,CardBody,Media,Button,Badge,CardHeader } from 'reactstrap';
import one from '../../../../../../../assets/images/job-search/1.jpg';
import two from '../../../../../../../assets/images/job-search/6.jpg';
import { Link, useLocation }  from 'react-router-dom';
import { Share,SimilarJobs,SeniorUXDesigner } from "../../../../../../../constant";
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


const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

const ViewIndividualJobListingHelper = (props) => {
    
    const passedData = useLocation();

    const [ data, setData ] = useState(null);
    const [ ready, setReady ] = useState(false);

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

    useEffect(() => {
        if (typeof passedData.state !== "undefined" && _.has(passedData.state, "listing")) {
            const { assetArray, typeOfHack, testingDatesHackers, rulesOfEngagement, publicCompanyName, outOfScopeVulnerabilities, listingDescription, hashtags, businessAddress, requiredRankToApply, experienceAndCost, desiredSkills, maxNumberOfApplicants, disclosureVisibility, tokensRequiredToApply, listingVisibility, estimatedCompletionDate, uploadedFiles } = passedData.state.listing;

            const newDatesArray = [];

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
                uploadedFiles
            };

            setData(newData);
            setReady(true);
        };
    }, []);

    console.log("data", data);

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
                                                <a href="#javascript">{data.publicCompanyName}</a>
                                                <span className="pull-right">
                                                    <Link to={`${process.env.PUBLIC_URL}/apply/employer/listing`}> 
                                                    <Button color="primary">{"Apply for this job"}</Button>
                                                    </Link>
                                                </span>
                                            </h6>
                                            <p>XP Reward: <em className="heavy-blue">{data.experienceAndCost.experience}</em> <strong>~</strong> <em className="heavy-blue">{data.tokensRequiredToApply.value}</em> tokens required to apply...</p>
                                        </Media>
                                    </Media>
                                    <Row style={{ marginTop: "20px" }}>
                                        <Col sm="6" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">General Details</h5>
                                                </CardHeader>
                                                <CardBody>
                                                    <AccordionWithOpenandCloseIcon data={data} props={props} />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="6" md="12" lg="12" xl="4">
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
                                        <Col sm="6" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">Title Here</h5>
                                                </CardHeader>
                                                <CardBody>
                                                    <DateRange 
                                                        ranges={data.testingDatesHackers}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "20px" }}>
                                        <Col sm="6" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">Title Here</h5>
                                                    {/* tokensRequiredToApply */}
                                                </CardHeader>
                                                <CardBody>
                                                    <p>
                                                        {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}
                                                        {"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"}
                                                        {"of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting"}
                                                        {"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"}
                                                        {"unknown printer took a galley of type and scrambled."}
                                                    </p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="6" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">Title Here</h5>
                                                </CardHeader>
                                                <CardBody>
                                                    <p>
                                                        {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}
                                                        {"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"}
                                                        {"of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting"}
                                                        {"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"}
                                                        {"unknown printer took a galley of type and scrambled."}
                                                    </p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="6" md="12" lg="12" xl="4">
                                            <Card className="card-absolute">
                                                <CardHeader className="bg-secondary">
                                                    <h5 className="text-white">Title Here</h5>
                                                </CardHeader>
                                                <CardBody>
                                                    <p>
                                                        {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}
                                                        {"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"}
                                                        {"of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting"}
                                                        {"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an"}
                                                        {"unknown printer took a galley of type and scrambled."}
                                                    </p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">General Details</h6>

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
                                                return <Badge style={{ fontSize: "13px", marginTop: "5px" }} key={indexxxx} color="dark">{skill.label}</Badge>;
                                            }) : null}
                                        </div>
                                    </div>
                                    <div className="job-description">
                                        <h6 className="blue-text-listing">Location Details</h6>
                                        <Map
                                            style="mapbox://styles/mapbox/streets-v9"
                                            containerStyle={{
                                                height: '225px',
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
                                                            <h6 className="f-w-600"><a href="#javascript">{data.job_name}</a>
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
                                                    <h6 className="f-w-600"><a href="#javascript">{SeniorUXDesigner}</a><span className="pull-right">{"5 days ago"}</span></h6>
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
    return (
        <Fragment>
            <Breadcrumb parent="Active Hacking Opportunities" title="Individual Job Details"/>
            <Container fluid={true}>
                <Row>
                    {/* <JobFilter /> */}
                    {renderContent()}
                </Row>
            </Container>
        </Fragment>
    );
};

export default ViewIndividualJobListingHelper;