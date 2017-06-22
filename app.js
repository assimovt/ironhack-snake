function Game() {
  for (var row = 0; row < 50; row++) {
    for (var col = 0; col < 50; col++) {
      $('.container').append($('<div>').addClass('cell'));
    }
  }
}

$(document).ready(function() {
  var game = new Game();
});
