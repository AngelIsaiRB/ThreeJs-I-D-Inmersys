import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';
export class PostprocessingPersonalized extends EffectComposer{
    constructor(render, scene, camera){
        super(render);
        
        this.addPass( new RenderPass( scene, camera ) );

        const effect1 = new ShaderPass( DotScreenShader );
        effect1.uniforms[ 'scale' ].value = 4;
        this.addPass( effect1 );

        const effect2 = new ShaderPass( RGBShiftShader );
        effect2.uniforms[ 'amount' ].value = 0.0015;
        this.addPass( effect2 );
    }
    animate(){
        this.render()
    }
}