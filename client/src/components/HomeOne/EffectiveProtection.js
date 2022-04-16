import React, { useState } from 'react';
import ShowMoreText from "react-show-more-text";
import { Row, Col } from "reactstrap";
import "./styles.css";


const EffectiveProtection = () => {
	const [ openReadMore, setOpenReadMore ] = useState({
		one: false,
		two: false,
		three: false,
		four: false
	})
	const handleOpener = (val) => {
		setOpenReadMore(prevState => {
			return {
				...prevState,
				[val]: !prevState[val]
			}
		})
	}
    return (
        <section className="complete-area ptb-100">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6 pl-0">
						<div className="complete-img">
							<Row style={{ paddingTop: "22.5px" }}>
								<Col sm="12" md="12" lg="12" xl="12">
									<div className='centered-both-ways'>
										<iframe className='youtube-homepage-video' width="67.5%" height="340" src="https://www.youtube.com/embed/iJaplbzj4Js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									</div>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col sm="12" md="12" lg="12" xl="12">
									<div className='centered-both-ways'>
										<iframe className='youtube-homepage-video' width="67.5%" height="340" src="https://www.youtube.com/embed/c-VQXSILzng" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									</div>
								</Col>
							</Row>
							<hr />
							<Row style={{ paddingBottom: "22.5px" }}>
								<Col sm="12" md="12" lg="12" xl="12">
									<div className='centered-both-ways'>
										<iframe className='youtube-homepage-video' width="67.5%" height="340" src="https://www.youtube.com/embed/d0-9etZlAK4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									</div>
								</Col>
							</Row>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="complete-content">
							<h2>Get paid to learn, compete, engage/interact and create all in your own time & convenience of working in your own home!</h2>
							<p><strong>The Hacker Marketplace</strong> introduces and encourages connecting with others in a social fashion in a typically non-social industry/environment, meeting <strong>like minded</strong> individuals and/or <strong>fellow hacker's</strong> and most of all; making <strong>legitimate money</strong> in a professional environment. Boost your skills, compete & <strong>get paid far more</strong> than you would with any other website/company. We also provide many more options of ways to produce a regular and <strong>consistent</strong> influx of cash to reward our user's in a fashion/manner that they truly deserve. Hacking takes <strong>extensive</strong> knowledge, time & resources which deserve to be handsomely rewarded..</p>

							<div className="row">
								<div className="col-lg-6 col-sm-6">
									<div className="single-security single-security-addon mb-0 mb-rs-need">
										<i className="flaticon-scientist"></i>
										<h3>The hacker's community that offers its members more!</h3>
										<ShowMoreText
											lines={5}
											more="Show more"
											less="Show less"
											className="content-css"
											anchorClass="my-anchor-css-class"
											onClick={() => handleOpener("one")}
											expanded={openReadMore.one}
											truncatedEndingComponent={"... "}
										>
											<p>You are guaranteed to have more options, ways and means to make LEGAL money in a consistent manner when you become a part of the Hacker Marketplace community. We provide many more options of ways to produce a regular and consistent influx of cash to reward our users the way they should be rewarded while also saving employers an enormous amount of money. The Hacker Marketplace is an online marketplace/platform which introduces and encourages connecting with others with honesty & transparency!</p>
										</ShowMoreText>
									</div>
								</div>
								<div className="col-lg-6 col-sm-6">
									<div className="single-security single-security-addon">
										<i className="flaticon-anti-virus-software"></i>
										<h3>Boost your skills and compete with others to get rewarded and make money in a professional environment.</h3>
										<ShowMoreText
											lines={5}
											more="Show more"
											less="Show less"
											className="content-css"
											anchorClass="my-anchor-css-class"
											onClick={() => handleOpener("one")}
											expanded={openReadMore.two}
											truncatedEndingComponent={"... "}
										>
											<p>Level-up your game <strong>(literally - with our ranking system)</strong> and chase the leaderboard spots, sell your custom-coded 'hacks' via our software exchange marketplace <strong>and even live stream</strong> LIVE hack's to your followers! (Yes, You can also follow and be followed by various users)</p>
										</ShowMoreText>
									</div>
								</div>
								<div className="col-lg-6 col-sm-6">
									<div className="single-security single-security-addon">
										<i className="flaticon-order"></i>
										<h3>Connect with others in a 'social' manner leading to a low-stress environment ultimately leading to more leads, income and success</h3>
										<ShowMoreText
											lines={5}
											more="Show more"
											less="Show less"
											className="content-css"
											anchorClass="my-anchor-css-class"
											onClick={() => handleOpener("one")}
											expanded={openReadMore.three}
											truncatedEndingComponent={"... "}
										>
											<p>The Hacker Marketplace makes a typically/potentially 'stressful' process drastically less stressful and most of all, cultivates a casual work environment where user's can explore any other users accounts and find that exact perfect-match candidate! As an employer, find your EXACT match and/or the perfect candidate. Hacker's are guaranteed to make money money through our platform as sole-actors do not have the typical overhead of security firms and other similar competitors.</p>
										</ShowMoreText>
									</div>
								</div>

								
								<div className="col-lg-6 col-sm-6">
									<div className="single-security single-security-addon mb-0">
										<i className="flaticon-technical-support"></i>
										<h3><strong>Invest</strong> your free-time and skills in a marketplace with <strong>high-paying</strong> jobs and a <strong>steady</strong> stream of employers. You are in <strong>complete control</strong> of your own career.</h3>
										<ShowMoreText
											lines={5}
											more="Show more"
											less="Show less"
											className="content-css"
											anchorClass="my-anchor-css-class"
											onClick={() => handleOpener("one")}
											expanded={openReadMore.four}
											truncatedEndingComponent={"... "}
										>
											<p>As an independent contractor, you can choose the projects that interest you and work on them as much or as little as suits your situation. You'll be rewarded for hard work with high-paying employment opportunities from employers who are always seeking qualified contractors.</p>
										</ShowMoreText>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="complete-shape">
				<img src="/img/complete-shape.png" alt="Image" />
			</div>
		</section>
    )
}

export default EffectiveProtection;