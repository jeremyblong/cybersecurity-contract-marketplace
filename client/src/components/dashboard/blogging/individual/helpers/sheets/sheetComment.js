import React from 'react';
import "./styles.css";
import Sheet from 'react-modal-sheet';
import { Button, Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const RestrictedBlogLeaveCommentHelperPane = ({ isMessagePaneOpen, setMessagePaneOpenState }) => {
    return (
        <div>
            <Sheet isOpen={isMessagePaneOpen} onClose={() => setMessagePaneOpenState(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <div className='margin-medium-button-pane'>
                        <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }} onClick={() => setMessagePaneOpenState(false)}>Close/Exit Pane</Button>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Container fluid={true}>
                        <Row style={{ marginTop: "25px" }}>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card className='shadow'>
                                    <CardHeader className={"b-l-info b-r-info"}>
                                        <h2 className='header-deposit-card-funds'>You're replying to the selected comment, this will be a <em>reply</em> to the OP's original response/comment..</h2>
                                    </CardHeader>
                                    <CardBody>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardBody className='shadow'>
                                        
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

export default RestrictedBlogLeaveCommentHelperPane;