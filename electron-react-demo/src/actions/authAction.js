import axios from "axios";
import { clearErrors, returnErrors } from "./errorAction";
import {CONN_STS_ERR,CONN_STS_OK} from '../util';
//import { sendEmail } from "./sendEmailAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  RESET_FAIL,
  RESET_SUCCESS,
  GET_ERRORS,
  NO_ERROR,
  CLEAR_ERRORS,
  IMG_LOADED,
  CONNECTION_ERROR
} from "./types";
const proxy = "http://localhost:5000";
// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  console.log("loadUser called");
  // User loading
  dispatch({ type: USER_LOADING });

  
  try {
    let res = await axios
      .get(`${proxy}/api/auth/user`, tokenConfig(getState))
      
      
      if (res.data.status===CONN_STS_OK) {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
        let res = await
        axios
          .get(`${proxy}/api/auth/img`, {
            responseType: "arraybuffer",
            headers: tokenConfig(getState).headers
          })
          if (res.data.status === CONN_STS_OK) {
            
            let prefix = "data:" + r.headers["content-type"] + ";base64,";
            let data = Buffer.from(r.data, "binary").toString("base64");
            dispatch({ type: NO_ERROR });
        
            dispatch({
              type: IMG_LOADED,
              payload: prefix + data
            });
          } else {
            
            dispatch(
              returnErrors(res.data.msg, res.data.status, AUTH_ERROR)
            );
            dispatch({
              type: AUTH_ERROR
            });
          }
      } else {
                  dispatch(
              returnErrors(res.data.msg, res.data.status, AUTH_ERROR)
            );
            dispatch({
              type: AUTH_ERROR
            });
      } 
  
} catch (error) {
  console.log("Load User Action",error)
                   dispatch(
          returnErrors('Connection error', CONN_STS_ERR, CONNECTION_ERROR_LOAD_USER)
        );
}
};


// Login User
export const login = ({ phone, password }) => dispatch => {
  //dispatch(returnErrors("خطأ في تسجيل الدخول", "500", "NO ERROR"));
  dispatch({ type: USER_LOADING });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ phone, password });
  
  try {
    let res = await
    axios
      .post(`${proxy}/api/auth`, body, config)
     
      if (res.data.status === CONN_STS_OK) {
        dispatch({ type: NO_ERROR });
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        
        dispatch(loadUser());
      } else {
        
        dispatch(
          returnErrors(res.data.msg, res.data.status, LOGIN_FAIL)
        );
        dispatch({
          type: LOGIN_FAIL
        });
      }
  
} catch (error) {
  console.log("Login Action",error)
                   dispatch(
          returnErrors('Connection error', CONN_STS_ERR, CONNECTION_ERROR_LOGIN)
        );
}
};

// Logout User
export const logout = () => dispatch => {
  // return {
  //   type: LOGOUT_SUCCESS
  // };
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(clearErrors());
};

// Setup config/headers and token

export const tokenConfig = getState => {
  // Get token from loacalStorage

  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};



