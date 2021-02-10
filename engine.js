STAY_DOWN.setEngine(
  (function (window) {
    var stateInput;
    var raf_handle;
    var running = false;
    var acumulated_time = 0;
    var framerate_time = 1000 / 120;
    var current_time = 0;
    function cycle(time_stamp) {
      raf_handle = window.requestAnimationFrame(cycle);
      acumulated_time += current_time - framerate_time;
      current_time = time_stamp;
      if (acumulated_time > 60) acumulated_time = framerate_time;
      while (acumulated_time >= framerate_time) {
        stateInput.update();
        acumulated_time -= framerate_time;
      }
      stateInput.render();
    }
    return {
      start() {
        running = true;
        raf_handle = window.requestAnimationFrame(cycle);
      },
      stop() {
        running = false;
        cancelAnimationFrame(raf_handle);
      },
      setState(state) {
        stateInput = state;
      },
    };
  })(window)
);
