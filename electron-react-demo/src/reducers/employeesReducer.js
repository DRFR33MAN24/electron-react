import { EMPLOYEES_LOADING, EMPLOYEES_LOADED } from "../actions/types";

const initialState = {
    employees: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case EMPLOYEES_LOADED:

            return {
                ...state,
                employees: action.payload

            };
        case EMPLOYEES_LOADING:

            return {


            };



        default:
            return state;
    }
}