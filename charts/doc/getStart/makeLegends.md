# Get Start

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Make Legends

In this section, you will learn how to scale data to position. You will also learn a very important Component - Axis.

#### Example

![Make legends](https://screenshot.codepen.io/3315115.WNNLpzp.small.9abe2148-6b4d-4792-81c5-c606200f367f.png)

### Add legends data

Before creating legends, we need add data into board.

```
var boardData = {
  d1: [10,25,55,65,40],
  d2: [15,30,35,55,60],
  legends: ['Cisco Webex Teams', 'Cisco Webex Meetings']
};
```

### Create legends

Legends has 3 iconType and 2 type

+ iconType

	The value could be 'square', 'line', and 'dot'.

+ type

	The value could be 'horizontal', 'vertical'. If you set up lineWidth when using 'horizontal', it break lines.

```
board.legends('legends', {
  generator: {
    x: 100,
    y: 50,
    type: 'horizontal',
    iconType: 'dot',
    text: function (d) {
      return d;
    },
    iconColor: function (d, i) {
      return colors[i].toString();
    }
  }
});
```

[Try it yourself >>](https://codepen.io/arthusliang/pen/WNNLpzp)
