import React from 'react';
import RelatedServices from './RelatedServices';
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";


const CompanyDetailsContentHelper = () => {
    return (
        <div className="blog-details-area ptb-100">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-md-12">
						<div className="services-details">
							<h3>'The Hacker Marketplace' - Facilitating easy acquisition of <strong>TOP-talent</strong>, all within the comfort of your home on <strong>your</strong> time.</h3>

							<img src="/img/services-details/services-details1.jpg" alt="Image" />

							<p>The Hacker Marketplace is a <strong>revolutionary</strong>, end-to-end solution that reinvent the typical ecosystem of hacking and cyber security. This <strong>free-flow</strong> marketplace is facilitating the exchange of services between hackers and employers in an open and free environment. It provides all the necessary tools needed to hire a hacker, browse and contact service providers, review them through their profiles, chat with them privately. <strong>The Hacker Marketplace</strong> is an <strong>innovative</strong> solution conceived by a group of hackers to help companies find qualified people to solve their cybersecurity problems.</p>
                            <hr />
							<div className="choose-wrap">
								<h2>Why Choose Us</h2>
								<p>We provide the <strong>most effective</strong> way for employers to hire reliable/trustworthy hackers in a <strong>professional</strong> manner. Hackers can also make legitimate money and monetize their knowledge at <strong>peak compensation</strong>, while still saving employers more than what they would pay a security firm.</p>
								<ul>
									<li>
										<i className="bx bx-check"></i>
                                        Aquire talent almost immediately for a fraction of the cost of a security-firm (after successful verfication which is automated)
									</li>
									<li>
										<i className="bx bx-check"></i>
										Meet other hacker's & exchange information, hacks (written code/software), live stream, communicate in forums and much more! We believe in connecting like-minded individuals, find your tribe today!
									</li>
									<li>
										<i className="bx bx-check"></i>
										We understand security, we understand convenience and most of all.. We understand that rare talent deserves appropriate compensation for hard-to-aquire knowledge. We can do this as we've entirely avoided the typical fee's associated with brick n' mortar stores
									</li>
								</ul>
							</div>
                            <hr />
							<h3>Join us today through our quick/easy sign-up process, legitimately as easy as 1, 2, 3!</h3>
                            <p>Our signup process is a breeze, <strong>requires no credit-card information</strong> & literally only takes seconds to setup (not including verification & other core account initialization steps)</p>

							<img src="/img/services-details/services-details2.jpg" alt="Image" />

							<p>Here at The Hacker Marketplace, we provide our hackers with as many options possible to enable them to have multiple avenues for monetizing their services in a social and transparent fashion. Made by hackers, FOR Hackers. Step your game up today and enroll in 'The Hacker Marketplace' and start exploring how YOU can up your game today!</p>
                            <hr />
                            <p>We are the most effective and truly the only open-marketplace in a cyber-security space. We cultivate open relationships and trust between clients and employers, both committed to being transparent, honest about our communications from day one. With us you will minimize risk while maximizing peak performance with our trusted contractors who share your commitment to transparency as well. Maximize savings on one side of things while maximizing profitability on the other end of things (depending on your account type).</p>
                            {/* Related Services */}
                            <hr />
                            <p>Curious to see how our platform works? Simply sign-up today and explore your options! There's no credit card or cumbersome process involved; simply enter your core information and start exploring a revolutionary take on cyber-security and the monetization of a previously 'difficult to monetize' industry, speaking from a legality standpoint.</p>
                            <hr />
                            <div className="choose-wrap">
								<h2>How You Can Benifit From Us (As A Hacker) - Ways And Means</h2>
								<p><strong>As a hacker</strong>, you can earn money in many <strong>different</strong> ways. You have the option to post on forums/threads, create custom-content, sell your knowledge/courses and more which is just as easy and profitable as live streaming while also being able to sell custom-coded hacks or apply for jobs from our platform. And we're not even mentioning all of the other resourceful opportunities available - like being able to apply to contracts directly from the <strong>comfort of your home</strong>! The list goes on and there's only <strong>one way to find out</strong> how far it does: <Link style={{ fontWeight: "bold" }} to={"/sign-in"}>click here</Link></p>
								<ul>
									<li>
										<i className="bx bx-check"></i>
                                        Sell your custom-coded hack's & command's
									</li>
									<li>
										<i className="bx bx-check"></i>
										Create & sell custom-recorded content and/or courses specifically tailored for hackers and hackers <strong>ONLY</strong>
									</li>
									<li>
										<i className="bx bx-check"></i>
										Live-stream while you actively hack a system or network while <strong>also</strong> teaching other hackers how to properly hack (Earn money through tips and in-app rewards)
									</li>
                                    <li>
										<i className="bx bx-check"></i>
										Post in forums and answer questions (not directly correlated with monetization of services - however, brings more awareness to your profile/account and presence)
									</li>
                                    <li>
										<i className="bx bx-check"></i>
										Apply to contracted gigs, interview & if selected - start working and earning funds <strong>immediately</strong> after submitting your completed results/work
									</li>
                                    <li>
										<i className="bx bx-check"></i>
										'Boost' your profile or other related data to enhance your ability to reach a broader audience
									</li>
                                    <li>
										<i className="bx bx-check"></i>
										Save your favorite profiles, data, job listings & more on a platform strictly built for hackers, by hackers.
									</li>
                                    <li>
										<i className="bx bx-check"></i>
										Compete with other hacker's in our network on leaderboards, win prizes for ranking in top percentage & more!
									</li>
								</ul>
							</div>
                            <hr />
                            <RelatedServices />	
						</div>
					</div>

					<div className="col-lg-4 col-md-12">
						<Sidebar />
					</div>
				</div>
			</div>
		</div>
    )
}

export default CompanyDetailsContentHelper;