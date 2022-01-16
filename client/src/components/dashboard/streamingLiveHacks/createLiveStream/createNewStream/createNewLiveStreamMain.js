import React, { Fragment, useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button, Link, NavLink, Nav, NavItem, TabPane, TabContent, Media, Label } from 'reactstrap'
import { Database, Grid, Upload, Code } from 'react-feather';
import axios from "axios";
import "./styles.css";
import _ from "lodash";
import { NotificationManager } from "react-notifications";
import { useForm, Controller } from 'react-hook-form';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import hookFormHelpers from "./helpers/helperFunctions.js";
import Select from "react-select";
import nonFormHelpers from "./helpers/nonFormHelpers.js";


// redux-form-hook helpers
const handleSubcategoryCheckerChange = hookFormHelpers().handleSubcategoryCheckerChange; 
const subcategoryChecker = hookFormHelpers().subcategoryChecker;
const listingTitleChecker = hookFormHelpers().listingTitleChecker;
const mainDescriptionChecker = hookFormHelpers().mainDescriptionChecker;
// NON-form helper functions
const { HashtagHelper, languageList } = nonFormHelpers;


const subcategoryOptions = [
    { value: 'malware-related', label: 'Malware Related Codes' },
    { value: 'phishing', label: 'Phishing' },
    { value: "cross-site-scripting-xss", label: "Cross Site Scripting (XSS)" },
    { value: "denial-of-service", label: "Denial Of Service (DDoS)" },
    { value: "session-hijacking-man-in-middle", label: "Session Hijacking & Man-In-Middle Attacks" },
    { value: "macro-malware-in-documents", label: "Macro-Malware In Documents" },
    { value: "iot-attack", label: "IoT Attack" },
    { value: "clickjacking-ui-redress", label: "Clickjacking/UI Redress" },
    { value: "dns-spoofing", label: "DNS Spoofing" },
    { value: "watering-hole-attack", label: "Watering Hole Attack" },
    { value: "keylogger-attack", label: "Keylogger Attack" },
    { value: "bruteforce-attack", label: "Brute-Force Attack" },
    { value: "dictionary-attack", label: "Dictionary Attack" },
    // easy/lazy BELOW
    { value: "credential-reuse", label: "Credential Reuse" },
    { value: 'sql-injection-attack', label: 'SQL Injection Attack' },
    { value: "fake-wap", label: "Fake WAP" },
    { value: "bait-and-switch", label: "Bait & Switch" },
    { value: "browser-locker", label: "Browser Locker" },
    // easy/lazy ABOVE
];
const CreateNewLiveStreamAsHackerHelper = ({  }) => {
    // refs initialization
    const subCategoryRefSelector = useRef(null);
    const codingLanguageSelectRef = useRef(null);
    // initialize state obj's
    const [searchTerm, setSearchTerm] = useState("");
    const [ tabbedPaneActive, setTabbedPaneActive ] = useState("1");
    const [ streamKey, setStreamKey ] = useState(null);
    const [ streamInfo, setStreamInfo ] = useState(null);
    const [ playbackStream, setPlaybackStream ] = useState(null);
    const [ visibility, setVisibility ] = useState(null);
    const [ languageOptionsState, setLanguageSelectorOptions ] = useState(null);
    const [ selectedMainCategory, setSelectedMainCategoryState ] = useState("none-selected")


    // react-hook-form logic - initialization
    const { register, handleSubmit, control, watch, setValue, getValues, setError, values, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    useEffect(() => {
        // component mounted
        const languagePromise = new Promise((resolve, reject) => {
            const newLanguageReformattedArray = [];

            for (let index = 0; index < languageList.length; index++) {
                const language = languageList[index];
                
                newLanguageReformattedArray.push({
                    label: language.name,
                    value: language.name
                });
                if ((languageList.length - 1) === index) {
                    resolve(newLanguageReformattedArray);
                }
            }
        })

        languagePromise.then((array) => {
            setLanguageSelectorOptions(array);
        })
    },[])

    const handleChange = event => {
        event.preventDefault();
        setSearchTerm(event.target.value)
    };
    const handleLiveStreamStart = () => {
        console.log("handleLiveStream start...");
        
        axios.get(`${process.env.REACT_APP_BASE_URL}/create/live/stream/stream/key`).then((res) => {
            if (res.data.message === "We've generated your stream key!") {
                console.log(res.data);
                // pull off streamKey
                const { streamKey, result } = res.data;

                const playbackID = `https://stream.mux.com/${result.playback_ids[0].id}.m3u8 `;

                setPlaybackStream(playbackID);

                navigator.clipboard.writeText(streamKey);

                NotificationManager.success("Successfully copied 'Stream Key' to 'Clipboard' & it is now ready to be pasted!", 'COPIED STREAM KEY TO CLIPBOARD!', 4750);

                setStreamKey(streamKey);
                setStreamInfo(result);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const renderFormError = (e, errors) => {
        console.log(e, errors);
    }
    const renderBeforeReadyLogic = () => {
        const currentValues = getValues();

        const renderSelection = (languageOptions) => {
            return (
                <Fragment>
                    <Label>Primary Language(Coding) Used During Stream</Label>
                        <Controller
                            control={control}
                            name="codingLanguage"
                            {...register("codingLanguage", { required: {
                                    value: true,
                                    message: "You MUST select a streaming primary coding language before proceeding"
                                }, onBlur: (e) => {
                                    // deconstruct desired value
                                    const value = e.target.value;
                                    // set delay to allow previous changes to complete (state changes) - doesnt need to be long
                                    setTimeout(() => {
                                        // clear error after proper selection
                                        if ((typeof value !== "undefined") && (Object.keys(value).length > 0)) {
                                            clearErrors("codingLanguage");
                                        } else {
                                        // set error as nothing was selected (blank 'click-off' selection of selector)
                                        setError("codingLanguage", {
                                            type: "manual",
                                            message: "You MUST select a streaming primary coding language before proceeding",
                                        });
                                    }
                                }, 100);
                            }})}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    ref={codingLanguageSelectRef}
                                    autoBlur={true}
                                    defaultValue={null}
                                    onMenuClose={() => {}}
                                    value={currentValues.codingLanguage}
                                    onChange={(selectedOption) => {
                                        console.log("selected", selectedOption)
                                        // update redux-form state
                                        setTimeout(() => {
                                            setValue('codingLanguage', selectedOption, { shouldValidate: false })
                                            // blur input in case it doesn't
                                            codingLanguageSelectRef.current.blur();
                                        }, 100)
                                    }}
                                    options={languageOptions}
                                />
                            )}
                        />
                        {errors.codingLanguage ? <span className="span-tooltip">{errors.codingLanguage.message}</span> : null}
                </Fragment>
            );
        }
        console.log("currentValues currentValues :", currentValues);

        watch(["mainDescription", "streamHashtags", "subCategory", "listingTitle", ])
        return (
            <Fragment>
                <Card>
                    <CardHeader className="b-l-primary border-3">
                        <h5>You have <strong>not</strong> officially started/initalized your live stream yet...Manage your settings BEFORE going live using the options below</h5>
                    </CardHeader>
                    <CardBody>
                    <CardHeader>
                        <h5>{tabbedPaneActive === "2" ? "General Settings Adjustment's & Modifications" : "Visibility Setting's & Viewability"}</h5>
                    </CardHeader>
                    <CardBody>
                        <Nav className="nav-dark">
                            <NavItem>
                                <NavLink href={null} className={tabbedPaneActive === '1' ? 'active' : ''} onClick={() => setTabbedPaneActive('1')}><i className="icofont icofont-ui-home"></i>VISIBILITY</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink disabled={visibility !== null ? false : true} href={null} className={tabbedPaneActive === '2' ? 'active' : ''} onClick={() => setTabbedPaneActive('2')}><i className="icofont icofont-man-in-glasses"></i>GENERAL SETTINGS (title, desc, etc...)</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={tabbedPaneActive}>
                            <TabPane className={"fade show custom-tab-pane-streaming"} tabId="1">
                                <Form className="mega-inline">
                                    <Row>
                                        <Row>
                                            <Col sm="12" md="12" lg="12" xl="12">
                                                <p className="mega-title-custom-streaming">Select Visibility - Dicate <strong>WHO</strong> can see/view your live stream in action</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className={"shadow-showcase-custom"}>
                                                    <Media className="p-20">
                                                        <div className="radio radio-primary mr-3">
                                                            <Input onClick={() => {
                                                                setVisibility({
                                                                    visibility: "public/anyone",
                                                                    accountType: null
                                                                })
                                                                setTabbedPaneActive("2")
                                                            }} checked={visibility !== null && visibility.visibility === "public/anyone" ? true : false} id="radio30" type="radio" name="radio1" value="option1" />
                                                            <Label for="radio30"></Label>
                                                        </div>
                                                        <Media body>
                                                            <h6 className="mt-0 mega-title-badge mega-title-badge-streaming-custom">PUBLIC/ANYONE<span className="badge badge-primary pull-right digits custom-digits-streaming">{"PUBLIC/ANYONE (On/Off Platform)"}</span></h6>
                                                            <p>{`Public/anyone meaning ANYONE (employer's & hacker accounts alike) can both view your live stream AS WELL as anyone NOT registered on the ${process.env.REACT_APP_APPLICATION_NAME} platform...`}</p>
                                                        </Media>
                                                    </Media>
                                                </Card>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className={"shadow-showcase-custom"}>
                                                    <Media className="p-20">
                                                        <div className="radio radio-secondary mr-3">
                                                            <Input onClick={() => {
                                                                setVisibility({
                                                                    visibility: "only-platform-users",
                                                                    accountType: null
                                                                })
                                                                setTabbedPaneActive("2")
                                                            }} checked={visibility !== null && visibility.visibility === "only-platform-users" ? true : false} id="radio31" type="radio" name="radio1" value="option1" />
                                                            <Label for="radio31"></Label>
                                                        </div>
                                                        <Media body>
                                                            <h6 className="mt-0 mega-title-badge mega-title-badge-streaming-custom">PUBLIC/ANYONE ON {process.env.REACT_APP_APPLICATION_NAME} <span className="badge badge-secondary pull-right digits custom-digits-streaming">{`Anyone on ${process.env.REACT_APP_APPLICATION_NAME}`}</span></h6>
                                                            <p>{`Anyone on our platform (${process.env.REACT_APP_APPLICATION_NAME}) will be able to view your live stream HOWEVER people that're NOT REGISTERED on our platform will NOT be able to view your live stream until they login & identifiy themselves...`}</p>
                                                        </Media>
                                                    </Media>
                                                    
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className={"shadow-showcase-custom"}>
                                                    <Media className="p-20">
                                                        <div className="radio radio-success mr-3">
                                                            <Input onClick={() => {
                                                                setVisibility({
                                                                    visibility: "specific-group",
                                                                    accountType: "employers"
                                                                })
                                                                setTabbedPaneActive("2")
                                                            }} checked={visibility !== null && visibility.visibility === "specific-group" && visibility.accountType === "employers" ? true : false} id="radio32" type="radio" name="radio1" value="option1" />
                                                            <Label for="radio32"></Label>
                                                        </div>
                                                        <Media body>
                                                            <h6 className="mt-0 mega-title-badge mega-title-badge-streaming-custom">ONLY EMPLOYERS'S CAN VIEW<span className="badge badge-success pull-right digits custom-digits-streaming">{"ONLY EMPLOYERS'S"}</span></h6>
                                                            <p>{"This option allows you to change your settings to cater to either 'Employers' OR 'hackers' specifically while excluding the other NON-chosen option. This is useful if you'd like to stream to friends or fellow hacker's without employers being able to judge/guage your skillset for future gigs/jobs... This option selects EMPLOYER'S GROUP."}</p>
                                                        </Media>
                                                    </Media>
                                                </Card>
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                <Card className={"shadow-showcase-custom"}>
                                                    <Media className="p-20">
                                                        <div className="radio radio-info mr-3">
                                                            <Input onClick={() => {
                                                                setVisibility({
                                                                    visibility: "specific-group",
                                                                    accountType: "hackers"
                                                                })
                                                                setTabbedPaneActive("2")
                                                            }} checked={visibility !== null && visibility.visibility === "specific-group" && visibility.accountType === "hackers" ? true : false} id="radio33" type="radio" name="radio1" value="option1" />
                                                            <Label for="radio33"></Label>
                                                        </div>
                                                        <Media body>
                                                            <h6 className="mt-0 mega-title-badge mega-title-badge-streaming-custom">ONLY HACKER'S CAN VIEW<span className="badge badge-info pull-right digits custom-digits-streaming">{"ONLY HACKER'S"}</span></h6>
                                                            <p>{"This option allows you to change your settings to cater to either 'Employers' OR 'hackers' specifically while excluding the other NON-chosen option. This is useful if you'd like to stream to friends or fellow hacker's without employers being able to judge/guage your skillset for future gigs/jobs... This option selects HACKER GROUP."}</p>
                                                        </Media>
                                                    </Media>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Form>
                            </TabPane>
                            <TabPane className={"custom-tab-pane-streaming"} tabId="2">
                                <Form className="needs-validation streaming-start-form-wrapper" noValidate="" onSubmit={handleSubmit(handleLiveStreamStart, (e, errors) => renderFormError(e, errors))}>
                                    <div className="form-row">
                                        <Col md="4 mb-3 custom-col-streaming-one">
                                            <Label htmlFor="validationCustom01">{listingTitleChecker.label}</Label>
                                            <Input {...listingTitleChecker.check(setError, register, values, errors, "subCategory", clearErrors)} value={currentValues.listingTitle} onChange={(e) => listingTitleChecker.onChange(e, setValue)} className="form-control" name={listingTitleChecker.name} type={listingTitleChecker.type} placeholder={listingTitleChecker.placeholder} />
                                            {errors.listingTitle ? <span className="span-tooltip">{errors.listingTitle.message}</span> : null}
                                        </Col>
                                        <Col md="4 mb-3 custom-col-streaming-two">
                                            <Label>{subcategoryChecker.label}</Label>
                                            <Controller
                                                control={control}
                                                name={subcategoryChecker.name}
                                                {...subcategoryChecker.check(setError, register, values, errors, "subCategory", clearErrors)}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        ref={subCategoryRefSelector}
                                                        autoBlur={true}
                                                        placeholder={subcategoryChecker.placeholder}
                                                        defaultValue={null}
                                                        onMenuClose={() => {}}
                                                        value={currentValues.subCategory}
                                                        onChange={(selectedOption) => handleSubcategoryCheckerChange(selectedOption, setValue, subCategoryRefSelector)}
                                                        options={subcategoryOptions}
                                                    />
                                                )}
                                            />
                                            {errors.subCategory ? <span className="span-tooltip">{errors.subCategory.message}</span> : null}
                                        </Col>
                                        <Col md="4 mb-3 custom-col-streaming-three">
                                            {languageOptionsState !== null ? renderSelection(languageOptionsState) : null}
                                        </Col>
                                    </div>
                                    <div className="form-row">
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <HashtagHelper setError={setError} register={register} values={currentValues} errors={errors} setValue={setValue} clearErrors={clearErrors} control={control} errors={errors} />
                                        </Col>
                                    </div>
                                    <div style={{ marginTop: "12.5px" }} className="form-row">
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Label>{mainDescriptionChecker.label}</Label>
                                            <Input
                                                {...mainDescriptionChecker.check(setError, register, values, errors, "subCategory", clearErrors)} 
                                                value={currentValues.mainDescription} 
                                                onChange={(e) => mainDescriptionChecker.onChange(e.target.value, setValue)} 
                                                name={mainDescriptionChecker.name} 
                                                onBlur={(e) => mainDescriptionChecker.onBlur(e, clearErrors, mainDescriptionChecker.name, setError)}
                                                type={mainDescriptionChecker.type} 
                                                rows={8}
                                                placeholder={mainDescriptionChecker.placeholder} 
                                            />
                                            {errors.mainDescription ? <span className="span-tooltip">{errors.mainDescription.message}</span> : null}
                                        </Col>
                                    </div>
                                    <Button style={{ width: "100%", marginTop: "17.5px" }} outline className={"btn-square-info"} color="info-2x">{"Submit Data & Start a live stream!"}</Button>
                                </Form>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
    console.log(streamKey, streamInfo);
    return (
        <Fragment>
        <Breadcrumb parent="Live streaming creation" title="Create a new 'live hacking-stream' now!" />
        <Container fluid={true}>
            <Row>
            <Col xl="3" className="box-col-6 pr-0 file-spacing">
                <div className="file-sidebar">
                <Card>
                   <CardBody>   {/*  selectedMainCategory, setSelectedMainCategoryState */}
                    <h6 className="mb-3">Select a category of your live hacking stream before being able to start your stream & go public!</h6>
                    <ul>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("none-selected")} className={selectedMainCategory === "none-selected" ? "btn btn-info" : "btn btn-light"}><Code /> NONE SELECTED - N/A</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("api-testing")} className={selectedMainCategory === "api-testing" ? "btn btn-info" : "btn btn-light"}><Code /> API-Endpoint Testing/Hacking</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("malware-exploit")} className={selectedMainCategory === "malware-exploit" ? "btn btn-info" : "btn btn-light"}><Code /> Malware</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("phishing-exploit")} className={selectedMainCategory === "phishing-exploit" ? "btn btn-info" : "btn btn-light"}><Code /> Phishing</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("sql-injection-attack")} className={selectedMainCategory === "sql-injection-attack" ? "btn btn-info" : "btn btn-light"}><Code /> SQL-Injection Attack</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("cross-site-scripting-xss")} className={selectedMainCategory === "cross-site-scripting-xss" ? "btn btn-info" : "btn btn-light"}><Code /> Cross-Site Scripting (XSS)</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("denial-of-service")} className={selectedMainCategory === "denial-of-service" ? "btn btn-info" : "btn btn-light"}><Code /> Denial-of-Service (DoS)</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("session-hijacking-man-in-middle")} className={selectedMainCategory === "session-hijacking-man-in-middle" ? "btn btn-info" : "btn btn-light"}><Code /> Session Hijacking / Man-in-middle</div>
                        </li>
                        <li>
                            <div onClick={() => setSelectedMainCategoryState("credential-reuse")} className={selectedMainCategory === "credential-reuse" ? "btn btn-info" : "btn btn-light"}><Code /> Credential Reuse</div>
                        </li>
                    </ul>
                    <hr />
                    <ul>
                        <li>
                        <div className="btn btn-outline-primary"><Database />{Storage}</div>
                        <div className="m-t-15">
                            <div className="progress sm-progress-bar mb-1">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p>{"25 GB of 100 GB used"}</p>
                        </div>
                        </li>
                    </ul>
                    <hr />
                    <ul>
                        <li>
                        <div className="btn btn-outline-primary"><Grid />Pricing for subscription (premium membership)</div>
                        </li>
                        <li>
                        <div className="pricing-plan">
                            <h6>Trial "Tier-Hacker" Account </h6>
                            <h5>FREE (limited-time)</h5>
                            <p>{"Signup for our FREE 'tier-hacker' account which is basically a super-bonus version of a regular account. This includes many restricted features/functionality and give's you a better stance on our platform."}</p>
                            <div className="btn btn-outline-success btn-md">{"Already a member"}</div>
                            <img className="bg-img" src={require("../../../../../assets/images/dashboard/folder.png")} alt="" />
                        </div>
                        </li>
                        <li>
                        <div className="pricing-plan">
                            <h6>Premium Live Streaming</h6>
                            <h5>{"$25/month"}</h5>
                            <p> {"Placed on homepage at top of list and shown BEFORE all other listings that're NOT boosted/promoted as well..."}</p>
                            <div className="btn btn-outline-primary btn-md">Upgrade Now!</div>
                            <img className="bg-img" src={require("../../../../../assets/images/dashboard/folder1.png")} alt="" />
                        </div>
                        </li>
                    </ul>
                    </CardBody>
                </Card>
                </div>
            </Col>
            <Col xl="9" md="12" className="box-col-12">
                <div className="file-content">
                    <Card>
                        <CardHeader className="b-l-secondary border-3">
                            <h5>Live Streaming Key</h5>
                            <p style={{ marginTop: "7.5px" }}>{streamKey === null ? "You can't create a 'stream-key' YET because you need to configure your listing first & fill out the required data before proceeding..." : "This will allow you to <strong>START</strong> your live stream (enter your copied 'stream key' to start stream)"}</p>
                        </CardHeader>
                        <CardBody>
                            {streamKey === null ? <p className="before-text-streamkey">Once you "start" your live stream process by clicking "Start a live stream!" above to initialize your "stream key" to go to the next-step of the process of starting and initalizing a publically viewable live stream... However, <strong>FIRST</strong> you <strong>must</strong> complete the "visibility" & "general-settings" details before proceeding forward.</p> : <div>
                                <p>Your stream key is below, Click the button below to <strong>"Copy"</strong> the stream key to your clipboard.</p>
                                <hr />
                                <Button id={"no-border-button-custom"} style={{ width: "100%" }} outline color={"secondary-2x"} className="btn-squared-secondary ml-1" onClick={() => navigator.clipboard.writeText(streamKey)}>{`Copy your STREAM KEY ~ ${streamKey}`}</Button>
                                <hr />
                                <Button id={"no-border-button-custom"} style={{ width: "100%" }} outline color={"primary-2x"} className="btn-squared-primary ml-1" onClick={() => navigator.clipboard.writeText("rtmps://global-live.mux.com:443/app")}>{`Copy Server URL ~ rtmps://global-live.mux.com:443/app`}</Button>
                            </div>}
                        </CardBody>
                    </Card>
                    <Card>

                        <CardBody className="custom-cardbody-streaming-start">
                            <h4 className="mb-3">Upload/start a new LIVE stream (live streams of live hack's)</h4>
                            <h6>Start a stream of a LIVE <strong>AUTHORIZED</strong> hack (digital asset's <strong>ONLY</strong>) and <strong>EARN MONEY</strong> via "Gifts", "Kudo's" and other various incentives/prizes while hacking away! You'll earn more money if you have more followers/viewers so try to grow your audience!</h6>
                            <hr />
                            {playbackStream !== null ? <video className={"streaming-video-wrapper"} controls muted>
                                <source className={"streaming-video"} src={playbackStream} type="video/mp4"></source>
                            </video> : renderBeforeReadyLogic()}
                        </CardBody>
                    </Card>
                </div>

            </Col>
            </Row>
        </Container>
        </Fragment>
    );
}

export default CreateNewLiveStreamAsHackerHelper;