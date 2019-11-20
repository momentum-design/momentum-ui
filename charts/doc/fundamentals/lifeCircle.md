# Fundamentals

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Life Circle

Momentum Charts enble you to listen to data changes.


#### Example

![Life Circle](https://screenshot.codepen.io/3315115.pooGoGj.small.5885b16a-b64e-4a61-a0ee-c273f2754d66.png)

## Events

### Event type

The followings are three important events in board.

+ data

	The data event will emit when board's data changes.

+ render

	The data event will emit when the function ```render``` of board is called.

+ transition

	The data event will emit when the function ```transition ``` of board is called.
	
### on

Bind a function which will be called when the event is emitted.


#### arugment

+ eventName

	Refer the Event type Above

+ dataUrl

	Refer to the dataUrl in Databind

+ callback

	callback function
	
```
board.on('data', '', function(data){
  console.log('board updated data==>', data);
});
board.on('render', '', function(data){
  console.log('board rendered ==>', data);
});
board.on('transition', '', function(data){
  console.log('board transition start', data);
});
```

### off

Unbind a function which will be called when the event is emitted.

#### arugment

+ eventName

	Refer the Event type Above

+ dataUrl

	Refer to the dataUrl in Databind
	
+ callback

	function or string. Momentum Charts will add a guid to the functions which have been bund.
	

[Try it yourself >>](https://codepen.io/arthusliang/pen/pooGoGj)
