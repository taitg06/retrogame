global.localStorage = {
    _data: {},
    setItem: function (key, value) {
      this._data[key] = value;
    },
    getItem: function (key) {
      return this._data[key] || null;
    },
    removeItem: function (key) {
      delete this._data[key];
    },
    clear: function () {
      this._data = {};
    },
  };