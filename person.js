objectDetector= "";
objects = [];
status = "";

function preload(){
}


function setup() {
  canvas = createCanvas(420, 420);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(420, 420);
  video.hide()
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 640, 420);

      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("No_of_objects").innerHTML = "No. of objects : " + objects.length;
          fill(255, 0, 0);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(255, 0, 0);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
