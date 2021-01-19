import { App } from './App';
var ProgressBar = require('progressbar.js');

const app = new App(document.querySelector('#game-container'));

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
	  
	  bar.animate(1.0);
}

progrssBar()