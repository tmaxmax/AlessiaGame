STAY_DOWN.setRenderer(
  (function () {
    const {
      display,
      displayCH,
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
      drawImage1(image, x, y, currentFrame) {
        displayCH.drawImage(
          image,
          (image.width / 6) * currentFrame,
          0,
          image.width / 6,
          image.height,
          Math.floor(x),
          Math.floor(y),
          image.width / 6,
          image.height
        );
      },
    };
  })()
);
