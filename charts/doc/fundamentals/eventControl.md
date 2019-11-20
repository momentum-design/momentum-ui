# Fundamentals

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/

# Event Control

You can bind native dom event to shapes in board

#### Example

![Event Control](https://screenshot.codepen.io/3315115.mddvyEg.small.d5878861-fe05-4576-8bd8-9d15da86d960.png)

### Selection & Grounp

Momentum Charts will store every Shape's dom as a list of selection instance. When you bind native dom event to shapes, it will bind these events to the inner selection.

Some shape like legends has more than one inner selection (text and icon). Momentum Charts will bind the event to its main selection(text);

If you look into the source code of Legends, you can see it will create a SelectionList which contains 2 selection.

```
initSelection() {
	this.Selection = this.G.selectAll('text');
	this.SelectionList = {
	  main: this.Selection,
	  label: this.G.selectAll('path')
	};
}
``` 



### bind

+ key

	EventName sucn as 'click', 'mouseover', 'mouseenter' ...

+ func 

	Callback function

```
legends.bind('click', function(data,i){
  console.log(data,i);
});
```

```
arc.bind('click', function(data,i){
  console.log(data,i);
});

```

### unbind

+ key 
	
	EventName sucn as 'click', 'mouseover', 'mouseenter' ...

+ funcOrGuid

	Callback function or the given _$EventGuid

[Try it yourself >>](https://codepen.io/arthusliang/pen/mddvyEg)
