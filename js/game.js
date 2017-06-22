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
