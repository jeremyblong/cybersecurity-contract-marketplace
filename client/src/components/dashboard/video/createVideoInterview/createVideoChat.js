import React, { Fragment, useState, useEffect, useRef } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import Breadcrumb from '../../../../layout/breadcrumb';
import { connect as reduxConnect } from "react-redux";
import { useParams } from 'react-router-dom';
import * as Video from 'twilio-video';
import axios from "axios";
import Participant from "./participant/participant.js";
import { connect as twilioConnect } from "twilio-video";
import uuid from "react-uuid";


const CreateVideoChatEmployerHelper = ({ userData }) => {

    const { id } = useParams();

    const [ user, setUser ] = useState(null);
    const [ videocall, setVideoCallData ] = useState(null);
    const [ videoTracks, setVideoTracks ] = useState([]);
    const [ audioTracks, setAudioTracks ] = useState([]);
    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);
  
    // Create refs for the HTML elements to attach audio and video to in the DOM
    // For now, set them to null
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const joinRoomVideoChat = async () => {
        try {

            // const generatedRoomID = uuid();

            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/generate/twilio/access/token`, {
                params: {
                    uniqueId: userData.uniqueId,
                    accountType: userData.accountType,
                    generatedRoomID: videocall.roomName
                }
            });
            if (response) {
                console.log("response", response);

                const { data } = response;

                const room = await twilioConnect(data.token, {
                    name: videocall.roomName,
                    audio: true,
                    video: true
                });
                setRoom(room);
                // if (room) {
                //     history.push(`/start/video/interview/chat/employer`, { roomID: generatedRoomID })
                // }
            }
        } catch(err) {
            console.log(err);
        }
    }

    console.log("room", room);

    useEffect(() => {

        const configuration = {
            params: {
                id: userData.uniqueId, 
                accountType: userData.accountType
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/general/user/data`, configuration).then((res) => {
            if (res.data.message === "Gathered user!") {
                console.log(res.data);

                const { user } = res.data;

                setUser(user);
            } else {
                console.log("err gathering user..:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    console.log("videocall", videocall);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoRef && videoRef.current) {
            if (videoTrack) {
                videoTrack.attach(videoRef.current);
                return () => {
                    videoTrack.detach();
                };
            }
        }
    }, [ videoTracks ]);
    
    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioRef && audioRef.current) {
            if (audioTrack) {
                audioTrack.attach(audioRef.current);
                return () => {
                    audioTrack.detach();
                };
            }
        }
    }, [ audioTracks ]);

    useEffect(() => {
        const configuration = {
            params: {
                id: userData.uniqueId, 
                accountType: userData.accountType,
                videocallID: id
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/video/chat/info`, configuration).then((res) => {
            if (res.data.message === "Gathered info!") {
                console.log(res.data);

                const { videoCall } = res.data;

                setVideoCallData(videoCall);

                Video.connect(user.activeVideoChatRoom.tokenized, { name: videoCall.roomName }).then(room => {
                    console.log('Connected to Room', room);

                    const participantConnected = participant => {
                        setParticipants(prevParticipants => [...prevParticipants, participant]);
                    };
                    const participantDisconnected = participant => {
                        setParticipants(prevParticipants =>
                            prevParticipants.filter(p => p !== participant)
                        );
                    };

                    setRoom(room);
                    
                    room.on('participantConnected', participantConnected);
                    room.on('participantDisconnected', participantDisconnected);
                    room.participants.forEach(participantConnected);
                });

            } else {
                console.log("err gathering user..:", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    
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
                                    {room !== null ? room.participants.map((participant, index) => {
                                        return (
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Participant
                                                    key={room.localParticipant.sid}
                                                    participant={room.localParticipant}
                                                />
                                            </Col>
                                        );
                                    }) : null}
                                </Row>
                            </CardBody>
                            <CardFooter className='b-l-secondary b-r-secondary'>
                                <Button className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }} onClick={joinRoomVideoChat}>Initialize Room</Button>
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