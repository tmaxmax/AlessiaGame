STAY_DOWN.constructors.Platform = (function (rect) {
  const Platform = function (x, y, width, height) {
    rect.call(this, x, y, width, height);
    this.moveForce = Math.random() * 0.05;
    this.velocityY = 0;
    this.maxVelocityY = Math.random() * 0.4 - 2;
  };
  Platform.prototype = {
    moveUp() {
      this.velocityY -= this.moveForce;
      if (this.velocityY < this.maxVelocityY)
        this.velocityY = this.maxVelocityY;
      this.moveY(this.velocityY);
    },
  };
  Object.assign(Platform.prototype, rect.prototype);
  return Platform;
})(STAY_DOWN.constructors.rect);
