import React, {useEffect, useState, useRef} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Col,Button,Form,Label,Input,FormGroup,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap';
import { LastName,State,City,Zip,SubmitForm } from '../../../../../../../constant';
import "./styles.css";
import Select from 'react-select';
import _ from "lodash";
import { languageList } from "./helpers/programmingLanguageList/languageList.js";


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
  

const PageOneMainHelper = (props) => {

    let categorySelectRef = useRef(null);

    const { register, handleSubmit, control, setValue, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur",
        delayError: 500
    });

    const [validateClass , setValidateClass] = useState(false);
    const [ data, setData ] = useState({});
    const [ showSelectOneError, setSelectOneErrorStatus ] = useState(false);


    const onSubmit = (e, data) => {

        console.log("submitting (onSubmit function)...!!");

        e.preventDefault();

        if (data !== '') {
            alert('You submitted the form and stuff!');
        } else {
            errors.showMessages();
        }
    };
    const onError = (errors, e) => {
        console.log("error submitting...!");

        console.log(errors, e);

        // for (const key in errors) {

        //     const error = errors[key];
            
        //     console.log(error);

        //     switch (error) {
        //         case "category":
        //             if (showSelectOneError === true) {
        //                 clearErrors("category");
        //             }
        //             break;
            
        //         default:
        //             break;
        //    }
        // }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };
    console.log("data", data);

    useEffect(() => {
        // const watchCategory = watch("category", false);

        // console.log("watchCategory : ", watchCategory);
    }, []);

    const menuClosedSelectInput = () => {
        if (_.has(data, "category")) {
            setSelectOneErrorStatus(true);
        } 
    }
    console.log("errors", errors);
    
    console.log("categorySelectRef : ", categorySelectRef);
    return (
        <div>
            <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="form-row">
                <Col md="6 mb-3">
                    <Label>Listing Title (Be As Specific As Possible)</Label>
                    <Input className="form-control" name="listingTitle" type="text" placeholder="Listing title" {...register(("listingTitle"), { required: true, maxLength: 50 })} onChange={handleInputChange} />
                    <span>{errors.listingTitle && 'Listing title is required & total length must be less than 50 charectors'}</span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="6 mb-3">
                    <Label>Type Of Hack Being Sold</Label>
                    <Controller
                        control={control}
                        name="category"
                        {...register(("category"), { required: true, onBlur: () => {
                            console.log("onBlur...!");

                            if (showSelectOneError === true) {
                                alert("category HAS value")
                            } else {
                                // setTimeout(() => {
                                //     clearErrors("category");
                                // }, 10);
                                clearErrors("category");
                            }
                        } })}
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
                {/* <Col md="4 mb-3">
                    <Label>{Username}</Label>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText >{"@"}</InputGroupText>
                        </InputGroupAddon>
                    <Input className="form-control"  name="userName" type="text" placeholder="Username" aria-describedby="inputGroupPrepend" {...register(("testing"), { required: true })} />
                    <span>{errors.lastName && 'User name is required'}</span>
                    <div className="invalid-feedback">{"Please choose a username."}</div>
                    </InputGroup>
                </Col> */}
                </div>
                <div className="form-row">
                <Col md="6 mb-3">
                    <Label>{City}</Label>
                    <Input className="form-control"  name="city" type="text" placeholder="City" {...register(("testing"), { required: true })} onChange={handleInputChange} />
                    <span>{errors.city && 'Please provide a valid city'}</span>
                    <div className="invalid-feedback">{"Please provide a valid city."}</div>
                </Col>
                <Col md="3 mb-3">
                    <Label>{State}</Label>
                    <Input className="form-control"  name="state" type="text" placeholder="State" {...register(("testing"), { required: true })} onChange={handleInputChange} />
                    <span>{errors.state && 'Please provide a valid state.'}</span>
                    <div className="invalid-feedback">{"Please provide a valid state."}</div>
                </Col>
                <Col md="3 mb-3">
                    <Label>{Zip}</Label>
                    <Input className="form-control"  name="zip" type="text" placeholder="Zip" {...register(("testing"), { required: true })} onChange={handleInputChange} />
                    <span>{errors.zip && 'Please provide a valid zip.'}</span>
                    <div className="invalid-feedback">{"Please provide a valid zip."}</div>
                </Col>
                </div>
                <FormGroup>
                <div className="form-check">
                    <div className="checkbox p-0">
                    <Input className="form-check-input" id="invalidCheck3" type="checkbox" onChange={handleInputChange} />
                    <Label className="form-check-label" htmlFor="invalidCheck3">{"Agree to terms and conditions"}</Label>
                    </div>
                </div>
                </FormGroup>
                <Button color="primary"  type="submit" onClick={() => setValidateClass(!validateClass)}>{SubmitForm}</Button>
            </Form>
        </div>
    );
}

export default PageOneMainHelper;
