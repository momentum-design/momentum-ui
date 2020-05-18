/*
  README:

  This parser processes a file one line at a time looking for multi-line comments. Any type of tracking across multiple lines will need to store that state with a variable.

  Basic Usage:  The parser has very little configurability out of the box.  If using the built in methods you'll most likely use one of the three main methods.
    1) commentsParser.detector - this allows the user to set the pattern they'll be looking for(regex) in each commented line.
    2) commentsParser.parser - a parser can be set up for each pattern that follows the detector pattern.
      For Example: If your detector is setup for the @ symbol.  You can then setup a parser for 'test'. That will look through the commented lines for any occurence of @test and return the contents.
    3) commentsParser.trim - to trim white space on a string

  Advanced Usage: Advanced configurations can be made in the _commentsParser.parse function.  If functionality is desired beyond multi-line comments - it can be accomplished there.
    As this changes the way each file it may be advisable to extend this function.
*/

// commentsParser Object
let commentsParser = (function() {
  // Store reference
  let _commentsParser = function() {};

  // Store parsers
  _commentsParser.parsers = {};

  // Default detect function
  _commentsParser.detect = function() {
    return true;
  };

  /*
     * Modify detector method
     *
     * @param (Function) The callback to be used to detect variables
     */
  _commentsParser.detector = function(callback) {
    _commentsParser.detect = callback;
  };

  /*
     * Add a parser for a specific variable
     *
     * @param (String) The name of the variable
     * @param (Function) The callback to be executed at parse time
     */
  _commentsParser.parser = function(name, callback) {
    _commentsParser.parsers[name] = callback;
  };

  /*
     * Add an alias for a parser
     *
     * @param (String) The name of the new variable
     * @param (String) The name of the existing parser to use
     */
  _commentsParser.alias = function(newName, oldName) {
    _commentsParser.parsers[newName] = _commentsParser.parsers[oldName];
  };

  /*
     * Trim whitespace from string
     *
     * @param (String) The string to be trimmed
     * @return (String) The trimmed string
     */
  _commentsParser.trim = function(str, arr) {
    let defaults = [/^\s\s*/, /\s\s*$/];
    arr = _commentsParser.isArray(arr) ? arr.concat(defaults) : defaults;
    arr.forEach(function(regEx) {
      str = str.replace(regEx, '');
    });
    return str;
  };

  /*
     * Check if object is an array
     *
     * @param (Object) The object to check
     * @return (Boolean) The result of the test
     */
  _commentsParser.isArray = function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  /*
     * Check the size of an object
     *
     * @param (Object) The object to check
     * @return (Boolean) The result of the test
     */
  _commentsParser.size = function(obj) {
    let size = 0;
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) size++;
    }
    return size;
  };

  /*
     * Iterate over an object
     *
     * @param (Object) The object to iterate over
     * @param (Function) Callback function to use when iterating
     * @param (Object) Optional context to pass to iterator
     */
  _commentsParser.each = function(obj, iterator, context) {
    if (obj == null) {
      return;
    }
    if (obj.length === +obj.length) {
      for (let i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === {}) {
          return;
        }
      }
    } else {
      for (let key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === {}) {
            return;
          }
        }
      }
    }
  };

  /*
     * Extend an object
     *
     * @param (Object) The object to extend
     */
  _commentsParser.extend = function(obj) {
    _commentsParser.each(Array.prototype.slice.call(arguments, 1), function(source) {
      if (source) {
        for (let prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  /*
     * Squeeze unnecessary extra characters/string
     *
     * @param (String) The string to be squeeze
     * @param (String) The string to be matched
     * @return (String) The modified string
     */
  _commentsParser.squeeze = function(str, def) {
    return str.replace(/\s{2,}/g, def);
  };

  /*
     * Normalizes the comment block to ignore any consistent preceding
     * whitespace. Consistent means the same amount of whitespace on every line
     * of the comment block. Also strips any whitespace at the start and end of
     * the whole block.
     *
     * @param (String) Text block
     * @return (String) A cleaned up text block
     */
  _commentsParser.normalize = function(text_block) {
    // Strip out any preceding [whitespace]* that occurs on every line
    text_block = text_block.replace(/^(\s*\*+)/, '');

    // Strip consistent indenting by measuring first line's whitespace
    let indent_size = false;
    let unindented = (function(lines) {
      return lines
        .map(function(line) {
          let preceding_whitespace = line.match(/^\s*/)[0].length;
          if (!indent_size) {
            indent_size = preceding_whitespace;
          }
          if (line == '') {
            return '';
          } else if (indent_size <= preceding_whitespace && indent_size > 0) {
            return line.slice(indent_size, line.length - 1);
          } else {
            return line;
          }
        })
        .join('\n');
    })(text_block.split('\n'));

    return _commentsParser.trim(text_block);
  };

  /*
     * Takes a file and extracts comments from it.
     *
     * @param (Object) options
     * @param (Function) callback
     */
  _commentsParser.parse = function(lines, options, callback) {
    // Options
    options = options ? options : {};
    options.preserve_whitespace = !!options.preserve_whitespace;

    // Setup
    let current_block = '';
    let inside_single_line_block = false;
    let inside_prop_block = false;
    let inside_multi_option_prop_block = false;
    let inside_multi_line_block = false;
    let last_line = '';
    let start = '{start}';
    let end = '{/end}';
    let _parsed = false;
    let _blocks = [];
    let parsed = '';
    let blocks = [];
    let temp = {};
    let lineNum = 0;
    let from = 0;
    let to = 0;

    lines = lines + '';
    lines.split(/\n/).forEach(function(line) {
      // Iterate line number and ensure line is treaty as a string
      lineNum = lineNum + 1;
      line = line + '';

      // Store starting line number
      if (single_line_comment(line) || start_multi_line_comment(line)) {
        from = lineNum;
      }

      // // Parse Single line comment
      // if ( single_line_comment( line ) ) {
      //   parsed = parse_single_line( line );
      //   if ( inside_single_line_block ) {
      //     current_block += '\n' + parsed;
      //   } else {
      //     current_block = parsed;
      //     inside_single_line_block = true;
      //   }
      // }

      const is_multi_line_start = start_multi_line_comment(line);
      const is_multi_line_end = end_multi_line_comment(line);

      // Parse multi-line comments
      if (is_multi_line_start || inside_multi_line_block) {
        parsed = parse_multi_line(line);
        if (inside_multi_line_block || inside_prop_block) {
          current_block += '\n' + parsed;
        } else {
          current_block += parsed;
          inside_multi_line_block = true;
        }
      }

      /* Parse react prop blocks */

      // Find start of prop block
      if (start_prop_block(line)) {
        inside_prop_block = true;
      }
      // Add parsed line if outside of multi-comment block
      if (
        !is_multi_line_start &&
        !inside_multi_line_block &&
        inside_prop_block
      ) {
        current_block += parse_multi_line(line);
      }
      // Determine if code prop block is multiple lines
      if (inside_prop_block && start_multi_option_prop_comment(line)) {
        inside_multi_option_prop_block = true;
      }
      // End a multi-option prop block
      if (
        inside_multi_option_prop_block &&
        end_multi_option_prop_comment(line)
      ) {
        inside_prop_block = false;
        inside_multi_option_prop_block = false;
      }
      // End a one-line prop block
      if (
        inside_prop_block &&
        end_prop_comment(line) &&
        !inside_multi_option_prop_block
      ) {
        inside_prop_block = false;
      }

      // End a multi-line block
      if (is_multi_line_end) {
        inside_multi_line_block = false;
      }

      // End prop block
      if (!inside_multi_line_block && inside_prop_block) {
        current_block += '\n split-here \n';
      }

      // Store current block if done
      if (
        !single_line_comment(line) &&
        !inside_multi_line_block &&
        !inside_prop_block
      ) {
        if (current_block) {
          _blocks.push({
            text: _commentsParser.normalize(current_block),
            from: from,
            to: lineNum
          });
        }
        inside_single_line_block = false;
        current_block = '';
        last_line = line;
      }
    });

    // Done first pass
    _parsed = true;

    // Create new blocks with custom parsing
    _blocks.forEach(function(block) {
      // Store line numbers
      let from = block.from;
      let to = block.to;

      // Remove extra whitespace
      block = block.text
        .split('\n')
        .filter(function(line) {
          return _commentsParser.trim(_commentsParser.normalize(line));
        })
        .join('\n');

      // Split block into lines
      block.split('\n').forEach(function(line) {
        if (_commentsParser.detect(line)) {
          temp = parser(
            temp,
            _commentsParser.normalize(line),
            block,
            lines,
            from,
            to,
            options
          );
        }
      });

      // Push to blocks if object isn't empty
      if (_commentsParser.size(temp)) {
        blocks.push(temp);
      }
      temp = {};
    });

    // Execute callback with filename and blocks
    callback({ blocks: blocks });
  };

  /*
     * Parses line
     *
     * @param (Num) the line number
     * @param (Num) number of lines
     * @param (String) line to parse/check
     * @return (Boolean) result of parsing
     */
  function parser(temp, line, block, file, from, to, options) {
    let parts = line.replace(/.*@/, '');
    let index =
      indexer(parts, ' ') ||
      indexer(parts, '\n') ||
      indexer(parts, '\r') ||
      parts.length;
    let name = _commentsParser.trim(parts.substr(0, index));

    let output = {
      options: options,
      file: file,
      name: name,
      line: {
        contents: _commentsParser.trim(parts.substr(index)),
        from: block.indexOf(line),
        to: block.indexOf(line)
      },
      block: {
        contents: block,
        from: from,
        to: to
      }
    };

    // find the next instance of a parser (if there is one based on the @ symbol)
    // in order to isolate the current multi-line parser
    let nextParserIndex = block.indexOf('* @', output.line.from + 1);
    let markupLength =
      nextParserIndex > -1 ? nextParserIndex - output.line.from : block.length;
    let contents = block
      .split('')
      .splice(output.line.from, markupLength)
      .join('');
    let parserMarker = '@' + name;
    contents = contents.replace(parserMarker, '');

    // Redefine output contents to support multiline contents
    output.line.contents = (function(contents) {
      let ret = [];
      let lines = contents.split('\n');

      lines.forEach(function(line, i) {
        let pattern = '*';
        let index = line.indexOf(pattern);

        if (index >= 0 && index < 10) {
          line = line
            .split('')
            .splice(index + pattern.length, line.length)
            .join('');
        }

        // Trim whitespace from the the first line in multiline contents
        if (i === 0) {
          line = _commentsParser.trim(line);
        }

        if (line && line.indexOf(parserMarker) == -1) {
          ret.push(line);
        }
      });

      return ret.join('\n');
    })(contents);

    line = {};
    line[name] = _commentsParser.parsers[name] ? _commentsParser.parsers[name].call(output) : '';
    if (temp[name]) {
      if (!_commentsParser.isArray(temp[name])) {
        temp[name] = [temp[name]];
      }
      if (!_commentsParser.isArray(line[name])) {
        temp[name].push(line[name]);
      } else {
        temp[name].push(line[name][0]);
      }
    } else {
      temp = _commentsParser.extend(temp, line);
    }
    return temp;
  }

  /*
     * Get the index of string inside of another
     */
  function indexer(str, find) {
    return str.indexOf(find) > 0 ? str.indexOf(find) : false;
  }

  /*
     * Comment block
     */
  function block() {
    this._raw = comment_text ? comment_text : '';
    this._filename = filename;
  }

  /*
     * Check for single-line comment
     *
     * @param (String) line to parse/check
     * @return (Boolean) result of check
     */
  function single_line_comment(line) {
    return !!line.match(/^\s*\/\//);
  }

  /* Check for PropType line
     *
     * @param (String) line to parse/check
     * @return (Boolean) result of check
     */
  function start_multi_option_prop_comment(line) {
    return !!line.match(/\(/) && !line.match(/(\()(.*?)(\))/);
  }

  /* Checks for end of multi-line prop block
     *
     * @param (String) line to parse/check
     * @return (Boolean) result of check
     */
  function end_multi_option_prop_comment(line) {
    return !!line.match(/\)/) && !line.match(/(\()(.*?)(\))/);
  }

  /*
     * Checks for start of a prop block
     *
     * @param (String) line to parse/check
     * @return (Boolean) result of check
     */
  function start_prop_block(line) {
    return !!line.match(/(@prop)/);
  }
  /*
     * Checks for start of a multi-line comment
     *
     * @param (String) line to parse/check
     * @return (Boolean) result of check
     */
  function start_multi_line_comment(line) {
    // if(line.match( /^\s*\/\*.*(?=@prop)/ )) {
    //   return 'prop';
    // }

    return !!line.match(/^\s*\/\*/);
  }

  /*
     * Check for end of a prop comment
     *
     * @parse (String) line to parse/check
     * @return (Boolean) result of check
     */
  function end_prop_comment(line) {
    if (single_line_comment(line)) {
      return false;
    }
    return !!line.match(/.*\,/);
  }

  /*
     * Check for end of a multi-line comment
     *
     * @parse (String) line to parse/check
     * @return (Boolean) result of check
     */
  function end_multi_line_comment(line) {
    if (single_line_comment(line)) {
      return false;
    }
    return !!line.match(/.*\*\//);
  }

  /*
     * Removes comment identifiers for single-line comments.
     *
     * @param (String) line to parse/check
     * @return (Boolean) result of check
     */
  function parse_single_line(line) {
    return line.replace(/\s*\/\//, '');
  }

  /*
     * Remove comment identifiers for multi-line comments.
     *
     * @param (String) line to parse/check
     * @return (Boolean) result of check
     */
  function parse_multi_line(line) {
    let cleaned = line.replace(/\s*\/\*/, '');
    return cleaned.replace(/\*\//, '');
  }

  // Return function
  return _commentsParser;
})();

// Describe default detection pattern
commentsParser.detector(function(line) {
  if (typeof line !== 'string') {
    return false;
  }
  let reference = line.split('\n\n').pop();
  return !!reference.match(/.*@/);
});

// Describe default parsing of a name
commentsParser.parser('name', function() {
  return commentsParser.trim(commentsParser.squeeze(this.line.contents, '/\n'));
});

// Describe default parsing of a description
commentsParser.parser('description', function() {
  return this.line.contents;
});

// Describe default parsing of a state
// commentsParser.parser('state', function () {
//   var state = this.line.contents.split(' - ');
//   return [{
//     name: state[0] ? commentsParser.trim(state[0]) : '',
//     escaped: state[0] ? commentsParser.trim(state[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
//     description: state[1] ? commentsParser.trim(state[1]) : ''
//   }];
// });

// Describe default parsing of a prop
commentsParser.parser('prop', function() {
  const lineOne = this.line.contents
    .split('split-here')
    .slice(0,1)
    .join('')
    .split(' | ');

  const lineTwo = this.line.contents
    .split('split-here')
    .slice(1)
    .map(str => str.trim())
    .join('');

  const propType = lineTwo && lineTwo.match(/(PropTypes\.)([^.].*[^,])/)[2];

  return {
    library: 'react',
    description: lineOne[0] ? commentsParser.trim(lineOne[0]) : '',
    default: lineOne[1] ? commentsParser.trim(lineOne[1]) : '',
    name: lineTwo ? commentsParser.trim(lineTwo.split(':', 1)[0]) : '',
    type: propType ? commentsParser.trim(propType.replace('.isRequired', '')) : '',
    required: lineOne[1] ? false : true
  };
});

// Describe default parsing of a param
// commentsParser.parser('param', function () {
//   var param = this.line.contents.split(' - ');
//   return [{
//     name: param[0] ? commentsParser.trim(param[0]) : '',
//     escaped: param[0] ? commentsParser.trim(param[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
//     description: param[1] ? commentsParser.trim(param[1]) : ''
//   }];
// });

// Describe default parsing of a piece markup
commentsParser.parser('markup', function() {
  return [
    {
      example: this.line.contents,
      escaped: this.line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  ];
});

commentsParser.parser('component', function() {
  return commentsParser.trim(commentsParser.squeeze(this.line.contents, '\n'));
});
commentsParser.parser('section', function() {
  return this.line.contents;
});
commentsParser.parser('variation', function() {
  return this.line.contents;
});

commentsParser.parser('hidecode', function() {
  return this.line.contents;
});

commentsParser.parser('html', function() {
  return {
    example: this.line.contents,
    escaped: this.line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  };
});

commentsParser.parser('js', function() {
  return {
    example: this.line.contents,
    escaped: this.line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  };
});

commentsParser.parser('react', function() {
  return {
    example: this.line.contents,
    escaped: this.line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  };
});

  commentsParser.parser('ts', function() {
    return ({
      example: this.line.contents,
      escaped: this.line.contents.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    });
  });

// commentsParser.parser('param', function() {
//   var param = this.line.contents.split(' - ');
//   var typeExp = /\(([^)]+)\)/;
//   var type = param[1] ? typeExp.exec(param[1]) : '';
//   return [{
//     name: (param[0]) ? commentsParser.trim(param[0]) : '',
//     escaped: (param[0]) ? commentsParser.trim(param[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
//     type: type[1] ? type[1] : '',
//     description: param[1] ? param[1].substr(0, param[1].indexOf('(')) : ''
//   }];
// });

// commentsParser.parser('prop', function() {
//   var prop = this.line.contents.split(' - ');
//   var typeExp = /\(([^)]+)\)/;
//   var type = prop[1] ? typeExp.exec(prop[1]) : '';
//   return [{
//     name: (prop[0]) ? commentsParser.trim(prop[0]) : '',
//     escaped: (prop[0]) ? commentsParser.trim(prop[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
//     type: type[1] ? type[1] : '',
//     description: prop[1] ? prop[1].substr(0, prop[1].indexOf('(')) : ''
//   }];
// });

// commentsParser.parser('variable', function() {
//   var variable = this.line.contents.split(':');
//   return [{
//     name: (variable[0]) ? commentsParser.trim(variable[0]) : '',
//     escaped: (variable[0]) ? commentsParser.trim(variable[0].replace('.', ' ').replace(':', ' pseudo-class-')) : '',
//     description: (variable[1]) ? commentsParser.trim(variable[1]) : ''
//   }];
// });

// Module exports
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = commentsParser;
  }
  exports.commentsParser = commentsParser;
} else {
  root['commentsParser'] = commentsParser;
}

// AMD definition
if (typeof define === 'function' && define.amd) {
  define(function(require) {
    return commentsParser;
  });
}
