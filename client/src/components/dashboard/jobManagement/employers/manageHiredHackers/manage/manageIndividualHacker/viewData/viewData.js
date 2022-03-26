import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react';
import "./styles.css";
import Breadcrumb from '../../../../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Media, Label } from "reactstrap";
import Slider from 'react-slick';
import ShowMoreText from "react-show-more-text";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LoadingBar from 'react-top-loading-bar';
import _ from "lodash";
import ReactPlayer from 'react-player';
import moment from 'moment';
import { Modal } from 'react-responsive-modal';
import FileViewer from 'react-file-viewer';

const ViewPreviouslySubmittedDataEmployerAccountHelper = ({ userData }) => {

    const { id } = useParams();

    const slider1 = useRef();
    const slider2 = useRef();
    const [ data, setData ] = useState(null);
    const [ expanded, setExpanded ] = useState(false);
    const [ currentFile, setCurrentFile ] = useState(null);
    const [ selected, setSelected ] = useState(null);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ scrollable, setScrollable ] = useState(0);
    const [ showProgress, setShowProgress ] = useState(true);

    const [ state, setState ] = useState({ nav1: null, nav2: null });

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
        });
    }, []);

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: userData.uniqueId,
                generatedID: id
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/hacker/submitted/information/employer/account`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered active submitted data!") {
                console.log("Successfully gathered information :... ", res.data);

                const { info } = res.data;

                setData(info);
            } else {
                console.log("ERROR gathering active/hired applications...:", res.data);

                NotificationManager.error("An unknown error occurred while attempting to fetch core information about this specific job, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
            }
        }).catch((err) => {
            console.log("CRITICAL ERROR gathering active/hired application data...:", err);

            NotificationManager.error("An unknown error occurred while attempting to fetch core information about this specific job, if this problem persists - please contact support & report this problem!", "Could NOT gather data!", 4750);
        })
    }, []);

    const calculateKey = (update) => {
        switch (update) {
            case "low":
                return "lowSeverity";
                break;
            case "medium":
                return "mediumSeverity";
                break;
            case "high":
                return "highSeverity";
                break;
            case "critical":
                return "criticalSeverity";
                break;
            default:
                break;
        }
    }

    const onScroll = () => {
        const selected = document.querySelector(".my-loading-bar-scrollable");
        const Scrolled = selected.scrollTop;
        const MaxHeight = selected.scrollHeight - selected.clientHeight;
        const ScrollPercent = (Scrolled / MaxHeight) * 100;

        setShowProgress(true);
        setScrollable(ScrollPercent);

        return handleEndScroll();
    };
    const handleEndScroll = useMemo(
        () =>
          _.debounce(() => {
            console.log("END SCROLL");

            setShowProgress(false);
          }, 1750),
        []
    );
    const calculateSevColor = (sev) => {
        switch (sev) {
            case "low":
                return "txt-success"
                break;
            case "medium":
                return "txt-primary"
                break;
            case "high":
                return "txt-secondary"
                break;
            case "critical":
                return "txt-danger"
                break;
            default:
                break;
        }
    }
    const calculateMainPicSmaller = (file) => {
        if (file.type.includes("video")) {
            // image formatted files
            return <ReactPlayer playing={true} muted={true} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className="video-preview-slider-submissions-smaller" />;
        } else if (file.type.includes("image")) {
            // video formatted files
            return <Media src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} alt="" className="img-fluid" />;
        } else {
            // all other files
            return <ReactPlayer playing={true} muted={true} url={require("../../../../../../../../assets/video/could-not-display.mp4")} className="video-preview-slider-submissions-smaller" />;
        }
    }
    const calculateMainPic = (file) => {
        if (file.type.includes("video")) {
            // image formatted files
            return <ReactPlayer playing={true} muted={true} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className="video-preview-slider-submissions" />;
        } else if (file.type.includes("image")) {
            // video formatted files
            return <Media src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} alt="" className="img-fluid" />;
        } else {
            // all other files
            return <ReactPlayer playing={true} muted={true} url={require("../../../../../../../../assets/video/could-not-display.mp4")} className="video-preview-slider-submissions" />;
        }
    }

    const calculateFileType = (type) => {
        switch (type) {
            case "video/mp4":
                return "mp4";
                break;
            case "image/png":
                return "png";
                break;
            case "image/jpeg":
                return "jpeg";
                break;
            case "image/jpg":
                return "jpg";
                break;
            case "image/gif":
                return "gif";
                break;
            case "image/bmp":
                return "bmp";
                break;
            case "application/pdf":
                return "pdf";
                break;
            case "text/csv":
                return "csv";
                break;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "xlsx";
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "docx";
                break;
            case "video/webm":
                return "webm";
                break;
            case "audio/mpeg":
                return "mp3";
                break;
            default:
                break;
        }
    };

    console.log("viewData.js submitted work state..", data, "selected", selected);
    console.log("currentFile", currentFile);
    return (
        <Fragment>
            {currentFile !== null ? <Modal classNames={{
                overlay: 'min-height-width-modal-submission-overlay',
                modal: 'min-height-width-modal-submission',
                }} open={modalOpen} onClose={() => setModalOpen(false)} center>
                <Container fluid={true}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Fragment>
                                {currentFile.type.includes("video") ? <ReactPlayer onError={(e) => console.log("E", e)} playing={true} muted={true} url={`${process.env.REACT_APP_ASSET_LINK}/${currentFile.link}`} className="min-height-width-modal-submission-inner" /> : ((calculateFileType(currentFile.type) === "jpg") || (calculateFileType(currentFile.type) === "png") || (calculateFileType(currentFile.type) === "jpeg")) ? <Fragment>
                                    <img src={`${process.env.REACT_APP_ASSET_LINK}/${currentFile.link}`} className={"min-height-width-modal-submission-inner"} />
                                </Fragment> : <Fragment>
                                    <FileViewer
                                        // errorComponent={<img src={require("../../../../../../../../assets/images/nothing-found.png")} className={"error-image-submissions"} />}
                                        fileType={calculateFileType(currentFile.type)}
                                        filePath={`${process.env.REACT_APP_ASSET_LINK}/${currentFile.link}`}
                                        onError={(err) => console.log("file err:", err)}
                                    />
                                </Fragment>}
                            </Fragment>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <a style={{ marginTop: "27.5px", width: "100%" }} href={`${process.env.REACT_APP_ASSET_LINK}/${currentFile.link}`} download className='btn btn-square-primary style-download-btn'>
                                <i className="fa fa-download mr-1"></i>
                                <div className='centered-both-ways'>
                                    Download File (Locally)
                                </div>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </Modal> : null}
            {showProgress === true ? <LoadingBar
                color={'#7366ff'}
                height={7.5}
                loaderSpeed={0}
                transitionTime={0}
                shadow={true}
                progress={scrollable}
            /> : null}
            <Breadcrumb parent="View Previously Submitted Data/Information!" title="View/Manage Your Submitted Information.."/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <Row className='spacer-submission'>
                                <h3 className='h3-submissions'>Please select a submitted 'data-chunk' on the right, after selecting a data-chunk, the information for that chunk will display on the <strong>right</strong></h3>
                                <p className='lead'>Select a data piece from the left to display the cooresponding data on the right side/page. This data will be cooresponding to whatever/whichever item you've selected.</p>
                            </Row>
                            <Row className="product-page-main">
                                <Col xl="4">
                                    <div onScroll={() => onScroll()} className={selected !== null ? "overflowy-submitted-selected my-loading-bar-scrollable" : 'overflowy-submitted my-loading-bar-scrollable'}>
                                        {data !== null && typeof data.updatesAndSubmissions !== "undefined" && data.updatesAndSubmissions.length > 0 ? data.updatesAndSubmissions.map((update, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <Card className='shadow cardspacing-submissions'>
                                                        <CardBody>
                                                            <div className="product-page-details">
                                                                <h3>{`The selected tier of a ${update.data.severity} severity report is $${update.data.relatedAttackSurface[calculateKey(update.data.severity)].toLocaleString()}`}</h3>
                                                                <p className='subheader-submitted-text'><em style={{ color: "#f73164" }}>Proof Of Concept Title</em>: {update.data.proofOfConceptTitle}</p>
                                                            </div>
                                                            <div className="product-price f-28">
                                                                ${update.data.relatedAttackSurface[calculateKey(update.data.severity)].toLocaleString()}
                                                            </div>
                                                            <hr/>
                                                                <ReactMarkdown className='submitted-work-markdown' children={update.data.proofOfConceptDesc} remarkPlugins={[remarkGfm]} />
                                                            <hr/>
                                                            <div>
                                                                <table className="product-page-width">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td> <b>Approval Status &nbsp;&nbsp;&nbsp;:</b></td>
                                                                            <td>{update.data.approval === true ? "Approved!" : "Pending.."}</td>
                                                                        </tr>
                                                                        <tr>
                                                                        <td> <b>Viewed Yet &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                                            <td className={update.data.confirmedViewed === true ? "txt-success" : "txt-danger"}>{update.data.confirmedViewed === true ? "Already Viewed!" : "Hasn't Viewed Yet.."}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td> <b>In Review? &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                                            <td>{update.data.inReviewStage === true ? "In 'Review' Stage" : "Already Reviewed!"}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td> <b>Estimated Severity &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                                            <td className={calculateSevColor(update.data.severity)}>{update.data.severity}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td> <b>Supporting File(s) &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                                            <td>{update.data.files.length} file's</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td> <b>Vulnerability/Exploit &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                                            <td>{update.data.vul.external_id}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td> <b>Employer Comment's &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                                            <td>{typeof update.data.responses !== "undefined" ? update.data.responses.length : 0} Comment's</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <hr />
                                                            <div className="m-t-15">
                                                                <Button style={{ width: "100%" }} color="primary" className="m-r-10" onClick={() => setSelected(update)} >
                                                                    <i className="fa fa-shopping-basket mr-1"></i>Select & View This Data Packet
                                                                </Button>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                </Fragment>
                                            );
                                        }) : null}
                                    </div>
                                </Col>
                                {selected !== null ? <Fragment>
                                    <Col xl="5">
                                        <Card>
                                            <CardHeader>
                                                <Slider  
                                                    afterChange={(index) => slider2.current.slickGoTo(index, false)}
                                                    asNavFor={state.nav2} 
                                                    arrows= {false}
                                                    ref={slider => (slider1.current = slider)} 
                                                    className="product-slider"
                                                >
                                                    {selected.data.files.map((file, i) => {
                                                        return (
                                                            <div onClick={() => {
                                                                console.log("clicked..");
                                                                setCurrentFile(file);
                                                                setModalOpen(true);
                                                            }} className="item" key={i}>
                                                                {calculateMainPic(file)}
                                                            </div>
                                                        )
                                                    })
                                                }  
                                                </Slider>
                                                    <Slider
                                                        afterChange={(index) => slider1.current.slickGoTo(index, false)}
                                                        asNavFor={state.nav1}
                                                        ref={slider => (slider2.current= slider)}
                                                        slidesToShow={4}
                                                        swipeToSlide={true}
                                                        focusOnSelect={true}
                                                        infinite={true}
                                                        className="small-slick">
                                                        {selected.data.files.map((file, i) => {
                                                            return (
                                                                <div onClick={() => {
                                                                    console.log("clicked..");
                                                                    setCurrentFile(file);
                                                                    setModalOpen(true);
                                                                }} className="item" key={i}>
                                                                    {calculateMainPicSmaller(file)}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Slider>
                                            </CardHeader>
                                            <CardBody>
                                            <div className="product-page-details">
                                                <Label className={"submission-label"}>Proof Of Concept Title:</Label>
                                                <h3>{selected.data.proofOfConceptTitle}</h3>
                                            </div>
                                            <div className="product-price f-28">
                                                ${selected.data.relatedAttackSurface[calculateKey(selected.data.severity)].toLocaleString()}
                                            </div>
                                            <hr/>
                                                <Label className={"submission-label"}>Proof Of Concept Description:</Label>
                                                <ReactMarkdown className='submitted-work-markdown' children={selected.data.proofOfConceptDesc} remarkPlugins={[remarkGfm]} />
                                            <hr/>
                                            <div>
                                                <table className="product-page-width">
                                                    <tbody>
                                                        <tr>
                                                            <td> <b>Created &nbsp;&nbsp;&nbsp;:</b></td>
                                                            <td>{moment(selected.date).fromNow()}</td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>Creation Date (Legible) &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                            <td>{moment(selected.date).format("MM/DD/YYYY hh:mm:ss a")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>Still In Review? &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                            <td>{selected.inReviewStage === true ? "Still in review.." : "NOT in review!"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td> <b>Work Approved &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                            <td>{selected.approval === true ? "Work has been APPROVED!" : "Still PENDING approval!"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="3 xl-cs-35">
                                        <Card>
                                            <CardBody>
                                                <div className="filter-block">
                                                    <h4>Related Attack Surface Reward(s)</h4>
                                                    <ul>
                                                        <li className='txt-success bold-custom'>Low: <em style={{ color: "#000" }}>${selected.data.relatedAttackSurface.lowSeverity.toLocaleString()}</em></li>
                                                        <li className='txt-warning bold-custom'>Medium: <em style={{ color: "#000" }}>${selected.data.relatedAttackSurface.mediumSeverity.toLocaleString()}</em></li>
                                                        <li className='txt-secondary bold-custom'>High: <em style={{ color: "#000" }}>${selected.data.relatedAttackSurface.highSeverity.toLocaleString()}</em></li>
                                                        <li className='txt-danger bold-custom'>Critical: <em style={{ color: "#000" }}>${selected.data.relatedAttackSurface.criticalSeverity.toLocaleString()}</em></li>
                                                        <li>Your <strong>selected est.</strong> severity... <strong style={{ color: "#51bb25" }}>{selected.data.severity}</strong></li>
                                                    </ul>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card>
                                            <CardBody>
                                                <div className="collection-filter-block">
                                                    <h3 className='header-desc-vul'>Vulnerability Name</h3>
                                                    <p className='lead'>{selected.data.vul.name}</p>
                                                    <hr />
                                                    <h3 className='header-desc-vul'>Vulnerability Description</h3>
                                                    <p className='lead'>{selected.data.vul.description}</p>
                                                    <hr />
                                                    <h3 className='header-desc-vul'>Vulnerability Identifier</h3>
                                                    <p className='lead'>{selected.data.vul.external_id}</p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card>
                                            <CardBody>
                                                <h4>Impact Of Hack/Vulnerability</h4>
                                                <div className="filter-block customfilterblock">
                                                    <ShowMoreText
                                                        lines={5}
                                                        more="Show more"
                                                        less="Show less"
                                                        className="content-css"
                                                        anchorClass="my-anchor-css-class"
                                                        onClick={() => setExpanded(prevState => {
                                                            return !prevState;
                                                        })}
                                                        expanded={expanded}
                                                        truncatedEndingComponent={"..."}
                                                    >
                                                        <p className='lead'>{selected.data.proofOfConceptImpact}</p>
                                                    </ShowMoreText>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Fragment> : <Fragment>
                                    <Col sm="12" md="12" lg="8" xl="8">
                                        <Card className='shadow'>
                                            <CardBody className='b-l-primary b-r-primary'>
                                                <img src={require("../../../../../../../../assets/images/3-step-existing-data.png")} className={"threestep-image"} />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Fragment>}
                            </Row>
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
export default connect(mapStateToProps, { })(ViewPreviouslySubmittedDataEmployerAccountHelper);