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
                videoId='bk7McNUjWgw' 
                onClose={() => setIsOpen(!isOpen)} 
            />
            
            <section className="banner-area banner-item-bg-1 jarallax">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-9">
                            <div className="banner-text">
                                <span>All Research up to Blockchain Interoperability is completed</span>
                                <h1>Modern Information Protect from Hackers</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil architecto laborum eaque! Deserunt maxime, minus quas molestiae reiciendis esse natus nisi iure.</p>

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