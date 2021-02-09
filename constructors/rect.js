STAY_DOWN.constructors.rect = (function () {
  const rect = function (x, y, width, height) {
    this.old_y = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };
  rect.prototype = {
    // do not set those for screen aparence
    getBottom() {
      return this.y + this.height;
    },
    setBottom(top) {
      this.y = top - this.height;
    },
    getTop() {
      return this.y;
    },
    getRight() {
      return this.x + this.width;
    },
    setRight(right) {
      this.x = right - this.width;
    },
    getLeft() {
      return this.x;
    },
    setLeft(left) {
      this.x = left;
    },

    // detecting colision better 🙂

    moveX(x) {
      this.x += x;
    },
    moveY(y) {
      this.old_y = this.y;
      this.y += y;
    },

    // we need the old positions 🧓

    getOldBottom() {
      return this.old_y + this.height;
    },
    getOldTop() {
      return this.old_y;
    },
  };
  return rect;
})();
