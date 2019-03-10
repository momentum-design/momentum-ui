export function csErrorPopover() {
  let directive = {
    restrict: 'AC',
    controller: CsErrorPopoverCtrl,
    controllerAs: 'ep',
    bindToController: true,
  };

  return directive;
}

export function CsErrorPopoverCtrl() {
  let vm = this;

  vm.errorPopoverOpen = false;
  vm.changePopoverState = changePopoverState;

  function changePopoverState() {
    vm.errorPopoverOpen = !vm.errorPopoverOpen;
  }
}
