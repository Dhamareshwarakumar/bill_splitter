import { SET_USERS } from "../actions/types"


const initialState = []

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;