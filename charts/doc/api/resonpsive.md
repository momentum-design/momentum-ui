# responsive

[![CircleCI](https://img.shields.io/circleci/project/github/momentum-design/momentum-ui/master.svg)](https://circleci.com/gh/momentum-design/momentum-ui/)
[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> @momentum-ui/charts/responsive

Use responsive just like @media query in Css

# Instructor

```
  let res = board.responsive();
```

# Method

## w

  Define responsive for one Shape when the width of board changes.

```
  res.w(rect, responsiveSettings);
```

## h

  Define responsive for one Shape when the height of board changes.

```
  res.h(line, responsiveSettings);
```

## resize

  Render.

```
  res.resize(true);
```

# Responsive Config

Responsive Config is a json object. The key should be max value of board's width/height. The value is the config of shape when board's (width/height) changes.

```
res.w(rect, {
	400: {
	  generator: {
	    x: function (d, i) {
	      return 5 + i * (Res.width() - 5) / fakelen;
	    },
	    w: 10
	  },
	  modify: {
	    style: {
	      display: function(d, i) {
	        return i % 2 === 0 ? 'none' : '';
	      }
	    }
	  }
	},
	700: {
	  generator: {
	    x: function (d, i) {
	      return 5 + i * (Res.width() - 5) / fakelen;
	    },
	    w: 15
	  }
	},
	1000: {
	  generator: {
	    x: function (d, i) {
	      return 5 + i * (Res.width() - 5) / fakelen;
	    },
	    w: 20
	  }
	},
	1200: {
	  generator: {
	    x: function (d, i) {
	      return 5 + i * (Res.width() - 5) / fakelen;
	    },
	    w: 25
	  },
	  modify: {
	    style: {
	      display: ''
	    }
	  }
	}
});
```
