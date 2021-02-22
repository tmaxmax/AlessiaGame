STAY_DOWN.constructors.GameState = (function () {
  //clase
  const GameState = function (update, render, activate, deactivate) {
    this.update = update;
    this.render = render;
    this.activate = activate;
    this.deactivate = deactivate;
  };
  GameState.prototype = {};
  return GameState;
})();
//
