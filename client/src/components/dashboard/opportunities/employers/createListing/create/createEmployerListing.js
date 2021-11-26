import React, {Fragment, useState} from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker from "react-datepicker";
import one from '../../../../../../assets/images/job-search/1.jpg';
import {Container,Row,Col,Card,CardBody,Media,Button,Form,FormGroup,Label,Input,InputGroup,InputGroupAddon,ListGroup,ListGroupItem,InputGroupText,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import { Password,RepeatPassword,BirthDate,PhoneNumber,Period,DegreeLevel,Specialization,UploadRecommendations,UploadCoverLetter,UploadYourCV,UploadYourFiles,Submit,Cancel } from "../../../../../../constant";
import Select from 'react-select';
import uuid from "react-uuid";
import { MultiSelect } from "react-multi-select-component";
import CKEditors from "react-ckeditor-component";
import CreateHashtagsListingComponent from "./helpers/hashtags/createHashtagsListing.js";

const idealTimespanOptions = [
  { value: 7, label: '7 Days' },
  { value: 10, label: '10 Days' },
  { value: 14, label: '14 Days' },
  { value: 18, label: '18 Days' },
  { value: 23, label: '23 Days' },
  { value: 27, label: '27 Days' },
  { value: 31, label: '31 Days' },
  { value: 35, label: '35 Days' },
  { value: 40, label: '40 Days' },
  { value: 45, label: '45 Days' },
  { value: 50, label: '50 Days' },
  { value: 55, label: '55 Days' },
  { value: 60, label: '60 Days' }
];
// $1.00 === 1000xp
const experienceOptions = [
    { value: '5,000 XP Reward & $5.00 To Post', label: '5,000 XP Reward & $5.00 To Post', experience: 5000, cost: 500 },
    { value: '7,500 XP Reward & $7.50 To Post', label: '7,500 XP Reward & $7.50 To Post', experience: 7500, cost: 750 },
    { value: '10,000 XP Reward & $10.00 To Post', label: '10,000 XP Reward & $10.00 To Post', experience: 10000, cost: 1000 },
    { value: '15,000 XP Reward & $15.00 To Post', label: '15,000 XP Reward & $15.00 To Post', experience: 15000, cost: 1500 },
    { value: '20,000 XP Reward & $20.00 To Post', label: '20,000 XP Reward & $20.00 To Post', experience: 20000, cost: 2000 },
    { value: '25,000 XP Reward & $25.00 To Post', label: '25,000 XP Reward & $25.00 To Post', experience: 25000, cost: 2500 },
    { value: '30,000 XP Reward & $30.00 To Post', label: '30,000 XP Reward & $30.00 To Post', experience: 30000, cost: 3000 },
    { value: '40,000 XP Reward & $40.00 To Post', label: '40,000 XP Reward & $40.00 To Post', experience: 40000, cost: 4000 }
]
const rankOptions = [
    { value: '1-3', label: 'Levels 1-3' },
    { value: '3-5', label: 'Levels 3-5' },
    { value: '6-8', label: 'Levels 6-8' },
    { value: '9-13', label: 'Levels 9-13' },
    { value: '14-17', label: 'Levels 14-17' },
    { value: '18-21', label: 'Levels 18-21' },
    { value: '22-26', label: 'Levels 22-26' },
    { value: '27-31', label: 'Levels 27-31' },
    { value: '32-36', label: 'Levels 32-36' },
    { value: '37-42', label: 'Levels 37-42' },
    { value: '43-45', label: 'Levels 43-45' },
    { value: '46-48', label: 'Levels 46-48' },
    { value: '49-50', label: 'Levels 49-50' }
];
const desiredSkillsOptions = [
    { label: "Coding/Programming Experience (Average)", value: "Coding/Programming Experience (Average)" },
    { label: "Coding/Programming Experience (Expert/Advanced)", value: "Coding/Programming Experience (Expert/Advanced)" },
    { label: "Cryptography Experience", value: "Cryptography Experience" },
    { label: "Social engineering Experience", value: "Social engineering Experience" },
    { label: "Wireless technologies Hacking Experience", value: "Wireless technologies Hacking Experience" },
    { label: "Computer Networking Experience", value: "Computer Networking Experience" },
    { label: "Networking Experience (Average)", value: "Networking Experience (Average)" },
    { label: "Networking Experience (Expert/Advanced)", value: "Networking Experience (Expert/Advanced)" },
    { label: "Server Room Hardware Experience & Understanding", value: "Server Room Hardware Experience & Understanding" },
    { label: "System Administration Experience", value: "System Administration Experience" },
    { label: "Shell Scripting Experience", value: "Shell Scripting Experience" },
    { label: "Ability To Find PoC's (Proof Of Concept Code) & Exploits", value: "Ability To Find PoC's (Proof Of Concept Code) & Exploits" },
    { label: "OSINT Gathering Experience", value: "OSINT Gathering Experience" },
    { label: "Database Knowledge (Average)", value: "Database Knowledge (Average)" },
    { label: "Database Knowledge (Expert/Advanced)", value: "Database Knowledge (Expert/Advanced)" },
    { label: "Auditing & Compliance Experience", value: "Auditing & Compliance Experience" },
    { label: "Mobile Technology Hacking Experience", value: "Mobile Technology Hacking Experience" },
    { label: "Web Technology Hacking Experience", value: "Web Technology Hacking Experience" },
    { label: "Password & Hash Cracking Experience", value: "Password & Hash Cracking Experience" },
    { label: "Threat Intelligence Experience", value: "Threat Intelligence Experience" },
    { label: "Incident Handling Experience", value: "Incident Handling Experience" },
    { label: "Forensic Skills Experience", value: "Forensics Skills Experience" },
    { label: "Virtualization And Cloud Computing Experience", value: "Virtualization And Cloud Computing Experience" },
    { label: "DevSecOps Skills Experience", value: "DevSecOps Skills Experience" },
    { label: "Access Management Experience", value: "Access Management Experience" },
    { label: "Health Information Security Experience", value: "Health Information Security Experience" }
];
const maxNumberOfHackersOptions = [
    { label: "1 Hacker", value: 1 },
    { label: "2 Hackers", value: 2 },
    { label: "3 Hackers", value: 3 },
    { label: "4 Hackers", value: 4 },
    { label: "5 Hackers", value: 5 },
    { label: "6 Hackers", value: 6 },
    { label: "7 Hackers", value: 7 },
    { label: "8 Hackers", value: 8 },
    { label: "9 Hackers", value: 9 },
    { label: "10 Hackers", value: 10 }
];

const CreateJobListingMainHelper = (props) => {
    
    // dont need these ...
    const [multiple, setMultiple] = useState(false);
    const [startDate, setStartDate] = useState(new Date(),);
    const [startDate1, setStartDate1] = useState(new Date(),);
    const [startDate2, setStartDate2] = useState(new Date(),);
    const [startDate3, setStartDate3] = useState(new Date(),);
    // dont need these ^^^^^^^^^^^^^
    const [ assetArray, setAssetArray ] = useState([]);
    const [ timespan, setTimespan ] = useState(null);
    const [ data, setData ] = useState({});
    const [ requiredRankToApply, setRequiredRankToApply ] = useState(null);
    const [ experienceAndCost, setExperienceAndCost ] = useState(null);
    const [ desiredSkills, setDesiredSkills ] = useState([]);
    const [ content,setContent ] = useState('Enter your content here...');
    const [ maxNumberOfApplicants, setMaxNumberOfApplicants ] = useState(null);
    const [ popoverOpen, setPopoverOpen ] = useState(false);

    const onChangeDescription = (evt) => {
        const newContent = evt.editor.getData();
        setContent(newContent)
    }
    
    const handleChange = date => {
       setStartDate(date)
    };

    const handleChange1 = date => {
        setStartDate1(date)
    };

    const handleChange2 = date => {
        setStartDate2(date)
    };

    const handleChange3 = date => {
        setStartDate3(date)
    };
    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const handleAssetAddition = (e) => {
        e.preventDefault();
        // assetName

        setAssetArray(prevState => {
            return [...prevState, {
                id: uuid(),
                name: data.assetName
            }]
        })
    }
    const changeBountyPrices = (e, rewardLevel, asset) => {
        const { value } = e.target;

        setAssetArray(prevState => {
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
    console.log("experienceAndCost", experienceAndCost);
    return (
        <Fragment>
            <Breadcrumb parent="Create Listing" title="Create a public employer listing"/>
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
                                                <Button color="primary">
                                                    <span>
                                                        <i className="fa fa-check text-white">
                                                        </i>
                                                    </span>{"Save this job"}
                                                </Button>
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
                                                            onChange={setRequiredRankToApply}
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
                                                            onChange={setExperienceAndCost}
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
                                                            onChange={setDesiredSkills}
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
                                                            onChange={setMaxNumberOfApplicants}
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
                                                            value={maxNumberOfApplicants}
                                                            onChange={setMaxNumberOfApplicants}
                                                            options={maxNumberOfHackersOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput4">{PhoneNumber}:</Label>
                                                        <Input className="form-control" id="exampleFormControlInput4" type="email" placeholder="Enter Phone no." />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <h6 className="mb-0">Timespan & Timeline Information</h6>
                                        <Form className="theme-form">
                                            <Row>
                                                <Col xl="6 xl-100">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput1">Timespan allocated for hackers to test/exploit (Maximum - from posted date):<span className="font-danger">*</span></Label>
                                                        <Select
                                                            value={timespan}
                                                            onChange={(value) => {
                                                                setTimespan(value);
                                                            }}
                                                            options={idealTimespanOptions}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col xl="6 xl-100">
                                                    <Label className="col-form-label text-right pt-0">{Period}:<span className="font-danger">*</span></Label>
                                                    <Row>
                                                        <Col sm="6">
                                                            <FormGroup>
                                                                <DatePicker className="form-control digits" selected={startDate} onChange={handleChange} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col sm="6">
                                                            <FormGroup>
                                                                <DatePicker className="form-control digits" selected={startDate1} onChange={handleChange1} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="col-form-label pt-0">{DegreeLevel}:<span className="font-danger">*</span></div>
                                                    <FormGroup>
                                                        <Typeahead
                                                            id="basic-typeahead"
                                                            labelKey="name"
                                                            multiple={multiple}
                                                            options={['Student', 'Bachelor', 'Master', 'Associate']}
                                                            placeholder="Degree"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput6">{Specialization}:<span className="font-danger">*</span></Label>
                                                        <Input className="form-control" id="exampleFormControlInput6" type="email" placeholder="Enter specialization" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <h6 className="mb-0"><strong>DIGITAL</strong> Assets & Payment/Reward Information</h6>
                                        <Form className="theme-form">
                                            <Row>
                                                <Col xl="12 xl-100">
                                                    <FormGroup>
                                                        <Label htmlFor="exampleFormControlInput7">Asset Endpoint Or URL:<span className="font-danger">*</span></Label>
                                                        <InputGroup>
                                                            <Input onChange={handleChangeInput} className="form-control" id="exampleFormControlInput7" name="assetName" type="text" placeholder="Eg.'s - api.yourcompany.com OR https://www.yourcompanywebsite.com" />
                                                            <InputGroupAddon addonType="append"><Button onClick={handleAssetAddition} color="secondary">Add Asset</Button></InputGroupAddon>
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <ListGroup>
                                                {typeof assetArray !== "undefined" && assetArray.length > 0 ? assetArray.map((asset, index) => {
                                                    console.log("asset", asset);
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
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "lowSeverity", asset);
                                                                        }} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="3" lg="3" sm="6">
                                                                    <FormGroup>
                                                                        <Label><span style={{ color: "#ed3824" }}>Medium</span> Severity Bounty Reward</Label>
                                                                        <InputGroup>
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "mediumSeverity", asset);
                                                                        }} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="3" lg="3" sm="6">
                                                                    <FormGroup>
                                                                        <Label><span style={{ color: "#8f0091" }}>High</span> Severity Bounty Reward</Label>
                                                                        <InputGroup>
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "highSeverity", asset);
                                                                        }} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="3" lg="3" sm="6">
                                                                    <FormGroup>
                                                                        <Label><span style={{ color: "#b30211" }}>Critical</span> Severity Bounty Reward</Label>
                                                                        <InputGroup>
                                                                        <Input onChange={(e) => {
                                                                            changeBountyPrices(e, "criticalSeverity", asset);
                                                                        }} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
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
                                        <h6 className="mb-0">{UploadYourFiles}</h6>
                                        <Form className="theme-form">
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label className="col-form-label pt-0">{UploadCoverLetter}:<span className="font-danger">*</span></Label>
                                                        <Input className="form-control" type="file" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label className="col-form-label pt-0">{UploadYourCV}:<span className="font-danger">*</span></Label>
                                                        <Input className="form-control" type="file" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-0">
                                                        <Label className="col-form-label pt-0">{UploadRecommendations}:</Label>
                                                        <Input className="form-control" type="file" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <h6 className="mb-0" style={{ paddingBottom: "25px" }}>Listing Description/Information</h6>
                                        <CKEditors
                                            activeclassName="p10"
                                            content={content}
                                            events={{
                                                "change": onChangeDescription
                                            }}
                                        />
                                    </div>
                                </CardBody>
                                <div className="card-footer">
                                    <Button color="primary mr-1">{Submit}</Button>
                                    <Button color="light">{Cancel}</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default CreateJobListingMainHelper;