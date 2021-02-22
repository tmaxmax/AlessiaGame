STAY_DOWN.constructors.Item = (function (rect) {
  const Item = function (x, y, width, height) {
    rect.call(this, x, y, width, height);
  };
  Item.prototype = {
    randomMove(worldWidth, worldHeight, groundY) {
      this.x = Math.random() * (worldWidth - this.width);
      this.y = Math.random() * (worldHeight - this.width);
      if (this.y > groundY - 70) {
        this.y = groundY - this.width - 70;
      }
      if (this.y < 70) {
        this.y = 80;
      }
    },
  };
  Object.assign(Item.prototype, rect.prototype);
  return Item;
})(STAY_DOWN.constructors.rect);
