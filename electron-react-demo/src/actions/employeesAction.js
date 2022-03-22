import axios from "axios";
import {
  AUTH_ERROR,
  EMPLOYEE_ADDED,
  EMPLOYEES_LOADED,
  EMPLOYEES_LOADING,
  EMPLOYEE_IMG_LOADING,
  EMPLOYEE_IMG_LOADED,
  NO_ERROR
} from "./types";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";
const proxy = "http://localhost:5000";



// Check token & load user
export const getEmployees = () => (dispatch, getState) => {
  console.log("getEmployees called");

  dispatch({ type: EMPLOYEES_LOADING });

//   (async(){
//     //Bunch of code...
// })();
  try {
    let res = await axios
      .post(`${proxy}/api/employees`, tokenConfig(getState))

      if (res.status === 'OK') {
        
        dispatch({
          type: EMPLOYEES_LOADED,
          payload: res.data
        });
      } else {
        dispatch(
          returnErrors(err.response.data, err.response.status, AUTH_ERROR)
        );
        dispatch({
          type: AUTH_ERROR
        });
        
      }

  } catch (err) {
          dispatch(
          returnErrors('Connection error', 'ERR', CONNECTION_ERROR_GET_EMPLOYEES)
        );
  }




};

export const getEmployeeImg = ({ phone }) => (dispatch, getState) => {
  console.log("getEmployeeImg called");
  const headers = tokenConfig(getState).headers;
  headers.phone = phone;
  dispatch({ type: EMPLOYEE_IMG_LOADING });


  try {
    
    let res = await
    axios
      .get(`${proxy}/api/employees/getImg`, {
        responseType: "arraybuffer",
        headers: headers
      })
  
  
      if (res.status === 'OK') {
        
        let prefix = "data:" + res.headers["content-type"] + ";base64,";
        let data = Buffer.from(res.data, "binary").toString("base64");
        //dispatch({ type: NO_ERROR });
  
        dispatch({
          type: EMPLOYEE_IMG_LOADED,
          payload: prefix + data
        });
      } else {
        
        dispatch(
          returnErrors(err.response.data, err.response.status, AUTH_ERROR)
        );
        dispatch({
          type: AUTH_ERROR
        });
      }
  } catch (error) {
              dispatch(
          returnErrors('Connection error', 'ERR', CONNECTION_ERROR_GET_EMPLOYEE_IMG)
        );
  }

};

export const addEmployee = ({ name, phone, password, nationality, type }) => (
  dispatch,
  getState
) => {
  console.log("addEmployee called");

  dispatch({ type: EMPLOYEES_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, phone, password, nationality, type });

  
  try {
    let res = await axios
      .post(`${proxy}/api/employees/add`, body, tokenConfig(getState))
    
      
      if (res.status==='OK') {
        dispatch({
          type: EMPLOYEE_ADDED,
          payload: res.data
        });
        
        dispatch(getEmployees());
      } else {
        
        dispatch(
          returnErrors(err.response.data, err.response.status, AUTH_ERROR)
        );
        dispatch({
          type: AUTH_ERROR
        });
      }
   
 } catch (error) {
                 dispatch(
          returnErrors('Connection error', 'ERR', CONNECTION_ERROR_GET_EMPLOYEE_ADD)
        );
 }
};
