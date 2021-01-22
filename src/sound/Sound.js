import { Audio, AudioLoader } from "three";

export class Sound extends Audio{

    constructor(listener){
        super();
        this.listener=listener;        
        this.create();
    }
    create(){
        const audioLoader = new AudioLoader();
        audioLoader.load("./assets/sfx_open_bottle.wav", (buffer)=>{
            console.log(buffer)
            this.setBuffer(buffer);
            this.setLoop(true);
            this.setVolume(1);
            this.play();
        });
    }

}