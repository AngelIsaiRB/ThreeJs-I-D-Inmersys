import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
export class PostprocessingPersonalized extends EffectComposer{
    constructor(render, scene, camera){
        super(render);
        
        this.addPass( new RenderPass( scene, camera ) );
        this.setPixelRatio( window.devicePixelRatio );
		this.setSize( window.innerWidth, window.innerHeight );
        const effect1 = new ShaderPass( DotScreenShader );
        effect1.uniforms[ 'scale' ].value = 4;
        effect1.enabled=false;
        this.addPass( effect1 );
        
        const effect2 = new ShaderPass( RGBShiftShader );
        effect2.uniforms[ 'amount' ].value = 0.0015;
        effect2.enabled=false;
        this.addPass( effect2 );
        
        const effect3 = new ShaderPass( GammaCorrectionShader )
        // effect.enabled=false;
        this.addPass( effect3 );  


        var gui = new GUI();

		var cam = gui.addFolder('Shaders');
		cam.add(effect1, "enabled",false,true ).listen();
		cam.add(effect2, "enabled",false,true ).listen();
		cam.add(effect3, "enabled",false,true ).listen();
		cam.close();
        
    }
    animate(){
        this.render()
    }
}