export function mdErrorPopover() {
  let directive = {
    restrict: 'AC',
    controller: MdErrorPopoverCtrl,
    controllerAs: 'ep',
    bindToController: true,
  };

  return directive;
}

export function MdErrorPopoverCtrl() {
  let vm = this;

  vm.errorPopoverOpen = false;
  vm.changePopoverState = changePopoverState;

  function changePopoverState() {
    vm.errorPopoverOpen = !vm.errorPopoverOpen;
  }
}
