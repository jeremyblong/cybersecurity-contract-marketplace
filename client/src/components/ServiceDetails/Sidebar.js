import React from 'react';
import {Link} from 'react-router-dom'; 

const Sidebar = () => {
    return (
        <div className="sidebar-pl-15">
            <aside className="widget-area" id="secondary">
                <div className="widget widget_search">
                    <h3 className="widget-title">Search Now</h3>
                    <div className="post-wrap">
                        <form className="search-form">
                            <label>
                                <input type="search" className="search-field" placeholder="Search..." />
                            </label>
                            <button type="submit"><i className='bx bx-search'></i></button>
                        </form>
                    </div>
                </div>
                
                <section className="widget widget_categories">
                    <h3 className="widget-title">Quick Redirect (s)</h3>
                    <div className="post-wrap">
                        <ul>
                            <li>
                                <Link to="/sign-in">
                                    <a>Sign-in/Sign-Up</a>
                                </Link>
                            </li>
                            <li>
                                <Link to="contact">
                                    <a>Contact</a>
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing-before-login">
                                    <a>Subscription/Pricing Plans</a>
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-and-conditions">
                                    <a>Terms & Conditions</a>
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog-main">
                                    <a>Blogging Related</a>
                                </Link>
                            </li>
                            <li>
                                <Link to="/team">
                                    <a>Team (Current)</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* <section className="widget widget_tag_cloud">
                    <h3 className="widget-title">Tags</h3>
                    <div className="post-wrap">
                        <div className="tagcloud">
                            <Link href="#">
                                <a>Blockchain (3)</a>
                            </Link>
                            <Link href="#">
                                <a>Cyber security (3)</a>
                            </Link>

                            <Link href="#">
                                <a>Cybercrime (2)</a>
                            </Link>

                            <Link href="#">
                                <a>Global news (2)</a>
                            </Link>

                            <Link href="#">
                                <a>Ransomware (1)</a>
                            </Link>

                            <Link href="#">
                                <a>Whitepapers (2)</a>
                            </Link>
                        </div>
                    </div>
                </section>        */}
            </aside>
        </div>
    )
}

export default Sidebar;