STAY_DOWN.setController(
  (function (window) {
    //these are private because of the anonymous function
    const input = function () {
      this.active = false;
      this.state = false;
      this.lastPressed = false;
    };
    input.prototype = {
      trigger(state) {
        if (state != this.state) this.active = this.state = state;
      },
    };
    const left = new input();
    const right = new input();
    const up = new input();
    const p = new input();

    function keyUpDown(e) {
      e.preventDefault();
      state = e.type == "keydown";
      switch (e.keyCode) {
        case 37:
          left.trigger(state);
          break;
        case 38:
          up.trigger(state);
          break;
        case 39:
          right.trigger(state);
          break;
        case 80:
          p.trigger(state);
          break;
      }
    }

    // these are public because we return them
    return {
      getLeft() {
        return left.active;
      },
      getRight() {
        return right.active;
      },
      getUp() {
        return up.active;
      },
      getP() {
        return p.active;
      },
      setP(active) {
        p.active = active;
      },
      RightLastState(state) {
        right.lastPressed = state;
      },
      LeftLastState(state) {
        left.lastPressed = state;
      },
      rightLastActive() {
        return right.lastPressed;
      },
      leftLastActive() {
        return left.lastPressed;
      },
      activate() {
        window.addEventListener("keydown", keyUpDown);
        window.addEventListener("keyup", keyUpDown);
      },
    };
  })(window)
);
