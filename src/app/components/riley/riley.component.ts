import { Component, OnInit , ViewChild, Directive , HostListener } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
//import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-riley',
  templateUrl: './riley.component.html',
  styleUrls: ['./riley.component.scss'],
})

export class RileyComponent implements OnInit {
  @ViewChild('myCanvas', {static: false}) canvas: any;
  canvasElement: any;
  motionX: number;
  watch: any;
  x;
  y;
  z;

  constructor(private deviceMotion: DeviceMotion) { }

  /*
  @HostListener('window:devicemotion', ['$event'])
  ondevicemotion(event: DeviceMotionEvent) {
    console.log('device motion fired');
    console.log(event);
    debugger;
  }
  */
  

  ngOnInit() { }

  ngAfterViewInit(){
    this.canvasElement = this.canvas.nativeElement;
    this.motionX = 2;
    this.draw();
    this.getCurrentAcceleration();
  }

  getCurrentAcceleration(){
    // Get the device current acceleration
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        this.motionX = acceleration.x;
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
      },
      (error: any) => console.log(error)
    );
  }

  startWatching(){
    setInterval(() => {
      this.getCurrentAcceleration();
      this.draw()
    }, 500);
    /*
    var options: DeviceMotionAccelerometerOptions = {
      frequency: 2000
    };
    // Watch device acceleration
    this.watch = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.motionX = acceleration.x;
      this.x = acceleration.x;
      this.y = acceleration.y;
      this.z = acceleration.z;
      this.draw(); //maybe request animation frame
    }, (err)=>{
      alert(JSON.stringify(err));
    });
    */

    /*
    this.watch = this.deviceMotion.watchAcceleration(options).subscribe({
      next(position) { console.log('Current Position: ', position); },
      error(msg) { console.log('Error Getting Location: ', msg); }
    });
    */  
  }

  draw() {
    let ctx = this.canvasElement.getContext('2d'); //change to ionic
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 400, 400); // clear canvas
    let motionFactor = this.motionX/8;

    for(let x = 0; x < this.canvasElement.width; x += 8){
        ctx.fillRect(x, 0, 4-x*0.035*motionFactor, 200);
    }

    for(let x = 4; x < this.canvasElement.width/2; x += 8){
    ctx.beginPath();
    ctx.moveTo(x, this.canvasElement.height/2);
    ctx.lineTo(x, this.canvasElement.height/2+x/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, this.canvasElement.height/2);
    ctx.lineTo(x, this.canvasElement.height/2-x/2);
    ctx.stroke();
    }

    ctx.save();
    //ctx.restore();
    //window.requestAnimationFrame(draw);
}

/*

init() {
    motionX = event.accelerationIncludingGravity.x;
    window.requestAnimationFrame(draw);
}

motionHandler(event) {
console.log(DeviceMotionEvent);
init(event);
}

if (DeviceMotionEvent) {
    window.addEventListener("devicemotion", motionHandler, true);
    console.log("Device Motion supported");
}
*/

}
