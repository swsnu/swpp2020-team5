import * as actionTypes from '../../actions/actionTypes.js';

const initialState = {
    currentUser: {id: 0, preferenceVector:{factor_one: 3, factor_two: 2, factor_three: 5}},
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {...state, currentUser: action.target};
        case actionTypes.CHANGE_PREFERENCE_VECTOR:
            let updatedUser = action.target;
            return {...state, currentUser: updatedUser};
        default: break;
    }
    return state;
}

export default reducer;
