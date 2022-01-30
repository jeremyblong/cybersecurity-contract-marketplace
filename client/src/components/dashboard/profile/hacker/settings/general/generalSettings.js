import React, { Fragment,useEffect,useState,useRef } from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Media, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios';
import { connect } from "react-redux";
import { MyProfile,Bio,MarkJecno,Designer,Password,Website,Save,EditProfile,Company,Username,UsersCountryMenu,AboutMe,UpdateProfile,UsersTableTitle,FirstName,LastName,Address,EmailAddress,PostalCode,Country, UsersTableHeader,City,Edit,Update,Delete} from '../../../../../../constant';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import countryList from "./helpers/countryList/countries.js";
import SlidingPane from "react-sliding-pane";
import Dropzone from 'react-dropzone-uploader';
import LoadingBar from 'react-top-loading-bar'
import {NotificationManager} from 'react-notifications';
import _ from "lodash";
import AvatarEditor from 'react-avatar-editor';
import "./styles.css";
import Slider from 'rc-slider';
import { authentication } from "../../../../../../redux/actions/authentication/auth.js";
import {
    yearOptions,
    options
} from "./helpers/options/selectionOptions.js";
import ReactPlayer from 'react-player';
import "./styles.css";

const GeneralSettingsHelper = ({ userData, authentication }) => {
    const [ yearsOfExperience, setYearsOfExperience ] = useState(null);
    const [birthdate, setBirthDate] = useState(new Date());
    const [ file, setFile ] = useState(null);
    const [ values, setValues ] = useState({
        title: "", 
        firstName: "", 
        publicEmailAddress: "", 
        lastName: "",
        addressLineOne: "", 
        addressPostalCode: "",
        country: "",
        addressCity: "",
        aboutMe: ""
    });
    const [ data, setData] = useState([]);
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [ progress, setProgress ] = useState(0);
    const [ personal, setPersonalData ] = useState({});
    const [ zoom, setZoom ] = useState(1);
    const editor = useRef(null);

    const [pane, setPane] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
    });
    useEffect(() => {
        console.log("mounted.", userData.uniqueId);

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/general/user/data`, {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }).then((res) => {
            if (res.data.message === "Gathered user!") {
                console.log(res.data);

                const { user } = res.data;

                setPersonalData(user);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    const handleChangeExp = (selected) => {
        setYearsOfExperience(selected);
    }
    const handleChange = (selected) => {
        setSelectedOption(selected);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }); 
    }
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } };

    const handleChangeStatus = ({ meta, file }, status) => {
        console.log("handleChangeStatus ran. - :", meta, file, status);

        setFile(file);
    }
    const handleProfilePicUpload = () => {
        console.log("handleProfilePicUpload clicked.");

        if (!file.type.includes("video")) {
            const modifiedFile64 = editor.current.getImageScaledToCanvas().toDataURL();

            setPane(prevState => {
                return {
                    ...prevState,
                    isPaneOpen: false
                }
            });
    
            NotificationManager.info(`We've started uploading your new profile picture!`, "Uploading content!", 4500);
    
            const data = new FormData();
    
            data.append("file", null);
            data.append("mimetype", file.type);
            data.append("name", file.name);
            data.append("base64", modifiedFile64);
            data.append("video", false);
            data.append("uniqueId", userData.uniqueId);
    
            const config = {
                onUploadProgress: function(progressEvent) {
                  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
                  console.log("percentCompleted", percentCompleted);
    
                  setProgress(percentCompleted);
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            axios.post(`${process.env.REACT_APP_BASE_URL}/upload/profile/picture/video/hacker`, data, config).then((res) => {
                if (res.data.message === "Successfully uploaded content!") {
                    console.log(res.data);

                    const { file } = res.data;

                    if (typeof personal.profilePicsVideos !== "undefined" && personal.profilePicsVideos.length > 0) {
                        setPersonalData(prevState => {
                            return {
                                ...prevState,
                                profilePicsVideos: [...personal.profilePicsVideos, file]
                            }
                        });
                    } else {
                        setPersonalData(prevState => {
                            return {
                                ...prevState,
                                profilePicsVideos: [file]
                            }
                        });
                    }
    
                    NotificationManager.success('Successfully uploaded your data! Your new profile picture is now live.', 'Successfully uploaded data!', 4500);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            setPane(prevState => {
                return {
                    ...prevState,
                    isPaneOpen: false
                }
            });
    
            NotificationManager.info(`We've started uploading your new profile video!`, "Uploading content!", 4500);
    
            const data = new FormData();
    
            data.append("file", file);
            data.append("video", true);
            data.append("uniqueId", userData.uniqueId);
    
            const config = {
                onUploadProgress: function(progressEvent) {
                  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    
                  console.log("percentCompleted", percentCompleted);
    
                  setProgress(percentCompleted);
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            axios.post(`${process.env.REACT_APP_BASE_URL}/upload/profile/picture/video/hacker`, data, config).then((res) => {
                if (res.data.message === "Successfully uploaded content!") {
                    console.log(res.data);

                    const { file } = res.data;

                    if (typeof personal.profilePicsVideos !== "undefined" && personal.profilePicsVideos.length > 0) {
                        setPersonalData(prevState => {
                            return {
                                ...prevState,
                                profilePicsVideos: [...personal.profilePicsVideos, file]
                            }
                        });
                    } else {
                        setPersonalData(prevState => {
                            return {
                                ...prevState,
                                profilePicsVideos: [file]
                            }
                        });
                    }
    
                    NotificationManager.success('Successfully uploaded your data! Your new profile video is now live.', 'Successfully uploaded data!', 4500);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const renderPhotoOrVideo = (avatar) => {
        console.log("avatar :", avatar);

        if (avatar.dataType === "image") {
            return (
                <Media onClick={() => {
                    setPane(prevState => {
                        return {
                            ...prevState,
                            isPaneOpen: true
                        }
                    })
                }} className="img-70 rounded-circle hover-rounded-circle" alt="" src={`${process.env.REACT_APP_ASSET_LINK}/${avatar.link}`} />
            );
        } else if (avatar.dataType === "video") {
            return (
                <div onClick={() => {
                    setPane(prevState => {
                        return {
                            ...prevState,
                            isPaneOpen: true
                        }
                    })
                }} className={"hover-rounded-circle-video"}>
                    <ReactPlayer playing={true} muted={true} style={{ maxWidth: "75px", maxHeight: "75px" }} url={`${process.env.REACT_APP_ASSET_LINK}/${avatar.link}`} />
                </div>
            );
        } else {
            return (
                <Media onClick={() => {
                    setPane(prevState => {
                        return {
                            ...prevState,
                            isPaneOpen: true
                        }
                    })
                }} className="img-70 rounded-circle hover-rounded-circle" alt="" src={require("../../../../../../assets/images/user/7.jpg")} />
            );
        }
    }
    const handleRightProfileUpdate = (e) => {

        e.preventDefault();

        const { title, firstName, publicEmailAddress, lastName, addressLineOne, addressPostalCode, country,addressCity, aboutMe } = values;

        if ((typeof addressLineOne !== "undefined" && addressLineOne.length > 0) || (typeof addressCity !== "undefined" && addressCity.length > 0) || (typeof country !== "undefined" && country.length > 0) || (typeof addressPostalCode !== "undefined" && addressPostalCode.length > 0)) {
            if ((typeof addressLineOne !== "undefined" && addressLineOne.length > 0) && (typeof addressCity !== "undefined" && addressCity.length > 0) && (typeof country !== "undefined" && country.length > 0) && (typeof addressPostalCode !== "undefined" && addressPostalCode.length > 0)) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/update/hacker/profile/information/basic`, {
                    title, 
                    firstName, 
                    publicEmailAddress, 
                    lastName, 
                    addressLineOne, 
                    addressPostalCode, 
                    country, 
                    addressCity, 
                    aboutMe,
                    gender: selectedOption,
                    yearsOfExperience,
                    birthdate,
                    id: userData.uniqueId
                }).then((res) => {
                    if (res.data.message === "Successfully updated profile data!") {
                        console.log(res.data);
        
                        const { user } = res.data;
        
                        authentication(user);
        
                        setValues({
                            title: "", 
                            firstName: "", 
                            publicEmailAddress: "", 
                            lastName: "",
                            addressLineOne: "", 
                            addressPostalCode: "",
                            country: "",
                            addressCity: "",
                            aboutMe: ""
                        });
                        setBirthDate(new Date());
                        setYearsOfExperience(null);
                        setSelectedOption(null);

                        NotificationManager.success(`We've successfully updated your profile information with your newly entered data, Check out your public profile to see the changes.`, 'Successfully updated profile data!', 4000);
                    } else {
                        console.log("err", res.data);

                        NotificationManager.error(`An error occurred while attempting to save your new data - we were unable to successfully update your profile.`, 'An error occurred while saving...', 4000);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                NotificationManager.warning('You must complete all address related fields if updating one of the address fields - address, zipcode, country and city. Please update all 4 fields for your new address...', 'Update address information!', 5500);
            }
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/update/hacker/profile/information/basic`, {
                title, 
                firstName, 
                publicEmailAddress, 
                lastName, 
                addressLineOne, 
                addressPostalCode, 
                country, 
                addressCity, 
                aboutMe,
                gender: selectedOption,
                yearsOfExperience,
                birthdate,
                id: userData.uniqueId
            }).then((res) => {
                if (res.data.message === "Successfully updated profile data!") {
                    console.log(res.data);
    
                    const { user } = res.data;
    
                    authentication(user);
    
                    setValues({
                        title: "", 
                        firstName: "", 
                        publicEmailAddress: "", 
                        lastName: "",
                        addressLineOne: "", 
                        addressPostalCode: "",
                        country: "",
                        addressCity: "",
                        aboutMe: ""
                    });
                    setBirthDate(new Date());
                    setYearsOfExperience(null);
                    setSelectedOption(null);

                    NotificationManager.success(`We've successfully updated your profile information with your newly entered data, Check out your public profile to see the changes.`, 'Successfully updated profile data!', 4000);
                } else {
                    console.log("err", res.data);

                    NotificationManager.error(`An error occurred while attempting to save your new data - we were unable to successfully update your profile.`, 'An error occurred while saving...', 4000);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    console.log("personal", personal);
    return (
        <Fragment>
        <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            className="loadingBarRaise"
            containerClassName="loadingBarRaise"
            height={5}
        />
        <Breadcrumb parent="Hacker Account" title="Edit Profile" />
        <Container fluid={true}>
            <div className="edit-profile">
            <Row>
                <Col xl="4">
                <Card>
                    <CardHeader>
                    <h4 className="card-title mb-0">{MyProfile}</h4>
                    <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                        <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                        <i className="fe fe-x"></i>
                        </a>
                    </div>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <Row className="mb-2">
                        <div className="col-auto">
                            {(!_.isEmpty(personal) && _.has(personal, "profilePicsVideos") && personal.profilePicsVideos.length > 0) ? renderPhotoOrVideo(personal.profilePicsVideos[personal.profilePicsVideos.length - 1]) : <Media onClick={() => {
                                setPane(prevState => {
                                    return {
                                        ...prevState,
                                        isPaneOpen: true
                                    }
                                })
                            }} className="img-70 rounded-circle hover-rounded-circle" alt="" src={require("../../../../../../assets/images/user/7.jpg")} />}
                        </div>
                        <Col>
                            <h3 className="mb-1">{`${userData.firstName} ${userData.lastName}`}</h3>
                            <p className="mb-4">{userData.fullyVerified === true ? "Fully-verified Account" : "Un-verified Account"}</p>
                        </Col>
                        </Row>
                        <FormGroup>
                        <h6 className="form-label">{Bio}</h6>
                        <Input type="textarea" className="form-control" rows="5" defaultValue="On the other hand, we denounce with righteous indignation" />
                        </FormGroup>
                        <FormGroup>
                        <Label className="form-label">{EmailAddress}</Label>
                        <Input className="form-control" placeholder="your-email@domain.com" />
                        </FormGroup>
                        <FormGroup>
                        <Label className="form-label">{Password}</Label>
                        <Input className="form-control" type="password" defaultValue="password" />
                        </FormGroup>
                        <FormGroup>
                        <Label className="form-label">{Website}</Label>
                        <Input className="form-control" placeholder="http://yourwebsite.com" />
                        </FormGroup>
                        <FormGroup>
                        <Label className="form-label">GitHub Profile</Label>
                        <Input className="form-control" placeholder="http://yourgithuburl.com" />
                        </FormGroup>
                        <FormGroup>
                        <Label className="form-label">YouTube Profile</Label>
                        <Input className="form-control" placeholder="http://youtubeURL.com" />
                        </FormGroup>
                        <div className="form-footer">
                        <button className="btn btn-primary btn-block">{Save}</button>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
                </Col>
                <Col xl="8">
                <Form className="card">
                    <CardHeader>
                    <h4 className="card-title mb-0">{EditProfile}</h4>
                    <h6 className="text-left" style={{ paddingTop: "10px" }}>Only updated fields will be modified in our records, if you leave a field blank - it will remain as it was previously.</h6>
                    <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                        <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                        <i className="fe fe-x"></i>
                        </a>
                    </div>
                    </CardHeader>
                    <CardBody>
                    <Row>
                        <Col lg="4">
                        <FormGroup>
                            <Label className="form-label">Title/Speciality Name</Label>
                            <Input value={values.title} className="form-control" onChange={handleInputChange} name="title" type="text" placeholder="Eg. Full-stack software engineer" />
                        </FormGroup>
                        </Col>
                        <Col sm="6" md="3">
                        <FormGroup>
                            <Label className="form-label">Gender</Label>
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                options={options}
                            />
                        </FormGroup>
                        </Col>
                        <Col sm="6" md="4">
                        <FormGroup>
                            <Label className="form-label">{EmailAddress}</Label>
                            <Input value={values.publicEmailAddress} className="form-control" onChange={handleInputChange} name="publicEmailAddress" type="email" placeholder="Public Email Address" />
                        </FormGroup>
                        </Col>
                        
                        <Col sm="6" md="6">
                        <FormGroup>
                            <Label className="form-label">{FirstName}</Label>
                            <Input value={values.firstName} className="form-control" type="text" onChange={handleInputChange} name="firstName" placeholder="First Name" />
                        </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                        <FormGroup>
                            <Label className="form-label">{LastName}</Label>
                            <Input value={values.lastName} className="form-control" onChange={handleInputChange} name="lastName" type="text" placeholder="Last Name" />
                        </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                        <FormGroup>
                            <Label className="form-label">Years of Experience</Label>
                            <Select
                                value={yearsOfExperience}
                                onChange={handleChangeExp}
                                options={yearOptions}
                            />
                        </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                        <FormGroup>
                            <Label className="form-label">Birthdate</Label>
                            <DatePicker maxDate={new Date()} yearDropdownItemNumber={100} peekNextMonth scrollableYearDropdown={true} showYearDropdown={true} selected={birthdate} onChange={(date) => setBirthDate(date)} />
                        </FormGroup>
                        </Col>
                        <Col md="12">
                        <FormGroup>
                            <Label className="form-label">{Address}</Label>
                            <Input value={values.addressLineOne} className="form-control" onChange={handleInputChange} name="addressLineOne" type="text" name="addressLineOne" placeholder="Home Address" />
                        </FormGroup>
                        </Col>
                        <Col sm="6" md="4">
                        <FormGroup>
                            <Label className="form-label">{City}</Label>
                            <Input value={values.addressCity} className="form-control" onChange={handleInputChange} name="addressCity" type="text" placeholder="City" />
                        </FormGroup>
                        </Col>
                        <Col sm="6" md="3">
                        <FormGroup>
                            <Label className="form-label">{PostalCode}</Label>
                            <Input value={values.addressPostalCode} className="form-control" onChange={handleInputChange} name="addressPostalCode" type="tel" placeholder="ZIP Code" />
                        </FormGroup>
                        </Col>
                        <Col md="5">
                        <FormGroup>
                            <Label className="form-label">{Country}</Label>
                            <Input value={values.country} type="select" onChange={handleInputChange} name="country" className="form-control btn-square">
                            {countryList.map((items,i) => 
                                <option key={i}>{items}</option>
                            )}
                            </Input>
                        </FormGroup>
                        </Col>
                        <Col md="12">
                        <div className="form-group mb-0">
                            <Label className="form-label">{AboutMe}</Label>
                            <Input value={values.aboutMe} type="textarea" className="form-control" rows="5" onChange={handleInputChange} name="aboutMe" placeholder="Enter About your description" />
                        </div>
                        </Col>
                    </Row>
                    </CardBody>
                    <CardFooter className="text-right">
                    <button onClick={handleRightProfileUpdate} className="btn btn-primary" type="submit">{UpdateProfile}</button>
                    </CardFooter>
                </Form>
                </Col>
            </Row>
            </div>
        </Container>
        <SlidingPane
            isOpen={pane.isPaneOpen}
            title="Upload profile picture/video!"
            subtitle="Upload a profile picture or video to your profile..."
            from="right"
            overlayClassName={"overlaySlide"}
            onRequestClose={() => {
                setPane(prevState => {
                    return {
                        ...prevState,
                        isPaneOpen: false
                    }
                })
            }}
        >
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="12" md="12">
                        <h3 style={{ paddingBottom: "20px" }} className="text-left">Upload a short video snippet or profile picture with the uploader.</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Profile Picture/Video</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="dz-message needsclick">
                                        <Dropzone
                                            accept={"image/*, video/*"}
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            maxFiles={1}
                                            multiple={false}
                                            canCancel={false}
                                            inputContent="Drop A File"
                                            styles={{
                                                dropzone: { height: 200 },
                                                dropzoneActive: { borderColor: 'green' },
                                            }}
                                        />
                                        <hr />
                                        {file !== null && !file.type.includes("video") ? <div className="mx-auto horizontally-centered">
                                        <div className="mx-auto horizontally-centered">
                                            <div className="row-custom">
                                                <AvatarEditor
                                                    ref={editor}
                                                    image={file}
                                                    width={350}
                                                    height={350}
                                                    border={50}
                                                    color={[0, 0, 0, 0.6]}
                                                    scale={zoom}
                                                    rotate={0}
                                                />
                                                <hr />
                                                <Slider min={1} max={5} value={zoom} onChange={(value) => {
                                                    setZoom(value);
                                                }} />
                                            </div>
                                            </div>
                                        </div> : null}
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <div className="centered" style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                            <div className="centered">
                                <button onClick={handleProfilePicUpload} style={{ width: "50%", margin: "0 auto" }} className="btn btn-secondary btn-block">Upload Picture/Video</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </SlidingPane>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { authentication })(GeneralSettingsHelper);
