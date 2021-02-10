STAY_DOWN.setRenderer(
  (function () {
    const {
      display,
      constructors: { AnimationCharacter },
    } = STAY_DOWN;
    return {
      drawImage(image, x, y, currentFrame) {
        display.drawImage(image, 22 * currentFrame, 0, 22, 31, x, y, 22, 31);
      },
    };
  })()
);
