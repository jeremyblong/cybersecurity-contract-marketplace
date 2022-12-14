import 'react-notifications/lib/notifications.css';
import './styles/bootstrap.min.css';
import './styles/animate.css';
import './styles/boxicons.min.css';
import './styles/flaticon.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import './styles/customGlobalStyles.css';
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
import 'react-image-lightbox/style.css';
import "react-image-gallery/styles/css/image-gallery.css";
import 'emoji-mart/css/emoji-mart.css';
import 'rc-slider/assets/index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
import BlogGrid from "./pages/blog-grid.js";
import BlogDetails from "./pages/blog-details.js";
import BlogLeftSidebar from "./pages/blog-left-sidebar.js";
import BlogRightSidebar from "./pages/blog-right-sidebar.js";
import MountingLogicRedux from "./mountingLogicRedux.js";
import SimpleReactLightbox from 'simple-react-lightbox';
import UnauthorizedAccessPage from "./pages/dashboard/unauthorized/unauthorizedAccess.js";
import CreateANewBlogPostPage from "./pages/unauthenticatedMisc/blogRelated/postNewBlogPage.js";
import AboutCompanyDetails from "./pages/aboutCompany.js";
import TermsConditions from "./pages/terms-conditions.js";
import Sheet from 'react-modal-sheet';
import { Container, Button, Row, Col, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import "./styles.css";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

require('dotenv').config();

const Root = (props) =>  {

  const [anim, setAnim] = useState("");
  const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation || 'fade'
  const abortController = new AbortController();
  const defaultLayoutObj = classes.find(item => Object.values(item).pop(1) === 'compact-wrapper');
  const layout = localStorage.getItem('layout') ||  Object.keys(defaultLayoutObj).pop();
  const [ authenticated, setAuthenticatedStatus ] = useState(false);
  const [ authModal, setAuthModal ] = useState(true);
  const [ password, setPassword ] = useState("");
  const [ permission, setPermission ] = useState(false);

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

    if (process.env.NODE_ENV === "development") {
      setPermission(true);
    }

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
  const renderComponent = (Component, props) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 225);
    return <Component props={props} />
  }
  const renderBasedOnAccountType = (path, Component) => {
    const accountData = store.getState().auth.data;

    const employerNOTAllowedRoutes = ["/hacker/account/view/reviews/previous", "/individual/hired/job/data/view/manage/:id", "/cashout/immediate/funding/funds", "/profile/settings/edit", "/create/listing/software/exchange/hacker/account", "/create/new/live/stream/hackers", "/already/applied/jobs/hacker/account", "/view/as/hacker/bookmarked/profiles/employer/accounts", "/view/as/hacker/view/bookmarked/profiles/hacker/accounts", "/dashboard/hacker", "/create/new/post/hacker/profile/main/data", "/vpn/download/core/files/setup", "/download/dependencies/final/step/vpn/setup", "/frequently/asked/questions/main/hacker", "/view/bettable/listings/main", "/payment/logic/main/page/hackers", "/hacker/account/signup/flow/payment/related", "/successful/onboarding/process/stripe/hacker/account", "/hackers/display/all/active/gigs/hired"];
    const hackersNOTAllowedRoutes = ["/employer/account/view/reviews/previous", "/employer/notifications", "/start/video/interview/chat/employer", "/employer/introductory/video/upload", "/profile/settings/edit/employer", "/view/all/general/applications/employer/recruit", "/employer/view/hired/applicants/active", "/view/as/employer/view/bookmarked/profiles/employer/accounts", "/view/as/employer/view/bookmarked/profiles/hacker/accounts", "/dashboard/employer", "/employer/profile/main/display/personal", "/frequently/asked/questions/main/employer", "/payments/employer/account/manage/pay/hacker", "/payment/logic/main/employer/page", "/payment/logic/main/page/employers", "/payments/employer/account/manage/pay/hacker/:id", "/employer/promote/various/account/data"];

    if (path === "/hacker/profile/individual/view/:id") {
      return (
        <Route
          path={"/hacker/profile/individual/view/:id"}
          render={props => <Component key={props.match.params.id} {...props} />}
        />
      );
    } else if (path === "/view/individual/employer/listing/public/:id") {
      return (
        <Route
          path={"/view/individual/employer/listing/public/:id"}
          render={props => <Component key={props.match.params.id} {...props} />}
        />
      );
    } else if (path === "/view/individual/tutorial/video/:id") {
      return (
        <Route
          path={"/view/individual/tutorial/video/:id"}
          render={props => <Component key={props.match.params.id} {...props} />}
        />
      );
    } else if (path === "/view/individual/application/employer/:id") {
      return (
        <Route
          path={"/view/individual/application/employer/:id"}
          render={props => <Component key={props.match.params.id} {...props} />}
        />
      );
    } else {
      if (accountData.accountType === "employers") {
        // employer(s) authenticated acct.
        if (employerNOTAllowedRoutes.includes(path)) {
          // employer NOT allowed includes this path so render "Unauthenticated Route"
          return <UnauthorizedAccessPage />;
        } else {
          return <Component />;
        }
      } else {
        // hacker(s) authenticated acct.
        if (hackersNOTAllowedRoutes.includes(path)) {
          // hacker NOT allowed includes this path so render "Unauthenticated Route"
          return <UnauthorizedAccessPage />;
        } else {
          return <Component />;
        }
      } 
    }
  }
  const handleAuthAttempt = () => {
    if (typeof password !== "undefined" && password === process.env.REACT_APP_ACCESS_CODE_BETA) {
      setPermission(true);
      setPassword("");
      setAuthModal(false);

      cookies.set('authenticated', true, { path: '/' });
    } else {
      NotificationManager.error("Password does NOT match the appropriate data and/or the correct credentials, please try again or contact us for a code!", "You code/password did NOT match!", 4750);
    }
  }
  const renderDashboardComponents = (path, Component) => {
    return (
      <ProtectedRoute key={path} exact path={`${process.env.PUBLIC_URL}${path}`}>
        {({ match }) => {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 500);
          return (
            <CSSTransition 
              in={match != null}
              timeout={100}
              classNames={anim} 
              unmountOnExit
            >
              <div>
                {renderBasedOnAccountType(path, Component)}
              </div>
            </CSSTransition> 
          );
        }}
      </ProtectedRoute>
    );
  }
  const renderPaneRestriction = () => {
    if (process.env.NODE_ENV === "production") {
      if (cookies.get('authenticated') !== "true") {
        return (
          <Fragment>
            <Sheet id={"sheet-auth-auth"} disableDrag={true} isOpen={authModal} onClose={() => setAuthModal(false)}>
              <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                  <Container className='margin-password-input' fluid={true}>
                    <Row style={{ marginTop: "22.5px" }}>
                        <Col sm="12" xl="12" lg="12" md="12">
                          <Card>
                              <CardHeader className='b-l-info b-r-info'>
                                  <h5>Enter the password you were provided - if you do not have a code, please reach out to <a style={{ color: "blue" }} href={"mailto:support@thehackermarketplace.com"}>our email</a> to request access...</h5>
                              </CardHeader>
                              <CardBody>
                                <FormGroup className=" m-form__group">
                                  <Label>Enter your code/password</Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend"><InputGroupText>{"PASSWORD"}</InputGroupText></InputGroupAddon>
                                    <Input onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" type="text" placeholder="Enter your password..."/>
                                  </InputGroup>
                                </FormGroup>
                              </CardBody>
                              <CardFooter className='b-l-info b-r-info'>
                                <h4 className='text-left'>Enter the proper password or request one if you'd like to access our 'beta' launch/version...</h4>
                                <hr />
                                <Button className={"btn-square-success"} outline color={"success-2x"} style={{ width: "100%" }} onClick={() => handleAuthAttempt()}>Submit & Request Access!</Button>
                              </CardFooter>
                          </Card>
                      </Col>
                    </Row>
                  </Container>
                </Sheet.Content>
              </Sheet.Container>

              <Sheet.Backdrop />
            </Sheet>
          </Fragment>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return(
    <Fragment>
      <Provider store={store}>
      <MountingLogicRedux props={props} />
      <SimpleReactLightbox>
      <RecoilRoot>
        <NotificationContainer />
        {/* {renderPaneRestriction()} */}
        <Fragment>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={(props) => renderComponent(Index, props)} />
              <Route exact path="/company-details" render={(props) => renderComponent(AboutCompanyDetails, props)} />
              <Route exact path="/sign-in" render={(props) => renderComponent(SignIn, props)} />
              <Route exact path="/sign-up" render={(props) => renderComponent(SignUp, props)} />
              <Route exact path="/forgot-password" render={(props) => renderComponent(ForgotPassword, props)} />
              <Route exact path="/contact" render={(props) => renderComponent(Contact, props)} />
              <Route exact path="/about" render={(props) => renderComponent(About, props)} />
              <Route exact path="/frequently-asked-questions" render={(props) => renderComponent(FAQ, props)} />
              <Route exact path="/testimonials" render={(props) => renderComponent(Testimonials, props)} />
              <Route exact path="/pricing-before-login" render={(props) => renderComponent(Pricing, props)} />
              <Route exact path="/coming-soon" render={(props) => renderComponent(ComingSoon, props)} />
              <Route exact path="/privacy-policy" render={(props) => renderComponent(PrivacyPolicy, props)} />
              <Route exact path="/team" render={(props) => renderComponent(Team, props)} />
              {/* <Route exact path="/service-details" render={(props) => renderComponent(ServiceDetails, props)} /> */}
              <Route exact path="/blog-main" render={(props) => renderComponent(BlogGrid, props)} />
              <Route exact path="/blog-details/:id" render={(props) => renderComponent(BlogDetails, props)} />
              {/* <Route exact path="/services-one" render={(props) => renderComponent(ServicesOne, props)} />
              <Route exact path="/services-two" render={(props) => renderComponent(ServicesTwo, props)} />
              <Route exact path="/services-three" render={(props) => renderComponent(ServicesThree, props)} /> */}
              <Route exact path="/blog-left-sidebar" render={(props) => renderComponent(BlogLeftSidebar, props)} />
              <Route exact path="/blog-right-sidebar" render={(props) => renderComponent(BlogRightSidebar, props)} />
              <Route exact path="/terms-and-conditions" render={(props) => renderComponent(TermsConditions, props)} />
              <Route exact path="/create-new-blog" render={(props) => renderComponent(CreateANewBlogPostPage, props)} />
              <App>
                <TransitionGroup>
                  {routes.map(({ path, Component }) => renderDashboardComponents(path, Component))}
                </TransitionGroup>
              </App>
            </Switch>
          </BrowserRouter>
        </Fragment>
      </RecoilRoot>
      </SimpleReactLightbox>
      </Provider>
    </Fragment>
  )
}

ReactDOM.render(<Root/>,
  document.getElementById('root')
);

serviceWorker.unregister();