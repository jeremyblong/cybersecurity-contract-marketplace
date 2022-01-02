import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col, Button, Form, Label, Input, Card, CardHeader, CardBody, Media, Row, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import "./styles.css";
import Select from 'react-select';
import _ from "lodash";
import { languageList } from "./helpers/programmingLanguageList/languageList.js";
import SimpleMDE from "react-simplemde-editor";
import { useHistory } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { connect } from "react-redux";
import { saveSoftwareListingInfo } from "../../../../../../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";

const categoryOptions = [
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
const supportItemCommentsSelectorOptions = [
    { value: "NOT-specified", label: "Not Specified" },
    { value: "1-day", label: "1 Day (BEST choice)" },
    { value: "2-days", label: "2 Days (better choice)" },
    { value: "3-days", label: "3 Days (standard/common choice)" },
    { value: "5-days", label: "5 Days (least excessive timespan)" },
    { value: "7-days", label: "7 Days (less excessive timespan)" },
    { value: "10-days", label: "10 Days (excessive timespan)" },
]

const PageOneMainHelper = ({ saveSoftwareListingInfo, previouslySavedSoftwareData }) => {

    const history = useHistory();

    let categorySelectRef = useRef(null);
    let codingLanguageContentSelectRef = useRef(null);
    let supportItemCommentsRef = useRef(null);

    const { register, handleSubmit, control, reset, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
        // delayError: 500
    });

    const [validateClass , setValidateClass] = useState(false);
    const [ data, setData ] = useState({});
    const [ showSelectOneError, setSelectOneErrorStatus ] = useState(false);
    const [ languageSelectError, setLanguageSelectError ] = useState(false);
    const [ popoverOpen, setPopover ] = useState(false);
    const [ checkedOptionSupport, setCheckedSupportOption ] = useState("no-support");
    const [ languageOptions, setLanguageSelectorOptions ] = useState(null);
    const [ supportViaItemComments, setSupportViaItemCommentsState ] = useState(false);
    const [ wordCount, setWordCount ] = useState(0);

    const onSubmit = (data, e) => {

        console.log("submitting (onSubmit function)...!!");

        e.preventDefault();

        if (data !== '') {

            console.log("data", data);

            if (typeof previouslySavedSoftwareData.redirected !== "undefined" && previouslySavedSoftwareData.redirected === true) {
                // values already persist to ommit them and add new values (because this is the original redux state creation function)...
                const omittedPreviousKeysRedux = _.omit(previouslySavedSoftwareData, ["listingTitle", "category", "codingLanguageContent", "supportResponseTimespanData", "supportExternalURL", "description"]);
                // deconstruct values off of "data" on submit object
                const {
                    listingTitle, 
                    category, 
                    codingLanguageContent, 
                    supportResponseTimespanData, 
                    supportExternalURL, 
                    description
                } = data;
                // update redux state
                saveSoftwareListingInfo({
                    ...omittedPreviousKeysRedux,
                    listingTitle, 
                    category, 
                    codingLanguageContent, 
                    supportResponseTimespanData, 
                    supportExternalURL, 
                    description,
                    currentPage: 4
                });
            } else {
                // create new redux state for form-logic
                saveSoftwareListingInfo({
                    ...data,
                    currentPage: 2
                });
            }
        } else {
            errors.showMessages();
        }
    };
    const onError = async (errors, e) => {
        console.log("error submitting...!");
        
        for (const key in errors) {
            const err = errors[key];
            
            if (key === "description" && err.message === "") {
                setError("description", {
                    type: "manual",
                    message: "You must enter between 1000 characters (min) & 6000 characters (max) OR 200-475 words",
                });
            }
        }

        // console.log(errors, e);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        clearErrors(name);

        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });

        return value;
    };

    useEffect(() => {
        
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
    }, []);

    const menuClosedSelectInput = () => {
        if (_.has(data, "category")) {
            setSelectOneErrorStatus(true);
        } 
    }
    const menuClosedSelectInputLanguages = () => {
        if (_.has(data, "codingLanguageContent")) {
            setLanguageSelectError(true);
        } 
    }
    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
          autofocus: false,
          spellChecker: false,
        };
    }, []);

    const removeUnneccessaryFieldAndReset = () => {
        setData(prevState => {
            return _.omit({...prevState}, 'supportExternalURL');
        });
        reset({ supportExternalURL: "" }, { keepValues: true });
    }
    const calculateWordCountOnBlur = (data) => {
        console.log("data", data);

        const wordCount = data.split(" ").length;

        console.log("wordCount : ", wordCount);

        setWordCount(wordCount);
    }

    const calculateWhetherURLIsLegit = (data) => {
        console.log("data calculateWhetherURLIsLegit : ", data);
        
        const isValidHttpUrl = (string) => {
            let url;
            
            try {
              url = new URL(string);
            } catch (_) {
              return false;  
            }
          
            return url.protocol === "http:" || url.protocol === "https:";
        }

        if (isValidHttpUrl(data)) {
            return true;
        } else {
            return "You *must* enter a valid URL consisting of either https:// OR http:// along with .net/com/etc...";
        };
    }

    console.log("errors", errors);
    
    console.log("data : ", data);
    return (
        <div>
            <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="form-row">
                    <Col md="6 mb-3">
                        <Label>Listing Title (Be As Specific As Possible)</Label>
                        <input {...register("listingTitle", { required: {
                            value: true,
                            message: "You MUST enter a value between 15-125 characters"
                        }, minLength: {
                            value: 15,
                            message: "You must enter AT Least 15 characters"
                        }, maxLength: {
                            value: 125,
                            message: "You may ONLY enter 125 characters or less"
                        }})} className="form-control" name="listingTitle" type="text" placeholder="Listing title" onChange={handleInputChange} value={data.listingTitle} />
                        {/* 'Listing title is required & total length must be less than 50 charectors' */}
                        {errors.listingTitle ? <span className="span-tooltip">{errors.listingTitle.message}</span> : null}
                        <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="6 mb-3">
                        <Label>Type Of Hack Being Sold</Label>
                        <Controller
                            control={control}
                            name="category"
                            {...register("category", { required: true, onBlur: () => {
                                console.log("onBlur...!");

                                clearErrors("category");
                            }})}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    ref={categorySelectRef}
                                    autoBlur={true}
                                    defaultValue={null}
                                    onMenuClose={menuClosedSelectInput}
                                    value={data.selectedOption}
                                    onChange={(selectedOption) => {
                                        setData(prevState => {
                                            return {
                                                ...prevState,
                                                category: selectedOption
                                            }
                                        });
                                        setValue('category', selectedOption, { shouldValidate: false })
                                        categorySelectRef.current.blur();
                                    }}
                                    options={categoryOptions}
                                />
                            )}
                        />
                        {errors.category ? <span className="span-tooltip">{errors.category && 'Category is required'}</span> : null}
                        <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                </div>
                {languageOptions !== null ? <div className="form-row">
                    <Col sm="12" lg="12" xl="12" md="12 mb-3">
                        <Label>Primary Language (coding language) content for sale is correlated with</Label>
                        <Controller
                            control={control}
                            name="codingLanguageContent"
                            {...register("codingLanguageContent", { required: true, onBlur: () => {
                                console.log("onBlur...!");

                                clearErrors("codingLanguageContent");
                            }})}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    ref={codingLanguageContentSelectRef}
                                    autoBlur={true}
                                    defaultValue={null}
                                    onMenuClose={menuClosedSelectInputLanguages}
                                    value={data.selectedOption}
                                    onChange={(selectedOption) => {
                                        setData(prevState => {
                                            return {
                                                ...prevState,
                                                codingLanguageContent: selectedOption
                                            }
                                        });
                                        setValue('codingLanguageContent', selectedOption, { shouldValidate: false })
                                        codingLanguageContentSelectRef.current.blur();
                                    }}
                                    options={languageOptions}
                                />
                            )}
                        />
                        {errors.codingLanguageContent ? <span className="span-tooltip">{errors.codingLanguageContent && 'Coding language (in correlation to content for sale) is required to post'}</span> : null}
                        <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                </div> : <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                    <p>
                        <Skeleton containerClassName={"stretch-bars"} count={4} />
                    </p>
                </SkeletonTheme>}
                <Col sm="12" xl="12 xl-100 box-col-12">
                    <div className="card height-equal">
                        <CardHeader>
                            <h5>Supporting Your Item ("Item Support")</h5><span>{"Supporting your items is not a requirement of "}<strong className="custom-strong-company-name">{process.env.REACT_APP_APPLICATION_NAME}</strong>{`, but buyers in categories on ${process.env.REACT_APP_APPLICATION_NAME} tend to have questions about the item and require assistance. If you choose to offer them support, the information you provide here will be displayed to buyers on these items. Read the `}<a onMouseEnter={() => {
                                setPopover(true);
                            }} className="custom-link-within-desc" id="Popover1" onClick={() => {
                                setPopover(!popoverOpen);
                            }}>support policy</a> {" for what it means to support or not support your buyers. "}</span>
                            <Popover
                                className="make-popover-interactive"
                                placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={() => {
                                    setPopover(!popoverOpen);
                                }}
                            >
                                <PopoverHeader>Support Policy Re-direct! <div className="popover-cancel-container" onClick={() => {
                                    setPopover(false);
                                }}><img src={require("../../../../../../../assets/icons/close-64.png")} className="small-close-popover-icon" /></div></PopoverHeader>
                                <PopoverBody>If you'd like to review or check out our support policies, click the button below to be redirected to the appropriate page.
                                <hr />
                                <Button style={{ width: "100%" }} color="secondary" onClick={() => {
                                    // redirect to appropriate page (NEEDS TO BE UPDATED IN FUTURE!!);
                                    history.push("/dashboard");
                                }}>View/Visit Policies</Button>
                                </PopoverBody>
                            </Popover>
                        </CardHeader>
                        <CardBody>
                            <Form className="mega-vertical">
                                <Row>
                                    <Col sm="12">
                                    <p className="mega-title title-selectors m-b-5"><strong style={{ textDecorationLine: "underline" }}>Select</strong> an option that reflects your desire to offer <em>support</em> or <em>not</em>...</p>
                                    </Col>
                                    <Col sm="6">
                                    <Card>
                                        <Media className="p-20">
                                        <div className="radio radio-primary mr-3">
                                            <Input onChange={(value) => {
                                                setCheckedSupportOption("no-support");

                                                setValue('supportResponseTimespanData', {
                                                    type: checkedOptionSupport
                                                }, { shouldValidate: false });

                                                removeUnneccessaryFieldAndReset();
                                            }} id="radio23" type="radio" name="not-supported" checked={checkedOptionSupport === "no-support" ? true : false} />
                                            <Label for="radio23"></Label>
                                        </div>
                                        <Media body>
                                            <h6 className="mt-0 mega-title-badge">NO Support Provided (default)<span className="badge badge-primary pull-right digits">{"NO SUPPORT"}</span></h6>
                                            <p>{"Selecting 'No' will indicate to new buyers you are not supporting this item. Your previous buyers with valid support entitlement will see this item as supported until their support period ends."}</p>
                                        </Media>
                                        </Media>
                                    </Card>
                                    </Col>
                                    <Col sm="6">
                                    <Card>
                                        <Media className="p-20">
                                        <div className="radio radio-secondary mr-3">
                                            <Input onChange={() => {
                                                setCheckedSupportOption("support-via-item-comments");

                                                removeUnneccessaryFieldAndReset();
                                            }} id="radio24" type="radio" name="supported-through-item-comments" checked={checkedOptionSupport === "support-via-item-comments" ? true : false} />
                                            <Label for="radio24"></Label>
                                        </div>
                                        <Media body>
                                            <h6 className="mt-0 mega-title-badge">Supported Through Item Comments <span className="badge badge-secondary pull-right digits">{"Support via item comments"}</span></h6>
                                            <p>{"Support will be provided via 'item comments' which are essentially comments on or within your actual live listing. User's will be able to comment which will notify you prompting your response in a timely manner."}</p>
                                        </Media>
                                        </Media>
                                    </Card>
                                    </Col>
                                    <Col sm="6">
                                    <Card>
                                        <Media className="p-20">
                                        <div className="radio radio-success mr-3">
                                            <Input onChange={() => {
                                                setCheckedSupportOption("supported-via-external-url");
                                            }} id="radio25" type="radio" name="supported-via-external-url" checked={checkedOptionSupport === "supported-via-external-url" ? true : false} />
                                            <Label for="radio25"></Label>
                                        </div>
                                        <Media body>
                                            <h6 className="mt-0 mega-title-badge"> Supported through an external URL <span className="badge badge-success pull-right digits">{"EXTERNAL Support via URL"}</span></h6>
                                            <p>{"Support will be provided elsewhere via an external URL linking to services such as your own forum, ticket system, etc... You will NOT recieve notifications as this links to a seperate entity/website/system outside of our secure platform so make sure to check your sources routinely."}</p>
                                        </Media>
                                        </Media>
                                    </Card>
                                    </Col>
                                    <Col sm="6">
                                    <Card>
                                        <Media className="p-20">
                                        <div className="radio radio-info mr-3">
                                            <Input onChange={() => {
                                                setCheckedSupportOption("support-via-email-contact-form");

                                                removeUnneccessaryFieldAndReset();
                                            }} id="radio5" type="radio" name="support-via-email-contact-form" checked={checkedOptionSupport === "support-via-email-contact-form" ? true : false} />
                                            <Label for="radio5"></Label>
                                        </div>
                                        <Media body>
                                            <h6 className="mt-0 mega-title-badge">Supported via Private Messaging Form <span className="badge badge-info pull-right digits">DM (Private Message) Contact Form (in-app)</span></h6>
                                            <p>{"This selection will allow user's to contact you directly through our platform via our 'private messaging' features which will also notify you upon receiving new requests. This is our RECOMMENDED choice if you do decide to use 'Support' functionality for your listing."}</p>
                                        </Media>
                                        </Media>
                                    </Card>
                                    </Col>
                                </Row>
                            </Form>
                            {(checkedOptionSupport === "support-via-item-comments") || (checkedOptionSupport === "supported-via-external-url") || (checkedOptionSupport === "support-via-email-contact-form") ? <Row>
                                <Col sm="12" lg="12" xl="12" md="12 mb-3">
                                    <Label>Response Time (up to - how long you typically take to reply/respond)</Label>
                                    <Controller
                                        control={control}
                                        name="supportResponseTimespanData"
                                        {...register("supportResponseTimespanData", { required: true, onBlur: () => {
                                            console.log("onBlur...!");

                                            if (supportViaItemComments === true) {
                                                alert("supportResponseTimespanData HAS value")
                                            } else {
                                                clearErrors("supportResponseTimespanData");
                                            }
                                        }})}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                ref={supportItemCommentsRef}
                                                autoBlur={true}
                                                defaultValue={null}
                                                onMenuClose={menuClosedSelectInput}
                                                value={data.supportType}
                                                onChange={(selectedOption) => {
                                                    setData(prevState => {
                                                        return {
                                                            ...prevState,
                                                            supportType: {
                                                                ...selectedOption,
                                                                type: checkedOptionSupport
                                                            }
                                                        }
                                                    });
                                                    setValue('supportResponseTimespanData', {
                                                        ...selectedOption,
                                                        type: checkedOptionSupport
                                                    }, { shouldValidate: false });

                                                    supportItemCommentsRef.current.blur();
                                                }}
                                                options={supportItemCommentsSelectorOptions}
                                            />
                                        )}
                                    />
                                    {errors.supportResponseTimespanData ? <span className="span-tooltip">{'You must select a timespan to reflect your selected support option/type before proceeding'}</span> : null}
                                    <div className="valid-feedback">{"Looks good!"}</div>
                                </Col>
                            </Row> : null}
                            {(checkedOptionSupport === "supported-via-external-url") ? <Col sm="12" lg="12" xl="12" md="12 mb-3">
                                <Label>External Support URL (this is a redirect provided to people viewing your listing)</Label><br />
                                <small className="small-sub-text">You <strong>must</strong> enter a valid URL however you can use link to really anything you'd like to that provides support.</small>
                                <input style={{ marginTop: "10px" }} {...register("supportExternalURL", { required: {
                                    value: true,
                                    message: "You MUST enter a value between 10-75 characters"
                                }, minLength: {
                                    value: 10,
                                    message: "You must enter AT Least 10 characters"
                                }, maxLength: {
                                    value: 75,
                                    message: "You may ONLY enter 75 characters or less"
                                }, validate: value => calculateWhetherURLIsLegit(value) })} className="form-control" name="supportExternalURL" type="text" placeholder="External URL address (eg. https://www.wecodewithclarity.com)" onChange={handleInputChange} value={data.supportExternalURL} />
                                {/* 'Listing title is required & total length must be less than 50 charectors' */}
                                {errors.supportExternalURL ? <span className="span-tooltip">{errors.supportExternalURL.message}</span> : null}
                                <div className="valid-feedback">{"Looks good!"}</div>
                            </Col> : null}
                        </CardBody>
                    </div>
                </Col>
                <hr />
                <Row className="bottom-row-spacing">
                    <Col md="12" sm="12" xl="12" lg="12"> 
                    <Label>Enter a description for your listing (markdown is accepted - use the attached buttons to customize the way your content looks)</Label>
                    <Controller
                        control={control}
                        name="description"
                        value={data.description}
                        {...register("description", { required: true, minLength: {
                                value: 1000,
                                message: "You must enter AT least 1000 characters OR 200 words to proceed"
                            }, maxLength: {
                                value: 6000,
                                message: "You may only enter up to a max of 6000 characters or 475 words"
                            }, onBlur: () => {

                                setTimeout(() => {
                                    if ((typeof data.description !== "undefined") && ((data.description.length >= 1000) && (data.description.length <= 6000))) {
                                        clearErrors("description");
                                    } else {
                                        if ((typeof data.description !== "undefined") && data.description.length !== 0) {
                                            if ((wordCount >= 200) || ((typeof data.description !== "undefined" && data.description.length <= 1000) && (data.description.length >= 0))) {
                                                console.log("one ran!");

                                                setError("description", {
                                                    type: "manual",
                                                    message: "You must enter AT least 1000 characters OR 200 words to proceed",
                                                });
                                            } else if ((wordCount >= 475) && ((typeof data.description !== "undefined" && data.description.length >= 6000))) {
                                                console.log("two ran!");

                                                setError("description", {
                                                    type: "manual",
                                                    message: "You may only enter up to a max of 6000 characters OR a maximum of 475 words",
                                                });
                                            } else {
                                                console.log("three ran!");

                                                setError("description", {
                                                    type: "manual",
                                                    message: "You must enter between 1000-6000 characters to proceed or a minimum of 200 words",
                                                });
                                            }
                                        } else {
                                            setError("description", {
                                                type: "manual",
                                                message: "You must enter a valid value for this input - we have detected that no data is currently in the input",
                                            });
                                        }
                                    }
                                }, 10)
                            }})}
                        render={({ field: { ref, onChange, value, ...field }}) => (
                            <SimpleMDE
                                ref={ref}
                                {...field}
                                placeholder={"Enter your text here... (You can use MARKUP & various text styling tools with the bar above)"}
                                name="description"
                                onFocus={() => {
                                    clearErrors("description");
                                }}
                                onBlur={() => {
                                    if (_.has(data, "description") && data.description.length > 0) {
                                        calculateWordCountOnBlur(data.description);
                                    }
                                }}
                                id="editor_container"
                                onChange={(value) => {
                                    onChange(value);
                                    
                                    setData(prevState => {
                                        return {
                                            ...prevState,
                                            description: value
                                        }
                                    });
                                    
                                    return value;
                                }}
                                value={data.description}
                                options={autofocusNoSpellcheckerOptions}
                            />
                        )}
                    />
                    </Col>
                    <Col md="12" sm="12" xl="12" lg="12">
                        {errors.description ? <span className="span-tooltip">{errors.description.message}</span> : null}
                    </Col>
                </Row>
                <Button color="secondary" style={{ width: "100%" }} type="submit" onClick={() => {
                    // setValidateClass(!validateClass);

                }}>~ Submit form details and proceed to next page ~</Button>
            </Form>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        previouslySavedSoftwareData: _.has(state.softwareListingSale, "softwareListingSaleInfo") ? state.softwareListingSale.softwareListingSaleInfo : {
            redirect: false
        }
    }
}
export default connect(mapStateToProps, { saveSoftwareListingInfo })(PageOneMainHelper);
