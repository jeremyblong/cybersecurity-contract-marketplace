import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import "./styles.css";
import {Issues,Resolved,Comment,Done} from '../../../../../constant';
import { Container, Row, Col, Progress, Button } from 'reactstrap';
import axios from "axios";

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
        }]
    }
}
    render() {
        const Map = ReactMapboxGl({
            accessToken: process.env.REACT_APP_MAPBOX_TOKEN
        });
        const { projects } = this.state;
        return (
            <div>
                <Container fluid={true}>
                    <Row style={{ paddingTop: "10px" }}>
                        <Col md="6" lg="6" sm="12">
                            <Map
                                style="mapbox://styles/mapbox/streets-v9"
                                containerStyle={{
                                    height: '100vh',
                                    width: '100%'
                                }}
                            >
                                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                                </Layer>
                            </Map>
                        </Col>
                        <Col md="6" lg="6" sm="12">
                            <div className="wraprow-items">
                                {projects.map((item, i) =>
                                    <div className="project-box custom-project-box">
                                        {/* <span className={`badge ${item.badge === "Done" ? 'badge-success' : 'badge-primary'}`}>{item.badge}</span> */}
                                        <h6>{item.title}</h6>
                                        <div className="media">
                                        <img className="img-20 mr-1 rounded-circle" src={require(`../../../../../assets/images/user/${item.img}`)} alt="" />
                                        <div className="media-body">
                                            <p>{item.sites}</p>
                                        </div>
                                        </div>
                                        <p>{item.desc}</p>
                                        <Row className="details">
                                        <Col xs="6"><span>{Issues}</span></Col>
                                        <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.issue}</Col>
                                        <Col xs="6"> <span>{Resolved}</span></Col>
                                        <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.resolved}</Col>
                                        <Col xs="6"><span>{Comment}</span></Col>
                                        <Col xs="6" className={item.badge === "Done" ? 'text-success' : 'text-primary'}>{item.comment}</Col>
                                        </Row>
                                        <div className="customers">
                                        <ul>
                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/${item.customers_img1}`)} alt="" /></li>
                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/${item.customers_img2}`)} alt="" /></li>
                                            <li className="d-inline-block"><img className="img-30 rounded-circle" src={require(`../../../../../assets/images/user/${item.customers_img3}`)} alt="" /></li>
                                            <li className="d-inline-block ml-2">
                                            <p className="f-12">{`+${item.like} More`}</p>
                                            </li>
                                        </ul>
                                        </div>
                                        <div className="project-status mt-4">
                                        <div className="media mb-0">
                                            <p>{item.progress}% </p>
                                            <div className="media-body text-right"><span>{Done}</span></div>
                                        </div>
                                        {item.progress === "100" ?
                                            <Progress className="sm-progress-bar" color="success" value={item.progress} style={{ height: "5px" }} />
                                            :
                                            <Progress className="sm-progress-bar" striped color="primary" value={item.progress} style={{ height: "5px" }} />
                                        }

                                        </div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MainMapViewEmployerJobsHelper;
