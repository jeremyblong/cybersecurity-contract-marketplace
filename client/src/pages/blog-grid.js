import React, { useState, useEffect, Fragment } from 'react';
import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/_App/Footer';
import { Link } from 'react-router-dom'; 
import axios from "axios";
import ShowMoreText from "react-show-more-text";

const BlogGrid = () => {

    const [ blogs, setBlogsState ] = useState([]);
    const [ blogOpenMore, setBlogViewMoreOpen ] = useState({});

    useEffect(() => {
        const configuration = {
            params: {

            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/all/blogs/forward/facing`, configuration).then((res) => {
            if (res.data.message === "Gathered blogs!") {
                console.log(res.data);

                const { blogs } = res.data;

                const newBlogOpenState = {};
                
                for (let index = 0; index < blogs.length; index++) {
                    newBlogOpenState[index] = false;
                }

                setBlogViewMoreOpen(newBlogOpenState);
                setBlogsState(blogs);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    console.log("logging...:", blogOpenMore, blogs);

    return (
        <>
            <Navbar />

            <PageBanner 
                pageTitle={`Blog's Posted By 'The Hacker Marketplace'`} 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText={`Blog's Posted By 'The Hacker Marketplace'`} 
            /> 

            <section className="blog-area ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>Latest News From "The Hacker Marketplace"</h2>
                        <p>View our blogs, updates and <strong>any new content</strong> availiable on "The Hacker Marketplace"! We post <strong>very frequently</strong> so make sure to <strong>stay tuned</strong> for breaking news, tutorials, updates on local cybersecurity "best practices" & much more..</p>
                    </div>

                    <div className="row">
                        {typeof blogs !== "undefined" && blogs.length > 0 ? blogs.map((blog, index) => {
                            return (
                                <Fragment>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single-blog">
                                            <img src="/img/blog/blog1.jpg" alt="Image" />
                                            <span>{blog.viewedBy.length} Total View(s)</span>
                                            <div className="blog-content">
                                                <h3>
                                                    <Link to={{ pathname: `/blog-details/${blog.id}` }}>
                                                        <a>{blog.title.slice(0, 55)}{typeof blog.title !== "undefined" && blog.title.length >= 55 ? "..." : ""}</a>
                                                    </Link>
                                                </h3>
                                                <p>{blog.subtitle.slice(0, 75)}{typeof blog.subtitle !== "undefined" && blog.subtitle.length >= 75 ? "..." : ""}</p>
                                                <Link to={{ pathname: `/blog-details/${blog.id}` }}>
                                                    <a className="read-more">Read More...</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        }) : null}
                        {/* Pagination */}
                        <div className="col-lg-12">
                            <div className="page-navigation-area">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <Link to={"/"}>
                                            <a className="page-link page-links">
                                                <i className='bx bx-chevrons-left'></i>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="page-item active">
                                        <Link to={"/"}>
                                            <a className="page-link">1</a>
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to={"/"}>
                                            <a className="page-link">2</a>
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to={"/"}>
                                            <a className="page-link">3</a>
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to={"/"}>
                                            <a className="page-link">
                                                <i className='bx bx-chevrons-right'></i>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default BlogGrid;