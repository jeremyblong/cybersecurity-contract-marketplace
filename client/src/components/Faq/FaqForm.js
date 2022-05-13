import React, { useState } from 'react';

// Form initial state
const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: ""
};

const FaqForm = () => {

	const [contact, setContact] = useState(INITIAL_STATE);

    const handleChange = e => {
        const { name, value } = e.target;
        setContact(prevState => ({ ...prevState, [name]: value }));
        // console.log(contact)
    }

    return (
        <section className="faq-contact-area pb-100">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="contact-wrap">
							<div className="contact-form">
								<div className="section-title">
									<h2>Ask Questions & Clarification</h2>
									<p>Feel free to ask us <strong>any questions</strong> you might have, ranging from how our platform works to how to take specific actions if something is unclear. We will do our absolute best to circle back within a reasonable time frame (usually 1-3 business days)...</p>
								</div>

								<form 
									action="https://formspree.io/f/xyyoldzo"
 	 								method="POST"
								>
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
													name="phoneNumber" 
													placeholder="Phone number" 
													className="form-control" 
													value={contact.phoneNumber}
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
													name="message" 
													cols="30" 
													rows="7" 
													placeholder="Write your message..." 
													className="form-control" 
													value={contact.message}
													onChange={handleChange} 
													required 
												/>
											</div>
										</div>
										<div className="col-lg-12 col-sm-12">
											<button type="submit" className="default-btn page-btn">
												Send Message!
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    )
}

export default FaqForm;