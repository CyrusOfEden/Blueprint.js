# Blueprint.js

## API

```javascript
// Import blueprint
import Blueprint from 'blueprint';
const type = Blueprint.type;

// Create a new class that extends a Blueprint class
// instead of type(t), you can pass in your own function that typecasts a value
const personAttrs = {
  id: type('number'),
  name: type('string'),
  color: type('string')
};
class Person extends Blueprint.build(personAttrs) {}

// Instantiate a new model
let kash = new Person({ id: 1, name: "Kash", color: "red" });
let sanjna = new Person({ id: 2, name: "Sanjna", color: "red" });

function logger() {
  console.log(...arguments);
}

// Models inherit from EventEmitter, so you can listen to events.
// By default, there are 2 events: `changed` and `changed:{attr}`,
// where {attr} is the attribute that is updated.
kash.on('changed', logger);
sanjna.on('changed:name', logger);

// Setting values in any way will automatically typecast them
// according to the types provided when you built the blueprint

// You can batch-update attributes with an object passed to `instance.update`
// This will notify 'changed:{attr}' listeners,
// and 'changed' listeners _once_ after all properties have been updated.
kash.update({ color: "navy" });
// the above will notify logger

// Or you can use regular JavaScript getters and setters
// (or the `instance.get` and `instance.set` methods).
// These will notify the 'changed:{attr}' and the 'changed' listeners.
sanjna.color = "yellow"; // or sanjna.set("color", "yellow");
// the above will not notify logger because logger is
// only listening to 'changed:name' events

// The `instance.toObject()` method will return the instance's attributes object
sanjna.toObject(); // returns { id: 2, name: "Sanjna", color: "yellow" }

// The `instance.toString()` is an alias for `instance.toObject().toJSON()`
kash.toString();
```
