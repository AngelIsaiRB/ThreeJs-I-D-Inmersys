import { FontLoader, Mesh, MeshBasicMaterial, TextGeometry } from "three";
import Observer, { EVENTS } from "../Observer";
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";

export  class Text extends Mesh {

    constructor( textRecived, colorPrincipal = {color: 0xFFC629}, colorSecundary = { color: 0x000000 },managerLoader ){
        super();
        const loadertext = new FontLoader(managerLoader);
		var materialFront = new MeshBasicMaterial( colorPrincipal );
		var materialSide = new MeshBasicMaterial( colorSecundary );
		var materialArray = [ materialFront, materialSide ];
		loadertext.load( './assets/fonts/helvetiker_regular.typeface.json',  (  font ) => {
			const textGeom = new TextGeometry(textRecived , {
				font: font,
				size: 0.5,
				height: 0.1,
				// curveSegments: 12,
				// bevelEnabled: true,
				bevelThickness: 10,
				bevelSize: 8,
				bevelOffset: 0,
				bevelSegments: 5,

			} );			
        this.geometry = textGeom;
        this.material = materialArray		
		textGeom.computeBoundingBox();
		// var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;		
		// textMesh.rotation.x = -Math.PI / 4;		
		// textMesh.scale.set(0.01,0.01,0.01)
	    // this.position.set(0,0,0)
	});
	TWEEN.update();
	this.events();	
	}
	events(){
		Observer.on(EVENTS.RUN_ANIMATION,()=>{
			const fadeinEcene = new TWEEN.Tween(this.position)
				.to({				
					y:50,
				},1000)
				.easing(TWEEN.Easing.Sinusoidal.In)
				.onComplete(()=>{
					// this.remove(this.cube)
				});		
				fadeinEcene.start();
		})
	}
}