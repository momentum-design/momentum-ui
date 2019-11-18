# Get Start

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Add Animation

In this section, you will learn how to scale data to position. You will also learn a very important Component - Axis.

#### Example

![Add Animation](https://screenshot.codepen.io/3315115.NWWepog.small.92eefc37-93bf-46c8-bf62-544bb9ad52e0.png)

### Add data

Before creating legends, we need add data into board.

The 2 line charts will do animation according to the new data ```boardData2```.

```hasChanged``` is used to make sure the animation will only be emitted once.


```
var boardData2 = {
  d1: [20,30,40,70,50],
  d2: [20,40,45,60,60]
};

var hasChanged = {
  d1: false,
  d2: false
};

```

### Create function for animtion

Legends has 3 iconType and 2 typ

```board.transition``` is the key function in Mementum Charts for animation.

```
var animate = function(d,i) {
  var key = 'd' + (+i+1);
  if(!hasChanged[key]){
    hasChanged[key] = true;
    board.transition({
      duration: 300
    }, key, boardData2[key]);
  }
};
```

### bind click event in legends

Use ```'bind'``` to bind dom event to the text area in legeads.

```
legends.bind('click',function(d,i){
  animate(d,i);
});
```

[Try it yourself >>](https://codepen.io/arthusliang/pen/NWWepog)
