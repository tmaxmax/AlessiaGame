STAY_DOWN.constructors.AnimationCharacter = (function () {
  let Animation = function (frame_set, delay) {
    this.count = 0;
    this.frame_set = frame_set;
    this.delay = delay;
    this.frame = 0;
    this.frame_index = 0;
  };
  Animation.prototype = {
    count: undefined,
    changeFrame(frame_set, delay = 10) {
      if (this.frame_set != frame_set) {
        this.count = 0;
        this.delay = delay;
        this.frame_index = 0;
        this.frame_set = frame_set;
        this.frame = this.frame_set[this.frame_index];
      }
    },
    updateFrame() {
      this.count++;
      if (this.count >= this.delay) {
        this.count = 0;
        this.frame_index =
          this.frame_index == this.frame_set.length - 1
            ? 0
            : this.frame_index + 1;
        this.frame = this.frame_set[this.frame_index]; // Change the current frame value.
        return this.frame;
      }
      return this.frame;
    },
  };
  return Animation;
})();
