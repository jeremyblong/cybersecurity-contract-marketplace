import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';
import { ListGroup, ListGroupItem } from "reactstrap";



const FaqStyleOne = () => {
    return (
        <section className="faq-area ptb-100">
			<div className="container">
				<div className="section-title">
					<h2>Frequently Asked Questions</h2>
					<p>These FAQ's will give you a better understanding of our mission, goals and purpose. You can also find out what we do for both hackers and employers alike!</p>
				</div>

				<div className="row align-items-center">
					<div className="col-lg-6">
						<div className="faq-accordion">
                            <Accordion allowZeroExpanded preExpanded={['a']}>
                                <AccordionItem uuid="a">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            What types of things can you do on The Hacker Marketplace's marketplace as a 'HACKER' account type?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                        <ListGroup>
                                            <ListGroupItem>{"Create custom-coded 'hacks' & sell them to other hacker's"}</ListGroupItem>
                                            <ListGroupItem>{"Apply to contracts/posted-jobs & work as a freelancer cyber-security expert"}</ListGroupItem>
                                            <ListGroupItem>{"Post in forums to request additional help & guidance on various cyber-security issues"}</ListGroupItem>
                                            <ListGroupItem>{"Post 'tutorial videos' for FREE to further your presence on our SOCIAL-Style marketplace"}</ListGroupItem>
                                            <ListGroupItem>{"LIVE-STREAM active live hack's or teach others how to hack via live streaming"}</ListGroupItem>
                                            <ListGroupItem>{"Sell custom-created full blown courses with sections, videos, attachments and much more for whatever price you deem fit!"}</ListGroupItem>
                                            <ListGroupItem>{"View, post & manage blogs/blogging content to expand your following & show your knowledge to new user's"}</ListGroupItem>
                                            <ListGroupItem>{"Create a custom 'feel' to your profile with our very-loose style profile display - Make your profile look exactly how you'd like!"}</ListGroupItem>
                                        </ListGroup>
                                    </AccordionItemPanel>
                                </AccordionItem>

								<AccordionItem uuid="c">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
											What is the primary purpose(s) of "The Hacker Marketplace"?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
										<p>Our primary mission is to facilitate various interactions/transactions between hacker's and employer's both. Our primary focus is the facilitation of various DIGITAL & PHYSICAL hack's (testing various company resources..) to secure company assets and core-resources</p>
                                    </AccordionItemPanel>
                                </AccordionItem>

								<AccordionItem uuid="d">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
											Will I need to verify my account before taking any action?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
										<p><strong>Yes, ABSOLUTELY</strong>. We require ALL hacker's to go through our <strong>authentication/verification process</strong> to make sure each person or user on our platform is INDEED who they say they are. This includes comparing profile pictures, verifiying identification (DL, Passport, Etc..) - Employer's are also required to provide identity checks and/or verifications</p>
                                    </AccordionItemPanel>
                                </AccordionItem>

                                <AccordionItem uuid="b">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            What types of things can you do on The Hacker Marketplace's marketplace as a 'EMPLOYER' account type?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                        <ListGroup>
                                            <ListGroupItem>{"Design, create & post contracts (job's) for hackers to apply to - vett & interview in numerous ways"}</ListGroupItem>
                                            <ListGroupItem>{"Escrow-style payment system which delays the delivery of payments on contracted jobs so you know your money is safe while activly working with new hacker's"}</ListGroupItem>
                                            <ListGroupItem>{"View other employer/hacker account's to compare yourself with & to further understand what other's are thinking.."}</ListGroupItem>
                                            <ListGroupItem>{"Promote your account to get MORE visibility & more profile views overall!"}</ListGroupItem>
                                            <ListGroupItem>{"Live-stream requests and/or raise awareness of your job opportunity by streaming & directly informating our user's of what your requirements are.."}</ListGroupItem>
                                        </ListGroup>
                                    </AccordionItemPanel>
                                </AccordionItem>

								<AccordionItem uuid="e">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
											How does the payment-system work?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
										<p>We use a <a target={"_blank"} href={"https://en.wikipedia.org/wiki/Escrow"}>STRIPE escrow-style</a> payment system, cooperating with federal law and other relevant laws such as deducting taxes from all earned proceeds and maintaining 'best legal practices'..</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            </Accordion>
						</div>
					</div>
					
					<div className="col-lg-6">
                        <div className="faq-accordion">
                                <Accordion allowZeroExpanded preExpanded={['a']}>
                                    <AccordionItem uuid="a">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Why should we use {process.env.REACT_APP_APPLICATION_NAME} over other platforms?
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <ListGroup>
                                                <ListGroupItem>{"We have THE LOWEST percentage rates amount our competitors (12.5% TOTAL/MAX)"}</ListGroupItem>
                                                <ListGroupItem>{"we are an OPEN/TRANSPARENT free-marketplace leaving your success to be determined by your drive & determination"}</ListGroupItem>
                                                <ListGroupItem>{"The MOST OPPORTUNITIES of any cyber-security marketplace or platform's"}</ListGroupItem>
                                                <ListGroupItem>{"We are one of the MOST trustworthy/trusting marketplaces as we have NUMEROUS checks & balances to encure TOP security & trust in a transparent manner.."}</ListGroupItem>
                                                <ListGroupItem>{"Completely TRANSPARENT enviorment allows user's to know EXACTLY who you're working with leading to more confidence & trust between all of our user's (not including the fact that all user's are verified & vetted)"}</ListGroupItem>
                                            </ListGroup>
                                        </AccordionItemPanel>
                                    </AccordionItem>

                                    <AccordionItem uuid="c">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Why use our platform as a company VS other websites/platforms?
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <p>We <strong>firmly</strong> belive in <strong>complete transparency</strong> leading to more trusting relationships between clients. We also provide more options to better understand your clientele & potential hackers as well as providing the absolute <strong>best of the best</strong>!</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem uuid="c">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Why should you care about cyber-security?
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <p>WSecurity/cyber-security hacks are one of the <strong>leading</strong> causes of potential business failure. Hack's often times lead to millions of dollars in the process of mitigating an attack & recovering (if its even possible) valuable data <strong>HOWEVER</strong> your attacks still have that data which can be extremely dangerous and detrimental. Protect yourself <strong>BEFORE</strong> your hackers attack!</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem uuid="f">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                How can YOU benifit from our marketplace/platform? (hackers & employers both..)
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <p>Minimize costs as an employer by ELIMINATING security-firms entirely and connect <strong>directly</strong> with the required employee's, hackers! Hacker's will also make magnitudes more than you would in a typical environment as you keep ALL proceeds besides our 12.5% tranactional cut (taxes, fees, etc..) so essentially 87.5% of <strong>EVERYTHING THAT YOU MAKE!</strong> We also connect hacker's in a way never before seen allowing for <strong>MORE connections</strong> thus leading to more jobs/contracts and income!</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                {/*     
                                    <AccordionItem uuid="d">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Will I need to verify my account before taking any action?
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <p><strong>Yes, ABSOLUTELY</strong>. We require ALL hacker's to go through our <strong>authentication/verification process</strong> to make sure each person or user on our platform is INDEED who they say they are. This includes comparing profile pictures, verifiying identification (DL, Passport, Etc..) - Employer's are also required to provide identity checks and/or verifications</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>

                                    <AccordionItem uuid="b">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                What types of things can you do on The Hacker Marketplace's marketplace as a 'EMPLOYER' account type?
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <ListGroup>
                                                <ListGroupItem>{"Design, create & post contracts (job's) for hackers to apply to - vett & interview in numerous ways"}</ListGroupItem>
                                                <ListGroupItem>{"Escrow-style payment system which delays the delivery of payments on contracted jobs so you know your money is safe while activly working with new hacker's"}</ListGroupItem>
                                                <ListGroupItem>{"View other employer/hacker account's to compare yourself with & to further understand what other's are thinking.."}</ListGroupItem>
                                                <ListGroupItem>{"Promote your account to get MORE visibility & more profile views overall!"}</ListGroupItem>
                                                <ListGroupItem>{"Live-stream requests and/or raise awareness of your job opportunity by streaming & directly informating our user's of what your requirements are.."}</ListGroupItem>
                                            </ListGroup>
                                        </AccordionItemPanel>
                                    </AccordionItem>

                                    <AccordionItem uuid="e">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                How does the payment-system work?
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <p>We use a <a target={"_blank"} href={"https://en.wikipedia.org/wiki/Escrow"}>STRIPE escrow-style</a> payment system, cooperating with federal law and other relevant laws such as deducting taxes from all earned proceeds and maintaining 'best legal practices'..</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>

                                    <AccordionItem uuid="f">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                How can YOU benifit from our marketplace/platform? (hackers & employers both..)
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <p>Minimize costs as an employer by ELIMINATING security-firms entirely and connect <strong>directly</strong> with the required employee's, hackers! Hacker's will also make magnitudes more than you would in a typical environment as you keep ALL proceeds besides our 12.5% tranactional cut (taxes, fees, etc..) so essentially 87.5% of <strong>EVERYTHING THAT YOU MAKE!</strong> We also connect hacker's in a way never before seen allowing for <strong>MORE connections</strong> thus leading to more jobs/contracts and income!</p>
                                        </AccordionItemPanel>
                                    </AccordionItem> */}
                                </Accordion>
                            </div>
                        </div>
				    </div>
			</div>
		</section>
    )
}

export default FaqStyleOne;