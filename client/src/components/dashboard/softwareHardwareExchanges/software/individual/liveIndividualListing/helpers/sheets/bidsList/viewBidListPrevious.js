import React, { Fragment } from 'react';
import Sheet from 'react-modal-sheet';
import "./styles.css";
import { Button, Container, Row, Col, Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import ReactPlayer from "react-player";
import moment from 'moment';


const ViewPreviousBidsListHelper = ({ bidsPane, openBidListPane, bids }) => {
    return (
        <Fragment>
            <Sheet className='sheet-one-index' isOpen={bidsPane} onClose={() => openBidListPane(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <div className='marginized-top-header'>
                        <Button className='btn-square-danger' color='danger-2x' style={{ width: "100%" }} outline onClick={() => openBidListPane(false)}>Cancel/Close Pane</Button>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Container style={{ marginTop: "17.5px" }} fluid={true}>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader className='b-l-primary b-r-primary'>
                                        <h2 className='place-bid-header'>View 'Bid History' & all previously submitted bid related data for this specific auction</h2>
                                        <p className='lead'>These are the previous bids (<strong>all bids</strong>) that have been recieved for this specific listing. You will be able to see the bidder's name, date posted and the bid amount however we limit all other information/data. </p>
                                    </CardHeader>
                                    <CardBody>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Card className='shadow'>
                                                <CardHeader>
                                                    <h5>View previously submitted bids..</h5><span>{"Previously recorded bid's are bids that have 'previously' been submitted. Check back frequently for updates & changes as you can be outbidded at any moment or point in time.."}</span>
                                                </CardHeader>
                                                <CardBody>
                                                    <ListGroup className='bids-listgroup'>
                                                        {bids !== null && typeof bids !== "undefined" && bids.length > 0 ? bids.map((bid, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <Row>
                                                                        <ListGroupItem className="d-flex justify-content-between align-items-center">
                                                                            <Col sm="12" md="6" lg="6" xl="6">
                                                                                <h2 className='bidder-name'>Bidder's Name: <em style={{ color: "#a927f9" }}>{bid.bidderName}</em></h2>
                                                                            </Col>
                                                                            <Col sm="12" md="6" lg="6" xl="6">
                                                                                <h2 className='bidder-name'>Bid Placed: <em style={{ color: "#7366ff" }}>{bid.bidDateString}</em> and/or <em style={{ color: "#7366ff" }}>{moment(bid.bidDate).fromNow()}</em></h2>
                                                                            </Col>
                                                                            <span className="badge badge-success absolute-right-bid">${Number(bid.amount).toFixed(2)}</span>
                                                                        </ListGroupItem>
                                                                    </Row>
                                                                    
                                                                </Fragment>
                                                            );
                                                        }) : <Fragment>
                                                            <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} height={"100%"} className={"no-bids-available-video"} wrapper={"div"} url={require("../../../../../../../../../assets/video/no-previous-bids-available.mp4")} />
                                                        </Fragment>}
                                                    </ListGroup>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </Fragment>
    );
}

export default ViewPreviousBidsListHelper;