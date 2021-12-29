import React, { Component } from 'react';
import PageOneMainHelper from "./multiStepPages/pageOne/pageOneMain.js";
import { Container, Col, Row, CardHeader, CardBody, Card, Progress } from "reactstrap";
import Breadcrumb from '../../../../../layout/breadcrumb';
import LoadingBar from 'react-top-loading-bar';
import { connect } from "react-redux";
import _ from 'lodash';
import PageTwoMainHelper from "./multiStepPages/pageTwo/pageTwoMain.js";
import "./styles.css";
import PageThreeHelper from "./multiStepPages/pageThree/pageThreeMain.js";

class CreateNewSoftwareListingHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        progress: 0
    }
}
    componentDidMount() {
        this.setState({
            progress: this.calculateProgressPercentage(this.props.currentPage)
        })
    }

    renderConditionalPageContent = () => {
        const { currentPage } = this.props;

        switch (currentPage) {
            case 1:
                return <PageOneMainHelper props={this.props} />;
                break;
            case 2: 
                return <PageTwoMainHelper props={this.props} />;
                break;
            case 3: 
                return <PageThreeHelper props={this.props} />;
                break;
            default:
                break;
        }
    }
    calculateProgressPercentage = (page) => {
        switch (page) {
            case 1:
                return 25;
                break;
            case 2:
                return 50;
                break;
            case 3: 
                return 75;
                break;
            case 4: 
                return 100;
                break;
            default:
                break;
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("prevProps", prevProps);
        console.log("----------------------");
        console.log("prevState", prevState);

        if (prevProps.currentPage !== this.props.currentPage) {

            console.log("updating state!! CDU createNewListing.js component.");

            this.setState({
                progress: this.calculateProgressPercentage(this.props.currentPage)
            })
        }
    }
    render () {
        const { progress } = this.state;
        return (
            <div>
                <LoadingBar
                    color='#f73164'
                    height={8}
                    className={"create-listing-software-loadbar"}
                    progress={progress}
                    containerClassName={"container-create-listing-software-loadbar"}
                    loaderSpeed={3500}
                    onLoaderFinished={() => {
                        this.setState({
                            progress: 0
                        })
                    }}
                />
                <Breadcrumb parent="Software (digital assets) Marketplace" title="Create a listing to sell software/code"/>
                <Container className="full-height-container" fluid={true}>
                    <Row>
                        <Col sm="12" md="12" lg="12" xl="12">
                            <Card className="full-height-container">
                                <CardHeader>
                                    <h5>Create a <strong style={{ color: "blue" }}>software</strong> listing - post a code snippet, malware, viruses, etc...</h5>
                                    <p>We are <em style={{ color: "red", textDecorationLine: "underline" }}>NOT</em> in any shape or form responsible if you use these codes/programs in a malicious manner AND any suspicious activity or reports <strong style={{ textDecorationLine: "underline", color: "red" }}>WILL</strong> be throughly investigated & reported to the appropriate authorities.</p>
                                    <hr />
                                    <p className="spacer-paragraph">In order to post a listing to sell or trade digital software related content, you will need to complete the following <strong>multi-page</strong> form to completion & your listing/item will be immediately posted shortly thereafter!</p>
                                    <div className="push-bottom-progress-bar">
                                        <div className="position-middle-bar-div">
                                            <h4 id="progress-text-centered">{`${progress}% Completed (Create-listing flow)`}</h4>
                                        </div>
                                        <Progress className="reactstrap-progress-bar-custom" animated color="secondary" value={progress} />
                                    </div>
                                </CardHeader>
                                <CardBody className="full-height-cardbody-extra">
                                    {this.renderConditionalPageContent()}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("State in 'createNewListing.js'", state);

    return {
        currentPage: _.has(state.softwareListingSale, "softwareListingSaleInfo") && Object.keys(state.softwareListingSale.softwareListingSaleInfo).length > 0 ? state.softwareListingSale.softwareListingSaleInfo.currentPage : 1
    }
}
export default connect(mapStateToProps, {  })(CreateNewSoftwareListingHelper);