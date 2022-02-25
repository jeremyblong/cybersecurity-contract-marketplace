import React, { Component, Fragment } from 'react';
import Autocomplete from "react-autocomplete";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./styles.css";
import { saveListingData } from "../../../../../../../../redux/actions/employer/listings/listingData.js";
import { connect } from "react-redux";
import _ from "lodash";


class LocationSearchInput extends Component {
constructor(props) {
    super(props);
    
    this.state = { 
        address: '',
        results: []
    };
}
 
    handleChange = e => {
        const { value } = e.target;

        this.setState({
            address: value
        }, () => {
            axios.get(`https://api.tomtom.com/search/2/search/${this.state.address}.json?key=${process.env.REACT_APP_TOMTOM_API_KEY}&language=en-US&limit=10&idxSet=PAD`).then((res) => {

                const { results } = res.data;
                
                this.setState({
                    results
                })
            }).catch((err) => {
                console.log("tomtom err: ", err);
            })
        })
    };
    render() {
        const { address, results } = this.state;

        console.log("this.state:", this.state);

        return (
        <Fragment>
            <ListGroup>
                <Autocomplete
                    menuStyle={{
                        zIndex: 999999999999999999999999,
                        backgroundColor: "white"
                    }}
                    getItemValue={(item) => item.address.freeformAddress}
                    items={results}
                    inputProps={{
                        placeholder: "Enter an address...",
                        className: "form-control"
                    }}
                    renderItem={(item, isHighlighted) => {
                        return (
                            <div key={item.id} className={`list-group-item-action flex-column align-items-start customized-list-item`}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{item.address.freeformAddress}</h5><small>{item.type}</small>
                                </div>
                                <p className="mb-1">{`${item.address.municipality}, ${item.address.countrySubdivisionName || item.address.countrySubdivision} ${item.address.extendedPostalCode || item.address.postalCode}`}</p>
                            </div>
                        );
                    }}
                    value={address}
                    onChange={this.handleChange}
                    onSelect={(val, obj) => {

                        console.log("selected: ", val, obj);

                        this.props.saveListingData({
                            ...this.props.previousData,
                            businessAddress: obj
                        })
                    }}
                />
            </ListGroup>
        </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        previousData: _.has(state.listingData, "listingData") ? state.listingData.listingData : {}
    }
}
export default connect(mapStateToProps, { saveListingData })(LocationSearchInput);
