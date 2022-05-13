import React from 'react';
import { Parallax } from 'react-parallax';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { CardHeader, Card, CardBody, Col, Row } from 'reactstrap';
import "./styles.css";
import ContactForm from "./ContactForm.js";

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
});

const ContactInfo = () => {
    return (
        <div className="contact-info-area">
			<div className="container-fluid">
				<div className='row'>
					<Col sm="12" md="12" lg="12" xl="12">
						<Card style={{ margin: "22.5px" }} className={"shadow card-outter-wrapper"}>
							<CardHeader className='b-l-info b-r-info'>
								<h3>We currently do <strong>not</strong> have a corperate location <strong>yet</strong>, as we are primarily working remotely at the current moment. If you'd like a 'product demo', contact us to orchestrate a skype interview to walk-through our product!</h3>
							</CardHeader>
							<CardBody>
								<Row>
									<Col sm="12" md="6" lg="6" xl="6">
										<Card className='shadow equal-height card-mobile'>
											<CardBody>
												<div className="calender-widget">
													<div className="cal-img centered-both-ways mobile-maxed-height">
														<img style={{ marginBottom: "12.5px" }} src={require("../../assets/images/logo-saturated-long.png")} className={"inner-contact-img"} />
													</div>
													<div className="cal-desc text-left card-body">
														<h6 className="f-w-600 address-text-header">{"Company Location/Address"}</h6>
														<p className="text-left mt-1 mb-0 address-text-contact">The Hacker Marketplace</p>
														<p className="text-left mt-1 mb-0 address-text-contact">Currently Remote</p>
														<p className="text-left mt-1 mb-0 address-text-contact">Portland, OR 97214</p>
													</div>
												</div>
											</CardBody>
										</Card>
									</Col>
									<Col sm="12" md="6" lg="6" xl="6">
										<Card className='shadow card-mobile'>
											<CardBody>
												<Map
													center={[-122.412660, 37.784850]}
													style="mapbox://styles/mapbox/streets-v9"
													containerStyle={{
														height: "425px",
														width: '100%',
														border: "3px solid white"
													}}
												>
													<Marker
														coordinates={[-122.412660, 37.784850]}
														anchor="bottom"
													>
														<img src={require("../../assets/icons/location.png")}/>
													</Marker>
												</Map>
											</CardBody>
										</Card>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</div>
				<div className='row'>
					<Parallax
						blur={{ min: -20, max: 20 }}
						bgImage={require('../../assets/images/progressional-img.jpg')}
						bgImageAlt="banner-image"
						strength={425}
					>
						<div style={{ minHeight: '500px', height: "100%" }}>
							<ContactForm />
						</div>
					</Parallax>
				</div>
			</div>
		</div>
    )
}

export default ContactInfo;