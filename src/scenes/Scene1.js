import { Scene, Color, DirectionalLight,Group, HemisphereLight,AxesHelper, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Botella } from '../objects/botella';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
class Scene1 extends Scene {
	constructor() {
		super();
		this.background = new Color('skyblue').convertSRGBToLinear();
		this.create();
	}

	create() {

		// -------------------botella
		const textureLoader = new TextureLoader();
		textureLoader.setPath("./assets/Arte 3D/textures/");
		this.groups = new Group();
		
		let loader = new GLTFLoader();

		loader.load('./assets/Arte 3D/scene.gltf', (gltf)=>{			
			const objetoX = gltf.scene.children[0];
			this.groups.add(objetoX);
			this.groups.scale.x=8;
			this.groups.scale.y=8;
			this.groups.scale.z=8;
			this.add(this.groups);
		  },);

		// ---------------------------------	----------------------------------------
		//   botella

		  const botella = new Botella()
		  this.add(botella)

		// ---------------------------------


		// 	helpers
		var gui = new GUI();

		var cam = gui.addFolder('botella');
		cam.add(botella.position, 'y', 0, 100).listen();
		cam.add(botella.position, 'x', 0, 100).listen();
		cam.add(botella.position, 'z', 0, 100).listen();
		cam.add(botella.rotation, 'x', 0, 2).listen();
		cam.add(botella.rotation, 'y', 0, 2).listen();
		cam.add(botella.rotation, 'z', 0, 2).listen();
		cam.open();

		// 
		const axesHelper = new AxesHelper( 5 );
		this.add( axesHelper );

		const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
		const light = new DirectionalLight(0xffffff, 1.0);
		this.add(light, ambientLight);
	}

	update() {

	}
}

export default Scene1;
