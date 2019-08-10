class CheckboxKitchenSinkController {
  public model = {
    checkboxChecked1: true,
    checkboxChecked2: true,
    checkboxChecked3: true,
    checkboxChecked4: true,
  };
}

export class CheckboxKitchenSink implements angular.IComponentOptions {
  public static selector = 'exampleCheckboxKitchenSink';
  public static bindings = {};
  public static controller = CheckboxKitchenSinkController;
  public static template = `
    <form name="myInputsForm" novalidate>
      <div style="padding: 16px;">
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkbox1"
          id="checkbox1"
          name="checkbox1"
          md-input-label="Checkbox Example"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxChecked1"
          id="checkboxChecked1"
          name="checkboxChecked1"
          md-input-label="Checkbox Checked Example"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxIndeterminate1"
          id="checkboxIndeterminate1"
          name="checkboxIndeterminate1"
          md-input-label="Checkbox Indeterminate Example"
          md-input-indeterminate="true"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxHelp1"
          id="checkboxHelp1"
          name="checkboxHelp1"
          md-input-label="Checkbox Example with help text"
          md-input-help-text="This is help text for the md-input checkbox"
        >

        <input
          md-input
          disabled
          type="checkbox"
          ng-model="$ctrl.model.checkboxDisabled1"
          id="checkboxDisabled1"
          name="checkboxDisabled1"
          md-input-label="Disabled Checkbox Example"
        >
        <input
          md-input
          disabled
          type="checkbox"
          ng-model="$ctrl.model.checkboxDisabledHelp1"
          id="checkboxDisabledHelp1"
          name="checkboxDisabledHelp1"
          md-input-label="Disabled Checkbox Example with help text"
          md-input-help-text="This is help text for the md-input checkbox"
        >

        <input
          md-input
          readonly
          type="checkbox"
          ng-model="$ctrl.model.checkboxReadonly1"
          id="checkboxReadonly1"
          name="checkboxReadonly1"
          md-input-label="Readonly Checkbox Example"
        >
        <input
          md-input
          readonly
          type="checkbox"
          ng-model="$ctrl.model.checkboxReadonlyHelp1"
          id="checkboxReadonlyHelp1"
          name="checkboxReadonlyHelp1"
          md-input-label="Readonly Checkbox Example with help text"
          md-input-help-text="This is help text for the md-input checkbox"
        >

        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested01"
          id="checkboxNested01"
          name="checkboxNested01"
          md-input-label="Nested Checkbox Example Level 0"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested11"
          id="checkboxNested11"
          name="checkboxNested11"
          md-input-label="Nested Checkbox Example Level 1"
          md-input-nested="1"
        >

        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested21"
          id="checkboxNested21"
          name="checkboxNested21"
          md-input-label="Nested Checkbox Example Level 2"
          md-input-nested="2"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested31"
          id="checkboxNested31"
          name="checkboxNested31"
          md-input-label="Nested Checkbox Example Level 3"
          md-input-nested="3"
        >

        <div class="md-checkbox-group">
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup11"
            id="checkboxGroup11"
            name="checkboxGroup11"
            md-input-label="Checkbox Group Example 1"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup21"
            id="checkboxGroup21"
            name="checkboxGroup21"
            md-input-label="Checkbox Group Example 2"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup31"
            id="checkboxGroup31"
            name="checkboxGroup31"
            md-input-label="Checkbox Group Example 3"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup41"
            id="checkboxGroup41"
            name="checkboxGroup41"
            md-input-label="Checkbox Group Example 4"
          >
        </div>
      </div>

      <div class="md-checkbox-group md--dark row" style="background-color: black; padding: 16px;">
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkbox2"
          id="checkbox2"
          name="checkbox2"
          md-input-label="Checkbox Example"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxChecked2"
          id="checkboxChecked2"
          name="checkboxChecked2"
          md-input-label="Checkbox Checked Example"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxIndeterminate2"
          id="checkboxIndeterminate2"
          name="checkboxIndeterminate2"
          md-input-label="Checkbox Indeterminate Example"
          md-input-indeterminate="true"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxHelp2"
          id="checkboxHelp2"
          name="checkboxHelp2"
          md-input-label="Checkbox Example with help text"
          md-input-help-text="This is help text for the md-input checkbox"
        >

        <input
          md-input
          disabled
          type="checkbox"
          ng-model="$ctrl.model.checkboxDisabled2"
          id="checkboxDisabled2"
          name="checkboxDisabled2"
          md-input-label="Disabled Checkbox Example"
        >
        <input
          md-input
          disabled
          type="checkbox"
          ng-model="$ctrl.model.checkboxDisabledHelp2"
          id="checkboxDisabledHelp2"
          name="checkboxDisabledHelp2"
          md-input-label="Disabled Checkbox Example with help text"
          md-input-help-text="This is help text for the md-input checkbox"
        >

        <input
          md-input
          readonly
          type="checkbox"
          ng-model="$ctrl.model.checkboxReadonly2"
          id="checkboxReadonly2"
          name="checkboxReadonly2"
          md-input-label="Readonly Checkbox Example"
        >
        <input
          md-input
          readonly
          type="checkbox"
          ng-model="$ctrl.model.checkboxReadonlyHelp2"
          id="checkboxReadonlyHelp2"
          name="checkboxReadonlyHelp2"
          md-input-label="Readonly Checkbox Example with help text"
          md-input-help-text="This is help text for the md-input checkbox"
        >

        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested02"
          id="checkboxNested02"
          name="checkboxNested02"
          md-input-label="Nested Checkbox Example Level 0"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested12"
          id="checkboxNested12"
          name="checkboxNested12"
          md-input-label="Nested Checkbox Example Level 1"
          md-input-nested="1"
        >

        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested22"
          id="checkboxNested22"
          name="checkboxNested22"
          md-input-label="Nested Checkbox Example Level 2"
          md-input-nested="2"
        >
        <input
          md-input
          type="checkbox"
          ng-model="$ctrl.model.checkboxNested32"
          id="checkboxNested32"
          name="checkboxNested32"
          md-input-label="Nested Checkbox Example Level 3"
          md-input-nested="3"
        >

        <div class="md-checkbox-group">
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup12"
            id="checkboxGroup12"
            name="checkboxGroup12"
            md-input-label="Checkbox Group Example 1"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup22"
            id="checkboxGroup22"
            name="checkboxGroup22"
            md-input-label="Checkbox Group Example 2"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup32"
            id="checkboxGroup32"
            name="checkboxGroup32"
            md-input-label="Checkbox Group Example 3"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxGroup42"
            id="checkboxGroup42"
            name="checkboxGroup42"
            md-input-label="Checkbox Group Example 4"
          >
        </div>
      </div>



      <div class="md--contrast">
        <div style="padding: 16px;">
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkbox3"
            id="checkbox3"
            name="checkbox3"
            md-input-label="Checkbox Example"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxChecked3"
            id="checkboxChecked3"
            name="checkboxChecked3"
            md-input-label="Checkbox Checked Example"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxIndeterminate3"
            id="checkboxIndeterminate3"
            name="checkboxIndeterminate3"
            md-input-label="Checkbox Indeterminate Example"
            md-input-indeterminate="true"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxHelp3"
            id="checkboxHelp3"
            name="checkboxHelp3"
            md-input-label="Checkbox Example with help text"
            md-input-help-text="This is help text for the md-input checkbox"
          >

          <input
            md-input
            disabled
            type="checkbox"
            ng-model="$ctrl.model.checkboxDisabled3"
            id="checkboxDisabled3"
            name="checkboxDisabled3"
            md-input-label="Disabled Checkbox Example"
          >
          <input
            md-input
            disabled
            type="checkbox"
            ng-model="$ctrl.model.checkboxDisabledHelp3"
            id="checkboxDisabledHelp3"
            name="checkboxDisabledHelp3"
            md-input-label="Disabled Checkbox Example with help text"
            md-input-help-text="This is help text for the md-input checkbox"
          >

          <input
            md-input
            readonly
            type="checkbox"
            ng-model="$ctrl.model.checkboxReadonly3"
            id="checkboxReadonly3"
            name="checkboxReadonly3"
            md-input-label="Readonly Checkbox Example"
          >
          <input
            md-input
            readonly
            type="checkbox"
            ng-model="$ctrl.model.checkboxReadonlyHelp3"
            id="checkboxReadonlyHelp3"
            name="checkboxReadonlyHelp3"
            md-input-label="Readonly Checkbox Example with help text"
            md-input-help-text="This is help text for the md-input checkbox"
          >

          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested03"
            id="checkboxNested03"
            name="checkboxNested03"
            md-input-label="Nested Checkbox Example Level 0"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested13"
            id="checkboxNested13"
            name="checkboxNested13"
            md-input-label="Nested Checkbox Example Level 1"
            md-input-nested="1"
          >

          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested23"
            id="checkboxNested23"
            name="checkboxNested23"
            md-input-label="Nested Checkbox Example Level 2"
            md-input-nested="2"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested33"
            id="checkboxNested33"
            name="checkboxNested33"
            md-input-label="Nested Checkbox Example Level 3"
            md-input-nested="3"
          >

          <div class="md-checkbox-group">
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup13"
              id="checkboxGroup13"
              name="checkboxGroup13"
              md-input-label="Checkbox Group Example 1"
            >
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup23"
              id="checkboxGroup23"
              name="checkboxGroup23"
              md-input-label="Checkbox Group Example 2"
            >
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup33"
              id="checkboxGroup33"
              name="checkboxGroup33"
              md-input-label="Checkbox Group Example 3"
            >
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup43"
              id="checkboxGroup43"
              name="checkboxGroup43"
              md-input-label="Checkbox Group Example 4"
            >
          </div>
        </div>

        <div class="md-checkbox-group md--dark row" style="background-color: black; padding: 16px;">
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkbox4"
            id="checkbox4"
            name="checkbox4"
            md-input-label="Checkbox Example"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxChecked4"
            id="checkboxChecked4"
            name="checkboxChecked4"
            md-input-label="Checkbox Checked Example"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxIndeterminate4"
            id="checkboxIndeterminate4"
            name="checkboxIndeterminate4"
            md-input-label="Checkbox Indeterminate Example"
            md-input-indeterminate="true"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxHelp4"
            id="checkboxHelp4"
            name="checkboxHelp4"
            md-input-label="Checkbox Example with help text"
            md-input-help-text="This is help text for the md-input checkbox"
          >

          <input
            md-input
            disabled
            type="checkbox"
            ng-model="$ctrl.model.checkboxDisabled4"
            id="checkboxDisabled4"
            name="checkboxDisabled4"
            md-input-label="Disabled Checkbox Example"
          >
          <input
            md-input
            disabled
            type="checkbox"
            ng-model="$ctrl.model.checkboxDisabledHelp4"
            id="checkboxDisabledHelp4"
            name="checkboxDisabledHelp4"
            md-input-label="Disabled Checkbox Example with help text"
            md-input-help-text="This is help text for the md-input checkbox"
          >

          <input
            md-input
            readonly
            type="checkbox"
            ng-model="$ctrl.model.checkboxReadonly4"
            id="checkboxReadonly4"
            name="checkboxReadonly4"
            md-input-label="Readonly Checkbox Example"
          >
          <input
            md-input
            readonly
            type="checkbox"
            ng-model="$ctrl.model.checkboxReadonlyHelp4"
            id="checkboxReadonlyHelp4"
            name="checkboxReadonlyHelp4"
            md-input-label="Readonly Checkbox Example with help text"
            md-input-help-text="This is help text for the md-input checkbox"
          >

          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested04"
            id="checkboxNested04"
            name="checkboxNested04"
            md-input-label="Nested Checkbox Example Level 0"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested14"
            id="checkboxNested14"
            name="checkboxNested14"
            md-input-label="Nested Checkbox Example Level 1"
            md-input-nested="1"
          >

          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested24"
            id="checkboxNested24"
            name="checkboxNested24"
            md-input-label="Nested Checkbox Example Level 2"
            md-input-nested="2"
          >
          <input
            md-input
            type="checkbox"
            ng-model="$ctrl.model.checkboxNested34"
            id="checkboxNested34"
            name="checkboxNested34"
            md-input-label="Nested Checkbox Example Level 3"
            md-input-nested="3"
          >

          <div class="md-checkbox-group">
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup14"
              id="checkboxGroup14"
              name="checkboxGroup14"
              md-input-label="Checkbox Group Example 1"
            >
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup24"
              id="checkboxGroup24"
              name="checkboxGroup24"
              md-input-label="Checkbox Group Example 2"
            >
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup34"
              id="checkboxGroup34"
              name="checkboxGroup34"
              md-input-label="Checkbox Group Example 3"
            >
            <input
              md-input
              type="checkbox"
              ng-model="$ctrl.model.checkboxGroup44"
              id="checkboxGroup44"
              name="checkboxGroup44"
              md-input-label="Checkbox Group Example 4"
            >
          </div>
        </div>
      </div>
    </form>
  `;
}
