class SelectKitchenSinkController {
  public selected = 'test1';

  public selectOptions = [
    'test1', 'test2', 'test3', 'test4'
  ]
}

export class SelectKitchenSink implements angular.IComponentOptions {
  public static selector = 'exampleSelectKitchenSink';
  public static bindings = {};
  public static controller = SelectKitchenSinkController;
  public static template = `
    <form name="myInputsForm" novalidate>
      <div class="row" style="padding: 16px;">
        <md-select
          name='selectDefault'
          ng-model="$ctrl.selected"
          options="$ctrl.selectOptions"
          filter="false"
          required="true"
        >
      </div>
    </form>
  `;
}
