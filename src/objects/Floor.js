
import { Group,  TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Observer, {EVENTS} from '../Observer';

export class Floor extends Group{

    constructor(){

        super();
        const textureLoader = new TextureLoader();
		textureLoader.setPath("./assets/Arte 3D/textures/");
		
		let loader = new GLTFLoader();

		loader.load('./assets/Arte 3D/scene.gltf', (gltf)=>{			
			const objetoX = gltf.scene.children[0];
			this.scale.x=2;
			this.scale.y=2;
			this.scale.z=2;
			this.add(objetoX);
		  },);

    }
}