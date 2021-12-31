import React, { Fragment, Component } from 'react';
import Loader from "../layout/loader";
import Header from '../layout/header'
import Sidebar from '../layout/sidebar'
import Footer from '../layout/footer'
import ThemeCustomize from "../layout/theme-customizer";
import {ToastContainer} from 'react-toastify';
import { connect } from "react-redux";
import _ from "lodash";
import { shiftCoreStyles } from "../redux/actions/universal/index.js";


class App extends Component {
constructor(props) {
  super(props);

  this.state = {

  }
}
  componentDidMount() {
    console.log("MOUNTED IN APP.JS");

    const { shiftCoreStyles } = this.props;

    shiftCoreStyles(false);
  }
  componentDidUpdate(prevProps, prevState) {
    const { shiftCoreStyles } = this.props;

    if (prevProps.paneActive === true) {
      shiftCoreStyles(false);
    }
  }
  render () {
    const { children, paneActive } = this.props;
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
}
const mapStateToProps = (state) => {
  console.log("state THE MF JACKPOT! : ", state); // changeGlobalStyles
  return {
    paneActive: _.has(state.changeGlobalStyles, "paneActive") ? state.changeGlobalStyles.paneActive : false
  }
}
export default connect(mapStateToProps, { shiftCoreStyles })(App);