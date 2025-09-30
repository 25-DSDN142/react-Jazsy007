/* load images here */
function prepareInteraction() {

  Fish = loadImage('/images/Fish1.png');
  Jellyfish = loadImage('/images/Jellyfish.png');
  Stingray = loadImage('/images/Stingray.png');
  Shark1 = loadImage('/images/Shark1.png');
  Shark2 = loadImage('/images/Shark2.png');
  Ocean = loadImage('/images/Background.jpg');

}

let face;
let x = [], y = [], speed = [], size = [];
let NumBubbles = 100;
let initialized = false;

function drawInteraction(faces, hands) {

// imageMode(CENTER) // can use push and pop 
// imageMode(CORNER)


 // draw background first
 image(Ocean, 0, 0, 1280, 960); // make sure is right size 


// //-----------------------------------------

  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face

    /*
    Start drawing on the face here
    */

    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let faceWidth = face.faceOval.width;
    let faceHeight = face.faceOval.height;

drawingContext.shadowBlur = 20; // minimal glow 
drawingContext.shadowColor = color(9, 25, 145); // navy colour 

    checkIfMouthOpen(face);
 if ((isMouthOpen) == false) {

    SharkWidth = faceWidth * 1.5; /// how big the shark is 
    SharkHeight = faceHeight * 1.5;
    SharkX = faceCenterX - SharkWidth / 2; //where the shark is and center it on face 
    SharkY = faceCenterY - SharkHeight / 2;

    // draw Shark
    image(Shark1, SharkX, SharkY, SharkWidth, SharkHeight);
 }

    checkIfMouthOpen(face);
 if (isMouthOpen) {

    SharkWidth = faceWidth * 1.5; /// how big the shark is 
    SharkHeight = faceHeight * 1.5;
    SharkX = faceCenterX - SharkWidth / 2; //where the shark is and center it on face 
    SharkY = faceCenterY - SharkHeight / 2;

    // draw Shark
    image(Shark2, SharkX, SharkY, SharkWidth, SharkHeight);
 }
  }
    /*
    Stop drawing on the face here
    */

  // You can make addtional elements here, but keep the face drawing inside the for loop. 

//----------------------------------------------
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

 for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    // This is how to load in the x and y of a point on the hand.
    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;

    /*
    Start drawing on the hands here
    */

drawingContext.shadowBlur = 20; // minimal glow 
drawingContext.shadowColor = color(9, 25, 145); // navy colour 
let whatGesture = detectHandGesture(hand)

 if (hand.handedness === "Right") {
 let topLeftX = indexFingerTipX - 200 / 2; // fish on top of finger centered 
 let topLeftY = indexFingerTipY - 240 / 2;
  image(Fish, topLeftX, topLeftY, 200, 240)
  }

if (whatGesture === "Pointing" && hand.handedness === "Left") {
 let topLeftX = indexFingerTipX - 200 / 2; // jellyfish on top of finger centered 
 let topLeftY = indexFingerTipY - 240 / 2;
  image(Jellyfish, topLeftX, topLeftY, 200, 240)
  }
   
 if (whatGesture === "Thumbs Up" && hand.handedness === "Left") {
 let topLeftX = indexFingerTipX - 200 / 2; // stingray on top of finger centered 
 let topLeftY = indexFingerTipY - 240 / 2;
 image(Stingray, topLeftX, topLeftY, 200, 240) /// add stingray 
 }

 if (whatGesture == "Peace" && hand.handedness === "Right") {
   
  if (!initialized) {
    for (let i = 0; i < NumBubbles; i++) {
      x[i] = random(width);                
      y[i] = random(height, height + 100);
      speed[i] = random(0.3, 1.2);// upward speed
      size[i] = random(5, 19);  // bubble size
    }
    initialized = true;
  }

  for (let i = 0; i < NumBubbles; i++) {
    y[i] -= speed[i]; // move up

 drawingContext.shadowBlur = 16;
 drawingContext.shadowColor = color(180, 220, 255, 150); // light blue 

  noStroke();
    fill(200, 230, 255, 150); // light blue 
    ellipse(x[i], y[i], size[i]);

  }
   }

  } 
//----- 
}
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 



function checkIfMouthOpen(face) {

  let upperLip = face.keypoints[13]
  let lowerLip = face.keypoints[14]
  // ellipse(lowerLip.x,lowerLip.y,20)
  // ellipse(upperLip.x,upperLip.y,20)

  let d = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);
  //console.log(d)
  if (d < 10) {
    isMouthOpen = false;
  } else {
    isMouthOpen = true;
  }



  // // This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
// function drawPoints(feature, color = "#00ff00", size = 5) {
//   push()
//   for (let i = 0; i < feature.keypoints.length; i++) {
//     let element = feature.keypoints[i];
//     noStroke();
//     fill(color);
//     circle(element.x, element.y, size);
//   }
//   pop()
// }

}