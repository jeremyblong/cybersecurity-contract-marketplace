import React from 'react';
import {Link} from 'react-router-dom'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer className="footer-top-area pt-100 pb-70 jarallax">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget contact">
                                <h3>Contact Us</h3>

                                <ul className="contact-info">
                                    <li>
                                        <i className="bx bx-phone-call"></i>
                                        <span>Support:</span> 
                                        <a href="tel:Phone:+19808006253">
                                            Phone: +1(980)-800-6253
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <i className="bx bx-envelope"></i>
                                        <span>Email:</span> 
                                        <a className='wrapme' href="mailto:support@thehackermarketplace.com">
                                            support@thehackermarketplace.com
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <i className="bx bx-location-plus"></i>
                                        <span>Address:</span> 
                                            Central Los Angeles, CA 90012
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>Services Link</h3>

                                <ul>
                                    <li>
                                        <Link href="/service-details">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Web Site Protection
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Hosting & Server Guard
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Web Administrator
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Conducting Training
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                GRPS Smart Protection
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Security App
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>Support & Help</h3>

                                <ul>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Support Forum
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                FAQ Questions
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                24/7 Support for Help
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Counseling 
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Protection
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Securihty
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="single-widget">
                                <h3>Quick Links</h3>

                                <ul>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Security
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Protection
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Antivirus Packages
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Security App 
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Website Security 
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>
                                                <i className="bx bx-chevrons-right"></i>
                                                Digital Security
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="footer-bottom-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="copy-right">
                                <p>Copyright &copy;{currentYear} Pisa. Designed <a href="https://envytheme.com/" target="blank">EnvyTheme</a></p>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="condition-privacy">
                                <ul>
                                    <li>
                                        <Link href="/terms-conditions">
                                            <a>Terms & Condition</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">
                                            <a>Privacy Policy</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;