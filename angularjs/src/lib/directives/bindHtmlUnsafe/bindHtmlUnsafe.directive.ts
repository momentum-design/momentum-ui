export interface ILink extends ng.IDirectiveLinkFn {
  (
    scope: ng.IScope,
    element: JQuery,
    attr: {
      mdBindHtmlUnsafe: string
    }
  ): void;
}

export class BindHtmlUnsafeDirective implements ng.IDirective {
  public link: ILink = (scope, element, attr) => {
    element.addClass('ng-binding').data('$binding', attr.mdBindHtmlUnsafe);
    scope.$watch(attr.mdBindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value: string) {
      element.html( value || '' );
    });
  };
  public static factory(): ng.IDirectiveFactory {
    let factory: ng.IDirectiveFactory = () => {
      return new BindHtmlUnsafeDirective();
    };
    return factory;
  }
}
