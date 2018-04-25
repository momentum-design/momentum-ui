// Requirements
var fs = require('fs');
var glob = require('glob');
var dss = require('dss');
var jsonfile = require('jsonfile');
var _ = require('lodash');

glob('scss/**/*.scss', null, (err, files) => {

  dss.parser('category', function() {
    return this.line.contents;
  });
  dss.parser('component', function() {
    return this.line.contents;
  });
  dss.parser('section', function() {
    return this.line.contents;
  });
  dss.parser('variation', function() {
    return this.line.contents;
  });

  dss.parser('html', function() {
    return [{
      example: this.line.contents,
      escaped: this.line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }];
  });

  dss.parser('js', function() {
    return [{
      example: this.line.contents,
      escaped: this.line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }];
  });

  dss.parser('param', function() {
    var param = this.line.contents.split(' - ');
    var typeExp = /\(([^)]+)\)/;
    var type = param[1] ? typeExp.exec(param[1]) : '';
    return [{
      name: (param[0]) ? dss.trim(param[0]) : '',
      escaped: (param[0]) ? dss.trim(param[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
      type: type[1] ? type[1] : '',
      description: param[1] ? param[1].substr(0, param[1].indexOf('(')) : ''
    }];
  });

  dss.parser('variable', function() {
    var variable = this.line.contents.split(':');
    return [{
      name: (variable[0]) ? dss.trim(variable[0]) : '',
      escaped: (variable[0]) ? dss.trim(variable[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
      description: (variable[1]) ? dss.trim(variable[1]) : ''
    }];
  });

  _.forEach(files, (file) => {
    const fileContents = fs.readFileSync(file);
    dss.parse(fileContents, {}, function(parsedObject) {
      if (!parsedObject.blocks.length > 0) {
        return;
      }

      const fn = _.kebabCase(file).replace(/\//g, '-');
      const filename = `docs/${fn}.json`;

      jsonfile.writeFile(filename, parsedObject, (err) => console.error(err));

      console.log(`${filename}.json was saved!`);
    });
  });


});
