import EventEmitter from "eventemitter3";

export const EVENTS = {
    START: 'START',
    LOADING: 'LOADING',
    LODING_OK: 'LODING_OK',
    LIQUID_CHANGE: 'LIQUID_CHANGE',
    MOVE_MOUSE: 'MOVE_MOUSE',
    RUN_ANIMATION: 'RUN_ANIMATION',
    RUN_END: 'RUN_ENDED',
}

const Observer = new EventEmitter();
export default Observer;
