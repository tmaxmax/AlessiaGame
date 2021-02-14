STAY_DOWN.constructors.player = (function (rect, AnimationCharacter) {
  console.log(AnimationCharacter);

  const player = function (x, y) {
    this.color = "#CCB7AE";
    this.velocityY = 0;
    this.velocityX = 0;
    this.moveForce = 1;

    rect.call(this, x, y, 22 * 2.2, 31 * 4);
  };
  player.prototype = {
    moveLeft() {
      this.velocityX -= this.moveForce;
    },
    moveRight() {
      this.velocityX += this.moveForce;
    },

    jump() {
      this.jumping = true;
      this.velocityY -= 20;
    },
    // downer is reseting a jump
    downer(velocity = 0) {
      this.jumping = false;
      this.velocityY = velocity;
    },

    updatePosition(gravity, friction) {
      this.velocityY += gravity;
      this.velocityY *= friction;
      this.velocityX *= friction;

      this.moveX(this.velocityX);
      this.moveY(this.velocityY);
    },

    // isAbleToDie(){}
    jumping: false,
  };
  // we are taking all the stuff in rect and moving it to
  // player
  Object.assign(player.prototype, rect.prototype);
  Object.assign(player.prototype, AnimationCharacter.prototype);
  return player;
})(STAY_DOWN.constructors.rect, STAY_DOWN.constructors.AnimationCharacter);
