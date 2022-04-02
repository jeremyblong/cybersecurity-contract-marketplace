import React from 'react';
import { Parallax } from 'react-parallax';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { CardHeader, Card, CardBody, Col, Row } from 'reactstrap';
import "./styles.css";

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
						<Card style={{ margin: "22.5px" }} className={"shadow"}>
							<CardHeader className='b-l-info b-r-info'>
								<h3>This is our <strong style={{ textDecorationLine: "underline" }}>corporate</strong> office location - we do NOT accept any walk-in's <strong style={{ textDecorationLine: "underline" }}>however</strong> we do accept 'booked' appointments..</h3>
								<p className='lead'>If you're looking to <strong>partner with us</strong>, we would <strong>LOVE</strong> to introduce you to our team & corperate location and discuss next actions to help us further your agenda as well as ours!</p>
							</CardHeader>
							<CardBody>
								<Row>
									<Col sm="12" md="6" lg="6" xl="6">
										<Card className='shadow equal-height'>
											<CardBody>
												<div className="calender-widget">
													<div className="cal-img">
														<img src={require("../../assets/images/logo-saturated-long.png")} className={"inner-contact-img"} />
													</div>
													<div className="cal-desc text-left card-body">
														<h6 className="f-w-600 address-text-header">{"Company Location/Address"}</h6>
														<p className="text-left mt-1 mb-0 address-text-contact">The Hacker Marketplace</p>
														<p className="text-left mt-1 mb-0 address-text-contact">1634 North Lake Ave.</p>
														<p className="text-left mt-1 mb-0 address-text-contact">Los Angeles, California 90012</p>
													</div>
												</div>
											</CardBody>
										</Card>
									</Col>
									<Col sm="12" md="6" lg="6" xl="6">
										<Card className='shadow'>
											<CardBody>
												<Map
													center={[-118.3228, 34.0687]}
													style="mapbox://styles/mapbox/streets-v9"
													containerStyle={{
														height: "425px",
														width: '100%',
														border: "3px solid white"
													}}
												>
													<Marker
														coordinates={[-118.3228, 34.0687]}
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
						Blur transition from min to max
						<div style={{ height: '500px' }} />
					</Parallax>
				</div>
			</div>
		</div>
    )
}

export default ContactInfo;