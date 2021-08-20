import { CHANGE_SEARCH_FIELD } from './constants';

const initialState = {
    searchfield: ""
};

export const searchRobots = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state.searchfield, { searchfield: action.payload });
        default:
            return state;
    }
}