import * as _ from 'lodash';

export interface ITokenField extends ng.IScope {
  tokenoptions: any;
  tokenmethods: any;
  static: any;
}

export class TokenField implements ng.IDirective {
  constructor(private $timeout: ng.ITimeoutService) {}

  public link: ng.IDirectiveLinkFn = (scope: ITokenField, elem: any, attr: ng.IAttributes) => {
    const tokenfieldElem = elem.find('> input');

    // Get delimiter from tokenoptions or default to comma
    let delimiterOpts = _.get(scope.tokenoptions, 'delimiter', [',']).join('');
    let delimiter = _.escapeRegExp(delimiterOpts);
    // Add newline characters to the existing delimiters
    let delimiterRegEx = new RegExp('[' + delimiter + '\r\n]', 'g');

    this.$timeout(() => {
      let pasteEvent = e => {
        try {
          let data;
          let clipboardData = e.originalEvent.clipboardData;
          if (_.includes(clipboardData.types, 'text/html')) {
            // If data contains html - parse it, select by table row <tr>, get the text value, and trim
            data = $('tr', $.parseHTML(clipboardData.getData('text/html')))
              .text()
              .trim();
          }
          if (!data) {
            // If we didn't find data, retrieve the regular text
            data = clipboardData.getData('text');
          }
          // Stop the original paste event from completing
          e.preventDefault();
          // Split on our delimiters and create new tokens
          _.forEach(_.trim(data).split(delimiterRegEx), token => {
            tokenfieldElem.tokenfield('createToken', _.trim(token));
          });
        } catch (e) {
          // do nothing
        }
      };
      tokenfieldElem
        .tokenfield(scope.tokenoptions)
        .on('tokenfield:createtoken', e => {
          if (_.has(scope, 'tokenmethods.createtoken')) {
            scope.tokenmethods.createtoken(e);
          }
        })
        .on('tokenfield:createdtoken', e => {
          if (_.has(scope, 'tokenmethods.createdtoken')) {
            scope.tokenmethods.createdtoken(e);
          }
        })
        .on('tokenfield:edittoken', e => {
          if (_.has(scope, 'tokenmethods.edittoken')) {
            scope.tokenmethods.edittoken(e);
          }
        })
        .on('tokenfield:editedtoken', e => {
          if (_.has(scope, 'tokenmethods.editedtoken')) {
            scope.tokenmethods.editedtoken(e);
          }
        })
        .on('tokenfield:removetoken', e => {
          if (_.has(scope, 'tokenmethods.removetoken')) {
            scope.tokenmethods.removetoken(e);
          }
        })
        .on('tokenfield:removedtoken', e => {
          if (_.has(scope, 'tokenmethods.removedtoken')) {
            scope.tokenmethods.removedtoken(e);
          }
        })
        .data('bs.tokenfield')
        .$input.on('paste', pasteEvent);
    });

    if (scope.static) {
      this.$timeout(() => {
        let tokenFieldElemParent = tokenfieldElem.parent();
        tokenFieldElemParent.addClass('form-control-static').removeClass('form-control');
        let tokenInput = tokenFieldElemParent.find('input').last();
        tokenInput.attr('readonly', 'true');

        // Make the input editable when token is being edited
        tokenfieldElem
          .on('tokenfield:edittoken', () => {
            tokenInput.removeAttr('readonly');
          })
          .on('tokenfield:createdtoken', () => {
            tokenInput.attr('readonly', 'true');
          });
      });
    }
  };

  public restrict = 'AE';
  public scope = {
    tokens: '=',
    tokenfieldid: '=',
    tokenplaceholder: '=',
    tokenoptions: '=',
    tokenmethods: '=',
    tokenpattern: '=',
    static: '=',
  };
  public template = `<input type="{{tokenoptions.inputType}}" class="form-control token-input" id="{{tokenfieldid}}" ng-model="tokens" placeholder="{{tokenplaceholder}}" ng-pattern="{{tokenpattern}}"/>`;
}

tokenFieldFactory.$inject = ['$timeout'];
export function tokenFieldFactory($timeout) {
  return new TokenField($timeout);
}
