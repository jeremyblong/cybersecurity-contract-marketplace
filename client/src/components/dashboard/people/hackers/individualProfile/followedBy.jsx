import React, { Fragment ,useState,useEffect } from 'react';
import { Row, Col, Card, CardHeader, Container, CardBody, Button } from 'reactstrap';
import moment from "moment";
import helpers from "./helpers/followingRelated/following/helpers.js";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import "./styles.css";

const { renderProfilePicVideo } = helpers;

const FollowedByHackerAccountHelper = ({ user }) => {

    const [ data, setData ] = useState([]);

    const history = useHistory();

    const redirectToProfile = (element) => {
        console.log("redirectToHackersProfile ran...");
    
        if (element.followerAccountType === "hackers") {
            history.push(`/hacker/profile/individual/view/${element.followerID}`);
        } else {
            history.push(`/employer/individual/profile/main/${element.followerID}`);
        }
    }

    useEffect(() => {
        setData([...user.currentlyFollowedBy]);
    }, [])

    console.log("dataaaaaaaa :: ---- ", data);

    console.log("UUUUSSEERRRRR", user);
    
    return (
        <Fragment>
            <Row>
                <Container fluid={true}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className='shadow'>
                                <CardHeader className='b-l-primary b-r-primary'>
                                    <h3 className='text-left'>These are the people that this user is 'followed-by', these user's are actively 'following' this account!</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        {data.map((element, i) => {
                                            if (element.followerAccountType === "hackers") {
                                                return (
                                                    <Card key={i} className='shadow outtercardfollowing col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                                                        <figure className="col-xl-12 col-lg-12 col-md-12 col-sm-12"><a href={null} data-size="1600x950">
                                                            {renderProfilePicVideo(element.latestProfilePicVideo)}
                                                            <div className="caption">
                                                                <h4>{element.followerFullName}</h4>
                                                                <p>Account Type: {element.followerAccountType}</p>
                                                                <p>Job Title: {element.followerJobTitle !== "undefined" && element.followerJobTitle !== null ? element.followerJobTitle : "Not Provided.."}</p>
                                                                <p>Started Following: {moment(element.date).fromNow()}</p>
                                                            </div></a>
                                                            <Button className='btn-square-primary push-bottom-button-profile' color={"primary-2x"} outline style={{ width: "100%" }} onClick={() => redirectToProfile(element)}>Redirect To Profile</Button>
                                                        </figure>
                                                    </Card>
                                                );
                                            } else {
                                                return (
                                                    <Card key={i} className='shadow outtercardfollowing col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                                                        <figure className="col-xl-12 col-lg-12 col-md-12 col-sm-12"><a href={null} data-size="1600x950">
                                                            {renderProfilePicVideo(element.latestProfilePicVideo)}
                                                            <div className="caption">
                                                                <h4>{element.followerFullName}</h4>
                                                                <p>Account Type: {element.followerAccountType}</p>
                                                                <p>Job Title: {element.followerJobTitle !== "undefined" && element.followerJobTitle !== null ? element.followerJobTitle : "Not Provided.."}</p>
                                                                <p>Started Following: {moment(element.date).fromNow()}</p>
                                                            </div></a>
                                                            <Button className='btn-square-primary push-bottom-button-profile' color={"primary-2x"} outline style={{ width: "100%" }} onClick={() => redirectToProfile(element)}>Redirect To Profile</Button>
                                                        </figure>
                                                    </Card>
                                                );
                                            }
                                        })}
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Fragment>
    );
};

export default FollowedByHackerAccountHelper;