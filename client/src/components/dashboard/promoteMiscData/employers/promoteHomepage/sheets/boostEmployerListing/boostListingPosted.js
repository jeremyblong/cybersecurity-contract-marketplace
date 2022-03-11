import React, { useState, useEffect, Fragment } from 'react';
import "./styles.css";
import Sheet from 'react-modal-sheet';
import { Button, Container, Row, Col, Card, CardHeader, CardBody, Progress, Badge, Label, Input, InputGroup, FormGroup }  from "reactstrap";
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactPlayer from 'react-player';
import moment from "moment";
import { NotificationManager } from "react-notifications";
import Cards from 'react-credit-cards';
import Select from 'react-select';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const monthOptions = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
];
const yearOptions = [
    { label: "2022", value: "22" },
    { label: "2023", value: "23" },
    { label: "2024", value: "24" },
    { label: "2025", value: "25" },
    { label: "2026", value: "26" },
    { label: "2027", value: "27" },
    { label: "2028", value: "28" },
    { label: "2029", value: "29" },
    { label: "2030", value: "30" },
    { label: "2031", value: "31" },
    { label: "2032", value: "32" },
    { label: "2033", value: "33" },
    { label: "2034", value: "34" },
    { label: "2035", value: "35" }
];

const BoostAlreadyPostedEmployerListingPaneHelper = ({ userData, listingBoostSelected, employerListingPromotePane, setSheetOpenEmployerListingPromote }) => {

    const [ listings, setListingData ] = useState([]);
    const [ selected, setSelected ] = useState(null);
    const [ fullySelected, setFullySelected ] = useState(null);
    const [ cardPaymentSelected, setSelectedCardPayment ] = useState(null);
    const [ previousCards, setPreviousCardsData ] = useState([]);
    const [ selectedMonth, setSelectedMonth ] = useState(null);
    const [ selectedYear, setSelectedYear ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ cardData, setCardData ] = useState({
        focus: "",
        cvc: "",
        name: "",
        number: "",
        expiry: ""
    })

    useEffect(() => {
        const config = {
            params: {
                id: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/employer/payment/methods/cards/only`, config).then((res) => {
            if (res.data.message === "Gathered employer payment cards!") {

                console.log(res.data);

                const { cards } = res.data;

                const convertedPaymentsArr = [];

                for (let index = 0; index < cards.data.length; index++) {
                    const method = cards.data[index];

                    const { last4 } = method.card;
                    
                    convertedPaymentsArr.push({ label: `**** **** **** ${last4}`, value: method })
                }

                setPreviousCardsData(convertedPaymentsArr);

                setReady(true);

            } else {
                console.log("err", res.data);
                
                NotificationManager.warning("Failed to fetch your current payment method's on file, please reload this page or contact support if this problem persists...", "Failed to load previous method's!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            NotificationManager.warning("Failed to fetch your current payment method's on file, please reload this page or contact support if this problem persists...", "Failed to load previous method's!", 4750);
        })
    }, [])

    useEffect(() => {

        const configuration = {
            params: {
                id: userData.uniqueId
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/fetch/related/employer/listings/employer/account`, configuration).then((res) => {
            if (res.data.message === "Gathered related listings to choose from!") {
                console.log(res.data);

                const { listings } = res.data;

                setListingData(listings);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const calculateBoostCost = (tier) => {
        switch (tier) {
            case "tier-1":
                return "$10.00 (plus applicable taxes)";
                break;
            case "tier-2":
                return "$30.00 (plus applicable taxes)";
                break;
            case "tier-3":
                return "50.00 (plus applicable taxes)";
                break;
            default:
                break;
        }
    }
    const calculateTier = (tier) => {
        switch (tier) {
            case "tier-1":
                return "Tier One (1)";
                break;
            case "tier-2":
                return "Tier Two (2)";
                break;
            case "tier-3":
                return "Tier Three (3)";
                break;
            default:
                break;
        }
    }
    const calculateFirstImage = (listing) => {
        console.log("uploadedFiles", listing.uploadedFiles);

        const files = listing.uploadedFiles;

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (file.type.includes("image")) {
                return (
                    <Fragment>
                        <img src={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} className={"last-displayed rounded-circle mr-1"} />
                    </Fragment>
                );
                break;
            } else if (file.type.includes("video")) {
                return (
                    <Fragment>
                        <ReactPlayer playing={true} loop={true} muted={true} width={"100%"} className={"last-displayed rounded-circle mr-1"} wrapper={"div"} url={`${process.env.REACT_APP_ASSET_LINK}/${file.link}`} />
                    </Fragment>
                );
                break;
            }
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "number") {
            if (value.length !== 0) {
                let filtered = value.replace(/\D/, '');

                setCardData(prevState => {
                    return {
                        ...prevState,
                        number: filtered
                    }
                });
                setSelectedCardPayment(null);
            } else {

                setCardData(prevState => {
                    return {
                        ...prevState,
                        number: ""
                    }
                });
                setSelectedCardPayment(null);
            }
        } else if (name === "cvc") {
            if (value.length !== 0) {
                let filtered = value.replace(/\D/, '');

                setCardData(prevState => {
                    return {
                        ...prevState,
                        cvc: filtered
                    }
                });
                setSelectedCardPayment(null);
            } else {

                setCardData(prevState => {
                    return {
                        ...prevState,
                        cvc: ""
                    }
                });
                setSelectedCardPayment(null);
            }
        } else {

            setCardData(prevState => {
                return {
                    ...prevState,
                    [name]: value
                }
            });
            setSelectedCardPayment(null);
        }
    }
    const handleInputFocus = (e) => {
        setCardData(prevState => {
            return {
                ...prevState,
                focus: e.target.name
            }
        });
    }
    const handleSelectBlur = (type, full, monthOrYear) => {
        if (type === "selectedMonth") {

            setTimeout(() => {
                setCardData(prevState => {
                    return {
                        ...prevState,
                        expiry: `${monthOrYear}/${selectedYear !== null ? selectedYear.value : "--"}`
                    }
                });
            }, 500)
        } else if (type === "selectedYear") {

            setTimeout(() => {
                setCardData(prevState => {
                    return {
                        ...prevState,
                        expiry: `${selectedMonth !== null ? selectedMonth.value : "--"}/${monthOrYear}`
                    }
                });
            }, 500)
        }
    }
    const handleCardSelectionChange = (value) => {
        console.log("handleCardSelectionChange ran/running..:", value);

        setSelectedCardPayment(value);
        setCardData(prevState => {
            return {
                ...prevState,
                cvc: "",
                expiry: "",
                focus: "",
                name: "",
                number: ""
            }
        });
    }
    const clearPreviousState = () => {
        setSelected(null);
        setFullySelected(null);

        setSelectedCardPayment(null);
        setSelectedMonth(null);
        setSelectedYear(null);
        setCardData({
            focus: "",
            cvc: "",
            name: "",
            number: "",
            expiry: ""
        });
    }
    const handleSubmission = () => {
        console.log("handle handleSubmission submission!");
        
        const configuration = {
            employerId: userData.uniqueId,
            fullListing: fullySelected,
            listingID: fullySelected.uniqueId,
            listingTierSelected: listingBoostSelected,
            card: cardData,
            manuallyEntered: cardPaymentSelected !== null ? false : true,
            cardPaymentSelected
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/boost/employer/listing/period/time`, configuration).then((res) => {
            if (res.data.message === "Successfully boosted your selected listing!") {
                console.log(res.data);

                const { listing, cost } = res.data;

                setSheetOpenEmployerListingPromote(false);

                clearPreviousState();

                NotificationManager.success(`We've successfully boosted your listing with the company name of '${listing.publicCompanyName}' at the cost of '$${cost / 100}'! Succesfully initialized your promoted listing & it is NOW LIVE!`, "Successfully charged desired card and listing is NOW PROMOTED!", 5000);

            } else if (res.data.message === "Already boosted this listing!") {

                setSheetOpenEmployerListingPromote(false);

                NotificationManager.warning("You've ALREADY boosted this listing, you CANNOT double boost a listing as it would be a waste of your money. Please wait for this boosted listing to expire (check back periodically if you'd like) before boosting again or select another listing!", "Listing is already boosted!", 4750);
            } else {
                console.log("Err", res.data);

                setSheetOpenEmployerListingPromote(false);

                clearPreviousState();

                NotificationManager.error("An error has occurred while attempting to process your payment & initialize your 'employer listing' boosted listing! If this error persists, please contact support or try this action again.", "Unknown error has occurred..!", 4750);
            }
        }).catch((err) => {
            console.log(err);

            setSheetOpenEmployerListingPromote(false);

            clearPreviousState();

            NotificationManager.error("An error has occurred while attempting to process your payment & initialize your 'employer listing' boosted listing! If this error persists, please contact support or try this action again.", "Unknown error has occurred..!", 4750);
        })
    }
    const calculateDisabled = () => {

        const  { name, number, expiry, cvc } = cardData;

        if ((fullySelected !== null) && ((typeof number !== "undefined" && number.length >= 12 && typeof cvc !== "undefined" && cvc.length >= 3 && typeof name !== "undefined" && name.length >= 8 && typeof expiry !== "undefined" && expiry.length === 5) || (cardPaymentSelected !== null))) {
            return false;
        } else {
            return true;
        }
    }
    console.log("cardData", cardData, selectedMonth, selectedYear);
    return (
        <div>
            <Sheet disableDrag={true} isOpen={employerListingPromotePane} onClose={() => setSheetOpenEmployerListingPromote(false)}>
                <Sheet.Container>
                <Sheet.Header>
                    <div className='margin-medium-button-pane'>
                        <Button className={"btn-square-danger"} color={"danger-2x"} outline style={{ width: "100%" }} onClick={() => setSheetOpenEmployerListingPromote(false)}>Close/Exit Pane</Button>
                    </div>
                </Sheet.Header>
                <Sheet.Content>
                    <Container fluid={true}>
                        <Row style={{ marginTop: "25px" }}>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card className='bordered-shadowed-card-deposit'>
                                    <CardHeader className={"b-l-info b-r-info"}>
                                        <h2 className='header-deposit-card-funds'>You've selected {listingBoostSelected} which means you have selected the <strong style={{ color: "#7366ff", textDecorationLine: "underline" }}>{calculateTier(listingBoostSelected)}</strong> boost 'tier' which cooresponding between 1 and 3 (3 being the most intensive 'boost') for <strong style={{ color: "#51bb25", textDecorationLine: "underline" }}>{calculateBoostCost(listingBoostSelected)}</strong></h2>
                                        <p className='lead'>Please select the <strong style={{ color: "#7366ff" }}>previously posted employer listing</strong> you'd like to promote and select your payment method (if applicable - you may need to add a payment method). We will display your previously posted <strong style={{ color: "#7366ff" }}>ACTIVE</strong> contracts to allow you to choose from..</p>
                                    </CardHeader>
                                    <CardBody>
                                        <Row className='row-infinite-pane'>
                                            <div className='scroller-custom-horizontally-pane'>
                                                {typeof listings !== "undefined" && listings.length > 0 ? listings.map((listing, index) => {
                                                    const views = listing.totalViews;
                                                    const progress = Math.round(views / 1000);
                                                    return (
                                                        <Col key={index} sm="12" md="4" lg="4" xl="4">
                                                            <div onClick={() => {
                                                                setSelected(listing.uniqueId);
                                                                setFullySelected(listing);
                                                            }} className={selected === listing.uniqueId ? "project-box project-boxed-shadowized-selected" : "project-box project-boxed-shadowized"}>
                                                                <span className={`badge badge-primary`}>Min Lvl. To Apply: {listing.requiredRankToApply.label}</span>
                                                                <h6>{listing.publicCompanyName}</h6>
                                                                <div className="media">
                                                                    {/* {<img className="img-20 mr-1 rounded-circle" src={calculateFirstImage(listing)} alt="" />} */}
                                                                    {calculateFirstImage(listing)}
                                                                    <p className='posted-by-date'>Posted {moment(listing.systemDate).fromNow()}</p>
                                                                </div>
                                                                <div className='align-proper-loc'>
                                                                    <Label className={"hash-label"}>Related Hashtag's</Label><br />
                                                                    {typeof listing.hashtags !== "undefined" && listing.hashtags.length > 0 ? listing.hashtags.map((tag, idx) => {
                                                                        return (
                                                                            <Badge key={idx} color={"primary"} className={"slim-border-badge"} style={{ color: "#fff" }}>{tag.text}</Badge>
                                                                        );
                                                                    }) : null}
                                                                </div>
                                                                <ReactMarkdown className='listing-desc-selectable' children={listing.listingDescription} remarkPlugins={[remarkGfm]} />
                                                                <Row className="details">
                                                                    <Col xs="6"><span>Total Applicants: </span></Col>
                                                                    <Col xs="6" className={'text-primary'}>{listing.applicantIDArray.length}</Col>
                                                                    <Col xs="6"> <span>Likes: </span></Col>
                                                                    <Col xs="6" className={'text-primary'}>{listing.likes}</Col>
                                                                    <Col xs="6"> <span>Dislikes: </span></Col>
                                                                    <Col xs="6" className={'text-primary'}>{listing.dislikes}</Col>
                                                                </Row>
                                                                <div className="customers">
                                                                    <ul>
                                                                        <li className="d-inline-block"><img className="img-30 rounded-circle min-rounded" src={require("../../../../../../../assets/images/placeholder.png")} alt="" /></li>
                                                                        <li className="d-inline-block"><img className="img-30 rounded-circle min-rounded" src={require("../../../../../../../assets/images/placeholder.png")} alt="" /></li>
                                                                        <li className="d-inline-block"><img className="img-30 rounded-circle min-rounded" src={require("../../../../../../../assets/images/placeholder.png")} alt="" /></li>
                                                                        <li className="d-inline-block ml-2">
                                                                        <p className="f-12">{`+${listing.viewedBy.length - 3 > 0 ? listing.viewedBy.length : 0} More`}</p>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="project-status mt-4">
                                                                    <div className="media mb-0">
                                                                        <p>{progress}% </p>
                                                                        <div className="media-body text-right"><span>Time Till Est. Completion Date</span></div>
                                                                    </div>
                                                                    {progress === "100" ?
                                                                        <Progress className="sm-progress-bar" color="success" value={progress} style={{ height: "5px" }} />
                                                                        :
                                                                        <Progress className="sm-progress-bar" striped color="primary" value={progress} style={{ height: "5px" }} />
                                                                    }
                                                                    
                                                                </div>
                                                                <div className="project-status mt-4">
                                                                    <Button className='btn-square-info' color='info-2x' outline style={{ width: "100%" }}>Promote This Listing!</Button>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    );
                                                }) : null}
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader className='b-l-primary b-r-primary bordered-shadowed-card-deposit'>
                                        <h2 style={{ textDecorationLine: "underline" }} className='header-deposit-card-funds'>Please select the payment method you'd like to use for this transaction..</h2>
                                        <hr />
                                        <p className='lead'>Select an existing payment method to purchase this 'boost/promotion' OR add a card to then make the desired purchase - either is acceptable, up to you! Your boost will be effective IMMEDIATELY so please time your purchase accordingly (morning's and afternoon's are good boost times)</p>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                {ready === true ? <Card>
                                                    <CardBody className='b-l-primary b-r-primary project-boxed-shadowized-min-second'>
                                                        <Col sm="12" md="12" lg="12" xl="12">
                                                            <Row>
                                                                <h4 className='h4-two-col-header'>Enter your <strong>card details</strong> in the below inputs/form to add a new payment method and charge it accordingly (per this boost purchase).</h4>
                                                                <hr />
                                                                <p className='lead'>Add your payment details in the live form collection unit below. This will not only use <strong>THIS CARD AS A PAYMENT METHOD</strong> but will also save this card information to your account for a later date and/or future purchases down the road..</p>
                                                                <hr />
                                                            </Row>
                                                            <Row>
                                                                <Col sm="12" md="12" lg="12" xl="12">
                                                                    <FormGroup>
                                                                        <Label>Card Number</Label>
                                                                        <InputGroup>
                                                                            <Input onFocus={handleInputFocus} onChange={handleInputChange} value={cardData.number} name="number" className="form-control" maxLength={19} size={19} type="number" placeholder="Debit/Credit Card Number" aria-label="Debit/Credit Card Number"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm="6" md="4" lg="4" xl="4">
                                                                    <FormGroup>
                                                                        <Label>Full Name</Label>
                                                                        <InputGroup>
                                                                            <Input onFocus={handleInputFocus} onChange={handleInputChange} value={cardData.name} name="name" maxLength="35" size="35" className="form-control" type="text" placeholder="Full Name" aria-label="Full Name"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col sm="6" md="4" lg="4" xl="4">
                                                                    <FormGroup>
                                                                        <Label>Expiration</Label>
                                                                        <InputGroup>
                                                                            <Select
                                                                                value={selectedMonth}
                                                                                onChange={(value) => {
                                                                                    setSelectedMonth(value);
                                                                                    setSelectedCardPayment(null);
                                                                                }}
                                                                                onBlur={() => {
                                                                                    handleSelectBlur("selectedMonth", selectedMonth, selectedMonth.value);
                                                                                }}
                                                                                className="stretch"
                                                                                placeholder={"MONTH"}
                                                                                options={monthOptions}
                                                                            />
                                                                            <Select
                                                                                value={selectedYear}
                                                                                onChange={(value) => {
                                                                                    setSelectedYear(value);
                                                                                    setSelectedCardPayment(null);
                                                                                }}
                                                                                onBlur={() => {
                                                                                    handleSelectBlur("selectedYear", selectedYear, selectedYear.value);
                                                                                }}
                                                                                className="stretch-two"
                                                                                placeholder={"YEAR"}
                                                                                options={yearOptions}
                                                                            />
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col sm="6" md="4" lg="4" xl="4">
                                                                    <FormGroup>
                                                                        <Label>CVC</Label>
                                                                        <InputGroup>
                                                                            <Input onFocus={handleInputFocus} onChange={handleInputChange} value={cardData.cvc} name="cvc" className="form-control" maxLength="4" size="4" type="number" placeholder="CVC" aria-label="CVC"/>
                                                                        </InputGroup>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm="12" md="12" lg="12" xl="12">
                                                                    <Cards
                                                                        cvc={cardData.cvc}
                                                                        expiry={cardData.expiry}
                                                                        focused={cardData.focus}
                                                                        name={cardData.name}
                                                                        number={cardData.number}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </CardBody>
                                                </Card> : <Fragment>
                                                    <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                                                        <p>
                                                            <Skeleton containerClassName={"stretch-bars"} count={25} />
                                                        </p>
                                                    </SkeletonTheme>
                                                </Fragment>}
                                            </Col>
                                            <Col sm="12" md="6" lg="6" xl="6">
                                                {ready === true ? <Card>
                                                    <CardBody className='b-l-primary b-r-primary project-boxed-shadowized-min-second'>
                                                        <Row>
                                                            <h4 className='h4-two-col-header'>Select a previously added card/payment-method that has been added at a previous moment in time prior to this current form.</h4>
                                                            <hr />
                                                            <p className='lead'>Simply select your card and make sure the rest of the form data (including the above data) is completely filled out and/or selected BEFORE proceeding with your payment and boost/promotion activation!</p>
                                                            <hr />
                                                        </Row>
                                                        <Row style={{ paddingBottom: "10px" }}>
                                                            <Label>Select An Existing Registered Card (Previously registered on a different date/time)</Label>
                                                            <Select
                                                                value={cardPaymentSelected}
                                                                onChange={handleCardSelectionChange}
                                                                options={previousCards}
                                                            />
                                                        </Row>
                                                    </CardBody>
                                                </Card> : <Fragment>
                                                    <SkeletonTheme baseColor="#d4d4d4" highlightColor="#8f8f8f">
                                                        <p>
                                                            <Skeleton containerClassName={"stretch-bars"} count={25} />
                                                        </p>
                                                    </SkeletonTheme>
                                                </Fragment>}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: "37.5px" }}>
                                            <Button disabled={calculateDisabled()} outline={calculateDisabled() ? true : false} className='btn-square-success' onClick={handleSubmission} style={{ width: "100%" }} color={"success"}>Submit & Purchase Boost/Promotion!</Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}

export default BoostAlreadyPostedEmployerListingPaneHelper;