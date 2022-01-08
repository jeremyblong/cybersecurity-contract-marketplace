import 'react-notifications/lib/notifications.css';
import './styles/bootstrap.min.css';
import './styles/animate.css';
import './styles/boxicons.min.css';
import './styles/flaticon.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import './styles/style.css';
import './styles/responsive.css';
import 'react-phone-number-input/style.css'
import 'react-confirm-alert/src/react-confirm-alert.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-sliding-pane/dist/react-sliding-pane.css";
import 'react-dropzone-uploader/dist/styles.css';
import 'rc-slider/assets/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-phone-number-input/style.css';
import "easymde/dist/easymde.min.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-credit-cards/es/styles-compiled.css';
import 'react-calendar/dist/Calendar.css';
import 'react-responsive-modal/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-image-crop/dist/ReactCrop.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
// components & other various imported functionality/components
import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { routes } from './route';
import ConfigDB from './data/customizer/config'
import { classes } from './data/layouts';
import { NotificationContainer } from 'react-notifications';
import Index from "./pages/index.js";
import { RecoilRoot } from 'recoil';
import SignIn from "./pages/sign-in.js";
import SignUp from "./pages/sign-up.js";
import { store } from "./redux/store/store.js";
import ForgotPassword from "./pages/forgot-password.js";
import Contact from "./pages/contact.js";
import axios from "axios";
import _ from "lodash";
import About from "./pages/about.js";
import FAQ from "./pages/faq.js";
import ProtectedRoute from "./route/protected/protectedRoute.js";
import Testimonials from "./pages/testimonials.js";
import Pricing from "./pages/pricing.js";
import ComingSoon from "./pages/coming-soon.js";
import PrivacyPolicy from "./pages/privacy-policy.js";
import Team from "./pages/team.js";
import ServiceDetails from "./pages/service-details.js";
import BlogGrid from "./pages/blog-grid.js";
import BlogDetails from "./pages/blog-details.js";
import ServicesOne from "./pages/services-one.js";
import ServicesTwo from "./pages/services-two.js";
import ServicesThree from "./pages/services-three.js";
import BlogLeftSidebar from "./pages/blog-left-sidebar.js";
import BlogRightSidebar from "./pages/blog-right-sidebar.js";

require('dotenv').config();

const Root = (props) =>  {

  const [anim, setAnim] = useState("");
  const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation || 'fade'
  const abortController = new AbortController();
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') ||  Object.keys(defaultLayoutObj).pop();
  const [ authenticated, setAuthenticatedStatus ] = useState(false);

  const refreshTokenApiRequest = () => {

    const accountData = store.getState().auth.data;

    if (!_.isEmpty(accountData)) {
      axios.post(`http://localhost:5000/refresh/token/${accountData.accountType === "hackers" ? "hacker" : "employer"}`, null, {
        withCredentials: true
      }).then((res) => {
        if (res.data.message === "Gathered refresh token!") {
          console.log(res.data);
        } else {
          console.log("err", res.data);
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      console.log("store user data is empty.");
    }
  }

  useEffect(() => {

    setTimeout(() => {
      const accountData = store.getState().auth.data;

      if (!_.isEmpty(accountData)) {

        console.log("authenticated redux state is NOT empty!");

        setAuthenticatedStatus(true);
      } else {

        console.log("authenticated redux state is confirmed to be EMPTY.");
      }
    }, 100)

    setAnim(animation);

    setTimeout(refreshTokenApiRequest, 5 * 60 * 1000);

    setTimeout(() => {
      refreshTokenApiRequest();
    }, 500);

    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return function cleanup() {
        abortController.abort();
      }
    // eslint-disable-next-line
  }, []);

  return(
    <Fragment>
      <Provider store={store}>
      <RecoilRoot>
      <NotificationContainer />
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/frequently-asked-questions" component={FAQ} />
        <Route exact path="/testimonials" component={Testimonials} />
        <Route exact path="/pricing-before-login" component={Pricing} />
        <Route exact path="/coming-soon" component={ComingSoon} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/service-details" component={ServiceDetails} />
        <Route exact path="/blog-main" component={BlogGrid} />
        <Route exact path="/blog-details" component={BlogDetails} />
        <Route exact path="/services-one" component={ServicesOne} />
        <Route exact path="/services-two" component={ServicesTwo} />
        <Route exact path="/services-three" component={ServicesThree} />
        <Route exact path="/blog-left-sidebar" component={BlogLeftSidebar} />
        <Route exact path="/blog-right-sidebar" component={BlogRightSidebar} />
        <App>
          <TransitionGroup>
            {routes.map(({ path, Component }) => (
                <ProtectedRoute key={path} exact path={`${process.env.PUBLIC_URL}${path}`}>
                    {({ match }) => (
                        <CSSTransition 
                        in={match != null}
                        timeout={100}
                        classNames={anim} 
                        unmountOnExit
                        >
                        <div>
                          <Component />
                        </div>
                        </CSSTransition> 
                    )}
                </ProtectedRoute>
                ))}
          </TransitionGroup>
        </App>
      </Switch>
      </BrowserRouter>
      </RecoilRoot>
      </Provider>
    </Fragment>
  )
}
ReactDOM.render(<Root/>,
  document.getElementById('root')
);

serviceWorker.unregister();