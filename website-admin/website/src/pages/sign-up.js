import React, { Component } from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/_App/Footer';
import {Link} from 'react-router-dom'; 
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import { authentication } from "../redux/actions/authentication/auth.js";
import { connect } from "react-redux";

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
        agreement: false
    }
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

        const { firstName, lastName, email, username, password, agreement } = this.state;

        if ((typeof firstName !== "undefined" && firstName.length > 0) && (typeof lastName !== "undefined" && lastName.length > 0) && (typeof email !== "undefined" && email.length > 0) && (typeof username !== "undefined" && username.length > 0) && (typeof password !== "undefined" && password.length > 0)) {
            if (agreement === true) {
                // agreed
                axios.post("http://localhost:5000/registration/hacker", {
                    firstName, 
                    lastName, 
                    email, 
                    username, 
                    password, 
                    agreement
                }).then((res) => {
                    if (res.data.message === "Successfully registered!") {
                        console.log("success!", res.data);

                        this.setState({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            username: "",
                            agreement: false
                        }, () => {
                            NotificationManager.success('Successfully registered! We will log you in momentarily...', 'Successfully registered!', 3000);

                            setTimeout(() => {
                                // do authentication - registration redux logic

                                this.props.authentication(res.data.data);
                            }, 3000);
                        })
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
                                        <p style={{ marginBottom: "15px" }}>*Your name will be publically visible when recognized for successful reports - feel free to use a alias.</p>
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

export default connect(null, { authentication })(SignUp);