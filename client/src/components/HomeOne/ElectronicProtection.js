import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

class ElectronicProtection extends Component {
	// Tab
    openTabSection = (evt, tabNmae) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabs_item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByTagName("li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("current", "");
        }

        document.getElementById(tabNmae).style.display = "block";
        evt.currentTarget.className += "current";
	}
	
	render() {
		return (
			<section className="electronic-area bg-color ptb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="electronic-content">
								<h2>Test and discover vulnerabilities in your websites, mobile apps or even your physical cooperate locations security systems</h2>
								<div className="electronic-tab-wrap">
									<div className="tab electronic-tab">
										{/* Tabs Nav */}
										<ul className="tabs">
											<li style={{ marginBottom: "12.5px" }}
												className="current"
												onClick={(e) => this.openTabSection(e, 'tab1')}
											>
												Quick, Through & Quality Testing
											</li>
											<li style={{ marginBottom: "12.5px" }}
												onClick={(e) => this.openTabSection(e, 'tab2')}
											>
												Secure With Expert's
											</li>
											<li
												onClick={(e) => this.openTabSection(e, 'tab3')}
											>
												Hacker's Come To YOU!
											</li>
										</ul>

										{/* Tab Content */}
										<div className="tab_content">
											<div id="tab1" className="tabs_item">
												<p>'The Hacker Marketplace' is the few platform's that allow you to test and discover vulnerabilities in your website, mobile app or even your co-workers! Did we also mention we testing <strong>PHYSICAL SECURITY</strong> as well by recruiting hacker's locally in your own backyard/city? You truly <strong>never</strong> know where your next vulnerability will be so by staying vigilant, your liklihood of success will be much <strong>greater!</strong></p>
												
												<Link href="/about">
													<a className="default-btn">Learn About</a>
												</Link>
											</div>

											<div id="tab2" className="tabs_item">
												<p>Post a job and have the best of the best apply to your company. With our trusted white hat hackers, you can feel safe knowing that your assets are being tested by professionals. We'll also be there with support throughout the entire process - from posting to hiring--so that you can keep your company secure and free from harm.</p>

												<Link href="/about">
													<a className="default-btn">Learn About</a>
												</Link>
											</div>

											<div id="tab3" className="tabs_item">
												<p>Stop worrying about cyber-security. Let hackers find your company's vulnerabilities so you can focus on growing and scaling your business. You're not alone in this endeavor, we'll help you every step of the way <strong>especially</strong> if you have any discrepancies or difficulties <strong>at any point</strong> along the way. We truly do have your back <strong>and</strong> want the best for <strong>each and every</strong> customer that joins our vision!</p>
 
												<Link href="/about">
													<a className="default-btn">Learn About</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-6">
							<div className="electronic-img">
								<img src="/img/electronic-img.png" alt="Image" />
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default ElectronicProtection;