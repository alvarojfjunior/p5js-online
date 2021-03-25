var socket;
var direction = 'x';
var position = { x: 10, y: 10 };

const userColor = getRandomColor();

function setup() {
  createCanvas(400, 400);
  frameRate(5);

  background(0);
  socket = io.connect('http://localhost:3000');

  // Score Informations
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');


  // Socket is listening changes....
  socket.on('playerMove',
    function (data) {
      console.log("Got mouse: " + data.x + " " + data.y);
      circle(data.position.x, data.position.y, 20);
      fill(data.color);
      noStroke();
    }
  );
}

function draw() {
  if (direction === 'right')
    position.x = position.x + 10;
  else if (direction === 'left')
    position.x = position.x - 10;
  else if (direction === 'down')
    position.y = position.y + 10;
  else if (direction === 'up')
    position.y = position.y - 10;


  circle(position.x, position.y, 20);
  noStroke();

  socket.emit('playerMove', {
    id: socket.id,
    color: userColor,
    position: position
  });
}


function keyPressed() {
  if (key === 'ArrowRight') {
    position.x = position.x + 10;
    direction = 'right'
  } if (key === 'ArrowLeft') {
    position.x = position.x - 10;
    direction = 'left'
  } else if (key === 'ArrowDown') {
    position.y = position.y + 10;
    direction = 'down'
  } else if (key === 'ArrowUp') {
    position.y = position.y - 10;
    direction = 'up'
  }
}
