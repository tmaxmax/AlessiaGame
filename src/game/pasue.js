STAY_DOWN.states.pause = (function () {
  const {
    states,
    changeState,
    constructors: { GameState },
  } = STAY_DOWN;
  const controller = STAY_DOWN.getController();
  function update() {
    if (controller.getP()) {
      controller.setP(false);
      changeState(states.run);
    }
  }
  function render() {}
  function activate() {}
  function deactivate() {}

  return new GameState(update, render, activate, deactivate);
})();
