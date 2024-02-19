// The Blind Prophet

var initialDistance = undefined;
const directions = ["up", "down", "left", "right"];
var moves = ["up", "right"];
var lastMove = undefined;

// (x0, y0) the goal point
var x0;
var y0;

var pathSet = false; // We have no path set yet even if we know where the goal is

function getCoordinate(distance) {
  return Math.round(
    (Math.pow(initialDistance, 2) - Math.pow(distance, 2) + 1) / 2
  );
}

// It sets an optimised move list towards the goal
function getMovesToPoint(x0, y0) {
  const movesToGoal = [];

  // Minimum value between abs(x0) and abs(y0)
  var min = Math.min(Math.abs(x0), Math.abs(y0));

  // Maximum value between abs(x0) and abs(y0) -> We don't use it
  var max = Math.max(Math.abs(x0), Math.abs(y0));
  console.log("min: " + min, "max: " + max);

  var x0n = x0 / min;
  var y0n = y0 / min;
  console.log("x0n= " + Math.abs(Math.floor(x0n)));
  console.log("y0n= " + Math.abs(Math.floor(y0n)));
  var remainder;
  var move;

  if (Math.abs(x0) >= Math.abs(y0)) {
    for (var i = 0; i < min; i++) {
      for (var j = 0; j < Math.floor(Math.abs(x0n)); j++) {
        move = x0 < 0 ? "left" : "right";
        movesToGoal.push(move);
      }
      for (var k = 0; k < Math.floor(Math.abs(y0n)); k++) {
        move = y0 < 0 ? "down" : "up";
        movesToGoal.push(move);
      }
    }

    remainder = Math.abs(x0 % min);
    console.log("remainderX: " + remainder);
    move = x0 < 0 ? "left" : "right";
    for (var l = 0; l < remainder; l++) {
      movesToGoal.push(move);
    }
  } else if (Math.abs(y0) > Math.abs(x0)) {
    for (var i = 0; i < min; i++) {
      for (var j = 0; j < Math.floor(Math.abs(x0n)); j++) {
        move = x0 < 0 ? "left" : "right";
        movesToGoal.push(move);
      }
      for (var k = 0; k < Math.floor(Math.abs(y0n)); k++) {
        move = y0 < 0 ? "down" : "up";
        movesToGoal.push(move);
      }
    }

    remainder = Math.abs(y0 % min);
    console.log("remainderY: " + remainder);
    move = y0 < 0 ? "down" : "up";
    for (var l = 0; l < remainder; l++) {
      movesToGoal.push(move);
    }
  }

  console.log(x0n + " ... " + y0n);
  console.log(movesToGoal);

  return movesToGoal;
}

function restoreMov(lastMov) {
  var nextMove;

  switch (lastMov) {
    case "up":
      nextMove = "down";
      break;
    case "down":
      nextMove = "up";
      break;
    case "left":
      nextMove = "right";
      break;
    case "right":
      nextMove = "left";
      break;
  }

  return nextMove;
}

function amILost() {
  return !x0 || !y0;
}

function tick(distance) {
  // The next move which we return from this function
  var nextMove;

  // initialDistance only has to be set once
  // That's because when we make a fake move
  // we always come back to the origin => same distance
  // But this looks britle to me
  if (!initialDistance) {
    initialDistance = distance;
    console.log(initialDistance);
  }

  // The Prophet doesn't know where to go...
  if (amILost()) {
    // This means I made a fake move
    if (lastMove) {
      // y0 because our first fake move is "up"
      // If we change it, it breaks
      if (!y0) {
        y0 = getCoordinate(distance);
        console.log("distance Y:" + distance);
      } else if (!x0) {
        x0 = getCoordinate(distance);
        console.log("distance X: " + distance);
        console.log("Goal: " + x0 + ", " + y0);
      }

      nextMove = restoreMov(lastMove);
      lastMove = undefined;
    } else {
      nextMove = moves.shift();
      lastMove = nextMove;
      console.log("Next Move: " + nextMove);
    }
  } else {
    if (!pathSet) {
      moves = getMovesToPoint(x0, y0);
      pathSet = true; // Ready to go!
    } else {
      // We already have moves towards the goal
      nextMove = moves.shift();
      lastMove = nextMove;
    }
  }

  return nextMove;
}
