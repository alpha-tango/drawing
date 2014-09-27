function drawRect(x, y, w, h, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, radius, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight

var SCREEN_WIDTH = ctx.canvas.width;
var SCREEN_HEIGHT = ctx.canvas.height;

function ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xVel = SCREEN_WIDTH/700;
  this.isStopped = true;
  this.grow = function() {
    this.radius *= 1.1;
  };
};

//draw group of circles
var group = new Array();

for (i = 20; i < SCREEN_WIDTH; i+= (SCREEN_WIDTH/30)) {
  for (j = 20; j < SCREEN_HEIGHT; j += (SCREEN_HEIGHT/15)) {
    group.push(new ball (i,j, SCREEN_WIDTH/100));
  }
}

function draw() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  //print circles to screen
  group.forEach(function(c) {
    drawCircle(c.x, c.y, c.radius, 'black');
    });
}

function tick() {
  // Update game logic here.
  // e.g. moving a ball back and forth across the screen

  if (!ball.isStopped) {

    ball.x += ball.xVel;

    // Reverse when ball hits right or left side of the screen.
    if ((ball.xVel > 0 && (ball.x + ball.radius) > SCREEN_WIDTH ||
         (ball.xVel < 0 && (ball.x - ball.radius) < 0))) {
      ball.xVel = -ball.xVel;
    }
  }
}

function loop(time) {
  tick();
  draw();

  window.requestAnimationFrame(function(time) {
    loop(time);
  });
}

function keyDown(event) {
  var handled = true;

  switch (event.keyCode) {

  // Handle user input here when a key is pressed.
  // A few key constants are defined in /js/key_codes.js
  // e.g. stops the ball from moving when pressing down the space bar

  case SPACE_KEY:
    ball.isStopped = true;
    break;

  default:
    handled = false;
    break;
  }

  if (handled) {
    event.preventDefault();
  }
}

function keyUp(event) {
  var handled = true;

  switch (event.keyCode) {

  // Handle user input here when a key is released.
  // A few key constants are defined in /js/key_codes.js
  // e.g. starts the ball moving again when releasing space bar

  case SPACE_KEY:
    ball.isStopped = false;
    break;

  default:
    handled = false;
    break;
  }

  if (handled) {
    event.preventDefault();
  }
}

function run() {
  window.onkeydown = keyDown;
  window.onkeyup = keyUp;

  window.requestAnimationFrame(function(time) {
    loop(time);
  });
}

ball.on('mouseover', function() {
  alert("wee!");
});

run();
