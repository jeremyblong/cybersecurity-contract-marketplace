import React, { Fragment, useState } from 'react';
import { Card, Row, Col, TabContent, TabPane,  Nav, NavItem, NavLink, CardBody, Button, Badge } from 'reactstrap';
import { Febric, Video, Details, ProductReview, Brand, Availability, AddToCart, BuyNow } from '../../../../../../../constant';
import Ratings from 'react-ratings-declarative';
import "./styles.css";
import moment from "moment";

const BottomContainerHelper = ({ streamData, userData }) => {

    console.log("streamData", streamData)

    const [activeTab, setActiveTab] = useState('1');
    const symbol = "$";
    const [ rating, setRating ] = useState(4);
    const singleItem = {
        variants: ["", "", "", "", "", "", "", ""],
        discountPrice: "450",
        price: "575",
        stock: "11"
    };
    const changeRating = (newRating) => {
        setRating(newRating)
    }

    console.log("container.js userData", userData);

    // return bottom portion data (MAIN data...)
    return (
        <Fragment>
            <Card>
                <Row className="product-page-main m-0">
                    <Col sm="12">
                    <Nav tabs className="border-tab">
                        <NavItem  id="myTab" role="tablist">
                            <NavLink href="#" className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                STREAM DETAIL'S
                            </NavLink>
                            <div className="material-border"></div>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        {typeof streamData !== "undefined" && streamData !== null && Object.keys(streamData).length > 0 ?  <TabPane tabId="1">
                            <Card>
                                <CardBody>
                                    <div className="product-page-details">
                                        <h3>{streamData.listingTitle}</h3>
                                    </div>
                                    <hr />
                                    <h5 className={"stream-tags-header"}>Stream Hashtags/tags (relevant tags also searchable on main display pages)</h5>
                                    {typeof streamData.streamHashtags !== "undefined" && streamData.streamHashtags.length > 0 ? streamData.streamHashtags.map((tag, index) => {
                                        return <Badge key={index} className={"stream-tag"} color="info">{tag.text}</Badge>;
                                    }) : <h3>Loading hashtags/tags, please wait...</h3>}
                                    <hr/>
                                        <p>{streamData.streamMainDescription}</p>
                                    <hr/>
                                    <div className={"forced-row-stats"}>
                                        <table className="product half-width">
                                            <tbody>
                                                <tr>
                                                    <td> <b>Stream Time (from initial start) :&nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{`${moment(streamData.systemDate).format("hh:mm A")} (${moment(streamData.systemDate).fromNow()})`}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>People Currently Viewing &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td className="txt-secondary">{streamData.currentViewers}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Total Views &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td className="txt-info">{streamData.views}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Visibility &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{streamData.streamVisibility.visibility}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Likes/Dislikes &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td><div className={"like-dislike-row"}><div className="txt-success">{streamData.likes} like(s)</div>/<div className="txt-danger">{streamData.dislikes} dislike(s)</div></div></td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Stream Primary Coding Language &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{streamData.streamCodingLanguage.label}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="product half-width">
                                            <tbody>
                                                <tr>
                                                    <td> <b>Stream <em>MAIN</em> Category :&nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{streamData.streamMainCategory}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Stream Sub-Category &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{streamData.streamSubCategory.label}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Poster's Name &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td className="txt-secondary">{streamData.posterName}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Poster's Username &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td className="txt-info">{streamData.posterUsername}</td>
                                                </tr>
                                                <tr>
                                                    <td> <b>Stream ID (support/technical reasons) &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b></td>
                                                    <td>{streamData.id}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr/>
                                    <Row>
                                        <Col md="6">
                                        <h6 className="product-title">{"share it"}</h6>
                                        </Col>
                                        <Col md="6">
                                        <div className="product-icon">
                                            <ul className="product-social">
                                            <li className="d-inline-block"><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                            <li className="d-inline-block"><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                            <li className="d-inline-block"><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                            <li className="d-inline-block"><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                            <li className="d-inline-block"><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                            </ul>
                                            <form className="d-inline-block f-right"></form>
                                        </div>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col md="6">
                                        <h6 className="product-title">{"Rate Now"}</h6>
                                        </Col>
                                        <Col md="6">
                                        <div className="d-flex">
                                                <Ratings
                                                    rating={rating}
                                                    widgetRatedColors="blue"
                                                    changeRating={changeRating}
                                                >
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                            </Ratings>
                                            <span className={"review-total-text"}>(30 Current Stream Review's)</span>
                                        </div>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <div className="m-t-15">
                                        <Button color="info" className="m-r-10 stretch-third-button" onClick={() => {}} >
                                            <i className="fa fa-shopping-basket mr-1"></i>Submit Tip/Reward
                                        </Button>
                                        <Button color="danger" className="m-r-10 stretch-third-button" onClick={() => {}}>
                                            <i className="fa fa-shopping-cart mr-1"></i>Report Stream To Support
                                        </Button>
                                        <Button color="secondary stretch-third-button" onClick={() => {}}>
                                            <i className="fa fa-heart mr-1"></i>Private Message This Streamer
                                        </Button>
                                    </div>
                                        <hr />
                                        <Button style={{ width: "100%", color: "white" }} color="success-2x" className={"btn-squared btn-success"} outline onClick={() => {}}>
                                            <i className="fa fa-heart mr-1"></i>SEND This Streamer <strong>{process.env.REACT_APP_CRYPTO_TOKEN_NAME}</strong> ~ ($$$)
                                        </Button>
                                </CardBody>
                            </Card>
                        </TabPane> : null}
                        <TabPane tabId="2">
                            <p className="mb-0 m-t-20">{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                        </TabPane>
                        <TabPane tabId="3">
                            <p className="mb-0 m-t-20"> {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                        </TabPane>
                        <TabPane tabId="4">
                            <p className="mb-0 m-t-20">{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}</p>
                        </TabPane>
                    </TabContent>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    );
}

export default BottomContainerHelper;