import { BoxBufferGeometry, Color, DoubleSide, LinearFilter, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, Texture, VideoTexture } from "three";
import Observer, { EVENTS } from "../Observer";

let video, videoImage, videoImageContext, videoTexture;
export class Video extends Mesh{

    constructor() {
		super();
        // const video = document.getElementById( 'video2' );
        // console.log(video)
      video = document.createElement( 'video' );
    video.src = "https://res.cloudinary.com/angelisai/video/upload/v1611240154/cqdn1oxqghdkmqwqphjd.mp4";
    video.setAttribute('crossorigin', 'anonymous');
    video.load(); // must call after setting/changing source
    // video.muted=true;
    videoImage = document.createElement( 'canvas' );
	videoImage.width = 1280;
    videoImage.height = 720;
    videoImageContext = videoImage.getContext( '2d' );
    videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );
    videoTexture = new Texture( videoImage );
	videoTexture.minFilter = LinearFilter;
    videoTexture.magFilter = LinearFilter;
    var movieMaterial = new MeshBasicMaterial( { map: videoTexture, overdraw: true, side:DoubleSide } );
    var movieGeometry = new PlaneGeometry( 11, 5, 4, 4 );
    this.geometry = movieGeometry;
    this.material = movieMaterial;
    this.material.visible=false;
    // video.play();      
    Observer.on(EVENTS.PLAY_VIDEO2, ()=>{
        if(!this.material.visible ){
            this.material.visible=true;
            video.play();            
        }
        else{
            this.material.visible=false;
            video.pause();
        }
    })
    }
    update(){
        if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
	{
		videoImageContext.drawImage( video, 0, 0 );
		if ( videoTexture ) 
			videoTexture.needsUpdate = true;
	}
    }

}