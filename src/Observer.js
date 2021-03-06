import EventEmitter from "eventemitter3";

export const EVENTS = {
    START: 'START',
    LOADING: 'LOADING',
    LODING_OK: 'LODING_OK',
    LIQUID_CHANGE: 'LIQUID_CHANGE',
    MOVE_MOUSE: 'MOVE_MOUSE',
    RUN_ANIMATION: 'RUN_ANIMATION',
    RUN_END: 'RUN_ENDED',
    PLAY_AUDIO: 'PLAY_AUDIO',
    PLAY_VIDEO2: 'PLAY_VIDEO2',
    CHANGE_MATERIAL: 'CHANGE_MATERIAL',
}

const Observer = new EventEmitter();
export default Observer;
