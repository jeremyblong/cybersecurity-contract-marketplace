import React, { Fragment } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Breadcrumb from '../../../../layout/breadcrumb';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { HelpCircle } from "react-feather";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';


const CreateNewReferralHelper = ({ userData }) => {
    return (
        <Fragment>
            <Breadcrumb parent="View 'Referral' Data/Information" title="Manage Your Referral Data & Share Your Code!" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className='b-l-secondary b-r-secondary'>
                                <h3>This is your 'referral link', Send this link to user's so they will recieve bonuses & rewards. You will <em style={{ color: "blue" }}>also</em> receive rewards as well!</h3>
                                <p>If you want to view your 'rewards', check out the below listed data for <strong>more information</strong>..</p>
                            </CardHeader>
                            <CardBody>
                                <h3 className='text-left'>Your referral code will be displayed below..</h3>
                                <hr />
                                <CopyToClipboard 
                                    text={userData.referralCode}
                                    onCopy={() => {
                                        NotificationManager.success("Successfully 'copied' your referral code to the 'clipboard' - you may now paste & share your code! Don't worry if someone gets this, it isn't a security threat.", "Successfully copied your text!", 4750);
                                    }}
                                >
                                    <span className='customized-clipboard'>Your referral code is... : {userData.referralCode}</span>
                                </CopyToClipboard>
                                <hr />
                                <Row className="default-according style-1 faq-accordion" id="accordionoc">
                                    <Accordion>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"What does a 'referral' do for YOU?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"You will recieve up-to 2.5% of EVERY transaction that your 'referring user' (the person that you referred) earns via courses (purchasable course content), employer listings earning from live contracts (applying to jobs), and truthfully any other revenue sources for ONE MONTH!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How LONG does my referral bonus last?!"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"Your 'referral bonus' will last approx. ONE MONTH per EACH user - from the date they signed-up on our marketplace/platform."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"Can I use MULTIPLE referrals and stack them?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"YES, You absolutely can and we encourage this! This is only a beginning phase promotion so take advantage of it while it lasts!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"I'm an employer, how will I benifit from this referral system?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"You will benifit as well! We discount and return approx. 2.5% to EACH party, including employer accounts, if applicable. For instance, if you are paying a hacker for a fulfilled contracted position, you will pay approx. 2.5% LESS than you would if NOT REFERRED!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How do I send referrals? (both account types)"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"You simply copy the code above by clicking on it (this will save it to your clipboard) and send it to your friend, however you'd like! MAKE SURE they ENTER the code you gave them upon SIGNING-UP as this is the ONLY way we can confirm that you did indeed let them know about us.."}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem className='card'>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className="btn btn-link collapsed pl-0 custom-accordion-button-faq">
                                                        <HelpCircle className='help-circle-faq' />{"How long will this referral-based system last or exist?"}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <CardBody>{"This is an 'early-adopter' enrollement benifit so ONLY our first adopters/users will be receiving these bonuses and for A LIMITED TIME ONLY! We will discontinue this feature after a successful launch, stay tuned!"}</CardBody>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(CreateNewReferralHelper);