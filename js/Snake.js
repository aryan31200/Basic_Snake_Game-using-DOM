var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement('img');
  this.img.src = 'images/snake1.png';
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  // Set snake's starting coordinates
  // create initial number of snake sections (snake length)
    this.setX(maxX/2);
    this.setY(maxY/2);
    for(var i=0;i<NUM_INITIAL_SECTIONS;i++){
        this.sections.unshift(new SnakeSection(maxX/2,maxY/2+i+1));
    }
};
Snake.prototype.hasCollided = function(maxX, maxY) {
  // Check if snake has collided with itself or board boundaries.
  if(this.getX()<0||this.getX()>=maxX||this.getY()<0||this.getY()>=maxY){
      return true;
  }
  for(var i=0;i<this.sections.length;i++){
      if(this.isSameLocation(this.sections[i])){
          return true;
      }
  }
  return false;
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  // Move snake here
  this.sections.push(new SnakeSection(this.getX(),this.getY()));
  if(this.direction===UP){
    this.setY(this.getY()-1);
  }else if(this.direction===DOWN){
    this.setY(this.getY()+1); 
  }else if(this.direction===LEFT){
    this.setX(this.getX()-1);
  }else if(this.direction===RIGHT){
    this.setX(this.getX()+1);
  }
};

Snake.prototype.draw = function(context, spacing) {
  // Draw the complete snake
  this.sections.forEach(snakeElement => snakeElement.draw(context,spacing));
  DrawUtil.drawImage(context,this.img,spacing*this.getX(),spacing*this.getY(),spacing,spacing);
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  var snakeHead=this;
  document.addEventListener('keydown', function(e) {
    // Set snake's nextDirection based on keypress.
    if(e.keyCode===UP_KEY_CODE && snakeHead.direction!==DOWN){
        snakeHead.img.src='images/snake1.png';
        snakeHead.nextDirection=UP;
    }else if(e.keyCode===DOWN_KEY_CODE && snakeHead.direction!==UP){
        snakeHead.img.src='images/snake3.png';
        snakeHead.nextDirection=DOWN;
    }else if(e.keyCode===LEFT_KEY_CODE && snakeHead.direction!==RIGHT){
        snakeHead.img.src='images/snake.png';
        snakeHead.nextDirection=LEFT;
    }else if(e.keyCode===RIGHT_KEY_CODE && snakeHead.direction!==LEFT){
        snakeHead.img.src='images/snake4.png';
        snakeHead.nextDirection=RIGHT;
    }
    e.preventDefault();
  });
};
