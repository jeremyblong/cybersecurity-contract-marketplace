import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container, Row, Col, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import helpers from "./helpers/miscFunctions.js";
import CreateNewCoursePageOne from "./helpers/pages/pageOne/index.js";
import CreateNewCoursePageTwo from "./helpers/pages/pageTwo/index.js";
import LoadingBar from 'react-top-loading-bar';


const EducationalCoursesCreationHelper = ({  }) => {
    const [progress, setProgress] = useState(0);

    const renderCurrentPage = () => {
        const page = 2;

        switch (page) {
            case 1:
                return <CreateNewCoursePageOne />;
                break;
            case 2: 
                return <CreateNewCoursePageTwo setProgress={setProgress} />
                break;
            default:
                break;
        }
    }
    return (
        <Fragment>
            <LoadingBar
                color={'#f73164'}
                height={9}
                progress={progress}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            <Breadcrumb parent="Educational Content Upload(ing)" title="Create New Education Course For Sale/Rent" /> 
                <Container fluid={true}>
                    {renderCurrentPage()}
            </Container>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(EducationalCoursesCreationHelper);