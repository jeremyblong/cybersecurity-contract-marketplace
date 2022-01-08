import React from 'react';
import { useRecoilState } from 'recoil'
import { collapsedState } from '../../utils/recoil-atoms'
import { Link, useHistory } from 'react-router-dom';
import TopHeader from './TopHeader';
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { authentication } from "../../redux/actions/authentication/auth.js";
import { confirmAlert } from 'react-confirm-alert';
import { saveListingData } from "../../redux/actions/employer/listings/listingData.js";
import { saveSoftwareListingInfo } from "../../redux/actions/hackers/createSoftwareListing/createNewSoftwareListingSale.js";

const Navbar = ({ data, authenticated, authentication, saveListingData, saveSoftwareListingInfo }) => {

    const history = useHistory();

    const [collapsed, setCollapsed] = useRecoilState(collapsedState);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    React.useEffect(() => {
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        // window.scrollTo(0, 0);
    })

    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const handleLogout = (e) => {
        axios.get("http://localhost:5000/logout", {
            params: {
                uniqueId: data.uniqueId,
                accountType: data.accountType
            },
            withCredentials: true
        }).then((res) => {
            if (res.data.message === "Successfully logged out!") {
                console.log("res.data - logout", res.data);

                NotificationManager.info('You have successfully logged-out!', 'Successfully deauthenticated...', 3000);

                setTimeout(() => {
                    authentication({});
                    saveListingData({});
                    saveSoftwareListingInfo({});

                    history.push("/");
                }, 3000);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const handlePreviewActivate = () => {
        confirmAlert({
          title: 'Want to Sign-Out?',
          message: "Are you sure you'd like to sign-out? This will take your status 'offline' and will sign you out.",
          buttons: [
            {
              label: 'Sign-out',
              onClick: () => {
                handleLogout();
              }
            },
            {
              label: 'Cancel',
              onClick: () => {
                console.log("do nothing...");
              }
            }
          ]
        });
    }
    return (
        <>
            <header className="header-area fixed-top">
                {/* TopHeader */}
                <TopHeader /> 

                <div className="nav-area">
                    <div id="navbar" className="navbar-area">
                        <div className="main-nav">
                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-md navbar-light">
                                    <Link to="/">
                                        <a onClick={() => setCollapsed(true)} className="navbar-brand">
                                            <img src="/img/logo.png" alt="logo" />
                                        </a>
                                    </Link>
                                    {/* frequently-asked-questions */}
                                    <button 
                                        onClick={toggleNavbar} 
                                        className={classTwo}
                                        type="button" 
                                        data-toggle="collapse" 
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                        aria-expanded="false" 
                                        aria-label="Toggle navigation" 
                                    >
                                        <span className="icon-bar top-bar"></span>
                                        <span className="icon-bar middle-bar"></span>
                                        <span className="icon-bar bottom-bar"></span>
                                    </button>

                                    <div className={classOne} id="navbarSupportedContent">
                                        <ul className="navbar-nav m-auto">
                                            {/* <li className="nav-item custom-nav-item-link"> */}
                                                <li className="nav-item custom-nav-item-link">
                                                    <Link to="/" activeClassName="active">
                                                        <a onClick={e => {}} className="nav-link nav-link-custom-homepage">Home (<strong>Not</strong> dashboard)</a>
                                                    </Link>
                                                </li>

                                                {authenticated === true ? <li className="nav-item custom-nav-item-link">
                                                    <Link to="/dashboard" activeClassName="active">
                                                        <a onClick={e => {}} className="nav-link nav-link-custom-homepage">Go-to <strong style={{ color: "#f73164" }}>Dashboard</strong> (Authenticated)</a>
                                                    </Link>
                                                </li> : null}
                                                {/* <ul className="dropdown-menu">
                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Home One</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/index2" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Home Two</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/index3" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Home Three</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/index4" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Home Four</a>
                                                        </Link>
                                                    </li> 

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/index5" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Home Five</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/index6" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Home Six</a>
                                                        </Link>
                                                    </li>
                                                </ul> */}
                                            {/* </li> */}

                                            <li className="nav-item custom-nav-item-link">
                                                <Link to="/about" activeClassName="active">
                                                    <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">About</a>
                                                </Link>
                                            </li>

                                            <li className="nav-item custom-nav-item-link">
                                                <Link to="/#">
                                                    <a onClick={e => e.preventDefault()} className="nav-link nav-link-custom-homepage">
                                                        Pages <i className='bx bx-chevron-down'></i>
                                                    </a>
                                                </Link>

                                                <ul className="dropdown-menu">
                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/pricing-before-login" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Pricing</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/testimonials" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Testimonials</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/team" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Team</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/frequently-asked-questions" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">FAQ</a>
                                                        </Link>
                                                    </li>
 
                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/#">
                                                            <a onClick={e => e.preventDefault()} className="nav-link nav-link-custom-homepage">
                                                                User <i className='bx bx-chevron-down'></i>
                                                            </a>
                                                        </Link>

                                                        <ul className="dropdown-menu">
                                                            <li className="nav-item custom-nav-item-link">
                                                                <Link to="/sign-in" activeClassName="active">
                                                                    <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Sign In</a>
                                                                </Link>
                                                            </li>

                                                            <li className="nav-item custom-nav-item-link">
                                                                <Link to="/sign-up" activeClassName="active">
                                                                    <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Sign Up</a>
                                                                </Link>
                                                            </li>

                                                            <li className="nav-item custom-nav-item-link">
                                                                <Link to="/forgot-password" activeClassName="active">
                                                                    <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Forgot Password</a>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/coming-soon" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Coming Soon</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/404" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">404 Error Page</a>
                                                        </Link>
                                                    </li>
 
                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/privacy-policy" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Privacy Policy</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/terms-conditions" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Terms & Conditions</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
 
                                            <li className="nav-item custom-nav-item-link">
                                                <Link to="/#" activeClassName="active">
                                                    <a onClick={e => e.preventDefault()} className="nav-link nav-link-custom-homepage">
                                                        Services <i className='bx bx-chevron-down'></i>
                                                    </a>
                                                </Link>
                                                
                                                <ul className="dropdown-menu">
                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/service-details" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Service Details</a>
                                                        </Link>
                                                    </li>
                                                    
                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/services-one" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Services Style One</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/services-two" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Services Style Two</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/services-three" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Services Style Three</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/service-details" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Service Details</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
  
                                            <li className="nav-item custom-nav-item-link">
                                                <Link to="/#">
                                                    <a onClick={e => e.preventDefault()} className="nav-link nav-link-custom-homepage">
                                                        Blog <i className='bx bx-chevron-down'></i>
                                                    </a>
                                                </Link>

                                                <ul className="dropdown-menu">
                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/blog-main" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Blog Main/Grid</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/blog-left-sidebar" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Blog Left Sidebar</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/blog-right-sidebar" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Blog Right Sidebar</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item custom-nav-item-link">
                                                        <Link to="/blog-details" activeClassName="active">
                                                            <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Blog Details</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="nav-item custom-nav-item-link">
                                                <Link to="/contact" activeClassName="active">
                                                    <a onClick={() => setCollapsed(true)} className="nav-link nav-link-custom-homepage">Contact</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="others-option">
                                        <div className="get-quote">
                                            {authenticated === false ? <Link to="/sign-in">
                                                <a className="default-btn">
                                                    Login/Sign-Up - Dashboard
                                                </a>
                                            </Link> : <a onClick={handlePreviewActivate} className="default-secondary-btn">
                                                Sign-Out/Deauthenticate
                                            </a>}
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        data: state.auth.data,
        authenticated: (_.has(state.auth, "data") && Object.keys(state.auth.data).length > 0) ? true : false
    }
}
export default connect(mapStateToProps, { authentication, saveListingData, saveSoftwareListingInfo })(Navbar);
