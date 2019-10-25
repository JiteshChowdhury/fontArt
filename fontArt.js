
let video;
let poseNet;
let poses = [];
let upperX = 0;
let upperX2 = 0;
let easing =0.05;
var mic;
let vol = 0;
let newVol = 0;
let x1,y1,x2,y2;

function setup() {
  var canvas = createCanvas(innerWidth, innerHeight);
  canvas.parent('sketch-div');
  
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
//   select('#status').html('Model Loaded');
}

function draw() {
  let c = color('#6AA9FF');
  background(0);
  vol = mic.getLevel();
  mul = 10000000000;
  tvol = vol*mul;
  newVol = int(tvol.toString().substring(0, 2));
  console.log("Sound intensity captured: ",vol);
  console.log("New Modified sound intensity: ",newVol);
  drawFontArt(newVol);
}


function drawFontArt(nv){
  for (let i = 0; i < poses.length; i++) {
      // For each pose detected, loop through all the keypoints
      let pose = poses[i].pose;
      let counter = 65;
      for (let j = 0; j < pose.keypoints.length; j++) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        let keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {          
          var ran = random(255);
          let letter = char(random(65,102));
          fill(255);
          textStyle(BOLD);
          let fontSize = 54 + nv;
          textSize(fontSize);
          console.log("fontSize:",fontSize);
          text(letter, keypoint.position.x, keypoint.position.y);
        }
        counter++;
      }
    }
    sleep(300);
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }