
import { Group, LoadingManager, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Observer, {EVENTS} from '../Observer';

export class Botella extends Group{

    constructor(){
		super();
		// loading-------------------------
		const manager = new LoadingManager();
		manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
		// console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
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
			// const liquidoBotella = child.getObjectByName('Liquid_Beer_Liquid_0');
			// const x = child.getObjectByName('Label_Beer_Label_0');
			// const Bubbles_Beer_Bubbles_0 = child.getObjectByName("Bubbles_Beer_Bubbles_0");
			// const Bottle_Beer_Bottle_0 = child.getObjectByName("Bottle_Beer_Bottle_0");
			// const Foam_BubblesTop_0 = child.getObjectByName("Foam_BubblesTop_0");
			// const Bubbles_bubbles_0= child.getObjectByName("Geometric Bubbles_bubbles_0");
			// console.log(liquidoBotella.scale)
			// this.add(liquidoBotella,x,Bubbles_Beer_Bubbles_0,Bottle_Beer_Bottle_0,Foam_BubblesTop_0,Bubbles_bubbles_0)
			// // const x = child;
			

			gltf.scene.children.map(child => {
				// const liquidoBotella = child.getObjectByName('Liquid_Beer_Liquid_0');
				// this.add(liquidoBotella)
				// const x = child;
				const y = child.getObjectByName('RootNode');
				y.position.set(0,0,0)
				const z = y.getObjectByName('Bottle_Beer_Bottle_0');				
				this.add(y) 
			})
			this.scale.x=45;
			this.scale.y=45;
			this.scale.z=45;
			this.position.set(0,0,0)
			// this.add(this.groups);
		  },);
		
		
    }

}