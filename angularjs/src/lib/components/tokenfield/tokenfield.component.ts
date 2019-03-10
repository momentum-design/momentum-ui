import * as _ from 'lodash';

export interface ITokenField extends ng.IScope {
  tokenoptions: any;
  tokenmethods: any;
  static: any;
}

export class TokenField implements ng.IDirective {
  constructor (
    private $timeout: ng.ITimeoutService,
  ) {}

  public preLink: ng.IDirectiveLinkFn = (
    scope: ITokenField,
    elem: any,
    attr: ng.IAttributes,
  ) => {
    // Get delimiter from tokenoptions or default to comma
    let delimiterOpts = _.get(scope.tokenoptions, 'delimiter', [',']).join('');
    let delimiter = _.escapeRegExp(delimiterOpts);
    // Add newline characters to the existing delimiters
    let delimiterRegEx = new RegExp('[' + delimiter + '\r\n]', 'g');

    this.$timeout( () => {
      let pasteEvent = (e) => {
        try {
          let data;
          let clipboardData = e.originalEvent.clipboardData;
          if (_.includes(clipboardData.types, 'text/html')) {
            // If data contains html - parse it, select by table row <tr>, get the text value, and trim
            data = $('tr', $.parseHTML(clipboardData.getData('text/html'))).text().trim();
          }
          if (!data) {
            // If we didn't find data, retrieve the regular text
            data = clipboardData.getData('text');
          }
          // Stop the original paste event from completing
          e.preventDefault();
          // Split on our delimiters and create new tokens
          _.forEach(_.trim(data).split(delimiterRegEx), (token) => {
            elem.tokenfield('createToken', _.trim(token));
          });
        } catch (e) {
          // do nothing
        }
      };
      elem.tokenfield(scope.tokenoptions)
        .on('tokenfield:createtoken', (e) => {
          if (_.has(scope, 'tokenmethods.createtoken')) {
            scope.tokenmethods.createtoken(e);
          }
        })
        .on('tokenfield:createdtoken', (e) => {
          if (_.has(scope, 'tokenmethods.createdtoken')) {
            scope.tokenmethods.createdtoken(e);
          }
        })
        .on('tokenfield:edittoken', (e) => {
          if (_.has(scope, 'tokenmethods.edittoken')) {
            scope.tokenmethods.edittoken(e);
          }
        })
        .on('tokenfield:editedtoken', (e) => {
          if (_.has(scope, 'tokenmethods.editedtoken')) {
            scope.tokenmethods.editedtoken(e);
          }
        })
        .on('tokenfield:removetoken', (e) => {
          if (_.has(scope, 'tokenmethods.removetoken')) {
            scope.tokenmethods.removetoken(e);
          }
        })
        .on('tokenfield:removedtoken', (e) => {
          if (_.has(scope, 'tokenmethods.removedtoken')) {
            scope.tokenmethods.removedtoken(e);
          }
        })
        .data('bs.tokenfield').$input.on('paste', pasteEvent);
    });
  }

  public postLink: ng.IDirectiveLinkFn = (
    scope: ITokenField,
    elem: ng.IAugmentedJQuery,
    attr: ng.IAttributes,
  ) => {
    if (scope.static) {
      this.$timeout(() => {
        let tokenField = elem.parent();
        tokenField.addClass('form-control-static').removeClass('form-control');
        let tokenInput = tokenField.find('input').last();
        tokenInput.attr('readonly', 'true');

        // Make the input editable when token is being edited
        elem.on('tokenfield:edittoken', () => {
          tokenInput.removeAttr('readonly');
        })
          .on('tokenfield:createdtoken', () => {
            tokenInput.attr('readonly', 'true');
          });
      });
    }
  }

  public compileFxn = (): any => (
    {
      pre: this.preLink,
      post: this.postLink,
    }
  );

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
  public replace = true;
  public template = `<input type="{{tokenoptions.inputType}}" class="form-control token-input" id="{{tokenfieldid}}" ng-model="tokens" placeholder="{{tokenplaceholder}}" ng-pattern="{{tokenpattern}}"/>`;
  public compile: ng.IDirectiveCompileFn = this.compileFxn ;

  /* @ngInject */
  public static factory($timeout) {
    return new TokenField($timeout);
  }
}
