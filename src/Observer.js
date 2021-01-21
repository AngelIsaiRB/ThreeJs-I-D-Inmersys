import EventEmitter from "eventemitter3";

export const EVENTS = {
    START: 'START',
    LOADING: 'LOADING',
    LODING_OK: 'LODING_OK',
    LIQUID_CHANGE: 'LIQUID_CHANGE',
}

const Observer = new EventEmitter();
export default Observer;
