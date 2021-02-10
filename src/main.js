(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
import { App } from './App';
import Observer, { EVENTS } from './Observer';
var ProgressBar = require('progressbar.js');
let splassScreen = document.getElementById("splassScreen");
let markerfound =false
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////////////////////
        //		Init
        //////////////////////////////////////////////////////////////////////////////////

        var renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            precision: 'mediump',
            logarithmicDepthBuffer: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(new THREE.Color('lightgrey'), 0)
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.style.position = 'absolute'
        document.body.appendChild( renderer.domElement );
        // Create a camera
        var camera = new THREE.Camera();
        ////////////////////////////////////////////////////////////////////////////////
        //          handle arToolkitSource
        ////////////////////////////////////////////////////////////////////////////////

        var arToolkitSource = new THREEx.ArToolkitSource({
            sourceType : 'webcam',
        })

        arToolkitSource.init(function onReady(){
            // use a resize to fullscreen mobile devices
            setTimeout(function() {
                onResize()
            }, 100);
        })

        // handle resize
        window.addEventListener('resize', function(){
            onResize()
        })

        // listener for end loading of NFT marker
        window.addEventListener('arjs-nft-loaded', function(ev){
          console.log(ev);
        })
        
        

        function onResize(){
            arToolkitSource.onResizeElement()
            arToolkitSource.copyElementSizeTo(renderer.domElement)
            if( arToolkitContext.arController !== null ){
                arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
            }
        }

        ////////////////////////////////////////////////////////////////////////////////
        //          initialize arToolkitContext
        ////////////////////////////////////////////////////////////////////////////////

        // create atToolkitContext
        var arToolkitContext = new THREEx.ArToolkitContext({
            detectionMode: 'mono',
            maxDetectionRate: 30,
            canvasWidth: 480,
            canvasHeight: 640,
        }, {
            canvasWidth: 480,
            canvasHeight: 640,
        })
        // initialize it
        arToolkitContext.init(function onCompleted(){
            // copy projection matrix to camera
            camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
        })
        
        ////////////////////////////////////////////////////////////////////////////////
        //          Create a ArMarkerControls
        ////////////////////////////////////////////////////////////////////////////////

        // init controls for camera
        var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
            type : 'nft',
            descriptorsUrl : './assets/dataNFT/corona_new',
            changeMatrixMode: 'cameraTransformMatrix',
        })
        markerControls.addEventListener('markerFound', function(ev) {
			if(!markerfound){
				markerfound = true;
				document.body.removeChild(renderer.domElement );
                renderer.dispose();
			splassScreen.style.display = "flex";
			 const app = new App(document.querySelector('#game-container'));
			}
			});

        

        //////////////////////////////////////////////////////////////////////////////////
        //		add an object in the scene
        //////////////////////////////////////////////////////////////////////////////////

        
     

// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// const app = new App(document.querySelector('#game-container'));
let elemento = document.getElementById("nameArchives");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let bar;
btn1.onclick = () =>{
	Observer.emit(EVENTS.LIQUID_CHANGE);
}
btn2.onclick = () =>{
	let videoContainer = document.getElementById("video-container-controler");
	let video = document.getElementById("video");
	video.play();
	if(videoContainer.style.display === "flex"){
		videoContainer.style.display="none"
		video.pause();
	}
	else{
		videoContainer.style.display="flex";
	}	
}

btn3.onclick =()=>{
	Observer.emit(EVENTS.PLAY_VIDEO2);
}
btn4.onclick =()=>{
	Observer.emit(EVENTS.CHANGE_MATERIAL);
}

document.addEventListener('touchend', (e) =>{
	// console.log(e)
	// Observer.emit(EVENTS.MOVE_MOUSE,e.clientX, e.clientY);
	Observer.emit(EVENTS.RUN_ANIMATION);
	
});

document.onclick=(e)=>{
	// console.log(e)s
	e.preventDefault();
	Observer.emit(EVENTS.MOVE_MOUSE,e.clientX, e.clientY);
  }
const progrssBar = () =>{
	 bar = new ProgressBar.Circle(progressBar, {
		strokeWidth: 6,
		easing: 'easeInOut',
		duration: 200,
		color: '#2E86C1',
		trailColor: '#eee',
		trailWidth: 5,
		svgStyle: null
	  });

}
	Observer.on(EVENTS.LOADING, (progress, url)=>{
	//   console.log(percent)
	  elemento.textContent = url
	  bar.animate(progress);
  });

  Observer.on(EVENTS.LODING_OK, ()=>{
	elemento.textContent="";
	splassScreen.style.display = "none";
	btn1.style.display = "block"
	btn2.style.display = "block"
	btn3.style.display = "block"
	btn4.style.display = "block"
  })


progrssBar()