import React, { Component } from 'react';
import { Context } from "./MainPage";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors, returnErrors } from "../actions/errorAction";
import { getEmployeeImg } from "../actions/employeesAction";
class Img extends Component {
    static propTypes = {
        getEmployeeImg: PropTypes.func.isRequired,

        error: PropTypes.object.isRequired,

        clearErrors: PropTypes.func.isRequired,
        returnErrors: PropTypes.func.isRequired,

    };
    render() {
        return (
            <div>
                <img />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    error: state.error,

    img: state.employees.img
});

// export default compose(withRouter, connect(mapStateToProps, { login, returnErrors, clearErrors })(
//   LoginPage));
export default connect(mapStateToProps, {

    returnErrors,
    clearErrors,
    getEmployeeImg
})(Img);