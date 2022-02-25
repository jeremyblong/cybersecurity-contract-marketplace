import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import _ from "lodash";
import ReactLoading from 'react-loading';

class ProtectedRoute extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        isLoading: true
    }
}
    componentDidUpdate (prevProps) {
        if (this.state.isLoading === true) {
            if (JSON.stringify(prevProps.userData) !== JSON.stringify(this.props.userData)) {
                
                this.setState({
                    isLoading: false
                })
            }
        }
    }
    componentDidMount () {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2500)
    }
    render() {
        const { component: Component, ...rest } = this.props;

        if(this.state.isLoading) {
            return <ReactLoading type={"cubes"} color={"#00acee"} height={350} width={650} />;
        } else {
            if(!_.isEmpty(this.props.userData)){
                return (<Route {...rest} render={(props) => (<Component {...props}/>)} />);
            } else {
                return <Redirect to='/sign-in' />;
            }
        }
    }
}
const mapStateToProps = (state) => {
    return {
      userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(withRouter(ProtectedRoute));