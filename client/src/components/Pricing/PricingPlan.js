import React from 'react';
import {Link} from 'react-router-dom'; 
import "./styles.css";


const PricingPlan = () => {
    return (
        <section className="pricing-area">
			<div className="container">
				<div className='centered-both-ways'>
					<div className="section-title section-title-custom-wider">
						<h2>Buy Our Plans & Packages (After authenticating - our services are <strong style={{ textDecorationLine: "underline" }}>COMPLETELY FREE</strong> until you take certain actions)</h2>
						<p>Our marketplace/software is <strong>generally free</strong> for the most part with the <strong>exclusion</strong> of certain features or functionality such as applying to jobs as a hacker, purchasing courses, and other various activities. About half of our platform is FREE while the other half is PAID however, the fee's are <strong>VERY FAIR</strong> all things considered (when comparing to other websites/resources..)</p>
						<hr />
						<p className='lead boldish' style={{ color: "grey" }}>These rates are <strong style={{ textDecorationLine: "underline" }}>AFTER</strong> you authenticate and access the other signed-in version of our software/website. These aren't mandatory <em style={{ textDecorationLine: "underline" }}>however</em> we <strong style={{ textDecorationLine: "underline" }}>HIGHLY recommend</strong> upgrading your account for more publicity (you recieve a checkmark if subscribed to any tier) and these provide a much better experience overall..</p>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<div className="single-pricing">
							<div className="pricing-content pricing-content-darker-background">
								<h3>Standard/Default Membership</h3>
								<h2>$25 <sub>/ per month</sub></h2>
							</div>

							<ul>
								<li>
									<i className="bx bx-check"></i>
									25 Free Tokens Each Month
								</li>
								<li>
									<i className="bx bx-check"></i>
									Access to 'premier' or 'VIP' areas
								</li>
								<li>
									<i className="bx bx-check"></i>
									1 Profile Boost Per Month
								</li>
								<li>
									<span>
										<i className="bx bx-x"></i>
										Ticket(s) To A Restricted Event Per Month
									</span>
								</li>
								<li>
									<span>
										<i className="bx bx-x"></i>
										Earn 1.5x Experience Per Every 1x Earned
									</span>
								</li>
							</ul>

                            <Link href="/contact">
                                <a className="default-btn">Order Now</a>
                            </Link>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6">
						<div className="single-pricing active">
							<div className="pricing-content pricing-content-darker-background-center">
								<h3>Premium Membership</h3>
								<h2>$35 <sub>/ per month</sub></h2>
							</div>

							<ul style={{ paddingTop: "37.5px" }}>
								<li>
									<i className="bx bx-check"></i>
									40 Free Tokens Each Month
								</li>
								<li>
									<i className="bx bx-check"></i>
									Access to 'premier' or 'VIP' areas
								</li>
								<li>
									<i className="bx bx-check"></i>
									3 Profile Boost Per Month
								</li>
								<li>
									<i className="bx bx-check"></i>
									2 Tickets To A Restricted Event Per Month
								</li>
								<li>
									<span>
										<i className="bx bx-x"></i>
										Earn 1.5x Experience Per Every 1x Earned
									</span>
								</li>
							</ul>

							<Link style={{ paddingBottom: "75px" }} href="/contact">
                                <a className="default-btn">Order Now</a>
                            </Link>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6 offset-sm-3 offset-lg-0">
						<div className="single-pricing">
							<div className="pricing-content pricing-content-darker-background">
								<h3>"The Baller" Membership</h3>
								<h2>$45 <sub>/ per month</sub></h2>
							</div>

							<ul>
								<li>
									<i className="bx bx-check"></i>
									60 Free Tokens Each Month
								</li>
								<li>
									<i className="bx bx-check"></i>
									Access to 'premier' or 'VIP' areas
								</li>
								<li>
									<i className="bx bx-check"></i>
									5 Profile Boost Per Month
								</li>
								<li>
									<i className="bx bx-check"></i>
									3 Tickets To A Restricted Event Per Month
								</li>
								<li>
									<i className="bx bx-check"></i>
									Earn 1.5x Experience Per Every 1x Earned
								</li>
							</ul>

							<Link href="/contact">
                                <a className="default-btn">Order Now</a>
                            </Link>
						</div>
					</div>
				</div>
			</div>
		</section>
    )
}

export default PricingPlan;