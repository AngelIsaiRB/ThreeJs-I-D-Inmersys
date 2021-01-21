
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
			this.add(gltf.scene);
			

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
			// this.add(this.groups);
		  },);
		
		
    }

}