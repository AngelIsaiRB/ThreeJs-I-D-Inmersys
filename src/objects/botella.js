
import { update } from '@tweenjs/tween.js';
import { AnimationMixer, Clock, Group, Mesh, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
			this.add(gltf.scene);
			this.liquid = gltf.scene.children[0].getObjectByName('Liquid_Beer_Liquid_0');
			this.tap = gltf.scene.children[0].getObjectByName('0');
			this.destp1 = gltf.scene.children[0].getObjectByName('BottleOpener.001');
			this.destp2 = gltf.scene.children[0].getObjectByName('BottleOpener.002_W_BottleOpener_wood_0');
			console.log( this.destp1)
			// gltf.scene.children.map(child => {
			// 	// const liquidoBotella = child.getObjectByName('Liquid_Beer_Liquid_0');
			// 	// this.add(liquidoBotella)
			// 	// const x = child;
			// 	const y =  child;
			// 	// const y = child.getObjectByName('RootNode');
			// 	// y.traverse(n =>{
			// 	// 	if(n.isMesh){
			// 	// 		n.castShadow=true;
			// 	// 		n.receiveShadow=true;
			// 	// 		if(n.material.map) n.material.map.anisotropy = 16				
			// 	// 	}
			// 	// })
			// 	// const z = y.getObjectByName('Liquid_Beer_Liquid_0');
			// 	// y.getObjectByName('Liquid_Beer_Liquid_0').material.color.set(0xff8e1c)
			// 	// y.getObjectByName("Bottle_Beer_Bottle_0").material.transparent= true;
			// 	// y.getObjectByName("Bottle_Beer_Bottle_0").material.opacity= 0.1;

			// 	// y.getObjectByName("Bottle_Beer_Bottle_0").material.reflectivity= 0.9;

				
			// 	this.add(y) 
			// })
			this.scale.x=45;
			this.scale.y=45;
			this.scale.z=45;
			this.position.set(0,0,0)
			 this.mixer = new AnimationMixer( gltf.scene );
        gltf.animations.forEach( ( clip ) => {
			this.mixer.clipAction( clip ).play();
			
        } );
			// this.add(this.groups);
		  },);
		//   console.log(this.children[0].getObjectByName("0"))
		
		}
		update(){
			let delta = this.clock.getDelta();
			
			  if ( this.mixer ){
				if(this.mixer.time <= 6)
				this.mixer.update( delta );
				else{
					// this.liquid.visible = false;
					this.tap.visible=false;
					// this.destp1.visible=false;
					// this.destp2.visible=false;
				}
				
			}
			  
		}

}