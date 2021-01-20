import { PerspectiveCamera,  WebGLRenderer, sRGBEncoding, Vector3, LoadingManager } from 'three';
import Scene1 from './scenes/Scene1';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'


export class App {
	constructor(container) {
		this.container = container;
		
		this.scene = new Scene1();
		
		// ## Camera's config
		this.camera = new PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 10000);
		this.camera.position.set(-2.3, 7, 12);		
		// this.camera.lookAt(0, 0, 0);
		this.control = new OrbitControls(this.camera, this.container);
		// this.control.enableZoom=false;
		this.control.target = new Vector3(-2, 5, 0);
		this.control.maxPolarAngle = 100 * Math.PI / 180
		this.camera.rotation.set(0, 0, 0);		
		console.log(this.camera.rotation.z )



		// ## Renderer's config
		this.renderer = new WebGLRenderer({
			antialias: true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio);
		// helpers
		var gui = new GUI();

		var cam = gui.addFolder('Camera');
		cam.add(this.camera.position, 'y', 0, 100).listen();
		cam.add(this.camera.position, 'x', 0, 100).listen();
		cam.add(this.camera.position, 'z', 0, 100).listen();
		cam.add(this.camera.rotation, 'x', 0, 2).listen();
		cam.add(this.camera.rotation, 'y', 0, 2).listen();
		cam.add(this.camera.rotation, 'z', 0, 2).listen();
		cam.open();
		// ++++++++++++++++++++++++++++++++
		// sRGBEncoding
		this.renderer.outputEncoding = sRGBEncoding;

		// ## Light's config
		this.renderer.physicallyCorrectLights = true;

		this.container.appendChild(this.renderer.domElement);
		this.onResize();
		this.render();
	}

	onResize() {
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
	}

	render() {
		this.renderer.render(this.scene, this.camera);

		// Updates here
		this.scene.update();

		this.renderer.setAnimationLoop(() => this.render());
	}
}
