import React, { Fragment, useEffect } from 'react';
import Loader from "../layout/loader";
import Header from '../layout/header'
import Sidebar from '../layout/sidebar'
import Footer from '../layout/footer'
import ThemeCustomize from "../layout/theme-customizer";
import {ToastContainer} from 'react-toastify';
import { connect } from "react-redux";
import _ from "lodash";
import { shiftCoreStyles } from "../redux/actions/universal/index.js";

const App = ({ children, paneActive }) => {

  useEffect(() => {
    console.log("state change");
    
    shiftCoreStyles(false);
  }, [])
  console.warn = () => {}
  return (
    <Fragment>
      <Loader/>
      <div className={paneActive === true ? "page-wrapper compact-wrapper enact-nonclick" : "page-wrapper compact-wrapper"} id="pageWrapper">
      <Header/>
      <div className="page-body-wrapper sidebar-icon">
        <Sidebar/>
        <div className="page-body">
          {children}
        </div>
        <Footer/>
        <ThemeCustomize/>
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  console.log("state THE MF JACKPOT! : ", state); // changeGlobalStyles
  return {
    paneActive: _.has(state.changeGlobalStyles, "paneActive") ? state.changeGlobalStyles.paneActive : false
  }
}
export default connect(mapStateToProps, { shiftCoreStyles })(App);