import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardFooter, Media } from 'reactstrap';
import axios from 'axios'
import { Follower, Following, TotalPost } from '../../../../../../constant'


const FriendsTabEmployerProfileHelper = () => {

    const [cards,setCards] = useState([])

    return (
        <Fragment>
            <Row>
                {cards.map((cardItem, i) => 
                <Col md="6" xl="4 box-col-6 xl-50" key={i}>
                    <Card className="custom-card">
                        <CardHeader>
                            <Media body className="img-fluid" src={require(`../../../../../../assets/images/placeholder.png`)} alt="" />
                        </CardHeader>
                        <div className="card-profile">
                            <Media body className="rounded-circle" src={require(`../../../../../../assets/images/placeholder.png`)} alt="" />
                        </div>
                        <ul className="card-social">
                            <li><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                        </ul>
                        <div className="text-center profile-details">
                            <h4>{cardItem.name}</h4>
                            <h6>{cardItem.post}</h6>
                        </div>
                        <CardFooter className="row">
                            <Col sm="4 col-4">
                            <h6>{Follower}</h6>
                            <h3 className="counter">{cardItem.follower}</h3>
                            </Col>
                            <Col sm="4 col-4">
                            <h6>{Following}</h6>
                            <h3><span className="counter">{cardItem.following}</span>K</h3>
                            </Col>
                            <Col sm="4 col-4">
                            <h6>{TotalPost}</h6>
                            <h3><span className="counter">{cardItem.totalPost}</span>M</h3>
                            </Col>
                        </CardFooter>
                    </Card>
                </Col>
                )}
            </Row>
        </Fragment>
    );
};

export default FriendsTabEmployerProfileHelper;