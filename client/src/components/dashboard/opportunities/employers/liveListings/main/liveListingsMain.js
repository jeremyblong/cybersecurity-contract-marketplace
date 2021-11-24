import React, {Fragment,useState,useEffect} from 'react';
import Breadcrumb from '../../../../../../layout/breadcrumb'
import { Container,Row,Col,Card,CardBody,Media } from 'reactstrap'
import JobFilter from './helpers/filter/filterJobs.js';
import { Link }  from 'react-router-dom'
import axios from 'axios'

const LiveEmployerListingsHelper = (props) => {

    const [JobData,setJobData] = useState([{
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "primary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }, {
        badgeType: "secondary",
        job_name: "Praesent tempor porta ante et semper. In vulputate tellus a ipsum pharetra, ac rutrum diam pellentesqu",
        job_description: "Donec porta euismod molestie. Nunc eu imperdiet odio, eget tristique arcu. Mauris velit augue, commodo luctus est et, dignissim gravida est. Donec aliquam mattis auctor. In dolor dui, ullamcorper non bibendum nec, tincidunt a est. Duis interdum molestie pulvinar. Quisque consectetur nibh id orci auctor, in vestibulum ante pretium. Nullam sed bibendum ex.",
        job_area: "North Carolina",
        job_city: "Charlotte",
        badgeValue: "Newly Posted"
    }])

    return (
        <Fragment>
            <Breadcrumb parent="Active Hacking Opportunities" title="Hacking Jobs"/>
            <Container fluid={true}>
                <Row>
                    <JobFilter />
                    <Col xl="9 xl-60">
                        <Row>
                            {JobData.map((data, i) => {
                                return (
                                    <Col xl="6 xl-100" key={i}>
                                        <Card className={`${data.badgeValue ? '' : 'ribbon-vertical-left-wrapper'}`}>
                                            <div className="job-search">
                                                <CardBody>
                                                    <Media>
                                                        <img className="img-40 img-fluid m-r-20" src={require(`../../../../../../assets/images/user/6.jpg`)} alt="" />
                                                        <Media body>
                                                            <h6 className="f-w-600">
                                                                <Link to={`${process.env.PUBLIC_URL}/app/jobSearch/job-detail`}> 
                                                                    {data.job_name}
                                                                </Link>
                                                                {(data.badgeType === 'primary' ?
                                                                    <span className="badge badge-primary pull-right">
                                                                        {data.badgeValue}
                                                                    </span>
                                                                    : <div className="ribbon ribbon-bookmark ribbon-vertical-left ribbon-secondary">
                                                                        <i className="icofont icofont-love"></i>
                                                                    </div>
                                                                )}
                                                            </h6>
                                                            <p>{data.job_area}, {data.job_city}
                                                                <span>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                    <i className="fa fa-star font-warning"></i>
                                                                </span>
                                                            </p>
                                                        </Media>
                                                    </Media>
                                                    <p>{data.job_description}</p>
                                                </CardBody>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default LiveEmployerListingsHelper;
