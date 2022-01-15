import React, { Fragment, useState,useEffect } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input } from 'reactstrap'
import { Database, Grid, Upload, PlusSquare, Code } from 'react-feather';
import { PricingPlan, TrialVersion, FREE, Selected, Premium, ContactUs, Storage, AddNew } from '../../../../../constant';
import axios from "axios";
import "./styles.css";


const CreateNewLiveStreamAsHackerHelper = (props) => {
    // initialize state obj's
    const [searchTerm, setSearchTerm] = useState("");
    const [myfile, setMyFile] = useState([])

    useEffect(() => {
        // component mounted
    },[])

    const handleChange = event => {
        event.preventDefault();
        setSearchTerm(event.target.value)
    };

    // eslint-disable-next-line
    const filelist = myfile.filter((data) => {
        if(searchTerm == null)
            return data
        else if(data.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return data
        }
        }).map((data,i)=>{
        return(
            <li className="file-box" key={i}>
            <div className="file-top"><i className={data.icon} ></i><i className="fa fa-ellipsis-v f-14 ellips"></i></div>
            <div className="file-bottom">
                <h6>{data.name} </h6>
                <p className="mb-1">{data.size}</p>
                <p> <b>{"last open"} : </b>{data.modify}</p>
            </div>
            </li>
        )
        })

    return (
        <Fragment>
        <Breadcrumb parent="Live streaming creation" title="Create a new 'live hacking-stream' now!" />
        <Container fluid={true}>
            <Row>
            <Col xl="3" className="box-col-6 pr-0 file-spacing">
                <div className="file-sidebar">
                <Card>
                    <CardBody>
                    <h6 className="mb-3">Select a category of your live hacking stream before being able to start your stream & go public!</h6>
                    <ul>
                        <li>
                        <div className="btn btn-primary"><Code /> API-Endpoint Testing/Hacking</div>
                        </li>
                        <li>
                        <div className="btn btn-light"><Code /> Malware</div>
                        </li>
                        <li>
                        <div className="btn btn-light"><Code /> Phishing</div>
                        </li>
                        <li>
                        <div className="btn btn-light"><Code /> SQL-Injection Attack</div>
                        </li>
                        <li>
                        <div className="btn btn-light"><Code /> Cross-Site Scripting (XSS)</div>
                        </li>
                        <li>
                        <div className="btn btn-light"><Code /> Denial-of-Service (DoS)</div>
                        </li>
                        <li>
                            <div className="btn btn-light"><Code /> Session Hijacking / Man-in-middle</div>
                        </li>
                        <li>
                            <div className="btn btn-light"><Code /> Credential Reuse</div>
                        </li>
                    </ul>
                    <hr />
                    <ul>
                        <li>
                        <div className="btn btn-outline-primary"><Database />{Storage}</div>
                        <div className="m-t-15">
                            <div className="progress sm-progress-bar mb-1">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p>{"25 GB of 100 GB used"}</p>
                        </div>
                        </li>
                    </ul>
                    <hr />
                    <ul>
                        <li>
                        <div className="btn btn-outline-primary"><Grid />{PricingPlan}</div>
                        </li>
                        <li>
                        <div className="pricing-plan">
                            <h6>Trial "Tier-Hacker" Account </h6>
                            <h5>FREE (limited-time)</h5>
                            <p>{"Signup for our FREE 'tier-hacker' account which is basically a super-bonus version of a regular account. This includes many restricted features/functionality and give's you a better stance on our platform."}</p>
                            <div className="btn btn-outline-success btn-md">{"Already a member"}</div>
                            <img className="bg-img" src={require("../../../../../assets/images/dashboard/folder.png")} alt="" />
                        </div>
                        </li>
                        <li>
                        <div className="pricing-plan">
                            <h6>Premium Live Streaming</h6>
                            <h5>{"$25/month"}</h5>
                            <p> {"Placed on homepage at top of list and shown BEFORE all other listings that're NOT boosted/promoted as well..."}</p>
                            <div className="btn btn-outline-primary btn-md">Upgrade Now!</div>
                            <img className="bg-img" src={require("../../../../../assets/images/dashboard/folder1.png")} alt="" />
                        </div>
                        </li>
                    </ul>
                    </CardBody>
                </Card>
                </div>
            </Col>
            <Col xl="9" md="12" className="box-col-12">
                <div className="file-content">
                <Card>
                    <CardHeader>
                    <div className="media">
                        <Form className="form-inline">
                        <FormGroup>
                            <i className="fa fa-search"></i>
                            <Input
                            className="form-control-plaintext"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleChange(e)}
                            placeholder="Search..." />
                        </FormGroup>
                        </Form>
                        <div className="media-body text-right">
                        <Form className="d-inline-flex">
                            <div className="btn btn-primary" onClick={null}> <PlusSquare />{AddNew}</div>
                            <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
                            <input id="upfile" multiple type="file" onChange={(e) => {
                                //   file change/upload
                            }} />
                            </div>

                        </Form>
                        <div className="btn btn-outline-primary ml-1" onClick={null}><Upload />{"Upload"}</div>
                        </div>
                    </div>
                    </CardHeader>
                    <CardBody className="custom-cardbody-streaming-start">
                        <h4 className="mb-3">Upload/start a new LIVE stream (live streams of live hack's)</h4>
                        <h6>Start a stream of a LIVE <strong>AUTHORIZED</strong> hack (digital asset's <strong>ONLY</strong>) and <strong>EARN MONEY</strong> via "Gifts", "Kudo's" and other various incentives/prizes while hacking away! You'll earn more money if you have more followers/viewers so try to grow your audience!</h6>
                        <hr />
                        <video className={"streaming-video-wrapper"} controls muted>
                            <source className={"streaming-video"} src="" type="video/mp4"></source>
                        </video>
                    </CardBody>
                </Card>
                </div>

            </Col>
            </Row>
        </Container>

        </Fragment>
    );
}

export default CreateNewLiveStreamAsHackerHelper;