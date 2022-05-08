import React from 'react';
import {Link} from 'react-router-dom';
import ModalVideo from 'react-modal-video';
import Features from './Features';
import { connect } from "react-redux";
import _ from "lodash";

const MainBanner = ({ authenticatedAccount }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const openModal = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            {/* If you want to change the video need to update videoID */}
            <ModalVideo 
                channel='youtube' 
                isOpen={!isOpen} 
                videoId='pF-3S-HTJSg' 
                onClose={() => setIsOpen(!isOpen)} 
            />
            
            <section style={{ paddingTop: "375px" }} className="banner-area banner-item-bg-1 jarallax">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-9">
                            <div className="banner-text">
                                <span>Freely & transparently interact and engage with anyone/everyone on our platform with no central authority figure. Simply the <strong>best & only</strong> marketplace of its kind..</span>
                                <h1>Get your security tested by a <strong id={"landing-text-main"} style={{ textDecorationLine: "underline" }}>vetted</strong>, ethical <strong id={"landing-text-main"} style={{ textDecorationLine: "underline" }}>hacker</strong> for a reasonable price, <strong id={"landing-text-main"} style={{ textDecorationLine: "underline" }}>GUARANTEED.</strong></h1>
                                <p><strong>'The Hacker Marketplace'</strong> is a <strong>marketplace</strong>/platform that <strong>connects</strong> hackers and employers in order to facilitate testing of various <strong>digital</strong> and <strong>physical</strong> security assets. User's can freely interact and engage with one another without any central authority figure present. Hire hackers to test your company's security at a <strong>fraction</strong> of the price of standard/typical testing with a security firm. Post a job, hacker's will apply to said job, investigate and attempt to exploit said systems, report findings, and so on. We handle the entire process, <strong>start</strong> to <strong>finish</strong>!</p>

                                <div className="banner-btn">
                                    {authenticatedAccount === true ? <Link to="/dashboard">
                                        <a className="default-btn">
                                            Redirect To Dashboard
                                        </a>
                                    </Link> : <Link to="/contact">
                                        <a className="default-btn">
                                            Booking Now
                                        </a>
                                    </Link>}
                                    <Link to="/about">
                                        <a className="default-btn active">
                                            About Us
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3">
                            <div className="video-btn-animat one">
                                <div
                                    onClick={e => {e.preventDefault(); openModal()}}
                                    className="video-btn popup-youtube"
                                > 
                                    <i className="bx bx-play"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                {/* Features */}
                <Features />
                
                <div className="lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </section>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        authenticatedAccount: !_.isEmpty(state.auth.data) ? true : false
    }
}
export default connect(mapStateToProps, { })(MainBanner);