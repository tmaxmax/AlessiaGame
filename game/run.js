STAY_DOWN.states.run = (function () {
  const {
    image,
    display,
    states,
    managers: { platform_manager, items_manager },
    constructors: { GameState, player },
  } = STAY_DOWN;
  const controller = STAY_DOWN.getController();
  const renderer = STAY_DOWN.getRenderer();
  console.log(image);
  const worldWidth = 1400;
  const worldHeight = 790;
  const player1 = new player(100, 100);
  const gravity = 1;
  const friction = 0.93;
  const output = document.createElement("p");
  output.innerText = "0";
  var ground = {
    y: worldHeight - 60,
  };
  var platforms = platform_manager.active_platforms;
  var items = items_manager.items_array;
  var item_count = 0;

  //activate and deactivate methods of GameState
  function activate() {
    document.body.appendChild(output);
    window.addEventListener("resize", resize);
    resize();
  }
  function deactivate() {
    window.removeEventListener("resize", resize);
  }

  function resize() {
    const rect = display.canvas.getBoundingClientRect();
    output.style.left = rect.left + "px";
    output.style.top = rect.top + "px";
  }

  //updating
  function update() {
    // these deal with controls and responses
    if (controller.getP()) {
      controller.setP(false);
      STAY_DOWN.changeState(states.pause);
      return;
    }
    if (controller.getLeft() == 1) player1.moveLeft();
    if (controller.getRight() == 1) player1.moveRight();
    if (controller.getUp() == 1 && player1.jumping == false) player1.jump();

    // this updates the position every update
    player1.updatePosition(gravity, friction);

    // this brings the player on screen every time
    collision(player1, ground.y, worldWidth, 0);

    // platforms
    for (var i = platforms.length - 1; i > -1; --i) {
      var platform = platforms[i];
      platform.moveUp();
      if (platform.y < 0) platform.y = ground.y;
      //colider with platform
      if (collidePlatform(player1, platform)) {
        // reseting jumping state
        player1.downer(platform.velocityY);
      }
    }
    //items
    for (var i = items.length - 1; i > -1; --i) {
      var item = items[i];
      if (collider(player1, item)) {
        item_count++;
        output.innerText = item_count;
        item.randomMove(worldWidth, worldHeight, ground.y);
      }
    }
  }

  function collidePlatform(player, platform) {
    if (
      player.getRight() < platform.getLeft() ||
      player.getLeft() > platform.getRight()
    )
      return false;
    if (
      player.getBottom() > platform.getTop() &&
      player.getOldBottom() <= platform.getOldTop()
    ) {
      player.setBottom(platform.getTop());
      return true;
    }
  }
  function collider(rect1, rect2) {
    if (
      rect1.getLeft() > rect2.getRight() ||
      rect1.getRight() < rect2.getLeft() ||
      rect1.getTop() > rect2.getBottom() ||
      rect1.getBottom() < rect2.getTop()
    )
      return false;
    return true;
  }
  function collision(player, top, right, left) {
    if (player.getBottom() >= top) {
      player.setBottom(top);
      player.downer();
    }
    if (player.getRight() >= right + player.width) {
      player.setRight(left);
    }
    if (player.getLeft() < left - player.width) {
      player.setLeft(right);
    }
  }

  // rendering
  function render() {
    display.fillStyle = "#2E2D4D";
    display.fillRect(0, 0, worldWidth, worldHeight);

    display.fillStyle = "#EFECCA";
    display.fillRect(0, ground.y, worldWidth, worldHeight);

    // platform
    for (var i = platforms.length - 1; i > -1; --i) {
      display.fillStyle = "#ECA72C";
      var platform = platforms[i];
      display.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
    //items
    for (var i = items.length - 1; i > -1; --i) {
      var item = items[i];
      display.fillStyle = "#AD343E";
      display.fillRect(item.x, item.y, 20, 20);
    }

    renderer.drawImage(image.alessia, player1.x, player1.y);
  }
  display.canvas.width = worldWidth;
  display.canvas.height = worldHeight;
  for (let x = worldWidth - 48; x > 0; x -= 90)
    platform_manager.createPlatform(x, ground.y);

  items_manager.addItem(100, 100);

  //return new gamestate
  return new GameState(update, render, activate, deactivate);
})();
