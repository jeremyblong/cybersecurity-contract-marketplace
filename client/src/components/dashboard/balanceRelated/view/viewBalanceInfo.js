import React, { Fragment, useState, useEffect } from 'react';
import { CardHeader, CardBody, CardFooter, Card, Row, Col, Container, ListGroup, ListGroupItem } from 'reactstrap';
import "./styles.css";
import Breadcrumb from '../../../../layout/breadcrumb';
import { connect } from "react-redux";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import moment from 'moment';


const ViewAllBalanceRelatedInfoHelper = ({ userData }) => {

    const [ balanceInfo, setBalanceInfo ] = useState(null);
    const [ instantAvailable, setInstantAvailable ] = useState(null);
    const [ available, setAvailiable ] = useState(null);
    const [ pending, setPending ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ transactions, setTransactions ] = useState([]);

    useEffect(() => {
        const config = {
            params: {
                uniqueId: userData.uniqueId,
                accountType: userData.accountType
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/availiable/stripe/bal`, config).then((res) => {
            if (res.data.message === "Gathered balance!") {

                const { bal } = res.data;

                setBalanceInfo(bal);

                if (userData.accountType === "hackers") {
                    for (let index = 0; index < bal.instant_available.length; index++) {
                        const element = bal.instant_available[index];
                        if (element.currency === "usd") {
                            setInstantAvailable(element);
                            break;
                        }
                    }
                    for (let index = 0; index < bal.available.length; index++) {
                        const element = bal.available[index];
                        if (element.currency === "usd") {
                            setAvailiable(element);
                            break;
                        }
                    }
                    for (let index = 0; index < bal.pending.length; index++) {
                        const element = bal.pending[index];
                        if (element.currency === "usd") {
                            setPending(element);
                            break;
                        }
                    }
                }

                console.log(res.data);

                setReady(true);
            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("An unknown error has occurred while attempting to fetch your related balance related information, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("An unknown error has occurred while attempting to fetch your related balance related information, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
        })
    }, []);

    useEffect(() => {

        if (userData.accountType === "employers") {
            const config = {
                params: {
                    uniqueId: userData.uniqueId,
                    accountType: userData.accountType
                }
            }
            axios.get(`${process.env.REACT_APP_BASE_URL}/gather/transactional/history/employer`, config).then((res) => {
                if (res.data.message === "Gathered transactional history!") {
                    console.log(res.data);

                    const { balanceTransactions } = res.data;

                    setTransactions(balanceTransactions.data);
                } else {
                    console.log("err", res.data);
                    
                    NotificationManager.warning("An unknown error has occurred while attempting to transactional history and/or past transactions, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
                }
            }).catch((err) => {
                console.log(err);
    
                NotificationManager.warning("An unknown error has occurred while attempting to transactional history and/or past transactions, Contact support if the problem persists!", "Unknown error has occurred.", 4750);
            })
        }
    }, [])

    console.log("ready", ready);

    console.log("transactions", transactions);

    const renderContent = () => {
        if (userData.accountType === "hackers") {
            return (
                <Fragment>
                    <Col sm="12" lg="4" md="12" xl="4">
                        <Card className='card-bal-bal'>
                            <CardHeader className="b-l-success border-3">
                                <h5 className='header-balance-green'>Available</h5>
                            </CardHeader>
                            <CardBody>
                                <p className='lead'>You currently <strong>available balance</strong> which you have <strong>immediate</strong> access to, these are funds you can currently withdrawl & use! Funds that are available to be transferred or paid out..</p>
                                <hr />
                                {ready === true ? <p className='heavy-instant-availiable'>Immediate Available Balance: <strong style={{ color: "#51bb25", textDecorationLine: "underline" }}>${(Number(available.amount / 100)).toFixed(2)}</strong></p> : <div className='position-bottom-bal'>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={6} />
                                        </p>
                                    </SkeletonTheme>
                                </div>}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" lg="4" md="12" xl="4">
                        <Card className='card-bal-bal'>
                            <CardHeader className="b-l-secondary border-3">
                                <h5 className='header-balance-red'>{userData.accountType === "hackers" ? "Instant Available" : "Connect Reserved"}</h5>
                            </CardHeader>
                            <CardBody>
                                <p className='lead'><strong>Funds held</strong> due to <strong>negative</strong> balances on hacker account types. These are <strong>"held"</strong> funds.</p>
                                <hr />
                                {ready === true ? <p className='heavy-instant-availiable'>Instant Available Balance: <strong style={{ color: "#51bb25", textDecorationLine: "underline" }}>${(Number(instantAvailable.amount / 100)).toFixed(2)}</strong></p> : <div className='position-bottom-bal'>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={6} />
                                        </p>
                                    </SkeletonTheme>
                                </div>}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" lg="4" md="12" xl="4">
                        <Card className='card-bal-bal'>
                            <CardHeader className="b-l-primary border-3">
                                <h5 className='header-balance-primary'>Pending</h5>
                            </CardHeader>
                            <CardBody>
                                <p className='lead'>These funds are <strong>"pending"</strong> funds which means they are <strong>not yet</strong> available due to the <strong>7-day rolling pay cycle</strong>. It generally takes a few days (7) for newly aquired funds to become available!</p>
                                <hr />
                                {ready === true ? <p className='heavy-instant-availiable'>Pending Available Balance: <strong style={{ color: "#51bb25", textDecorationLine: "underline" }}>${(Number(pending.amount / 100)).toFixed(2)}</strong></p> : <div className='position-bottom-bal'>
                                    <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                        <p>
                                            <Skeleton count={6} />
                                        </p>
                                    </SkeletonTheme>
                                </div>}
                            </CardBody>
                        </Card>
                    </Col>
                </Fragment>
            );
        } else {
            if (ready === true) {
                return (
                    <Fragment>
                        <Col sm="12" lg="4" md="12" xl="4">
                            <Card className='card-bal-bal'>
                                <CardHeader className="b-l-success border-3">
                                    <h5 className='header-balance-green'>Available</h5>
                                </CardHeader>
                                <CardBody>
                                    <p className='lead'>You currently <strong>available balance</strong> which you have <strong>immediate</strong> access to, these are funds you can currently withdrawl & use! Funds that are available to be transferred or paid out..</p>
                                    <hr />
                                    <p className='heavy-instant-availiable'>Immediate Available Balance: <strong style={{ color: "#51bb25", textDecorationLine: "underline" }}>${(Number(balanceInfo / 100)).toFixed(2)}</strong></p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" lg="8" md="12" xl="8">
                            <div className='top-portion-transactions'>
                                <h5 className='topportion-text'>These are your <strong style={{ textDecorationLine: "underline", color: "#7366ff" }}>balance</strong> transactional history items!</h5>
                                <p className='lower-p'>These are various changes in your account balance whether money/funds we're added OR removed, anything related to your general account balance..</p>
                            </div>
                            <ListGroup className='listgroup-bal'>
                                {typeof transactions !== "undefined" && transactions.length > 0 ? transactions.map((transaction, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <ListGroupItem className="list-group-item-action custom-list-group-transactions flex-column align-items-start">
                                                <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1 custom-starting-bal-text">This transaction was approx. ${Number(transaction.amount / 100).toFixed(2)} ({transaction.currency})</h5><small>{moment(transaction.created * 1000).fromNow()}</small>
                                                </div>
                                                <p className="mb-1 custom-ending-bal-text">You ending balance <strong>after</strong> the ${Number(transaction.amount / 100).toFixed(2)} change resulting in <strong style={{ color: "#51bb25" }}>${Number(transaction.ending_balance / 100).toFixed(2)}</strong> total account balance..</p>
                                                <small>{transaction.object}</small>
                                            </ListGroupItem>
                                        </Fragment>
                                    );
                                }) : null}
                            </ListGroup>
                        </Col>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <Col sm="12" lg="12" md="12" xl="12">
                            <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                <p>
                                    <Skeleton count={20} />
                                </p>
                            </SkeletonTheme>
                        </Col>
                    </Fragment>
                );
            }
        }
    }

    return (
        <Fragment>
            <Breadcrumb parent="View Balance (Pending, Available & Held)" title="View Balance & Other Related Critical Information" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" lg="12" md="12" xl="12">
                        <Card className={"shadow-card-balance"}>
                            <CardHeader className='b-l-info b-r-info'>
                                <h3 className='balance-title'>Below you will be able to find, manage and view your related account balances & other related info!</h3>
                            </CardHeader>
                            <CardBody className='b-l-secondary b-r-secondary'>
                                <Row>
                                    {renderContent()}
                                </Row>
                            </CardBody>
                            <CardFooter className='b-l-info b-r-info'>
                                <p className='lead'>Above are your various account balances whether the bal. is available <strong>NOW</strong> or will be available <strong>shortly</strong> or in the near future & even pending deposit's!</p>
                            </CardFooter>
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
export default connect(mapStateToProps, { })(ViewAllBalanceRelatedInfoHelper);