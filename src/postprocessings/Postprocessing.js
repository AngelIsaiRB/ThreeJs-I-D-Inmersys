import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader.js';
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

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
        effect3.enabled=false;
        this.addPass( effect3 ); 

        const width = window.innerWidth || 2;
		const height = window.innerHeight || 2;
        const effectHBlur = new ShaderPass( HorizontalBlurShader );
		const effectVBlur = new ShaderPass( VerticalBlurShader );
        effectHBlur.uniforms[ 'h' ].value = 2 / ( width / 2 );
		effectVBlur.uniforms[ 'v' ].value = 2 / ( height / 2 );
        effectHBlur.enabled = false;
        effectVBlur.enabled = false;
        this.addPass( effectHBlur );  
        this.addPass( effectVBlur );  

		const effectBleach = new ShaderPass( BleachBypassShader );
        effectBleach.enabled=false;
        this.addPass(effectBleach);

		const effectSepia = new ShaderPass( SepiaShader );
        effectSepia.enabled=false;
        this.addPass(effectSepia);

		const effectVignette = new ShaderPass( VignetteShader );
        effectVignette.enabled=false;
        this.addPass(effectVignette);

        const colorifyShader = new ShaderPass( ColorifyShader );
        colorifyShader.enabled=false
        this.addPass(colorifyShader);

        const afterimagePass = new AfterimagePass(  );
        afterimagePass.enabled=false
        this.addPass(afterimagePass);

        

        var gui = new GUI();
		var cam = gui.addFolder('Shaders');
        var cam = gui.addFolder('DotScreenShader');
		cam.add(effect1, "enabled",false,true ).listen();
        var cam = gui.addFolder('RGBShiftShader');
		cam.add(effect2, "enabled",false,true ).listen();
        var cam = gui.addFolder('GammaCorrectionShader');
		cam.add(effect3, "enabled",false,true ).listen();
        var cam = gui.addFolder('BlurShader');
		cam.add(effectHBlur, "enabled",false,true ).listen();
		cam.add(effectVBlur, "enabled",false,true ).listen();
        var cam = gui.addFolder('BleachBypassShader');
        cam.add(effectBleach, "enabled",false,true ).listen();
        var cam = gui.addFolder('SepiaShader');
        cam.add(effectSepia, "enabled",false,true ).listen();
        var cam = gui.addFolder('VignetteShader');
        cam.add(effectVignette, "enabled",false,true ).listen();
        var cam = gui.addFolder('colorifyShader B/N');
        cam.add(colorifyShader, "enabled",false,true ).listen();
        var cam = gui.addFolder('afterimagePass');
        cam.add( afterimagePass.uniforms[ "damp" ], 'value', 0, 1 ).step( 0.001 );
        cam.add(afterimagePass, "enabled",false,true ).listen();
		cam.close();
        
    }
    animate(){
        this.render()
    }
}