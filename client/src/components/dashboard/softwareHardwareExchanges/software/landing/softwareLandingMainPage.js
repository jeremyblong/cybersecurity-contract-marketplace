import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ListGroup, Form, FormGroup, Input, Media, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Grid, List } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import errorImg from '../../../../../assets/images/search-not-found.png';
import Allfilters from './helpers/allfilters.jsx';
import Carousal from './helpers/carousal.jsx';
import uuid from "react-uuid";
import { Filters,ShowingProducts,Featured,LowestPrices,HighestPrices,NotFoundData } from "../../../../../constant";
import "./styles.css";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import helpers from "./helpers/generalHelperFunctions.js";
import moment from "moment";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NotificationManager } from 'react-notifications';

const SoftwareLandingMainHelper = (props) => {

    const history = useHistory();
    // helper functions
    const { 
        dummyNoteDescription, 
        preparePriceString, 
        renderTags,
        calculateAuctionType,
        calculateStatus,
        RenderConditionalRealDataOrNot
    } = helpers;

    //   const dispatch = useDispatch()
    const data = []; // useSelector(content => content.data.productItems)
    // eslint-disable-next-line 
    const [layoutColumns, setLayoutColumns] = useState(3);
    // universal symbol for currency variable
    const symbol = "$";
    const [open, setOpen] = useState(false);
    const [sidebaron, setSidebaron] = useState(true);
    const [singleProduct, setSingleProduct] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    // eslint-disable-next-line
    const [stock, setStock] = useState('');
    const [filterSidebar, setFilterSidebar] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const filters = []; // useSelector(content => content.filters)
    const [products, setProducts ] = useState([]); // getVisibleproducts(data, filters)

    useEffect(() => {
        // already displayed/pooled listings
        const alreadyPooled = [];
        // configuration for api request
        const configuration = {
            params: {
                alreadyPooled
            }
        };
        // api request
        axios.get(`${process.env.REACT_APP_BASE_URL}/gather/software/listings`, configuration).then((res) => {
            if (res.data.message === "Successfully gathered listing items!") {
                console.log(res.data);

                const { listings } = res.data;

                const newlyConstructedArr = [...listings];

                new Promise((resolve, reject) => {
                    const subtractionArrLength = 20 - listings.length;
                    console.log("subtractionArrLength", subtractionArrLength);
                    new Array(subtractionArrLength).fill("").map((item, index) => {
                        console.log("index", index);
                        const generated = Math.floor(Math.random() * 1000) + 1;
                        const statusGeneration = Math.floor(Math.random() * 5) + 1;
                        newlyConstructedArr.push({
                            status: calculateStatus(statusGeneration),
                            id: uuid(),
                            name: "This is a dummy listing preview - this is only for UI design purposes - NOT active.",
                            note: "Simply dummy text of the printing",
                            price: (generated).toString(),
                            discountPrice: ((generated - 150 > 0) ? (generated - 150) : 50).toString(),
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                            category: "Digital Software Code Snippet",
                            default: true
                        });
                        // once it reaches 20 (twenty/number) array length filled extras
                        if (index === subtractionArrLength - 1) {
                            resolve(newlyConstructedArr);
                        }
                    });
                }).then((passedArray) => {
                    setProducts(passedArray);
                });
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log("errrrrrrr", err);
        })
    }, []);

//   const filterSortFunc = (event) => {
//     dispatch({ type: SORT_BY, sort_by: event })
//   }

    const gridLayout = () => {
        document.querySelector(".product-wrapper-grid").classList.remove("list-view");
        var elems = document.querySelector(".gridRow").childNodes;
        [].forEach.call(elems, function (el) {
        el.className = '';
        el.classList.add('col-xl-3');
        el.classList.add('col-sm-6');
        el.classList.add('xl-4')
        });
    }

    const listLayout = () => {
        document.querySelector(".product-wrapper-grid").classList.add("list-view");
        var elems = document.querySelector(".gridRow").childNodes;
        [].forEach.call(elems, function (el) {
        el.className = '';
        el.classList.add('col-xl-12');
        });
    }

    const LayoutView = (layoutColumns) => {
        if (!document.querySelector(".product-wrapper-grid").classList.contains("list-view")) {
        var elems = document.querySelector(".gridRow").childNodes;
        [].forEach.call(elems, function (el) {
            el.className = '';
            el.classList.add('col-xl-' + layoutColumns);
        });
        }
    }

    const onClickFilter = () => {
        if (sidebaron) {
        setSidebaron(false)
        document.querySelector(".product-wrapper").classList.add('sidebaron');
        } else {
        setSidebaron(true)
        document.querySelector(".product-wrapper").classList.remove('sidebaron');
        }
    }


    const onOpenModal = (obj) => {
        const { id, live } = obj;
        
        if (live === true) {
            products.forEach((product, i) => {
                if (product.uniqueId === id) {
                    setSingleProduct(product);
    
                    setOpen(true);
                }
            })
        } else {
            products.forEach((product, i) => {
                if (product.id === id) {
                    setSingleProduct(product);
    
                    setOpen(true);
                }
            })
        }
    };

    const onCloseModal = () => {
        setOpen(false)
    };


    const minusQty = () => {
        // min amount available
        const minQuantity = singleProduct.auctionPriceRelatedData.quantityAvailableForSale.min;

        if (minQuantity === 1) {
            // CANNOT decrease value
            NotificationManager.warning(`Cannot CHANGE value, There is only ONE ITEM in this listing for sale (You're trying to add to an immutable count)...!`, 'ONLY ONE ITEM FOR SALE!', 4500);
        } else {
            // CAN decrease value!
            // check if current value is less than max
            if (quantity > minQuantity) {
                // add one to count because current value is less-than MAX value from listing info
                setQuantity(quantity - 1);
            } else {
                setQuantity("Can't decrease/lower quanity any further...");

                NotificationManager.warning('Cannot lower count any further - MINIMUM quantity reached!', 'MIN QUANTITY LIMIT REACHED!', 4500);
            }
        }
    }

    const changeQty = (e) => {
        // max value from listing
        const maxQuantity = singleProduct.auctionPriceRelatedData.quantityAvailableForSale.max;
        // min amount available
        const minQuantity = singleProduct.auctionPriceRelatedData.quantityAvailableForSale.min;
        // select current value
        const parsedValue = parseInt(e.target.value);
        // check if parsedValue meets BOTH conditions (max & min)
        if ((parsedValue >= minQuantity) && (parsedValue <= maxQuantity)) {
            setQuantity(parsedValue)
        } else {
            // error - over or under reached
            setQuantity("ERROR - Can't set quantity!");
        }
    }

    const plusQty = () => {
        const maxQuantity = singleProduct.auctionPriceRelatedData.quantityAvailableForSale.max;
        // check if current value is less than max
        if (maxQuantity === 1) {
            // CANNOT increase value
            NotificationManager.warning(`Cannot CHANGE value, There is only ONE ITEM in this listing for sale (You're trying to add to an immutable count)...!`, 'ONLY ONE ITEM FOR SALE!', 4500);
        } else {
            // CAN increase value!
            if (quantity < maxQuantity) {
                // add one to count because current value is less-than MAX value from listing info
                setQuantity(quantity + 1);
            } else {
                setQuantity("MAX LIMIT Reached!");
    
                NotificationManager.warning('You cannot add another item, MAX limit reached!', 'MAX QUANTITY LIMIT REACHED!', 4500);
            }
        }
    }

    //   const addcart = (product, qty) => {
    //     dispatch({ type: ADD_TO_CART, payload: { product, qty } })
    //     history.push(`${process.env.PUBLIC_URL}/app/ecommerce/cart`);
    //   }

    //   const addWishList = (product) => {
    //     dispatch({ type: ADD_TO_WISHLIST, payload: { product } });
    //     history.push(`${process.env.PUBLIC_URL}/app/ecommerce/wishlist`);
    //   }

    //   const handleSearchKeyword = (keyword) => {
    //     setSearchKeyword(keyword)
    //     dispatch({ type: SEARCH_BY, search: keyword })
    //   }

    const onClickDetailPage = (product) => {
        const id = product.id;
        history.push(`/software/exchange/individual/listing/view/${id}`)
    }
    const handleRedirectToIndividualSoftwarePage = (item, history, onCloseModal, modalExists) => {
        console.log("handleRedirectToIndividualSoftwarePage ran!");
    
        if (modalExists !== true) {
            history.push(`/software/listing/individual/page/${item.uniqueId}`, { item });
        } else {
            onCloseModal();
    
            history.push(`/software/listing/individual/page/${item.uniqueId}`, { item });
        }
    }
    return (
        <Fragment>
        <Breadcrumb parent="Shop for digital software (snippets, code, CLI commands, etc..)" title="Digital Software Marketplace" />
        <Container fluid={true} className="product-wrapper">
            <div className="product-grid">
            <div className="feature-products">
                <Row>
                <Col md="6" className="products-total">
                    <div className="square-product-setting d-inline-block">
                    <a className="icon-grid grid-layout-view" onClick={gridLayout}>
                        <Grid />
                    </a>
                    </div>
                    <div className="square-product-setting d-inline-block">
                    <a className="icon-grid m-0 list-layout-view" onClick={listLayout}>
                        <List />
                    </a>
                    </div>
                    <span className="d-none-productlist filter-toggle" onClick={() => setFilterSidebar(!filterSidebar)} >
                    <h6 className="mb-0">{Filters}
                        <span className="ml-2">
                        <i className="toggle-data fa fa-chevron-down"></i>
                        </span>
                    </h6>
                    </span>
                    <div className="grid-options d-inline-block" id="override-grid-options-distorted">
                        <ListGroup id="merge-horizontal-list" as="ul">
                            <li>
                            <a className="product-2-layout-view layout-view-item" onClick={() => LayoutView(6)}>
                                <span className="line-grid line-grid-1 bg-primary"></span>
                                <span className="line-grid line-grid-2 bg-primary"></span>
                            </a>
                            </li>
                            <li><a className="product-3-layout-view layout-view-item" onClick={() => LayoutView(4)}>
                                <span className="line-grid line-grid-3 bg-primary"></span>
                                <span className="line-grid line-grid-4 bg-primary"></span>
                                <span className="line-grid line-grid-5 bg-primary"></span>
                            </a>
                            </li>
                            <li>
                            <a className="product-4-layout-view layout-view-item" onClick={() => LayoutView(3)}>
                                <span className="line-grid line-grid-6 bg-primary"></span>
                                <span className="line-grid line-grid-7 bg-primary"></span>
                                <span className="line-grid line-grid-8 bg-primary"></span>
                                <span className="line-grid line-grid-9 bg-primary"></span>
                            </a>
                            </li>
                            <li>
                            <a className="product-6-layout-view layout-view-item" onClick={() => LayoutView(2)}>
                                <span className="line-grid line-grid-10 bg-primary"></span>
                                <span className="line-grid line-grid-11 bg-primary"></span>
                                <span className="line-grid line-grid-12 bg-primary"></span>
                                <span className="line-grid line-grid-13 bg-primary"></span>
                                <span className="line-grid line-grid-14 bg-primary"></span>
                                <span className="line-grid line-grid-15 bg-primary"></span>
                            </a>
                            </li>
                        </ListGroup>
                    </div>
                </Col>
                <Col md="6" className="text-right">
                    <span className="f-w-600 m-r-5">{ShowingProducts}</span>
                    <div className="select2-drpdwn-product select-options d-inline-block" onChange={(e) => {
                        // filterSortFunc(e.target.value)
                    }}>
                    <select className="form-control btn-square" name="select">
                        <option value="Featured">{Featured}</option>
                        <option value="LowestPrices">{LowestPrices}</option>
                        <option value="HighestPrices">{HighestPrices}</option>
                    </select>
                    </div>
                </Col>
                </Row>
                <Row>
                <Col xl="3">
                    <div className={`product-sidebar ${filterSidebar ? '' : 'open'}`}>
                    <div className="filter-section">
                        <Card>
                        <CardHeader>
                            <h6 className="mb-0 f-w-600">{Filters}
                                <span className="pull-right">
                                <i className="fa fa-chevron-down toggle-data" onClick={onClickFilter}></i>
                            </span>
                            </h6>
                        </CardHeader>
                        <div className="left-filter">
                            <CardBody className="filter-cards-view animate-chk">
                            <Allfilters />
                            <Carousal />
                            <div className="product-filter text-center mt-2">
                                <Media className="img-fluid banner-product m-auto" src={require("../../../../../assets/images/ecommerce/banner.jpg")} alt="" />
                            </div>
                            </CardBody>
                        </div>
                        </Card>
                    </div>
                    </div>
                </Col>
                <Col xl="9" sm="12">
                    <Form>
                    <FormGroup className="m-0">
                        <Input
                        className="form-control"
                        type="text"
                        placeholder="search"
                        defaultValue={searchKeyword}
                        onChange={(e) => {
                            
                        }}
                        />
                        <i className="fa fa-search"></i>
                    </FormGroup>
                    </Form>
                </Col>
                </Row>
            </div>

            <div className="product-wrapper-grid">
                {searchKeyword.length > 0 ?
                <div className="search-not-found text-center">
                    <div>
                    <img className="img-fluid second-search" src={errorImg} alt="" />
                    <p>{NotFoundData}</p>
                    </div>
                </div>
                :
                <Row className="gridRow custom-gridRow">
                    {products ? products.map((item, i) => {
                        // actual live data or not
                        const live = item.default !== true ? true : false;
                        // selectors obj creator
                        const title = live ? item.listingTitle : null;
                        const thumbnail = live ? `${process.env.REACT_APP_ASSET_LINK}/${item.thumbnailImage.link}` : null;
                        const buyitnowPrice = live ? item.auctionPriceRelatedData.buyItNowPrice : null;
                        const description = live ? item.description : null;
                        const tags = live ? item.hashtags : null;
                        const bookmarks = live ? item.bookmarks : null;
                        const auctionType = live ? item.auctionPurchaseType : null;
                        // return data and display
                        return (
                            <div className={`${layoutColumns === 3 ? 'col-xl-3 col-sm-6 xl-4 col-grid-box custom-grid-box-3-layout' : 'custom-grid-box-unknown col-xl-' + layoutColumns}`} key={i}>
                                <Card className="custom-listing-card-display">
                                <div className="product-box">
                                    <div className="product-img">
                                    {live === true ? <span className="ribbon ribbon-danger">
                                        {calculateAuctionType(auctionType)}
                                    </span> : ''}
                                    {/* {(item.status === '50%') ?
                                        <span className="ribbon ribbon-success ribbon-right">
                                        {item.status}
                                        </span> : ''}
                                    {(item.status === 'gift') ?
                                        <span className="ribbon ribbon-secondary ribbon-vertical-left">
                                        <i className="icon-gift"></i>
                                        </span> : ''}
                                    {(item.status === 'love') ?
                                        <span className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-info">
                                        <i className="icon-heart"></i>
                                        </span> : ''}
                                    {(item.status === 'Hot') ?
                                        <span className="ribbon ribbon ribbon-clip ribbon-warning">
                                        {item.status}
                                        </span> : ''} */}
                                        <LazyLoadImage
                                            alt={"listing-picture-preview"}
                                            height={"100%"}
                                            src={thumbnail !== null ? thumbnail : require("../../../../../assets/images/product/12.png")}
                                            width={"100%"} 
                                            className="img-fluid custom-fluid-thumbnail"
                                        />
                                        <div className="product-hover">
                                            <ul>
                                            <li>
                                                <Link to={`/`}>
                                                    <Button color="default" onClick={() => {
                                                            console.log("purchase - add to cart!")
                                                            //   addcart(item, quantity)
                                                    }}>
                                                        <i className="icon-shopping-cart"></i>
                                                    </Button>
                                                </Link>
                                            </li>
                                            <li>
                                                <Button color="default" data-toggle="modal"
                                                onClick={() => onOpenModal(live === true ? {
                                                    id: item.uniqueId,
                                                    live: true
                                                } : {
                                                    id: item.id,
                                                    live: false
                                                })}>
                                                    <i className="icon-eye"></i>
                                                </Button>
                                            </li>
                                            <li>
                                                <Link to={`/`}>
                                                    <Button color="default" onClick={() => {

                                                    }}>
                                                        <i className="icon-heart"></i>
                                                    </Button>
                                                </Link>
                                            </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-details">
                                        <div className="rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                    <h4 onClick={() => handleRedirectToIndividualSoftwarePage(item, history, null, false)} className="font-primary" >{title !== null ? title : item.name}</h4>
                                    <hr className="secondary-hr" />
                                    <p className="listing-description-header">Description/Brief-info</p>
                                    {live === true ? <ReactMarkdown className="markdown-description--mapped-listing" children={item.description} remarkPlugins={[remarkGfm]} /> : <ReactMarkdown className="markdown-description--mapped-listing" children={dummyNoteDescription} remarkPlugins={[remarkGfm]} />}
                                    {tags !== null ? renderTags(tags) : null}
                                    <p className="date-posted-listing">Posted {moment(item.systemDate).fromNow()}</p>
                                    <div className="product-price">
                                        {preparePriceString(item.bids, item.currentBidPrice, auctionType, live, item, false)}
                                        {live === false ? <del>{`$${Number(item.discountPrice).toFixed(2)}`}</del> : null}
                                    </div>
                                    </div>
                                </div>
                                </Card>
                            </div>
                        );
                    }) : ''}
                    {/* render modal START */}
                    {singleProduct !== null ? <RenderConditionalRealDataOrNot history={history} handleRedirectToIndividualSoftwarePage={handleRedirectToIndividualSoftwarePage} open={open} singleProduct={singleProduct} onCloseModal={onCloseModal} minusQty={minusQty} plusQty={plusQty} quantity={quantity} changeQty={changeQty} onClickDetailPage={onClickDetailPage} /> : null}
                    {/* render modal END */}
                </Row>
                }
            </div>
            </div>
            <Row style={{ paddingTop: "17.5px" }}>
                <div className="centered-both-ways">
                    <Pagination className="m-b-30" aria-label="Page navigation example">
                        <ul className="pagination pagination-lg pagination-secondary">
                            <PaginationItem><PaginationLink href={null}>{"Previous"}</PaginationLink></PaginationItem>
                            <PaginationItem active><PaginationLink href={null}>{"1"}</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink href={null}>{"2"}</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink href={null}>{"3"}</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink href={null}>{"Next"}</PaginationLink></PaginationItem>
                        </ul>
                    </Pagination>
                </div>
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
export default connect(mapStateToProps, { })(SoftwareLandingMainHelper);