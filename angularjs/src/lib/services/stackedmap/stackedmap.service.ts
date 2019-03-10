/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
export function CsStackedMap() {
    return {
      createNew: function() {
        let stack = [];

        return {
          add: function(key, value) {
            stack.push({
              key: key,
              value: value,
            });
          },
          get: function(key) {
            for (let i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            let keys = [];
            for (let i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function() {
            return stack[stack.length - 1];
          },
          remove: function(key) {
            let idx = -1;
            for (let i = 0; i < stack.length; i++) {
              if (key === stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function() {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function() {
            return stack.length;
          },
        };
      },
    };
  }
