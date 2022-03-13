import axios from "axios";
import {
    AUTH_ERROR,

    EMPLOYEES_LOADED,
    EMPLOYEES_LOADING
} from './types'
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";
const proxy = "http://localhost:5000";
// Check token & load user
export const getEmployees = () => (dispatch, getState) => {
    console.log("getEmployees called");

    dispatch({ type: EMPLOYEES_LOADING });

    axios
        .post(`${proxy}/api/employees`, tokenConfig(getState))
        .then(res => {

            dispatch({
                type: EMPLOYEES_LOADED,
                payload: res.data
            });
        })

        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, AUTH_ERROR)
            );
            dispatch({
                type: AUTH_ERROR
            });
        });
};