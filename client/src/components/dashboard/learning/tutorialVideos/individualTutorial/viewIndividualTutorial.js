import React, { Fragment, useEffect, useState } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody, Badge, Media, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Input } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import axios from "axios";
import { NotificationManager } from "react-notifications";
import _ from "lodash";
import { useParams } from "react-router-dom";
import moment from "moment";
import ReactPlayer from 'react-player';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Modal } from 'react-responsive-modal';
import { connect } from "react-redux";
import io from 'socket.io-client';
import Confetti from 'react-confetti';

const newSocket = io(process.env.REACT_APP_BASE_URL);

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const ViewIndividualTutorialVideoHelper = ({ userData }) => {

    const { id } = useParams();

    const [ ready, setReady ] = useState(false);
    const [ tutorial, setTutorial ] = useState(null);
    const [ modalTipOpen, setModalTipState ] = useState(false);
    const [ tipAmount, setTipAmount ] = useState(0);
    const [ tutorialList, setTutorialList ] = useState(new Array(20).fill({
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        name: "JeremyAlexanderBlong",
        views: 54504,
        date: randomDate(new Date(2022, 0, 1), new Date())
    }));
    const [ tutorialListReady, loadedTutorialList ] = useState(false);
    const [ socket, setSocket ] = useState(null);
    const [ confettiShow, showConfettiEffect ] = useState(false);
    const [ timer, setTimerData ] = useState(null);

    useEffect(() => {
        setSocket(newSocket);

        return () => newSocket.close();
    }, [ setSocket ]);


    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      
        useEffect(() => {
          const handleResize = () => {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);

          return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return windowDimensions;
    }

    useEffect( () => () => {
        console.log("unmount");

        if (timer !== null) {
            console.log("clear the timeout..");
            // clear timer for page change..
            clearTimeout(timer);
            // clear state item/condition
            setTimerData(null);
        }
    }, []);

    useEffect(() => {
        if (socket !== null) {
            
            console.log("websocket is NO LONGER NULL!");

            const newTipRecieved = (amount) => {
                
                console.log("socket listening...", amount);

                showConfettiEffect(true);

                NotificationManager.success(`A user has just 'tipped' approx. $${Number(amount).toFixed(2)} to the user that has posted this tutorial video - you are seeing this as you're both currently viewing the same video! The confetti will dissapear in 7250 milliseconds..`, `Someone just tipped this user (tutorial poster) approx. $${Number(amount).toFixed(2)} (USD - $)!`, 4750);

                const timer = setTimeout(() => {
                    showConfettiEffect(false);
                }, 10000);

                setTimerData(timer);
            };
          
            socket.on('fireTutorialConfetti', newTipRecieved);
        
            // return () => {
            //   socket.off('fireTutorialConfetti', newTipRecieved);
            // };
        } else {
            console.log("WS is currently null.");
        }
    }, [socket]);

    useEffect(() => {
        const configuration = {};

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/instructional/tutorial/courses/tutorials`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered tutorials!") {
                console.log(res.data);

                const { tutorials } = res.data;

                setTutorialList(prevState => {
                    return [...tutorials, ...prevState].splice(0, (tutorials.length - 1) + (prevState.length - 1))
                });
                loadedTutorialList(true);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("We've encountered an error while attempting to gather the related tutorial videos/content, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("We've encountered an error while attempting to gather the related tutorial videos/content, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
        })
    }, []);

    useEffect(() => {
        const configuration = {
            params: {
                tutorialID: id
            }
        };

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/instructional/tutorial/course/singular`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered tutorial!") {
                console.log(res.data);

                const { tutorial } = res.data;

                setTutorial(tutorial);
                setReady(true);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("We've encountered an error while attempting to gather the related tutorial video/content, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("We've encountered an error while attempting to gather the related tutorial video/content, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
        })
    }, []);

    const handleDislikeResponse = () => {
        console.log("handleLikeResponse clicked/ran.");

        const configuration = {
            tutorialID: id,
            signedinUserID: userData.uniqueId,
            signedinAccountType: userData.accountType,
            fullName: `${userData.firstName} ${userData.lastName}`
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/dislike/response/tutorial/individual/response`, configuration).then((res) => {
            if (res.data.message === "Successfully disliked tutorial!") {
                console.log(res.data);

                const { tutorial } = res.data;

                setTutorial(tutorial);

                NotificationManager.success("Successfully 'disliked' this post, We have successfully updated this tutorial's information, you changes are now live!", "Successfully 'disliked' this tutorial/post!", 4750);

            } else if (res.data.message === "Removed a dislike from this post/tutorial!") {

                const { tutorial } = res.data;

                setTutorial(tutorial);

                NotificationManager.warning("Successfully 'REMOVED DISLIKE' from this tutorial post as you've ALREADY responded to this post/tutorial previously & you cannot double react..", "Can't 'double-dislike', removed your dislike!", 4750);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("We've encountered an error while attempting 'respond' to this post/tutorial, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("We've encountered an error while attempting 'respond' to this post/tutorial, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
        })
    }

    const handleLikeResponse = () => {
        console.log("handleLikeResponse clicked/ran.");

        const configuration = {
            tutorialID: id,
            signedinUserID: userData.uniqueId,
            signedinAccountType: userData.accountType,
            fullName: `${userData.firstName} ${userData.lastName}`
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/like/response/tutorial/individual/response`, configuration).then((res) => {
            if (res.data.message === "Successfully liked tutorial!") {
                console.log(res.data);

                const { tutorial } = res.data;

                setTutorial(tutorial);

                NotificationManager.success("Successfully 'liked' this post, We have successfully updated this tutorial's information, you changes are now live!", "Successfully 'liked' this tutorial/post!", 4750);

            } else if (res.data.message === "Removed a like from this post/tutorial!") {

                const { tutorial } = res.data;

                setTutorial(tutorial);

                NotificationManager.warning("Successfully 'REMOVED LIKE' from this tutorial post as you've ALREADY responded to this post/tutorial previously & you cannot double react..", "Can't 'double-like', removed your like!", 4750);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("We've encountered an error while attempting 'respond' to this post/tutorial, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("We've encountered an error while attempting 'respond' to this post/tutorial, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
        })
    }
    const handleTipSubmission = () => {
        console.log("handleTipSubmission clicked/ran..");

        const configuration = {
            tutorialID: id,
            signedinUserID: userData.uniqueId,
            signedinAccountType: userData.accountType,
            fullName: `${userData.firstName} ${userData.lastName}`,
            tipAmount
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/transfer/tip/amount/poster/user`, configuration).then((res) => {
            if (res.data.message === "Successfully tipped tutorial user!") {
                console.log(res.data);

                const { tutorial, amount } = res.data;

                setTutorial(tutorial);
                setTipAmount(0);
                setModalTipState(false);

                socket.emit('fireTutorialConfetti', amount);

                NotificationManager.success("Successfully submitted your 'tip/compliment' to this user, we have SUCCESSFULLY transferred the desired funds to the other user's account..", "Successfully 'tipped' the poster of this tutorial!", 4750);

            } else {
                console.log("Err", res.data);

                NotificationManager.error("We've encountered an error while attempting to 'tip' this user, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("We've encountered an error while attempting to 'tip' this user, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
        })
    }
    const renderMainContent = () => {
        return (
            <Fragment>
                <Modal open={modalTipOpen} classNames={{
                    overlay: 'modalTutorialOverlay',
                    modal: 'modalTutorialModal',
                }} onClose={() => setModalTipState(false)} center>
                    <Container fluid={true}>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card className='shadow height-auto-modal-tutorial'>
                                    <CardHeader className='b-l-primary b-r-primary'>
                                        <h3>Leave a 'tip' and/or a financial reward for this user to show your support! 97% of this goes <em>directly</em> to the posting-user..</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>

                                        </Row>
                                        <Row>
                                            <FormGroup className=" m-form__group">
                                                <Label>Enter a 'tip amount' in which you'd like to transfer to this user (from your <strong>account balance</strong>)</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend"><InputGroupText>{"TIP AMOUNT (USD-$)"}</InputGroupText></InputGroupAddon>
                                                    <Input onChange={(e) => setTipAmount(e.target.value)} value={tipAmount} className="form-control" type="number" placeholder="Enter your 'tip-amount'.. "/>
                                                </InputGroup>
                                            </FormGroup>
                                        </Row>
                                        <Row>
                                            <Button disabled={tipAmount !== 0 ? false : true} onClick={() => handleTipSubmission()} className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }}>Submit Tip & Transfer!</Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Modal>
                <ReactPlayer controls={true} loop={false} volume={1} width={"100%"} height={"100vh"} url={`${process.env.REACT_APP_ASSET_LINK}/${tutorial.mainData.courseContent.link}`} />
                <hr />
                {typeof tutorial.mainData.hashtags !== "undefined" && tutorial.mainData.hashtags.length > 0 ? tutorial.mainData.hashtags.map((hashtag, idx) => {
                    return (
                        <Fragment key={idx}>
                            <Badge style={{ marginBottom: "7.5px" }} color="dark tag-pills-sm-mb">{hashtag.text}</Badge>
                        </Fragment>
                    );
                }) : <Fragment>
                    <h4 className='leftalign-text-hired'>No tags/hashtags are provided for this specific listing..</h4>
                </Fragment>}
                <h3 className='text-left'>{tutorial.mainData.videoTitle}</h3>
                <p>{tutorial.mainData.videoSubtitle}</p>
                <hr />
                <p>{tutorial.mainData.description}</p>
                <Row style={{ marginTop: "12.5px", marginBottom: "22.5px" }}>
                    <h5 className='text-left'><em style={{ color: "#7366ff" }}>${Number(tutorial.totalTipAmount).toFixed(2)}</em> has been 'tipped' to the poster of this tutorial (currently)..</h5>
                </Row>
                <Row>
                    <Col sm="12" md="3" lg="3" xl="3">
                        <h5>{tutorial.totalViews} Views ~ {moment(tutorial.date).format("MM/DD/YYYY")}</h5>
                    </Col>
                    <Col sm="12" md="3" lg="3" xl="3">
                        <Row>
                            <Button onClick={() => handleLikeResponse()} className={"btn-square-primary mr-2"} color={"primary-2x"} outline style={{ width: "47.5%" }}>Like</Button>
                            <Button onClick={() => handleDislikeResponse()} className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "47.5%" }}>Dislike</Button>
                        </Row>
                    </Col>
                    <Col sm="12" md="3" lg="3" xl="3">
                        <Button onClick={() => setModalTipState(true)} className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }}>Donate/Tip!</Button>
                    </Col>
                    <Col sm="12" md="3" lg="3" xl="3">
                        <h3 className='text-center'><em style={{ color: "red" }}>{`${tutorial.dislikes} dislike(s)`}</em> / <em style={{ color: "green" }}>{`${tutorial.likes} like(s)`}</em></h3>
                    </Col>
                </Row>
                <Row>
                    <div className="social-chat">
                        <div className="your-msg">
                            <Media>
                                <Media className="img-50 min-50-img img-fluid m-r-20 rounded-circle" alt="" src={require("../../../../../assets/images/placeholder.png")} />
                                <Media body><span className="f-w-600">First & Last <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                    <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                </Media>
                            </Media>
                        </div>
                        <div className="other-msg">
                            <Media>
                                <Media className="img-50 min-50-img img-fluid m-r-20 rounded-circle" alt="" src={require("../../../../../assets/images/placeholder.png")} />
                                <Media body><span className="f-w-600">First & Last <span>{"1 Month Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                    <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
                                </Media>
                            </Media>
                        </div>
                        <div className="other-msg">
                            <Media>
                                <Media className="img-50 min-50-img img-fluid m-r-20 rounded-circle" alt="" src={require("../../../../../assets/images/placeholder.png")} />
                                <Media body><span className="f-w-600">First & Last <span>{"15 Days Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                    <p>{"ohh yeah very good car and its features i will surely vote for it"} </p>
                                </Media>
                            </Media>
                        </div>
                        <div className="your-msg">
                            <Media>
                                <Media className="img-50 min-50-img img-fluid m-r-20 rounded-circle" alt="" src={require("../../../../../assets/images/placeholder.png")} />
                                <Media body><span className="f-w-600">First & Last <span>{"1 Year Ago"} <i className="fa fa-reply font-primary"></i></span></span>
                                    <p>{"we are doing dance and singing songs, please vote our post which is very good for all young peoples"}</p>
                                </Media>
                            </Media>
                        </div>
                        <div className="text-center"><a href="#javascript">View More Comment's</a></div>
                    </div>
                </Row>
            </Fragment>
        );
    }

    console.log("tutorial", tutorial);
    
    const { height, width } = useWindowDimensions();

    return (
        <Fragment>
            <Breadcrumb parent="Individual FREE Tutorial Course/Video" title="Learn Skills & Up Your Skillsets Today!" />
            {confettiShow === true ? <Confetti
                width={width}
                height={2250}
                numberOfPieces={425}
            /> : null}
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="9" lg="9" xl="9">
                        <Card className='shadow'>
                            <CardBody>
                                {ready === true ? renderMainContent() : <Fragment>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={50} />
                                        </p>
                                    </SkeletonTheme>
                                </Fragment>}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="3" lg="3" xl="3">
                        <Card className='shadow'>
                            <CardBody className='scrollable-y-tutorials'>
                                {tutorialListReady === true && typeof tutorialList !== "undefined" && tutorialList.length > 0 ? tutorialList.map((element, index) => {
                                    if (_.has(element, "mainData") && _.has(element.mainData, "courseContent")) {
                                        return (
                                            <div key={index}>
                                                <Col className='custom-card-chunk-tutorial-individual' xl="3" sm="12" lg="3" md="3">
                                                    <Row>
                                                        <Col sm="12" md="5" lg="5" xl="5">
                                                            <div className="faq-image product-img">
                                                                <video 
                                                                    onMouseOver={event => {

                                                                        const playPromise = event.target.play();

                                                                        if (playPromise !== undefined) {
                                                                            playPromise.then(_ => {
                                                                                // Automatic playback started!
                                                                                // Show playing UI.
                                                                            })
                                                                            .catch(error => {
                                                                                // Auto-play was prevented
                                                                                // Show paused UI.
                                                                            });
                                                                        }
                                                                    }}
                                                                    onMouseOut={event => {

                                                                        const playPromise = event.target.pause();

                                                                        if (playPromise !== undefined) {
                                                                            playPromise.then(_ => {
                                                                                // Automatic playback started!
                                                                                // Show playing UI.
                                                                            })
                                                                            .catch(error => {
                                                                                // Auto-play was prevented
                                                                                // Show paused UI.
                                                                            });
                                                                        }
                                                                    }} 
                                                                    className={"tutorial-video-player-individual"} 
                                                                    key={index}
                                                                >
                                                                    <source src={`${process.env.REACT_APP_ASSET_LINK}/${element.mainData.courseContent.link}`} />
                                                                </video>
                                                            </div>
                                                        </Col>
                                                        <Col sm="12" md="7" lg="7" xl="7">
                                                            <h6>{element.mainData.videoTitle.slice(0, 60)}{typeof element.mainData.videoTitle !== "undefined" && element.mainData.videoTitle.length >= 60 ? "..." : ""}</h6>
                                                            <hr />
                                                            <p className={'muted-text-color'}>{element.posterName.slice(0, 14)}{typeof element.posterName !== "undefined" && element.posterName.length >= 14 ? "..." : ""}</p>
                                                            <p className={"muted-text-color"}>{element.totalViews} Views - {moment(element.date).fromNow()}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={index}>
                                                <Col className='custom-card-chunk-tutorial-individual' xl="3" sm="12" lg="3" md="3">
                                                    <Row>
                                                        <Col sm="12" md="5" lg="5" xl="5">
                                                            <div className="faq-image product-img">
                                                                <video 
                                                                    onMouseOver={event => event.target.play()}
                                                                    onMouseOut={event => event.target.pause()} 
                                                                    className={"tutorial-video-player"} 
                                                                    key={index}
                                                                >
                                                                    <source src={require("../../../../../assets/video/hacking-1.mp4")} />
                                                                </video>
                                                            </div>
                                                        </Col>
                                                        <Col sm="12" md="7" lg="7" xl="7">
                                                            <h6>{element.title.slice(0, 60)}{typeof element.title !== "undefined" && element.title.length >= 60 ? "..." : ""}</h6>
                                                            <hr />
                                                            <p className={'muted-text-color'}>{element.name.slice(0, 14)}{typeof element.name !== "undefined" && element.name.length >= 14 ? "..." : ""}</p>
                                                            <p className={"muted-text-color"}>{element.views} Views - {moment(element.date).fromNow()}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        );
                                    }
                                }) : null}
                            </CardBody>
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
export default connect(mapStateToProps, { })(ViewIndividualTutorialVideoHelper);