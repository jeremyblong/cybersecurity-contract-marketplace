import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import { Parallax } from 'react-parallax';
import { Container, Row, Col, Button, Media, Label, Input, ListGroup, ListGroupItem, Card, CardBody, CardHeader } from 'reactstrap';
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import _ from "lodash";

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


const ViewAllListingsToBeGambledOnHelper = ({ userData }) => {
    // state initialization..
    const [ user, setUserData ] = useState(null);

    const history = useHistory();

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

    useEffect(() => {

        const configuration = {
            params: {
                
            }
        }
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/listings/avaliable/bid/gamble/on`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered avaliable listings to be bet/bid on!") {
                console.log(res.data);
            } else {
                // NotificationManager.error("We've experienced an error loading this page & your user data & details, please RELOAD this page in order to attempt to gather all proper required data...", "Couldn't fetch info - reload page!", 4500);
            }
        })
    }, [])
    const activateInstallationProcess = (data) => {
        console.log("activateInstallationProcess running...");

        const OperatingSystem = getOS();

        if (user !== null && _.has(user, "VPNSetupData")) {
            switch (OperatingSystem) {
                case "Linux":
                case "Mac OS":
                    const config = {
                        signedinUniqueId: userData.uniqueId,
                        operatingSystem: data,
                        accountType: userData.accountType,
                        detectedOS: OperatingSystem
                    }
            
                    axios.post(`${process.env.REACT_APP_BASE_URL}/download/required/vpn/files`, config).then((res) => {
                        if (res.data.message === "File's we're successfully downloaded & ran!") {
                            console.log(res.data);
    
                            setTimeout(() => {
                                history.push("/download/dependencies/final/step/vpn/setup");
                            },  4500);
    
                            NotificationManager.success("Successfully downloaded & installed the required file(s) & data, You will be redirected momentarily to the next page of the 'setup' process...", "Successfully installed required data!", 4500);
    
                        } else {
                            console.log("Err", res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                    break;
                case "Windows":
                    NotificationManager.warning("At this current point in time, we do NOT offer support for windows based OS systems; if you want to use our VPN, please use a MacOS or Linux based system!", "Windows OS system type is NOT supported!", 4750);
                    break;
                case "Android":
                    NotificationManager.warning("You may only use our VPN on a computer/laptop type device, not mobile phone's or at least at this current point in time, please try this again on a laptop and/or linux/macOS computer!", "Cannot run this command on mobile device's!", 4750);
                    break;
                case "iOS":
                    NotificationManager.warning("You may only use our VPN on a computer/laptop type device, not mobile phone's or at least at this current point in time, please try this again on a laptop and/or linux/macOS computer!", "Cannot run this command on mobile device's!", 4750);
                    break;
                default:
                    break;
            }
        } else {
            NotificationManager.warning("You MUST scan the 'download link' before proceeding... We require every user verify the 'safeness' of each download & to make sure nothing has been modified...", "You MUST scan the DOWNLOAD LINK first!", 4500);
        }
    }
    const registerUserAndReinstall = () => {
        console.log("registerUserAndReinstall ran/running...");

        NotificationManager.info("We're initiating the scanning process now... We will notify you when the file has completed scanning.", "File scanning in progress!", 4750);

        const config = {
            params: {
                signedinUniqueId: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/register/user/config/activate`, config).then((res) => {
            if (res.data.message === "Successfully registered user & updated user list globally!") {
                console.log(res.data);

                const { user } = res.data;

                setUserData(user);

                NotificationManager.success("We've successfully registered your account in our VPN database & activated your account - continue with the rest of the 'activation' logic on this page & the following!", "Registered your account & activated! Continue with the rest of the logic on this page...", 4750);

            } else if (res.data.message === "You've already registered with the VPN database so no action was taken...") {
                const { user } = res.data;

                setUserData(user);

                NotificationManager.info("You've already registered with our VPN database so no action was taken, please continue with the 'setup/activation' process...!", "Already registered, Continue with 'setup/activation' process!", 4750);
            } else  {

                NotificationManager.warning("An unknown error occurred while attempting to process this request and scan the desired file for malicious/dangerous code, We are unable to return the results at this time - please try again!", "Unable to scan this file!", 4750);
            }
        }).catch((err) => {
            
            console.log(err);
        })
    }
    const proceedNextPage = () => {
        console.log("proceedNextPage ran/running..");
    }


    const { width } = useWindowDimensions();

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
                                    <Button onClick={registerUserAndReinstall} className={"btn-square-secondary"} outline color={"secondary-2x"} style={{ width: "100%" }}>Register as new user & activate VPN on account!</Button>
                                    <hr />
                                    <Row>
                                        <Col sm="6">
                                            <Card>
                                                <Media className="p-20 add-shadow-media-custom-vpn">
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge" style={{ textDecorationLine: "underline" }}>MacOS Installation ONLY<span className="badge badge-success pull-right digits">{"APPLE - MACOS OS"}</span></h6>
                                                        <p>{"This will run the installation process for apple MacOS based system's, select this option if your OS (operating system) runs on a MacOS based software and/or an apple laptop..."}</p>
                                                        <hr />
                                                        <Button onClick={() => activateInstallationProcess("macOS")} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }}>Download Setup File(s) & Run Installation</Button>
                                                    </Media>
                                                </Media>
                                            </Card>
                                        </Col>
                                        <Col sm="6">
                                            <Card>
                                                <Media className="p-20 add-shadow-media-custom-vpn">
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge" style={{ textDecorationLine: "underline" }}>Linux Installation ONLY<span className="badge badge-info pull-right digits">{"LINUX DISTRO'S"}</span></h6>
                                                        <p>{"This will run the installation process for linux based system's, select this option if your OS (operating system) runs on a linux based distro..."}</p>
                                                        <hr />
                                                        <Button onClick={() => activateInstallationProcess("linux")} className={"btn-square-info"} outline color={"info-2x"} style={{ width: "100%" }}>Download Setup File(s) & Run Installation</Button>
                                                    </Media>
                                                </Media>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Card>
                                                <Media className="p-20 add-shadow-media-custom-vpn">
                                                    <Media body>
                                                        <h6 className="mt-0 mega-title-badge" style={{ textDecorationLine: "underline" }}>WINDOW'S Installation ONLY (*NOT SUPPORTED*)<span className="badge badge-secondary pull-right digits">{"WINDOW'S BASED OS"}</span></h6>
                                                        <p>{"Window's based operating system's are NOT SUPPORTED at this current point in time however this is subject to change as the OS changes/progresses, We're sorry we cannot provide support at this time but maybe it's time to consider linux/MacOS instead? :D"}</p>
                                                    </Media>
                                                </Media>
                                            </Card>
                                        </Col>
                                    </Row>
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
export default connect(mapStateToProps, {  })(ViewAllListingsToBeGambledOnHelper); 