import { EventEmitter } from 'events';
import Type from './type';

class Blueprint extends EventEmitter {
  static build(attrs = {}) {
    class Model extends Blueprint {
      static build(attrs = {}) {
        return new this.prototype.constructor(attrs);
      }
    };
    for (let attr in attrs) {
      Object.defineProperty(Model.prototype, attr, {
        get() {
          return this.get(attr);
        },
        set(value) {
          return this.set(attr, value);
        }
      });
    }
    Model.attributes = attrs;
    return Model;
  }
  constructor(attrs = {}) {
    super();
    this.attributes = {};
    for (let attr in attrs) {
      if (!this.constructor.attributes[attr]) continue;
      this[attr] = attrs[attr];
    }
  }
  set(attr, value, emitChange = true) {
    const previous = this.attributes[attr];
    const current = this.constructor.attributes[attr](value);
    if (previous === current) return;
    this.attributes[attr] = current;
    this.emit(`changed:${attr}`, { previous, current });
    if (emitChange) this.emit('changed', { [attr]: value });
  }
  get(attr) {
    return this.attributes[attr];
  }
  update(attrs) {
    for (let attr in attrs) {
      this.set(attr, attrs[attr], false);
    }
    this.emit('changed', attrs);
    return this;
  }
  toObject() {
    return this.attributes;
  }
  toString() {
    return this.attributes.toJSON();
  }
}

Blueprint.type = Type;

export default Blueprint;
