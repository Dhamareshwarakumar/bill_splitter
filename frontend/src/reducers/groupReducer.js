import { ADD_GROUPS } from "../actions/types";

const initialState = []

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GROUPS:
            return action.payload;
        default:
            return state;
    }
}


export default groupReducer;