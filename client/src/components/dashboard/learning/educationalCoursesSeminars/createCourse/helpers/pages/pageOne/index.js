import React, { Fragment, useState, useEffect } from "react";
import Dropzone from 'react-dropzone-uploader';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DatePicker from "react-datepicker";
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ProjectTitle, ClientName, ProjectRate, ProjectStatus, ProgressLevel, ProjectSize, Small, Medium, Big, StartingDate, EndingDate, EnterSomeDetails, UploadProjectFile, Add, Cancel, Done, Doing, Maps } from '../../../../../../../../constant';



const CreateNewCoursePageOne = () => {
    const { register, handleSubmit, control, reset, setValue, setError, clearErrors, formState: { errors }} = useForm({
        mode: "onTouched",
        reValidateMode: "onBlur"
    });

    const getUploadParams = ({ meta }) => { 
        return { 
          url: 'https://httpbin.org/post' 
        }
    }
    

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log("handleChangeStatus ran...", meta, file, status);
    }

    const renderErrorsFormUploadContent = (e, errors) => {
        console.log("renderErrorsFormUploadContent ran...", e, errors);
    }
    const onSubmission = (e, data) => {
        console.log("onSubmission ran...", e, data);
    }
    return (
        <Fragment>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <Form className="theme-form" onSubmit={handleSubmit(onSubmission, (e, errors) => {
                                return renderErrorsFormUploadContent(e, errors);
                            })}>
                            <Row>
                                <Col>
                                <FormGroup>
                                    <Label>{ProjectTitle}</Label>
                                    <Input className="form-control" type="text"  name="title" placeholder="Project name *" />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <FormGroup>
                                    <Label>{ClientName}</Label>
                                    <Input className="form-control" type="text" name="client_name" placeholder="Name client or company name"/>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                <FormGroup>
                                    <Label>{ProjectRate}</Label>
                                    <Input className="form-control" type="number" name="rate" defaultValue="10" placeholder="Enter project Rate"/>
                                </FormGroup>
                                </Col>
                                <Col sm="4">
                                <FormGroup>
                                    <Label>{ProgressLevel}</Label>
                                    <Input type="select"  name="progress_level" className="form-control digits">
                                        <option value="25">{"25"}</option>
                                        <option value="50">{"50"}</option>
                                        <option value="70">{"70"}</option>
                                        <option value="100">{"100"}</option>
                                    </Input>
                                </FormGroup>
                                </Col>
                                <Col sm="4">
                                <FormGroup>
                                    <Label>{ProjectStatus}</Label>
                                    <Input type="select" name="status" placeholder="Select Status" className="form-control digits">
                                        <option value="Done">{Done}</option>
                                        <option value="Doing">{Doing}</option>
                                    </Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                <FormGroup>
                                    <Label>{ProjectSize}</Label>
                                    <select className="form-control digits">
                                    <option>{Small}</option>
                                    <option>{Medium}</option>
                                    <option>{Big}</option>
                                    </select>
                                </FormGroup>
                                </Col>
                                <Col sm="4">
                                <FormGroup>
                                    <Label>{StartingDate}</Label>
                                    <DatePicker className="datepicker-here form-control"  selected={null} onChange={null} />
                                </FormGroup>
                                </Col>
                                <Col sm="4">
                                <FormGroup>
                                    <Label>{EndingDate}</Label>
                                    <DatePicker className="datepicker-here form-control"  selected={null} endDate={null} onChange={null} />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <FormGroup>
                                    <Label>{EnterSomeDetails}</Label>
                                    <Input  type="textarea" className="form-control" name="description" rows="3"/>
                                    <span style={{ color: "red" }}>{errors.description && 'Some Details is required'}</span>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <FormGroup>
                                    <Label>{UploadProjectFile}</Label>
                                        <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            maxFiles={1}
                                            multiple={false}
                                            canCancel={false}
                                            inputContent="Drop A File"
                                            styles={{
                                                dropzone: { width: '100%', height: 50 },
                                                dropzoneActive: { borderColor: 'green' },
                                            }}
                                        />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <FormGroup className="mb-0">
                                    <Button color="success" className="mr-3">{Add}</Button>
                                    <Link to={`${process.env.PUBLIC_URL}/app/project/project-list`}>
                                    <Button color="danger">{Cancel}</Button>
                                    </Link>
                                </FormGroup>
                                </Col>
                            </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(withRouter(CreateNewCoursePageOne));