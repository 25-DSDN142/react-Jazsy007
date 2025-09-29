let bgImage;

/* load images here */
function prepareInteraction() {

  Fish = loadImage('/images/Fish1.png');
  Jellyfish = loadImage('/images/Jellyfish.png');
  Shark1 = loadImage('/images/Shark1.png');
  Shark2 = loadImage('/images/Shark2.png');
  Ocean = loadImage('/images/Background.jpg');

}

let face;

function drawInteraction(faces, hands) {

  // draw background first
 image(Ocean, 0, 0, width, height);

  if (faces.length > 0) {
    face = faces[0];

    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let faceWidth = face.faceOval.width;
    let faceHeight = face.faceOval.height;

  
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

 // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
 for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    //console.log(hand);

    if (showKeypoints) {
      drawConnections(hand)
    }

    // This is how to load in the x and y of a point on the hand.
    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;

    /*
    Start drawing on the hands here
    */

 if (hand.handedness === "Right") {
 let topLeftX = indexFingerTipX - 200 / 2; // fish on top of finger centered 
 let topLeftY = indexFingerTipY - 240 / 2;
  image(Fish, topLeftX, topLeftY, 200, 240)
  }
   
 if (hand.handedness === "Left") {
 let topLeftX = indexFingerTipX - 200 / 2; // jellyfish on top of finger centered 
 let topLeftY = indexFingerTipY - 240 / 2;
  image(Jellyfish, topLeftX, topLeftY, 200, 240)
  }
   
} 

  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
}



// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature, color = "#00ff00", size = 5) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(color);
    circle(element.x, element.y, size);
  }
  pop()
}

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

}