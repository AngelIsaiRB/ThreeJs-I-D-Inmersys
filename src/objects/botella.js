
import { update } from '@tweenjs/tween.js';
import { AnimationMixer, BackSide, Clock, CubeRefractionMapping, CubeTextureLoader, CubeUVRefractionMapping, DoubleSide, FrontSide, Group, ImageUtils, Mesh, MeshPhongMaterial, PMREMGenerator, RGBFormat, TextureLoader, UnsignedByteType } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader.js';
import Observer, {EVENTS} from '../Observer';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

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

		// const cubeTextureLoader = new CubeTextureLoader();
		//  this.refractionCube = cubeTextureLoader.load( './assets/Arte 3D/HDRI/Env360.hdr' );
		// 		this.refractionCube.mapping = CubeRefractionMapping;
		// 		this.refractionCube.format = RGBFormat;
		const cubeTextureLoader = new RGBELoader();

		const envMaps = ( function () {

			const refractionCube = cubeTextureLoader.load(  './assets/Arte 3D/HDRI/Env360.hdr');
			refractionCube.mapping = CubeRefractionMapping;
			refractionCube.format = RGBFormat;
			console.log(refractionCube)
			return refractionCube

		} )();

		const sides = {
			FrontSide,
			BackSide,
			DoubleSide
		}
		// 
		
		let loader = new GLTFLoader(managerLoader);

		loader.load('./assets/Arte 3D/botella/scene.gltf', (gltf)=>{						
			this.liquid = gltf.scene.children[0].getObjectByName('Liquid_Beer_Liquid_0');
			// this.liquid.scale.set(1,1,0.9)
			this.liquid.material.opacity=0.8;
			this.liquid.material.metalness = 1.20
			this.liquid.material.roughness = 0.24
			
			// this.liquid.material.transparent=false;
			this.tap = gltf.scene.children[0].getObjectByName('0');
			this.capOpener = gltf.scene.children[0].getObjectByName('Cap_Opener');
			this.bottle =gltf.scene.children[0].getObjectByName('Bottle_Beer_Bottle_0');
			this.bottle.renderOrder=0;
			// this.bottle.material.opacity=1;
			// this.bottle.material.transparent = false;			
			this.liquid.renderOrder=-1;
			
			// this.bottle.material.emissiveMap = envMaps;
			
			this.liquid.material.side = FrontSide;
			this.bottle.material.side = BackSide;			
			console.log(this.liquid)


			// 
			const urls = [
				"./assets/Arte 3D/HDRI/jpg/Env_px.jpg","./assets/Arte 3D/HDRI/jpg/Env_nx.jpg",
				"./assets/Arte 3D/HDRI/jpg/Env_py.jpg","./assets/Arte 3D/HDRI/jpg/Env_ny.jpg",
				"./assets/Arte 3D/HDRI/jpg/Env_pz.jpg","./assets/Arte 3D/HDRI/jpg/Env_nz.jpg",
			]
			const textureCube = new CubeTextureLoader().load( urls );
			textureCube.mapping = CubeRefractionMapping;
			// this.liquid.material.envMap = textureCube
			// this.liquid.material.refractionRatio = 0.5
			// this.liquid.material.reflectivity = 0.5
			// this.liquid.material = new MeshPhongMaterial( {  envMap: textureCube, refractionRatio: 0.98, reflectivity: 0.9 } );				
			console.log(this.bottle)
			// 
			// this.liquid.scale.set(0.99,0.99,0.99)			
			this.foam =gltf.scene.children[0].getObjectByName('Foam_BubblesTop_0');
			// this.liquid= this.children[0].getObjectByName('BeerBottle');
			this.add(gltf.scene);
			this.scale.x=45;
			this.scale.y=45;
			this.scale.z=45;
			this.position.set(0,0,0)
			this.mixer = new AnimationMixer( gltf.scene );
			gltf.animations.forEach( ( clip ) => {
				this.mixer.clipAction( clip ).play();
			} );
			const gui = new GUI();
			const text = gui.addFolder('Liquido properties');
			text.add(this.liquid.material, 'aoMapIntensity', 0.0, 5.0).listen();
			text.addColor(this.liquid.material, "color").listen();
			text.addColor(this.liquid.material, "emissive").listen();
			text.add(this.liquid.material, "opacity",0.0,1.0).listen();
			text.add(this.liquid.material, "alphaTest",0.0,1.0).listen();
			text.add(this.liquid.position, "x",-2.0,2.0).listen();
			text.add(this.liquid.position, "y",-2.0,2.0).listen();
			text.add(this.liquid.position, "z",-2.0,2.0).listen();
			text.add(this.liquid.scale, "x",-2.0,2.0).listen();
			text.add(this.liquid.scale, "y",-2.0,2.0).listen();
			text.add(this.liquid.scale, "z",-2.0,2.0).listen();
			text.add(this.liquid.material, "roughness",0.0,1.0).listen();
			text.add(this.liquid.material, "envMapIntensity",0.0,2.0).listen();
			text.add(this.liquid.material, "metalness",0.0,10.0).listen();
			text.add(this.liquid.material, "envMapIntensity",0.0,10.0).listen();
			text.add(this.liquid.material, "refractionRatio",0.0,1.0).listen();
			text.add(this.liquid.material, "polygonOffset",false,true).listen(); //mm
			text.add(this.liquid.material, "polygonOffsetFactor",0.0,10.0).listen();
			text.add(this.liquid.material, "polygonOffsetUnits",0.0,10.0).listen();
			// text.add(this.liquid.material, "side",sides).listen();
			text.add(this.liquid.material, "wireframe",false,true).listen(); //mm
			text.add(this.liquid.material, "depthTest",false,true).listen(); //mm
			text.add(this.liquid.material, "transparent",false,true).listen(); //mm
			text.add(this.liquid.material, "depthWrite",false,true).listen(); //mm
			text.add(this.liquid.material, "visible",false,true).listen(); //mm
			text.close();

			const textbottle = gui.addFolder('botella properties');
			textbottle.add(this.bottle.material, 'aoMapIntensity', 0.0, 5.0).listen();
			textbottle.addColor(this.bottle.material, "color").listen();
			textbottle.addColor(this.bottle.material, "emissive").listen();
			textbottle.add(this.bottle.position, "x",-2.0,2.0).listen();
			textbottle.add(this.bottle.position, "y",-2.0,2.0).listen();
			textbottle.add(this.bottle.position, "z",-2.0,2.0).listen();
			textbottle.add(this.bottle.scale, "x",-2.0,2.0).listen();
			textbottle.add(this.bottle.scale, "y",-2.0,2.0).listen();
			textbottle.add(this.bottle.scale, "z",-2.0,2.0).listen();
			textbottle.add(this.bottle.material, "opacity",0.0,1.0).listen();
			textbottle.add(this.bottle.material, "alphaTest",0.0,1.0).listen();
			textbottle.add(this.bottle.material, "roughness",0.0,1.0).listen();
			textbottle.add(this.bottle.material, "envMapIntensity",0.0,2.0).listen();
			textbottle.add(this.bottle.material, "metalness",0.0,10.0).listen();
			textbottle.add(this.bottle.material, "envMapIntensity",0.0,10.0).listen();
			textbottle.add(this.bottle.material, "refractionRatio",0.0,6.0).listen();
			textbottle.add(this.bottle.material, "polygonOffset",false,true).listen(); //mm
			textbottle.add(this.bottle.material, "polygonOffsetFactor",0.0,10.0).listen();
			textbottle.add(this.bottle.material, "polygonOffsetUnits",0.0,10.0).listen();
			textbottle.add(this.bottle.material, "side",0.0,2.0).listen();
			textbottle.add(this.bottle.material, "wireframe",false,true).listen(); //mm
			textbottle.add(this.bottle.material, "transparent",false,true).listen(); //mm
			textbottle.add(this.bottle.material, "depthWrite",false,true).listen(); //mm
			textbottle.add(this.bottle.material, "depthTest",false,true).listen(); //mm
			textbottle.add(this.bottle.material, "visible",false,true).listen(); //mm
			textbottle.close();
			const textfoam = gui.addFolder('espuma properties');
			textfoam.add(this.foam.material, 'aoMapIntensity', 0.0, 5.0).listen();
			textfoam.addColor(this.foam.material, "color").listen();
			textfoam.addColor(this.foam.material, "emissive").listen();
			textfoam.add(this.foam.material, "opacity",0.0,1.0).listen();
			textfoam.add(this.foam.material, "alphaTest",0.0,1.0).listen();
			textfoam.add(this.foam.material, "roughness",0.0,1.0).listen();
			textfoam.add(this.foam.material, "envMapIntensity",0.0,2.0).listen();
			textfoam.add(this.foam.material, "metalness",0.0,10.0).listen();
			textfoam.add(this.foam.material, "envMapIntensity",0.0,10.0).listen();
			textfoam.add(this.foam.material, "polygonOffset",false,true).listen(); //mm
			textfoam.add(this.foam.material, "polygonOffsetFactor",0.0,10.0).listen();
			textfoam.add(this.foam.material, "polygonOffsetUnits",0.0,10.0).listen();
			textfoam.add(this.foam.material, "wireframe",false,true).listen(); //mm
			textfoam.add(this.foam.material, "transparent",false,true).listen(); //mm
			textfoam.add(this.foam.material, "depthWrite",false,true).listen(); //mm
			textfoam.add(this.foam.material, "visible",false,true).listen(); //mm
			textfoam.close();

			// --------------------

		  },);
		this.events();
		}
		events(){
			Observer.on(EVENTS.LIQUID_CHANGE, ()=>{
				if(this.liquid.material.color.r  <= 2){
					const changeColor = new TWEEN.Tween(this.liquid.material.color)
					.to({
						r:41,
					}
					,1200)
					.easing(TWEEN.Easing.Linear.None)
					.onComplete(()=>{
						
					});		
					changeColor.start();
				}
				else{
					const changeColor = new TWEEN.Tween(this.liquid.material.color)
					.to({
						r:1,
					}
					,1200)
					.easing(TWEEN.Easing.Linear.None)
					.onComplete(()=>{
						
					});		
					changeColor.start();
				}
				  
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