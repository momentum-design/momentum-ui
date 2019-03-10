export function csLoader() {
  let directive = {
    restrict: 'A',
    template: `<div class="cui-loading">
      <span class="cui-loading__icon"></span>&nbsp;<span class="cui-loading__icon"></span>&nbsp;<span class="cui-loading__icon"></span>
    </div>`,
  };
  return directive;
}
