
import { Group, LoadingManager, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Observer, {EVENTS} from '../Observer';

export class Botella extends Group{

    constructor(){
		super();
		// loading-------------------------
		const manager = new LoadingManager();
		manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
		console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
		};
		manager.onLoad = function ( ) {
			console.log( 'Loading complete!');
		};		
		manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
			var percentComplete = itemsLoaded / itemsTotal;
			Observer.emit(EVENTS.LOADING,percentComplete,url);
		};
		// 
		const textureLoader = new TextureLoader();
		textureLoader.setPath("./assets/Arte 3D/");
		const envtexture = textureLoader.load('Skybox//LowRes/nz-128.png');
		const materialLiquido = textureLoader.load('botella/textures/Beer_Liquid_baseColor.jpeg')
		// this.groups = new Group();
		
		let loader = new GLTFLoader(manager);

		loader.load('./assets/Arte 3D/botella/scene.gltf', (gltf)=>{						
			// liquidoBotella.material.normalMap = materialLiquido			
			// liquidoBotella.scale.x = 0.02
			// liquidoBotella.scale.y = 0.02
			// liquidoBotella.scale.z = 0.02
			// // liquidoBotella.material.envMap = envtexture
			// // liquidoBotella.position.set(0,0,0)
			// this.add(liquidoBotella)

			

			gltf.scene.children.map(child => {
				// const liquidoBotella = child.getObjectByName('Liquid_Beer_Liquid_0');
				// this.add(liquidoBotella)
				const x = child;
				this.add(x) 
			})
			this.scale.x=45;
			this.scale.y=45;
			this.scale.z=45;
			this.position.set(0,0,0)
			// this.add(this.groups);
		  },);
		
		
    }

}