import React, { useState } from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/_App/Footer';
import {Link, useHistory} from 'react-router-dom'; 
import Switch from "react-switch";
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import { authentication } from "../redux/actions/authentication/auth.js";
import { connect } from "react-redux";

const SignIn = ({ authentication }) => {

    const history = useHistory();

    const [ checked, setchecked ] = useState(false);
    const [ data, setData ] = useState({});
    const [ switchAccountType, switchType ] = useState("You're logging in as - 'Company/Employer'");

    const handleChange = (checked) => {
        setchecked(checked);

        if (checked === true) {
            switchType("You're logging in as - 'Hacker/Security Expert'")
        } else {
            switchType("You're logging in as - 'Company/Employer'");
        }
    }
    const handleSubmission = (e) => {
        e.preventDefault();

        console.log("submitted.");

        const { password, usernameOrEmail } = data;

        axios.post("http://localhost:5000/login/hacker", {
            accountType: checked === true ? "hackers" : "employers",
            password,
            usernameOrEmail,
            username: usernameOrEmail
        }).then((res) => {
            if (res.data.message === "Successfully logged in!") {
                console.log("success!", res.data);

                NotificationManager.success('Successful authentication! You will be logged-in momentarily...', 'Successfully authenticated!', 3000);

                setTimeout(() => {
                    // do authentication - registration redux logic
                    authentication(res.data.data);

                    history.push("/dashboard");
                }, 3000);
            } else {
                NotificationManager.error('An error occurred when attempting to login...Please try again.', 'ERROR LOGGING-IN!.', 3500);
            }
        }).catch((err) => {
            console.log(err);
        })
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
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium quas cumque iste veniam id dolorem deserunt ratione error voluptas rem ullam possimus placeat, ut, odio</p>
                    </div>

                    <div className="contact-form-action">
                        <form onSubmit={handleSubmission}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={data.usernameOrEmail} onChange={handleInputChange} className="form-control" type="text" name="usernameOrEmail" placeholder="Username or Email" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={data.password} onChange={handleInputChange} className="form-control" type="password" name="password" placeholder="Password" />
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
                                        <input type="checkbox" id="chb1" />
                                        <label forhtml="chb1">Remember Me</label>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-6">
                                    <Link to="/forgot-password">
                                        <a className="forget">Forgot my password?</a>
                                    </Link>
                                </div>

                                <div className="col-12">
                                    <button className="default-btn btn-two" type="submit">
                                        Sign In
                                    </button>
                                </div>

                                <div className="col-12">
                                    <p className="account-desc">
                                        Not a member? <Link to="/sign-up"><a>Sign Up</a></Link>
                                    </p>
                                </div>
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