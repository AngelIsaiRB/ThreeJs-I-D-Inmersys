import { Scene,   HemisphereLight,AxesHelper, CubeTextureLoader, Group, SpotLight } from 'three';
import { Botella } from '../objects/botella';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { Floor } from '../objects/Floor';
import { Cube } from '../objects/Cube';
import Observer, { EVENTS } from '../Observer';
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";
import { ColorGUIHelper } from '../models/ColorGuiHelper';
import { Text } from '../objects/Text';
import { Arrows } from '../objects/Arrows';

class Scene1 extends Scene {
	constructor(managerLoader) {
		super();
		this.managerLoader = managerLoader;
		this.bandera= true;
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
		const loader = new  CubeTextureLoader(this.managerLoader);
		
		this.background = loader.load(urls)
		
		

		// -------------------escenario
		const floor = new Floor(this.managerLoader);
		this.add(floor)
		// ---------------------------------	----------------------------------------
		//   botella

		   this.botella = new Botella(this.managerLoader);
		//   botella.children.map(n =>{
		// 	console.log(n)
		//   });		  
		  
		  this.add(this.botella)

		// ---------------------------------
		// -------------cubo para fade in
			 this.cube = new Cube(60);
			this.cube.position.z=6
			this.add(this.cube);
		// 

		// texto 3D
		this.grupTextUpBeer = new Group();
		this.grupTextUpBeer.position.set(-3.9,12,0)
		this.textUPBeer = new Text('DESCUBRE DE QUE ESTAMOS ECHOS',{color: 0xFFC629},{ color: 0x000000 });
		this.textUPBeerBegind = new Text('ABRE LA TAPA HACIENDO TAP',{color: 0xFFC629},{ color: 0x000000 });
		this.textUPBeer.position.set(0,1,0);						
		this.textUPBeerBegind.position.set(0,0,0);
		this.grupTextUpBeer.add(this.textUPBeer, this.textUPBeerBegind)
		this.add(this.grupTextUpBeer);
		// 
		// figura debajo
		this.arrows = new Arrows()
		this.add(this.arrows);
		
		// font: helvetiker, gentilis, droid sans, droid serif, optimer
		// weight: normal, bold
				
		// 
		
		const axesHelper = new AxesHelper( 10 );		
		this.add( axesHelper );		
		
		const ambientLight = new HemisphereLight(0xffeeb1, 0x080820, 0.1);
		 this.spotLight = new SpotLight(0xffa95c, 4);
		this.add( ambientLight, this.spotLight);


		// 	helpers
		const gui = new GUI();
		const folderMaster = gui.addFolder('escena');
		const cam = gui.addFolder('botella');
		cam.add(this.botella.position, 'y',-100, 100).listen();
		cam.add(this.botella.position, 'x', -100, 100).listen();
		cam.add(this.botella.position, 'z', -100, 100).listen();
		cam.add(this.botella.rotation, 'x', -2, 2).listen();
		cam.add(this.botella.rotation, 'y', -2, 2).listen();
		cam.add(this.botella.rotation, 'z', -2, 2).listen();
		const text = gui.addFolder('texto');
		text.add(this.grupTextUpBeer.position, 'y', -30.0, 30.0).listen();
		text.add(this.grupTextUpBeer.position, 'x', -30.0, 30.0).listen();
		text.add(this.grupTextUpBeer.position, 'z', -30.0, 30.0).listen();
		text.add(this.grupTextUpBeer.rotation, 'x', -30.0, 30.0).listen();
		text.add(this.grupTextUpBeer.rotation, 'y', -30.0, 30.0).listen();
		text.add(this.grupTextUpBeer.rotation, 'z', -30.0, 30.0).listen();
		text.close();
		// const f = gui.addFolder('f');
		// f.add(this.shape.position, 'y', -30.0, 30.0).listen();
		// f.add(this.shape.position, 'x', -30.0, 30.0).listen();
		// f.add(this.shape.position, 'z', -30.0, 30.0).listen();
		// f.add(this.shape.rotation, 'x', -30.0, 30.0).listen();
		// f.add(this.shape.rotation, 'y', -30.0, 30.0).listen();
		// f.add(this.shape.rotation, 'z', -30.0, 30.0).listen();
		// f.close();
		// text.add(this.cube.material, 'opacity', 0.0, 1).listen();
		
		cam.close();
		const ambientLightHelpergui = gui.addFolder('luz ambiente');
		ambientLightHelpergui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		ambientLightHelpergui.add(ambientLight, 'intensity', 0, 10.0, 0.01);
		ambientLightHelpergui.close();
		// const directionalLightHelpergui = gui.addFolder('luz direccional');
		// directionalLightHelpergui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
		// directionalLightHelpergui.add(light, 'intensity', 0, 20, 0.01);
		// directionalLightHelpergui.close();
		folderMaster.close();

		// gui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		// gui.add(light, 'intensity', 0, 2, 0.01);
		// 
	}
	events(){
		Observer.on(EVENTS.LODING_OK,()=>{
			
			
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
	update(camera) {		
		this.arrows.update();		
		this.grupTextUpBeer.quaternion.copy(camera.quaternion)
		this.spotLight.position.set(
			camera.position.x+10,
			camera.position.y+10,
			camera.position.z+10
		)
		if(!false){ //evento click tapa
			this.botella.update()
		}
		
		TWEEN.update();
	}
	
}

export default Scene1;
