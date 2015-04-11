import Type from './type';

class Model {
  static build(attrs = {}) {
    class Through extends Model {};
    Through.attributes = attrs;
    for (let attr in attrs) {
      Object.defineProperty(Through.prototype, attr, {
        get() {
          return this.attributes[attr];
        },
        set(value) {
          const previous = this.attributes[attr]
          const current = attrs[attr](value);
          if (current === previous) return;
          this.notify('changed', { [attr]: current });
          this.notify(`changed:${attr}`, { previous, current });
          this.attributes[attr] = current;
        }
      });
    }
    return Through;
  }
  constructor(attrs = {}) {
    this.attributes = {};
    this.observers = {};
    for (let attr in attrs) {
      if (!this.constructor.attributes[attr]) continue;
      this[attr] = attrs[attr];
    }
  }
  update(attrs) {
    for (let attr in attrs) {
      this[attr] = attrs[attr];
    }
    this.notify('changed', attrs);
    return this;
  }
  notify(event, data) {
    const observers = this.observers[event];
    if (!observers) return;
    for (let id in observers) {
      observers[id].call(event, data, this);
    }
    return this;
  }
  on(events, observer) {
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      if (!this.observers[event]) this.observers[event] = {};
      this.observers[event][observer.id] = observer;
    }
    return this;
  }
  off(events, observer) {
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      if (!this.observers[event]) continue;
      delete this.observers[event][observer.id];
    }
    return this;
  }
  getObservers() {
    return this.observers;
  }
  removeAllObservers() {
    this.observers = {};
    return this;
  }
  toObject() {
    return this.attributes;
  }
  toString() {
    let repr = '';
    for (let attr in this.attributes) {
      repr += `${attr}: ${this[attr]} `;
    }
    return `${this.constructor.name} { ${repr} }`;
  }
}

Model.type = Type;

export default Model;
