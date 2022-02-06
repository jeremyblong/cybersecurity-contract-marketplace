import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Media, Label, Badge, ListGroup, ListGroupItem, Card, CardBody, CardHeader } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";


const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}
  
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}


const DownloadSetupCoreVPNDataInformationHelper = ({ userData }) => {
    const activateInstallationProcess = () => {
        console.log("activateInstallationProcess running...");

        const config = {
            signedinUniqueId: userData.uniqueId
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/download/required/vpn/files`, config).then((res) => {
            if (res.data.message === "File was scanned & is clean!") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const scanDownloadLink = () => {
        console.log("scanDownloadLink ran/running...");

        const config = {
            params: {
                signedinUniqueId: userData.uniqueId,
                accountType: userData.accountType
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/scan/vpn/file/setup`, config).then((res) => {
            if (res.data.message === "File was scanned & is clean!") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const proceedNextPage = () => {
        console.log("proceedNextPage ran/running..");
    }


    const { height, width } = useWindowDimensions();

    console.log("Width", width);
    return (
        <Fragment>
            <Parallax
                className={"background-parallax-vpn-setup-img"} 
                bgImage={width >= 1350 ? require('../../../../assets/images/hackerPicOne.jpg') : require('../../../../assets/images/tall-tech.jpg')}
                renderLayer={percentage => {
                    const calculated = (percentage / 9.25) * (percentage * 5.25);
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                background: `rgba(${calculated}, 102, 255, ${calculated - 0.275})`,
                                minHeight: "1250px",
                                left: '0px',
                                top: '0px',
                                right: "0px",
                                bottom: "0px",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Card className={"vpn-setup-card-parallax"}>
                                <CardBody className={"vpn-inner-cardbody"}>
                                    <CardHeader className={"b-l-primary border-3 vpn-setup-card-header"}>
                                        <h3 className={"vpn-parallax-header-text"}>You're on the "Setup your VPN" page which will allow you to setup your personal FREE VPN!</h3>
                                    </CardHeader>
                                    <CardBody className={"cardbody-vpn-setup"}>
                                        <p className={"vpn-parallax-sub-text"}>You will be given a certain amount of credits to use on our FREE VPN (a reasonable amount of credit's) to use our VPN as your own PRIVATE NETWORK (more privacy) once everything is properly setup & running. We highly recommend testing your network...<hr /><strong style={{ color: "#f73164" }}>(There are multiple pages/steps in order to completely finish the setup however it doesn't take long)</strong></p>
                                    </CardBody>
                                </CardBody>
                            </Card>
                        </div>
                    );
                }}
            />
            <Container fluid={true}>
                <Row style={{ marginBottom: "225px" }}>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"vpn-setup-card-page-one"}>
                            <CardHeader className={"b-l-secondary border-3"}>
                                <h3 style={{ textDecorationLine: "underline" }}>Begin the setup/initialization process by getting our "VPN Software" by downloading or cloning</h3>
                            </CardHeader>
                            <CardBody>
                                <div className={"vpn-inner-container"}>
                                    <h5>We will now need to aquire a copy of our <strong>Connection Scripts</strong> which is automate the installation process...</h5>
                                    <p style={{ paddingTop: "7.5px" }}>This entire process (this page and the next/future pages) are actually <strong style={{ textDecorationLine: "underline" }}>VERY</strong> simplistic & will require little-to-no effect from you whatsoever, aside from clicking some button's of course...</p>
                                    <hr />
                                    <h5 style={{ marginBottom: "32.5px" }}>Worried about what you're downloading? Click the "Scan download link" in order to check if the file to be downloaded is virus-free & safe although we can assure you that we periodically/systematically do checks in order to confirm a continous level of security/protection for our user's that're downloading our VPN. Feel free to scan it anyway to confirm it is safe to move forward with the VPN process.</h5>
                                    <hr />
                                    <Button onClick={scanDownloadLink} className={"btn-square-info"} outline color={"info-2x"} style={{ width: "100%" }}>Scan download link</Button>
                                    <hr />
                                    <Button onClick={activateInstallationProcess} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%" }}>Download Setup File(s) & Run Installation</Button>
                                    <hr />
                                    <div className={"centered-both-ways"}>
                                        <a onClick={proceedNextPage} className={"proceed-next-link"}>Proceed to next step and/or page...</a>
                                    </div>
                                </div>
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
export default connect(mapStateToProps, {  })(DownloadSetupCoreVPNDataInformationHelper); 