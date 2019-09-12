
let video;
let poseNet;
let poses = [];
let upperX = 0;
let upperX2 = 0;
let easing =0.05;

function setup() {
  var canvas = createCanvas(innerWidth, innerHeight);
  canvas.parent('sketch-div');
  
  video = createCapture(VIDEO);
  video.size(width, height);

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
  background(c);
  image(video, 0, 0, 150, 120);
  drawFontArt();
}


function drawFontArt(){
  for (let i = 0; i < poses.length; i++) {
      // For each pose detected, loop through all the keypoints
      let pose = poses[i].pose;
      let counter = 65;
      for (let j = 0; j < pose.keypoints.length; j++) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        let keypoint = pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.4) {          
          var ran = random(255);
          let letter = char(random(65,102));
          fill('#34455B');
          textStyle(BOLD);
          textSize(72);
          text(letter, keypoint.position.x, keypoint.position.y);
          //ellipse(keypoint.position.x, keypoint.position.y, 10, 10,0.5); 
        }
        counter++;
      }
      sleep(100);
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }