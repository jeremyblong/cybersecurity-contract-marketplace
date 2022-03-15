import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { connect } from "twilio-video";
import axios from 'axios';
import { connect as reduxConnect } from "react-redux";

const CreateVideoChatEmployerHelper = ({ userData }) => {

    const [ room, setRoom ] = useState(null);

    const joinRoom = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/generate/twilio/access/token`, {
                params: {
                    uniqueId: userData.uniqueId,
                    accountType: userData.accountType
                }
            });
            const data = await response.json();
            const room = await connect(data.accessToken, {
                name: 'cool-room',
                audio: true,
                video: true
            });
        
            setRoom(room);
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <Fragment>
            <Breadcrumb parent="Invite Hacker(s) To Video Interview With You!" title="Find, Select & Invite Anyone On Our Platform.." /> 
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="12" xl="12" md="12">
                        <Card>
                            <CardHeader className="b-l-secondary b-r-secondary">
                                <h2 className="upload-video-header">Initialize a video chat with ANY hacker on our platform (whether you've previously communicated or not!)</h2>
                                <p className="lead">We <strong style={{ color: "#f73164" }}>HIGHLY SUGGEST</strong> video interviewing <strong style={{ color: "#f73164" }}>any</strong> potential candiates for a contracted gig and/or hacking job, <strong style={{ color: "#f73164" }}>ESPECIALLY</strong> if testing <strong>physical infrastructure</strong> and other related on-site security.</p>
                            </CardHeader>
                            <CardBody className='b-l-success b-r-success'>
                                <Row>
                                    
                                </Row>
                            </CardBody>
                            <CardFooter className='b-l-secondary b-r-secondary'>

                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default reduxConnect(mapStateToProps, {})(CreateVideoChatEmployerHelper);