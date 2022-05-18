import React, { Fragment, useEffect, useState, useRef } from 'react';
import "./styles.css";
import { Container, Row, Col, Card, CardHeader, Button, CardBody, Media, InputGroupText, InputGroup, ListGroup, ListGroupItem, InputGroupAddon, Label, Form, FormGroup, Input } from "reactstrap";
import Breadcrumb from "../../../../layout/breadcrumb";
import axios from "axios";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import SelectSearch from 'react-select-search';


const CreateInviteEmailBetaListHelper = ({ userData }) => {

    const searchInput = useRef();

    const [ code, setCode ] = useState("");
    const [ matched, setMatched ] = useState(false);
    const [ addNewBetaUser, setNewBetaUserState ] = useState(false);
    const [ additionalAccessCode, setAdditionalAccessCode ] = useState("");
    const [ invitiationEmail, setInvitiationEmail ] = useState("");
    const [ searchValueUsers, setSearchValueUsers ] = useState("");
    const [ fullName, setFullName ] = useState("");
    const [ selectedAccountType, setSelectedAccountType ] = useState("hackers");
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [ users, setRelevantUsers ] = useState([]);


    console.log("users", users);

    const submitCodeAndCheck = () => {
        console.log("submitCodeAndCheck clicked..");

        if (code === process.env.REACT_APP_ADD_NEW_EMPLOYEE_USER_CODE) {
            setMatched(true);

            NotificationManager.success("Successfully entered the 'proper' code & access was granted!", "Successfully entered the correct code, access granted!", 4750);
        } else {
            NotificationManager.error("Code does NOT match! Please enter a valid code, or stop trying to access something you do not have access to..", "Code did NOT match!", 4750);
        }
    }

    useEffect(() => {
        const config = {
            params: {
                
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/beta/testers/default`, config).then((res) => {
            if (res.data.message === "Successfully gathered default testers!") {
                console.log(res.data);

                const { testers } = res.data;

                const options = [];

                for (let index = 0; index < testers.length; index++) {
                    const tester = testers[index];

                    options.push({
                        name: tester.fullName,
                        value: tester
                    });
                }

                setRelevantUsers(options);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to fetch the desired user's initially, please contact support if this problem persists...", "Error occurred while attempting to fetch users!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to fetch the desired user's initially, please contact support if this problem persists...", "Error occurred while attempting to fetch users!", 4750);
        })
    }, []);

    const submitAddNewEmployeeCode = () => {
        console.log("submitAddNewEmployeeCode clicked/ran..");

        if (process.env.REACT_APP_ADD_NEW_EMPLOYEE_USER_CODE === additionalAccessCode) {
            setNewBetaUserState(true);

            NotificationManager.success("Code SUCCESSFULLY MATCHED the code registered to our marketplace/platform, you may now add a new employee/user!", "Code matched, granted access!", 4750);

        } else {
            NotificationManager.error("Code does NOT match! Please enter a valid code, or stop trying to access something you do not have access to..", "Code did NOT match!", 4750);
        }
    }

    console.log("selectedOption & searchValueUsers", selectedOption, searchValueUsers);

    const sendInviteToBetaUserNew = () => {
        console.log("sendInviteToBetaUserNew clicked/ran");

        const config = {
            selectedUserFullname: selectedOption.fullName,
            selectedUserEmail: selectedOption.email,
            selectedOption,
            selectedAccountType,
            inviterFullName: `${userData.firstName} ${userData.lastName}`,
            inviterAccountType: userData.accountType,
            inviterUsername: userData.username,
            inviterUniqueId: userData.uniqueId
        };

        axios.post(`${process.env.REACT_APP_BASE_URL}/send/invite/beta/user/testing`, config).then((res) => {
            if (res.data.message === "Invited beta user successfully!") {
                console.log("res.data", res.data);

                NotificationManager.success("Successfully sent email invitation to the related email including various details specifically for this user! Email sent successfully, beta user invited!", "BETA USER INVITED!", 4750);

                setSelectedAccountType("hackers");
                setSelectedOption(null);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An error occurred while attempting to 'invite' this specific user to the 'beta' testing timeline, please try this action again or contact support if the problem persists!", 4750);
            }
        }).catch((err) => {

            console.log("Err", err);

            NotificationManager.error("An error occurred while attempting to 'invite' this specific user to the 'beta' testing timeline, please try this action again or contact support if the problem persists!", 4750);
        })
    }
    
    const renderContent = () => {
        if (matched === false) {
            return (
                <Fragment>
                    <Form>
                        <FormGroup className="m-form__group">
                            <Label>Enter the required code to gain access to the invitation logic</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend"><InputGroupText className={"transparent-addon"}>{"INVITE CODE"}</InputGroupText></InputGroupAddon>
                                <Input onChange={(e) => setCode(e.target.value)} value={code} className="form-control" type="password" placeholder={"Verification Code.."}/>
                            </InputGroup>
                        </FormGroup>
                        <hr />
                        <Button disabled={typeof code !== "undefined" && code.length >= 10 ? false : true} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }} onClick={() => submitCodeAndCheck()}>Submit Code & Request Access!</Button>
                    </Form>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Card className='shadow'>
                        <CardHeader className='b-l-primary b-r-primary'>
                            <h4>Select the desired user from the list below or search for a specific user using the search input/functionality</h4>
                        </CardHeader>
                        <CardBody>
                            <Label>Search for a specific user or select from the list</Label>
                                <Row>
                                    <Col sm="12" md="7" lg="7" xl="7">
                                        <ListGroup>
                                            <SelectSearch 
                                                ref={searchInput}
                                                options={users}
                                                closeOnSelect={true}
                                                filterOptions={handleFilter}
                                                value={searchValueUsers}
                                                name="username"
                                                search={true}
                                                onChange={handleChange} 
                                                renderOption={(value, second) => {
                                                    console.log("VAlue! second", value, second);

                                                    return (
                                                        <Fragment>
                                                            <ListGroupItem onClick={() => {
                                                                NotificationManager.success("Successfully added/selected value! You may now click-off of the results..", "Successfully selected your desired value!", 3000);

                                                                setSelectedOption(second);
                                                            }}>{second.value.fullName} ~ {second.value.email}</ListGroupItem>
                                                        </Fragment>
                                                    );
                                                }} 
                                                renderValue={(valueProps) => <input {...valueProps} value={searchValueUsers} className='form-control' style={{ width: "100%" }} onChange={(e) => setSearchValueUsers(e.target.value)} />}
                                                placeholder="Search for a specific user(s).." 
                                            />
                                        </ListGroup>
                                        {selectedOption !== null ? <Fragment>
                                            <hr />
                                            <ListGroupItem onClick={() => setSelectedOption(null)}>{selectedOption.name} - {selectedOption.value.email}<div className='float-right-totally'><i class="fa fa-solid fa-trash fa-2x"></i></div></ListGroupItem>
                                        </Fragment> : null}
                                    </Col>
                                    <Col sm="12" md="5" lg="5" xl="5">
                                        <Row style={{ marginBottom: "30px" }}>
                                            <h6>Select which account type this person will likely end up signing up as..</h6>
                                        </Row>
                                        <Row>
                                            <Col sm="6">
                                                <Card className='shadow'>
                                                    <Media style={{ margin: "7.5px" }} className="p-20">
                                                        <div className="radio radio-primary mr-3">
                                                            <Input onClick={() => setSelectedAccountType("hackers")} defaultChecked={true} checked={selectedAccountType === "hackers" ? true : false} id="radio14" type="radio" name="radio1" />
                                                            <Label for="radio14"></Label>
                                                        </div>
                                                        <Media body>
                                                            <h6 className="mt-0 mega-title-badge">HACKER ACCT.<span className="badge badge-primary pull-right digits">{"HACKER ACCOUNT"}</span></h6>
                                                            <p>{"Select 'Hacker' Account Type"}</p>
                                                        </Media>
                                                    </Media>
                                                </Card>
                                            </Col>
                                            <Col sm="6">
                                                <Card className='shadow'>
                                                    <Media style={{ margin: "7.5px" }} className="p-20">
                                                        <div className="radio radio-secondary mr-3">
                                                            <Input onClick={() => setSelectedAccountType("employers")} checked={selectedAccountType === "employers" ? true : false} id="radio13222" type="radio" name="radio2"  />
                                                            <Label for="radio13222"></Label>
                                                        </div>
                                                        <Media body>
                                                            <h6 className="mt-0 mega-title-badge">EMPLOYER ACCT.<span className="badge badge-secondary pull-right digits">{"EMPLOYER ACCOUNT"}</span></h6>
                                                            <p>{"Select 'Employer' Account Type"}</p>
                                                        </Media>
                                                    </Media>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" lg="12" md="12" xl="12">
                                        <Button disabled={selectedOption !== null ? false : true} className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }} onClick={() => sendInviteToBetaUserNew()}>Send Email To This Potential New Beta User!</Button>
                                    </Col>
                                </Row>
                        </CardBody>
                    </Card>
                </Fragment>
            );
        }
    }
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      
    const calculateDisabledAdd = () => {
        if (validateEmail(invitiationEmail) && typeof fullName !== "undefined" && fullName.length >= 5) {
            return false;
        } else {
            return true;
        }
    }
    const addNewUserAndCreateBetaUser = () => {
        console.log("addNewUserAndCreateBetaUser clicked/ran..");

        const config = {
            signedinUserID: userData.uniqueId,
            accountType: userData.accountType,
            fullName,
            userEmail: invitiationEmail,
            signedinFullName: `${userData.firstName} ${userData.lastName}`
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/register/user/beta/testing/new`, config).then((res) => {
            if (res.data.message === "Successfully registered new 'beta' user!") {
                console.log(res.data);

                NotificationManager.success("Successfully created NEW BETA USER - you may NOW create an invite link via the form above & send an invite for this user to join the beta..", "Successfully created user, you may now send a 'beta invite'!", 4750);

                setNewBetaUserState(false);
                setAdditionalAccessCode("");
                setFullName(""); 
                setInvitiationEmail("");

            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to add the 'new user' - you may NOT send this user an invite yet as the information you've entered may not be correct or an unknown error occurred, try different data or contact support if this problem persists...", "Could NOT add new user to beta-list...", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to add the 'new user' - you may NOT send this user an invite yet as the information you've entered may not be correct or an unknown error occurred, try different data or contact support if this problem persists...", "Could NOT add new user to beta-list...", 4750);
        })
    }
    const renderAddNewBetaUser = () => {
        if (addNewBetaUser === false) {
            return (
                <Fragment>
                    <Card style={{ marginTop: "50px" }} className='shadow'>
                        <CardHeader className='b-l-primary b-r-primary'>
                            <h3>Create new employee's and/or create a new BETA listing..</h3>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup className="m-form__group">
                                    <Label>Enter the required code to gain access to 'add a new user' to the beta list</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend"><InputGroupText className={"transparent-addon"}>{"CODE"}</InputGroupText></InputGroupAddon>
                                        <Input onChange={(e) => setAdditionalAccessCode(e.target.value)} value={additionalAccessCode} className="form-control" type="password" placeholder={"Verification Code.."}/>
                                    </InputGroup>
                                </FormGroup>
                                <hr />
                                <Button disabled={typeof additionalAccessCode !== "undefined" && additionalAccessCode.length >= 10 ? false : true} className={"btn-square-primary"} outline color={"primary-2x"} style={{ width: "100%" }} onClick={() => submitAddNewEmployeeCode()}>Request Access & Add New Employee/User</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Card style={{ marginTop: "50px" }} className='shadow'>
                        <CardHeader className='b-l-primary b-r-primary'>
                            <h3>You NOW have access to ADD NEW employee's and/or user's that have the <em>ability</em> to add or invite new user's to our BETA testing program!</h3>
                            <hr />
                            <p>This will essentially 'register' a user so that they can then recieve an invite using the <strong>top portion/chunk of this page</strong> to *actually* send the digital invite. This portion is just to <em>register</em> the user, then use the top part/portion to actually send the request.. (<strong style={{ color: "red" }}>request will EXPIRE after 48 hours</strong>)</p>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup className="m-form__group">
                                    <Label>Enter the EMAIL of the desired user..</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend"><InputGroupText className={"transparent-addon"}>{"User's EMAIL"}</InputGroupText></InputGroupAddon>
                                        <Input onChange={(e) => setInvitiationEmail(e.target.value)} value={invitiationEmail} className="form-control" type="email" placeholder={"Email of user to be added.."}/>
                                    </InputGroup>
                                </FormGroup>
                                <hr />
                                <FormGroup className="m-form__group">
                                    <Label>Full Name (Be as accurate/detailed as possible as this will display in the invite)</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend"><InputGroupText className={"transparent-addon"}>{"User's Full Name"}</InputGroupText></InputGroupAddon>
                                        <Input onChange={(e) => setFullName(e.target.value)} value={fullName} className="form-control" type="text" placeholder={"Enter the 'full name' of the user you'd like to add.."}/>
                                    </InputGroup>
                                </FormGroup>
                                <hr />
                                <Button disabled={calculateDisabledAdd()} className={"btn-square-success"} onClick={() => addNewUserAndCreateBetaUser()} outline color={"success-2x"} style={{ width: "100%" }}>Submit & Add New User!</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Fragment>
            );
        }
    }
    const handleChange = (...args) => {
        console.log("ARGS:", args);

        const config = {
            params: {
                signedinUserID: userData.uniqueId,
                accountType: userData.accountType,
                selectedAccountType
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/users/beta/invite`, config).then((res) => {
            if (res.data.message === "Successfully gathered random beta invite users!") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);

                NotificationManager.error("An unknown error occurred while attempting to fetch the desired user's to invite to the beta, please contact support if this problem persists...", "Error occurred while attempting to fetch users!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.error("An unknown error occurred while attempting to fetch the desired user's to invite to the beta, please contact support if this problem persists...", "Error occurred while attempting to fetch users!", 4750);
        })
    };


    const handleFilter = (items) => {
        return (searchValue) => {
            if (searchValue.length === 0) {
                return users;
            } else {
                return items.filter((item) => {
                    // if (item.includes(searchValueUsers)) {
                    //     return item;
                    // }
                    return item;
                });
            }
        };
    };
    
    return (
        <Fragment>
            <Breadcrumb parent={"Access The 'BETA Invitation' Form"} title={"Enter The Required Code Before Accessing The 'New Invitation Form' Logic.."} />
            <Container fluid={true}>
                <Row>
                    <Col sm="12" md="12" lg="12" xl="12">
                        <Card className='shadow'>
                            <CardHeader className='b-l-info b-r-info'>
                                <h3>Enter the required "entry code" to access the required/desired section-data to start inviting new user's to the <strong>BETA-mode</strong></h3>
                            </CardHeader>
                            <CardBody>
                                <h4 style={{ color: "red" }}>This part of our marketplace is for our <strong>admin user's</strong> ONLY. Please enter your employee code to gain access to invite other user's to the BETA launch..</h4>
                                <hr />
                                {renderContent()}
                                <hr style={{ marginTop: "25px" }} />
                                {renderAddNewBetaUser()}
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
export default connect(mapStateToProps, {  })(CreateInviteEmailBetaListHelper);