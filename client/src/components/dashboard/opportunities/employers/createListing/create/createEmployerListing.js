import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import one from '../../../../../../assets/images/job-search/1.jpg';
import { Container, Row, Col, Card, CardBody, Media, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import Select from 'react-select';
import uuid from "react-uuid";
import _ from "lodash";
import { MultiSelect } from "react-multi-select-component";
import CreateHashtagsListingComponent from "./helpers/hashtags/createHashtagsListing.js";
import LocationSearchInput from "./helpers/location/searchAddress.js";
import { XCircle } from "react-feather";
import "./styles.css";
import SimpleMDE from "react-simplemde-editor";
import { DateRangePicker, Calendar } from 'react-date-range';
import Dropzone from 'react-dropzone-uploader';
import { connect } from "react-redux";
import { saveListingData } from "../../../../../../redux/actions/employer/listings/listingData.js";
import {
    experienceOptions,
    desiredSkillsOptions,
    rankOptions,
    maxNumberOfHackersOptions,
    tokensApplyOptions,
    disclosureOptions,
    physicalOptions,
    visibilityOptions
} from "./helpers/options/selectionOptions.js";
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import LoadingBar from 'react-top-loading-bar';
import { useHistory } from "react-router-dom";


const CreateJobListingMainHelper = (props) => {

    const history = useHistory();

    const [ assetArray, setAssetArray ] = useState([]);
    const [ data, setData ] = useState({});
    const [ requiredRankToApply, setRequiredRankToApply ] = useState(null);
    const [ experienceAndCost, setExperienceAndCost ] = useState(null);
    const [ desiredSkills, setDesiredSkills ] = useState([]);
    const [ content,setContent ] = useState("");
    const [ maxNumberOfApplicants, setMaxNumberOfApplicants ] = useState(null);
    const [ popoverOpen, setPopoverOpen ] = useState(false);
    const [ tokensRequiredToApply, setTokensRequiredToApply ] = useState(null);
    const [ disclosureVisibility, setDisclosureVisibility ] = useState(null);
    const [ typeOfHack, setTypeOfHack ] = useState(null);
    const [ rules, setRules ] = useState("");
    const [ outOfScope, setOutOfScope ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ selectionRange, setSelectionRange ] = useState(new Date());
    const [ count, setCount ] = useState(0);
    const [ availiableHackerDates, handleHackerDates ] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);
    const [ listingVisibility, setListingVisibility ] = useState(null);

    useEffect(() => {
        const { assetArray, typeOfHack, testingDatesHackers, rulesOfEngagement, publicCompanyName, outOfScopeVulnerabilities, listingDescription, requiredRankToApply, experienceAndCost, desiredSkills, maxNumberOfApplicants, disclosureVisibility, tokensRequiredToApply, listingVisibility, estimatedCompletionDate } = props.previousData;

        // update state according to redux memory...

        setAssetArray(typeof assetArray !== "undefined" && assetArray.length > 0 ? assetArray : []);
        setTypeOfHack(typeof typeOfHack !== "undefined" ? typeOfHack : null);
        setRules(typeof rulesOfEngagement !== "undefined" ? rulesOfEngagement : "");
        setData(typeof publicCompanyName !== "undefined" ? prevState => {
            return {
                ...prevState,
                publicCompanyName
            }
        } : {});
        setOutOfScope(typeof outOfScopeVulnerabilities !== "undefined" ? outOfScopeVulnerabilities : "");
        setContent(typeof listingDescription !== "undefined" ? listingDescription : "");
        setMaxNumberOfApplicants(typeof maxNumberOfApplicants !== "undefined" ? maxNumberOfApplicants : null);
        setRequiredRankToApply(typeof requiredRankToApply !== "undefined" ? requiredRankToApply : null);
        setExperienceAndCost(typeof experienceAndCost !== "undefined" ? experienceAndCost : null);
        setDesiredSkills(typeof desiredSkills !== "undefined" ? desiredSkills : []);
        setDisclosureVisibility(typeof disclosureVisibility !== "undefined" ? disclosureVisibility : null);
        setTokensRequiredToApply(typeof tokensRequiredToApply !== "undefined" ? tokensRequiredToApply : null);
        setListingVisibility(typeof listingVisibility !== "undefined" ? listingVisibility : null);

        props.saveListingData({
            ...props.previousData,
            testingDatesHackers: []
        })
    }, [])

    const onChangeDescription = (value) => {

        setContent(value);

        props.saveListingData({
            ...props.previousData,
            listingDescription: value
        })
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })

        props.saveListingData({
            ...props.previousData,
            [name]: value
        })
    }
    const handleAssetAddition = (e) => {
        e.preventDefault();
        // assetName

        setAssetArray(prevState => {
            props.saveListingData({
                ...props.previousData,
                assetArray: [...prevState, {
                    id: uuid(),
                    name: data.assetName
                }]
            })
            return [...prevState, {
                id: uuid(),
                name: data.assetName
            }]
        });
        setData(prevState => {
            return {
                ...prevState,
                assetName: ""
            }
        })
    }
    const changeBountyPrices = (e, rewardLevel, asset) => {
        const { value } = e.target;

        setAssetArray(prevState => {
            props.saveListingData({
                ...props.previousData,
                assetArray: prevState.map((item, i) => {
                    if (item.id === asset.id) {
                        return {
                            ...item,
                            [rewardLevel]: Number(value)
                        }
                    } else {
                        return item;
                    }
                })
            })
            return prevState.map((item, i) => {
                if (item.id === asset.id) {
                    return {
                        ...item,
                        [rewardLevel]: Number(value)
                    }
                } else {
                    return item;
                }
            });
        });
    }
    const renderBusinessLocationPortion = () => {
        if (_.has(props.previousData, "typeOfHack") && typeOfHack !== null && ["physical-hack", "both-assets"].indexOf(typeOfHack.value) > -1) {
            return (
                <Fragment>
                    <h6 className="mb-0">Location - Physical Hacking (Only Provided To <strong>SELECTED/HIRED</strong> Applicants)</h6>
                    <Form className="theme-form">
                        <Row>
                            <Col sm="12" lg="12" md="12" xl="12">
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">Enter your company business address (the address that your hackers will be testing at):<span className="font-danger">*</span></Label>
                                    <LocationSearchInput props={props} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Fragment>
            );
        }
    }
    const renderPhysicalHackingDates = () => {
        if (_.has(props.previousData, "typeOfHack") && typeOfHack !== null && ["physical-hack", "both-assets"].indexOf(typeOfHack.value) > -1) {
            return (
                <Fragment>
                    <Label htmlFor="exampleFormControlInput1">Dates Availiable To Hackers To Test Physical Assets:<span className="font-danger">*</span></Label>
                    <p>These are the days that will be available to the <strong>hired/selected</strong> hacker canidates to choose from when deciding which days they will attempt to infiltrate your company. This is only relevant for <strong style={{ color: "blue" }}>PHYSICAL</strong> hacking requirements.</p>
                    <p style={{ paddingBottom: "20px" }}></p>
                    <DateRangePicker
                        minDate={new Date()}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={true}
                        ranges={availiableHackerDates}
                        onChange={handleDatesSelectable}
                    />
                    <div onClick={() => {
                        handleDatesSelectable([]);
                    }} className="outlined-box">
                        <p className="lead blue-text">Clear previously selected dates...</p>
                    </div>
                </Fragment>
            );
        }
    }
    const handleDeadlineSelect = (date) => {

        if (new Date(date) > new Date()) {
            setSelectionRange(date);

            props.saveListingData({
                ...props.previousData,
                estimatedCompletionDate: date
            });
        } else {
            NotificationManager.warning(`You must select a date that is current or beyond today's current date.`, "Pick a valid date!", 3500);
        }
    }
    console.log("availiableHackerDates", availiableHackerDates);
    const handleDatesSelectable = (ranges) => {
        console.log("ranges", ranges.selection);

        if (typeof ranges.selection !== "undefined") {
            if (new Date(ranges.selection.startDate) > new Date()) {
                if (count === 0) {
                    handleHackerDates(prevState => {
    
                        console.log("ran.", prevState);
            
                        props.saveListingData({
                            ...props.previousData,
                            testingDatesHackers: [ranges.selection]
                        });
                        return [ranges.selection];
                    });
                    setCount(count + 1);
                } else {
                    handleHackerDates(prevState => {
    
                        console.log("ran.", prevState);
            
                        props.saveListingData({
                            ...props.previousData,
                            testingDatesHackers: [...prevState, ranges.selection]
                        });
                        return [...prevState, ranges.selection];
                    });
                    setCount(count + 1);
                }
            } else {
                NotificationManager.warning(`You must select a date that is current or beyond today's current date.`, "Pick a valid date!", 3500);
            };
        } else {
            handleHackerDates(prevState => {
    
                console.log("ran else!...", prevState);
    
                props.saveListingData({
                    ...props.previousData,
                    testingDatesHackers: [{
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection'
                    }]
                });
                return [{
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'
                }];
            });
        }
    }
    const getUploadParams = ({ meta }) => { 
        return { 
            url: 'https://httpbin.org/post' 
        } 
    };

    const handleChangeStatus = ({ meta, file }, status) => { 
        console.log(status, meta, file);

        if (status === "done") {
            const data = new FormData();
    
            data.append("file", file);
            data.append("meta", meta);

            const config = {
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                    console.log("percentCompleted", percentCompleted);

                    setProgress(percentCompleted);
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            axios.post(`${process.env.REACT_APP_BASE_URL}/upload/file/upon/selection/employer/listing`, data, config).then((res) => {
                if (res.data.message === "Successfully uploaded content!") {
                    console.log(res.data);

                    const { file, generatedID } = res.data;

                    if (typeof props.previousData.uploadedFiles !== "undefined" && props.previousData.uploadedFiles.length > 0) {
                        props.saveListingData({
                            ...props.previousData,
                            uploadedFiles: [...props.previousData.uploadedFiles, {
                                ...file,
                                onlineID: generatedID
                            }]
                        });
                    } else {
                        props.saveListingData({
                            ...props.previousData,
                            uploadedFiles: [{
                                ...file,
                                onlineID: generatedID
                            }]
                        });
                    }

                    NotificationManager.success(`We've successfully uploaded your file! Please proceed filling out your information or add more files.`, 'Successfully uploaded file!', 4500);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleListingSubmission = (e) => {

        e.preventDefault();

        let count = 0;

        if (typeof props.previousData.typeOfHack !== "undefined") {
            if (props.previousData.typeOfHack.value === "physical-hack") {
                const { assetArray, typeOfHack, testingDatesHackers, rulesOfEngagement, publicCompanyName, outOfScopeVulnerabilities, listingDescription, hashtags, businessAddress, requiredRankToApply, experienceAndCost, desiredSkills, maxNumberOfApplicants, disclosureVisibility, tokensRequiredToApply, listingVisibility, estimatedCompletionDate } = props.previousData;

                for (const key in props.previousData) {
                    const el = props.previousData[key];
        
                    switch (key) {
                        case "testingDatesHackers":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Required Testing Dates'`, "Complete 'required testing dates'!", 4500);
                            }
                            break;
                        case "listingDescription":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Listing Description'`, "Complete 'Listing Description'!", 4500);
                            }
                            break;
                        case "rulesOfEngagement":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Rules Of Engagement'`, "Complete 'Rules Of Engagement'!", 4500);
                            }
                            break;
                        case "publicCompanyName":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Public Company Name'`, "Complete 'Public Company Name'!", 4500);
                            }
                            break;
                        case "outOfScopeVulnerabilities":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Out Of Scope Vulnerabilities'`, "Complete 'Out Of Scope Vulnerabilities'!", 4500);
                            }
                            break;
                        case "requiredRankToApply":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Required Rank To Apply'`, "Complete 'Required Rank To Apply'!", 4500);
                            }
                            break;
                        case "experienceAndCost":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Experience & Cost'`, "Complete 'Experience & Cost'!", 4500);
                            }
                            break;
                        case "desiredSkills":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Desired Skills'`, "Complete 'Desired Skills'!", 4500);
                            }
                            break;
                        case "hashtags":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Hashtags'`, "Complete 'Hashtags'!", 4500);
                            }
                            break;
                        case "maxNumberOfApplicants":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Max Number Of Applicants'`, "Complete 'Max Number Of Applicants'!", 4500);
                            }
                            break;
                        case "tokensRequiredToApply":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Tokens Required To Apply'`, "Complete 'Tokens Required To Apply'!", 4500);
                            }
                            break;
                        case "disclosureVisibility":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Disclosure Visibility'`, "Complete 'Disclosure Visibility'!", 4500);
                            }
                            break;
                        case "typeOfHack":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Type Of Hacks'`, "Complete 'Type Of Hacks'!", 4500);
                            }
                            break;
                        case "listingVisibility":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Listing Visibility'`, "Complete 'Listing Visibility'!", 4500);
                            }
                            break;
                        case "estimatedCompletionDate":
                            if (el && typeof el.getMonth === 'function') {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Estimated Completion Date'`, "Complete 'Estimated Completion Date'!", 4500);
                            }
                            break;
                        case "businessAddress":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Business Address'`, "Complete 'Business Address'!", 4500);
                            }
                            break;
                        case "assetArray":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Asset List'`, "Complete 'Asset List'!", 4500);
                            }
                            break;
                        default:
                            break;
                    }
                };

                if (count >= 17) {
                    const jobData = {
                        assetArray, 
                        typeOfHack, 
                        testingDatesHackers, 
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
                        physicalLocation: true 
                    };
                    history.push("/review/employer/listing/data/payment", { jobData });
                }
            } else {
                const { assetArray, typeOfHack, testingDatesHackers, rulesOfEngagement, publicCompanyName, outOfScopeVulnerabilities, listingDescription, hashtags, requiredRankToApply, experienceAndCost, desiredSkills, maxNumberOfApplicants, disclosureVisibility, tokensRequiredToApply, listingVisibility, estimatedCompletionDate } = props.previousData;

                for (const key in props.previousData) {
                    const el = props.previousData[key];

                    console.log("digital - ", key, el);
        
                    switch (key) {
                        case "listingDescription":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Listing Description'`, "Complete 'Listing Description'!", 4500);
                            }
                            break;
                        case "rulesOfEngagement":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Rules Of Engagement'`, "Complete 'Rules Of Engagement'!", 4500);
                            }
                            break;
                        case "publicCompanyName":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Public Company Name'`, "Complete 'Public Company Name'!", 4500);
                            }
                            break;
                        case "outOfScopeVulnerabilities":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Out Of Scope Vulnerabilities'`, "Complete 'Out Of Scope Vulnerabilities'!", 4500);
                            }
                            break;
                        case "requiredRankToApply":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Required Rank To Apply'`, "Complete 'Required Rank To Apply'!", 4500);
                            }
                            break;
                        case "experienceAndCost":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Experience & Cost'`, "Complete 'Experience & Cost'!", 4500);
                            }
                            break;
                        case "desiredSkills":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Desired Skills'`, "Complete 'Desired Skills'!", 4500);
                            }
                            break;
                        case "hashtags":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Hashtags'`, "Complete 'Hashtags'!", 4500);
                            }
                            break;
                        case "maxNumberOfApplicants":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Max Number Of Applicants'`, "Complete 'Max Number Of Applicants'!", 4500);
                            }
                            break;
                        case "tokensRequiredToApply":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Tokens Required To Apply'`, "Complete 'Tokens Required To Apply'!", 4500);
                            }
                            break;
                        case "disclosureVisibility":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Disclosure Visibility'`, "Complete 'Disclosure Visibility'!", 4500);
                            }
                            break;
                        case "typeOfHack":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Type Of Hacks'`, "Complete 'Type Of Hacks'!", 4500);
                            }
                            break;
                        case "listingVisibility":
                            if (!_.isEmpty(el)) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Listing Visibility'`, "Complete 'Listing Visibility'!", 4500);
                            }
                            break;
                        case "estimatedCompletionDate":
                            if (el && typeof el.getMonth === 'function') {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Estimated Completion Date'`, "Complete 'Estimated Completion Date'!", 4500);
                            }
                            break;
                        case "assetArray":
                            if (typeof el !== "undefined" && el.length > 0) {
                                count++;
                            } else {
                                NotificationManager.error(`You are missing or haven't filled out the 'Asset List'`, "Complete 'Asset List'!", 4500);
                            }
                            break;
                        default:
                            break;
                    }
                }

                if (count >= 15) {
                    const jobData = {
                        assetArray, 
                        typeOfHack, 
                        testingDatesHackers: null, 
                        rulesOfEngagement, 
                        publicCompanyName, 
                        outOfScopeVulnerabilities, 
                        listingDescription, 
                        hashtags, 
                        businessAddress: null, 
                        requiredRankToApply, 
                        experienceAndCost, 
                        desiredSkills, 
                        maxNumberOfApplicants, 
                        disclosureVisibility, 
                        tokensRequiredToApply, 
                        listingVisibility, 
                        estimatedCompletionDate,
                        physicalLocation: false
                    };
                    history.push("/review/employer/listing/data/payment", { jobData });
                }
            }
        } else {
            NotificationManager.error("You must choose a hack type - physical OR digital but you must choose.", "Choose Hack Type!", 4500);
        }
    }
    return (
        <Fragment>
            <Breadcrumb parent="Create Listing" title="Create a public employer listing"/>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                className="loadingBarRaise"
                containerClassName="loadingBarRaise"
                height={5}
            />
            <Container fluid={true}>
                <Row>
                    {/* <JobFilter /> */}
                    <Col xl="12 xl-100">
                        <Card>
                            <div className="job-search">
                                <CardBody className="pb-0">
                                    <Media>
                                        <img className="img-40 img-fluid m-r-20" src={one} alt="" />
                                        <Media body>
                                            <h6 className="f-w-600">
                                                <a href="#">Create an employer listing</a>
                                                <span className="pull-right">
                                                {/* <Button color="primary">
                                                    <span>
                                                        <i className="fa fa-check text-white">
                                                        </i>
                                                    </span>{"Save this job"}
                                                </Button> */}
                                                </span>
                                            </h6>
                                            <p>Create a listing requesting for your company to be hacked (this will be public visible information to our database of hackers)</p>
                                        </Media>
                                    </Media>
                                    <div className="job-description">
                                        <h6 className="mb-0">General Details</h6>
                                        <Form className="theme-form">
                                            <Row>
                                                <Col md="6" lg="6" sm="12">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput1">Public Company Name:<span className="font-danger">*</span></Label>
                                                        <Input value={data.publicCompanyName} onChange={handleChangeInput} className="form-control" id="exampleFormControlInput1" name="publicCompanyName" type="text" placeholder="Enter your company's publically known name" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" lg="6" sm="12">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput1">Preferred Rank/Level Required To Apply:<span className="font-danger">*</span></Label>
                                                        <Select
                                                            value={requiredRankToApply}
                                                            onChange={(value) => {
                                                                setRequiredRankToApply(value);

                                                                props.saveListingData({
                                                                    ...props.previousData,
                                                                    requiredRankToApply: value
                                                                })
                                                            }}
                                                            options={rankOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput3">Experience Rewarded To Winner + Cost To Post:<span className="font-danger">*</span></Label>
                                                        <p style={{ paddingTop: "7px", paddingBottom: "7px" }} className="text-left">Experience is rewarded to the hacker winner. Hackers level up their accounts with XP points and can redeem the XP for cash ($-USD) after reaching certain ranks/levels. Having a <strong>higher</strong> XP reward will incentivize hackers to pick your company over others - however it <strong>costs more</strong>.</p>
                                                        <Select
                                                            value={experienceAndCost}
                                                            onChange={(value) => {
                                                                setExperienceAndCost(value);

                                                                props.saveListingData({
                                                                    ...props.previousData,
                                                                    experienceAndCost: value
                                                                })
                                                            }}
                                                            options={experienceOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlpassword">Required/Desired Skills From Hackers:<span className="font-danger">*</span></Label>
                                                        <MultiSelect
                                                            options={desiredSkillsOptions}
                                                            value={desiredSkills}
                                                            onChange={(value) => {
                                                                setDesiredSkills(value);

                                                                props.saveListingData({
                                                                    ...props.previousData,
                                                                    desiredSkills: value
                                                                })
                                                            }}
                                                            labelledBy="Select"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlpassword1">HashTags/Tags (Hackers will use these to find your listing):<span className="font-danger">*</span></Label>
                                                        <CreateHashtagsListingComponent />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="6">
                                                    <div className="col-form-label pt-0"><strong>MAX</strong> Number Of Required Hackers:</div>
                                                    <FormGroup>
                                                        <Select
                                                            value={maxNumberOfApplicants}
                                                            onChange={(value) => {
                                                                setMaxNumberOfApplicants(value);

                                                                props.saveListingData({
                                                                    ...props.previousData,
                                                                    maxNumberOfApplicants: value
                                                                })
                                                            }}
                                                            options={maxNumberOfHackersOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="6">
                                                    <div onMouseEnter={() => {
                                                        setPopoverOpen(true);
                                                    }} id="PopoverID" className="col-form-label pt-0">Amount Of Tokens Required To Apply (hover for info):</div>
                                                    <Popover
                                                        placement={"top"}
                                                        isOpen={popoverOpen}
                                                        target={"PopoverID"}
                                                        toggle={() => {
                                                            setPopoverOpen(!popoverOpen);
                                                        }}
                                                    >
                                                        <PopoverHeader>Tokens are required from hackers to apply to this job</PopoverHeader>
                                                        <PopoverBody onMouseLeave={() => {
                                                            setPopoverOpen(false);
                                                        }}>
                                                            Hackers purchase tokens in which they then use to apply to your listing(s). These are <strong>REQUIRED</strong> to apply to listings so please choose the amount you charge proportionally to the work required from your company and the reward given to successful hackers.
                                                        </PopoverBody>
                                                    </Popover>
                                                    <FormGroup>
                                                        <Select
                                                            value={tokensRequiredToApply}
                                                            onChange={(value) => {
                                                                setTokensRequiredToApply(value);

                                                                props.saveListingData({
                                                                    ...props.previousData,
                                                                    tokensRequiredToApply: value
                                                                })
                                                            }}
                                                            options={tokensApplyOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="12" md="6" lg="6">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput4">Public Or Private Vulnerability Disclosures (Upon Successful Hack):</Label>
                                                        <Select
                                                            value={disclosureVisibility}
                                                            onChange={(value) => {
                                                                setDisclosureVisibility(value);

                                                                props.saveListingData({
                                                                    ...props.previousData,
                                                                    disclosureVisibility: value
                                                                })
                                                            }}
                                                            options={disclosureOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm="12" md="6" lg="6">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput4">Type Of Hack Required (Physical/in-person <strong>OR</strong> digital/online assets):</Label>
                                                        <Select
                                                            value={typeOfHack}
                                                            onChange={(value) => {
                                                                setTypeOfHack(value);

                                                                props.saveListingData({
                                                                    ...props.previousData,
                                                                    typeOfHack: value
                                                                })
                                                            }}
                                                            options={physicalOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <h6 className="mb-0">Timespan & Timeline Information + Visibility Type</h6>
                                        <Form className="theme-form">
                                            <Row>
                                                <Col md="6" lg="6" xl="6">
                                                    <Col sm="12" md="12" lg="12" xl="12 xl-100">
                                                        <FormGroup>
                                                            <Label htmlFor="exampleFormControlInput1">Visibility Type (Who Can See Your Listing Or Apply Once Live):<span className="font-danger">*</span></Label>
                                                            <Select
                                                                value={listingVisibility}
                                                                onChange={(value) => {
                                                                    setListingVisibility(value);

                                                                    props.saveListingData({
                                                                        ...props.previousData,
                                                                        listingVisibility: value
                                                                    })
                                                                }}
                                                                options={visibilityOptions}
                                                            />
                                                        </FormGroup>
                                                        {renderPhysicalHackingDates()}
                                                    </Col>
                                                </Col>
                                                <Col md="12" lg="12" xl="6 xl-100">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput1">Estimated/Expected Day Of Completion (Must Be Successfully Hacked By This Day For Full Payment):<span className="font-danger">*</span></Label>
                                                        <p style={{ paddingBottom: "20px" }}>These are the days in which you expect the hired hackers/contractors to have <strong>successfully</strong> completed any hacks or attacks (digital or physical) against your company. Disclosures will occurr shortly after whichever days are selected and any further testing or reporting shall proceed at that point.</p>
                                                        <Calendar 
                                                            minDate={new Date()}
                                                            date={_.has(props.previousData, "estimatedCompletionDate") ? new Date(props.previousData.estimatedCompletionDate) : new Date()}
                                                            onChange={handleDeadlineSelect}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        {renderBusinessLocationPortion()}
                                        <h6 className="mb-0"><strong>DIGITAL</strong> Assets & Payment/Reward Information - Digital Scope</h6>
                                        <Form className="theme-form">
                                            <Row>
                                                <Col xl="12 xl-100">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput7">Asset Endpoint Or URL:<span className="font-danger">*</span></Label>
                                                        <InputGroup>
                                                            <Input onChange={handleChangeInput} value={data.assetName} className="form-control" id="exampleFormControlInput7" name="assetName" type="text" placeholder="Eg.'s - api.yourcompany.com OR https://www.yourcompanywebsite.com" />
                                                            <InputGroupAddon addonType="append"><Button onClick={handleAssetAddition} color="secondary">Add Asset</Button></InputGroupAddon>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <ListGroup>
                                                {typeof assetArray !== "undefined" && assetArray.length > 0 ? assetArray.map((asset, index) => {
                                                    return (
                                                        <ListGroupItem key={index} className="list-group-item flex-column align-items-start">
                                                            <Row style={{ paddingBottom: "12px" }}>
                                                                <ListGroupItem active>{asset.name}<div onClick={() => {
                                                                    setAssetArray(prevState => {
                                                                        props.saveListingData({
                                                                            ...props.previousData,
                                                                            assetArray: prevState.filter((item, index) => {
                                                                                if (item.id !== asset.id) {
                                                                                    return item;
                                                                                }
                                                                            })
                                                                        }) 
                                                                        return prevState.filter((item, index) => {
                                                                            if (item.id !== asset.id) {
                                                                                return item;
                                                                            }
                                                                        });
                                                                    });  
                                                                }} id="float-right-icon"><XCircle /></div></ListGroupItem>
                                                            </Row>
                                                            <Row>
                                                                <Col md="3" lg="3" sm="6">
                                                                    <FormGroup>
                                                                        <Label><span style={{ color: "#ffc800" }}>Low</span> Severity Bounty Reward</Label>
                                                                        <InputGroup>
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "lowSeverity", asset);
                                                                        }} value={asset.lowSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="3" lg="3" sm="6">
                                                                    <FormGroup>
                                                                        <Label><span style={{ color: "#ed3824" }}>Medium</span> Severity Bounty Reward</Label>
                                                                        <InputGroup>
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "mediumSeverity", asset);
                                                                        }} value={asset.mediumSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="3" lg="3" sm="6">
                                                                    <FormGroup>
                                                                        <Label><span style={{ color: "#8f0091" }}>High</span> Severity Bounty Reward</Label>
                                                                        <InputGroup>
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "highSeverity", asset);
                                                                        }} value={asset.highSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="3" lg="3" sm="6">
                                                                    <FormGroup>
                                                                        <Label><span style={{ color: "#b30211" }}>Critical</span> Severity Bounty Reward</Label>
                                                                        <InputGroup>
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "criticalSeverity", asset);
                                                                        }} value={asset.criticalSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </ListGroupItem>
                                                    );
                                                }) : null}
                                                </ListGroup>
                                            </Row>
                                        </Form>
                                        <h6 className="mb-0">Upload Any Supporting Documents/Files</h6>
                                        <Form className="theme-form">
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label className="col-form-label pt-0">Upload File(s):<span className="font-danger">*</span></Label>
                                                        <div className="dz-message needsclick">
                                                            <Dropzone
                                                                getUploadParams={getUploadParams}
                                                                onChangeStatus={handleChangeStatus}
                                                                maxFiles={5}
                                                                multiple={false}
                                                                canCancel={false}
                                                                inputContent="Drop A File(s)"
                                                                styles={{
                                                                    dropzone: { height: 225 },
                                                                    dropzoneActive: { borderColor: 'green' },
                                                                }}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <ListGroup style={{ paddingBottom: "25px" }}>
                                            {typeof props.previousData.uploadedFiles !== "undefined" && props.previousData.uploadedFiles.length > 0 ? props.previousData.uploadedFiles.map((file, index) => {
                                                return (
                                                    <ListGroupItem className="d-flex justify-content-between align-items-center">{file.name}<span onClick={() => {
                                                        props.saveListingData({
                                                            ...props.previousData,
                                                            uploadedFiles: props.previousData.uploadedFiles.filter((item, indxxx) => {
                                                                if (item.id !== file.id) {
                                                                    return item;
                                                                }
                                                            })
                                                        });
                                                    }} className="badge badge-primary counter digits hover-text">Remove file from uploads</span></ListGroupItem>
                                                );
                                            }) : null}
                                        </ListGroup>
                                        <h6 className="mb-0" style={{ paddingBottom: "15px" }}>Listing Description/Information</h6>
                                        <p style={{ paddingBottom: "25px" }}>Include as detailed of a description as you possibly can so our hackers will know what they're being asked to attempt/hack. This can be <strong>general</strong> information as well as any other information that you'd like to include. Strong/detailed listing descriptions generally always have higher response/application rates compared to minimal detail listings.</p>
                                        <SimpleMDE
                                            id="editor_container"
                                            onChange={onChangeDescription}
                                            value={content}
                                        />
                                        <h6 className="mb-0" style={{ paddingBottom: "15px", paddingTop: "25px" }}>Program/Listing Rules & Conditions Of Engagement</h6>
                                        <p style={{ paddingBottom: "25px" }}>Please include an <strong>exhaustive list</strong> of specific <strong>RULES</strong> our hackers should follow and abide by while applying allowed hacks to avoid <strong>termination or suspension</strong> from our platform for misuse (referring to our hackers). We stand by our rules and proceedures so please be as detailed and clear as possible while outlines what you expect from potential hacker candiates and the conditions in place once hired.</p>
                                        <SimpleMDE
                                            id="editor_container"
                                            onChange={(value) => {
                                                setRules(value);

                                                props.saveListingData({
                                                    ...props.previousData,
                                                    rulesOfEngagement: value
                                                })
                                            }}
                                            value={rules}
                                        />
                                        <h6 className="mb-0" style={{ paddingBottom: "15px", paddingTop: "25px" }}><strong>OUT OF SCOPE</strong> Vulnerabilities & Boundaries</h6>
                                        <p style={{ paddingBottom: "25px" }}>Please include an exhaustive list of which vulnerabilities are <strong>NOT</strong> included as acceptable reports as well as anything you would like our hackers to <strong>abstain</strong> from testing or tampering with such as texting accounts, unauthenticated tests, etc... <em>BE AS SPECIFIC AS POSSIBLE.</em></p>
                                        <SimpleMDE
                                            id="editor_container_two"
                                            onChange={(value) => {
                                                setOutOfScope(value);

                                                props.saveListingData({
                                                    ...props.previousData,
                                                    outOfScopeVulnerabilities: value
                                                })
                                            }}
                                            value={outOfScope}
                                        />
                                    </div>
                                </CardBody>
                                <div className="card-footer">
                                    <Button style={{ width: "100%" }} onClick={handleListingSubmission} color="primary mr-1">Submit & Continue To Payment/Confirmation Page</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        previousData: _.has(state.listingData, "listingData") ? {
            testingDatesHackers: [],
            listingDescription: "",
            rulesOfEngagement: "",
            assetArray: [], 
            typeOfHack: {}, 
            publicCompanyName: "", 
            outOfScopeVulnerabilities: "", 
            hashtags: [], 
            businessAddress: {}, 
            requiredRankToApply: {}, 
            experienceAndCost: {}, 
            desiredSkills: [], 
            maxNumberOfApplicants: {}, 
            disclosureVisibility: {}, 
            tokensRequiredToApply: {}, 
            listingVisibility: {}, 
            estimatedCompletionDate: null,
            ...state.listingData.listingData
        } : {}
    }
}
export default connect(mapStateToProps, { saveListingData })(CreateJobListingMainHelper);