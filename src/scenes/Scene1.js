import { Scene, Color, DirectionalLight, HemisphereLight,AxesHelper } from 'three';


class Scene1 extends Scene {
	constructor() {
		super();
		this.background = new Color('skyblue').convertSRGBToLinear();
		this.create();
	}

	create() {
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
