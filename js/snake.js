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
