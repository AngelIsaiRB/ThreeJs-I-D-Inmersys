import { Mesh, MeshStandardMaterial, Color, BoxBufferGeometry } from 'three';

export class Cube extends Mesh {
	
	constructor(size) {
		super();

		this.geometry = new BoxBufferGeometry(size, size, 0.1);
		this.material = new MeshStandardMaterial({
			color: new Color('black').convertSRGBToLinear(),
			flatShading: true,
			transparent:true,
			roughness: .5
		});
	}
}
