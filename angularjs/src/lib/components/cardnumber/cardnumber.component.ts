export class CardNumberCtrl implements ng.IComponentController {
  private csId: string;
  public csTitle: string;
  private onRemoveFn: Function;
  private deleteAriaLabel: string;

  public onRemoveClick(): void {
    this.onRemoveFn({
      id: this.csId,
    });
  }
}

export class CardNumberComponent implements ng.IComponentOptions {
  public controller = CardNumberCtrl;
  public template = `
  <div class="md-card-number">
    <div class="left-panel">
      <p class="title" title="{{$ctrl.csTitle}}">{{$ctrl.csTitle}}</p>
    </div>
    <div class="right-panel">
      <i ng-click="$ctrl.onRemoveClick()" class="icon icon-exit" aria-label="{{::$ctrl.deleteAriaLabel}}"></i>
    </div>
  </div>
  `;
  public bindings = {
    csId: '<',
    csTitle: '<',
    onRemoveFn: '&',
    deleteAriaLabel: '@?',
  };
}
