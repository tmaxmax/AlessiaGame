STAY_DOWN.constructors.Item = (function (rect) {
  const Item = function (x, y, width, height) {
    rect.call(this, x, y, width, height);
  };
  Item.prototype = {
    randomMove(worldWidth, worldHeight, groundY) {
      this.x = Math.random() * (worldWidth - this.width);
      this.y = Math.random() * (worldHeight - this.width);
      if (this.y > groundY) this.y = groundY - this.width;
    },
  };
  Object.assign(Item.prototype, rect.prototype);
  return Item;
})(STAY_DOWN.constructors.rect);
