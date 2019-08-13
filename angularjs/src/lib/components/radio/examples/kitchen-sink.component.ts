class RadioKitchenSinkController {
  public model = {
    radio1: "1",
    radioDisabled1: "1",
    radioReadonly1: "1",
    radioNested1: "1",
    radioNestedHelp1: "1",
    radio2: "1",
    radioDisabled2: "1",
    radioReadonly2: "1",
    radioNested2: "1",
    radioNestedHelp2: "1",
    radio3: "1",
    radioDisabled3: "1",
    radioReadonly3: "1",
    radioNested3: "1",
    radioNestedHelp3: "1",
    radio4: "1",
    radioDisabled4: "1",
    radioReadonly4: "1",
    radioNested4: "1",
    radioNestedHelp4: "1",
  };
}

export class RadioKitchenSink implements angular.IComponentOptions {
  public static selector = 'exampleRadioKitchenSink';
  public static bindings = {};
  public static controller = RadioKitchenSinkController;
  public static template = `
    <form name="myInputsForm" novalidate>
    <div class="row" style="padding: 16px;">
      <div class="md-radio-group">
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio1"
          id="radio1"
          name="radio1"
          md-input-label="Radio Example 1"
          value="1"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio1"
          id="radioChecked1"
          name="radioChecked1"
          md-input-label="Radio Example 2"
          value="2"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio1"
          id="radioHelp1"
          name="radioHelp1"
          md-input-label="Radio Example 3 with help text"
          value="3"
          md-input-help-text="This is help text for the md-input radio"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio1"
          id="radioAfterHelp1"
          name="radioAfterHelp1"
          md-input-label="Radio Example 4 after help text"
          value="4"
        >
      </div>
      <div class="md-radio-group">
        <input
          md-input
          disabled
          type="radio"
          ng-model="$ctrl.model.radioDisabled1"
          id="radioDisabled1"
          name="radioDisabled1"
          md-input-label="Disabled Radio Example"
          value="1"
        >
        <input
          md-input
          disabled
          type="radio"
          ng-model="$ctrl.model.radioDisabled1"
          id="radioDisabledHelp1"
          name="radioDisabledHelp1"
          md-input-label="Disabled Radio Example with help text"
          md-input-help-text="This is disabled help text for the md-input radio"
          value="2"
        >
      </div>
      <div class="md-radio-group">
        <input
          md-input
          readonly
          type="radio"
          ng-model="$ctrl.model.radioReadonly1"
          id="radioReadonly1"
          name="radioReadonly1"
          md-input-label="Readonly Radio Example"
          value="1"
        >
        <input
          md-input
          readonly
          type="radio"
          ng-model="$ctrl.model.radioReadonly1"
          id="radioReadonlyHelp1"
          name="radioReadonlyHelp1"
          md-input-label="Readonly Radio Example with help text"
          md-input-help-text="This is readonly help text for the md-input radio"
          value="2"
        >
      </div>
      <div class="md-radio-group">
        <input
        md-input
        type="radio"
        ng-model="$ctrl.model.radioNested1"
        id="radioNested01"
        name="radioNested01"
        md-input-label="Nested Radio Example Level 0"
        value="1"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested1"
          id="radioNested11"
          name="radioNested11"
          md-input-label="Nested Radio Example Level 1"
          md-input-nested="1"
          value="2"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested1"
          id="radioNested21"
          name="radioNested21"
          md-input-label="Nested Radio Example Level 2"
          md-input-nested="2"
          value="3"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested1"
          id="radioNested31"
          name="radioNested31"
          md-input-label="Nested Radio Example Level 3"
          md-input-nested="3"
          value="4"
        >
      </div>
      <div class="md-radio-group">
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNestedHelp1"
          id="radioNestedHelp01"
          name="radioNestedHelp01"
          md-input-label="Nested Radio Example Level 0"
          value="1"
          md-input-help-text="This is nested help text for the md-input radio"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp1"
            id="radioNestedHelp11"
            name="radioNestedHelp11"
            md-input-label="Nested Radio Example Level 1"
            md-input-nested="1"
            value="2"
            md-input-help-text="This is nested help text for the md-input radio"
            >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp1"
            id="radioNestedHelp21"
            name="radioNestedHelp21"
            md-input-label="Nested Radio Example Level 2"
            md-input-nested="2"
            value="3"
            md-input-help-text="This is nested help text for the md-input radio"
            >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp1"
            id="radioNestedHelp31"
            name="radioNestedHelp31"
            md-input-label="Nested Radio Example Level 3"
            md-input-nested="3"
            value="4"
            md-input-help-text="This is nested help text for the md-input radio"
          >
      </div>
    </div>

    <div class="md-radio-group md--dark row" style="background-color: black; padding: 16px;">
      <div class="md-radio-group">
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio2"
          id="radio2"
          name="radio2"
          md-input-label="Radio Example 1"
          value="1"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio2"
          id="radioChecked2"
          name="radioChecked2"
          md-input-label="Radio Example 2"
          value="2"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio2"
          id="radioHelp2"
          name="radioHelp2"
          md-input-label="Radio Example 3 with help text"
          value="3"
          md-input-help-text="This is help text for the md-input radio"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radio2"
          id="radioAfterHelp2"
          name="radioAfterHelp2"
          md-input-label="Radio Example 4 after help text"
          value="4"
        >
      </div>
      <div class="md-radio-group">
        <input
          md-input
          disabled
          type="radio"
          ng-model="$ctrl.model.radioDisabled2"
          id="radioDisabled2"
          name="radioDisabled2"
          md-input-label="Disabled Radio Example"
          value="1"
        >
        <input
          md-input
          disabled
          type="radio"
          ng-model="$ctrl.model.radioDisabled2"
          id="radioDisabledHelp2"
          name="radioDisabledHelp2"
          md-input-label="Disabled Radio Example with help text"
          md-input-help-text="This is disabled help text for the md-input radio"
          value="2"
        >
      </div>
      <div class="md-radio-group">
        <input
          md-input
          readonly
          type="radio"
          ng-model="$ctrl.model.radioReadonly2"
          id="radioReadonly2"
          name="radioReadonly2"
          md-input-label="Readonly Radio Example"
          value="1"
        >
        <input
          md-input
          readonly
          type="radio"
          ng-model="$ctrl.model.radioReadonly2"
          id="radioReadonlyHelp2"
          name="radioReadonlyHelp2"
          md-input-label="Readonly Radio Example with help text"
          md-input-help-text="This is readonly help text for the md-input radio"
          value="2"
        >
      </div>
      <div class="md-radio-group">
        <input
        md-input
        type="radio"
        ng-model="$ctrl.model.radioNested2"
        id="radioNested02"
        name="radioNested02"
        md-input-label="Nested Radio Example Level 0"
        value="1"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested2"
          id="radioNested12"
          name="radioNested12"
          md-input-label="Nested Radio Example Level 1"
          md-input-nested="1"
          value="2"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested2"
          id="radioNested22"
          name="radioNested22"
          md-input-label="Nested Radio Example Level 2"
          md-input-nested="2"
          value="3"
        >
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested2"
          id="radioNested32"
          name="radioNested32"
          md-input-label="Nested Radio Example Level 3"
          md-input-nested="3"
          value="4"
        >
      </div>
      <div class="md-radio-group">
        <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNestedHelp2"
          id="radioNestedHelp02"
          name="radioNestedHelp02"
          md-input-label="Nested Radio Example Level 0"
          value="1"
          md-input-help-text="This is nested help text for the md-input radio"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp2"
            id="radioNestedHelp12"
            name="radioNestedHelp12"
            md-input-label="Nested Radio Example Level 1"
            md-input-nested="1"
            value="2"
            md-input-help-text="This is nested help text for the md-input radio"
            >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp2"
            id="radioNestedHelp22"
            name="radioNestedHelp22"
            md-input-label="Nested Radio Example Level 2"
            md-input-nested="2"
            value="3"
            md-input-help-text="This is nested help text for the md-input radio"
            >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp2"
            id="radioNestedHelp32"
            name="radioNestedHelp32"
            md-input-label="Nested Radio Example Level 3"
            md-input-nested="3"
            value="4"
            md-input-help-text="This is nested help text for the md-input radio"
          >
      </div>
    </div>

    <div class="md--contrast">
      <div class="row" style="padding: 16px;">
        <div class="md-radio-group">
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio3"
            id="radio3"
            name="radio3"
            md-input-label="Radio Example 1"
            value="1"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio3"
            id="radioChecked3"
            name="radioChecked3"
            md-input-label="Radio Example 2"
            value="2"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio3"
            id="radioHelp3"
            name="radioHelp3"
            md-input-label="Radio Example 3 with help text"
            value="3"
            md-input-help-text="This is help text for the md-input radio"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio3"
            id="radioAfterHelp3"
            name="radioAfterHelp3"
            md-input-label="Radio Example 4 after help text"
            value="4"
          >
        </div>
        <div class="md-radio-group">
          <input
            md-input
            disabled
            type="radio"
            ng-model="$ctrl.model.radioDisabled3"
            id="radioDisabled3"
            name="radioDisabled3"
            md-input-label="Disabled Radio Example"
            value="1"
          >
          <input
            md-input
            disabled
            type="radio"
            ng-model="$ctrl.model.radioDisabled3"
            id="radioDisabledHelp3"
            name="radioDisabledHelp3"
            md-input-label="Disabled Radio Example with help text"
            md-input-help-text="This is disabled help text for the md-input radio"
            value="2"
          >
        </div>
        <div class="md-radio-group">
          <input
            md-input
            readonly
            type="radio"
            ng-model="$ctrl.model.radioReadonly3"
            id="radioReadonly3"
            name="radioReadonly3"
            md-input-label="Readonly Radio Example"
            value="1"
          >
          <input
            md-input
            readonly
            type="radio"
            ng-model="$ctrl.model.radioReadonly3"
            id="radioReadonlyHelp3"
            name="radioReadonlyHelp3"
            md-input-label="Readonly Radio Example with help text"
            md-input-help-text="This is readonly help text for the md-input radio"
            value="2"
          >
        </div>
        <div class="md-radio-group">
          <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested3"
          id="radioNested03"
          name="radioNested03"
          md-input-label="Nested Radio Example Level 0"
          value="1"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNested3"
            id="radioNested13"
            name="radioNested13"
            md-input-label="Nested Radio Example Level 1"
            md-input-nested="1"
            value="2"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNested3"
            id="radioNested23"
            name="radioNested23"
            md-input-label="Nested Radio Example Level 2"
            md-input-nested="2"
            value="3"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNested3"
            id="radioNested33"
            name="radioNested33"
            md-input-label="Nested Radio Example Level 3"
            md-input-nested="3"
            value="4"
          >
        </div>
        <div class="md-radio-group">
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp3"
            id="radioNestedHelp03"
            name="radioNestedHelp03"
            md-input-label="Nested Radio Example Level 0"
            value="1"
            md-input-help-text="This is nested help text for the md-input radio"
            >
            <input
              md-input
              type="radio"
              ng-model="$ctrl.model.radioNestedHelp3"
              id="radioNestedHelp13"
              name="radioNestedHelp13"
              md-input-label="Nested Radio Example Level 1"
              md-input-nested="1"
              value="2"
              md-input-help-text="This is nested help text for the md-input radio"
              >
            <input
              md-input
              type="radio"
              ng-model="$ctrl.model.radioNestedHelp3"
              id="radioNestedHelp23"
              name="radioNestedHelp23"
              md-input-label="Nested Radio Example Level 2"
              md-input-nested="2"
              value="3"
              md-input-help-text="This is nested help text for the md-input radio"
              >
            <input
              md-input
              type="radio"
              ng-model="$ctrl.model.radioNestedHelp3"
              id="radioNestedHelp33"
              name="radioNestedHelp33"
              md-input-label="Nested Radio Example Level 3"
              md-input-nested="3"
              value="4"
              md-input-help-text="This is nested help text for the md-input radio"
            >
        </div>
      </div>

      <div class="md-radio-group md--dark row" style="background-color: black; padding: 16px;">
        <div class="md-radio-group">
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio1"
            id="radio4"
            name="radio4"
            md-input-label="Radio Example 1"
            value="1"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio1"
            id="radioChecked4"
            name="radioChecked4"
            md-input-label="Radio Example 2"
            value="2"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio1"
            id="radioHelp4"
            name="radioHelp4"
            md-input-label="Radio Example 3 with help text"
            value="3"
            md-input-help-text="This is help text for the md-input radio"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radio1"
            id="radioAfterHelp4"
            name="radioAfterHelp4"
            md-input-label="Radio Example 4 after help text"
            value="4"
          >
        </div>
        <div class="md-radio-group">
          <input
            md-input
            disabled
            type="radio"
            ng-model="$ctrl.model.radioDisabled1"
            id="radioDisabled4"
            name="radioDisabled4"
            md-input-label="Disabled Radio Example"
            value="1"
          >
          <input
            md-input
            disabled
            type="radio"
            ng-model="$ctrl.model.radioDisabled1"
            id="radioDisabledHelp4"
            name="radioDisabledHelp4"
            md-input-label="Disabled Radio Example with help text"
            md-input-help-text="This is disabled help text for the md-input radio"
            value="2"
          >
        </div>
        <div class="md-radio-group">
          <input
            md-input
            readonly
            type="radio"
            ng-model="$ctrl.model.radioReadonly1"
            id="radioReadonly4"
            name="radioReadonly4"
            md-input-label="Readonly Radio Example"
            value="1"
          >
          <input
            md-input
            readonly
            type="radio"
            ng-model="$ctrl.model.radioReadonly1"
            id="radioReadonlyHelp4"
            name="radioReadonlyHelp4"
            md-input-label="Readonly Radio Example with help text"
            md-input-help-text="This is readonly help text for the md-input radio"
            value="2"
          >
        </div>
        <div class="md-radio-group">
          <input
          md-input
          type="radio"
          ng-model="$ctrl.model.radioNested4"
          id="radioNested04"
          name="radioNested04"
          md-input-label="Nested Radio Example Level 0"
          value="1"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNested4"
            id="radioNested14"
            name="radioNested14"
            md-input-label="Nested Radio Example Level 1"
            md-input-nested="1"
            value="2"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNested4"
            id="radioNested24"
            name="radioNested24"
            md-input-label="Nested Radio Example Level 2"
            md-input-nested="2"
            value="3"
          >
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNested4"
            id="radioNested34"
            name="radioNested34"
            md-input-label="Nested Radio Example Level 3"
            md-input-nested="3"
            value="4"
          >
        </div>
        <div class="md-radio-group">
          <input
            md-input
            type="radio"
            ng-model="$ctrl.model.radioNestedHelp4"
            id="radioNestedHelp04"
            name="radioNestedHelp04"
            md-input-label="Nested Radio Example Level 0"
            value="1"
            md-input-help-text="This is nested help text for the md-input radio"
            >
            <input
              md-input
              type="radio"
              ng-model="$ctrl.model.radioNestedHelp4"
              id="radioNestedHelp14"
              name="radioNestedHelp14"
              md-input-label="Nested Radio Example Level 1"
              md-input-nested="1"
              value="2"
              md-input-help-text="This is nested help text for the md-input radio"
              >
            <input
              md-input
              type="radio"
              ng-model="$ctrl.model.radioNestedHelp4"
              id="radioNestedHelp24"
              name="radioNestedHelp24"
              md-input-label="Nested Radio Example Level 2"
              md-input-nested="2"
              value="3"
              md-input-help-text="This is nested help text for the md-input radio"
              >
            <input
              md-input
              type="radio"
              ng-model="$ctrl.model.radioNestedHelp4"
              id="radioNestedHelp34"
              name="radioNestedHelp34"
              md-input-label="Nested Radio Example Level 3"
              md-input-nested="3"
              value="4"
              md-input-help-text="This is nested help text for the md-input radio"
            >
        </div>
      </div>
    </div>
  </form>
  `;
}
