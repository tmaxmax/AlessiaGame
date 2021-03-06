STAY_DOWN.states.chooser = (function () {
  const {
    displayCH,
    display,
    states,
    changeState,
    image,
    constructors: { GameState, player },
  } = STAY_DOWN;
  const renderer = STAY_DOWN.getRenderer();
  STAY_DOWN.setColor();
  const WorldWidth = 1400;
  const WorldHeight = 740;
  var colorArrayOptionOne = ["#8C705F", "#FEEFDD", "#D8D8D8", "#CCFFCB"];
  var colorArrayOptionTwo = ["#130A1E", "#EED3D9", "#CF8E80", "#FFFACC"];
  const alessiaOne = document.createElement("button");
  alessiaOne.setAttribute("class", "player1");
  alessiaOne.setAttribute("href", "player1");
  alessiaOne.innerText = "Player 1";
  const alessiaTwo = document.createElement("button");
  alessiaTwo.setAttribute("class", "player2");
  alessiaTwo.setAttribute("href", "player2");
  alessiaTwo.innerText = "Player 2";
  var Index = 0;
  var playerOne = new player(100, 100);
  var playerTwo = new player(100, 100);
  var playerOneChosen = 0;
  var playerTwoChosen = 0;
  var positionForOne = 350;
  var positionForTwo = 50;
  var player1 = 1;
  var player2 = 2;
  function activate() {
    document.body.appendChild(alessiaOne);
    document.body.appendChild(alessiaTwo);
    alessiaOne.addEventListener("click", checkPlayer);
    alessiaTwo.addEventListener("click", checkPlayer);
    window.addEventListener("resize", resize);
    resize();
  }
  function deactivate() {
    window.removeEventListener("resize", resize);
  }
  function resize() {
    const rect = display.canvas.getBoundingClientRect();
    var leftOne = rect.left + 100;
    var topOne = rect.top + 50;
    var leftTwo = rect.left + WorldWidth - 300;
    alessiaTwo.style.left = leftOne + "px";
    alessiaTwo.style.top = topOne + "px";
    alessiaOne.style.left = leftTwo + "px";
    alessiaOne.style.top = topOne + "px";
  }
  function checkPlayer(e) {
    if (e.target.classList.contains("player1")) {
      setTimeout(() => {
        changeState(states.run);
        displayCH.canvas.setAttribute("class", "deactivate");
      }, 2000);
      playerOneChosen = 1;
      alessiaOne.style.display = "none";
      alessiaTwo.style.display = "none";
      image.alessia = image.alessiaWhite;
      STAY_DOWN.setColor(colorArrayOptionOne);
      STAY_DOWN.setPlayer(player1);
      //background + item + platform
      image.background = image.city;
      image.item = image.heart;
      image.platform = image.hoverboard;
    } else if (e.target.classList.contains("player2")) {
      setTimeout(() => {
        changeState(states.run);
        displayCH.canvas.setAttribute("class", "deactivate");
      }, 2000);
      STAY_DOWN.setPlayer(player2);
      playerTwoChosen = 1;
      alessiaOne.style.display = "none";
      alessiaTwo.style.display = "none";
      STAY_DOWN.setColor(colorArrayOptionTwo);

      //background + item + platform
      image.background = image.optionOneBackground;
      image.item = image.heart;
      image.platform = image.cloud;
    }
  }
  function update() {
    playerOne.changeFrame(image.frameSetStand[0], 5);
    playerTwo.changeFrame(image.frameSetStand[0], 5);
    Index = playerOne.updateFrame();
    Index = playerTwo.updateFrame();
    if (playerOneChosen) {
      positionForOne = positionForOne + 4;
    }
    if (playerTwoChosen) {
      positionForTwo = positionForTwo + 4;
    }
  }
  function render() {
    displayCH.fillStyle = "#6e4fa3";
    displayCH.fillRect(0, 0, WorldWidth, WorldHeight);
    if (!playerOneChosen)
      renderer.drawImage1(image.optionOne, positionForTwo, 100, Index);
    if (!playerTwoChosen)
      renderer.drawImage1(
        image.optionTwo,
        WorldWidth - positionForOne,
        100,
        Index
      );
  }

  displayCH.canvas.width = WorldWidth;
  displayCH.canvas.height = WorldHeight;

  return new GameState(update, render, activate, deactivate);
})();
