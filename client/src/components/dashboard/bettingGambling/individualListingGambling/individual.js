import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Card, CardBody, CardHeader } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";


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


const IndividualListingToBetGambleOnHelper = ({ userData }) => {
    const [ ready, setReady ] = useState(false);
    const { width } = useWindowDimensions();

    const getOS = () => {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'darwin'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        let os = null;
      
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows';
        } else if (/Android/.test(userAgent)) {
          os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux';
        }
      
        return os;
    }

    const downloadAndInstallDependencies = () => {
        console.log("downloadAndInstallDependencies ran/running...");

        const OperatingSystem = getOS();

        const config = {
            signedinUniqueId: userData.uniqueId,
            accountType: userData.accountType,
            detectedOS: OperatingSystem
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/download/required/configuration/dependencies/and/helper/logic`, config).then((res) => {
            if (res.data.message === "Successfully installed dependencies & updated the required data/logic!") {
                console.log(res.data);

                setReady(true);

                NotificationManager.success("We've SUCCESSFULLY installed & ran the required 'dependencies' & other related logic to get this 'leg' of the VPN setup process completed!", "Successfully installed required dependencies!", 4750);

            } else if (res.data.message === "Final command ran however we're UNABLE to complete all the required prework/steps...") {
                console.log("Err", res.data);

                NotificationManager.warning("Most of the required logic ran HOWEVER things may not work as expected/desired later in the setup process - if this occurs, simply restart the VPN setup process entirely!", "Might be missing some essential data!", 4750);
            } else {
                NotificationManager.error("There was an error while attempting to install & run the required dependencies for the setup process, please try this process again & if the issue persists, contact support or open a 'help' ticket!", "Error attempting to install dependencies!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("There was an error while attempting to install & run the required dependencies for the setup process, please try this process again & if the issue persists, contact support or open a 'help' ticket!", "Error attempting to install dependencies!", 4750);
        })
    }
    const spinUpVPN = () => {
        console.log("spinUpVPN ran/running");

        const OperatingSystem = getOS();

        axios.get(`${process.env.REACT_APP_BASE_URL}/configure/vpn/clients/connect`, {
            params: {
                signedinUniqueId: userData.uniqueId,
                accountType: userData.accountType,
                detectedOS: OperatingSystem
            }
        }).then((res) => {
            if (res.data.message === "Successfully setup client & executed required logic!") {
                console.log(res.data);

                // NotificationManager.success("We've SUCCESSFULLY installed & ran the required 'dependencies' & other related logic to get this 'leg' of the VPN setup process completed!", "Successfully installed required dependencies!", 4750);

            } else {
                NotificationManager.error("There was an error while attempting to set-up your client & connect to the VPN, please try this process again & if the issue persists, contact support or open a 'help' ticket!", "Error attempting to install dependencies!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("There was an error while attempting to set-up your client & connect to the VPN, please try this process again & if the issue persists, contact support or open a 'help' ticket!", "Error attempting to install dependencies!", 4750);
        })
    }
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
                                background: `rgba(${calculated}, 102, 50, ${calculated - 0.275})`,
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
                                        <h3 className={"vpn-parallax-header-text"}>You're NOW on the final-leg of the setup process & we will now install any required dependencies for the VPN software...</h3>
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
                                <h3 style={{ textDecorationLine: "underline" }}>VPN dependencies download's & final setup & configuration process</h3>
                            </CardHeader>
                            <CardBody>
                                <div className={"vpn-inner-container"}>
                                    <h5>We are now going to install the required <strong>dependencies</strong> & configure some rather easy settings and you'll have your VPN setup & ready to go!</h5>
                                    <p style={{ paddingTop: "7.5px" }}>What are dependencies, you may be asking? <strong style={{ textDecorationLine: "underline" }}>Dependencies</strong> are various related software that are required as a sort-of "helper" file(s) that work together alongside with the main software logic to coordinate together in a manner that allows the entire software logic to run as expected & directed...</p>
                                    <hr />
                                    <Button onClick={downloadAndInstallDependencies} className={"btn-square-info"} outline color={"info-2x"} style={{ width: "100%" }}>DOWNLOAD & INSTALL Required Dependencies</Button>
                                    {ready === true ? <Fragment>
                                        <hr />
                                        <Button onClick={spinUpVPN} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%" }}>Spin up Client's & connect to VPN!</Button>
                                    </Fragment> : null}
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
export default connect(mapStateToProps, {  })(IndividualListingToBetGambleOnHelper);