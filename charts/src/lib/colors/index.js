import * as d3 from "d3";
import core from '../utils/core';
const Helper = {
  linear: function (x1, x2, percentage) {
    return x1 + (x2 - x1) * percentage;
  }
};

// BrBG PRGn PiYG PuOr RdBu RdGy RdYlBu RdYlGn Spectral Blues Greens Greys Oranges Purples Reds Viridis  Inferno  Magma Plasma Warm Cool CubehelixDefault BuGn BuPu GnBu OrRd PuBuGn PuBu PuRd
const ColorPreset = {
  Momentum: {
    'ColorWheel': ['#279BE8', '#99DDFF', '#148579', '#30C9B0', '#F0677E', '#FFC7D2', '#588219', '#93C437', '#F26B1D', '#FFCA99'],
    '12Colors': ['#B0B4D9', '#8C91BD', '#D6B220', '#7D7A18', '#30C9B0', '#148579', '#F0677E', '#0A78CC', '#A87FF0', '#932099', '#F26B1D', '#A12A3A'],
    '10Colors': ['#B0B4D9', '#F26B1D', '#D6B220', '#7D7A18', '#0A78CC', '#148579', '#30C9B0', '#F0677E', '#A87FF0', '#932099'],
    '8Colors': ['#00A0D1', '#B8F2FF', '#D6B220', '#F5EAA2', '#7D7A18', '#D3DB7B', '#F26B1D', '#FFCA99'],
    '3Colors': ['#00A0D1', '#B8F2FF', '#93C437'],
    'jmt': ['#74E8D1', '#C74F0E', '#00A3B5'],
    'quality': ['#B8F2FF', '#FFC7BA'],
    'quality2': ['#FFC7BA', '#B8F2FF'],
    'red': ['#FFC7BA', '#FFC7BA'],
    'AudioSourcesColors': ['#00A0D1', '#B8F2FF', '#16A693', '#74E8D1', '#EBD460', '#A87FF0'],
    'AudioColors': ['#00A0D1', '#B8F2FF', '#93C437'],
    'MeetingTypeColors': ['#C7A5FA', '#00A0D1', '#FF9D52', '#16A693', '#74E8D1', '#EBD460', '#B8F2FF'],
    'Meetings': ['#B8F2FF', '#00A0D1'],
    'MeetingMinutes': ['#B8F2FF', '#007EA8'],
    'ParticipantsAndHosts': ['#B2F4F7', '#16A693'],
    'GoodBad': ['#B8F2FF', '#FF5C4A'],
    'SuccessFailure': ['#7FEB86', '#FF5C4A'],
    'AreaLightAndDarkGreen': ['#BCF7BF', '#24AB31'],
    'AreaLightAndDarkBlue': ['#B8F2FF', '#007EA8'],
    'FilesShared': ['#FCE4C7', '#FF9D52']
  }
};

const ColorPicker = {
  rgbLinear: function (c1, c2, p) {
    const r = Helper.linear(c1.r, c2.r, p),
      g = Helper.linear(c1.g, c2.g, p),
      b = Helper.linear(c1.b, c2.b, p),
      a = Helper.linear(c1.a, c2.a, p);
    return d3.rgb(r, g, b, a);
  },
  hslLinear: function (c1, c2, p) {
    const h = Helper.linear(c1.h, c2.h, p),
      s = Helper.linear(c1.s, c2.s, p),
      l = Helper.linear(c1.l, c2.l, p),
      a = Helper.linear(c1.a, c2.a, p);
    return d3.hsl(h, s, l, a);
  },
  hclLinear: function (c1, c2, p) {
    const h = Helper.linear(c1.h, c2.h, p),
      c = Helper.linear(c1.c, c2.c, p),
      l = Helper.linear(c1.l, c2.l, p),
      a = Helper.linear(c1.a, c2.a, p);
    return d3.hcl(h, c, l, a);
  }
};

class Colors {

  // colors, [d3Format], picker, [name]
  static buildPreset() {
    const args = core.toArray(arguments),
      colors = args[0];
    let originalColors;

    if (typeof args[1] === 'string') {
      originalColors = core.extendArray(colors, d3[args.splice(1, 1)[0]], d3);
    } else {
      originalColors = colors;
    }

    return {
      colors: originalColors,
      picker: args[1],
      name: args.length > 2 ? args[2] : 'customize'
    };
  }

  static addPresets(obj) {
    if (Colors.prototype.presets[obj.name] === undefined) {
      Colors.prototype.presets[obj.name] = obj;
    }
  }

  static allPersets() {
    return Colors.prototype.presets;
  }

  constructor (name) {
    if (typeof name === 'string' && d3['interpolate' + name] && d3['scheme' + name]) {
      this.initD3Preset(name);
    } else if (typeof name === 'string' || name === undefined) {
      this.initMometnumPreset(name);
    } else { // object

    }
    this.Cache = {
      Interpolate: {},
      Scheme: {}
    };
  }

  cache(hash, key, func) {
    if (this.Cache[hash][key] === undefined) {
      this.Cache[hash][key] = func.call(this, key);
    }
    return this.Cache[hash][key];
  }

  initD3Preset(name) {
    this.Name = name;
    this.interpolate = d3['interpolate' + name];
    this.scheme = d3['scheme' + name];
  }

  initMometnumPreset(name) {
    name = this.presets[name] ? name : 'ColorWheel';
    this.Name = name;
    this.Preset = this.presets[name];
    this._extendPreset();
    this.interpolate = this._interpolate;
    this.scheme = this._scheme;
  }

  initPreset(preset) {
    this.Name = preset.name || 'Customize';
    this.Preset = preset;
    this._extendPreset();
  }

  _extendPreset() {
    this.Picker = this.Preset.picker;
    this.OriginalColors = this.Preset.colors;
  }

  __interpolate(t) {
    const colors = this.OriginalColors,
      picker = this.Picker,
      last = colors.length - 1,
      start = Math.floor(last * t),
      end = Math.ceil(last * t);
    return picker(colors[start], colors[end], t - start / last);
  }

  _interpolate(t) {
    return this.cache('Interpolate', t, this.__interpolate);
  }

  __scheme(k) {
    const colors = this.OriginalColors,
      picker = this.Picker,
      len = colors.length;
    if (len >= k) {
      return colors.slice(0, k);
    } else {
      const arr = [],
        need = k - len,
        segs = len - 1,
        quotients = Math.floor(need / segs),
        remainders = need % segs;
      let i = 0, stopSegments, j;
      for (; i < len; i++) {
        arr.push(d3.color(colors[i]));
        if (i < len - 1) {
          stopSegments = quotients + (remainders > i ? 1 : 0) + 1;
          for (j = 1; j < stopSegments; j++) {
            arr.push(picker(colors[i], colors[i + 1], j / stopSegments));
          }
        }
      }

      return arr;
    }
  }

  _scheme(k) {
    return this.cache('Scheme', k, this.__scheme);
  }

}
Colors.prototype.ColorPreset = ColorPreset;
Colors.prototype.ColorPicker = ColorPicker;
Colors.prototype.presets = {};

const generateDefaultPersets = () => {
  let color;
  for (let name in ColorPreset.Momentum) {
    color = ColorPreset.Momentum[name];
    Colors.addPresets(Colors.buildPreset(color, 'hcl', ColorPicker.hclLinear, name));
    Colors.addPresets(Colors.buildPreset(color, 'rgb', ColorPicker.rgbLinear, name + 'Rgb'));
    Colors.addPresets(Colors.buildPreset(color, 'hsl', ColorPicker.hslLinear, name + 'Hsl'));
  }
};
generateDefaultPersets();
export default Colors;
