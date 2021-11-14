
import '../styles/bootstrap.min.css';
import '../styles/animate.css';
import '../styles/boxicons.min.css';
import '../styles/flaticon.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import '../styles/style.css';
import '../styles/responsive.css';
import 'react-notifications/lib/notifications.css';

import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'react-phone-number-input/style.css'
import {NotificationContainer} from 'react-notifications';
import Index from "../pages/index.js";

class App extends Component {
constructor (props) {
    super(props);

    this.state = {

    }
}
componentDidMount() {
    
}
render () {
    console.log("this.state :", this.state);
        return (
        <div className="App">
            <NotificationContainer/>
            <BrowserRouter>
                <Route exact path="/" component={Index} />
            </BrowserRouter>
        </div>
        );
    }
}

export default App;