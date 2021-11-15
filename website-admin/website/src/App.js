
import './styles/bootstrap.min.css';
import './styles/animate.css';
// import './styles/boxicons.min.css';
// import './styles/flaticon.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import './styles/style.css';
import './styles/responsive.css';
import 'react-notifications/lib/notifications.css';
// import "./index.scss";

import React, { useState, useEffect, Fragment } from 'react';
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import 'react-phone-number-input/style.css'
import {NotificationContainer} from 'react-notifications';
import Index from "./pages/index.js";
import { RecoilRoot } from 'recoil';
import SignIn from "./pages/sign-in.js";
import SignUp from "./pages/sign-up.js";
import { store } from "./redux/store/store.js";
import { Provider } from "react-redux";
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import {routes} from './admin/route';
import ConfigDB from './admin/data/customizer/config'
import { classes } from './admin/data/layouts';
import { Redirect } from "react-router-dom";

const App = (props) => {
  const [anim, setAnim] = useState("");
  const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation || 'fade'
  const abortController = new AbortController();
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') ||  Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
      setAnim(animation)
      console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
      console.disableYellowBox = true;
      return function cleanup() {
          abortController.abort();
        }
      // eslint-disable-next-line
    }, []);
    return (
      <div className="App">
        <Provider store={store}>
          <RecoilRoot>
            <NotificationContainer/>
            <BrowserRouter>
              <Route exact path="/" component={Index} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
            </BrowserRouter>
          </RecoilRoot>
        </Provider>
      </div>
    );
}

export default App;