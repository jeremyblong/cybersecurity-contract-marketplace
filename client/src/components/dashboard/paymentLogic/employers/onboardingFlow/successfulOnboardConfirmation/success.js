import React, { Fragment, useEffect } from 'react';
import { CardBody, CardHeader, Container, Row, Col, Card } from 'reactstrap';
import "./styles.css";
import Breadcrumb from '../../../../../../layout/breadcrumb';
import axios from 'axios';
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';


const SuccessfulOnboardCompletionHelper = ({ userData }) => {

    const history = useHistory();

    useEffect(() => {
        const configuration = {
            userID: userData.uniqueId
        };

        // run checks for authenticated/onboarded stripe account..
        axios.post(`${process.env.REACT_APP_BASE_URL}/check/account/mark/verified/applicable/hacker`, configuration).then((res) => {
            if (res.data.message === "Successfully marked onboarding as complete!") {
                console.log("Scucess! :", res.data);

                NotificationManager.success(`You've ALREADY completed the payment onboarding process/flow & you may now make the appropriate changes or charges to various payment methods/accounts. You may still need to verify other information however the main important data has already been collected!`, "Onboarding process/flow already completed!", 4750);
            } else if (res.data.message === "User has NOT verified or onboarded their account yet successfully..") {
                NotificationManager.warning(`You have NOT verified your account yet & are NOT permitted to actively hire any hacker's or make any payment's until the verification process is completed. To redirect to verify your account - click this notification!`, "Click notification to redirect to onboarding flow/process!", 5250, () => {
                    // redirec to appropriate page..
                    history.push("/hacker/account/signup/flow/payment/related");
                });
            } else {
                console.log("res.data err:", res.data);

                NotificationManager.error(`An unknown errror has occurred while attempting to detect whether or not your account has been properly authenticated/onboarded via stripe's payment system. Please try verifiying your account via the onboarding process/flow by clicking this notification!`, "Click notification to redirect to onboarding flow/process!", 5250, () => {
                    // redirec to appropriate page..
                    history.push("/hacker/account/signup/flow/payment/related");
                });
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error(`An unknown errror has occurred while attempting to detect whether or not your account has been properly authenticated/onboarded via stripe's payment system. Please try verifiying your account via the onboarding process/flow by clicking this notification!`, "Click notification to redirect to onboarding flow/process!", 5250, () => {
                // redirec to appropriate page..
                history.push("/hacker/account/signup/flow/payment/related");
            });
        })
    }, []);

    return (
        <Fragment>
            <Breadcrumb parent="Successful Onboarding Flow/Process Completion" title="You've Successfully Completed The Required Payment Onboarding Process!"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardHeader className='b-l-info b-r-info'>
                                <h1>Thank you for taking the time to <strong style={{ textDecorationLine: "underline" }}>complete the onboarding process/flow!</strong></h1>
                                <p className='subheader-preview-onboarding-p'>Your account now has <strong>payment privileges</strong> & you may now <strong style={{ textDecorationLine: "underline" }}>HIRE & PAY</strong> any desired hacker's for jobs/gig's they may complete that you've posted. Employer account's are NOT allowed to <strong>hire</strong> any hacker's although employer account may <strong>post listings</strong> without onboarding completion however they will not be able to start the actual process of hiring a hacker(s).</p>
                            </CardHeader>
                            <CardBody>
                                <img src={require("../../../../../../assets/images/onboarding-complete.png")} className={"very-tall-completion-onboarding-image"} />
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
export default connect(mapStateToProps, {  })(SuccessfulOnboardCompletionHelper);