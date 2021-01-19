
import { Group, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export class Botella extends Group{

    constructor(){
        super();
		const textureLoader = new TextureLoader();
		textureLoader.setPath("./assets/Arte 3D/Skybox/");
		var envtexture = textureLoader.load('/LowRes/nz-128.png');
		// this.groups = new Group();
		
		let loader = new GLTFLoader();

		loader.load('./assets/Arte 3D/botella/scene.gltf', (gltf)=>{			
			// const objetoX = gltf.scene.children[0];			
			gltf.scene.children.map(child => {
				const x = child;
				// intenta agregar el envmap
				x.traverse((node) => {
					if (node.isMesh) node.material.envMap = envtexture;
				  });
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