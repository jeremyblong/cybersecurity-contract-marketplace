import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../../../../../layout/breadcrumb';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ListGroup, Form, FormGroup, Input, Media, Modal, ModalHeader, ModalBody, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Grid, List } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import errorImg from '../../../../../assets/images/search-not-found.png';
import Allfilters from './helpers/allfilters.jsx';
import Carousal from './helpers/carousal.jsx';
import uuid from "react-uuid";
import { Filters,ShowingProducts,Featured,LowestPrices,HighestPrices,NotFoundData,ProductDetails,Quantity,AddToCart,ViewDetails,ProductSizeArray } from "../../../../../constant";
import "./styles.css";

const SoftwareLandingMainHelper = (props) => {

    const history = useHistory();


    //   const dispatch = useDispatch()
    const data = []; // useSelector(content => content.data.productItems)
    // eslint-disable-next-line 
    const [layoutColumns, setLayoutColumns] = useState(3);

    const symbol = "$"; // useSelector(content => content.data.symbol)
    const [open, setOpen] = useState(false);
    const [sidebaron, setSidebaron] = useState(true);
    const [singleProduct, setSingleProduct] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    // eslint-disable-next-line
    const [stock, setStock] = useState('');
    const [filterSidebar, setFilterSidebar] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const filters = []; // useSelector(content => content.filters)
    const [products, setProducts ] = useState([]); // getVisibleproducts(data, filters)

    const calculateStatus = (num) => {
        switch (num) {
            case 1:
                return "love"
                break;
            case 2: 
                return "Hot"
                break;
            case 3:
                return "gift"
                break;
            case 4: 
                return "50%"
                break;
            case 5:
                return "sale"
                break;
            default:
                break;
        }
    }

    useEffect(() => {
      const newProductArray = [];
        // dispatch(watchfetchProducts());
        new Promise((resolve, reject) => {
            new Array(20).fill("").map((item, index) => {
                const generated = Math.floor(Math.random() * 1000) + 1;
                const statusGeneration = Math.floor(Math.random() * 5) + 1;
                newProductArray.push({
                    status: calculateStatus(statusGeneration),
                    id: uuid(),
                    name: "Software item",
                    note: "Simply dummy text of the printing",
                    price: (generated).toString(),
                    discountPrice: ((generated - 150 > 0) ? (generated - 150) : 50).toString(),
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    category: "Digital Software Code Snippet"
                });
                if (index === 19) {
                    resolve(newProductArray);
                }
            });
        }).then((passedArray) => {
            setProducts(passedArray);
        });
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


    const onOpenModal = (productId) => {
        setOpen(true);
        products.forEach((product, i) => {
            if (product.id === productId) {
                setSingleProduct(product)
            }
        })
    };

    const onCloseModal = () => {
        setOpen(false)
    };


    const minusQty = () => {
        if (quantity > 1) {
        setStock('InStock')
        setQuantity(quantity - 1)
        }
    }

    const changeQty = (e) => {
        setQuantity(parseInt(e.target.value))
    }

    const plusQty = () => {
        if (quantity >= 1) {
        setQuantity(quantity + 1)
        } else {
        setStock('Out of Stock !')
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
                <Row className="gridRow">
                    {products ? products.map((item, i) =>
                    <div className={`${layoutColumns === 3 ? 'col-xl-3 col-sm-6 xl-4 col-grid-box' : 'col-xl-' + layoutColumns}`} key={i}>
                        <Card>
                        <div className="product-box">
                            <div className="product-img">
                            {(item.status === 'sale') ?
                                <span className="ribbon ribbon-danger">
                                {item.status}
                                </span> : ''}
                            {(item.status === '50%') ?
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
                                </span> : ''}
                            <img className="img-fluid" src={require("../../../../../assets/images/product/12.png")} alt="" />
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
                                    onClick={() => onOpenModal(item.id)}>
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
                            <h4 onClick={() => onClickDetailPage(item)} className="font-primary" >{item.name}</h4>
                            <p>{item.note}</p>
                            <div className="product-price">
                                {symbol} {item.price}
                                <del>{symbol} {item.discountPrice}</del>
                                
                            </div>
                            </div>
                        </div>
                        </Card>
                    </div>
                    ) : ''}

                    <Modal className="modal-lg modal-dialog-centered product-modal" isOpen={open}>
                    <ModalBody>
                        <ModalHeader toggle={onCloseModal}>
                        <div className="product-box row">
                            <Col lg="6" className="product-img">
                            <Media className="img-fluid" src={require("../../../../../assets/images/product/12.png")} alt="" />
                            </Col>
                            <Col lg="6" className="product-details  text-left">
                            <h4>{singleProduct.category}</h4>
                            <div className="product-price">
                                {symbol}{singleProduct.price}
                                <del>{symbol}{singleProduct.discountPrice}</del>
                            </div>
                            <div className="product-view">
                                <h6 className="f-w-600">{ProductDetails}</h6>
                                <p className="mb-0">{singleProduct.description}</p>
                            </div>
                            <div className="product-size">
                                <ul>
                                {ProductSizeArray.map((items,i) => 
                                    <li key={i}>
                                    <Button color="outline-light">{items}</Button>
                                    </li>
                                )}
                                </ul>
                            </div>
                            <div className="product-qnty">
                                <h6 className="f-w-600">{Quantity}</h6>
                                <fieldset>
                                <InputGroup className="bootstrap-touchspin">
                                    <InputGroupAddon addonType="prepend">
                                    <Button color="primary btn-square" className="bootstrap-touchspin-down" onClick={minusQty}><i className="fa fa-minus"></i></Button>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="bootstrap-touchspin-prefix" style={{ display: "none" }}></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="touchspin text-center" type="text" name="quantity" value={quantity} onChange={(e) => changeQty(e)} style={{ display: "block" }} />
                                    <InputGroupAddon addonType="append">
                                    <InputGroupText className="bootstrap-touchspin-postfix" style={{ display: "none" }}></InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupAddon addonType="append" className="ml-0">
                                    <Button color="primary btn-square" className="bootstrap-touchspin-up" onClick={plusQty}><i className="fa fa-plus"></i></Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                </fieldset>
                                <div className="addcart-btn">
                                <Link to={`${process.env.PUBLIC_URL}/app/ecommerce/cart`}><Button color="primary" className="mr-2 mt-2" onClick={() => {
                                    console.log("purchase - add to cart (last func)!");

                                    // addcart(singleProduct, quantity)
                                }}>{AddToCart}</Button></Link>
                                <Button onClick={() => onClickDetailPage(singleProduct)} color="primary" className="mr-2 mt-2">Visit/View Listing</Button>
                                </div>
                            </div>
                            </Col>
                        </div>
                        </ModalHeader>
                    </ModalBody>
                    </Modal>
                </Row>
                }
            </div>
            </div>
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