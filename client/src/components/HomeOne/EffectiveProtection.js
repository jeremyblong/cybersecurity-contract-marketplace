import React, { useState } from 'react';
import ShowMoreText from "react-show-more-text";

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
						<div className="complete-img"></div>
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
											expanded={openReadMore.one}
											truncatedEndingComponent={"... "}
										>
											<p>Level-up your game <strong>(literally - with our ranking system)</strong> and chase the leaderboard spots, sell your custom-coded 'hacks' via our software exchange marketplace <strong>and even live stream</strong> LIVE hack's to your followers! (Yes, You can also follow and be followed by various users)</p>
										</ShowMoreText>
									</div>
								</div>
								<div className="col-lg-6 col-sm-6">
									<div className="single-security single-security-addon">
										<i className="flaticon-order"></i>
										<h3>Connect with others in a 'social' way/manner</h3>
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
											<p>Browse other hackers profile's and interact <strong>only</strong> when and if <strong>you</strong> want to! After successful sign-up and authentication, we provide numerous resources to up your <strong>'game'</strong> such as games, forums & more!</p>
										</ShowMoreText>
									</div>
								</div>

								
								<div className="col-lg-6 col-sm-6">
									<div className="single-security single-security-addon mb-0">
										<i className="flaticon-technical-support"></i>
										<h3>Meets your social needs while also being your professional home!</h3>
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
											<p>There are many websites out there that provide a space for coders and cyber-security experts to work together and make money. The difference with the Hacker Marketplace is that we focus on creating a space for those that share similar mindsets, skills, backgrounds, interests. We provide a safe environment for like-minded individuals to not only meet but code and collaborate together in order to make more than what could be accomplished otherwise.</p>
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