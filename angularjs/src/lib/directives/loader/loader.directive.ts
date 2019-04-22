export function mdLoader() {
  let directive = {
    restrict: 'A',
    template: `<div class="md-loading">
      <span class="md-loading__icon"></span>&nbsp;<span class="md-loading__icon"></span>&nbsp;<span class="md-loading__icon"></span>
    </div>`,
  };
  return directive;
}
