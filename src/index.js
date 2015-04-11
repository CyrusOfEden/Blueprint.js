import Type from './type';

class Blueprint {
  static build(attrs = {}) {
    class Model extends Blueprint {};
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
    this.attributes = {};
    this.observers = {};
    for (let attr in attrs) {
      if (!this.constructor.attributes[attr]) continue;
      this[attr] = attrs[attr];
    }
  }
  set(attr, value, broadcastChange = true) {
    const previous = this.attributes[attr];
    const current = this.constructor.attributes[attr](value);
    if (previous === current) return;
    this.attributes[attr] = current;
    this.notify(`changed:${attr}`, { previous, current });
    if (broadcastChange) this.notify('changed', { [attr]: value });
  }
  get(attr) {
    return this.attributes[attr];
  }
  update(attrs) {
    for (let attr in attrs) {
      this.set(attr, attrs[attr], false);
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
  observe(events, observer) {
    return this.on(events, observer);
  }
  off(events, observer) {
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      if (!this.observers[event]) continue;
      delete this.observers[event][observer.id];
    }
    return this;
  }
  unobserve(events, observe) {
    return this.off(events, observer);
  }
  getObservers() {
    return this.observers;
  }
  removeObservers() {
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

Blueprint.type = Type;

export default Blueprint;
