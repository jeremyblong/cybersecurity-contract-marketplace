import React from 'react';
import {Link} from 'react-router-dom'; 
import { Row, Col } from "reactstrap";
import "./styles.css";
import ReactPlayer from "react-player";


const HighPerformanceSolutions = () => {
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
				<div className="row">
					<div className="col-lg-5">
						<div className="single-solutions solutions-time-bg-1">
							<div className="solutions-content">
								<h3>Corporate Physical Asset Testing</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p>
                                <Link href="/service-details">
                                    <a className="read-more">Read More</a>
                                </Link>
							</div>
						</div>
					</div>
					<div className="col-lg-7">
						<div className="row">
							<div className="col-lg-6 col-sm-6">
								<div className="single-solutions solutions-time-bg-2">
									<div className="solutions-content">
										<h3>Mobile-App Testing & Phone-Based Software</h3>
										<p>Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p>
                                        <Link href="/service-details">
                                            <a className="read-more">Read More</a>
                                        </Link>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-sm-6">
								<div className="single-solutions solutions-time-bg-3">
									<div className="solutions-content">
										<h3>Complete Testing Of Back/Front-End Full Stack Websites</h3>
										<p>Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p>
                                        <Link href="/service-details">
                                            <a className="read-more">Read More</a>
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
										<h3>Disaster Planning & Procedural Maintance And Theft Prevention</h3>
										<p>Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p>
                                        <Link href="/service-details">
                                            <a className="read-more">Read More</a>
                                        </Link>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-sm-6">
								<div className="single-solutions solutions-time-bg-5">
									<div className="solutions-content">
										<h3>API/REST Endpoint Testing, Web-Service Testing & Much More</h3>
										<p>Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p>
                                        <Link href="/service-details">
                                            <a className="read-more">Read More</a>
                                        </Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="single-solutions solutions-time-bg-6">
							<div className="solutions-content">
								<h3>Training, Mentorship & Routine Walk-Thru's Of Various IT Systems (longer-term contracts with hacker's)</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p>
                                <Link href="/service-details">
                                    <a className="read-more">Read More</a>
                                </Link>
							</div>
						</div>
					</div>
				</div>
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