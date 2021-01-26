import {  Clock, Sprite, SpriteMaterial, TextureLoader } from "three";
import Observer, { EVENTS } from "../Observer";
import { SpriteMixer } from '../utils/SpriteMixer';
export class SpritePerzonalized  {

    constructor(scene,path){
        this.conterRandom=0
        this.clock = new Clock();
		this.spriteMixer = SpriteMixer();
		this.spriteMixer.addEventListener('finished', (e)=> {
			
		});

		this.spriteMixer.addEventListener('loop', (e)=> {
			
		});
		const loadersprite = new TextureLoader();
		let actions = {};
		loadersprite.load(path, (texture)=> {

			this.actionSprite = this.spriteMixer.ActionSprite( texture, 8, 4 );
			this.actionSprite.setFrame( 1 );

			actions.runRight = this.spriteMixer.Action(this.actionSprite, 0, 29, 25);
			
			this.actionSprite.scale.set(1.7, 2, 1);
			scene.add( this.actionSprite );
            actions.runRight.playLoop();
            this.actionSprite.visible=false;
            this.actionSprite.scale.set(6,6,6)
		});
       this.events();
    }
    events(){
        Observer.on(EVENTS.PLAY_VIDEO2, ()=>{
			(!this.actionSprite.visible) ? this.actionSprite.visible=true : this.actionSprite.visible=false 
		})
    }
    update(){
        let delta = this.clock.getDelta();        
		this.spriteMixer.update( delta );
        this.conterRandom +=1
		if (this.conterRandom >= 100) {
            this.actionSprite.position.set(-6 + (Math.floor(Math.random() * 5) + 1),Math.floor(Math.random() * 10) + 8,0);
			this.conterRandom=0;
		}
    }

}