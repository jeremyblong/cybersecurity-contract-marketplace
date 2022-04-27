import React, { Fragment, useState, useEffect } from 'react';
import "./styles.css";
import { Container, Card, CardBody, Row, Col, CardFooter, Button } from "reactstrap";
import Slider from "react-slick";
import Breadcrumb from '../../../../../layout/breadcrumb';
import moment from "moment";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import _ from "lodash";
import { useHistory } from "react-router-dom";


const settings = {
    dots: true,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const ViewAllTutorialCoursesHelper = (props) => {

    const history = useHistory();

    const [ data, setData ] = useState({
        dataChunkOne: new Array(20).fill({
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            name: "JeremyAlexanderBlong",
            views: 54504,
            date: randomDate(new Date(2022, 0, 1), new Date())
        }),
        dataChunkTwo: new Array(20).fill({
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            name: "TheHackingStreamer1092",
            views: 54504,
            date: randomDate(new Date(2022, 0, 1), new Date())
        }),
        dataChunkThree: new Array(20).fill({
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            name: "MrBeastSucks",
            views: 54504,
            date: randomDate(new Date(2022, 0, 1), new Date())
        }),
        dataChunkFour: new Array(20).fill({
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            name: "AdamJewler19",
            views: 54504,
            date: randomDate(new Date(2022, 0, 1), new Date())
        }),
        dataChunkFive: new Array(20).fill({
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
            name: "JohnnyKnox2948",
            views: 54504,
            date: randomDate(new Date(2022, 0, 1), new Date())
        })
    });
    const [ ready, setReady ] = useState(false);
    const [ selectedHovered, setSelectedHovered ] = useState(null);

    useEffect(() => {
        const configuration = {};

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/instructional/tutorial/courses/tutorials`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered tutorials!") {
                console.log(res.data);

                const { tutorials } = res.data;

                setData(prevState => {
                    return {
                        ...prevState,
                        dataChunkOne: [...tutorials.slice(0, 12), ...prevState.dataChunkOne].splice(0, 20),
                        dataChunkTwo: [...tutorials.slice(12, 24), ...prevState.dataChunkTwo].splice(0, 20),
                        dataChunkThree: [...tutorials.slice(24, 36), ...prevState.dataChunkThree].splice(0, 20),
                        dataChunkFour: [...tutorials.slice(36, 48), ...prevState.dataChunkFour].splice(0, 20),
                        dataChunkFive: [...tutorials.slice(48, 60), ...prevState.dataChunkFive].splice(0, 20)
                    }
                });
                setReady(true);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("We've encountered an error while attempting to gather the related tutorial videos/content, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("We've encountered an error while attempting to gather the related tutorial videos/content, please reload this page or contact support if the problem persists!", "Unknown error occurred while processing request!", 4750);
        })
    }, []);

    console.log("data", data);

    const handleRedirectIndividualTutorial = (el) => {
        console.log("handleRedirectIndividualTutorial ran/clicked.");

        history.push(`/view/individual/tutorial/video/${el.id}`);
    }

    return (
        <Fragment>
            <Breadcrumb parent="View FREE Tutorial Video(s)" title="Learn New Hacking Skills Today.." />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardBody>
                                {/* <Row>
                                    <h3 className='text-left bold-text-underline'>Malware Attack Tutorial's</h3>
                                    <p className='lead leaded-course'>This is one of the most common types of cyberattacks. “Malware” refers to malicious software viruses including worms, spyware, ransomware, adware, and trojans. </p>
                                </Row> */}
                                <Row style={{ paddingTop: "50px", paddingTop: "50px" }}>
                                    <Slider className={"slider-settings-tutorials"} {...settings}>
                                        {ready === true && typeof data.dataChunkOne !== "undefined" && data.dataChunkOne.length > 0 ? data.dataChunkOne.map((element, index) => {
                                            if (_.has(element, "mainData") && _.has(element.mainData, "courseContent")) {
                                                return (
                                                    <div className={"card-wrapper-hovered"} key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className={"card-tutorial-video shadow"}>
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => {

                                                                            setSelectedHovered(element);

                                                                            const playPromise = event.target.play();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                            setSelectedHovered(null);

                                                                            const playPromise = event.target.pause();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={`${process.env.REACT_APP_ASSET_LINK}/${element.mainData.courseContent.link}`} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.mainData.videoTitle}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.posterName} ~ <strong>{element.likes}/{element.dislikes}</strong> <strong style={{ color: "green" }}>likes</strong>/<strong style={{ color: "red" }}>dislikes</strong></p>
                                                                    <p className={"muted-text-color"}>{element.totalViews} Views - {moment(element.date).fromNow()}</p>
                                                                    <hr />
                                                                    <Button onClick={() => {
                                                                        handleRedirectIndividualTutorial(element);
                                                                    }} className={"btn-square-primary conditional-tutorial-btn"} color={"primary-2x"} outline style={{ width: "100%" }}>View Tutorial/Video</Button>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className="card-tutorial-video shadow">
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
                                                                <CardBody>
                                                                    <h6>{element.title}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.name}</p>
                                                                    <p className={"muted-text-color"}>{element.views} Views - {moment(element.date).fromNow()}</p>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            }
                                        }) : null}
                                    </Slider>
                                </Row>
                                {/* <Row>
                                    <h3 className='text-left bold-text-underline'>Phishing Attack Tutorial's</h3>
                                    <p className='lead leaded-course'>Phishing attacks are one of the most prominent widespread types of cyberattacks. It is a type of social engineering attack wherein an attacker impersonates to be a trusted contact and sends the victim fake mails. </p>
                                </Row> */}
                                <Row style={{ paddingTop: "50px", paddingTop: "50px" }}>
                                    <Slider className={"slider-settings-tutorials"} {...settings}>
                                        {ready === true && typeof data.dataChunkTwo !== "undefined" && data.dataChunkTwo.length > 0 ? data.dataChunkTwo.map((element, index) => {
                                            if (_.has(element, "mainData") && _.has(element.mainData, "courseContent")) {
                                                return (
                                                    <div className={"card-wrapper-hovered"} key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className={"card-tutorial-video shadow"}>
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => {

                                                                            setSelectedHovered(element);

                                                                            const playPromise = event.target.play();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                            setSelectedHovered(null);

                                                                            const playPromise = event.target.pause();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={`${process.env.REACT_APP_ASSET_LINK}/${element.mainData.courseContent.link}`} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.mainData.videoTitle}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.posterName} ~ <strong>{element.likes}/{element.dislikes}</strong> <strong style={{ color: "green" }}>likes</strong>/<strong style={{ color: "red" }}>dislikes</strong></p>
                                                                    <p className={"muted-text-color"}>{element.totalViews} Views - {moment(element.date).fromNow()}</p>
                                                                    <hr />
                                                                    <Button onClick={() => {
                                                                        handleRedirectIndividualTutorial(element);
                                                                    }} className={"btn-square-primary conditional-tutorial-btn"} color={"primary-2x"} outline style={{ width: "100%" }}>View Tutorial/Video</Button>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className="card-tutorial-video shadow">
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => event.target.play()}
                                                                        onMouseOut={event => event.target.pause()} 
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={require("../../../../../assets/video/hacking-2.mp4")} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.title}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.name}</p>
                                                                    <p className={"muted-text-color"}>{element.views} Views - {moment(element.date).fromNow()}</p>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            }
                                        }) : null}
                                    </Slider>
                                </Row>
                                {/* <Row>
                                    <h3 className='text-left bold-text-underline'>Password Attack Tutorial's</h3>
                                    <p className='lead leaded-course'>It is a form of attack wherein a hacker cracks your password with various programs and password cracking tools like Aircrack, Cain, Abel, John the Ripper, Hashcat, etc. There are different types of password attacks like brute force attacks, dictionary attacks, and keylogger attacks.</p>
                                </Row> */}
                                <Row style={{ paddingTop: "50px", paddingTop: "50px" }}>
                                    <Slider className={"slider-settings-tutorials"} {...settings}>
                                        {ready === true && typeof data.dataChunkThree !== "undefined" && data.dataChunkThree.length > 0 ? data.dataChunkThree.map((element, index) => {
                                            if (_.has(element, "mainData") && _.has(element.mainData, "courseContent")) {
                                                return (
                                                    <div className={"card-wrapper-hovered"} key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className={"card-tutorial-video shadow"}>
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => {

                                                                            setSelectedHovered(element);

                                                                            const playPromise = event.target.play();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                            setSelectedHovered(null);

                                                                            const playPromise = event.target.pause();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={`${process.env.REACT_APP_ASSET_LINK}/${element.mainData.courseContent.link}`} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.mainData.videoTitle}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.posterName} ~ <strong>{element.likes}/{element.dislikes}</strong> <strong style={{ color: "green" }}>likes</strong>/<strong style={{ color: "red" }}>dislikes</strong></p>
                                                                    <p className={"muted-text-color"}>{element.totalViews} Views - {moment(element.date).fromNow()}</p>
                                                                    <hr />
                                                                    <Button onClick={() => {
                                                                        handleRedirectIndividualTutorial(element);
                                                                    }} className={"btn-square-primary conditional-tutorial-btn"} color={"primary-2x"} outline style={{ width: "100%" }}>View Tutorial/Video</Button>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className="card-tutorial-video shadow">
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => event.target.play()}
                                                                        onMouseOut={event => event.target.pause()} 
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={require("../../../../../assets/video/hacking-3.mp4")} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.title}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.name}</p>
                                                                    <p className={"muted-text-color"}>{element.views} Views - {moment(element.date).fromNow()}</p>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            }
                                        }) : null}
                                    </Slider>
                                </Row>
                                {/* <Row>
                                    <h3 className='text-left bold-text-underline'>Man-in-the-Middle Attack Tutorial's</h3>
                                    <p className='lead leaded-course'>A Man-in-the-Middle Attack (MITM) is also known as an eavesdropping attack. In this attack, an attacker comes in between a two-party communication, i.e., the attacker hijacks the session between a client and host. By doing so, hackers steal and manipulate data.</p>
                                </Row> */}
                                <Row style={{ paddingTop: "50px", paddingTop: "50px" }}>
                                    <Slider className={"slider-settings-tutorials"} {...settings}>
                                        {ready === true && typeof data.dataChunkFour !== "undefined" && data.dataChunkFour.length > 0 ? data.dataChunkFour.map((element, index) => {
                                            if (_.has(element, "mainData") && _.has(element.mainData, "courseContent")) {
                                                return (
                                                    <div className={"card-wrapper-hovered"} key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className={"card-tutorial-video shadow"}>
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => {

                                                                            setSelectedHovered(element);

                                                                            const playPromise = event.target.play();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                            setSelectedHovered(null);

                                                                            const playPromise = event.target.pause();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={`${process.env.REACT_APP_ASSET_LINK}/${element.mainData.courseContent.link}`} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.mainData.videoTitle}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.posterName} ~ <strong>{element.likes}/{element.dislikes}</strong> <strong style={{ color: "green" }}>likes</strong>/<strong style={{ color: "red" }}>dislikes</strong></p>
                                                                    <p className={"muted-text-color"}>{element.totalViews} Views - {moment(element.date).fromNow()}</p>
                                                                    <hr />
                                                                    <Button onClick={() => {
                                                                        handleRedirectIndividualTutorial(element);
                                                                    }} className={"btn-square-primary conditional-tutorial-btn"} color={"primary-2x"} outline style={{ width: "100%" }}>View Tutorial/Video</Button>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className="card-tutorial-video shadow">
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => event.target.play()}
                                                                        onMouseOut={event => event.target.pause()} 
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={require("../../../../../assets/video/hacking-4.mp4")} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.title}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.name}</p>
                                                                    <p className={"muted-text-color"}>{element.views} Views - {moment(element.date).fromNow()}</p>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            }
                                        }) : null}
                                    </Slider>
                                </Row>
                                {/* <Row>
                                    <h3 className='text-left bold-text-underline'>SQL Injection Attack Tutorial's</h3>
                                    <p className='lead leaded-course'>A Structured Query Language (SQL) injection attack occurs on a database-driven website when the hacker manipulates a standard SQL query. It is carried by injecting a malicious code into a vulnerable website search box, thereby making the server reveal crucial information.</p>
                                </Row> */}
                                <Row style={{ paddingTop: "50px", paddingTop: "50px" }}>
                                    <Slider className={"slider-settings-tutorials"} {...settings}>
                                        {ready === true && typeof data.dataChunkFive !== "undefined" && data.dataChunkFive.length > 0 ? data.dataChunkFive.map((element, index) => {
                                            if (_.has(element, "mainData") && _.has(element.mainData, "courseContent")) {
                                                return (
                                                    <div className={"card-wrapper-hovered"} key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className={"card-tutorial-video shadow"}>
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => {

                                                                            setSelectedHovered(element);

                                                                            const playPromise = event.target.play();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                            setSelectedHovered(null);

                                                                            const playPromise = event.target.pause();
                                                                            
                                                                            console.log("playPromise", playPromise);

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
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={`${process.env.REACT_APP_ASSET_LINK}/${element.mainData.courseContent.link}`} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.mainData.videoTitle}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.posterName} ~ <strong>{element.likes}/{element.dislikes}</strong> <strong style={{ color: "green" }}>likes</strong>/<strong style={{ color: "red" }}>dislikes</strong></p>
                                                                    <p className={"muted-text-color"}>{element.totalViews} Views - {moment(element.date).fromNow()}</p>
                                                                    <hr />
                                                                    <Button onClick={() => {
                                                                        handleRedirectIndividualTutorial(element);
                                                                    }} className={"btn-square-primary conditional-tutorial-btn"} color={"primary-2x"} outline style={{ width: "100%" }}>View Tutorial/Video</Button>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={index}>
                                                        <Col className='custom-card-chunk-tutorial' xl="3" sm="12" lg="3" md="3">
                                                            <Card className="card-tutorial-video shadow">
                                                                <div className="faq-image product-img">
                                                                    <video 
                                                                        onMouseOver={event => event.target.play()}
                                                                        onMouseOut={event => event.target.pause()} 
                                                                        className={"tutorial-video-player"} 
                                                                        key={index}
                                                                    >
                                                                        <source src={require("../../../../../assets/video/hacking-5.mp4")} />
                                                                    </video>
                                                                </div>
                                                                <CardBody>
                                                                    <h6>{element.title}</h6>
                                                                    <hr />
                                                                    <p className={'muted-text-color'}>{element.name}</p>
                                                                    <p className={"muted-text-color"}>{element.views} Views - {moment(element.date).fromNow()}</p>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </div>
                                                );
                                            }
                                        }) : null}
                                    </Slider>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ViewAllTutorialCoursesHelper;