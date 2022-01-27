import React, { Component } from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import "./styles.css";
import { withRouter } from "react-router-dom";
import { Container, Progress, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink, Button, Badge, TabContent, TabPane, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connect } from "react-redux";
import _ from "lodash";
import Sheet from 'react-modal-sheet';
import moment from "moment";
import Calendar from 'react-calendar';
import { DateRange } from 'react-date-range';
import { authentication } from "../../../../../redux/actions/authentication/auth.js";
import { NotificationManager } from 'react-notifications';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

const MapFixed = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
});

class MainMapViewEmployerJobsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        projects: [{
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo velit, blandit et lobortis et, tristique et felis. Proin finibus pellentesque pellentesque. Ut vitae elementum neque",
            sites: "Themeforest, facebook.com, YouTube",
            badge: "Done",
            desc: "Vestibulum at condimentum eros, nec varius urna. Morbi mattis libero nec nulla bibendum sodales. Aenean consectetur sagittis iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras a mollis ex, sed porta felis.",
            progress: "65",
            like: 8,
            comment: 3,
            resolved: 18,
            issue: 50,
            customers_img1: "2.jpg",
            customers_img2: "2.png",
            customers_img3: "3.png",
            img: "2.jpg"
        }, {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo velit, blandit et lobortis et, tristique et felis. Proin finibus pellentesque pellentesque. Ut vitae elementum neque",
            sites: "Themeforest, facebook.com, YouTube",
            badge: "Active",
            desc: "Vestibulum at condimentum eros, nec varius urna. Morbi mattis libero nec nulla bibendum sodales. Aenean consectetur sagittis iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras a mollis ex, sed porta felis.",
            progress: "45",
            like: 55,
            comment: 31,
            resolved: 4,
            issue: 11,
            customers_img1: "2.jpg",
            customers_img2: "2.png",
            customers_img3: "3.png",
            img: "2.jpg"
        }, {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo velit, blandit et lobortis et, tristique et felis. Proin finibus pellentesque pellentesque. Ut vitae elementum neque",
            sites: "Themeforest, facebook.com, YouTube",
            badge: "Done",
            desc: "Vestibulum at condimentum eros, nec varius urna. Morbi mattis libero nec nulla bibendum sodales. Aenean consectetur sagittis iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras a mollis ex, sed porta felis.",
            progress: "90",
            like: 81,
            comment: 53,
            resolved: 88,
            issue: 20,
            customers_img1: "2.jpg",
            customers_img2: "2.png",
            customers_img3: "3.png",
            img: "2.jpg"
        }, {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo velit, blandit et lobortis et, tristique et felis. Proin finibus pellentesque pellentesque. Ut vitae elementum neque",
            sites: "Themeforest, facebook.com, YouTube",
            badge: "Active",
            desc: "Vestibulum at condimentum eros, nec varius urna. Morbi mattis libero nec nulla bibendum sodales. Aenean consectetur sagittis iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras a mollis ex, sed porta felis.",
            progress: "85",
            like: 18,
            comment: 93,
            resolved: 8,
            issue: 35,
            customers_img1: "2.jpg",
            customers_img2: "2.png",
            customers_img3: "3.png",
            img: "2.jpg"
        }, {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo velit, blandit et lobortis et, tristique et felis. Proin finibus pellentesque pellentesque. Ut vitae elementum neque",
            sites: "Themeforest, facebook.com, YouTube",
            badge: "Done",
            desc: "Vestibulum at condimentum eros, nec varius urna. Morbi mattis libero nec nulla bibendum sodales. Aenean consectetur sagittis iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras a mollis ex, sed porta felis.",
            progress: "100",
            like: 44,
            comment: 34,
            resolved: 15,
            issue: 33,
            customers_img1: "2.jpg",
            customers_img2: "2.png",
            customers_img3: "3.png",
            img: "2.jpg"
        }, {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo velit, blandit et lobortis et, tristique et felis. Proin finibus pellentesque pellentesque. Ut vitae elementum neque",
            sites: "Themeforest, facebook.com, YouTube",
            badge: "Active",
            desc: "Vestibulum at condimentum eros, nec varius urna. Morbi mattis libero nec nulla bibendum sodales. Aenean consectetur sagittis iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras a mollis ex, sed porta felis.",
            progress: "20",
            like: 14,
            comment: 31,
            resolved: 11,
            issue: 23,
            customers_img1: "2.jpg",
            customers_img2: "2.png",
            customers_img3: "3.png",
            img: "2.jpg"
        }],
        listings: [],
        isOpen: false,
        verticleTab: "1",
        individual: null,
        datesSelectable: [],
        map: null
    }
}
    handleRandomAction = (e) => {
        e.preventDefault();

        console.log("random action fired!");

        axios.post(`${process.env.REACT_APP_BASE_URL}/activate/random/test/action`, {
            
        }).then((res) => {
            if (res.data.message === "Success!") {
                console.log(res.data);
                // NotificationManager.success(`You've successfully completed the required verification process/flow, we are reviewing your information and will notify you when approved.`, 'Completed Verification Flow!', 4500);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        const { userData } = this.props;
        // check if geolocation is availiable...
        if ("geolocation" in navigator) {
            console.log("Available");
            // check if hacker account
            if (userData.accountType === "hackers") {
                navigator.geolocation.getCurrentPosition((position) => {
                    // latitude logging
                    console.log("Latitude is :", position.coords.latitude);
                    // longitiude logging
                    console.log("Longitude is :", position.coords.longitude);

                    const location = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    };

                    const { uniqueId } = userData;

                    axios.post(`${process.env.REACT_APP_BASE_URL}/save/user/geolocation`, {
                        accountType: "hackers",
                        location,
                        id: uniqueId
                    }).then((res) => {
                        if (res.data.message === "Successfully saved location data to account!") {
                            console.log(res.data);

                            const { user } = res.data;

                            console.log("user", user.value);

                            if (user.value !== null) {
                                authentication(user.value);

                                // NotificationManager.success(`We've successfully updated your location so you have a better tailored user experience with our location-based services.`, 'Updated your location!', 3500);
                            }

                            // NotificationManager.success(`We've successfully updated your location so you have a better tailored user experience with our location-based services.`, 'Updated your location!', 3500);
                        } else {
                            console.log("err", res.data);

                            NotificationManager.error(`We've encountered an error updating your current location for our location-based services...`, 'Error updating location!', 3500);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }, (error) => {
                    console.log("error gathering location - : ", error.message);

                    if (error.message === "User denied geolocation prompt") {

                        console.log("User denied geolocation prompt...");
                    }
                });
            }
        };

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/employer/listings/general`).then((res) => {
            if (res.data.message === "Gathered general employer listings!") {
                console.log(res.data);

                const { listings } = res.data;

                this.setState({
                    listings
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    calculateTokens = (tokenCount) => {
        // 35 maximum
        const result = Math.round(((tokenCount - 0) * 100) / (35 - 0));

        return result;
    }
    handleRedirectIndividualListing = (listing) => {
        console.log("listing passed: ", listing);

        this.props.history.push(`/view/individual/employer/listing/public/${listing.uniqueId}`, { listing });
    }
    handlePreviewPreperation = (listing) => {

        const newDatesArray = [];

        for (let index = 0; index < listing.testingDatesHackers.length; index++) {
            const selectedDate = listing.testingDatesHackers[index];
            
            const { startDate, endDate, key } = selectedDate;

            const newData = {
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                key
            }

            newDatesArray.push(newData);
        }

        this.setState({
            datesSelectable: newDatesArray,
            individual: listing,
            isOpen: true
        })
    }
    onLoadMap = (map) => {
        map.resize();
    }
    render() {
        const { individual, listings, verticleTab, datesSelectable } = this.state;
        return (
            <div>
                {individual !== null ? <Sheet isOpen={this.state.isOpen} onClose={() => {
                    this.setState({
                        isOpen: false
                    })
                }}>
                    <Sheet.Container>
                    <Sheet.Header>
                        <div className="centered-menu-icon">
                            <img id="menu-icon-custom" src={require("../../../../../assets/icons/horizontal-bar.png")}/>
                        </div>
                        <div className="header-space-edges">
                            <Button onClick={() => {
                                this.setState({
                                    isOpen: false
                                }, () => {
                                    this.handleRedirectIndividualListing(individual);
                                })
                            }} style={{ width: "100%" }} color="secondary">Redirect/Visit Employer Listing</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                    <Card>
                        <CardHeader>
                            <h5>{individual.publicCompanyName}'s Listing Core/Basic Information</h5>
                        </CardHeader>
                        <CardBody>
                            <Row>
                            <Col sm="3" xs="12">
                                <Nav className="nav flex-column nav-pills">
                                <NavItem>
                                    <NavLink className={verticleTab === '1' ? 'active' : ''} onClick={() => {
                                        this.setState({
                                            verticleTab: "1"
                                        })
                                    }}>Core Data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={verticleTab === '2' ? 'active' : ''} onClick={() => {
                                        this.setState({
                                            verticleTab: "2"
                                        }, () => {
                                            this.onLoadMap(this.state.map);
                                        })
                                    }}>Tags, Skills & Location</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={verticleTab === '3' ? 'active' : ''} onClick={() => {
                                        this.setState({
                                            verticleTab: "3"
                                        })
                                    }}>Description Preview</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={verticleTab === '4' ? 'active' : ''} onClick={() => {
                                        this.setState({
                                            verticleTab: "4"
                                        })
                                    }}>Listing Expiration Date + Testing Dates</NavLink>
                                </NavItem>
                                </Nav>
                            </Col>
                            <Col sm="9" xs="12">
                                <TabContent activeTab={verticleTab}>
                                <TabPane className="fade show" tabId="1">
                                    <Col sm="12" xs="12">
                                        <Card>
                                            <CardHeader className="b-l-primary border-3">
                                                <h5>Core Data</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Experience (EXP) Rewarded To Winner</h5>
                                                    </div>
                                                    <hr />
                                                    <p className="lead heavy-blue-lead">{individual.experienceAndCost.experience} XP (experience points)</p>
                                                </ListGroupItem>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1"><em style={{ fontWeight: "400" }}>Maximum</em> Number Of Required Hackers</h5>
                                                    </div>
                                                    <hr />
                                                    <p className="lead heavy-blue-lead">{individual.maxNumberOfApplicants.value} Applicants</p>
                                                </ListGroupItem>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Listing Active Since...</h5>
                                                    </div>
                                                    <hr />
                                                    <p className="lead heavy-blue-lead">{moment(individual.systemDate).fromNow()} or {individual.postedDate}</p>
                                                </ListGroupItem>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Tokens Required To Apply</h5>
                                                    </div>
                                                    <hr />
                                                    <p className="lead heavy-blue-lead">{individual.tokensRequiredToApply.value} Tokens</p>
                                                </ListGroupItem>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Preferred/Required Rank (level) To Apply</h5>
                                                    </div>
                                                    <hr />
                                                    <p className="lead heavy-blue-lead">{individual.requiredRankToApply.value} Tokens</p>
                                                </ListGroupItem>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Col sm="12" xs="12">
                                        <Card>
                                            <CardHeader className="b-l-primary border-3">
                                                <h5>Tags, Skills & Location</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Desired/Preferred Skills</h5>
                                                    </div>
                                                    <hr />
                                                    {typeof individual.desiredSkills !== "undefined" && individual.desiredSkills.length > 0 ? individual.desiredSkills.map((skill, iiiii) => {
                                                        return <Badge style={{ fontSize: "12.5px", marginTop: "6px" }} key={iiiii} color="primary">{skill.label}</Badge>;
                                                    }) : null}
                                                </ListGroupItem>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Hashtags/Tags</h5>
                                                    </div>
                                                    <hr />
                                                    {typeof individual.hashtags !== "undefined" && individual.hashtags.length > 0 ? individual.hashtags.map((hash, iiiii) => {
                                                        return <Badge style={{ fontSize: "12.5px", marginTop: "6px" }} key={iiiii} color="primary">{hash.text}</Badge>;
                                                    }) : null}
                                                </ListGroupItem>
                                                <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Business Location</h5>
                                                    </div>
                                                    <hr />
                                                    <MapFixed
                                                        style="mapbox://styles/mapbox/streets-v9"
                                                        className="stretched-map"
                                                        onStyleLoad={(map) => {
                                                            this.setState({
                                                                map
                                                            })
                                                        }}
                                                        attributionControl={false}
                                                        zoom={[10]}
                                                        center={[individual.businessAddress.position.lon, individual.businessAddress.position.lat]}
                                                    >
                                                        <Marker
                                                            style={{ maxWidth: "45px", maxHeight: "45px" }}
                                                            coordinates={[individual.businessAddress.position.lon, individual.businessAddress.position.lat]}
                                                            anchor="bottom">
                                                            <img src={require("../../../../../assets/images/location.png")}/>
                                                        </Marker>
                                                    </MapFixed>
                                                </ListGroupItem>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Col sm="12" xs="12">
                                        <Card>
                                            <CardHeader className="b-l-primary border-3">
                                                <h5>Listing Description Preview</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <div id="scroller-details-preview">
                                                    <ReactMarkdown children={individual.listingDescription} remarkPlugins={[remarkGfm]} />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="4">
                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Expected Completion Date</h5>
                                        </div>
                                        <hr />
                                        <Calendar
                                            value={new Date(individual.estimatedCompletionDate)}
                                        />
                                    </ListGroupItem>
                                    <ListGroupItem className="list-group-item-action flex-column align-items-start" >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Available Testing Dates</h5>
                                        </div>
                                        <p style={{ paddingTop: "7.5px" }}>~ * These are the available selectable dates for selected hackers to choose from after the gig initialization * ~</p>
                                        <hr />
                                        <DateRange 
                                            showDateDisplay={false}
                                            onChange={() => {}}
                                            ranges={datesSelectable}
                                        />
                                    </ListGroupItem>
                                </TabPane>
                                </TabContent>
                            </Col>
                            </Row>
                        </CardBody>
                        </Card>
                    </Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop />
                </Sheet> : null}
                <Container fluid={true}>
                    {/* <Row>
                        <Col md="12" lg="12" xl="12" sm="12">
                            <Button onClick={this.handleRandomAction} style={{ width: "100%" }} color="secondary">Fire Random Action</Button>
                        </Col>
                    </Row> */}
                    <Row style={{ paddingTop: "10px" }}>
                        <Col md="6" lg="6" sm="12">
                            <Map
                                style="mapbox://styles/mapbox/streets-v9"
                                containerStyle={{
                                    height: '100vh',
                                    width: '100%'
                                }}
                                center={_.has(this.props.userData, "userLatestLocation") ? [this.props.userData.userLatestLocation.longitude, this.props.userData.userLatestLocation.latitude] : [104.9903, 39.7392]}
                            >
                                {_.has(this.props.userData, "userLatestLocation") ? <Marker
                                    style={{ maxWidth: "45px", maxHeight: "45px" }}
                                    coordinates={[this.props.userData.userLatestLocation.longitude, this.props.userData.userLatestLocation.latitude]}
                                    anchor="bottom">
                                    <img src={require("../../../../../assets/icons/location.png")}/>
                                </Marker> : null}
                                {typeof listings !== "undefined" && listings.length > 0 ? listings.map((listing, i) => {
                                    if (["physical-hack", "both-assets"].indexOf(listing.typeOfHack.value) > -1) {
                                        return (
                                            <Marker
                                                onClick={() => {
                                                    console.log("marker clicked!");

                                                    this.handlePreviewPreperation(listing);
                                                }}
                                                key={i}
                                                style={{ maxWidth: "45px", maxHeight: "45px" }}
                                                coordinates={[listing.businessAddress.position.lon, listing.businessAddress.position.lat]}
                                                anchor="bottom">
                                                <img src={require("../../../../../assets/icons/listing-location.png")}/>
                                            </Marker>
                                        );
                                    }
                                }) : null}
                            </Map>
                        </Col>
                        <Col md="6" lg="6" sm="12">
                            <div className="wraprow-items">
                                {typeof listings !== "undefined" && listings.length > 0 ? listings.map((item, i) =>
                                    <div key={i} className="project-box custom-project-box">
                                        {/* <span className={`badge ${item.badge === "Done" ? 'badge-success' : 'badge-primary'}`}>{item.badge}</span> */}
                                        <h6>{item.publicCompanyName}</h6>
                                        <div className="media">
                                        <img className="img-20 mr-1 rounded-circle" src={require(`../../../../../assets/images/user/2.jpg`)} alt="" />
                                        {/* <div className="media-body custom-media-body">
                                            {typeof item.hashtags !== "undefined" && item.hashtags.length > 0 ? item.hashtags.map((tag, iii) => {
                                                return <Badge key={iii} color="primary">{tag.text}</Badge>;
                                            }) : null}
                                        </div> */}
                                        </div>
                                        <div id="scroller-details">
                                            <ReactMarkdown children={item.listingDescription} remarkPlugins={[remarkGfm]} />
                                        </div>
                                        <div className="controlled-horizontal-box">
                                            <p className="lead heavy-blue-lead">Related Hashtags</p>
                                            <Col className="media-custom" md="12" lg="12" sx="12" sm="12">
                                                <Row className="custom-row">
                                                    {typeof item.hashtags !== "undefined" && item.hashtags.length > 0 ? item.hashtags.map((tag, iii) => {
                                                        return <Badge className="inline-element" key={iii} color="primary">{tag.text}</Badge>;
                                                    }) : null}
                                                </Row>
                                            </Col>
                                        </div>
                                        <Row className="details">
                                        
                                        <Col xs="6"><span>Applicants</span></Col>
                                        <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.applicants.length}</Col>
                                        <Col xs="6"> <span>Interviewing</span></Col>
                                        <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{0}</Col>
                                        <Col xs="6"><span>Hackers Required</span></Col>
                                        <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.maxNumberOfApplicants.value}</Col>
                                        </Row>
                                        <div className="customers">
                                        <ul>
                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/2.jpg`)} alt="" /></li>
                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/2.jpg`)} alt="" /></li>
                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/3.jpg`)} alt="" /></li>
                                            <li className="d-inline-block ml-2">
                                            <p className="f-12">{`+${Math.floor(Math.random() * 30) + 1} More`}</p>
                                            </li>
                                        </ul>
                                        </div>
                                        <div className="project-status mt-4">
                                        <div className="media mb-0">
                                            <p>{this.calculateTokens(item.tokensRequiredToApply.value)}% </p>
                                            <div className="media-body text-right"><span>Cost to apply VS maximum (tokens)</span></div>
                                        </div>
                                        {/* {item.progress === "100" ?
                                            <Progress className="sm-progress-bar" color="success" value={item.progress} style={{ height: "5px" }} />
                                            :
                                            <Progress className="sm-progress-bar" striped color="primary" value={this.calculateTokens(item.tokensRequiredToApply.value)} style={{ height: "5px" }} />
                                        } */}
                                        <Progress className="sm-progress-bar" striped color="primary" value={this.calculateTokens(item.tokensRequiredToApply.value)} style={{ height: "5px" }} />
                                        </div>
                                        <div className="centered-button-div">
                                            <Button onClick={() => {
                                                this.handleRedirectIndividualListing(item);
                                            }} style={{ width: "100%" }} className="btn-pill btn-air-secondary" color="secondary">View/Visit Listing</Button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: "17.5px" }}>
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { authentication })(withRouter(MainMapViewEmployerJobsHelper));
