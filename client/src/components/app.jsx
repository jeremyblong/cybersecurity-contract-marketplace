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
import axios from "axios";

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    ready: false,
    balance: 0
  }
}
  componentDidMount() {
    console.log("MOUNTED IN APP.JS");

    const { shiftCoreStyles } = this.props;

    shiftCoreStyles(false);
  }
  componentDidUpdate(prevProps, prevState) {
    const { shiftCoreStyles, data } = this.props;

    if (typeof data !== "undefined" && !_.isEmpty(data) && this.state.balance === 0) {
      console.log("RAN!");

      axios.get(`${process.env.REACT_APP_BASE_URL}/gather/availiable/stripe/bal`, {
        params: {
          uniqueId: data.uniqueId,
          accountType: data.accountType
        }
      }).then((res) => {
          if (res.data.message === "Gathered balance!") {
              console.log("BALANCE IS...:", res.data);
  
              const { bal } = res.data;
  
              if (data.accountType === "employers") {

                this.setState({
                  balance: (bal / 100).toFixed(2),
                  ready: true
                })
              } else {
                const { amount } = bal.available[0];

                this.setState({
                  balance: (amount / 100).toFixed(2),
                  ready: true
                })
              }
          } else {
              console.log("err", res.data);
          }
      }).catch((err) => {
          console.log(err);
      });
    }

    if (prevProps.paneActive === true) {
      shiftCoreStyles(false);
    }
  }
  render () {
    const { children, paneActive } = this.props;
    const { ready, balance } = this.state;
    return (
      <Fragment>
        <Loader/>
        <div className={paneActive === true ? "page-wrapper compact-wrapper enact-nonclick" : "page-wrapper compact-wrapper"} id="pageWrapper">
        <Header ready={ready} balance={balance} />
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
    data: state.auth.data,
    paneActive: _.has(state.changeGlobalStyles, "paneActive") ? state.changeGlobalStyles.paneActive : false
  }
}
export default connect(mapStateToProps, { shiftCoreStyles })(App);