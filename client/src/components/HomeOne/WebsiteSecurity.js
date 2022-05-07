import React from 'react';
import "./styles.css";


const WebsiteSecurity = () => {
    return (
        <section style={{ paddingTop: "175px" }} className="security-area pb-70">
			<div className="container">
				<div className="section-title">
					<h2>Your <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>COMPLETE</strong> one-stop shop for <strong style={{ textDecorationLine: "underline", color: "#f73164" }}>all</strong> of your hacking needs/wants. </h2>
					<p>We provide <em>everything</em> you need to be successful for <strong>both</strong> account types (hacker's & employer's both)! We have forums, software for-sale marketplaces, auctions, ranking systems, 'list a contract/gig', video/chat interviewing & <strong>SO</strong> much more. Dive in, sign-up and check out everything we have to offer! (Most functionality comes <strong>AFTER</strong> authenticating/signing-in)</p>
				</div>

				<div className="row">
					<div className="col-lg-3 col-sm-6">
						<div className="single-security">
							<i className="flaticon-bug"></i>
							<h3>Initialize & post a contract recruiting hacker's for-hire</h3>
							<p>Start by signing up via our low-requirement signup process/form. Once verified & authenticated (both), you'll be able to post contracts seeking hacker's to test your digital/phyiscal asset's and/or security. Keep in mind, there <strong>is a brief</strong> process <em>required before</em> an 'employer' account may post a job/contract. Verification of identity is required on <strong>BOTH ENDS</strong> including both hacker's and employer's alike.</p>
						</div>
					</div>

					<div className="col-lg-3 col-sm-6">
						<div className="single-security">
							<i className="flaticon-content"></i>
							<h3>Hacker's will 'apply' & the interviewing/vetting process begins..</h3>
							<p>Hackers/cyber-security experts will 'apply' to your listing with a proposal explaining why they're your 'go-to' for the job! You can even recruit numerous/multple contractor's if need be. Applying to contracts takes 'tokens' which cost money so you'll be assured <strong>only</strong> realistic prospects will be applying to your job!</p>
						</div>
					</div>

					<div className="col-lg-6 col-sm-6 col-md-6 col-xl-6">
						<img style={{ marginBottom: "75px" }} src={require("../../assets/images/listings.png")} className={"screenshot-homepage"} />
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-sm-6 col-md-6 col-xl-6">
						<img src={require("../../assets/images/softwareforsale.png")} className={"screenshot-homepage"} />
					</div>
					<div className="col-lg-3 col-sm-6">
						<div className="single-security">
							<i className="flaticon-support"></i>
							<h3>Manage <strong>EVERYTHING</strong> from start to finish through our platform (availiable support 24/7)</h3>
							<p>You'll be able to manage <strong>EVERYTHING</strong> via <strong>OUR</strong> platform from hiring, work/vulnerability submissions, payments (via 'stripe'), raising concerns with support, modifying existing data related/coresponding to each specific contract, hiring additional help and/or terminating existing employed personel and <strong>so</strong> much more!</p>
						</div>
					</div>

					<div className="col-lg-3 col-sm-6">
						<div className="single-security">
							<i className="flaticon-profile"></i>
							<h3>Once the contract is agreed to have been completed, previously deposited funds are released & the contract ends & the review process starts!</h3>
							<p>Once <strong>BOTH</strong> parties have <strong>agreed</strong> the contract was completed as agreed, the initial deposited (before hacker's take ANY action to assure funds are availiable upon completion) funds are then released from our platform to the requested/hired cyber-security expert. We <strong>REQUIRE</strong> funds to be deposited in an <strong>escrow style manner</strong> so that minimal risk is introduced on <strong>both</strong> ends, hacker's and employer's alike..</p>
						</div>
					</div>
				</div>
			</div>
		</section>
    )
}

export default WebsiteSecurity;