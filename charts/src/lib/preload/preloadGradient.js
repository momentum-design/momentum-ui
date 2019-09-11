import core from '../utils/core';
const preloadGradient = {
  Template: `<animate
    attributeName="x1"
    from="-$x2$%"
    to="100%"
    dur="1.5s"
    repeatCount="indefinite"
    />
    <animate
    attributeName="x2"
    from="0%"
    to="$x3$%"
    dur="1.5s"
    repeatCount="indefinite"
    />
    <stop offset="0" stop-color="$color0$" />
    <stop offset=".50" stop-color="$color1$"  />
    <stop offset="1" stop-color="$color0$"  />`,
  PreloadName: 'preloadGradient',
  getId: function(guid) {
    return this.PreloadName + '_' + guid;
  },
  install: function (defs, guid) {
    let x1 = 0,
      x2 = 30,
      colors = ['rgba(198,199,202,0)', 'rgba(198,199,202,0.6)'];
    let lg = defs.append('linearGradient')
      .attr('id', this.getId(guid))
      .attr('x1', x1 + '%')
      .attr('x2', x2 + '%')
      .attr('spreadMethod', 'pad');
    let inner = core.template(this.Template, {
      x1: x1,
      x2: x2,
      x3: 100 + x2,
      color0: colors[0],
      color1: colors[1]
    });
    lg.html(inner);
    return lg;
  }
};

export default preloadGradient;
