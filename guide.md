# IronHack Guide Game - Snake

The goals of this session it to build a popular game Snake with CSS, HTML and JS. We'll be creating it incrementally, going thru entire flow and taking some time build the steps on our own.

## Thinking of the game

Let's first think what do we need to build this game and the logic behind it:

* We'll need a board.
* A snake, which would move on the board.
* A randomly generated apple on the board.
* If snake eats an apple, it grows and another apple appears.
* Finally, if snake collides with itself, player looses and the game finishes.


## Building a board

Let's first build a board with a 50x50 grid. To build a board we need to generate a bunch of colored rectangles in a container. 

**Q: How shall we do that?**

Your task:

* Create a `div` with a CSS class `container` in the body:
    * Set the width and height to 800px
    * Position container in the middle of the page
    * Set its background color to `abcb99`
* Create a `Game` constructor function, which fills up container with `div`s of a CSS class named `cell` and:
    * Sets their widths and heights to 16x16 pixels
    * Sets their border to 1px solid with color `rgba(255, 255, 255, 0.2)`
* When document is ready, create a **new** `game` variable

## Putting a snake on the board)

Now, we'd need to put a snake on the board. Say, we want to start it with 5 rectangles somewhere in the middle.

**Q: How shall we do that? How can we keep track where the snake is on the board? What data structure?**

**A: We can give unique attributes representing x, y to each `cell`, store initial coordinates of the snake in a 2-dimensional array and when the game is loaded, fill corresponding rectangles with a snake's color.**

Your task:

* Create a `Snake` constructor function that stores its initial location in the attribute named `body`. Initialize it with, for example, 16th row, taking 5 positions to the right.
* Update board generation to also set `data-row` and `data-col` attributes on a `cell` div. For example, `cell` at position 2,3 will have classes `data-row-2` and `data-col-3`.
* Create a `Game` prototype named `drawSnake` that iterates over snake's `body` attribute, finds a div with each of `body`'s position and adds a CSS class `snake` to it, which just has a background color of `#111` (dark grey).
* Finally call `drawSnake` after the board is initialized.


## Moving snake

Next up, let's create a function that can move the snake in the left direction.

**Q: Knowing our Snake is an array of coordinates, how can we change its body one position to the left?***

**A: We can keep the same row as the body, insert a new element before snake's "head", and remove one element from the tale. Then, we can clear all `snake` CSS classes and redraw again.**

**Gotcha**: Setting row is easy, but how about the column? What if it goes over the board plane, how can we set its Y coordinate?

For that, we can add 50 (since our board is 50x50) and take the remainder with modulus operator.

Your task:

* Create other move operations, such as `right`, `up`, and `down`. Test that they work in a console by changing the initial direction of the snake.

In order to test the `left` direction, you would need to change the initial coordinates of the snake, since the game does not allow us to move in the opposite direction. For instance, try these:

```
    { row: 16, column: 20 },
    { row: 17, column: 20 },
    { row: 18, column: 20 },
    { row: 19, column: 20 },
    { row: 20, column: 20 }
```


## Adding animation

Now that we can update snake on the board, let's animate it or rather move automatically.

**Q: How can we make the update() function of a snake to be called over and over again?**

**A: That's right. We can use `setInterval`**

Your task:

* Create a `Game.start` prototype, which sets the interval to call the `Game.update` function with 1/10th of a second.

**Gotcha**: Does it work? If not, why?
  
**A: That's right. Since we're in a different context (setInterval's callback), we need to bind game to it - ie. itself.**


## Assign game controls and change direction

Moving in a single direction isn't very interesting, so let's capture pressed arrow keys and change the direction of a snake.

Your task:

* Add `goUp`, `goDown`, `goLeft`, and `goRight` prototype functions to snake that change its `direction`.
* Add a jQuery event listener on `$('body')` when the game initializes, and if one of the _up_, _down_, _left_, or _right_ keys has been pressed, call the respective snake's functions.

**Gotcha**: You can move to the left, only when the snake is currently moving upwards or downwards. You can move down, only when it's currently moving to the left or right, ... and so on.


## Pausing the game

Let's add an ability to pause the game with `p` key.

Your task:

* Create a `Game.stop` prototype that clears the interval.
* `stop` the game when the `p` key is pressed. If it's pressed again, resume.


## Generating food on the board

It took us some time to build a snake, so it got really hungry. So, let's give it some food to eat.

**Q: How can we show food on the board?**

**A: It's very similar to drawing a snake. We simply generate a random position on the board and add a CSS class to it with some other background color. Remember, we don't want foot to appear on top snake - it's not a hedgehog ;).**

Your task:

* Create a `Snake.collidesWith` prototype method, which receives a position object with `row` and `column` and returns true if any of the snakes `body` positions match. (Hint: Use [Array.prototype.some()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some)).
* Create a `Game.generateFood` prototype method that continuously tries to generate a random position for `row` and `column` (within the board range), until it does not collide with any of the snake's positions. Store the found position in `Game.food`. (Hint: Use can use `do, while` loop here).
* Create a `Game.drawFood` prototype method, which adds a CSS class with background `red` to the generated `Game.food` position. (Hint: It should be very similar to `drawSnake` method created earlier).
* Finally, when the game initializes, before we draw a snake, `generateFood` and `drawFood`.


## Eating food and growing

Now, that we've got some food, let's implement eating it and growing the snake. Every time we update the game, we'd like to check whether snake's head has hit the food, and if it did, we'll need to remove the food element and add one more element to the snake's tail.

Your task:

* Create a `Snake.hasEatenFood` prototype that receives a food position and returns `true` if it matches with snake's head, otherwise `false`.
* Create a `Snake.grow` prototype that adds one more element to snake's tail. (Hint: In the `move` function, we've popped one element from the tail, so could you store it in `Snake` object and reuse?)
* Create a `Game.clearFood` prototype that clears food from the board.
* Finally, in `Game.update` method, after each move, check whether snake `hasEatenFood` and if it did, `grow` it and regenerate food.


## Don't allow snake to eat itself

One last bit we're missing is not letting snake to eat itself. 

**Q: How can we detect when snake eats itself?**

**A: We could iterate over each of snake body's positions and see if any of its elements match with its head.***

Your task:

* Add a `Snake.hasEatenItself` prototype that iterates over `Snake.body` and for every element returns (boolean) whether its in the same position as head. (Hint: You can use the same `Array.prototype.some` function we've used earlier).
* In the same place, where we test whether food was eaten, check whether snake has eaten itself, and if it did, `stop` the game and `alert` the player.


## Refactoring

Refactoring is the process of restructuring existing code (simplifying, removing duplications - DRYing, etc.), without changing its external behaviour.

### Refactoring task 1

Instead of hard-coded 50x50 grid, pass the values to the `Game` initialization as an object options and reuse them throughout the code. Also, instead of instantiating `Snake` object inside the game, pass it in the options as well.


### Refactoring task 2

Let's split the code into 3 separate files (`app.js`, `game.js`, and `snake.js`) and put them under a folder named `js`.

### Refactoring task 3

Let's also organize the methods of the Game into private and public with the convention that private methods should start with `_`. 

## Things to improve

There are always things to improve, and here are some of them:

* Our app layout is not customizable, since the width/height of the board and cell's dimensions are exactly for 50x50 grid. So, it'd be better to draw it based on the game initialisation.  
* The snake's speed remains constant. It'd be great if the speed increased as the snake grows.
* When the game is lost, we simply stop it and to restart one needs to refresh the page. We could do better than that!
* The entire game is drawn with adding/removing HTML elements. It'd be great to use HTML Canvas instead.
