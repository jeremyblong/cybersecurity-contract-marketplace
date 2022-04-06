import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, TabPane, TabContent, Button } from "reactstrap";
import Breadcrumb from '../../../../../../layout/breadcrumb';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import "./styles.css";
import { confirmAlert } from 'react-confirm-alert'; 

const PurchaseCourseContentStripePaymentHelper = ({ userData }) => {

    const { id } = useParams();

    const history = useHistory();
    
    const [ cards, setCardData ] = useState([]);
    const [ viewList, setTotalViewsList ] = useState([]);
    const [ likes, setLikes ] = useState(0);
    const [ dislikes, setDislikes ] = useState(0);
    const [ activeTab, setActiveTabState ] = useState("1");
    const [ courseData, setCourseContent ] = useState(null);
    const [ paymentMethodSelected, setSelectedPayment ] = useState(null);

    useEffect(() => {
        const configuration = {
            params: {
                id: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/cards/payment/methods/both/accounts`, configuration).then((res) => {
            if (res.data.message === "Gathered employer payment cards!") {

                const { cards } = res.data;

                setCardData(cards);
            } else {
                console.log("err gathering card data...", res.data);

                NotificationManager.error("An error occurred while attempting to fetch the desired account 'card data', please reload the page or contact support if the problem persists!", "Error gathering account card data!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An error occurred while attempting to fetch the desired account 'card data', please reload the page or contact support if the problem persists!", "Error gathering account card data!", 4750);
        });
    }, []);

    useEffect(() => {
        const configuration = {
            params: {
                id,
                signedInUserID: userData.uniqueId,
                fullName: `${userData.firstName} ${userData.lastName}`
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/individual/course/data`, configuration).then((res) => {
            if (res.data.message === "Successfully fetched course/listing!") {
                console.log(res.data);
                // successful request
                const { course } = res.data;
                // update course view count details
                setTotalViewsList(course.viewedByList);
                // set likes
                setLikes(course.likes);
                // set dislikes
                setDislikes(course.dislikes);

                setCourseContent(course);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    console.log("Cards", cards);

    console.log("courseData", courseData);

    const handleCoursePurchase = () => {
        console.log("handleCoursePurchase clicked/ran");

        if (paymentMethodSelected !== null) {
            confirmAlert({
                title: `Are you sure you'd like to continue purchasing this course?`,
                message: `You are about to purchase this course content, once this action is taken - it cannot be undone. If you're sure you'd like to purchase this course, continue with this process/flow!`,
                buttons: [
                {
                    label: 'Yes, Purchase Course!',
                    onClick: () => {
                        console.log("confirmed.");
    
                        const configuration = {
                            id,
                            signedInUserID: userData.uniqueId,
                            signedinAccountType: userData.accountType,
                            price: (courseData.mainData.pageOneData.mainData.pricing.numerical * 100),
                            selectedCard: paymentMethodSelected
                        }
                        axios.post(`${process.env.REACT_APP_BASE_URL}/handle/purchase/course/content/payment`, configuration).then((res) => {
                            if (res.data.message === "Successfully purchased course-content!") {
                                console.log(res.data);
    
                                NotificationManager.success("You've SUCCESSFULLY purchased this related course-data content, you may now go to your 'purchased courses' page to view this information!", "Succesfully purchased this course-data!", 4750);

                                setTimeout(() => {
                                    if (userData.accountType === "hackers") {
                                        history.replace("/dashboard/hacker");
                                    } else {
                                        history.replace("/dashboard/employer");
                                    }
                                }, 4000)
    
                            } else if (res.data.message === "Could NOT retrieve the requested course-information, please try this action again or contract support if the problem persists!") {
                                
                                NotificationManager.warning("Could NOT retrieve the requested course-information, please try this action again or contract support if the problem persists!", "Could NOT retrieve desired course information..", 4750);
    
                            } else if (res.data.message === "You MUST complete the 'stripe' onboarding process/flow BEFORE making ANY purchases whatsoever. This is non-negotiable however the process is very quick generally speaking!") {
    
                                NotificationManager.warning("You MUST complete the 'stripe' onboarding process/flow BEFORE making ANY purchases whatsoever. This is non-negotiable however the process is very quick generally speaking!", "MUST complete stripe-onboarding before proceeding!", 4750);
    
                            } else if (res.data.message === "You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!") {
    
                                NotificationManager.warning("You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!", "Add more funds to your account before proceeding!", 4750);
    
                            } else {
                                console.log("err", res.data);
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                },
                {
                    label: 'No, Cancel.',
                    onClick: () => {
                        console.log("Cancelled.");
                    }
                }
                ]
            });
        } else {
            NotificationManager.warning("You MUST select a previously-added card BEFORE proceeding with this transaction, please 'add a card' if you do not have any cards on file by clicking this dialog box!", "Select or add a payment method before continuing!", 4750, () => {
                if (userData.accountType === "employers") {
                    history.push(`/payment/logic/main/page/employers`);
                } else {
                    history.push(`/payment/logic/main/page/hackers`);
                }
            });
        }
    }

    return (
        <Fragment>
            <Breadcrumb parent="Purchase A Educational/Instructional Course!" title="You're About To Purchase This Course.."/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className={"shadow"}>
                            <CardHeader className={"b-l-primary b-r-primary"}>
                                <h3>You're about to purchase this course, if you're sure about this decision - continue with the logic/data below & proceed with your purchase!</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg="6" sm="12" md="6" xl="6">
                                        <Card className='shadow'>
                                            <CardHeader>
                                                <div className="product-page-details">
                                                    <h3>{"Previously Added Card(s) & Method's"}</h3>
                                                </div>
                                            </CardHeader>
                                            <CardBody>
                                                <ListGroup>
                                                    {typeof cards !== "undefined" && cards.length > 0 ? cards.map((payment, idx) => {
                                                        console.log("payment", payment);
                                                        return (
                                                            <Fragment key={idx}>
                                                                <ListGroupItem onClick={() => {
                                                                    setSelectedPayment(payment);
                                                                }} className={paymentMethodSelected !== null && paymentMethodSelected.id === payment.id ? "list-group-item-action listitem-pricing-card flex-column align-items-start mt-3 active" : "list-group-item-action listitem-pricing-card flex-column align-items-start"}>
                                                                    <div className="d-flex w-100 justify-content-between">
                                                                        <h5 className="mb-1">{payment.name}</h5>
                                                                        {/* <small style={{ color: "#f73164" }} className="text-secondary">{"Primary Method"}</small> */}
                                                                    </div>
                                                                    <p className="mb-1">{`**** **** **** ${payment.last4}`}</p>
                                                                    <small className={paymentMethodSelected !== null && paymentMethodSelected.id === payment.id ? "txt-light" : "text-muted"}>{`Exp. ${payment.exp_month} ${payment.exp_year}`} <small className="float-right">Card Type: {payment.brand}</small></small>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    }) : <Fragment>
                                                        <div className="centered-both-ways">
                                                            <img src={require("../../../../../../assets/images/credit-cards.jpg")} className={"credit-cards-placeholder"} />
                                                        </div>
                                                    </Fragment>}
                                                </ListGroup>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="6" sm="12" md="6" xl="6">
                                        <Card className='shadow'>
                                            <CardHeader>
                                                <div className="product-page-details">
                                                    <h3>{"Course Details/Information (Overview)"}</h3>
                                                </div>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col sm="4 tab-javascript">
                                                        <ListGroup className="nav-primary nav-pills">
                                                            <ListGroupItem href={null} className={activeTab === '1' ? 'list-group-item-action active' : ''} onClick={() => setActiveTabState('1')}>Reactions</ListGroupItem>
                                                        </ListGroup>
                                                        <ListGroup>
                                                            <ListGroupItem href={null} className={activeTab === '2' ? 'list-group-item-action active' : ''} onClick={() => setActiveTabState('2')}>Course Data</ListGroupItem>
                                                        </ListGroup>
                                                        <ListGroup>
                                                            <ListGroupItem href={null} className={activeTab === '3' ? 'list-group-item-action active' : ''} onClick={() => setActiveTabState('3')}>Pricing</ListGroupItem>
                                                        </ListGroup>
                                                        <ListGroup>
                                                            <ListGroupItem href={null} className={activeTab === '4' ? 'list-group-item-action active' : ''} onClick={() => setActiveTabState('4')}>Additional Data</ListGroupItem>
                                                        </ListGroup>
                                                    </Col>
                                                    <Col sm="8">
                                                        {courseData !== null ? <Fragment>
                                                            <TabContent activeTab={activeTab}>
                                                                <TabPane tabId="1" className="fade show">
                                                                    <ListGroup className="list-group-flush">
                                                                        <ListGroupItem>Like(s): <em style={{ color: "#f73164", fontWeight: "bold" }}>{likes} likes</em></ListGroupItem>
                                                                        <ListGroupItem>Dislike(s): <em style={{ color: "#f73164", fontWeight: "bold" }}>{dislikes} dislikes</em></ListGroupItem>
                                                                        <ListGroupItem>Comment Count: <em style={{ color: "#f73164", fontWeight: "bold" }}>{typeof courseData.comments !== "undefined" && courseData.comments.length > 0 ? courseData.comments.length : 0} comment's</em></ListGroupItem>
                                                                        <ListGroupItem>Purchase Count: <em style={{ color: "#f73164", fontWeight: "bold" }}>Purchased {typeof courseData.purchased !== "undefined" && courseData.purchased.length > 0 ? courseData.purchased.length : 0} times</em></ListGroupItem>
                                                                        <ListGroupItem>Total View(s): <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.totalViews} view's</em></ListGroupItem>
                                                                    </ListGroup>
                                                                </TabPane>
                                                                <TabPane tabId="2" className="fade show">
                                                                    <ListGroup className="list-group-flush">
                                                                        <ListGroupItem>Title: <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.mainData.pageOneData.mainData.courseTitle}</em></ListGroupItem>
                                                                        <ListGroupItem>Subtitle: <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.mainData.pageThreeData.subtitle}</em></ListGroupItem>
                                                                        <ListGroupItem>Category: <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.mainData.pageOneData.mainData.courseCategory.label}</em></ListGroupItem>
                                                                        <ListGroupItem>Description: <ReactMarkdown children={courseData.mainData.pageOneData.mainData.description} remarkPlugins={[remarkGfm]} className="description-markdown-course" /></ListGroupItem>
                                                                    </ListGroup>
                                                                </TabPane>
                                                                <TabPane tabId="3" className="fade show">
                                                                    <ListGroup className="list-group-flush">
                                                                        <ListGroupItem>Price: <em style={{ color: "#f73164", fontWeight: "bold" }}>${courseData.mainData.pageOneData.mainData.pricing.numerical}</em></ListGroupItem>
                                                                        <ListGroupItem>Tier: <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.mainData.pageOneData.mainData.pricing.tier}</em></ListGroupItem>
                                                                    </ListGroup>
                                                                </TabPane>
                                                                <TabPane tabId="4" className="fade show">
                                                                    <ListGroup className="list-group-flush">
                                                                        <ListGroupItem>Primary Language: <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.mainData.pageThreeData.primaryLanguageUsed.label}</em></ListGroupItem>
                                                                        <ListGroupItem>Skill Level: <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.mainData.pageThreeData.skillLevel.label}</em></ListGroupItem>
                                                                        <ListGroupItem>Course Language: <em style={{ color: "#f73164", fontWeight: "bold" }}>{courseData.mainData.pageThreeData.languageSpoken.fullLength}</em></ListGroupItem>
                                                                    </ListGroup>
                                                                </TabPane>
                                                            </TabContent>
                                                        </Fragment> : <Fragment>
                                                            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                                                <p>
                                                                    <Skeleton count={25} />
                                                                </p>
                                                            </SkeletonTheme>
                                                        </Fragment>}
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12" lg="12" xl="12">
                                        <Button onClick={handleCoursePurchase} className={"btn-square-success"} color={"success-2x"} outline style={{ width: "100%" }}>Continue & Purchase Course!</Button>
                                    </Col>
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
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(PurchaseCourseContentStripePaymentHelper);