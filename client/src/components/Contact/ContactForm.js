import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// import baseUrl from '../../utils/baseUrl'

const alertContent = () => {
    MySwal.fire({
        title: 'Congratulations!',
        text: 'Your message was successfully send and will back to you soon',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    })
}

// Form initial state
const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: ""
};

const ContactForm = () => {

    const [contact, setContact] = useState(INITIAL_STATE);

    const handleChange = e => {
        const { name, value } = e.target;
        setContact(prevState => ({ ...prevState, [name]: value }));
        // console.log(contact)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const url = `/api/contact`;
            const { name, email, number, subject, text } = contact;
            const payload = { name, email, number, subject, text };
            const response = await axios.post(url, payload);
            console.log(response);
            setContact(INITIAL_STATE);
            alertContent();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="faq-contact-area ptb-100">
            <div className="container">
                <Container fluid={true}>
					<Row>
						<Col sm="12" md="12" lg="12" xl="12">
							<Card className='shadow'>
								<CardHeader className='b-l-primary b-r-primary'>
									<h3>Contact <strong style={{ color: "#f73164", textDecorationLine: "underline" }}>{process.env.REACT_APP_APPLICATION_NAME}</strong> if you have any <strong style={{ textDecorationLine: "underline" }}>business</strong> inquries or any <strong style={{ textDecorationLine: "underline" }}>suggestions</strong> OR if you require immediate help..</h3>
									<p className='lead'>Please feel free to reach out to us for <strong>any subject-matter or questions</strong> however, you should know that we prioritize responses in a certain manner to cater to business-related requests <strong>first & foremost</strong>, and then we process all other requests.</p>
								</CardHeader>
								<CardBody>
									<div className="row">
										<div className="col-lg-12">
											<div className="contact-wrap">
												<div className="contact-form">
													<h1 className='text-center' style={{ color: "#f73164", textDecorationLine: "underline", marginBottom: "17.5px" }}>Contact Form</h1>
													<form onSubmit={handleSubmit}>
														<div className="row">
															<div className="col-lg-6 col-md-6">
																<div className="form-group">
																	<input 
																		type="text" 
																		name="name" 
																		placeholder="Name" 
																		className="form-control" 
																		value={contact.name}
																		onChange={handleChange} 
																		required 
																	/>
																</div>
															</div>
															<div className="col-lg-6 col-md-6">
																<div className="form-group">
																	<input 
																		type="text" 
																		name="email" 
																		placeholder="Email" 
																		className="form-control" 
																		value={contact.email}
																		onChange={handleChange} 
																		required 
																	/>
																</div>
															</div>
															<div className="col-lg-6 col-md-6">
																<div className="form-group">
																	<input 
																		type="text" 
																		name="number" 
																		placeholder="Phone number" 
																		className="form-control" 
																		value={contact.number}
																		onChange={handleChange} 
																		required 
																	/>
																</div>
															</div>
															<div className="col-lg-6 col-md-6">
																<div className="form-group">
																	<input 
																		type="text" 
																		name="subject" 
																		placeholder="Subject" 
																		className="form-control" 
																		value={contact.subject}
																		onChange={handleChange} 
																		required 
																	/>
																</div>
															</div>
															<div className="col-lg-12 col-md-12">
																<div className="form-group">
																	<textarea 
																		name="text" 
																		cols="30" 
																		rows="7" 
																		placeholder="Write your message..." 
																		className="form-control" 
																		value={contact.text}
																		onChange={handleChange} 
																		required 
																	/>
																</div>
															</div>
															<div className="col-lg-12 col-sm-12">
																<button type="submit" className="default-btn page-btn">
																	Send Message
																</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
            </div>
        </div>
    )
}

export default ContactForm;