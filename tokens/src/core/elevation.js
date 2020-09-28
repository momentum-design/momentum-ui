const elevation = {
  0: {},
  1: {
    directional: {
      shadowColor: `#000`,
      blur: `4`,
      x: `0`,
      y: `2`,
      opacity: `0.16`
    },
    ambient: {
      shadowColor: `#000`,
      blur: `1`,
      x: `0`,
      y: `0`,
      opacity: `0.18`
    },
    boxShadow: '0 2px 4px rgba(0,0,0,0.16), 0px 1px rgba(0,0,0,0.18)'
  },
  2: {
    directional: {
      shadowColor: `#000`,
      blur: `8`,
      x: `0`,
      y: `4`,
      opacity: `0.16`
    },
    ambient: {
      shadowColor: `#000`,
      blur: `16`,
      x: `0`,
      y: `0`,
      opacity: `0.16`
    },
    boxShadow: '0 4px 8px rgba(0,0,0,0.16), 0px 1px rgba(0,0,0,0.16)'
  },
  3: {
    directional: {
      shadowColor: `#000`,
      blur: `16`,
      x: `0`,
      y: `8`,
      opacity: `0.16`
    },
    ambient: {
      shadowColor: `#000`,
      blur: `1`,
      x: `0`,
      y: `0`,
      opacity: `0.14`
    },
    boxShadow: '0 8px 16px rgba(0,0,0,0.16), 0px 1px rgba(0,0,0,0.14)'
  },
  4: {
    directional: {
      shadowColor: `#000`,
      blur: `48`,
      x: `0`,
      y: `24`,
      opacity: `0.20`
    },
    ambient: {
      shadowColor: `#000`,
      blur: `1`,
      x: `0`,
      y: `0`,
      opacity: `0.12`
    },
    boxShadow: '0 24px 48px rgba(0,0,0,0.2), 0px 1px rgba(0,0,0,0.12)'
  },
};

module.exports = elevation;
