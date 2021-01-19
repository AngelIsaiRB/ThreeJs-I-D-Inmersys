import EventEmitter from "eventemitter3";

export const EVENTS = {
    START: 'START',
    LOADING: 'LOADING'
}

const Observer = new EventEmitter();
export default Observer;
