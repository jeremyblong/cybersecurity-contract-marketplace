import React, { useState } from 'react';
import Navbar from '../components/_App/Navbar';
import MainBanner from '../components/HomeOne/MainBanner';
import Partner from '../components/Common/Partner';
import WebsiteSecurity from '../components/HomeOne/WebsiteSecurity';
import SecurityApproach from '../components/HomeOne/SecurityApproach';
import HighPerformanceSolutions from '../components/HomeOne/HighPerformanceSolutions';
import ElectronicProtection from '../components/HomeOne/ElectronicProtection';
import EffectiveProtection from '../components/HomeOne/EffectiveProtection';
import Testimonials from '../components/Common/Testimonials';
import CyberSecurityOperation from '../components/HomeOne/CyberSecurityOperation';
import LatesNews from '../components/Common/LatesNews';
import Footer from '../components/_App/Footer';
import Modal from 'react-modal';
import "./styles.css";
import { FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col, Container } from 'reactstrap';


const customStyles = {
    content: {
        right: 22.5,
        left: "auto",
        top: "auto",
        bottom: 45,
        position: "fixed",
        minWidth: "82.5vw",
        maxWidth: "82.5vw",
        minHeight: "375px",
        maxHeight: "375px",
        overflowY: "scroll",
        backgroundColor: "white",
        zIndex: 999999999999999999999999
    },
    overlay: {
        zIndex: 999999999999999999999999,
        backgroundColor: "rgba(0, 0, 0, 0.425)"
    }
  };

const Index = () => {
    const [ modalIsOpen, setIsOpen ] = useState(true);
    
    return ( 
        <div id={"lessen-index"}>
            {/* <Modal
                id={"modal-subscription"}
                isOpen={modalIsOpen}
                onAfterOpen={() => {}}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Subscription Modal"
            >

                    <div className="modal-content-customized-subscribe">
                        <div className="modal-header bg-secondary text-center">
                            <button onClick={() => setIsOpen(false)} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <Container>
                                <Row className='stretch-complete'>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <h2>~ Subscribe to receive a 'beta' code ~</h2>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='stretch-complete'>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <p>We will email you a 'beta' access code to use while signing up so you can access the restricted portions (90% of this software is restricted to authenticated users) of our marketplace. This can take 1-2 business days but we will send it!</p>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className="modal-body subscriptionmodalbody">
                            <div className="row">
                                <form
                                    action="https://formspree.io/f/mzboyjzj"
                                    method="POST"
                                >
                                    <FormGroup>
                                        <Label>Enter your email to receive a 'beta' code</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="append"><InputGroupText>{"EMAIL"}</InputGroupText></InputGroupAddon>
                                            <Input name="email" className="form-control" type="email" placeholder="Enter your email & we'll send a code within 1-2 business days" aria-label="Enter your email & we'll send a code within 1-2 business days"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="form-group col-md-12">
                                        <input type="submit" className="btn btn-dark btn-lg btn-block" defaultValue="Subscribe" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>  
        
            </Modal> */}


            <Navbar />

            <MainBanner />

            <Partner />

            <WebsiteSecurity />

            <SecurityApproach />

            <HighPerformanceSolutions />

            <ElectronicProtection />

            <EffectiveProtection />

            <Testimonials />

            <CyberSecurityOperation />

            <LatesNews />
            
            <Footer />
        </div>
    )
}

export default Index;