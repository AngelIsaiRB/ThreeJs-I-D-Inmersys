import {  Sprite, SpriteMaterial, TextureLoader } from "three";

export class SpritePerzonalized extends Sprite{

    constructor(path){
        super();
        this.conterRandom=0
        const map = new TextureLoader().load(path,(texture)=>{
            const materialC = new SpriteMaterial( { map: texture, color: 0xffffff, fog: true } );
            this.material =materialC;
        });
       
        // this.material = new SpriteMaterial({map:map})
    }
    update(){
        // this.conterRandom +=1
		// if (this.conterRandom >= 35) {
		// 	this.position.set(-6 + (Math.floor(Math.random() * 5) + 1),Math.floor(Math.random() * 12) + 10,0);
		// 	this.conterRandom=0;
		// }
    }

}