# Event Control

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/utils/eventControls

# Instructor

Momentum Charts has a built in event control system. With this system you can easily bind function and eimt it.

```
var ec = new EventControl();
```

# Method

### bind

+ key

	Any string

+ func 

	Callback function

```
var callback = function(){};
ec.bind('now', callback);
```

### unbind

+ key 
	
	Any string

+ funcOrGuid

	Callback function or the given _$EventGuid
	
```
var callback = function(){};
ec.bind('now', callback);
ec.unbind('now', callback);
```

or 

```
var callback = function(){};
var eventID = ec.bind('now', callback);
ec.unbind('now', eventID);
```

### emit

+ key

	Any string

+ args 

	this will be passed as the argument of apply 
	
+ caller 

	caller - domain
	
