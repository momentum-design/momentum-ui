'use strict';
/* eslint-disable */
const marked = require('marked');
const efs = require('fs-extra');
const fs = require("fs");
const path = require('path');
const camelCase = require('camelcase');
const fileSave = require('file-save');

marked.setOptions({
  xhtml: true
});

const renderer = new marked.Renderer();
renderer.code = function(code, infostring, escaped) {
  return '<CodeBlock>{`'+code+'`}</CodeBlock>';
  // return '<pre><code>{`'+code+'`}</code></pre>';
};
renderer.link = function(href, title, text){
  let className='',
    _href;
  if(text.indexOf('Try it yourself')!==-1){
    className = ' className="md-button md-button--36 md-button--blue"';
  }
  _href = href.replace(/\.md$/i,'');
  return `<a${className} href="${ _href }" title="${ title || text }" target="_blank">${text}</a>`;
};
class Markdown {

  constructor (target, source, templateType) {
    this.Target = target;
    this.Source = source;
    this.TemplateType = templateType;
    this.getContent = this['_' + templateType];
    this.ExportList = {};
  }

  clearAndCreate() {
    efs.emptyDirSync(this.Target);
  }

  exec() {
    this.clearAndCreate();
    if (fs.existsSync(this.Source)) {
      const filesLv1 = fs.readdirSync(this.Source);
      filesLv1.forEach((name) => {
        let fileLv1Name = path.resolve(this.Source, name),
          stat = fs.lstatSync(fileLv1Name);
        if (stat.isDirectory() === true) {
          this.ExportList[name] = [];
          this._generate(fileLv1Name, name);
        }
      });
      this._saveExport();
    }
  }

  _sortExport(a, b) {
    return +a.index-b.index;
  }

  _generate(exampleUrl, key) {
    const files = fs.readdirSync(exampleUrl);
    files.forEach((name) => {
      let obj = this.getContent(exampleUrl, key, name);
      if(typeof obj.content === 'string' && obj.content!== ''){
        this._save(key, name, obj);
      }
    });
    if(this.ExportList[key].length===0){
      delete this.ExportList[key];
    } else {
      this.ExportList[key].sort(this._sortExport);
    }
  }

  _saveExport() {
    let config = JSON.stringify(this.ExportList);
    fileSave(path.resolve(this.Target, this.TemplateType+'List.js'))
    .write(`const config = ${config};
module.exports = config;`, 'utf8')
    .end('\n');
  }

  _save(key, name, obj) {
    const folder = path.resolve(this.Target, key),
      fileName = this._getFileName(name)+'.js';
    console.log('Converted Markdown File ', fileName, ' under ', folder);
    this.ExportList[key].push({
      index: obj.index || 0,
      name: name,
      fileName: fileName
    });
    fileSave(path.join(folder, fileName))
    .write(obj.content, 'utf8')
    .end('\n');
  }

  _getFileName(name) {
    const _last = -path.extname(name).length,
      str = name.slice(0, _last);
    let _name = camelCase(str);
    if(_name.toLowerCase() === 'readme') {
      _name = 'overview';
    }
    return _name;
  }

  _getExampleClassName(name) {
    let _name = this._getFileName(name);
    _name = _name.replace(/^[a-z]/,function(word){
      return word.toUpperCase();
    });
    return _name;
  }

  _getHeaderInfo(content) {
    let ret;
    let match = content.match(/^\<\!\-\-\s(\{[\S\s]*\})\s\-\-\>/);
    if(match && match.length>1){
      try {
        ret = JSON.parse(match[1]);
      } catch (e) {
        return null;
      }
    }
    return ret;
  }

  _charts(exampleUrl, key, name) {
    if (path.extname(name) !== '.md') {
      return '';
    }
    let _content = fs.readFileSync(path.resolve(exampleUrl, name), 'utf8');
    let ret = Object.assign({}, this._getHeaderInfo(_content));

    const content = marked(_content, { renderer: renderer }).replace(/^[\S\s]+<\/blockquote>[\n\s\r\t]*/,'');

    const className = this._getExampleClassName(name);
    ret.content = `import React from 'react';
import CodeBlock from '../../../momentum-ui/CodeBlock';
export default class ${className} extends React.Component {
  componentDidMount() {
    if(window.__CPEmbed){
      window.__CPEmbed(".codepen-later");
    }
  }

  componentDidUpdate() {
    if(window.__CPEmbed){
      window.__CPEmbed(".codepen-later");
    }
  }

  render() {
    return (
      <div className='docs-markdown-warp'>
        ${content}
      </div>
    );
  }
}`;
    return ret;
  }

  _empty(content) {
    return `${content}`;
  }

}

module.exports = {
  Markdown
};
