import { EMPLOYEES_LOADING, EMPLOYEES_LOADED } from "../actions/types";

const initialState = {
  employees: [],
  employeeImg: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case EMPLOYEES_LOADED:
      return {
        ...state,
        employees: action.payload
      };
    case EMPLOYEES_LOADING:
      return {
        ...state
      };

    case EMPLOYEE_IMG_LOADED:
      employeeImg.push(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
}
