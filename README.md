# Blueprint.js

## API

```javascript
// Import blueprint
import Blueprint from 'blueprint';
const type = Blueprint.type;

// Create a new class that extends a Blueprint class
const personAttrs = { id: type('number'), name: type('string'), color: type('string') };
class Person extends Blueprint.build(personAttrs) {}

// Instantiate a new model
let kash = new Person({ id: 1, name: "Kash", color: "red" });
let sanjna = new Person({ id: 2, name: "Sanjna", color: "red" });

// Create a new observer.
// The ID can be anything, but it is required and it **must** be unique.
const logger = {
  id: 'logger',
  call: function(event, data, object) {
    // event is the event name
    // data is the data relevant to the event
    // object is the object that calls this observer
    console.info(event, data, object);
  }
};

// By default, there are 2 events: `changed` and `changed:{attr}`, where {attr} is the attribute that is updated.
kash.on(['changed'], logger);
sanjna.on(['changed:name'], logger);

// Setting values in any way will automatically typecast them according to the types provided when you built the blueprint

// You can batch-update attributes with an object passed to `#update`
// This will notify 'changed:{attr}' observers, and 'changed' observers _once_ after all properties have been updated.
kash.update({ color: "navy" });
// the above will notify logger

// Or you can use regular JavaScript getters and setters (or the `#get` and `#set` methods). These will notify the 'changed:{attr}' and the 'changed' observers.
sanjna.color = "yellow"; // or sanjna.set("color", "yellow");
// the above will not notify logger because logger is only subscribed to 'changed:name' events

// You can observe and notify any and all events:
kash.on(['happy'], logger);
kash.notify('happy', { value: true });

// The `#toObject()` method will return a hash of all the object's attributes.
sanjna.toObject(); // returns { id: 2, name: "Sanjna", color: "yellow" }

// The `#toString()` returns a pretty representation of an object.
kash.toString(); // returns 'Person { id: 1, name: "Kash", color: "navy" }'

// `#getObservers()` (get all observers) and `#removeObservers()` (remove all observers) are provided as convenience methods.
sanjna.removeObservers();

// You can also remove observers one-by-one:
kash.off(['happy', 'changed'], logger);

// `#on()` and `#off()` are aliased as `#observe()` and `#unobserve()`, for your preference.
```
