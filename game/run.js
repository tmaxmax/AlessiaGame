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
  const worldWidth = 1400;
  const worldHeight = 790;
  const player1 = new player(100, 100);
  const gravity = 1;
  const friction = 0.87;
  const output = document.createElement("p");
  output.innerText = "0";
  var ground = {
    y: worldHeight - 82,
  };
  var background = new player(0, 0);
  var itemPlayer = new player(0, 0);
  var platforms = platform_manager.active_platforms;
  var items = items_manager.items_array;
  var item_count = 0;
  var currentIndex;
  var dead = 0;
  var deadOtput = document.createElement("h1");
  var toggle = 0;
  var playerHasPlatform = 1;
  var frameIndexBackground = 0;
  var frameIndexItem = 0;

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
    if (dead === 0) {
      playerUpdate();
    } else {
      if (toggle === 0) {
        youAreDead();
        playerHasPlatform = 1;
        toggle = 1;
      }
    }

    var newPlatform = platforms[Math.floor(Math.random() * platforms.length)];
    if (platformCheck(newPlatform) && playerHasPlatform == 0) {
      platformSetter(player1, newPlatform);
      playerHasPlatform = 1;
      dead = 0;
    }

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
    itemPlayer.changeFrame(image.heartFrameSet[0], 5);
    frameIndexItem = itemPlayer.updateFrame();
    background.changeFrame(image.backgroundFrame[0], 7);
    frameIndexBackground = background.updateFrame();

    // this brings the player on screen every time
  }
  //end of update function

  //utility funcctions

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
  function detectColision(player, top, right, left) {
    if (player.getBottom() >= top) {
      item_count = 0;
      dead = 1;
    } else if (player.getBottom() <= player.height - 30) {
      item_count = 0;
      dead = 1;
    }
    if (player.getRight() >= right + player.width) {
      player.setRight(left);
    }
    if (player.getLeft() < left - player.width) {
      player.setLeft(right);
    }
  }

  //checking if the player can land on the platform
  function platformCheck(platform) {
    if (platform.getTop() < 270) {
      return 0;
    } else return 1;
  }

  //set the position
  function platformSetter(player, platform) {
    player.setBottom(platform.getTop() - platform.height);
    player.setLeft(platform.getLeft() + 10);
    player.downer();
  }

  // only updating player shit
  function playerUpdate() {
    //left press
    if (deadOtput.innerText != "") {
      deadOtput.innerText = "";
    }
    toggle = 0;

    if (controller.getLeft() == 1) {
      player1.moveLeft();
      player1.changeFrame(image.frameSets[1]);
      controller.RightLastState(false);
      controller.LeftLastState(true);
    }

    //right press
    if (controller.getRight() == 1) {
      player1.moveRight();
      player1.changeFrame(image.frameSets[0]);
      controller.RightLastState(true);
      controller.LeftLastState(false);
    }

    if (controller.getUp() == 1 && player1.jumping == false) {
      player1.jump();
    }

    if (!controller.getLeft() && !controller.getRight()) {
      if (controller.rightLastActive() == true) {
        player1.changeFrame(image.frameSets[2], 10);
      } else if (controller.leftLastActive() == true) {
        player1.changeFrame(image.frameSets[3], 10);
      }
    }

    // this updates the position every update
    player1.updatePosition(gravity, friction);

    detectColision(player1, ground.y, worldWidth, 0);
    output.innerText = item_count;

    currentIndex = player1.updateFrame();
    if (currentIndex != undefined) currentIndex;
  }
  function youAreDead() {
    document.body.appendChild(deadOtput);
    deadOtput.innerText = "You are dead ! Please wait " + 3 + " seconds";
    var timeleft = 2;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
      } else {
        deadOtput.innerText =
          "You are dead ! Please wait " + timeleft + " seconds";
      }
      timeleft -= 1;
    }, 1000);
    setTimeout(() => {
      playerHasPlatform = 0;
    }, 3000);
  }
  // rendering
  function render() {
    let colorArray = STAY_DOWN.getColor();

    display.fillStyle = colorArray[0];

    //background
    display.fillRect(0, 0, worldWidth, worldHeight);
    renderer.drawImageBackground(image.background, 0, 0, frameIndexBackground);

    //ground
    display.fillStyle = colorArray[1];
    display.fillRect(0, ground.y, worldWidth, worldHeight);

    // platform
    for (var i = platforms.length - 1; i > -1; --i) {
      display.fillStyle = colorArray[2];
      var platform = platforms[i];
      display.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    //items
    for (var i = items.length - 1; i > -1; --i) {
      var item = items[i];

      renderer.drawItem(image.heart, item.x, item.y, frameIndexItem);
    }
    if (dead === 0)
      renderer.drawImage(
        image.alessia,
        player1.x - 15,
        player1.y,
        currentIndex
      );
    else {
    }
    // display.fillRect(
    //   player1.x,
    //   player1.y,
    //   player1.width,
    //   player1.height,
    //   player1.color
    // );
  }
  display.canvas.width = worldWidth;
  display.canvas.height = worldHeight;
  for (let x = worldWidth - 48; x > 0; x -= 90)
    platform_manager.createPlatform(x, ground.y);

  items_manager.addItem(100, 100);

  //return new gamestate
  return new GameState(update, render, activate, deactivate);
})();
