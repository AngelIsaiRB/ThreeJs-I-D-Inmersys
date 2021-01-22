import { App } from './App';
import Observer, { EVENTS } from './Observer';
var ProgressBar = require('progressbar.js');
import * as TWEEN from "@tweenjs/tween.js/dist/tween.amd";


const app = new App(document.querySelector('#game-container'));
let elemento = document.getElementById("nameArchives");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let bar;
let splassScreen = document.getElementById("splassScreen");

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

document.onclick=(e)=>{
	e.preventDefault();
	Observer.emit(EVENTS.MOVE_MOUSE,e.clientX, e.clientY);
  }

window.addEventListener('resize', () => {
	app.onResize();
});

const progrssBar = () =>{
	 bar = new ProgressBar.Circle(progressBar, {
		strokeWidth: 6,
		easing: 'easeInOut',
		duration: 200,
		color: '#2E86C1',
		trailColor: '#eee',
		trailWidth: 1,
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
  })


progrssBar()