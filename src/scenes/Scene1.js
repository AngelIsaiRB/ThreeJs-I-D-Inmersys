import { Scene, Color, DirectionalLight, HemisphereLight,AxesHelper, CubeTextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Botella } from '../objects/botella';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { ColorGUIHelper } from '../assets/models/ColorGuiHelper';
import { Floor } from '../objects/Floor';
import { Cube } from '../objects/Cube';
import Observer, { EVENTS } from '../Observer';
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";
class Scene1 extends Scene {
	constructor() {
		super();
		// this.background = new Color('black').convertSRGBToLinear();
		this.create();
		this.events();
	}

	create() {

		// background
		const urls = [
			"./assets/Arte 3D/Skybox/HighRes/px.jpg","./assets/Arte 3D/Skybox/HighRes/nx.jpg",
			"./assets/Arte 3D/Skybox/HighRes/py.jpg","./assets/Arte 3D/Skybox/HighRes/ny.jpg",
			"./assets/Arte 3D/Skybox/HighRes/pz.jpg","./assets/Arte 3D/Skybox/HighRes/nz.jpg",
		]
		const loader = new  CubeTextureLoader();
		
		this.background = loader.load(urls)
		


		// -------------------escenario
		const floor = new Floor();
		this.add(floor)
		// ---------------------------------	----------------------------------------
		//   botella

		  const botella = new Botella()
		  this.add(botella)

		// ---------------------------------
		// -------------cubo para fade in
			 this.cube = new Cube(60);
			this.cube.position.z=6
			this.add(this.cube);
		// 

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
		// cam.add(this.cube.material, 'opacity', 0.0, 1).listen();
		
		cam.open();
		const ambientLightHelpergui = gui.addFolder('luz ambiente');
		ambientLightHelpergui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		ambientLightHelpergui.add(ambientLight, 'intensity', 0, 20, 0.01);
		ambientLightHelpergui.open();
		const directionalLightHelpergui = gui.addFolder('luz direccional');
		directionalLightHelpergui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
		directionalLightHelpergui.add(light, 'intensity', 0, 20, 0.01);
		directionalLightHelpergui.open();
		folderMaster.open();
		

		// gui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		// gui.add(light, 'intensity', 0, 2, 0.01);
		// 
	}
	events(){
		Observer.on(EVENTS.LODING_OK,()=>{
			console.log("ha cragado completamente");
			const fadeinEcene = new TWEEN.Tween(this.cube.material)
				.to({				
					opacity:0,
				},1200)
				.easing(TWEEN.Easing.Sinusoidal.In)
				.onComplete(()=>{
					this.remove(this.cube)
				});		
				fadeinEcene.start();
		})
	}
	update() {
		TWEEN.update();
	}
}

export default Scene1;
