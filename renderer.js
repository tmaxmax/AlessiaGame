STAY_DOWN.setRenderer(
  (function () {
    const {
      display,
      constructors: { AnimationCharacter },
    } = STAY_DOWN;
    return {
      drawImage(image, x, y, currentFrame) {
        display.drawImage(
          image,
          22 * currentFrame * 4,
          0,
          22 * 4,
          31 * 4,
          Math.floor(x),
          Math.floor(y),
          22 * 4,
          31 * 4
        );
      },
    };
  })()
);
