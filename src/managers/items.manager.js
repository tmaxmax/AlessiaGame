STAY_DOWN.managers.items_manager = (function () {
  const Item = STAY_DOWN.constructors.Item;
  return {
    items_array: [],
    addItem(x, y) {
      this.items_array.push(new Item(x, y, 70, 70));
    },
  };
})();
