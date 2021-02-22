STAY_DOWN.managers.platform_manager = (function () {
  const Platform = STAY_DOWN.constructors.Platform;
  console.log(STAY_DOWN.getPlayer());
  return {
    active_platforms: [],
    createPlatform(x, y, width, height) {
      console.log(STAY_DOWN.getPlayer());
      this.active_platforms.push(new Platform(x, y, width, height));
    },
  };
})();
