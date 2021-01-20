import { App } from './App';
import Observer, { EVENTS } from './Observer';
var ProgressBar = require('progressbar.js');

const app = new App(document.querySelector('#game-container'));
let elemento = document.getElementById("nameArchives");
let splassScreen = document.getElementById("splassScreen");
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
			Observer.emit(EVENTS.LODING_OK);
		} 
		console.log(percent)
		bar.animate(percent);
	});
}


progrssBar()