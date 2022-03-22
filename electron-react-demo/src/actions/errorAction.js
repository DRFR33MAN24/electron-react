import { GET_ERRORS, CLEAR_ERRORS, NO_ERROR } from "./types";

// return errors

export const returnErrors = (msg, status, id = null) => {
  return {
    type: id,
    payload: {
      msg,
      status,
      id
    }
  };
};

//Clear Errors

export const clearErrors = () => {
  return {
    type: NO_ERROR,
    payload: {
      msg: "",
      status: "",
      id: NO_ERROR
    }
  };
};
