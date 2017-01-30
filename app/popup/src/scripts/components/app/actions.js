export const SET_TIMER = 'SET_TIMER';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';

export function setTimer(duration, endTime) {
    return {
        type: SET_TIMER,
        duration,
        endTime
    };
}

export function setCurrentTime() {
    return {
        type: SET_CURRENT_TIME,
    };
}
