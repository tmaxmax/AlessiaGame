STAY_DOWN.setRenderer(
  (function () {
    const { display } = STAY_DOWN;
    console.log(display);
    return {
      drawImage(image, x, y) {
        display.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          x,
          y,
          image.width,
          image.height
        );
      },
    };
  })()
);
