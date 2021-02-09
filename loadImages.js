STAY_DOWN.setLoader(
  (function () {
    return {
      loadImages(urls, callback) {
        var images = [];
        var count = urls.length;
        function resolve(event) {
          image.removeEventListener("load", resolve);
          image.removeEventListener("error", resolve);
          count--;
          if (count == 0) callback(images);
        }
        for (var i = count - 1; i > -1; i--) {
          var image = (images[i] = new Image());
          image.addEventListener("load", resolve);
          image.addEventListener("error", resolve);

          image.src = urls[i];
        }
      },
    };
  })()
);
