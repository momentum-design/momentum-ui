# Get Start

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Use Momentum Colors

In this section, you will learn how to use Momentum Colors.

#### Example

![Add more charts](https://screenshot.codepen.io/3315115.LYYXbRZ.small.99b0f78a-17ed-4f56-ad7b-a825659a37aa.png)

### Get Momentum Color

Momentum Designers offer some color persets for charts. Beside the given colors, Momentum Charts can generator colors based on the given colors. Currently, the colors are generated according to RGB, HCL(Default) or HSL system.

```
var colorSets =  MomentumCharts.colors('10Colors'),
    colors = colorSets.scheme(2),
    color1 = colors[0].toString(),
    color2 = colors[1].toString();
```

### Set color in Modify

The generated color array stores Color Object. ```toString``` will convert them to rgb value which can be used in Modify directly.

```
board.line('d1', {
  generator: lineGenerator,
  modify: {
    attr: {
      stroke: color1,
      'stroke-width': 2
    }
  }
});
```


[Try it yourself >>](https://codepen.io/arthusliang/pen/LYYXbRZ)
