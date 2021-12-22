import React, { Component } from 'react';
import PageOneMainHelper from "./multiStepPages/pageOne/pageOneMain.js";
import { Container, Col, Row, CardHeader, CardBody, Card } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';

const CreateNewSoftwareListingHelper = (props) => {
    return (
        <div>
            <Breadcrumb parent="Software (digital assets) Marketplace" title="Create a listing to sell software/code"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardHeader>
                                <h5>Create a <strong style={{ color: "blue" }}>software</strong> listing - post a code snippet, malware, viruses, etc...</h5>
                                <p>We are <em style={{ color: "red", textDecorationLine: "underline" }}>NOT</em> in any shape or form responsible if you use these codes/programs in a malicious manner AND any suspicious activity or reports <strong style={{ textDecorationLine: "underline", color: "red" }}>WILL</strong> be throughly investigated & reported to the appropriate authorities.</p>
                                <hr />
                                <p>In order to post a listing to sell or trade digital software related content, you will need to complete the following <strong>multi-page</strong> form to completion & your listing/item will be immediately posted shortly thereafter!</p>
                            </CardHeader>
                            <CardBody>
                                <PageOneMainHelper props={props} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateNewSoftwareListingHelper;
