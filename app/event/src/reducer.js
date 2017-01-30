import Moment from 'moment';

const initialState = {
    currentTime: null,
    duration: null,
    endTime: null
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TIMER':
            return Object.assign({}, state, {
                duration: action.duration,
                endTime: action.endTime
            });
        case 'SET_CURRENT_TIME':
            console.log("ticking");
            return Object.assign({}, state, {
                currentTime: Moment().format(),
            });
        default:
            return state;
    }
}

export default rootReducer;
