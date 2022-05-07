import React, { useState, Fragment, useEffect } from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/_App/Footer';
import {Link, useHistory} from 'react-router-dom'; 
import Switch from "react-switch";
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import { authentication } from "../redux/actions/authentication/auth.js";
import { connect } from "react-redux";
import { deviceDetect, isBrowser, isMobile } from 'react-device-detect';
import ReactCodeInput from "react-code-input";
import "./styles.css";

const SignIn = ({ authentication }) => {

    const history = useHistory();

    const [ code, setCode ] = useState("");
    const [ page, setPage ] = useState(1);
    const [ user, setUser ] = useState(null);
    const [ checked, setchecked ] = useState(false);
    const [ hidePassword, setHidePassword ] = useState(false);
    const [ data, setData ] = useState({});
    const [ switchAccountType, switchType ] = useState("You're logging in as - 'Company/Employer'");
    const [ seconds, setSeconds ] =  useState(0);

    const handleChange = (checked) => {
        setchecked(checked);

        if (checked === true) {
            switchType("You're logging in as - 'Hacker/Security Expert'")
        } else {
            switchType("You're logging in as - 'Company/Employer'");
        }
    }
    
    const handleSubmission = (e, ready) => {
        e.preventDefault();

        console.log("submitted.");

        const detectDeviceInfo = deviceDetect();

        const { password, usernameOrEmail } = data;

        if (page === 2) {
            const configgg = {
                authyId: user.authyId,
                entryCode: code
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/twilio/verify/code`, configgg).then((innerResp) => {
                if (innerResp.data.message === "Successfully verified account!") {
                    console.log("Code matches!", innerResp.data);

                    NotificationManager.success('Successful authentication! You will be logged-in momentarily...', 'Successfully authenticated!', 3000);

                    setTimeout(() => {
                        // do authentication - registration redux logic
                        authentication(user);
    
                        if (user.accountType === "employers") {
                            history.push("/dashboard/employer");
                        } else {
                            history.push("/dashboard/hacker");
                        }
                    }, 3000);
                } else {
                    console.log("err with code!", innerResp.data);

                    NotificationManager.warning("The code your entered does NOT match the code that was sent to your cellular device, please enter a valid code!", "Enter does NOT match code sent to phone!", 4750);
                }
            }).catch((errorCode) => {
                console.log("errorCode", errorCode);

                NotificationManager.warning("The code your entered does NOT match the code that was sent to your cellular device, please enter a valid code!", "Enter does NOT match code sent to phone!", 4750);
            });
        } else {
            if (isBrowser === true) {
                // computer, laptop, etc.. is being used.
                axios.get("https://ipapi.co/json/").then((responseeee) => {
    
                    const { country, city, ip, region, postal, timezone, version } = responseeee.data;
    
                    const userDeviceData = {
                        ...detectDeviceInfo,
                        isBrowser: true,
                        IPRelatedInformation: {
                            country, 
                            city, 
                            ip, 
                            region, 
                            postal, 
                            timezone, 
                            version
                        }
                    };
                    axios.post(`${process.env.REACT_APP_BASE_URL}/login/${checked === true ? "hacker" : "employer"}`, {
                        accountType: checked === true ? "hackers" : "employers",
                        password,
                        usernameOrEmail,
                        username: usernameOrEmail,
                        userDeviceData
                    }, {
                        withCredentials: true
                    }).then((res) => {
                        if (res.data.message === "Successfully logged in!") {
                            console.log("success!", res.data);
            
                            if (ready === false) {
                                setUser(res.data.data);

                                setPage(2);

                                console.log("first page completed..!");  
                            } 
                        } else {
            
                            console.log("err", res.data);
                            
                            NotificationManager.error(res.data.message, 'ERROR LOGGING-IN!.', 3500);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((errorrrrrrr) => {
                    console.log("errrror fetching IP address information.", errorrrrrrr);
    
                    NotificationManager.error("Error fetching device/IP information - CANNOT sign-in until this information is collected - please try again (not related to password/email).", 'ERROR LOGGING-IN!.', 3500);
                })
            } else if (isMobile === true) {
                // mobile device is being used.
                axios.get("https://ipapi.co/json/").then((responseeee) => {
    
                    const { country, city, ip, region, postal, timezone, version } = responseeee.data;
    
                    const userDeviceData = {
                        ...detectDeviceInfo,
                        isBrowser: false,
                        IPRelatedInformation: {
                            country, 
                            city, 
                            ip, 
                            region, 
                            postal, 
                            timezone, 
                            version
                        }
                    };
                    axios.post(`${process.env.REACT_APP_BASE_URL}/login/${checked === true ? "hacker" : "employer"}`, {
                        accountType: checked === true ? "hackers" : "employers",
                        password,
                        usernameOrEmail,
                        username: usernameOrEmail,
                        userDeviceData
                    }, {
                        withCredentials: true
                    }).then((res) => {
                        if (res.data.message === "Successfully logged in!") {
                            console.log("success!", res.data);
    
                            setPage(2);
    
                            if (ready === false) {
                                setUser(res.data.data);

                                setPage(2);

                                console.log("first page completed..!");  
                            } 
                        } else {
            
                            console.log("err", res.data);
                            
                            NotificationManager.error(res.data.message, 'ERROR LOGGING-IN!.', 3500);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((errorrrrrrr) => {
                    console.log("errrror fetching IP address information.", errorrrrrrr);
                    
                    NotificationManager.error("Error fetching device/IP information - CANNOT sign-in until this information is collected - please try again (not related to password/email).", 'ERROR LOGGING-IN!.', 3500);
                })
            }
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }
    const checkAndContinue = (e) => {
        console.log("checkAndContinue clicked/ran..");
        
        handleSubmission(e, false);
    }
    const renderPagesScreens = () => {
        if (page === 1) {
            return (
                <Fragment>
                    <div className="col-12">
                        <div className="form-group">
                            <input value={data.usernameOrEmail} onChange={handleInputChange} className="form-control" type="text" name="usernameOrEmail" placeholder="Username or Email" />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group">
                            <div className="input-group">
                                <input value={data.password} onChange={handleInputChange} className="form-control custom-password-input-signin" type={hidePassword === true ? "text" : "password"} name="password" placeholder="Password" />
                                <span className="input-group-text custom-input-text-group-transparent"><img onClick={() => {
                                    setHidePassword(!hidePassword);
                                }} src={require("../assets/icons/eye.png")} className="eye-icon-custom" /></span>
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingBottom: "15px" }} className="col-12">
                        <div style={{ flexDirection: "row", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Switch onColor={"#00acee"} onChange={handleChange} checked={checked} />
                            <label style={{ marginLeft: "10px" }}>{switchAccountType}</label>
                        </div>
                    </div>

                    <div className="col-lg-6 col-sm-6 form-condition">
                        <div className="agree-label">
                            {/* <input type="checkbox" id="chb1" />
                            <label forhtml="chb1">Remember Me</label> */}
                        </div>
                    </div>

                    <div className="col-lg-6 col-sm-6">
                        <Link to="/forgot-password">
                            <a style={{ marginBottom: "12.5px" }} className="forget">Forgot my password?</a>
                        </Link>
                    </div>

                    <div className="col-12">
                        <button className="default-btn btn-two" onClick={(e) => checkAndContinue(e)}>
                            Sign-in & Request Verification Code (Text Msg)
                        </button>
                    </div>
                    <div className="col-12">
                        <p className="account-desc">
                            Not a member? <Link to="/sign-up"><a>Sign Up</a></Link>
                        </p>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <h3 className='text-center'>Enter the code we just texted you, this code should be entered exactly as it displays on your device..</h3>
                    <div style={{ marginBottom: "22.5px" }} className='centered-both-ways'>
                        <ReactCodeInput onChange={(value) => setCode(value)} type='number' fields={7} />
                    </div>
                    <hr />
                    {calculateDisplayText()}

                    <div className="col-12">
                        <button className="default-btn btn-two" type="submit">
                            Submit Phone Verification-Code
                        </button>
                    </div>
                </Fragment>
            );
        }
    }

    const handleCodeResend = () => {
        console.log("handleCodeResend clicked/ran..");

        if (seconds === 0) {
            const configgg = {
                authyId: user.authyId,
                formatted: user.phoneNumber, 
                countryCode: "US"
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/send/phone/code/again/auth`, configgg).then((res) => {
                if (res.data.message === "Successfully sent another code!") {
                    console.log("Code sent!", res.data);
    
                    NotificationManager.success(`Successfully sent another code to your connected phone (the number connected to your account you're authenticating with) - please check your device & enter the new code into the input...!`, `Successfully re-sent code to desired/linked cellular number!`, 4750);

                    setSeconds(30);

                } else {
                    console.log("err with code!", res.data);
    
                    NotificationManager.warning("An error occurred while attempting to send the 'recovery email' and the request cannot be made properly, please try again or contact support if the problem persists!", "Could NOT send recovery email/code!", 4750);
                }
            }).catch((errorCode) => {
                console.log("errorCode", errorCode);
    
                NotificationManager.warning("An error occurred while attempting to send the 'recovery email' and the request cannot be made properly, please try again or contact support if the problem persists!", "Could NOT send recovery email/code!", 4750);
            });
        } else {
            NotificationManager.warning(`You may NOT request another code yet for until the current timer count of ${seconds} runs up!`, `Wait ${seconds} more seconds until trying this action again!`, 4750);
        }
    }

    const timerHelper = () => {
        if (seconds === 0) {
         return <a onClick={() => handleCodeResend()} style={{ color: "red", textDecorationLine: "underline" }}>resending the recovery code (using previously entered email..)</a>;
        } else {
         return <a style={{ color: "red", textDecorationLine: "underline" }}>{seconds} seconds until 'next-send' availability</a>;
        }
     }
     const calculateDisplayText = () => {
        if (page === 1) {
            return <p className="reset-desc">Enter the email of your account to reset the password. Then you will receive a link to email to reset the password. If you have any issue about reset password <Link to="/contact"><a>contact us.</a></Link></p>;
        } else if (page === 2) {
            return <p className="reset-desc">Please enter the <strong>recovery code (CASE SENSITIVE)</strong> that was emailed to you a second ago, if you did NOT recieve this code ~ try {timerHelper()}</p>;
        } else {
            return null;
        }
     }

    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevState => prevState - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval);
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    console.log("data", data);
    return (
        <>
            <Navbar />
            
            <PageBanner 
                pageTitle="Sign In" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Sign In" 
            /> 

            <div className="user-area-all-style log-in-area ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Log In to your <em><strong>{checked === true ? "Hacker" : "Employer/Company"}</strong> account</em>!</h2>
                        <p>Use this form to sign-in to your account & access our 'restricted' content and/or authenticated-data side of things, enter your credentials and enter/enjoy the world built for hackers - by hackers!</p>
                    </div>

                    <div className="contact-form-action">
                        <form onSubmit={(event) => handleSubmission(event, true)}>
                            <div className="row">
                                {renderPagesScreens()}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
export default connect(null, { authentication })(SignIn);