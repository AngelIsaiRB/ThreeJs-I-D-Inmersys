import { Scene,   HemisphereLight,AxesHelper, CubeTextureLoader, Group, SpotLight, Raycaster, Vector2, AudioLoader, Audio, TextureLoader, Clock } from 'three';
import { Botella } from '../objects/botella';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { Floor } from '../objects/Floor';
import { Cube } from '../objects/Cube';
import Observer, { EVENTS } from '../Observer';
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";
import { ColorGUIHelper } from '../models/ColorGuiHelper';
import { Text } from '../objects/Text';
import { Arrows } from '../objects/Arrows';
import { Sound } from '../sound/Sound';
import { Video } from '../objects/Vdeo';
import { isDevice } from '../utils/utils';
import { SpritePerzonalized } from '../objects/SpritePerzonalized';


var raycaster = new Raycaster();
var mouse = new Vector2();
class Scene1 extends Scene {
	constructor(managerLoader,listener) {
		super();
		this.managerLoader = managerLoader;
		this.bandera= false;
		this.listener =listener;
		this.conterRandom=0;
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
		// 
		// --------------------------------  botella

		   this.botella = new Botella(this.managerLoader);
		//   botella.children.map(n =>{
		// 	console.log(n)
		//   });		  
		  
		  this.add(this.botella)

		// 
		// ---------------------------------------------cubo para fade in
			 this.cube = new Cube(60);
			this.cube.position.z=6
			this.add(this.cube);
		// 
			
		// ----------------------------------------- cube for touch
			this.cubeD = new Cube(4);
		   this.cubeD.scale.y=3
		   this.cubeD.scale.z=30 
		   this.cubeD.position.set(-3,6,0)
		   this.cubeD.material.visible=false
		   this.cubeD.callback = () => {
			   Observer.emit(EVENTS.RUN_ANIMATION);
		   }
		   this.add(this.cubeD);

		// 
		// -------------------------------------------- video
		this.video = new Video();	
		this.videoGroup = new Group();
		this.videoGroup.position.set(-3.5,5,0)
		 this.video.position.set(0,0,2)
		this.videoGroup.add(this.video)
		this.add(this.videoGroup)
		// 
		// -----------------------------------------  fuegos artificiales

		// this.pyrotechnics = new SpritePerzonalized("./assets/Assets 2D/Secuencia imagenes/Fireworks_Sequence_512px15fps/Explosion.png");
		// this.pyrotechnics.scale.set(4,4,4)
		// this.pyrotechnics.visible=true;
		// this.add(this.pyrotechnics)
		
		this.spriteExplot = new SpritePerzonalized(this);
	

		
		// --------------------------------------------  sound
			this.sound = new Audio(this.listener); 
			const audioLoader = new AudioLoader();
			audioLoader.load("./assets/sfx_open_bottle.wav", (buffer)=>{
				this.sound.setBuffer(buffer);
				this.sound.setLoop(false);
				this.sound.setVolume(1);
				Observer.on(EVENTS.PLAY_AUDIO,()=>{
					this.sound.play();								
				})
			});  
			
			
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
		// axes helper
		// const axesHelper = new AxesHelper( 10 );		
		// this.add( axesHelper );		
		
		const ambientLight = new HemisphereLight(0xffeeb1, 0x080820,0.1);
		const device =isDevice();
		if ( device ){
			ambientLight.intensity = 1.5
		}
		this.spotLight = new SpotLight(0xffa95c, 4);
		this.add( ambientLight, this.spotLight);


		// 	helpers
		const gui = new GUI();
		const folderMaster = gui.addFolder('escena');
		const cam = gui.addFolder('botella position');
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
		});

		Observer.on(EVENTS.RUN_ANIMATION,()=>{
			this.bandera=true;			
		})

		
	}
	 onDocumentMouseDown(clientX, clientY, renderer, camera  ) {
		mouse.x = ( clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( clientY / renderer.domElement.clientHeight ) * 2 + 1;
	
		raycaster.setFromCamera( mouse,camera );
	
		var intersects = raycaster.intersectObjects( this.children ); 
		// console.log(intersects)
		if ( intersects.length > 0 ) {
			
			if(intersects[0].object.callback){
				intersects[0].object.callback();
			}
	
		}
	
	}
	update(camera) {	
		this.video.update();
		this.arrows.update();

		this.spriteExplot.update();
		

		this.grupTextUpBeer.quaternion.copy(camera.quaternion)
		// this.pyrotechnics.update();
		this.videoGroup.lookAt(camera.position.x,5,camera.position.z)
		this.spotLight.position.set(
			camera.position.x+10,
			camera.position.y+10,
			camera.position.z+10
		)
		if(this.bandera){ //evento click tapa
			this.botella.update()
		}
		TWEEN.update();
		
	}
	
}

export default Scene1;
