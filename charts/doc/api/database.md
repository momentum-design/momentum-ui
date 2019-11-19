# Database

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/database

The Board component uses this component to manager data and event.

# Example

```
  var database = new MomentumCharts.Database(data, eventNames);
```

# Instructor

## arguments

+ data - the data of the Database instance. It could be empty or an Object. We will link an url to each property insde the data.

+ eventNames - the event mangerments you want to define

# Method

## formatUrl

Format a string to the url style we use. This will be called in all the inner functions.

```
database.formatUrl('../a/b'); // return a/b
```

## bind

Bind an event when data is updated.

```
var database = new MomentumCharts.Database({}, ['data','render']);
data.bind('data', '', callback);
```

or 

```
var database = new MomentumCharts.Database({});
data.bind('', callback);
```

### arguments

+ eventName - The event name you have passed in the instructor. If not set, it will call a default event name.

+ url - The part of the data you want to watch its update.

+ func - The callback function

## unbind

Unbind an event when data is updated.

### arguments

+ eventName - The event name you have passed in the instructor. If not set, it will call a default event name.

+ url - The part of the data you want to watch its update.

+ func - The callback function

## emit

Emit an event.

+ name - The event name. Could be a string or an array.

+ url - The part of the data you want to watch its update.

+ args - The extra arguments you want to pass. The callback function will accept the event as the following format.

``
{
  Data: [], 
  Args: []
}
``

+ caller - The domain the callback function runs.

## emitAll

Emit all events on a data url.

+ url - The part of the data you want to watch its update.

+ args - The extra arguments you want to pass. The callback function will accept the event as the following format.

+ caller - The domain the callback function runs.

## val

Get or set the data

### arguments

+ url - the data url. If you only pass a string to val, it will return the data directly.

+ data - the new date

+ emitEventsName - Emit you want to file when emit.

If you set it to false, no event will be emited.
If you pass a string or an array, it will emit the events you pass.
If you pass the other input or undefined, it will emit all the events on the data url.

+ args - The extra arguments you want to pass. The callback function will accept the event as the following format.

+ caller - The domain the callback function runs.
