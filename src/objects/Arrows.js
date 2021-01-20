import { CylinderGeometry, Group, MeshBasicMaterial } from "three";
import {SceneUtils} from 'three/examples/jsm/utils/SceneUtils.js';

export class Arrows extends Group{

    constructor(){
        super();

        const darkMaterial = new MeshBasicMaterial( { color: 0xffffcc } );
		const wireframeMaterial = new MeshBasicMaterial( { color: 0xffffcc  } ); 
		const multiMaterial = [ darkMaterial, wireframeMaterial ]; 
		 this.shape = SceneUtils.createMultiMaterialObject( new CylinderGeometry( 0, 30, 50, 4, 4 ), multiMaterial );
		 this.shape.position.set(-3.6, 10.8, 0);
		 this.shape.rotation.set(180 * Math.PI / 180,0,0)
		 this.shape.scale.set(0.005,0.005,0.005)
		 this.shape2 = SceneUtils.createMultiMaterialObject( new CylinderGeometry( 0, 30, 50, 4, 4 ), multiMaterial );
		 this.shape2.position.set(-3.6, 11.0, 0);
		 this.shape2.rotation.set(180 * Math.PI / 180,0,0)
		 this.shape2.scale.set(0.008,0.008,0.008)
		 this.shape3 = SceneUtils.createMultiMaterialObject( new CylinderGeometry( 0, 30, 50, 4, 4 ), multiMaterial );
		 this.shape3.position.set(-3.6, 11.2, 0);
		 this.shape3.rotation.set(180 * Math.PI / 180,0,0)
		 this.shape3.scale.set(0.01,0.01,0.01)
		 
		this.add( this.shape, this.shape2, this.shape3 );

    }
    update(){
        this.shape.rotation.y += 0.008; 
		if(this.shape.position.y >= 10.6 && this.bandera ){
			this.shape.position.y -= 0.005;
			this.shape2.position.y -= 0.005;
			this.shape3.position.y -= 0.005;
			if(this.shape.position.y <= 10.6) this.bandera=false			
		}
		else{
			this.shape.position.y += 0.005;
			this.shape2.position.y += 0.005;
			this.shape3.position.y += 0.005;
			if(this.shape.position.y >= 11.4) this.bandera=true			
		}
    }

}