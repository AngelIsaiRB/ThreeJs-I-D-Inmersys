import { Scene, Color, DirectionalLight,Group, HemisphereLight,AxesHelper, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Botella } from '../objects/botella';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { ColorGUIHelper } from '../assets/models/ColorGuiHelper';
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


		const axesHelper = new AxesHelper( 5 );
		this.add( axesHelper );
		
		const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
		const light = new DirectionalLight(0xffffff, 1.0);
		this.add(light, ambientLight);


		// 	helpers
		const gui = new GUI();
		const folderMaster = gui.addFolder('escena');
		const cam = gui.addFolder('botella');
		cam.add(botella.position, 'y', 0, 100).listen();
		cam.add(botella.position, 'x', 0, 100).listen();
		cam.add(botella.position, 'z', 0, 100).listen();
		cam.add(botella.rotation, 'x', 0, 2).listen();
		cam.add(botella.rotation, 'y', 0, 2).listen();
		cam.add(botella.rotation, 'z', 0, 2).listen();
		cam.open();
		const ambientLightHelpergui = gui.addFolder('luz ambiente');
		ambientLightHelpergui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		ambientLightHelpergui.add(ambientLight, 'intensity', 0, 2, 0.01);
		ambientLightHelpergui.open();
		const directionalLightHelpergui = gui.addFolder('luz direccional');
		directionalLightHelpergui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
		directionalLightHelpergui.add(light, 'intensity', 0, 2, 0.01);
		directionalLightHelpergui.open();
		folderMaster.open();


		// gui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		// gui.add(light, 'intensity', 0, 2, 0.01);
		// 
	}

	update() {

	}
}

export default Scene1;
