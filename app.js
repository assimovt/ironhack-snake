function Snake() {
  this.direction = 'left';

  this.body = [
    { row: 16, column: 20 },
    { row: 16, column: 21 },
    { row: 16, column: 22 },
    { row: 16, column: 23 },
    { row: 16, column: 24 }
  ];
}

Snake.prototype.move = function(maxRows, maxColumns) {
  var head = this.body[0];

  switch(this.direction) {
    case 'left':
      this.body.unshift({
        row: head.row,
        column: (head.column - 1 + maxColumns) %  maxColumns
      });
      break;

    // Your implementation
    case 'right':
      this.body.unshift({
        row: head.row,
        column: (head.column + 1) % maxColumns
      });
      break;

    case 'up':
      this.body.unshift({
        row: (head.row - 1 + maxRows) % maxRows,
        column: head.column
      });
      break;

    case 'down':
      this.body.unshift({
        row: (head.row + 1) % maxRows,
        column: head.column
      });
      break;
  }
  this.tail = this.body.pop();
};

Snake.prototype.goLeft = function() {
  if (this.direction === 'up' || this.direction === 'down') {
    this.direction = 'left';
  }
};

Snake.prototype.goRight = function() {
  if (this.direction === 'up' || this.direction === 'down') {
    this.direction = 'right';
  }
};

Snake.prototype.goUp = function() {
  if (this.direction === 'left' || this.direction === 'right') {
    this.direction = 'up';
  }
};

Snake.prototype.goDown = function() {
  if (this.direction === 'left' || this.direction === 'right') {
    this.direction = 'down';
  }
};

Snake.prototype.collidesWith = function(pos) {
  return this.body.some(function(el) {
    return el.row == pos.row && el.column == pos.column;
  });
};

Snake.prototype.hasEatenFood = function(foodPosition) {
  return this.body[0].row === foodPosition.row && this.body[0].column === foodPosition.column;
};

Snake.prototype.grow = function() {
  if (this.tail) {
    this.body.push(this.tail);
    this.tail = undefined;
  }
};

Snake.prototype.hasEatenItself = function() {
  return this.body.some(function(element, index, array) {
    return (element.row === array[0].row && element.column === array[0].column && index !== 0);
  });
};

function Game(options) {
  this.rows = options.rows;
  this.columns = options.columns;
  this.snake = options.snake;

  this.food = undefined;

  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.columns; col++) {
      $('.container').append($('<div>')
        .addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col)
      );
    }
  }

  this.generateFood();
  this.drawFood();
  this.drawSnake();
  this.assignControlsToKeys();
}

Game.prototype.assignControlsToKeys = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        this.snake.goUp();
        break;
      case 40: // arrow down
        this.snake.goDown();
        break;
      case 37: // arrow left
        this.snake.goLeft();
        break;
      case 39: // arrow right
        this.snake.goRight();
        break;
      case 80: // p pause
        if (this.intervalId) {
          this.stop();
        } else {
          this.start();
        }
        break;
    }
  }.bind(this));
};

Game.prototype.drawSnake = function() {
  this.snake.body.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';

    $(selector).addClass('snake');
  });
};

Game.prototype.generateFood = function() {
  do {
    this.food = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };
  } while (this.snake.collidesWith(this.food));
};

Game.prototype.drawFood = function() {
  var selector = '[data-row=' + this.food.row + ']' +
                 '[data-col=' + this.food.column + ']';
  $(selector).addClass('food');
};

Game.prototype.clearSnake = function() {
  $('.snake').removeClass('snake');
};

Game.prototype.clearFood = function() {
  $('.food').removeClass('food');
  this.food = undefined;
};

Game.prototype.start = function() {
  if (!this.intervalId) {
    this.intervalId = setInterval(this.update.bind(this), 100);
  }
};

Game.prototype.stop = function() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

Game.prototype.update = function() {
  this.snake.move(this.rows, this.columns);

  if (this.snake.hasEatenFood(this.food)) {
    this.snake.grow();
    this.clearFood();
    this.generateFood();
    this.drawFood();
  }

  if (this.snake.hasEatenItself()) {
    alert('Game over 👽');
    this.stop();
  }

  this.clearSnake();
  this.drawSnake();
};

var game;

$(document).ready(function() {
  game = new Game({
    rows: 50,
    columns: 50,
    snake: new Snake()
  });
  game.start();
});
