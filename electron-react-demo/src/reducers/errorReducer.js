import { GET_ERRORS, CLEAR_ERRORS, NO_ERROR } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: GET_ERRORS
      };

    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: CLEAR_ERRORS
      };

    case NO_ERROR:
      return {
        msg: {},
        status: null,
        id: NO_ERROR
      };

    default:
      return state;
  }
}
