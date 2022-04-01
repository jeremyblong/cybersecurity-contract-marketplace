import React, { Fragment } from 'react';
import Sheet from 'react-modal-sheet';
import "./styles.css";
import { Button, Container, Row, Col, Card, CardBody, CardHeader, FormGroup, Input, Label, Form, CardFooter } from "reactstrap";

const PlaceABidSoftwareActionHelper = ({ bidPrice, setBidPrice, sheetBidOpen, setSheetPaneOpen, handleNewBidSubmission }) => {
    return (
        <Fragment>
            <Sheet className='sheet-one-index' isOpen={sheetBidOpen} onClose={() => setSheetPaneOpen(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <div className='marginized-top-header'>
                        <Button className='btn-square-danger' color='danger-2x' style={{ width: "100%" }} outline onClick={() => setSheetPaneOpen(false)}>Cancel/Close Pane</Button>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Container style={{ marginTop: "17.5px" }} fluid={true}>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader className='b-l-primary b-r-primary'>
                                        <h2 className='place-bid-header'>Place a bid on this specific auction, good luck! Check the auction 'ending date' before bidding as sometimes it's best to wait till near the end to bid..</h2>
                                        <p className='lead'>We recommend bidding/betting any <strong>ANY</strong> given point in time however, many user's believe that bidding at the last moment increases odd's of others having time to respond <strong>however</strong> this <strong>does</strong> have some pitfalls. Check them out here... <a style={{ textDecorationLine: "underline", fontWeight: "bold" }} target={"_blank"} href={"https://gbr.pepperdine.edu/2010/08/the-winners-curse-and-optimal-auction-bidding-strategies/"}>betting tactics</a></p>
                                    </CardHeader>
                                    <CardBody>
                                        <Col sm="12" md="12" lg="12" xl="12">
                                            <Card className='shadow'>
                                                <CardHeader>
                                                    <h5>Place a bid</h5><span>{"You'll need to enter a bid that is HIGHER than the existing bid otherwise it'll be rejected automatically. Please enter a bid HIGHER than the exsting current bid amount.."}</span>
                                                </CardHeader>
                                                <CardBody>
                                                    <Form className="theme-form">
                                                        <FormGroup className="row">
                                                            <Label className="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-form-label">Bid Amount (USD-$)</Label>
                                                            <Col sm="12" md="10" lg="10" xl="10">
                                                                <Input onChange={(e) => setBidPrice(e.target.value)} value={bidPrice} type={"number"} className="form-control" placeholder="49.99"  />
                                                            </Col>
                                                        </FormGroup>
                                                    </Form>
                                                </CardBody>
                                                <CardFooter>
                                                    <Button color="primary" style={{ width: "49.5%" }} className="mr-1" onClick={() => handleNewBidSubmission()}>Submit New Bid/Bet</Button>
                                                    <Button color="danger" style={{ width: "49.5%" }} onClick={() => setSheetPaneOpen(false)}>Cancel & Close Pane</Button>
                                                </CardFooter>
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

export default PlaceABidSoftwareActionHelper;