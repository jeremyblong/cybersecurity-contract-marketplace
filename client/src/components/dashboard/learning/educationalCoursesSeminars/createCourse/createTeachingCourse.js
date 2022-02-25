import React, { Fragment, useState, useEffect } from "react";
import "./styles.css";
import Breadcrumb from '../../../../../layout/breadcrumb';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import CreateNewCoursePageOne from "./helpers/pages/pageOne/index.js";
import CreateNewCoursePageTwo from "./helpers/pages/pageTwo/index.js";
import LoadingBar from 'react-top-loading-bar';
import _ from "lodash";
import CreateNewCoursePageThree from "./helpers/pages/pageThree/index.js";
import CreateNewCourseOverviewReview from "./helpers/pages/pageFour/review.js";

const EducationalCoursesCreationHelper = ({ courseData }) => {
    const [progress, setProgress] = useState(0);
    const [ overallProgress, setOverallProgress ] = useState(0);

    const renderCurrentPage = () => {
        const page = courseData.currentPage;

        switch (page) {
            case 1:
                return <CreateNewCoursePageOne overallProgress={overallProgress} setOverallProgress={setOverallProgress} />;
                break;
            case 2: 
                return <CreateNewCoursePageTwo overallProgress={overallProgress} setOverallProgress={setOverallProgress} setProgress={setProgress} />
                break;
            case 3:
                return <CreateNewCoursePageThree overallProgress={overallProgress} setOverallProgress={setOverallProgress} setProgress={setProgress} />
                break;
            case 4:
                return <CreateNewCourseOverviewReview overallProgress={overallProgress} setOverallProgress={setOverallProgress} setProgress={setProgress} />
                break;
            default:
                break;
        }
    }
    const calculateProgress = () => {
        switch (courseData.currentPage) {
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
                return 0;
                break;
        }
    }
    useEffect(() => {
        setOverallProgress(calculateProgress())
    }, [courseData.currentPage]);
    return (
        <Fragment>
            <LoadingBar
                color={'#51bb25'}
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
        userData: state.auth.data,
        courseData: _.has(state.courseData, "courseData") && Object.keys(state.courseData.courseData).length > 0 ? state.courseData.courseData : {
            currentPage: 1
        }
    }
}
export default connect(mapStateToProps, {  })(EducationalCoursesCreationHelper);