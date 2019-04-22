export class CardNumberCtrl implements ng.IComponentController {
  private mdId: string;
  public mdTitle: string;
  private onRemoveFn: Function;
  private deleteAriaLabel: string;

  public onRemoveClick(): void {
    this.onRemoveFn({
      id: this.mdId,
    });
  }
}

export class CardNumberComponent implements ng.IComponentOptions {
  public controller = CardNumberCtrl;
  public template = `
  <div class="md-card-number">
    <div class="left-panel">
      <p class="title" title="{{$ctrl.mdTitle}}">{{$ctrl.mdTitle}}</p>
    </div>
    <div class="right-panel">
      <i ng-click="$ctrl.onRemoveClick()" class="icon icon-exit" aria-label="{{::$ctrl.deleteAriaLabel}}"></i>
    </div>
  </div>
  `;
  public bindings = {
    mdId: '<',
    mdTitle: '<',
    onRemoveFn: '&',
    deleteAriaLabel: '@?',
  };
}
