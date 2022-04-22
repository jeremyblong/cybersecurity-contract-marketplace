import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Row, Col } from "reactstrap";
import "./styles.css";
import ReactPlayer from "react-player";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const HighPerformanceSolutions = () => {

	const [ blogs, setBlogsState ] = useState([]);

	useEffect(() => {
        const configuration = {
            params: {}
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/all/blogs/forward/facing`, configuration).then((res) => {
            if (res.data.message === "Gathered blogs!") {
                console.log(res.data);

                const { blogs } = res.data;

                setBlogsState(blogs);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

	console.log("blogs", blogs);

	const renderBlogContent = () => {
		if (typeof blogs !== "undefined" && blogs.length > 0) {
			return (
				<Fragment>
					<div className="row">
						<div className="col-lg-5">
							<div className="single-solutions solutions-time-bg-1">
								<div className="solutions-content">
									<h3>{blogs[0].title.slice(0, 55)}{typeof blogs[0].title !== "undefined" && blogs[0].title.length >= 55 ? "..." : ""}</h3>
									<p>{blogs[0].subtitle.slice(0, 125)}{typeof blogs[0].subtitle !== "undefined" && blogs[0].subtitle.length >= 125 ? "..." : ""}</p>
									<p className='lead' style={{ color: "#f73164" }}>{blogs[0].totalViews} Total View's</p>
									<hr />
									<p className='lead' style={{ color: "#f73164" }}>{blogs[0].likes}/{blogs[0].dislikes} ~ <em style={{ color: "green" }}>likes</em>/<em style={{ color: "red" }}>dislikes</em></p>
									<Link to={{ pathname: `/blog-details/${blogs[0].id}` }}>
										<a className="read-more">Read/View More</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="row">
								<div className="col-lg-6 col-sm-6">
									<div className="single-solutions solutions-time-bg-2">
										<div className="solutions-content">
										<h3>{blogs[1].title.slice(0, 55)}{typeof blogs[1].title !== "undefined" && blogs[1].title.length >= 55 ? "..." : ""}</h3>
										<p>{blogs[1].subtitle.slice(0, 125)}{typeof blogs[1].subtitle !== "undefined" && blogs[1].subtitle.length >= 125 ? "..." : ""}</p>
										<p className='lead' style={{ color: "#f73164" }}>{blogs[1].totalViews} Total View's</p>
										<hr />
										<p className='lead' style={{ color: "#f73164" }}>{blogs[1].likes}/{blogs[1].dislikes} ~ <em style={{ color: "green" }}>likes</em>/<em style={{ color: "red" }}>dislikes</em></p>
										<Link to={{ pathname: `/blog-details/${blogs[1].id}` }}>
											<a className="read-more">Read/View More</a>
										</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-sm-6">
									<div className="single-solutions solutions-time-bg-3">
										<div className="solutions-content">
											<h3>{blogs[2].title.slice(0, 55)}{typeof blogs[2].title !== "undefined" && blogs[2].title.length >= 55 ? "..." : ""}</h3>
											<p>{blogs[2].subtitle.slice(0, 125)}{typeof blogs[2].subtitle !== "undefined" && blogs[2].subtitle.length >= 125 ? "..." : ""}</p>
											<p className='lead' style={{ color: "#f73164" }}>{blogs[2].totalViews} Total View's</p>
											<hr />
											<p className='lead' style={{ color: "#f73164" }}>{blogs[2].likes}/{blogs[2].dislikes} ~ <em style={{ color: "green" }}>likes</em>/<em style={{ color: "red" }}>dislikes</em></p>
											<Link to={{ pathname: `/blog-details/${blogs[2].id}` }}>
												<a className="read-more">Read/View More</a>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="row">
								<div className="col-lg-6 col-sm-6">
									<div className="single-solutions solutions-time-bg-4">
										<div className="solutions-content">
											<h3>{blogs[3].title.slice(0, 55)}{typeof blogs[3].title !== "undefined" && blogs[3].title.length >= 55 ? "..." : ""}</h3>
											<p>{blogs[3].subtitle.slice(0, 125)}{typeof blogs[3].subtitle !== "undefined" && blogs[3].subtitle.length >= 125 ? "..." : ""}</p>
											<p className='lead' style={{ color: "#f73164" }}>{blogs[3].totalViews} Total View's</p>
											<hr />
											<p className='lead' style={{ color: "#f73164" }}>{blogs[3].likes}/{blogs[3].dislikes} ~ <em style={{ color: "green" }}>likes</em>/<em style={{ color: "red" }}>dislikes</em></p>
											<Link to={{ pathname: `/blog-details/${blogs[3].id}` }}>
												<a className="read-more">Read/View More</a>
											</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-sm-6">
									<div className="single-solutions solutions-time-bg-5">
										<div className="solutions-content">
											<h3>{blogs[4].title.slice(0, 55)}{typeof blogs[4].title !== "undefined" && blogs[4].title.length >= 55 ? "..." : ""}</h3>
											<p>{blogs[4].subtitle.slice(0, 125)}{typeof blogs[4].subtitle !== "undefined" && blogs[4].subtitle.length >= 125 ? "..." : ""}</p>
											<p className='lead' style={{ color: "#f73164" }}>{blogs[4].totalViews} Total View's</p>
											<hr />
											<p className='lead' style={{ color: "#f73164" }}>{blogs[4].likes}/{blogs[4].dislikes} ~ <em style={{ color: "green" }}>likes</em>/<em style={{ color: "red" }}>dislikes</em></p>
											<Link to={{ pathname: `/blog-details/${blogs[4].id}` }}>
												<a className="read-more">Read/View More</a>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="single-solutions solutions-time-bg-6">
								<div className="solutions-content">
									<h3>{blogs[5].title.slice(0, 55)}{typeof blogs[5].title !== "undefined" && blogs[5].title.length >= 55 ? "..." : ""}</h3>
									<p>{blogs[5].subtitle.slice(0, 125)}{typeof blogs[5].subtitle !== "undefined" && blogs[5].subtitle.length >= 125 ? "..." : ""}</p>
									<p className='lead' style={{ color: "#f73164" }}>{blogs[5].totalViews} Total View's</p>
									<hr />
									<p className='lead' style={{ color: "#f73164" }}>{blogs[5].likes}/{blogs[5].dislikes} ~ <em style={{ color: "green" }}>likes</em>/<em style={{ color: "red" }}>dislikes</em></p>
									<Link to={{ pathname: `/blog-details/${blogs[5].id}` }}>
										<a className="read-more">Read/View More</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
						<p>
							<Skeleton count={25} />
						</p>
					</SkeletonTheme>
				</Fragment>
			);
		}
	}
    return (
        <section className="solutions-area pb-70">
			<div className="container">
				<div className="section-title">
					<h2>Hire Hackers To Test Your Company's Security.</h2>
					<p>At The Hacker Marketplace, we take away the need for you to find a hacker and manage the process in order to test your company's security. We offer a marketplace where you can post your job, hackers will apply, and then you review our candidates and hire one or even multiple contractors. You get access to all of the hacker's work completed—from start to finish- on our platform <strong>as soon</strong> as new submissions are <strong>processed</strong> for piece of mind & assurance along the way!</p>
				</div>
				<Row>
					<Col sm="12" md="6" lg="6" xl="6">
						<img src={require("../../assets/images/createlivestream.png")} className={"landing-page-display-img"} />
					</Col>
					<Col sm="12" md="6" lg="6" xl="6">
						<ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={350} className={"landing-page-display-video"} wrapper={"div"} url={require("../../assets/video/employer-view-video.mp4")} />
					</Col>
				</Row>
				<hr style={{ marginTop: "22.5px", marginBottom: "22.5px" }} />
				{renderBlogContent()}
				<hr style={{ marginTop: "22.5px", marginBottom: "22.5px" }} />
				<Row>
					<Col sm="12" md="6" lg="6" xl="6">
						<img src={require("../../assets/images/tutorialindividualview.png")} className={"landing-page-display-img"} />
					</Col>
					<Col sm="12" md="6" lg="6" xl="6">
						<img src={require("../../assets/images/forumindividual.png")} className={"landing-page-display-img"} />
					</Col>
				</Row>
			</div>
		</section>
    )
}

export default HighPerformanceSolutions;