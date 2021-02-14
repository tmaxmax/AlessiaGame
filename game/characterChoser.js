STAY_DOWN.states.chooser = (function () {
  const {
    displayCH,
    image,
    constructors: { GameState, player },
  } = STAY_DOWN;
  const renderer = STAY_DOWN.getRenderer();
  const WorldWidth = 1400;
  const WorldHeight = 740;
  var Index = 0;
  var player2 = new player(100, 100);
  function update() {
    player2.changeFrame(image.frameSetStand[0], 5);
    Index = player2.updateFrame();
  }
  function render() {
    displayCH.fillStyle = "#120627";
    displayCH.fillRect(0, 0, WorldWidth, WorldHeight);
    renderer.drawImage1(image.optionOne, 0, 200, Index);
    renderer.drawImage1(image.optionTwo, 500, 200, Index);
  }
  function activate() {}
  function deactivate() {}

  displayCH.canvas.width = WorldWidth;
  displayCH.canvas.height = WorldHeight;

  return new GameState(update, render, activate, deactivate);
})();
