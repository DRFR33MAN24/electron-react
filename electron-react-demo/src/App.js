import logo from "./logo.svg";
import "./App.css";
import { withRouter } from "./withRouter";
import { useNavigate, Outlet } from "react-router";
import { Provider, connect } from 'react-redux'

import TitleBar from "./Components/TitleBar";
import { Component } from "react";
import PropTypes from "prop-types";
import { loadUser } from "./actions/authAction";
import { returnErrors, clearErrors } from "./actions/errorAction";
class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  componentWillMount() {
    this.props.loadUser();
    //console.log("AppWillMount")

  }

  componentDidUpdate(prevProps, prevState) {

    const error = this.props.error;
    console.log(error);
    // if (error !== prevProps.error) {

    if (error.id === "AUTH_ERROR") {
      this.props.navigate('/Login')
    }


    this.props.navigate("/Main");

  }




  render() {
    return (

      <div className="App ">
        {/* <TitleBar /> */}
        <Outlet />
      </div>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.error,
  user: state.auth.user
});


export default withRouter(
  connect(mapStateToProps, { loadUser, returnErrors, clearErrors })(App)
);
