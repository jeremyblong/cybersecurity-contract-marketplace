import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Slider from "react-slick";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import moment from "moment";
import "./styles.css";
import { Col, Row } from "reactstrap";


const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    draggable: true,
    speed: 500,
    rows: 1,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};


const RelatedServices = () => {
    const [ blogs, setBlogs ] = useState([]);

    useEffect(() => {
		const configuration = {};

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/all/blogs/forward/facing/snippet`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered blogs snippet!") {
                console.log(res.data);

                const { blogs } = res.data;

                setBlogs(blogs);

            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
	}, []);

    const renderSkelatonLoading = () => {
        return (
            <Fragment>
                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                    <p>
                        <Skeleton count={15} />
                    </p>
                </SkeletonTheme>
            </Fragment>
        );
    }

    const renderMainContent = () => {
        if (blogs !== null) {
            return true;
        } else {
            return false;
        }
    }

    console.log("blogs", blogs);
    
    return (
        <>
            <h3 className="services-related-post">Related Blog Post's</h3>
            <div className="row">
                {renderMainContent() ? <Slider className={"slider-blogs-snippet"} {...settings}>
                    {blogs.map((blog, index) => {
                        return (
                            <div>
                                <div className='inlined-display' key={index}>
                                    <div className="col-lg-12 col-sm-12">
                                        <div className="single-solutions solutions-time-bg-1 stretch-blog-snippet-post mb-0 mb-ud">
                                            <div className="solutions-content">
                                                <Link to={{ pathname: `/blog-details/${blog.id}` }}>
                                                    <a style={{ color: "#f73164", fontWeight: "bold" }}>{blog.title}</a>
                                                    <hr />
                                                    <a>{blog.subtitle.slice(0, 70)}{typeof blog.subtitle !== "undefined" && blog.subtitle.length >= 70 ? "..." : ""}</a>
                                                </Link>

                                                <Link to={{ pathname: `/blog-details/${blog.id}` }}>
                                                    <a className="read-more">Read More</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {moment(blog.date).fromNow()} */}
                                </div>
                            </div>
                        );
                    })}
                </Slider> : renderSkelatonLoading()}
            </div>
        </>
    )
}

export default RelatedServices;