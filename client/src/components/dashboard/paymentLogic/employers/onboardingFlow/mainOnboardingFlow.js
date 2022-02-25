import React, { Fragment, useEffect, useState } from 'react';
import { CardBody, CardHeader, Container, Row, Col, Card } from 'reactstrap';
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import axios from "axios";
import { connect } from "react-redux";
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


const MainOnboardingFlowHelper = ({ userData }) => {

    const [ link, setLink ] = useState(null);

    const history = useHistory();

    useEffect(() => {

        // history.push("/successful/onboarding/process/stripe/employer/account");

        const configuration = {
            params: {
                userID: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/onboarding/stripe/link/data`, configuration).then((res) => {
            if (res.data.message === "Successfully activated stripe onboarding process!") {
                console.log(res.data);

                const { link } = res.data;

                NotificationManager.success(`You're about to be redirect to our parter/onboarding-flow at the URL of ${link} here momentarily...`, "You're about to be redirected in 5 seconds!", 5000);

                setTimeout(() => {
                    window.open(link, '_self');
                }, 5000)
            } else {
                console.log("res.data err:", res.data);

                NotificationManager.success(`An unknown error occurred while attempting to fetch the desired 'onboarding link' and we are unable to proceed forward at this time. If this problem persists try refreshing the page or contacting support!`, "Unable to load proper redirect URL link!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.success(`An unknown error occurred while attempting to fetch the desired 'onboarding link' and we are unable to proceed forward at this time. If this problem persists try refreshing the page or contacting support!`, "Unable to load proper redirect URL link!", 4750);
        })
    }, []);

    console.log("link", link);

    return (
        <Fragment>
            <Breadcrumb parent="Authenticate & Verify Your Account" title="You MUST verify your account before any transaction's will process.."/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardHeader>
                                <h1><strong style={{ textDecorationLine: "underline" }}>Stripe</strong> onboarding process/flow to enable payments, transfer's and anything payment related..</h1>
                                <p className='subheader-preview-onboarding-p'>You will momentarily see (if properly loaded) the onboarding process/flow for stripe. Please follow the proceeding steps and complete any/all required information. You <strong>MUST</strong> complete this information before you may fully participate in our platform including but not limited to payments.</p>
                            </CardHeader>
                            <CardBody>
                                <Fragment>
                                    <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"video-loading-payment-onboarding"} wrapper={"div"} url={require("../../../../../assets/video/loading-onboarding.mp4")} />
                                </Fragment>
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
export default connect(mapStateToProps, {  })(MainOnboardingFlowHelper);