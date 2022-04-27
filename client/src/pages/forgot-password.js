import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/_App/Footer';
import { Link, useHistory } from 'react-router-dom'; 
import axios from "axios";
import { NotificationManager } from "react-notifications";


const ForgotPassword = () => {

    const history = useHistory();

    const [ providedEmail, setProvidedEmail ] = useState("");
    const [ returnedCode, setReturnedCode ] = useState(null);
    const [ page, setPage ] = useState(1);
    const [ seconds, setSeconds ] =  useState(0);
    const [ newPassword, setNewPassword ] = useState("");
    const [ code, setCode ] = useState("");


    const submitPasswordRecoveryAttemptEmail = (e) => {
        e.preventDefault();

        console.log("submitPasswordRecoveryAttemptEmail clicked/ran..!");

        const validateEmail = (email) => {
            return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };

        if (validateEmail(providedEmail)) {
            const configgg = {
                providedEmail
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/send/email/password/recovery/attempt`, configgg).then((res) => {
                if (res.data.message === "Successfully sent recovery email with code!") {
                    console.log("Code matches!", res.data);

                    const { code } = res.data;
    
                    NotificationManager.success('Successfully sent code to the email provided - please check your email and enter the provided code to gain access back to your account...', 'Successfully sent recovery email!', 4750);

                    setReturnedCode(code);
                    setPage(2);

                } else {
                    console.log("err with code!", res.data);
    
                    NotificationManager.warning("An error occurred while attempting to send the 'recovery email' and the request cannot be made properly, please try again or contact support if the problem persists!", "Could NOT send recovery email/code!", 4750);
                }
            }).catch((errorCode) => {
                console.log("errorCode", errorCode);
    
                NotificationManager.warning("An error occurred while attempting to send the 'recovery email' and the request cannot be made properly, please try again or contact support if the problem persists!", "Could NOT send recovery email/code!", 4750);
            });
        } else {
            NotificationManager.warning("Please enter a proper/valid email before attempting to recover your account, the email provided seems to be incorrect or incomplete!", "Email doesn't appear to be in the correct format!", 4750);
        }
    }

    const handleCodeSubmission = (e) => {
        e.preventDefault();

        console.log("handleCodeSubmission clicked/ran..!");

        if (typeof code !== "undefined" && code.length >= 12) {
            const configgg = {
                code,
                returnedCode
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/check/code/recovery/password/reset`, configgg).then((res) => {
                if (res.data.message === "Successfully matched both codes!") {
                    console.log("Code matches!", res.data);
    
                    NotificationManager.success('Successfully recovered your account - you may now set your password! Please change your password & do NOT share it with ANYONE ever!', 'Code matches, successful account recovery! Enter a new password..', 4750);

                    setPage(3);

                } else if (res.data.message === "Code does NOT match!") {
                    console.log("err with code!", res.data);
    
                    NotificationManager.error("The code you've provided does NOT match our records, please try again with a correct code (case sensitive) or contact support if the problem persists!", "The code you entered does NOT match our records..", 4750);
                } else {
                    NotificationManager.error("There was an error processing your request, please try again or contact support if the problem persists!", "An unknown error has occurred while processing your request!", 4750);
                }
            }).catch((errorCode) => {
                console.log("errorCode", errorCode);
    
                NotificationManager.error("There was an error processing your request, please try again or contact support if the problem persists!", "An unknown error has occurred while processing your request!", 4750);
            });
        } else {
            NotificationManager.warning("Please enter the FULL length of the code sent to your email, the provided code was too short in length..", "Enter a longer length code! Code did NOT match and is TOO SHORT!", 4750);
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

    const submitPasswordChange = (e) => {

        e.preventDefault();
        
        console.log("submitPasswordChange clicked/ran..!");

        if (typeof newPassword !== "undefined" && newPassword.length >= 12) {
            const configgg = {
                newPassword,
                returnedCode,
                code,
                providedEmail
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/submit/password/change/relevant/email`, configgg).then((res) => {
                if (res.data.message === "Successfully set your new password!") {
                    console.log("Code matches!", res.data);
    
                    NotificationManager.success(`Successfully recovered your account - We've updated/changed your password to your desired entry - congrats on recovering your account! Try to remember your credentials going forward..`, 'Successfully updated the password for your account!', 4750);

                    setTimeout(() => {
                        history.push("/sign-in");
                    }, 1750);

                } else if (res.data.message === "Password could NOT be properly set!") {
                    console.log("err with code!", res.data);
    
                    NotificationManager.error("We unfortunately were unable to submit your password change successfully, please try submitting your new password again or contact support if the problem persists!", "Error trying to set new password!", 4750);
                } else {
                    NotificationManager.error("We unfortunately were unable to submit your password change successfully, please try submitting your new password again or contact support if the problem persists!", "Error trying to set new password!", 4750);
                }
            }).catch((error) => {
                console.log("error", error);
    
                NotificationManager.error("There was an error processing your request, please try again or contact support if the problem persists!", "An unknown error has occurred while processing your request!", 4750);
            });
        } else {
            NotificationManager.warning("Your password MUST be AT-LEAST 12 CHARACTERS IN LENGTH! Please enter a longer/valid password before proceeding...", "Please enter a password of at least 12 characters/digits!", 4750);
        }
    }
    
    const renderPageContent = () => {
        if (page === 1) {
            return (
                <Fragment>
                    <form onSubmit={submitPasswordRecoveryAttemptEmail}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input value={providedEmail} onChange={(e) => setProvidedEmail(e.target.value)} className="form-control" type="text" name="name" placeholder="Enter Email Address" />
                                </div>
                            </div>
                            
                            <div className="col-lg-6 col-sm-6">
                                <Link to="/sign-in">
                                    <a className="now-log-in font-q">Sign In your account</a>
                                </Link>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <p className="now-register">
                                    Not a member?
                                    <Link to="/sign-up"><a className="font-q">Sign Up</a></Link>
                                </p>
                            </div>
                            <div className="col-12">
                                <button className="default-btn btn-two" type="submit">
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </form>
                </Fragment>
            );
        } else if (page === 2) {
            return (
                <Fragment>
                    <form onSubmit={handleCodeSubmission}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input value={code} onChange={(e) => setCode(e.target.value)} className="form-control" type="text" name="name" placeholder="Enter the 'recovery code' that was emailed to you.." />
                                </div>
                            </div>
                            
                            <div className="col-lg-6 col-sm-6">
                                <Link to="/sign-in">
                                    <a className="now-log-in font-q">Sign In your account</a>
                                </Link>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <p className="now-register">
                                    Not a member?
                                    <Link to="/sign-up"><a className="font-q">Sign Up</a></Link>
                                </p>
                            </div>
                            <div className="col-12">
                                <button className="default-btn btn-two" type="submit">
                                    Submit Recovery Code!
                                </button>
                            </div>
                        </div>
                    </form>
                </Fragment>
            );
        } else if (page === 3) {
            return (
                <Fragment>
                    <form onSubmit={submitPasswordChange}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" type="text" name="name" placeholder="Submit your new password (this will be your password going forward)...!" />
                                </div>
                            </div>
                            
                            <div className="col-lg-6 col-sm-6">
                                <Link to="/sign-in">
                                    <a className="now-log-in font-q">Sign In your account</a>
                                </Link>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <p className="now-register">
                                    Not a member?
                                    <Link to="/sign-up"><a className="font-q">Sign Up</a></Link>
                                </p>
                            </div>
                            <div className="col-12">
                                <button className="default-btn btn-two" type="submit">
                                    Submit New Password Change! (This will activate your new password..)
                                </button>
                            </div>
                        </div>
                    </form>
                </Fragment>
            );
        }
    }
    const handleEmailResend = () => {

        const validateEmail = (email) => {
            return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };

        if (validateEmail(providedEmail)) {
            const configgg = {
                providedEmail
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/send/email/password/recovery/attempt`, configgg).then((res) => {
                if (res.data.message === "Successfully sent recovery email with code!") {
                    console.log("Code matches!", res.data);

                    const { code } = res.data;
    
                    NotificationManager.success('Successfully sent code to the previously entered email - please check your email and enter the provided code to gain access back to your account (this WILL be an entirely different code)...', 'Successfully sent recovery email!', 4750);

                    setReturnedCode(code);
                    setPage(2);
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
            NotificationManager.warning("Please enter a proper/valid email before attempting to recover your account, the email provided seems to be incorrect or incomplete!", "Email doesn't appear to be in the correct format!", 4750);
        }
    }
    const timerHelper = () => {
       if (seconds === 0) {
        return <a onClick={() => handleEmailResend()} style={{ color: "red", textDecorationLine: "underline" }}>resending the recovery code (using previously entered email..)</a>;
       } else {
        return <a style={{ color: "red", textDecorationLine: "underline" }}>{seconds} seconds until 'next-send' availability</a>;
       }
    }
    const calculateDisplayText = () => {
        if (page === 1) {
            return <p className="reset-desc">Enter the email of your account to reset the password. Then you will receive a link to email to reset the password. If you have any issue about reset password <Link to="/contact"><a>contact us.</a></Link></p>;
        } else if (page === 2) {
            return <p className="reset-desc">Please enter the <strong>recovery code (CASE SENSITIVE)</strong> that was emailed to you a second ago, if you did NOT recieve this code ~ try {timerHelper()}</p>;
        } else if (page === 3) {
            return <p className="reset-desc">Please enter your <strong>new password</strong> as we've successfully authenticated your request & you may now change your credentials! Remember to write this down or save it somewhere safe so you don't have to go through this process again..</p>;
        } else {
            return null;
        }
    }
    return (
        <>
            <Navbar />
            
            <PageBanner 
                pageTitle="Forgot Password" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Forgot Password" 
            /> 

            <div className="user-area-all-style recover-password-area ptb-100">
                <div className="container">
                    <div className="contact-form-action">
                        <div className="form-heading text-center">
                            <h3 className="form-title">Reset Password!</h3>
                            {calculateDisplayText()}
                        </div>
                        {renderPageContent()}
                    </div>
                </div>
            </div>
        
            <Footer />
        </>
    )
}

export default ForgotPassword;