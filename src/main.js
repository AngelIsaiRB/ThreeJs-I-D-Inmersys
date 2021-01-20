import { App } from './App';
import Observer, { EVENTS } from './Observer';
var ProgressBar = require('progressbar.js');

const app = new App(document.querySelector('#game-container'));
let elemento = document.getElementById("nameArchives");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let splassScreen = document.getElementById("splassScreen");

btn1.onclick = () =>{
	console.log("click")
}
btn2.onclick = () =>{
	console.log("click 2")
}

window.addEventListener('resize', () => {
	app.onResize();
});

const progrssBar = () =>{
	var bar = new ProgressBar.Circle(progressBar, {
		strokeWidth: 6,
		easing: 'easeInOut',
		duration: 1400,
		color: '#2E86C1',
		trailColor: '#eee',
		trailWidth: 1,
		svgStyle: null
	  });
	  Observer.on(EVENTS.LOADING, (percent, url)=>{		
		elemento.textContent = url
		if(percent ===1 ){
			elemento.textContent="";
			splassScreen.style.display = "none";
			btn1.style.display = "block"
			btn2.style.display = "block"
			Observer.emit(EVENTS.LODING_OK);
		} 
		bar.animate(percent);
	});
}


progrssBar()