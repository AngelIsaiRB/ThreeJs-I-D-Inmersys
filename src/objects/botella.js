
import { update } from '@tweenjs/tween.js';
import { AnimationMixer, Clock, Group, Mesh, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";
import Observer, {EVENTS} from '../Observer';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

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
			this.liquid.material.depthWrite=true;
			this.tap = gltf.scene.children[0].getObjectByName('0');
			this.tap.callback = function(){
				console.log("chapa")
			}
			this.capOpener = gltf.scene.children[0].getObjectByName('Cap_Opener');
			// this.liquid= this.children[0].getObjectByName('BeerBottle').children[0];


			this.add(gltf.scene);
			this.scale.x=45;
			this.scale.y=45;
			this.scale.z=45;
			this.position.set(0,0,0)
			this.mixer = new AnimationMixer( gltf.scene );
			gltf.animations.forEach( ( clip ) => {
				this.mixer.clipAction( clip ).play();
				
			} );
			console.log(this.children[0].getObjectByName("Liquid_Beer_Liquid_0").material)
			const gui = new GUI();
			const text = gui.addFolder('botella properties');
			text.add(this.liquid.material, 'aoMapIntensity', 0.0, 5.0).listen();
			text.addColor(this.liquid.material, "color").listen();
			text.addColor(this.liquid.material, "emissive").listen();
			text.add(this.liquid.material, "opacity",0.0,1.0).listen();
			text.add(this.liquid.material, "envMapIntensity",0.0,2.0).listen();
			text.add(this.liquid.material, "metalness",0.0,10.0).listen();
			text.add(this.liquid.material, "envMapIntensity",0.0,10.0).listen();
			text.add(this.liquid.material, "polygonOffset",false,true).listen(); //mm
			text.add(this.liquid.material, "polygonOffsetFactor",0.0,10.0).listen();
			text.add(this.liquid.material, "polygonOffsetUnits",0.0,10.0).listen();
			text.add(this.liquid.material, "wireframe",false,true).listen(); //mm
			text.add(this.liquid.material, "depthWrite",false,true).listen(); //mm
			text.add(this.liquid.material, "visible",false,true).listen(); //mm

			text.open();
		  },);
		
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
					this.capOpener.visible=false;			
				}
				
			}
			  
		}

}