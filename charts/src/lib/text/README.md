# Text

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/main.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/main/charts/LICENSE)

> @momentum-ui/charts/text

Render text in board

# Instructor

## Example

```
board.text({
  generator: {
    x: function(d, i) {
      return 10 + i * 30;
    },
    y: function(d) {
      return 300 - d.profit - 20;
    },
    text: function(d) {
      return d.profit;
    }
  }
});
```

### arguments

+ data - the data of text

+ config - You will be asked to pass modify and generator via config.

## Generator

'generator' in the Config defines how to create the shape with data. 

+ x * - x position. Accept number or function.
	
+ y * - y position. Accept number or function.

+ text * - the text you want to display.


## Modify

Refer to the modify object in [Shape](../shape/README.md).

# Momentum Usage
