import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, Container, CardBody, Button } from 'reactstrap';
import moment from "moment";
import helpers from "./followingRelated/following/helpers.js";
import _ from "lodash";
import { useHistory } from "react-router-dom";


const { renderProfilePicVideo } = helpers;

const FollowingEmployerAccountHelper = ({ employerData }) => {

    const history = useHistory();

    const [ cards, setCards ] = useState([]);


    const redirectToProfile = (element) => {
        console.log("redirectToHackersProfile ran...");
    
        if (element.followingAccountType === "hackers") {
            history.push(`/hacker/profile/individual/view/${element.followingID}`);
        } else {
            history.push(`/employer/individual/profile/main/${element.followingID}`);
        }
    }

    useEffect(() => {
        setCards([...employerData.followingHackers, ...employerData.followingCompanies]);
    }, [])

    console.log("cards", cards);

    console.log("UUUUSSEERRRRR", employerData);

    return (
        <Fragment>
            <Row>
                <Container fluid={true}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className='shadow'>
                                <CardHeader className='b-l-primary b-r-primary'>
                                    <h3 className='text-left'>These are the people that this user is 'following' & actively keeping-up-with!</h3>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        {cards.map((element, i) => {
                                            if (element.followingAccountType === "hackers") {
                                                return (
                                                    <Card key={i} className='shadow outtercardfollowing col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                                                        <figure className="col-xl-12 col-lg-12 col-md-12 col-sm-12"><a href={null} data-size="1600x950">
                                                            {renderProfilePicVideo(element.latestProfilePicVideo)}
                                                            <div className="caption">
                                                                <h4>{element.followingFullName}</h4>
                                                                <p>Account Type: {element.followingAccountType}</p>
                                                                <p>Job Title: {element.followingJobTitle !== "undefined" && element.followingJobTitle !== null ? element.followingJobTitle : "Not Provided.."}</p>
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
                                                                <h4>{element.followingFullName}</h4>
                                                                <p>Account Type: {element.followingAccountType}</p>
                                                                <p>Job Title: {element.followingJobTitle !== "undefined" && element.followingJobTitle !== null ? element.followingJobTitle : "Not Provided.."}</p>
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

export default FollowingEmployerAccountHelper;