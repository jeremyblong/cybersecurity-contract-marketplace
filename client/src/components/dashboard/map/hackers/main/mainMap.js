import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import "./styles.css";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Progress, Button, Badge } from 'reactstrap';
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connect } from "react-redux";
import _ from "lodash";
import Sheet from 'react-modal-sheet';


const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
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
        isOpen: false
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
    render() {
        const { projects, listings } = this.state;

        return (
            <div>
                <Sheet isOpen={this.state.isOpen} onClose={() => {
                    this.setState({
                        isOpen: false
                    })
                }}>
                    <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <p className="lead">Some random shit!</p>
                    </Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop />
                </Sheet>
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
                                    if (listing.typeOfHack.value === "physical-hack") {
                                        return (
                                            <Marker
                                                onClick={() => {
                                                    console.log("marker clicked!");

                                                    this.setState({
                                                        isOpen: true
                                                    })
                                                }}
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
export default connect(mapStateToProps, { })(withRouter(MainMapViewEmployerJobsHelper));
