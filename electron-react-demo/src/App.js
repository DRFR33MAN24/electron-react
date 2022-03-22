import logo from "./logo.svg";
import "./App.css";
import { withRouter } from "./withRouter";
import { useNavigate, Outlet } from "react-router";
import { Provider, connect } from "react-redux";

import TitleBar from "./Components/TitleBar";
import { Component } from "react";

import PropTypes from "prop-types";
import { loadUser } from "./actions/authAction";
import { returnErrors, clearErrors } from "./actions/errorAction";
import {
  LOGIN_FAIL,
  RESET_FAIL,
  AUTH_ERROR,
  CLEAR_ERRORS,
  NO_ERROR,
  CONNECTION_ERROR
} from "./actions/types";
class App extends Component {
  state = {
    msg: ""
  };
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

    if (error !== prevProps.error) {
      if (error.id === null || error.id === undefined) return;
      else if (error.id === AUTH_ERROR || error.id === LOGIN_FAIL) {
        this.props.navigate("/Login");
      } else if (error.id === NO_ERROR) {
        this.props.navigate("/Main");
      } else if (error.id === CONNECTION_ERROR) {
        console.log(error.msg);
        if (error.msg === "CONNECTION_ERROR_LOADUSER") {
          this.setState({ msg: "Connection error retrying..." });
          setTimeout(() => {
            this.props.loadUser();
          }, 1000);
        }
      }
    }
  }

  render() {
    let msg = this.state.msg;
    return (
      <div className="App ">
        {msg !== "" ? <div className="card">{msg}</div> : <div></div>}
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
