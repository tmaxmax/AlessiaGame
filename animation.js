const STAY_DOWN = (function () {
  //metode private
  let state;
  let controller;
  let engine;
  let loader;
  let renderer;
  let colors = [];
  return {
    constructors: {},
    image: {
      alessia: undefined,
      optionOne: undefined,
      optionTwo: undefined,
      frameSets: [
        [0, 1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18],
        [19, 20, 21, 22],
      ],
      frameSetStand: [[0, 1, 2, 3, 4, 5]],
    },
    managers: {},
    states: {},
    display: document.createElement("canvas").getContext("2d", { alpha: true }),
    displayCH: document
      .createElement("canvas")
      .getContext("2d", { alpha: true }),
    //changeState
    changeState(currentState, colorPallet) {
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
    getColor() {
      return colors;
    },

    //initializer
    initialize() {
      const {
        image,
        display,
        displayCH,
        states: { run, pause, chooser },
      } = this;
      loader.loadImages(
        [
          "alessiaWHITE.png",
          "alessiaFINALred.png",
          "alessiaFINALwhite.png",
          "alessiaRED.png",
        ],
        function (images) {
          image.alessiaWhite = images[0];
          image.optionOne = images[1];
          image.optionTwo = images[2];
          image.alessia = images[3];
          controller.activate();
          document.body.appendChild(display.canvas);
          document.body.appendChild(displayCH.canvas);
          STAY_DOWN.changeState(chooser);
          engine.start();
        }
      );

      window.addEventListener("resize", chooser.resize);
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
    setColor(colorsArray) {
      colors = colorsArray;
    },
  };
})();
