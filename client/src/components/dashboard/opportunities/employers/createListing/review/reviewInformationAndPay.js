import React, { Component } from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Container, Button, Row, Col ,Card, Badge, CardBody, CardHeader, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Label, FormGroup, Input, InputGroup } from 'reactstrap';
import "./styles.css";
import ReactMarkdown from 'react-markdown';
import { connect } from "react-redux";
import _ from "lodash";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import Cards from 'react-credit-cards';
import { NotificationManager } from 'react-notifications';
import Select from 'react-select';
import Calendar from 'react-calendar';
import { DateRange } from 'react-date-range';
import { Modal } from 'react-responsive-modal';
import FileViewer from 'react-file-viewer';


const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class ReviewListingInformationAndPayHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        page: "general",
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
        file: null,
        selectedPaymentCard: null,
        previousCardOptions: [],
        ranges: [],
        showFileModal: false
    }
}
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }
    handleCardSelectionChange = (value) => {
        this.setState({
            selectedPaymentCard: value
        })
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "number") {
            if (value.length !== 0) {
                let filtered = value.replace(/\D/, '');

                this.setState({ 
                    number: filtered
                });
            } else {
                this.setState({ 
                    number: ""
                });
            }
        } else {
            this.setState({ [name]: value });
        }
    }
    handleExpiryInput = (e) => {
        const { name, value } = e.target;

        let textTemp = value;

        if (textTemp.length === 2) {
            textTemp += '/';
        }
        this.setState({
            expiry: textTemp
        })
    }
    componentDidMount() {
        const { testingDatesHackers } = this.props.previousData;

        const newTestingDatesArray = [];

        for (let index = 0; index < testingDatesHackers.length; index++) {
            const dated = testingDatesHackers[index];
            
            const { startDate, endDate, key } = dated;

            newTestingDatesArray.push({
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                key
            })
        }

        this.setState({
            ranges: newTestingDatesArray
        })
    }
    renderColor = (i) => {
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
    viewFileInfo = (e) => {
        e.preventDefault();

        console.log("viewFileInfo clicked.");
    }
    onError = (error) => {
        console.log("error", error);
    }
    calculateFileType = (type) => {
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
    render() {
        const { assetArray, typeOfHack, testingDatesHackers, rulesOfEngagement, publicCompanyName, outOfScopeVulnerabilities, listingDescription, hashtags, businessAddress, requiredRankToApply, experienceAndCost, desiredSkills, maxNumberOfApplicants, disclosureVisibility, tokensRequiredToApply, listingVisibility, estimatedCompletionDate, timespan, uploadedFiles } = this.props.previousData;

        const {
            name,
            number,
            focus,
            expiry,
            cvc,
            ranges,
            showFileModal,
            file
        } = this.state;

        console.log("this.state:", this.state);
        return (
            <div>
            <Breadcrumb parent="Review & Payment" title="Review/Summary"/>
            {file !== null ? <Modal open={showFileModal} onClose={() => {
                this.setState({
                    showFileModal: false
                })
            }} classNames={{
                modal: 'customModal'
            }} center>
                <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                    <Card>
                        <CardBody>
                            <h3 className="text-left">File Details/Preview</h3>  
                            <FileViewer
                                fileType={this.calculateFileType(file.type)}
                                filePath={`${process.env.REACT_APP_ASSET_LINK}/${file.onlineID}`}
                                onError={this.onError}
                            />
                        </CardBody>
                        <div className="create-space">
                            <Button style={{ width: "100%" }} onClick={() => {
                                this.setState({
                                    showFileModal: false
                                })
                            }} color="secondary mr-1">Close/Exit Modal</Button>
                        </div>
                    </Card>
                </Col>
            </Modal> : null}
            <Container fluid={true}>
                <Row>
                    <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                        <Card>
                            <CardBody>
                                <h3 className="text-left">Payment/Transaction Fee's</h3>
                                <p className="text-left">You will need to select a previously added payment method or add a "new" payment method with the form below. We charge you <strong>more</strong> if you've selected a <strong>higher</strong> experience reward to the successful hacker(s) as this incentivizes them and makes them <strong>more</strong> likely to apply to your job than others...</p>   
                                <Row>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <Card>
                                            <CardHeader className="b-l-primary border-3">
                                                <h5>Details</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <h5 className="text-left underline-header">Tokens Required To Apply</h5>
                                                <p>Applicants must pay <strong style={{ color: "red" }}>{tokensRequiredToApply.value}</strong> tokens to apply to your listing.</p>
                                                <hr />
                                                <h5 className="text-left underline-header">Experience Awarded To Winner(s) & Cost To Post</h5>
                                                <small>NOTE: <strong>Higher</strong> rewards to hackers makes it <strong>more</strong> likely you'll have more applicants than other users on our platform.</small>
                                                <p style={{ paddingTop: "25px" }}>The cost of posting this listing is <strong style={{ color: "red" }}>${(experienceAndCost.cost / 100).toFixed(2)}</strong> and winners will be awarded approximately <strong style={{ color: "red" }}>{experienceAndCost.experience} experience (XP)</strong> points!</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col sm="12" md="6" lg="6" xl="6">
                                        <Row style={{ paddingBottom: "10px" }}>
                                            <Label>Select An Existing Registered Card</Label>
                                            <Select
                                                value={this.state.selectedPaymentCard}
                                                onChange={this.handleCardSelectionChange}
                                                options={this.state.previousCardOptions}
                                            />
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <FormGroup>
                                                    <Label>Card Number</Label>
                                                    <InputGroup>
                                                        <Input onFocus={this.handleInputFocus} onChange={this.handleInputChange} value={number} name="number" className="form-control" maxlength={19} size={19} type="text" placeholder="Debit/Credit Card Number" aria-label="Debit/Credit Card Number"/>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="6" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label>Full Name</Label>
                                                    <InputGroup>
                                                        <Input onFocus={this.handleInputFocus} onChange={this.handleInputChange} value={name} name="name" maxlength="35" size="35" className="form-control" type="text" placeholder="Full Name" aria-label="Full Name"/>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label>Expiration</Label>
                                                    <InputGroup>
                                                        <Input onFocus={this.handleInputFocus} value={expiry} onChange={this.handleExpiryInput} name="expiry" className="form-control" maxlength="5" size="5" type="text" placeholder="MM/YY" aria-label="MM/YY"/>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label>CVV</Label>
                                                    <InputGroup>
                                                        <Input onFocus={this.handleInputFocus} onChange={this.handleInputChange} value={cvc} name="cvc" className="form-control" maxlength="4" size="4" type="text" placeholder="CVV" aria-label="CVV"/>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <Cards
                                                    cvc={this.state.cvc}
                                                    expiry={this.state.expiry}
                                                    focused={this.state.focus}
                                                    name={this.state.name}
                                                    number={this.state.number}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                            <div className="create-space">
                                <Button className="btn disabled" style={{ width: "100%" }} onClick={this.handlePayment} color="mr-1">Submit/Manage Payment & Continue</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                        <Card>
                            <CardBody>
                                <div className="tabbed-card">
                                <Nav className="pull-right  nav-pills nav-primary">
                                    <NavItem>
                                        <NavLink  className={this.state.page === 'general' ? 'active hover-active-change' : 'hover-active-change'} onClick={() => {
                                            this.setState({
                                                page: "general"
                                            })
                                        }}>
                                            {typeOfHack.value === "physical-hack" ? "General Details & Location" : "General Details"}
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={this.state.page === 'time-visibility' ? 'active hover-active-change' : 'hover-active-change'} onClick={() => {
                                            this.setState({
                                                page: "time-visibility"
                                            })
                                        }}>
                                            Timespan/Visibility Details
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={this.state.page === 'assets' ? 'active hover-active-change' : 'hover-active-change'} onClick={() => {
                                            this.setState({
                                                page: "assets"
                                            })
                                        }}>
                                            Assets/Resources
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={this.state.page === 'listing-info' ? 'active hover-active-change' : 'hover-active-change'} onClick={() => {
                                            this.setState({
                                                page: "listing-info"
                                            })
                                        }}>
                                            Listing Information
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                </div>
                            </CardBody>
                            <CardBody>
                                <TabContent activeTab={this.state.page}>
                                    <TabPane tabId="general">
                                        <h3 style={{ paddingTop: "20px" }} className="text-left blue-heavy-text">Public Company Name</h3>
                                        <ListGroup style={{ marginBottom: "15px" }}>
                                            <ListGroupItem>{publicCompanyName}</ListGroupItem>
                                        </ListGroup>
                                        <h3 style={{ paddingTop: "10px" }} className="text-left blue-heavy-text">Type Of Hack Required</h3>
                                        <ListGroup style={{ marginBottom: "15px" }}>
                                            <ListGroupItem>{typeOfHack.label}</ListGroupItem>
                                        </ListGroup>
                                        <h3 className="text-left blue-heavy-text">Location (Physical Testing Requested)</h3>
                                        <Map
                                            style="mapbox://styles/mapbox/streets-v9"
                                            containerStyle={{
                                                height: '375px',
                                                width: '75%'
                                            }}
                                            center={[businessAddress.position.lon, businessAddress.position.lat]}
                                        >
                                            <Marker
                                                style={{ maxWidth: "45px", maxHeight: "45px" }}
                                                coordinates={[businessAddress.position.lon, businessAddress.position.lat]}
                                                anchor="bottom">
                                                <img src={require("../../../../../../assets/images/location.png")}/>
                                            </Marker>
                                        </Map>
                                        <h3 style={{ paddingTop: "15px" }} className="text-left blue-heavy-text">Listing Description (General)</h3>
                                        <ReactMarkdown children={listingDescription} />
                                    </TabPane>
                                    <TabPane tabId="time-visibility">
                                        <h3 className="text-left blue-heavy-text">Estimated/Expected Completion Date</h3>
                                        <Calendar
                                            value={new Date(estimatedCompletionDate)}
                                        />
                                        <h3 style={{ paddingTop: "20px" }} className="text-left blue-heavy-text">Visibility - Who Can See Your Listing</h3>
                                        <ListGroup>
                                            <ListGroupItem>{listingVisibility.label}</ListGroupItem>
                                        </ListGroup>
                                        {/* <h3 style={{ paddingTop: "20px" }} className="text-left blue-heavy-text">Allotted Timespan</h3>
                                        <ListGroup>
                                            <ListGroupItem>{timespan.label}</ListGroupItem>
                                        </ListGroup> */}
                                        <h3 style={{ paddingTop: "20px" }} className="text-left blue-heavy-text">Date Ranges Availiable To Selected Hackers</h3>
                                        <DateRange
                                            editableDateInputs={false}
                                            ranges={ranges}
                                        />
                                    </TabPane>
                                    <TabPane tabId="assets">
                                        <h3 className="text-left blue-heavy-text">Assets & Hackable Resources</h3>
                                        <ListGroup>
                                            {typeof assetArray !== "undefined" && assetArray.length > 0 ? assetArray.map((asset, index) => {
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
                                        <h3 style={{ marginTop: "15px", marginBottom: "15px" }} className="text-left blue-heavy-text">Uploaded/Selected File(s)</h3>
                                        <div className="file-content">
                                            <Card>
                                                <CardBody className="file-manager">
                                                    <ul className="files">
                                                    {typeof uploadedFiles !== "undefined" && uploadedFiles.length > 0 ? uploadedFiles.map((file, i) => {
                                                        return (
                                                            <li className="file-box" key={i}>
                                                                <div className="file-top"><i className={`fa fa-file-text-o ${this.renderColor(i)}`} ></i><i className="fa fa-ellipsis-v f-14 ellips"></i></div>
                                                                <div className="file-bottom">
                                                                <h6>{file.name} </h6>
                                                                <p className="mb-1">Uploaded: {file.date}</p>
                                                                <p> <b>{"File Type:"} : </b>{file.type}</p>
                                                                <Button style={{ width: "100%" }} onClick={() => {
                                                                    this.setState({
                                                                        file,
                                                                        showFileModal: true
                                                                    })
                                                                }} color="primary mr-1">View File</Button>
                                                                </div>
                                                            </li>
                                                        );
                                                    }) : null}
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="listing-info">
                                        <h3 style={{ paddingTop: "15px" }} className="text-left blue-heavy-text">Required/Desired Rank Level To Apply</h3>
                                        <ListGroup style={{ marginBottom: "15px" }}>
                                            <ListGroupItem>{requiredRankToApply.label}</ListGroupItem>
                                        </ListGroup>
                                        <h3 style={{ paddingTop: "15px" }} className="text-left blue-heavy-text">Max Number Of Required Hackers</h3>
                                        <ListGroup style={{ marginBottom: "15px" }}>
                                            <ListGroupItem>{maxNumberOfApplicants.label}</ListGroupItem>
                                        </ListGroup>
                                        <h3 style={{ paddingTop: "15px" }} className="text-left blue-heavy-text">Final Disclosure Visibility</h3>
                                        <ListGroup style={{ marginBottom: "15px" }}>
                                            <ListGroupItem>{disclosureVisibility.label}</ListGroupItem>
                                        </ListGroup>
                                        <h3 className="text-left blue-heavy-text">Related Hashtags/Tags</h3>
                                        {typeof hashtags !== "undefined" && hashtags.length > 0 ? hashtags.map((tag, index) => {
                                            return <Badge key={index} style={{ fontSize: "15px" }} color="secondary">{tag.text}</Badge>;
                                        }) : null}
                                        <h3 style={{ paddingTop: "15px" }} className="text-left blue-heavy-text">Desired Skills</h3>
                                        <ListGroup>
                                        {typeof desiredSkills !== "undefined" && desiredSkills.length > 0 ? desiredSkills.map((skill, index) => {
                                            return <ListGroupItem key={index}>- {skill.label}</ListGroupItem>;
                                        }) : null}
                                        </ListGroup>
                                        <h3 style={{ paddingTop: "15px" }} className="text-left blue-heavy-text">Final Disclosure Visibility</h3>
                                        <ListGroup>
                                            <ListGroupItem>{disclosureVisibility.label}</ListGroupItem>
                                        </ListGroup>
                                        <h3 className="text-left blue-heavy-text" style={{ marginTop: "15px" }}>"Out-of-scope" Vulnerabilities</h3>
                                        <ReactMarkdown children={outOfScopeVulnerabilities} />
                                        <h3 className="text-left blue-heavy-text" style={{ marginTop: "15px" }}>Rules Of Engagement</h3>
                                        <ReactMarkdown children={rulesOfEngagement} />
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        previousData: _.has(state.listingData, "listingData") ? state.listingData.listingData : {}
    }
}
export default connect(mapStateToProps, {  })(ReviewListingInformationAndPayHelper);
