const STAY_DOWN = (function () {
  //metode private
  let state;
  let controller;
  let engine;
  let loader;
  let renderer;
  return {
    constructors: {},
    image: {
      alessia: undefined,
      frameSets: [
        [0, 1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18],
        [19, 20, 21, 22],
      ],
    },
    managers: {},
    states: {},

    display: document.createElement("canvas").getContext("2d", { alpha: true }),

    //changeState
    changeState(currentState) {
      currentState.deactivate();
      state = currentState;
      currentState.activate();
      engine.setState(currentState);
    },
    //getter
    getEngine() {
      return engine;
    },
    getController() {
      return controller;
    },
    getLoader() {
      return loader;
    },
    getRenderer() {
      return renderer;
    },

    //initializer
    initialize() {
      const {
        image,
        display,

        states: { run },
      } = this;
      loader.loadImages(["mallesia.png"], function (images) {
        console.log(images);
        image.alessia = images[0];
        console.log(image.alessia);
        controller.activate();
        document.body.appendChild(display.canvas);
        STAY_DOWN.changeState(run);
        engine.start();
      });

      window.addEventListener("resize", run.resize);
    },

    //setters
    setController(controllerSetter) {
      controller = controllerSetter;
    },
    setEngine(engineSetter) {
      engine = engineSetter;
    },
    setLoader(loaderSetter) {
      loader = loaderSetter;
    },
    setRenderer(rendererSetter) {
      renderer = rendererSetter;
    },
  };
})();
