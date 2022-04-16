import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'; 
import axios from "axios";
import Slider from "react-slick";
import "./styles.css";


const settings = {
    dots: true,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 3,
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


const LatesNews = () => {
	// initalize state..
	const [ blogs, setBlogsState ] = useState([]);
    const [ blogOpenMore, setBlogViewMoreOpen ] = useState({});

	useEffect(() => {
        const configuration = {
            params: {}
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/all/blogs/forward/facing`, configuration).then((res) => {
            if (res.data.message === "Gathered blogs!") {
                console.log(res.data);

                const { blogs } = res.data;

                const newBlogOpenState = {};
                
                for (let index = 0; index < blogs.length; index++) {
                    newBlogOpenState[index] = false;
                }
				// set/update state data
                setBlogViewMoreOpen(newBlogOpenState);
                setBlogsState(blogs);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    return (
        <section className="blog-area pb-70">
			<div className="container">
				<div className="section-title">
					<h2>Latest News From "The Hacker Marketplace"</h2>
					<p>View our blogs, updates and <strong>any new content</strong> availiable on "The Hacker Marketplace"! We post <strong>very frequently</strong> so make sure to <strong>stay tuned</strong> for breaking news, tutorials, updates on local cybersecurity "best practices" & much more..</p>
				</div>

				<div className="row">
					<Slider className={"slider-settings-blogs-homepage"} {...settings}>
						{typeof blogs !== "undefined" && blogs.length > 0 ? blogs.map((blog, index) => {
							return (
								<Fragment key={index}>
									<div className="col-lg-12 col-sm-12">
										<div className="single-blog-stretch-both-ways">
											<img src="/img/blog/blog1.jpg" alt="Image" className={"img-fluid-both-ways"} />
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
					</Slider>
				</div>
			</div>
		</section>
    )
}

export default LatesNews;