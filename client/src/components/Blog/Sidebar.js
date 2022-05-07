import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; 
import moment from "moment";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const Sidebar = ({ blogs }) => {
    
    const renderSkelatonLoading = () => {
        return (
            <Fragment>
                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                    <p>
                        <Skeleton count={30} />
                    </p>
                </SkeletonTheme>
            </Fragment>
        );
    }

    const renderMainContent = () => {
        if (blogs !== null) {
            return (
                <Fragment>
                    {blogs.map((blog, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="item">
                                    <div className="info">
                                        <span className="time">{moment(blog.date).fromNow()}</span>
                                        <h4 className="title usmall">
                                            <Link to={{ pathname: `/blog-details/${blog.id}` }}>
                                                <a style={{ color: "#f73164" }}>{blog.title}</a>
                                                <hr />
                                                <a>{blog.subtitle.slice(0, 70)}{typeof blog.subtitle !== "undefined" && blog.subtitle.length >= 70 ? "..." : ""}</a>
                                            </Link>
                                        </h4>
                                    </div>

                                    <div className="clear"></div>
                                </div>
                            </Fragment>
                        );
                    })}
                </Fragment>
            );
        } else {
            return renderSkelatonLoading();
        }
    }
    return (
        <aside className="widget-area" id="secondary">
            <div className="widget widget_search mt-0">
                <h3 className="widget-title">Search Now</h3>
                <div className="post-wrap">
                    <form className="search-form">
                        <label>
                            <input type="search" className="search-field" placeholder="Search..." />
                        </label>
                        <button type="submit">
                            <i className='bx bx-search'></i>
                        </button>
                    </form>
                </div>
            </div>

            <div className="widget widget-peru-posts-thumb">
                <h3 className="widget-title">Popular Posts</h3>
                <div className="post-wrap">
                    {renderMainContent()}
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


            {/* <div className="widget widget_tag_cloud">
                <h3 className="widget-title">Tags</h3>
                <div className="post-wrap">
                    <div className="tagcloud">
                        <Link to="/blog-grid">
                            <a>Blockchain (3)</a>
                        </Link>

                        <Link to="/blog-grid">
                            <a>Cyber security (3)</a>
                        </Link>

                        <Link to="/blog-grid">
                            <a>Cybercrime (2)</a>
                        </Link>

                        <Link to="/blog-grid">
                            <a>Global news (2)</a>
                        </Link>

                        <Link to="/blog-grid">
                            <a>Ransomware (1)</a>
                        </Link>

                        <Link to="/blog-grid">
                            <a>Whitepapers (2)</a>
                        </Link>
                    </div>
                </div>
            </div>        */}
        </aside>
    )
}

export default Sidebar;