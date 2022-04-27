import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Form, FormGroup, InputGroup, Row, Input , Collapse, UncontrolledTooltip, ModalHeader, Modal, ModalBody } from 'reactstrap';
import one from "../../../../../../../../assets/images/user/1.jpg";
import three from "../../../../../../../../assets/images/user/3.jpg";
import five from "../../../../../../../../assets/images/user/5.jpg";
import two from "../../../../../../../../assets/images/user/2.png";
import eight from "../../../../../../../../assets/images/user/8.jpg";
import eleven from "../../../../../../../../assets/images/user/11.png";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { BuckyBarnes, JasonBorne, AndewJon, JohnyWaston, ComerenDiaz } from "../../../../../../../../constant";
import profileLogoPlaceholder from "../../../../../../../../assets/images/logo/logo-icon.png";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import helpers from "../helpers/functions/helperFunctions.js";
import moment from 'moment';
import Slider from "react-slick";
import ReactPlayer from "react-player";

const settings = {
    dots: true,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
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


const { renderPicVideoPreviousApplicant, calculateFileType } = helpers;


const LeftBar = ({ applicantData, lastProfileItem, user }) => {

    console.log("LEFTBAR applicantData...: ", applicantData, user);

    const history = useHistory();

    const [ applicants, setApplicants ] = useState([]);
    const [testingDatesOpen, setTestingDatesOpen] = useState(true);
    const [isMutual, setisMutual] = useState(true);
    const [ presetIndex, setIndexState ] = useState(null);
    // previous applications/bids/proposals...
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ selected, setSelected ] = useState(null);

    const redirectToViewOtherApplicant = (applicant) => {
        console.log("redirectToViewOtherApplicant applicant", applicant);

        history.push(`/view/individual/application/employer/${applicant.applicantId}`, { applicant });
    } 

    const renderEachSpecificFile = (file) => {
        switch (calculateFileType(file.type)) {
            case "png":
                return <Media className="img-fluid min-height-applicant-file-display" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} alt="" />;
                break;
            case "jpeg":
                return <Media className="img-fluid min-height-applicant-file-display" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} alt="" />;
                break;
            case "jpg":
                return <Media className="img-fluid min-height-applicant-file-display" src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} alt="" />;
                break;
            case "mp4":
                return <ReactPlayer playing={true} loop={true} width={"100%"} height={"100%"} className={"inner-player-applicant"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />;
                break;
            case "pdf":
                return <Media className="img-fluid min-height-applicant-file-display" src={require("../../../../../../../../assets/images/cant-display-file-type.png")} alt="" />;
                break;
            case "pdf":
                return <Media className="img-fluid min-height-applicant-file-display" src={require("../../../../../../../../assets/images/cant-display-file-type.png")} alt="" />;
                break;
            case "csv":
                return <Media className="img-fluid min-height-applicant-file-display" src={require("../../../../../../../../assets/images/cant-display-file-type.png")} alt="" />;
                break;
            case "xlsx":
                return <Media className="img-fluid min-height-applicant-file-display" src={require("../../../../../../../../assets/images/cant-display-file-type.png")} alt="" />;
                break;
            case "docx":
                return <Media className="img-fluid min-height-applicant-file-display" src={require("../../../../../../../../assets/images/cant-display-file-type.png")} alt="" />;
                break;
            case "video/webm":
                return <ReactPlayer playing={true} loop={true} width={"100%"} height={"100%"} className={"min-height-applicant-file-display"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />;
                break;
            default:
                break;
        }
    }

    const renderApplicantArray = (files) => {
        return (
            <Fragment>
                <Slider className={"slider-row-applicant-files-attached"} {...settings}>
                    {typeof files !== "undefined" && files.length > 0 ? files.map((file, index) => {
                        return (
                            <Fragment key={index}>
                                {renderEachSpecificFile(file)}
                            </Fragment>
                        );
                    }) : null}
                </Slider>
            </Fragment>
        );
    }

    const renderModal = () => {
        if (selected !== null) {
            return (
                <Fragment>
                    <Modal className="modal-lg modal-dialog-centered product-modal modal-applicant-data" isOpen={modalVisible}>
                        <ModalBody>
                            <ModalHeader toggle={() => setModalVisible(false)}>
                                <div className="product-box row">
                                    <Col lg="6" className="product-img">
                                        <Row>
                                            {renderApplicantArray(selected.attachedFiles)}
                                        </Row>
                                    </Col>
                                    <Col lg="6" className="product-details  text-left">
                                    <h4>{selected.applicantName}</h4>
                                    <div className="product-price">
                                        Digital/Physical: {selected.physicalOrDigitalOrBoth.label}
                                        <del>Applied {moment(selected.dateApplied).fromNow()}</del>
                                    </div>
                                    <div className="product-view">
                                        <h6 className="f-w-600">Message To Employer:</h6>
                                        <p className="mb-0">{selected.messageToEmployer}</p>
                                        <hr />
                                        <h6 className="f-w-600">Cover Letter Text:</h6>
                                        <p className="mb-0">{selected.coverLetterText}</p>
                                        <hr />
                                        <h6 className="f-w-600">Technical Hack Approach:</h6>
                                        <p className="mb-0">{selected.technicalApproachToHack}</p>
                                    </div>
                                    <div style={{ marginTop: "27.5px" }} className="product-qnty">
                                        <h6 className="f-w-600">Redirect to view other users that've applied to this same contract..</h6>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Button outline className={"btn-square-secondary text-center"} color="secondary-2x" style={{ width: "100%" }} onClick={() => redirectToViewOtherApplicant(selected)}>View/Redirect To See This Applicant</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    </Col>
                                </div>
                            </ModalHeader>
                        </ModalBody>
                    </Modal>
                </Fragment>
            );
        } else {
            return null;
        }
    }

    const redirectToHackersProfile = (hackerID) => {
        console.log("redirectToHackersProfile ran...");

        history.push(`/hacker/profile/individual/view/${hackerID}`);
    }

    useEffect(() => {
        const config = {
            params: {
                applicantId: applicantData.applicantId
            }
        };
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/applicants/previous/all/contract/app`, config).then((res) => {
            if (res.data.message === "Successfully gathered previous applications!") {
                console.log(res.data);

                const { applicants } = res.data;

                setApplicants(applicants);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error has occurred while attempting to gather 'previous applicants' - please reload the page or contact support if the problem persists!", "An error occurred while attempting to gather applicants (all previous)..", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error has occurred while attempting to gather 'previous applicants' - please reload the page or contact support if the problem persists!", "An error occurred while attempting to gather applicants (all previous)..", 4750);
        })
    }, []);

    console.log("applicants", applicants);

    return (
        <Fragment>
            {renderModal()}
            <Col xl="12">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => {
                                setTestingDatesOpen(!testingDatesOpen);
                            }}
                                data-toggle="collapse" data-target="#collapseicon5" aria-expanded={testingDatesOpen} aria-controls="collapseicon5"
                                >View General User Information
                            </Button>
                        </h5>
                        <p>You can view the user's entire profile & more by clicking the "View More" button below...</p>
                    </CardHeader>
                    <Collapse isOpen={testingDatesOpen}>
                        <CardBody className="socialprofile filter-cards-view">
                            <Media><Media className="img-50 img-fluid m-r-20 rounded-circle min-width-height" src={(typeof lastProfileItem !== "undefined" && _.has(lastProfileItem, "link")) ? `${process.env.REACT_APP_ASSET_LINK}/${lastProfileItem.link}` : profileLogoPlaceholder} alt="" />
                                <Media body>
                                    <h6 className="font-primary f-w-600">{applicantData.applicantName}</h6><span className="d-block"><span><i className="fa fa-bell-o"> </i><span className="px-2">Following <span style={{ color: "white" }} className="badge badge-pill badge-secondary">{typeof user.followingCompanies !== "undefined" && user.followingCompanies.length} Employer's</span></span></span></span><span className="d-block"><span><i className="fa fa-bell-o"></i><span className="px-2">Following <span style={{ color: "white" }} className="badge badge-pill badge-info">{typeof user.followingHackers !== "undefined" && user.followingHackers.length} Hacker's</span></span></span></span>
                                </Media>
                            </Media>
                            <div className="social-btngroup d-flex">
                                <Button outline className={"btn-square-info text-center"} color="info-2x" type="button" onClick={() => redirectToHackersProfile(applicantData.applicantId)}>View Applicant Profile</Button>
                            </div>
                            <div className="likes-profile text-center">
                                <h5><span><i className="fa fa-heart font-danger"></i>  {user !== null && typeof user.profileLovesHearts !== "undefined" ? user.profileLovesHearts.length : 0} Page Heart's</span></h5>
                            </div>
                            <div className="text-center">{`${typeof user.recentlyViewedProfileViews !== "undefined" && user.recentlyViewedProfileViews.length > 0 ? user.recentlyViewedProfileViews.length : 0} Total Unique Profile View(s)`}</div>
                            <div className="customers text-center social-group">
                                <ul>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={three} alt="ThirdImg" id="UncontrolledTooltipExample"/>
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample">
                                            {JohnyWaston}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={five} alt="FifthImg" id="UncontrolledTooltipExample1" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample1">
                                            {AndewJon}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={one} alt="FirstImg" id="UncontrolledTooltipExample2" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample2">
                                            {ComerenDiaz}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={two} alt="secondImg" id="UncontrolledTooltipExample3" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample3">
                                            {BuckyBarnes}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eight} alt="eightImg" id="UncontrolledTooltipExample4" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample4">
                                            {JasonBorne}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eleven} alt="elevenImg" id="UncontrolledTooltipExample5" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample5">
                                            {ComerenDiaz}
                                        </UncontrolledTooltip>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12">
                <Card className={"add-shadow-md-custom"}><Media className="img-fluid" alt="" src={`${process.env.REACT_APP_ASSET_LINK}/${lastProfileItem.link}`} /></Card>
            </Col>
            <Col xl="12">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisMutual(!isMutual)}
                                data-toggle="collapse" data-target="#collapseicon6" aria-expanded={isMutual} aria-controls="collapseicon6">Previously Applied Gigs/Jobs/Position's By This User</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isMutual}>
                        <CardBody className="social-status filter-cards-view">
                            <Form>
                                <FormGroup className="m-0">
                                    <Input className="form-control-social" type="search" placeholder="Search previous applications(search by 'listing title')..." />
                                </FormGroup>
                            </Form>
                            {/* social-status different types --- social-online, social-offline, social-busy */}
                            {typeof applicants !== "undefined" && applicants.length > 0 ? applicants.map((applicant, index) => {
                                // return data...
                                return (
                                    <Fragment key={index}>
                                        <Media>
                                            {renderPicVideoPreviousApplicant(typeof applicant.userData.profilePicsVideos !== "undefined" && applicant.userData.profilePicsVideos.length > 0 ? applicant.userData.profilePicsVideos[applicant.userData.profilePicsVideos.length - 1] : null)}
                                            <div className={`custom-social-status-editted social-status ${applicant.status}`}></div>
                                            <Media onMouseOver={() => {
                                                setIndexState(index);
                                            }} className={presetIndex === index ? "selected-hover-custom" : ""} body>
                                                {index === presetIndex ? <Fragment>
                                                    <div className="min-filler-height centered-both-ways">
                                                        <Button onClick={() => {
                                                            // redirect to appropriate previous listing/job/opportunity
                                                            setSelected(applicant);
                                                            setModalVisible(true);
                                                        }} style={{ width: "100%" }} outline className={"btn-pill-secondary"} color={"secondary-2x"}>View Applicant Data</Button>
                                                    </div>
                                                </Fragment> : <Fragment>
                                                    <div className="min-filler-height-noncentered">
                                                        <span style={{ color: "#a927f9" }} className="f-w-600 d-block custom-name-name">{applicant.applicantName}</span><span className="d-block custom-desc-desc"><strong style={{ textDecorationLine: "underline", color: "#7366ff" }}>Message To Employer</strong>: {applicant.messageToEmployer.slice(0, 100)}{typeof applicant.messageToEmployer !== "undefined" && applicant.messageToEmployer.length >= 100 ? "..." : ""}</span>
                                                        <hr />
                                                        <span className="d-block custom-desc-desc"><strong style={{ textDecorationLine: "underline", color: "#7366ff" }}>Cover Letter Text</strong>: {applicant.coverLetterText.slice(0, 75)}{typeof applicant.coverLetterText !== "undefined" && applicant.coverLetterText.length > 75 ? "..." : ""}</span>
                                                    </div>
                                                </Fragment>}
                                            </Media>
                                        </Media>
                                    </Fragment>
                                );
                            }) : <Fragment>
                                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                    <p>
                                        <Skeleton count={60} />
                                    </p>
                                </SkeletonTheme>
                            </Fragment>}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
        </Fragment>
    );
};

export default LeftBar;