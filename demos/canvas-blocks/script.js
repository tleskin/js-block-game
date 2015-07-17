var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Block(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Block.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

Block.prototype.move = function () {
  if (this.y + this.height < canvas.height){this.y++;}
  return this;
};

var blocks = [];

var specialBlock = new Block(10, 10, 25, 25);
specialBlock.move = function () {
  this.x++;
  Object.getPrototypeOf(this).move.call(this);
  return this;
};
blocks.push(specialBlock);

canvas.addEventListener('click', function () {
  var pos = getClickPosition(event);
  var block = new Block(pos.x, pos.y, 10, 10);
  blocks.push(block);
});

requestAnimationFrame(function gameLoop(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(function (block) { block.draw().move(); });
  requestAnimationFrame(gameLoop);
});
