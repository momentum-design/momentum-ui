# Foundamentals

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Data Management

Momentum Charts has a built in data management system. When you create shapes in board, you need pass the dataUrl which helps get the data in board.


#### Example

![Data Management](https://screenshot.codepen.io/3315115.ZEEVXRN.small.cd000a88-d274-4b73-8d78-167723596e9f.png)

### dataBase

```database/index.js``` contains the source code of built in database.

### dataUrl

In this example, we bind the following datasource to board.

```
var boardData = {
  shape: {
    d1: [10,25,55,65,40],
    d2: [15,30,35,55,60],
    d3: [10,20,25,45,40],
    d4: [5,10,15,25,30]
  },
  legends: ['Cisco Webex Teams', 'Cisco Webex Meetings', 'Cisco Jabber', 'Device']
};
```
The following lines show how to use dataUrl to get data. 

```''``` or ```null``` refers to ```boardData```

```'shape'``` refers to ```boardData.shape```

```'legends'``` refers to ```boardData.legends```

```'shape/d1'``` refers to ```boardData.shape.d1```

### set data

You can use the function ```board.data``` to get or set data. If you pass nothing or only dataUrl, it will return the inner data. If you pass a new data, then board will reset its data.

```
var board = MomentumCharts.board('#app', {
  attr: {
    width: '1200',
    height: '700',
    viewBox: "0 0 1200 700"
  }
});

board.data(boardData);
```

### get data

```
console.log(board.data());
```

### render and transition

You can also pass data when call ```render``` or ```transition```. Check more detail in the API section.

[Try it yourself >>](https://codepen.io/arthusliang/pen/ZEEVXRN)
