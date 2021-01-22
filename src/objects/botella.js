
import { update } from '@tweenjs/tween.js';
import { AnimationMixer, Clock, Group, Mesh, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";
import Observer, {EVENTS} from '../Observer';

export class Botella extends Mesh{

    constructor(managerLoader){
		super();
		
		// 
		this.clock = new Clock();
		this.liquid;
		this.tap;
		this.destp1;
		this.destp2;
		const textureLoader = new TextureLoader();
		textureLoader.setPath("./assets/Arte 3D/");
		const envtexture = textureLoader.load('Skybox//LowRes/nz-128.png');
		const materialLiquido = textureLoader.load('botella/textures/Beer_Liquid_baseColor.jpeg')
		// this.groups = new Group();
		
		let loader = new GLTFLoader(managerLoader);

		loader.load('./assets/Arte 3D/botella/scene.gltf', (gltf)=>{						
			this.liquid = gltf.scene.children[0].getObjectByName('Liquid_Beer_Liquid_0');
			this.tap = gltf.scene.children[0].getObjectByName('0');
			this.tap.callback = function(){
				console.log("chapa")
			}						
			this.destp1 = gltf.scene.children[0].getObjectByName('BottleOpener.001');
			this.destp2 = gltf.scene.children[0].getObjectByName('BottleOpener.002_W_BottleOpener_wood_0');
			this.add(gltf.scene);
			this.scale.x=45;
			this.scale.y=45;
			this.scale.z=45;
			this.position.set(0,0,0)
			this.mixer = new AnimationMixer( gltf.scene );
			gltf.animations.forEach( ( clip ) => {
				this.mixer.clipAction( clip ).play();
				
			} );
			// console.log(this.children[0].getObjectByName('BottleOpener.001_W_BottleOpener_0'))
			// this.add(this.groups);
		  },);
		//   console.log(this.children[0].getObjectByName("0"))
		this.events();
		}
		events(){
			Observer.on(EVENTS.LIQUID_CHANGE, ()=>{
				console.log(this.liquid.material.color)
				this.liquid.material.color.set(0xff0000)
				// const changeColor = new TWEEN.Tween(this.liquid.material.color)
				// .to(()=>{
				// 	console.log("ejecuting")
				// 	set(255,0,0)
				// }
				// ,1200)
				// .easing(TWEEN.Easing.Sinusoidal.In)
				// .onComplete(()=>{
					
				// });		
				// changeColor.start();
				  
			  });
		}
		update(){
			TWEEN.update();
			let delta = this.clock.getDelta();

			if(this.mixer.time >= 1.9 && this.mixer.time <= 2){
				Observer.emit(EVENTS.PLAY_AUDIO);
			}
			  if ( this.mixer ){
				if(this.mixer.time <= 6)
				this.mixer.update( delta );
				else{
					// this.liquid.visible = false;
					this.tap.visible=false;					
				}
				
			}
			  
		}

}