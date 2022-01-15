import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import LearningFilterStreamingLiveHelper from './helpers/filter/index.js';
import { useHistory } from 'react-router-dom';
import { Container,Row, Col, Card, Media} from 'reactstrap';
import axios from 'axios';
import "./styles.css";

const ViewAllLiveStreamsMainHelper = (props) => {
 
    const history = useHistory();

    const [ learningData, setLearningData ] = useState([{
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }, {
        date: "15 April 2019",
        writer: "Admin",
        hits: Math.floor(Math.random() * 100) + 1,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }])

    const clickApply = () => {
        history.push("/");
    };

    return (
        <Fragment>
            <Breadcrumb parent="Live-Streams" title="Live ALL Live Streams (All Categories...)"/>
            <Container fluid={true}>
                <Row>
                    <Col xl="9 xl-60">
                        <Row>
                            {learningData.map((data, i) => {
                                return (
                                    <Col xl="4 xl-50 box-col-6" sm="6" key={i}>
                                        <Card>
                                            <div className="blog-box blog-grid text-center product-box">
                                                <div className="product-img">
                                                    <Media className="img-fluid top-radius-blog" src={require("../../../../../assets/images/placeholder.png")} alt="" />
                                                    <div className="product-hover">
                                                        <ul>
                                                            <li><i className="icon-link" onClick={() => clickApply()}></i></li>
                                                            <li><i className="icon-import"></i></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="blog-details-main">
                                                    <ul className="blog-social">
                                                        <li className="digits">{data.date}</li>
                                                        <li className="digits">{"by"}: {data.writer}</li>
                                                        <li className="digits">{data.hits} {"Hits"}</li>
                                                    </ul>
                                                    <hr />
                                                    <h6 className="blog-bottom-details">{data.short_description}</h6>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    <LearningFilterStreamingLiveHelper />
                </Row>
                </Container>
        </Fragment>
    );
};

export default ViewAllLiveStreamsMainHelper;