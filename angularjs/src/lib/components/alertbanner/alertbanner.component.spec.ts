import csAlertbanner from './index';

describe('Component: csAlertbanner', () => {
  let element, $scope, $compile;

  beforeEach(() => {
    angular.mock.module(csAlertbanner);
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $compile = $injector.get('$compile');
    });
  });

  function getCompiledElement(html) {
    let element = angular.element(html);
    let compiledElement = $compile(element)($scope);
    $scope.$apply();
    return compiledElement;
  }

  it('should default on type "info"', function () {
    element = getCompiledElement('<cs-alert-banner></cs-alert-banner>');
    const alertBanner = element.find('.md-alert-banner');
    expect(alertBanner.hasClass('md-alert-banner--info')).toBe(true);
  });

  it('should reflect the "type" in the class', function () {
    const type = 'danger';
    element = getCompiledElement('<cs-alert-banner type="' + type + '"></cs-alert-banner>');
    const alertBanner = element.find('.md-alert-banner');
    expect(alertBanner.hasClass(`md-alert-banner--${type}`)).toBe(true);
  });

  it('should not display a close button by default', function () {
    element = getCompiledElement('<cs-alert-banner></cs-alert-banner>');
    const closeButton = element.find('.md-alert-banner-close');
    expect(closeButton.context).not.toBeDefined();
  });

  it('should display a close button if "closeable" is true', function () {
    element = getCompiledElement('<cs-alert-banner closeable="true"></cs-alert-banner>');
    const closeButton = element.find('.md-alert-banner-close');
    expect(closeButton).toBeDefined();
  });

  it('should transclude', function () {
    let text = 'dog';
    element = getCompiledElement('<cs-alert-banner>' + text + '</cs-alert-banner>');
    const alertBanner = element.find('.md-alert-banner');
    expect(alertBanner.text()).toContain(text);
  });
});
