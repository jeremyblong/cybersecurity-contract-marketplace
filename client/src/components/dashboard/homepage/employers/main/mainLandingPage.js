import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { authentication } from "../../../../../redux/actions/authentication/auth.js";
import { NotificationManager } from 'react-notifications';

class MainLandingPageEmployerHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        locationError: ""
    }
}
    componentDidMount() {
        if ("geolocation" in navigator) {
            console.log("Available");

            navigator.geolocation.getCurrentPosition((position) => {
                console.log("Latitude is :", position.coords.latitude);
                //
                console.log("Longitude is :", position.coords.longitude);

                const location = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                };

                const { uniqueId } = this.props.userData;

                axios.post(`${process.env.REACT_APP_BASE_URL}/save/user/geolocation`, {
                    accountType: "employers",
                    location,
                    id: uniqueId
                }).then((res) => {
                    if (res.data.message === "Successfully saved location data to account!") {
                        console.log(res.data);

                        const { user } = res.data;

                        console.log("user", user.value);

                        if (user.value !== null) {
                            this.props.authentication(user.value);

                            NotificationManager.success(`We've successfully updated your location so you have a better tailored user experience with our location-based services.`, 'Updated your location!', 3500);
                        }
                    } else {
                        console.log("err", res.data);

                        NotificationManager.error(`We've encountered an error updating your current location for our location-based services...`, 'Error updating location!', 3500);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }, (error) => {
                console.log("error gathering location - : ", error.message);

                if (error.message === "User denied geolocation prompt") {
                    this.setState({
                        locationError: error.message
                    })
                }
            });
          } else {
            console.log("Not Available");
        }
    }
    render() {
        const { locationError } = this.state;
        return (
            <div>
                <h1>~ dashboard employer! ~</h1>
                <hr />
                {typeof locationError !== "undefined" && locationError.length > 0 ? <p style={{ color: "red" }} className="lead">{locationError}</p> : null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { authentication })(MainLandingPageEmployerHelper);
