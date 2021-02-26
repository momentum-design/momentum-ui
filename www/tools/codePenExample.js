'use strict';
/* eslint-disable */
const { CodePenPost } = require('./codePenPost');
const efs = require('fs-extra');
const fs = require("fs");
const path = require('path');
const camelCase = require('camelcase');
const fileSave = require('file-save');

class CodePenExample {

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
          let exampleUrl = path.resolve(fileLv1Name, 'example');
          if (fs.existsSync(exampleUrl)) {
            this.ExportList[name] = {};
            this._generate(exampleUrl, name);
          }
        }
      });
      this._saveExport();
    }
  }

  _generate(exampleUrl, key) {
    const files = fs.readdirSync(exampleUrl);
    files.forEach((name) => {
      let content = this.getContent(exampleUrl, name);
      if(typeof content === 'string' && content!== ''){
        this._save(key, name, content);
      }
    });
    if(this.ExportList[key]=={}){
      delete this.ExportList[key];
    }
  }

  _saveExport() {
    let config = JSON.stringify(this.ExportList);
    fileSave(path.resolve(this.Target, this.TemplateType+'List.js'))
    .write(`const config = ${config};
module.exports = config;`, 'utf8')
    .end('\n');
  }

  _save(key, name, content) {
    const folder = path.resolve(this.Target, key),
      fileName = this._getFileName(name)+'.js';
    console.log('Converted example', fileName, ' into ', folder);
    this.ExportList[key][name] = fileName;
    fileSave(path.join(folder, fileName))
    .write(content, 'utf8')
    .end('\n');
  }

  _getFileName(name) {
    const _last = -path.extname(name).length,
      str = name.slice(0, _last);
    let _name = camelCase(str);
    if(_name === 'index') {
      _name = 'default';
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

  _charts(exampleUrl, name) {
    if (name[0] === '_' || path.extname(name) !== '.js') {
      return '';
    }
    let _content = fs.readFileSync(path.resolve(exampleUrl, name), 'utf8');
    _content = CodePenPost.formatChartExample(_content);
    const post = new CodePenPost({
      js: _content
    }, 600);
    const content = post.prefillEmbedsStr();
    const className = this._getExampleClassName(name);
    return `import React from 'react';
export default class ${className} extends React.Component {
  componentDidMount() {
    if(window.__CPEmbed){
      window.__CPEmbed(".codepen");
    }
  }

  componentDidUpdate() {
    if(window.__CPEmbed){
      window.__CPEmbed(".codepen");
    }
  }

  render() {
    return (
      <React.Fragment>
      ${content}
      </React.Fragment>
    );
  }
}`;
  }

  _empty(content) {
    return `${content}`;
  }

}

module.exports = {
  CodePenExample
};
