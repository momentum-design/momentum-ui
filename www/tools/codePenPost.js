const config = require('./generatedConfig');
const js_external = [config.static.chartsD3, config.static.chartsJs];

class CodePenPost {

  constructor (json, height, className) {
    this.Json = Object.assign({}, this.defaultJson, json);
    this.ClassName = className || 'codepen';
    this.Height = height || 600;
  }

  jsonString(obj) {
    return JSON.stringify(obj).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");
  }

  prefillEmbedsStr() {
    return ['<div className="', this.ClassName, '" ' +
      this._preData_Prefill() + ' ',
      this._preData() + ' >',
      this._prefillPre('html'),
      this._prefillPre('js'),
      this._prefillPre('css'),
      '</div>'].join('');
  }

  _reactWarpCode(content) {
    return '{`' + content + '`}';
  }

  _prefillPre(jsonKey) {
    let content = this.Json[jsonKey],
      pre = this.Json[jsonKey + '_pre_processor'],
      langType = (pre && pre !== 'none') ? pre : jsonKey;
    if (content) {
      return ['<pre data-lang="', langType, '">',
        this._reactWarpCode(content),
        '</pre>'].join('');
    } else {
      return '';
    }
  }

  _preData_Prefill() {
    let val = {},
      json = this.Json,
      def = this.defaultData_Prefill,
      _temp;

    Object.keys(def).forEach(function(name){
      _temp = json[def[name]];
        if (_temp) {
          val[name] = _temp;
        }
    });

    return 'data-prefill={`' + JSON.stringify(val) + '`}';
  }

  _preData() {
    let data = Object.assign({}, this.defaultData_, { 'data-height': this.Height }),
      arr = [];
    Object.keys(data).forEach(function(name){
      arr.push(name + '="' + data[name] + '"');
    });
    return arr.join(' ');
  }

  prefill() {
    let id = this.hiddenFormID,
      formContainer = document.getElementById(id);
    if (!formContainer) {
      formContainer = document.createElement('DIV');
      formContainer.setAttribute('id', id);
      formContainer.style.display = 'none';
    }
    formContainer.innerHTML = this.formStr();
    formContainer.getElementsByTagName('FORM')[0].submit();
  }

  prefillStr() {
    return '<form action="https://codepen.io/pen/define" method="POST" target="_blank">' +
      '<input type="hidden" name="data" value=\'' +
      this.jsonString(this.Json) +
      '\'>' +
      '<input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button">' +
      '</form>';
  }

  static formatChartExample(content) {
    return content.replace(/[\n\s\r\t]*import.+[\n\r]+/g,'')
    .replace(/[\n\s\r\t]*const[\n\s\r\t]+example[\n\s\r\t]+=[\n\s\r\t]+\(\)[\n\s\r\t]+=>[\n\s\r\t]+{[\n\s\r\t]+/,'')
    .replace(/[\n\s\r\t]+\};[\n\s\r\t]+export[\n\s\r\t]+default[\n\s\r\t]+example;[\n\s\r\t]*$/,'');
  }

}

CodePenPost.prototype.hiddenFormID = 'hiddenFormCodePenSubmit';
CodePenPost.prototype.defaultJson = {
  title: "Momentum Charts Demo",
  description: "Momentum Charts Demo",
  private: false,
  // parent : id // If supplied, the Pen will save as a fork of this id. Note it's not the slug, but ID. You can find the ID of a Pen with `window.CP.pen.id` in the browser console.
  tags: ["Momentum UI", "Chart", "Javascript"],
  editors: "101", // Set which editors are open. In this example HTML open, CSS closed, JS open
  layout: "left", // top | left | right
  html: '<body><div id="app"></div></body>',
  // html_pre_processor: "none" || "slim" || "haml" || "markdown",
  // css: "html { color: red; }",
  // css_pre_processor: "none" || "less" || "scss" || "sass" || "stylus",
  // css_starter: "normalize" || "reset" || "neither",
  // css_prefix: "autoprefixer" || "prefixfree" || "neither",
  js: "",
  js_pre_processor: "babel", // : "none" || "coffeescript" || "babel" || "livescript" || "typescript",
  // html_classes: "loading",
  head: "<meta name='viewport' content='width=device-width'>",
  css_external: config.static.chartsCss, // semi-colon separate multiple files
  js_external: js_external // semi-colon separate multiple files
  // These go in the CSS itself now, like `@import "compass";`
  // css_pre_processor_lib : "bourbon" || "compass" || "nib" || "lesshat",
  // js_modernizr : "true" || "false",
  // js_library   : "jquery" || "mootools" || "prototype",
  // js_module    : true
};
CodePenPost.prototype.defaultData_Prefill = {
  title: "title",
  description: "description",
  head: 'head', // encode
  tags: 'tags',
  html_classes: 'html_classes',
  stylesheets: 'css_external',
  scripts: 'js_external'
};

CodePenPost.prototype.defaultData_ = {
  'data-height': 600,
  'data-theme-id': "1",
  'data-editable': true, // encode
  'data-default-tab': 'js,result',
  'data-options-autoprefixer': false
};

module.exports = {
  CodePenPost
};
