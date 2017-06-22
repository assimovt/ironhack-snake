var game;

$(document).ready(function() {
  game = new Game({
    rows: 50,
    columns: 50,
    snake: new Snake()
  });
  game.start();
});
