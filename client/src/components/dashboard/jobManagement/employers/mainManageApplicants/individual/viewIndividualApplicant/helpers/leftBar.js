import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card, CardHeader, CardBody, Button, Media, Form, FormGroup, Input , Collapse, UncontrolledTooltip } from 'reactstrap';
import one from "../../../../../../../../assets/images/user/1.jpg";
import three from "../../../../../../../../assets/images/user/3.jpg";
import five from "../../../../../../../../assets/images/user/5.jpg";
import two from "../../../../../../../../assets/images/user/2.png";
import eight from "../../../../../../../../assets/images/user/8.jpg";
import eleven from "../../../../../../../../assets/images/user/11.png";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { BuckyBarnes, JasonBorne, SarahLoren, AndewJon, JohnyWaston, ComerenDiaz, ActivityFeed } from "../../../../../../../../constant";
import profileLogoPlaceholder from "../../../../../../../../assets/images/logo/logo-icon.png";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const calculateStatusType = (num) => {
    switch (num) {
        case 1:
            return "social-online";
            break;
        case 2:
            return "social-offline";
            break;
        case 3:
            return "social-busy";
            break;
        default:
            break;
    }
}


const LeftBar = ({ applicantData, lastProfileItem, user }) => {

    console.log("LEFTBAR user...: ", user);

    const history = useHistory();

    const [testingDatesOpen, setTestingDatesOpen] = useState(true);
    const [isMutual, setisMutual] = useState(true);
    const [isActivity, setisActivity] = useState(true);
    const [ presetIndex, setIndexState ] = useState(null);
    // previous applications/bids/proposals...
    const [ previouslyApplied, setPreviouslyAppliedState ] = useState([{
        profilePicture: "https://picsum.photos/200/300",
        name: "Jeremy Blong",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Alex Jankins",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Tom Mcdonald",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Kid Inkedslao",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Theo Tomhoas",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Mikey Smikithy",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Timoothy Walkings",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Adam Jones",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Alex Qualoda",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Pochie Notch",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Yelawolf Smelodo",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }, {
        profilePicture: "https://picsum.photos/200/300",
        name: "Yolodanda Smith",
        relatedListingTitle: "Praesent consequat lectus leo, a gravida dui efficitur sit amet. Integer scelerisque molestie elementum. Sed laoreet vestibulum mauris quis dictum",
        status: calculateStatusType(Math.floor(Math.random() * 3) + 1)
    }]);

    const redirectToHackersProfile = (hackerID) => {
        console.log("redirectToHackersProfile ran...");

        history.push(`/hacker/profile/individual/view/${hackerID}`);
    }

    return (
        <Fragment>
            <Col xl="12">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => {
                                setTestingDatesOpen(!testingDatesOpen);
                            }}
                                data-toggle="collapse" data-target="#collapseicon5" aria-expanded={testingDatesOpen} aria-controls="collapseicon5"
                                >View General User Information
                            </Button>
                        </h5>
                        <p>You can view the user's entire profile & more by clicking the "View More" button below...</p>
                    </CardHeader>
                    <Collapse isOpen={testingDatesOpen}>
                        <CardBody className="socialprofile filter-cards-view">
                            <Media><Media className="img-50 img-fluid m-r-20 rounded-circle min-width-height" src={(typeof lastProfileItem !== "undefined" && _.has(lastProfileItem, "link")) ? `${process.env.REACT_APP_ASSET_LINK}/${lastProfileItem.link}` : profileLogoPlaceholder} alt="" />
                                <Media body>
                                    <h6 className="font-primary f-w-600">{applicantData.applicantName}</h6><span className="d-block"><span><i className="fa fa-bell-o"> </i><span className="px-2">Following <span style={{ color: "white" }} className="badge badge-pill badge-secondary">{typeof user.followingCompanies !== "undefined" && user.followingCompanies.length} Employer's</span></span></span></span><span className="d-block"><span><i className="fa fa-bell-o"></i><span className="px-2">Following <span style={{ color: "white" }} className="badge badge-pill badge-info">{typeof user.followingHackers !== "undefined" && user.followingHackers.length} Hacker's</span></span></span></span>
                                </Media>
                            </Media>
                            <div className="social-btngroup d-flex">
                                <Button outline className={"btn-square-info text-center"} color="info-2x" type="button" onClick={() => redirectToHackersProfile(applicantData.applicantId)}>View Applicant Profile</Button>
                            </div>
                            <div className="likes-profile text-center">
                                <h5><span><i className="fa fa-heart font-danger"></i>  {user !== null && typeof user.profileLovesHearts !== "undefined" ? user.profileLovesHearts.length : 0} Page Heart's</span></h5>
                            </div>
                            <div className="text-center">{`${typeof user.recentlyViewedProfileViews !== "undefined" && user.recentlyViewedProfileViews.length > 0 ? user.recentlyViewedProfileViews.length : 0} Total Unique Profile View(s)`}</div>
                            <div className="customers text-center social-group">
                                <ul>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={three} alt="ThirdImg" id="UncontrolledTooltipExample"/>
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample">
                                            {JohnyWaston}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={five} alt="FifthImg" id="UncontrolledTooltipExample1" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample1">
                                            {AndewJon}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={one} alt="FirstImg" id="UncontrolledTooltipExample2" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample2">
                                            {ComerenDiaz}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={two} alt="secondImg" id="UncontrolledTooltipExample3" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample3">
                                            {BuckyBarnes}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eight} alt="eightImg" id="UncontrolledTooltipExample4" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample4">
                                            {JasonBorne}
                                        </UncontrolledTooltip>
                                    </li>
                                    <li className="d-inline-block">
                                        <Media className="img-40 rounded-circle" src={eleven} alt="elevenImg" id="UncontrolledTooltipExample5" />
                                        <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample5">
                                            {ComerenDiaz}
                                        </UncontrolledTooltip>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
            <Col xl="12">
                <Card className={"add-shadow-md-custom"}><Media className="img-fluid" alt="" src={`${process.env.REACT_APP_ASSET_LINK}/${lastProfileItem.link}`} /></Card>
            </Col>
            <Col xl="12">
                <Card className={"add-shadow-md-custom"}>
                    <CardHeader>
                        <h5 className="mb-0">
                            <Button color="link pl-0" onClick={() => setisMutual(!isMutual)}
                                data-toggle="collapse" data-target="#collapseicon6" aria-expanded={isMutual} aria-controls="collapseicon6">Previously Applied Gigs/Jobs/Position's By This User</Button>
                        </h5>
                    </CardHeader>
                    <Collapse isOpen={isMutual}>
                        <CardBody className="social-status filter-cards-view">
                            <Form>
                                <FormGroup className="m-0">
                                    <Input className="form-control-social" type="search" placeholder="Search previous applications(search by 'listing title')..." />
                                </FormGroup>
                            </Form>
                            {/* social-status different types --- social-online, social-offline, social-busy */}
                            {typeof previouslyApplied !== "undefined" && previouslyApplied.length > 0 ? previouslyApplied.map((applied, index) => {
                                // return data...
                                return (
                                    <Fragment key={index}>
                                        <Media>
                                            <img className="img-50 rounded-circle m-r-15 custom-social-status-picture" src={applied.profilePicture} alt="TenImg" />
                                            <div className={`custom-social-status-editted social-status ${applied.status}`}></div>
                                            <Media onMouseOver={() => {
                                                setIndexState(index);
                                            }} className={presetIndex === index ? "selected-hover-custom" : ""} body>
                                                {index === presetIndex ? <Fragment>
                                                    <div className="min-filler-height">
                                                        <Button onClick={() => {
                                                            // redirect to appropriate previous listing/job/opportunity
                                                        }} style={{ width: "100%" }} outline className={"btn-pill-secondary"} color={"secondary-2x"}>View Previously Applied Job/Opportunity</Button>
                                                    </div>
                                                </Fragment> : <Fragment>
                                                    <div className="min-filler-height-noncentered">
                                                        <span style={{ color: "#a927f9" }} className="f-w-600 d-block custom-name-name">{applied.name}</span><span className="d-block custom-desc-desc">{applied.relatedListingTitle}</span>
                                                    </div>
                                                </Fragment>}
                                            </Media>
                                        </Media>
                                    </Fragment>
                                );
                            }) : <Fragment>
                                <SkeletonTheme baseColor="#c9c9c9" highlightColor="#444">
                                    <p>
                                        <Skeleton count={60} />
                                    </p>
                                </SkeletonTheme>
                            </Fragment>}
                        </CardBody>
                    </Collapse>
                </Card>
            </Col>
        </Fragment>
    );
};

export default LeftBar;