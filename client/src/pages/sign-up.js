import React, { Component } from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/_App/Footer';
import {Link} from 'react-router-dom'; 
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import { authentication } from "../redux/actions/authentication/auth.js";
import { connect } from "react-redux";
import Switch from "react-switch";
import { withRouter } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'


class SignUp extends Component {
constructor (props) {
    super(props);

    this.state = {
        data: {},
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        username: "",
        agreement: false,
        switchAccountType: "You're registering as a 'Company/Employer'",
        checked: false,
        referralCode: "",
        phoneNumber: ""
    }
}

    handleCheckChange = (checked) => {
        console.log(checked);

        this.setState({
            checked,
            switchAccountType: checked === true ? "You're registering as a 'Hacker/Security Expert'" : "You're registering as a 'Company/Employer'"
        })
    }
    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value
        })
    }
    handleSubmission = (e) => {
        e.preventDefault();

        console.log("submitted.");

        const { firstName, lastName, email, username, password, agreement, checked, referralCode, phoneNumber } = this.state;

        if ((typeof phoneNumber !== "undefined" && phoneNumber.length >= 10) && (typeof firstName !== "undefined" && firstName.length > 0) && (typeof lastName !== "undefined" && lastName.length > 0) && (typeof email !== "undefined" && email.length > 0) && (typeof username !== "undefined" && username.length > 0) && (typeof password !== "undefined" && password.length > 0)) {
            if (agreement === true) {
                // agreed
                axios.post(`${process.env.REACT_APP_BASE_URL}/registration/${checked === true ? "hacker" : "employer"}`, {
                    firstName, 
                    lastName, 
                    email, 
                    username, 
                    password, 
                    agreement,
                    referralCode,
                    phoneNumber,
                    accountType: checked === true ? "hackers" : "employers"
                }, {
                    withCredentials: true
                }).then((res) => {
                    if (res.data.message === "Successfully registered!") {
                        console.log("success!", res.data);

                        this.setState({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            username: "",
                            agreement: false,
                            referralCode: null,
                            phoneNumber: "",
                            checked: false,
                            switchAccountType: "You're registering as a 'Company/Employer'"
                        }, () => {
                            NotificationManager.success('Successfully registered! We will log you in momentarily...', 'Successfully registered!', 3000);

                            setTimeout(() => {
                                // do authentication - registration redux logic

                                this.props.authentication(res.data.data);

                                if (res.data.data.accountType === "employers") {
                                    this.props.history.push("/dashboard/employer");
                                } else {
                                    this.props.history.push("/dashboard/hacker");
                                }
                            }, 3000);
                        })
                    } else if (res.data.message === "An unknown error has occurred while trying to locate referring user - please make sure you're entering a 'proper referral code' as we were unable to find any results for a user with that information/code..") {
                        NotificationManager.error(res.data.message, "Enter a VALID referral code OR just don't use one!", 4750);
                    } else {
                        NotificationManager.error('An error occurred during the registration process - please try again...', 'ERROR REGISTERING.', 3500);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                // didnt agree yet
                NotificationManager.warning('You MUST agree to the terms & conditions before continuing with registration!', 'Please agree to terms & conditions', 3500);
            }
        } else {
            NotificationManager.error('Error... You must complete all of the required fields before proceeding.', 'Complete all fields!', 3500);
        }
    }
    render () {
        console.log(this.state);

        const { switchAccountType, checked } = this.state;
        return (
            <>
                <Navbar />
                
                <PageBanner 
                    pageTitle="Sign Up" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Sign Up" 
                /> 

                <section className="user-area-all-style sign-up-area ptb-100">
                    <div className="container">
                        <div className="section-title">
                            <h2>Create an account!</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium quas cumque iste veniam id dolorem deserunt ratione error voluptas rem ullam possimus placeat, ut, odio</p>
                        </div>
                        
                        <div className="contact-form-action">
                            <form onSubmit={this.handleSubmission}>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                        <p style={{ marginBottom: "15px" }}>{checked === false ? "*You're registering as a company - we will only gather breif infomation now but you will be required to submit detailed information before posting jobs*" : "*Your name will be publically visible when recognized for successful reports - feel free to use a alias."}</p>
                                        <div className="form-group">
                                            <input 
                                                value={this.state.firstName}
                                                onChange={this.handleChange}
                                                className="form-control" type="text" 
                                                name="firstName" 
                                                placeholder="First Name" />
                                        </div>
                                        
                                    </div>

                                    <div className="col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <input 
                                            className="form-control" 
                                            type="text" 
                                            value={this.state.lastName}
                                            onChange={this.handleChange}
                                            name="lastName" 
                                            placeholder="Last Name" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <input 
                                            className="form-control" 
                                            type="text" 
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            name="username"
                                            placeholder="Username" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <input 
                                            className="form-control" 
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            name="email" 
                                            placeholder="Email Address" />
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <input 
                                            className="form-control" 
                                            type="text" 
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            name="password" 
                                            placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <PhoneInput
                                                defaultCountry="US"
                                                placeholder="Enter your phone number.."
                                                value={this.state.phoneNumber}
                                                onChange={(value) => {
                                                    this.setState({
                                                        phoneNumber: value
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <input 
                                            className="form-control" 
                                            type="text" 
                                            value={this.state.referralCode}
                                            onChange={this.handleChange}
                                            name="referralCode" 
                                            placeholder="Enter your referral code (if you have one.. *NOT REQUIRED*)" />
                                        </div>
                                    </div>

                                    <div style={{ paddingBottom: "15px" }} className="col-12">
                                        <div style={{ flexDirection: "row", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Switch onColor={"#00acee"} onChange={this.handleCheckChange} checked={checked} />
                                            <label style={{ marginLeft: "10px" }}>{switchAccountType}</label>
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-sm-12 col-xs-12 form-condition">
                                        <div className="agree-label">
                                            <input value={this.state.agreement} onChange={() => {
                                                this.setState({
                                                    agreement: !this.state.agreement
                                                })
                                            }} type="checkbox" id="chb2" />
                                            <label forhtml="chb2">
                                                I agree with Pisa  
                                                <Link to="/terms-conditions"><a>Terms & Conditions</a></Link> & 
                                                <Link to="/privacy-policy"><a>Privacy Policy</a></Link>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button className="default-btn btn-two" type="submit">
                                            Sign Up
                                        </button>
                                    </div>
                                    
                                    <div className="col-12">
                                        <p className="account-desc">
                                            Already have an account? <Link to="/sign-in"><a>Sign In</a></Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            
                <Footer />
            </>
        )
    }
}

export default connect(null, { authentication })(withRouter(SignUp));