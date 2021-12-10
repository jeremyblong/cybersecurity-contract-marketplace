import React, { Fragment,Component } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, CardFooter, Media } from 'reactstrap';
import HackerDirectoryFilterOptions from "./helpers/filter/filterResults.js";
import axios from 'axios';
import moment from "moment";
import _ from "lodash";
import "./styles.css";
import ReactPlayer from 'react-player';

class MainHackerDirectoryDisplayHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        hackers: [{
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Designer",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Developer",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Software Engineer",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Product Manager",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Manager",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Designer",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Designer",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "Agent",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }, {
            follower: Math.floor(Math.random() * 9000) + 1,
            following: Math.floor(Math.random() * 9000) + 1,
            name: "John Doe",
            post: "CEO/Founder",
            totalPost: Math.floor(Math.random() * 9000) + 1
        }]
    }
}
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hackers/random/general`).then((res) => {
            if (res.data.message === "Successfully gathered hackers!") {
                console.log(res.data);

                const { hackers } = res.data;

                this.setState({
                    hackers
                })
            } else {
               console.log("err", res.data); 
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderProfilePicVideo = (picOrVideos) => {
        console.log("picOrVideos", picOrVideos);

        const last = picOrVideos[picOrVideos.length - 1];

        if (last.type === "image/jpeg" || last.type === "image/jpg" || last.type === "image/png") {
            return <Media body className="rounded-circle" src={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} alt="profile-picture-hacker" />;
        } else {
            return <ReactPlayer className="rounded-circle" url={`${process.env.REACT_APP_ASSET_LINK}/${last.link}`} />;
        }
    }
    render () {
        const { hackers } = this.state;
        return (
            <Fragment>
            <Breadcrumb parent="Users" title="Hacker Directory/Filter Options" />
            <Container fluid={true}>
                <Row>
                    <HackerDirectoryFilterOptions props={this.props} />
                    <Col md="8" lg="8" xl="8" sm="12">
                        <Row>
                            {hackers.map((hacker, i) => 
                                <Col md="6" lg="6" xl="6" className="box-col-6" key={i}>
                                    <Card className="custom-card">
                                    <CardHeader>
                                        <Media body className="img-fluid" src={require(`../../../../../assets/images/other-images/img-cropper.jpg`)} alt="" />
                                    </CardHeader>
                                    <div className="card-profile">
                                        {_.has(hacker, "profilePicsVideos") && hacker.profilePicsVideos.length > 0 ? this.renderProfilePicVideo(hacker.profilePicsVideos) : <Media body className="rounded-circle" src={require(`../../../../../assets/images/avtar/4.jpg`)} alt="profile-picture-hacker" />}
                                    </div>
                                    <ul className="card-social card-social-custom-edit">
                                        <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                        <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                        <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                    </ul>
                                    <div id="override-custom-card" className="text-center profile-details">
                                        <h4>{`${hacker.firstName} ${hacker.lastName}`}</h4>
                                        <h6>{hacker.aboutMe}</h6>
                                        <p style={{ paddingBottom: "20px" }}>Registered {moment(hacker.registrationDate).fromNow()}</p>
                                    </div>
                                    <CardFooter className="row">
                                        <Col sm="4 col-4">
                                        <h6>Completed Gigs/Jobs</h6>
                                        <h3 className="counter">{hacker.completedJobs}</h3>
                                        </Col>
                                        <Col sm="4 col-4">
                                        <h6>Rank/Level</h6>
                                        <h3><span className="counter">{hacker.rankLevel}</span></h3>
                                        </Col>
                                        <Col sm="4 col-4">
                                        <h6>Verified Account</h6>
                                        <h3><span className="counter">{hacker.identityVerified === true ? "Fully-verified" : "Un-verified"}</span></h3>
                                        </Col>
                                    </CardFooter>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
            </Fragment>
        );
    }
}

export default MainHackerDirectoryDisplayHelper;
