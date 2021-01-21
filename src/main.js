import { App } from './App';
import Observer, { EVENTS } from './Observer';
var ProgressBar = require('progressbar.js');

const app = new App(document.querySelector('#game-container'));
let elemento = document.getElementById("nameArchives");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let progress = 0;
let bar;
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
	Observer.on(EVENTS.LOADING, (percent, url)=>{
	  console.log(percent)
	  elemento.textContent = url
	  bar.animate(progress);
  });

  Observer.on(EVENTS.LODING_OK, ()=>{
	elemento.textContent="";
	splassScreen.style.display = "none";
	btn1.style.display = "block"
	btn2.style.display = "block"
  })


progrssBar()