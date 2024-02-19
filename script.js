// The Blind Prophet's solution

let initialDistance = undefined;
const directions = ["up", "down", "left", "right"];
const fakeMoves = ["right", "up"];
let moves = [];
let lastMove = undefined;
// (x0, y0) is the goal point
let x0;
let y0;

function isVertical(move) {
  return move === "up" || move === "down";
}

function getCoordinate(distance, initialDistance) {
  return Math.round(
    (Math.pow(initialDistance, 2) - Math.pow(distance, 2) + 1) / 2
  );
}

function reverseMove(move) {
  const oppositeMove = { up: "down", down: "up", left: "right", right: "left" };
  return oppositeMove[move];
}

function isProphetLost() {
  return !x0 || !y0;
}

function getMovesToPoint(x0, y0) {
  const newMoves = [];

  // Horizontal movement
  if (x0 > 0) {
    for (let i = 0; i < x0; i++) {
      newMoves.push("right");
    }
  } else {
    for (let i = 0; i < Math.abs(x0); i++) {
      newMoves.push("left");
    }
  }

  // Vertical movement
  if (y0 > 0) {
    for (let j = 0; j < y0; j++) {
      newMoves.push("up");
    }
  } else {
    for (let j = 0; j < Math.abs(y0); j++) {
      newMoves.push("down");
    }
  }

  return newMoves;
}

function tick(distance) {
  let nextMove;

  // We need to store the initialDistance
  // at (0, 0) to get coordinates
  if (!initialDistance) {
    initialDistance = distance;
  }

  if (isProphetLost()) {
    if (lastMove) {
      if (!y0 && isVertical(lastMove)) {
        y0 = getCoordinate(distance, initialDistance);
      } else if (!x0 && !isVertical(lastMove)) {
        x0 = getCoordinate(distance, initialDistance);
      }
      // We need to get back to the initial point
      nextMove = reverseMove(lastMove);
      lastMove = undefined;
    } else {
      nextMove = fakeMoves.shift();
      lastMove = nextMove;
    }
  } else {
    if (moves.length === 0 && distance !== 0) {
      moves = getMovesToPoint(x0, y0);
    } else {
      nextMove = moves.shift();
      lastMove = nextMove;
    }
  }

  return nextMove;
}
