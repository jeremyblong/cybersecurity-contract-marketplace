import React, { Fragment, Component } from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardHeader, Media, CardBody, Button, Form, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { renderProfilePicVideo } from "./helpers/miscFunctions/index.js";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import Sheet from 'react-modal-sheet';
import Dropzone from 'react-dropzone-uploader';
import "./styles.css";
import ReactCrop from 'react-image-crop';
import { confirmAlert } from 'react-confirm-alert';
import { getCroppedImg } from "./helpers/croppingBannerImage/getCroppedImage.js";
import { connect } from "react-redux";
import _ from "lodash";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import moment from 'moment';


class PersonalProfileDetailsMainHelper extends Component {
constructor(props) {
    super(props);


    this.state = {
        aspect: 16 / 9,
        file: null,
        unmodifiedFile: null,
        submissionButton: false,
        currentHeight: 550,
        currentWidth: 800,
        progress: 0,
        data: null,
        isOpen: false,
        errorUpload: "",
        popoverOpen: false,
        location: null
    }
}
    handleVerificationRedirect = (e) => {
        e.preventDefault();

        console.log("handle redirect verification link");

        this.props.history.push("/start/verification/flow");
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/general/user/data`, {
            params: {
                id: this.props.userData.uniqueId,
                accountType: "hackers"
            }
        }).then((res) => {
            if (res.data.message === "Gathered user!") {
                console.log(res.data);

                const { user } = res.data;

                if (_.has(user, "userLatestLocation")) {
                    axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${encodeURIComponent(user.userLatestLocation.latitude)},${encodeURIComponent(user.userLatestLocation.longitude)}.json?key=${process.env.REACT_APP_TOMTOM_API_KEY}&countrySet=US`).then((res) => {
                        if (res.data) {
                            console.log("res.data", res.data);
                            
                            const { addresses } = res.data;

                            this.setState({
                                location: addresses[0].address.municipality,
                                data: user
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        data: user
                    })
                }
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    getUploadParams = ({ meta }) => { 
        return { url: 'https://httpbin.org/post' } 
    };
    handleChangeStatus = ({ meta, file }, status) => {
        console.log("collected - : ", meta, file, status);

        if (status === "done") {
            if (meta.height >= 2500 && meta.width >= 3000) {
                this.setState({
                    file: URL.createObjectURL(file),
                    unmodifiedFile: file,
                    errorUpload: ""
                })
            } else {
                this.setState({
                    errorUpload: "Please select another photo that meets the minimum dimension requirements. Remove the pending 'preview' image previously uploaded to select another more appropriate file for a better quality final image."
                }, () => {
                    NotificationManager.warning(`Error ~ Your photo/image MUST be at least 3000px by 2500px (width by height) - please select a file that meets these conditions...`, 'Image size is too small!', 4500);
                })
            }
        } else if (status === "removed") {
            this.setState({
                file: null,
                unmodifiedFile: null,
                errorUpload: ""
            })
        }
    }
    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cb(reader.result)
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }
    handleBannerFinalSelectionUpload = async () => {
        console.log("handleBannerFinalSelectionUpload ran!");

        const { aspect, unmodifiedFile, file } = this.state;

        const handleCompletionChunk = (croppedImg) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/upload/banner/photo/hacker/profile`, {
                base64: croppedImg,
                uniqueId: this.props.userData.uniqueId,
                contentType: unmodifiedFile.type,
                filename: unmodifiedFile.name
            }).then((res) => {
                if (res.data.message === "Successfully uploaded content!") {
                    console.log(res.data);
    
                    const { generatedID, file } = res.data;
    
                    this.setState({
                        data: {
                            ...this.state.data,
                            profileBannerImage: file
                        },
                        isOpen: false
                    }, () => {
                        NotificationManager.success(`We've successfully uploaded & updated your profile banner photo - it is now live/public!`, 'Banner photo uploaded!', 4500);
                    })
                } else {
                    console.log("err", res.data);
    
                    NotificationManager.danger(`An error occurred while attempting to upload your banner photo - please try again or contact support if the problem persists...`, 'Failure occurred uploading banner!', 4500);
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        const img = new Image();

        img.onload = () => {
            console.log("loaded :) !");

            const croppedImg = getCroppedImg(img, aspect, unmodifiedFile.type);

            console.log("croppedImg : ", croppedImg);

            handleCompletionChunk(croppedImg);
        }
        img.onerror = (err) => {
          console.log("err", err);
        }

        this.getBase64(unmodifiedFile, (result) => {
            console.log("getBase64 ran...");
            img.src = result;
        });
    }
    initializeConfirmation = () => {
        confirmAlert({
            title: 'Confirm cropped area/region',
            message: 'Are you happy with the selected region/area that was cropped or would you like to make an edit?',
            buttons: [
              {
                label: `Yes, it's fine!`,
                onClick: () => {
                    console.log("yes.");

                    this.handleBannerFinalSelectionUpload();
                }
              },
              {
                label: 'No, Re-crop!',
                onClick: () => {
                    console.log("No.");
                }
              }
            ],
            overlayClassName: "overlay-superiority"
        });
    }
    onImageLoaded = image => {
        this.setState({ 
            aspect: { width: this.state.currentWidth, height: this.state.currentHeight },
            submissionButton: true
        });

        return false; 
    };
    handleBasicInfoModificationRedirect = () => {
        console.log("handleBasicInfoModificationRedirect ran!");

        this.setState({
            popoverOpen: false
        }, () => {
            this.props.history.push("/profile/settings/edit");
        })
    }
    render() {
        const { aspect, file, submissionButton, data, errorUpload } = this.state;

        console.log("user data!", data);

        return (
            <Fragment>
                <Breadcrumb parent="Profile data" title="Hacker Profile" />
                <Sheet disableDrag={true} isOpen={this.state.isOpen} onClose={() => {
                    this.setState({
                        isOpen: false
                    })
                }}>
                    <Sheet.Container>
                    <Sheet.Header>
                        <div className="header-space-edges">
                            <Button onClick={() => {
                                this.setState({
                                    file: null,
                                    isOpen: false
                                })
                            }} style={{ width: "100%" }} color="secondary">Close/Exit Pane</Button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <Row>
                            <Col md="12" lg="12" xl="12" sm="12">
                                <Card>
                                    <CardHeader>
                                        <h5>Upload New Banner Photo (Single-File)</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <div className="dz-message needsclick">
                                                {typeof errorUpload !== "undefined" && errorUpload.length > 0 ? <p className="lead text-left" style={{ color: "darkred" }}>{errorUpload}</p> : null}
                                                <Dropzone
                                                    getUploadParams={this.getUploadParams}
                                                    onChangeStatus={this.handleChangeStatus}
                                                    maxFiles={1}
                                                    multiple={false}
                                                    canCancel={false}
                                                    accept="image/*"
                                                    inputContent="Drop A File (ONLY Images Accepted)"
                                                    styles={{
                                                        dropzone: { height: 325 },
                                                        dropzoneActive: { borderColor: 'green' },
                                                    }}
                                                />
                                            </div>
                                        </Form>
                                        {file !== null ? <div className="lower-crop-container">
                                            <div className="lower-crop-container-inner">
                                                <p className="crop-helper-text">Please crop your image before continuing with the upload process. Note: The minimum dimensions for cropped images are {this.state.currentWidth}px by {this.state.currentHeight}px (Width/Height) - crops will only work when the selected region has enough room to span the entire width (left to right) of the "default crop box"</p>
                                                <hr />
                                                <div className="center-selected-content">
                                                    {submissionButton === true ? <Button onClick={() => {
                                                        this.initializeConfirmation();
                                                    }} style={{ width: "100%" }} color="primary">Confirm Cropped Image & Upload</Button> : null}
                                                    <hr />
                                                    <ReactCrop onImageLoaded={this.onImageLoaded} imageStyle={{ border: "2px solid black" }} minWidth={this.state.currentWidth} minHeight={this.state.currentHeight} src={file} crop={aspect} onChange={newCrop => {
                                                        this.setState({
                                                            aspect: newCrop
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                        </div> : null}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop />
                </Sheet>
                <Container fluid={true}>
                    <div className="user-profile">
                    <Row>
                        <Col sm="12">
                        <Card className="card hovercard text-center">
                            <CardHeader id="override-cardheader">
                                {_.has(data, "profileBannerImage") ? <img src={`${process.env.REACT_APP_ASSET_LINK}/${data.profileBannerImage.link}`} id="banner-photo-cover-all" /> : <img src={require('../../../../../../assets/images/banner/2.jpg')} id="banner-photo-cover-all" />}
                                <img src={require('../../../../../../assets/icons/edit-image.png')} onClick={() => {
                                    this.setState({
                                        isOpen: true
                                    })
                                }} className="absolute-img-top-right" />
                            </CardHeader>
                            <div className="user-image">
                            <div className="avatar">
                                {renderProfilePicVideo(data !== null && typeof data.profilePicsVideos !== "undefined" && data.profilePicsVideos.length > 0 ? data.profilePicsVideos : null)}
                            </div>
                                <div id="Popover1" onClick={() => {
                                    this.setState({
                                        popoverOpen: true
                                    })
                                }} className="icon-wrapper" data-intro="Change Profile image here">
                                    <i className="icofont icofont-pencil-alt-5">
                                        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={() => {
                                            this.setState({
                                                popoverOpen: !this.state.popoverOpen
                                            })
                                        }}>
                                            <PopoverHeader>Update Profile Picture?</PopoverHeader>
                                            <PopoverBody>
                                            Would you like to update your profile pic and/or basic profile information? The button below will redirect you appropriately if choose to.
                                            <hr />
                                            <Button style={{ width: "100%" }} onClick={this.handleBasicInfoModificationRedirect} color="secondary">Redirect Me!</Button>
                                            </PopoverBody>
                                        </Popover>
                                    </i>
                                </div>
                            </div>
                            <div className="info">
                            <Row>
                                <Col sm="6" lg="4" className="order-sm-1 order-xl-0">
                                <Row >
                                    <Col md="6">
                                    <div className="ttl-info text-left">
                                        <h6><i className="fa fa-envelope mr-2"></i> Email Address</h6><span>{data !== null ? data.email : "Loading/Not-Available"}</span>
                                    </div>
                                    </Col>
                                    <Col md="6">
                                    <div className="ttl-info text-left ttl-sm-mb-0">
                                        <h6><i className="fa fa-calendar"></i>  Date Of Birth</h6><span>{_.has(data, "birthdate") ? moment(data.birthdate).format("MM/DD/YYYY") : "Loading/Not-Available"}</span>
                                    </div>
                                    </Col>
                                </Row>
                                </Col>
                                <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
                                <div className="user-designation">
                                    <div className="title"><a target="_blank" href={null}>{data !== null ? `${data.firstName} ${data.lastName}` : "Loading/Not-Available"}</a></div>
                                    <div className="desc mt-2">{data !== null ? data.accountType === "hackers" ? "Hacker Account" : "Employer Account" : "Loading/Not-Available"}</div>
                                </div>
                                </Col>
                                <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
                                <Row>
                                    <Col md="6">
                                    <div className="ttl-info text-left ttl-xs-mt">
                                        <h6><i className="fa fa-phone"></i>  Contact Number (*Private*)</h6><span>{data !== null ? data.phoneNumber : "Loading/Not-Available"}</span>
                                    </div>
                                    </Col>
                                    <Col md="6">
                                    <div className="ttl-info text-left ttl-sm-mb-0">
                                        <h6><i className="fa fa-location-arrow"></i>  Approx. Location</h6><span>{this.state.location !== null ? this.state.location : "Loading/Not-Available"}</span>
                                    </div>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                            <hr />
                            <div className="social-media step4" data-intro="This is your Social details">
                                <ul className="list-inline">
                                <li className="list-inline-item"><a href={null}><i className="fa fa-facebook"></i></a></li>
                                <li className="list-inline-item"><a href={null}><i className="fa fa-google-plus"></i></a></li>
                                <li className="list-inline-item"><a href={null}><i className="fa fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a href={null}><i className="fa fa-instagram"></i></a></li>
                                <li className="list-inline-item"><a href={null}><i className="fa fa-rss"></i></a></li>
                                </ul>
                            </div>
                            <div className="follow">
                                <Row>
                                    {data !== null ? <Fragment>
                                        <Col col="6" className="text-md-right border-right">
                                            <div className="follow-num counter">{data.followingHackers.length + data.followingCompanies.length}</div><span>Total Follow(ing)</span>
                                        </Col>
                                        <Col col="6" className="text-md-left">
                                            <div className="follow-num counter">{data.currentlyFollowedBy.length}</div><span>Total Follower(s)</span>
                                        </Col>
                                    </Fragment> : <Fragment>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={20} />
                                        </p>
                                    </SkeletonTheme>
                                    </Fragment>}
                                </Row>
                            </div>
                            </div>
                        </Card>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col sm="12" md="12" lg="6" xl="6">
                        <Card>
                            <CardHeader className="b-l-primary border-3">
                                <h5>Account Verification</h5>
                            </CardHeader>
                            <CardBody>
                                <p>Verify your account to show employer's you're safe to hire & serious about your duties/responsibilities on this platform. We recommend employer's to <strong style={{ color: "blue" }}>NOT</strong> hire hacker's with accounts that are in primarily an <em style={{ color: "blue" }}>"un-verified"</em> state.</p>
                                <hr />
                                <Button style={{ width: "100%" }} onClick={this.handleVerificationRedirect} color="secondary">Start Verification!</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="12" lg="6" xl="6">
                        <Card>
                            <CardHeader className="b-l-primary border-3">
                                <h5>Would you like to 'modify' your <strong>core</strong> account data/information?</h5>
                            </CardHeader>
                            <CardBody>
                                <p>You will need to select the button below to 'redirect' to the appropriate page to make the required/preferred changes to your own personal account..</p>
                                <hr />
                                <Button style={{ width: "100%" }} onClick={() => {
                                    this.props.history.push("/profile/settings/edit")
                                }} className={"btn-square-success"} outline color="success-2x">Redirect & Modify 'Core' Profile Information</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(withRouter(PersonalProfileDetailsMainHelper));
