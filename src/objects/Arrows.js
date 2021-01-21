import { CylinderGeometry, Group, Mesh, MeshBasicMaterial } from "three";

export class Arrows extends Group{

    constructor(){
        super();

        const material1 = new MeshBasicMaterial( { color: 0xffffcc,	transparent:true, } );
        const material2 = new MeshBasicMaterial( { color: 0xffffcc,	transparent:true, } );
        const material3 = new MeshBasicMaterial( { color: 0xffffcc,	transparent:true, } );
		 this.shape = new Mesh( new CylinderGeometry( 0, 30, 50, 16, 4 ), material1 );
		 this.shape.position.set(-3.6, 10.8, 0);
		 this.shape.rotation.set(180 * Math.PI / 180,0,0)
		 this.shape.scale.set(0.006,0.006,0.006)
		 this.shape.material.opacity=0.4
		 this.shape2 = new Mesh( new CylinderGeometry( 0, 30, 50, 16, 4 ), material2 );
		 this.shape2.position.set(-3.6, 11.0, 0);
		 this.shape2.rotation.set(180 * Math.PI / 180,0,0)
		 this.shape2.scale.set(0.009,0.009,0.009)
		 this.shape2.material.opacity=0.7
		 this.shape3 = new Mesh( new CylinderGeometry( 0, 30, 50, 16, 4 ), material3 );
		 this.shape3.position.set(-3.6, 11.2, 0);
		 this.shape3.rotation.set(180 * Math.PI / 180,0,0)
		 this.shape3.scale.set(0.01,0.01,0.01)
		 this.shape3.material.opacity=1
		 
		this.add( this.shape, this.shape2, this.shape3 );

    }
    update(){
		if(this.shape.position.y >= 10.6 && this.bandera ){
			this.shape.position.y -= 0.007;
			this.shape2.position.y -= 0.007;
			this.shape3.position.y -= 0.007;
			if(this.shape.position.y <= 10.6) this.bandera=false			
		}
		else{
			this.shape.position.y += 0.007;
			this.shape2.position.y += 0.007;
			this.shape3.position.y += 0.007;
			if(this.shape.position.y >= 11.4) this.bandera=true			
		}
    }

}