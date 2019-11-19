# Preload

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/preload

Apply preload style to Shapes.

## Example

```
board.rect('', {
  generator: {
    x: function (d, i) {
      return 10 + i * 30 - 2;
    },
    y: function (d) {
      return 300 - d.profit;
    },
    h: function (d) {
      return d.profit;
    },
    w: 10
  }
});
board.preload();
setTimeout(function () {
  board.cancelPreload();
}, 3000);
```

# Instructor

## arguments

+ dataUpdate - the new data to help change shapes when doing preload

+ shapeLoader - shapeLoader

+ board - board instance
