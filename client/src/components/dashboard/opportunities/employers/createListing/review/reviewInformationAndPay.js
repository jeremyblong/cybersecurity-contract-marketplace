import React, { Component } from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Container,  Row, Col ,Card, Badge, CardBody, TabContent, TabPane, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Label, FormGroup, Input, InputGroup } from 'reactstrap';
import "./styles.css";
import ReactMarkdown from 'react-markdown';
import { connect } from "react-redux";
import _ from "lodash";
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';


class ReviewListingInformationAndPayHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        page: "general"
    }
}
    render() {
        const { assetArray, typeOfHack, testingDatesHackers, rulesOfEngagement, publicCompanyName, outOfScopeVulnerabilities, listingDescription, hashtags, businessAddress, requiredRankToApply, experienceAndCost, desiredSkills, maxNumberOfApplicants, disclosureVisibility, tokensRequiredToApply, listingVisibility, estimatedCompletionDate } = this.props.previousData;
        
        const Map = ReactMapboxGl({
            accessToken: process.env.REACT_APP_MAPBOX_TOKEN
        });

        console.log(this.props.previousData);
        return (
            <div>
            <Breadcrumb parent="Review & Payment" title="Review/Summary"/>
            <Container fluid={true}>
                <Row>
                    <Col lg="12 box-col-12" xl="12 xl-100" md="12">
                        <Card>
                            <CardBody>
                                <h3 className="text-left">Payment/Transaction Fee's</h3>   
                            </CardBody>
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
                                        <p className="mb-0">{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"}</p>
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
                                                                    <Input value={asset.lowSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="3" lg="3" sm="6">
                                                                <FormGroup>
                                                                    <Label><span style={{ color: "#ed3824" }}>Medium</span> Severity Bounty Reward</Label>
                                                                    <InputGroup>
                                                                    <Input value={asset.mediumSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="3" lg="3" sm="6">
                                                                <FormGroup>
                                                                    <Label><span style={{ color: "#8f0091" }}>High</span> Severity Bounty Reward</Label>
                                                                    <InputGroup>
                                                                    <Input value={asset.highSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="3" lg="3" sm="6">
                                                                <FormGroup>
                                                                    <Label><span style={{ color: "#b30211" }}>Critical</span> Severity Bounty Reward</Label>
                                                                    <InputGroup>
                                                                    <Input value={asset.criticalSeverity} className="form-control" type="text" placeholder="Average Cash($) Reward Price" aria-label="Average Cash($) Reward Price"/>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                );
                                            }) : null}
                                        </ListGroup>
                                    </TabPane>
                                    <TabPane tabId="listing-info">
                                        <h3 className="text-left blue-heavy-text">Related Hashtags/Tags</h3>
                                        {typeof hashtags !== "undefined" && hashtags.length > 0 ? hashtags.map((tag, index) => {
                                            return <Badge key={index} color="secondary">{tag.text}</Badge>;
                                        }) : null}
                                        <h3 style={{ paddingTop: "15px" }} className="text-left blue-heavy-text">Desired Skills</h3>
                                        <ListGroup>
                                        {typeof desiredSkills !== "undefined" && desiredSkills.length > 0 ? desiredSkills.map((skill, index) => {
                                            return <ListGroupItem key={index}>- {skill.label}</ListGroupItem>;
                                        }) : null}
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
