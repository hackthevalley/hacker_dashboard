import ifNullThen from "../helpers/ifNullThen";

export default class Model {

  constructor(properties, keys = []) {
    this.properties = properties;
    this.keys = keys;
    this._raiseAllProperties();
  }

  set(key, value) {
    this.properties[key] = value;
    this[key] = value;
  }

  _raiseAllProperties() {
    this.keys.forEach(prop => {
        this[prop] = ifNullThen(this.properties[prop], "");
    })
  }

  shallowCopy() {
    throw new Error("NotImplemented");
  }

}