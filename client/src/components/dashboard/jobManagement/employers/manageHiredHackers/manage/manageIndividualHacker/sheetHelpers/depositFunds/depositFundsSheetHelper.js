import React from 'react';
import "./styles.css";
import Sheet from 'react-modal-sheet';
import { Button, Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const DepositFundsSheetPaneHelper = ({ isDepositOpen, setSheetDepositOpen }) => {
    return (
        <div>
            <Sheet isOpen={isDepositOpen} onClose={() => setSheetDepositOpen(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <div className='margin-medium-button-pane'>
                        <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }} onClick={() => setSheetDepositOpen(false)}>Close/Exit Pane</Button>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Container fluid={true}>
                        <Row style={{ marginTop: "25px" }}>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card className='bordered-shadowed-card-deposit'>
                                    <CardHeader className={"b-l-info b-r-info"}>
                                        <h2 className='header-deposit-card-funds'>Deposit funds into your account to start an 'active' contract. This will <strong>activate</strong> the entire hiring process/flow</h2>
                                        <p className='lead'>This will start the actual process of initalizing the contract 'flow' and will notify the hacker you've selected/chosen that payment has been deposited. <strong style={{ color: "#f73164" }}>This does NOT transfer funds to the hacker's account - this simply CAPTURES the funds used to pay the hacker when the job is COMPLETED.</strong> This simply assures the hacker that the funds will be in place/order for when the contract is successfully completed and the correct documents have been signed/processed.</p>
                                    </CardHeader>
                                    <CardBody>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardBody className='bordered-shadowed-card-deposit'>
                                        <h2 className='header-deposit-card-funds'>You will need to deposit $1,432.99 <strong>BEFORE</strong> any progress or action will be taken on this particular contract.</h2>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}

export default DepositFundsSheetPaneHelper;