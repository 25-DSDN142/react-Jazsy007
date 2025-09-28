// ----=  HANDS  =----
let halo;
let BlueH;
let RedH;

let blue = true;

function prepareInteraction() {
  BlueH = loadImage('/images/Blueheart.png');
  RedH = loadImage('/images/Redheart.png');
}

function drawInteraction(faces, hands) {

  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }
    // console.log(hand);
    /*
    Start drawing on the hands here
    */

    let whatGesture = detectHandGesture(hand)
    if (whatGesture == "Peace") {
      blue = true;
    }
    if (whatGesture == "Thumbs Up") {
      blue = false;
    }

    /*
    Stop drawing on the hands here
    */
  }

  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face)
    }
    // console.log(face);
    /*
    Once this program has a face, it knows some things about it.
    This includes how to draw a box around the face, and an oval. 
    It also knows where the key points of the following parts are:
     face.leftEye
     face.leftEyebrow
     face.lips
     face.rightEye
     face.rightEyebrow
    */
    /*
    Start drawing on the face here
    */
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;

    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;

    if (blue) {
      image(BlueH, rightEyeCenterX - 50, rightEyeCenterY -50, 80, 100) // Shows blue heart
      image(BlueH, leftEyeCenterX -50, leftEyeCenterY -50, 80, 100) // Shows blue heart
    } else {
      image(RedH, rightEyeCenterX -50, rightEyeCenterY -50, 80, 100) // Shows red heart
      image(RedH, leftEyeCenterX -50, leftEyeCenterY -50, 80, 100) // Shows red heart
    }
    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
}


function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}

// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}