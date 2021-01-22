import { PerspectiveCamera,  WebGLRenderer, sRGBEncoding, Vector3, PMREMGenerator, ReinhardToneMapping, LinearToneMapping, UnsignedByteType, LoadingManager, AudioListener } from 'three';
import Scene1 from './scenes/Scene1';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import Observer, { EVENTS } from './Observer';
import { isDevice } from './utils/utils';


export class App {
	constructor(container) {
		this.isDevice = isDevice();

		this.container = container;
		// ## Camera's config
		this.camera = new PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 10000);
		this.camera.position.set(-3.7, 7, 12);	
		this.control = new OrbitControls(this.camera, this.container);
		// this.control.enableZoom=false;
		// add properties audio
		const listener = new AudioListener();
		this.camera.add(listener);
		// 
		this.control.target = new Vector3(-3, 7, 0);
		this.control.maxPolarAngle = 100 * Math.PI / 180
		this.camera.rotation.set(0, 0, 0);		
		console.log(this.camera.rotation.z )
		

		//  Renderer's config
		this.renderer = new WebGLRenderer({
			antialias: true,
		})
		this.renderer.outputEncoding = sRGBEncoding;
		
		// ## Light's config
		this.renderer.physicallyCorrectLights = true;
		// 
		this.renderer.toneMapping = LinearToneMapping;
		this.renderer.toneMappingExposure = 0.7;
		this.renderer.shadowMap.enabled = true;
		
		this.container.appendChild(this.renderer.domElement);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		// loader
		const manager = new LoadingManager();
		manager.onLoad = function ( ) {
			Observer.emit(EVENTS.LODING_OK);
		};		
		manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
			var percentComplete = itemsLoaded / itemsTotal;
			Observer.emit(EVENTS.LOADING,percentComplete,url);
		};

		this.scene = new Scene1(manager,listener);
		// 
		if(!this.isDevice){
			const pmremGenerator = new PMREMGenerator( this.renderer );
			pmremGenerator.compileEquirectangularShader();

			new RGBELoader(manager)
				.setDataType( UnsignedByteType )
				.load( './assets/Arte 3D/HDRI/Env360.hdr',  ( texture ) => {

					const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

					// this.scene.background = envMap;
					this.scene.environment = envMap;

				})
		}
		
		// helpers
		var gui = new GUI();

		var cam = gui.addFolder('Camera');
		cam.add(this.camera.position, 'y', -10.0, 10.0).listen();
		cam.add(this.camera.position, 'x', -10.0, 10.0).listen();
		cam.add(this.camera.position, 'z', -10.0, 10.0).listen();
		cam.add(this.camera.rotation, 'x', 0, 2).listen();
		cam.add(this.camera.rotation, 'y', 0, 2).listen();
		cam.add(this.camera.rotation, 'z', 0, 2).listen();
		cam.close();
		// ++++++++++++++++++++++++++++++++
		
		this.onResize();
		this.render();
		this.events();
	}

	events(){
		
	Observer.on(EVENTS.MOVE_MOUSE, (clientX, clientY)=>{
	// console.log("moviendo!")
	this.scene.onDocumentMouseDown(clientX, clientY, this.renderer, this.camera);
	});
	}

	onResize() {
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
	}

	render() {
		this.renderer.render(this.scene, this.camera);
		// Updates here
		this.scene.update(this.camera);

		this.renderer.setAnimationLoop(() => this.render());

		

	}
}
