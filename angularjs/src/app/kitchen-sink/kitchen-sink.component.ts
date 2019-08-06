class KitchenSinkController {
  public messages = {
    minlength: 'This is where the error message would be.',
  };
  public inputsModel = {
    success: 'Success Text',
    error: 'Error Text',
    warning: 'Warning Text',
    readOnly: 'With Value',
    disabledWithValue: 'With Value',
    disabledro: 'Disabled ReadOnly Input',
    clearInput: 'Press or click the icon to clear the input'
  };
  public warning = () => false;
}

export class KitchenSink implements angular.IComponentOptions {
  public static selector = 'kitchenSink';
  public static bindings = {};
  public static controller = KitchenSinkController;
  public static template = `
  <div>
    <h1>AngularJS Kitchen Sink</h1>
    <form name="myInputsForm" novalidate>
      <div class="row" style="padding: 16px;">
        <input
          md-input
          type="text"
          id="inputSuccess1"
          md-input-label="Success"
          name="inputSuccess1"
          ng-model="$ctrl.inputsModel.success"
          md-input-group-size="small-12"
        >
        <input
          md-input
          type="text"
          id="inputError1"
          md-input-label="Error"
          name="inputError1"
          ng-model="$ctrl.inputsModel.error"
          md-input-group-size="small-12"
          md-input-messages="$ctrl.messages"
          ng-minlength="20"
        >
        <input
          md-input
          type="text"
          id="inputWarning1"
          md-input-label="Warning"
          name="inputWarning1"
          ng-model="$ctrl.inputsModel.warning"
          md-input-group-size="small-12"
          md-input-warning-message="This is a warning message"
          md-input-warning="$ctrl.warning"
        >
        <input
          md-input
          type="text"
          id="default1"
          md-input-label="Default"
          name="default1"
          ng-model="$ctrl.inputsModel.default"
          md-input-group-size="small-12"
        >
        <input
          md-input
          type="text"
          id="pill1"
          md-input-label="Pill"
          name="pill1"
          ng-model="$ctrl.inputsModel.pill"
          md-input-group-size="small-12"
          md-input-shape="pill"
        >
        <textarea
          md-input
          type="textarea"
          id="multiline1"
          md-input-label="Multiline"
          name="multiline1"
          ng-model="$ctrl.inputsModel.multiline"
          md-input-group-size="small-12"
          rows="10"
        ></textarea>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested1"
            md-input-label="Nested"
            name="nested1"
            ng-model="$ctrl.inputsModel.nested1"
            md-input-group-size="small-6"
            md-input-nested="1"
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested21"
            md-input-label="Nested 2"
            name="nested21"
            ng-model="$ctrl.inputsModel.nested2"
            md-input-group-size="small-6"
            md-input-nested="2"
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested21"
            md-input-label="Nested 3"
            name="nested21"
            ng-model="$ctrl.inputsModel.nested3"
            md-input-group-size="small-6"
            md-input-nested="3"
          >
        </div>
        <input
          md-input
          type="text"
          id="readOnly1"
          md-input-label="Read Only"
          name="readOnly1"
          ng-model="$ctrl.inputsModel.readOnly"
          md-input-group-size="small-12"
          readonly
        >
        <input
          md-input
          type="text"
          id="disabled1"
          name="disabled1"
          md-input-label="Disabled"
          placeholder="Placeholder"
          ng-model="$ctrl.inputsModel.disabled"
          md-input-group-size="small-12"
          disabled
        >
        <input
          md-input
          type="text"
          id="disabledWithValue1"
          md-input-label="Disabled Value"
          name="disabledWithValue1"
          ng-model="$ctrl.inputsModel.disabledWithValue"
          md-input-group-size="small-12"
          disabled
        >
        <input
          md-input
          type="text"
          id="disabledro1"
          md-input-label="Disabled Read Only"
          name="disabledro1"
          ng-model="$ctrl.inputsModel.disabledro"
          md-input-group-size="small-12"
          disabled
          readonly
        >
        <input
          md-input
          type="text"
          id="placeholder1"
          name="placeholder1"
          md-input-label="Placeholder"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.placeholder"
          md-input-group-size="small-12"
        >
        <input
          md-input
          type="text"
          id="clearInput1"
          md-input-label="Clear"
          name="clearInput1"
          ng-model="$ctrl.inputsModel.clearInput"
          md-input-group-size="small-12"
          md-input-clear
        >
        <input
          md-input
          type="text"
          id="rightIcon1"
          name="rightIcon1"
          md-input-label="Right Icon"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.rightIcon"
          md-input-group-size="small-12"
          md-input-after="accessibility_16"
        >
        <input
          md-input
          type="text"
          id="leftIcon1"
          name="leftIcon1"
          md-input-label="Left Icon"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
        >
        <input
          md-input
          type="text"
          id="leftIconDisabled1"
          name="leftIconDisabled1"
          md-input-label="Left Icon Disabled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIconDisabled"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          disabled
        >
        <input
          md-input
          type="text"
          id="clearLeftIcon1"
          name="clearLeftIcon1"
          md-input-label="Clear and Left Icon"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.clearLeftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          clear
        >
        <input
          md-input
          type="text"
          id="help1"
          name="help1"
          md-input-label="Help Text"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.help"
          md-input-group-size="small-12"
          md-input-help-text="This is help text or description for the normal input"
        >
        <input
          md-input
          type="text"
          id="inputSecondaryLabel1"
          name="inputSecondaryLabel1"
          md-input-label="Secondary Label"
          ng-model="$ctrl.inputsModel.inputSecondaryLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabel1"
          name="inputSecondaryHelpLabel1"
          md-input-label="Secondary/Help Label"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabelDisabled1"
          name="inputSecondaryHelpLabelDisabled1"
          md-input-label="Disabled Secondary/Help Label"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
          disabled
        >
    <!-- Filled Inputs -->
        <input
          md-input
          type="text"
          id="inputSuccessFilled1"
          md-input-label="Success Filled"
          name="inputSuccessFilled1"
          ng-model="$ctrl.inputsModel.success"
          md-input-group-size="small-12"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputErrorFilled1"
          md-input-label="Error Filled"
          name="inputErrorFilled1"
          ng-model="$ctrl.inputsModel.error"
          md-input-group-size="small-12"
          md-input-messages="$ctrl.messages"
          ng-minlength="20"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputWarningFilled1"
          md-input-label="Warning Filled"
          name="inputWarningFilled1"
          ng-model="$ctrl.inputsModel.warning"
          md-input-group-size="small-12"
          md-input-warning-message="This is a warning message"
          md-input-warning="$ctrl.warning"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="defaultFilled1"
          md-input-label="Default Filled"
          name="defaultFilled1"
          ng-model="$ctrl.inputsModel.default"
          md-input-group-size="small-12"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="pillFilled1"
          md-input-label="Pill Filled"
          name="pillFilled1"
          ng-model="$ctrl.inputsModel.pill"
          md-input-group-size="small-12"
          md-input-shape="pill"
          md-input-filled
        >
        <textarea
          md-input
          type="textarea"
          id="multilineFilled1"
          md-input-label="Multiline Filled"
          name="multilineFilled1"
          ng-model="$ctrl.inputsModel.multiline"
          md-input-group-size="small-12"
          rows="10"
          md-input-filled
        ></textarea>
        <div class="row">
          <input
            md-input
            type="text"
            id="nestedFilled1"
            md-input-label="Nested Filled"
            name="nestedFilled1"
            ng-model="$ctrl.inputsModel.nestedFilled1"
            md-input-group-size="small-6"
            md-input-nested="Filled1"
            md-input-filled
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested2Filled1"
            md-input-label="Nested 2 Filled"
            name="nested2Filled1"
            ng-model="$ctrl.inputsModel.nested2"
            md-input-group-size="small-6"
            md-input-nested="2"
            md-input-filled
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested2Filled1"
            md-input-label="Nested 3 Filled"
            name="nested2Filled1"
            ng-model="$ctrl.inputsModel.nested3"
            md-input-group-size="small-6"
            md-input-nested="3"
            md-input-filled
          >
        </div>
        <input
          md-input
          type="text"
          id="readOnlyFilled1"
          md-input-label="Read Only Filled"
          name="readOnlyFilled1"
          ng-model="$ctrl.inputsModel.readOnly"
          md-input-group-size="small-12"
          readonly
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="disabledFilled1"
          name="disabledFilled1"
          md-input-label="Disabled Filled"
          placeholder="Placeholder"
          ng-model="$ctrl.inputsModel.disabled"
          md-input-group-size="small-12"
          disabled
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="disabledWithValueFilled1"
          md-input-label="Disabled Value Filled"
          name="disabledWithValueFilled1"
          ng-model="$ctrl.inputsModel.disabledWithValue"
          md-input-group-size="small-12"
          disabled
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="disabledroFilled1"
          md-input-label="Disabled Read Only Filled"
          name="disabledroFilled1"
          ng-model="$ctrl.inputsModel.disabledro"
          md-input-group-size="small-12"
          disabled
          readonly
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="placeholderFilled1"
          name="placeholderFilled1"
          md-input-label="Placeholder Filled"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.placeholder"
          md-input-group-size="small-12"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="clearInputFilled1"
          md-input-label="Clear Filled"
          name="clearInputFilled1"
          ng-model="$ctrl.inputsModel.clearInput"
          md-input-group-size="small-12"
          md-input-clear
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="rightIconFilled1"
          name="rightIconFilled1"
          md-input-label="Right Icon Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.rightIcon"
          md-input-group-size="small-12"
          md-input-after="accessibility_16"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="leftIconFilled1"
          name="leftIconFilled1"
          md-input-label="Left Icon Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="leftIconDisabledFilled1"
          name="leftIconDisabledFilled1"
          md-input-label="Left Icon Disabled Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIconDisabled"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          disabled
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="clearLeftIconFilled1"
          name="clearLeftIconFilled1"
          md-input-label="Clear and Left Icon Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.clearLeftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          clear
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="helpFilled1"
          name="helpFilled1"
          md-input-label="Help Text Filled"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.help"
          md-input-group-size="small-12"
          md-input-help-text="This is help text or description for the normal input"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputSecondaryLabelFilled1"
          name="inputSecondaryLabelFilled1"
          md-input-label="Secondary Label Filled"
          ng-model="$ctrl.inputsModel.inputSecondaryLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabelFilled1"
          name="inputSecondaryHelpLabelFilled1"
          md-input-label="Secondary/Help Label Filled"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabelDisabledFilled1"
          name="inputSecondaryHelpLabelDisabledFilled1"
          md-input-label="Disabled Secondary/Help Label Filled"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
          disabled
          md-input-filled
        >
      </div>
      <div class="md--dark row" style="background-color: black; padding: 16px;">
        <input
          md-input
          type="text"
          id="inputSuccess2"
          md-input-label="Success"
          name="inputSuccess2"
          ng-model="$ctrl.inputsModel.success"
          md-input-group-size="small-12"
        >
        <input
          md-input
          type="text"
          id="inputError2"
          md-input-label="Error"
          name="inputError2"
          ng-model="$ctrl.inputsModel.error"
          md-input-group-size="small-12"
          md-input-messages="$ctrl.messages"
          ng-minlength="20"
        >
        <input
          md-input
          type="text"
          id="inputWarning2"
          md-input-label="Warning"
          name="inputWarning2"
          ng-model="$ctrl.inputsModel.warning"
          md-input-group-size="small-12"
          md-input-warning-message="This is a warning message"
          md-input-warning="$ctrl.warning"
        >
        <input
          md-input
          type="text"
          id="default2"
          md-input-label="Default"
          name="default2"
          ng-model="$ctrl.inputsModel.default"
          md-input-group-size="small-12"
        >
        <input
          md-input
          type="text"
          id="pill2"
          md-input-label="Pill"
          name="pill2"
          ng-model="$ctrl.inputsModel.pill"
          md-input-group-size="small-12"
          md-input-shape="pill"
        >
        <textarea
          md-input
          type="textarea"
          id="multiline2"
          md-input-label="Multiline"
          name="multiline2"
          ng-model="$ctrl.inputsModel.multiline"
          md-input-group-size="small-12"
          rows="10"
        ></textarea>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested2"
            md-input-label="Nested"
            name="nested2"
            ng-model="$ctrl.inputsModel.nested2"
            md-input-group-size="small-6"
            md-input-nested="2"
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested22"
            md-input-label="Nested 2"
            name="nested22"
            ng-model="$ctrl.inputsModel.nested2"
            md-input-group-size="small-6"
            md-input-nested="2"
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested22"
            md-input-label="Nested 3"
            name="nested22"
            ng-model="$ctrl.inputsModel.nested3"
            md-input-group-size="small-6"
            md-input-nested="3"
          >
        </div>
        <input
          md-input
          type="text"
          id="readOnly2"
          md-input-label="Read Only"
          name="readOnly2"
          ng-model="$ctrl.inputsModel.readOnly"
          md-input-group-size="small-12"
          readonly
        >
        <input
          md-input
          type="text"
          id="disabled2"
          name="disabled2"
          md-input-label="Disabled"
          placeholder="Placeholder"
          ng-model="$ctrl.inputsModel.disabled"
          md-input-group-size="small-12"
          disabled
        >
        <input
          md-input
          type="text"
          id="disabledWithValue2"
          md-input-label="Disabled Value"
          name="disabledWithValue2"
          ng-model="$ctrl.inputsModel.disabledWithValue"
          md-input-group-size="small-12"
          disabled
        >
        <input
          md-input
          type="text"
          id="disabledro2"
          md-input-label="Disabled Read Only"
          name="disabledro2"
          ng-model="$ctrl.inputsModel.disabledro"
          md-input-group-size="small-12"
          disabled
          readonly
        >
        <input
          md-input
          type="text"
          id="placeholder2"
          name="placeholder2"
          md-input-label="Placeholder"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.placeholder"
          md-input-group-size="small-12"
        >
        <input
          md-input
          type="text"
          id="clearInput2"
          md-input-label="Clear"
          name="clearInput2"
          ng-model="$ctrl.inputsModel.clearInput"
          md-input-group-size="small-12"
          md-input-clear
        >
        <input
          md-input
          type="text"
          id="rightIcon2"
          name="rightIcon2"
          md-input-label="Right Icon"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.rightIcon"
          md-input-group-size="small-12"
          md-input-after="accessibility_16"
        >
        <input
          md-input
          type="text"
          id="leftIcon2"
          name="leftIcon2"
          md-input-label="Left Icon"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
        >
        <input
          md-input
          type="text"
          id="leftIconDisabled2"
          name="leftIconDisabled2"
          md-input-label="Left Icon Disabled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIconDisabled"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          disabled
        >
        <input
          md-input
          type="text"
          id="clearLeftIcon2"
          name="clearLeftIcon2"
          md-input-label="Clear and Left Icon"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.clearLeftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          clear
        >
        <input
          md-input
          type="text"
          id="help2"
          name="help2"
          md-input-label="Help Text"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.help"
          md-input-group-size="small-12"
          md-input-help-text="This is help text or description for the normal input"
        >
        <input
          md-input
          type="text"
          id="inputSecondaryLabel2"
          name="inputSecondaryLabel2"
          md-input-label="Secondary Label"
          ng-model="$ctrl.inputsModel.inputSecondaryLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabel2"
          name="inputSecondaryHelpLabel2"
          md-input-label="Secondary/Help Label"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabelDisabled2"
          name="inputSecondaryHelpLabelDisabled2"
          md-input-label="Disabled Secondary/Help Label"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
          disabled
        >
      <!-- Filled Inputs -->
        <input
          md-input
          type="text"
          id="inputSuccessFilled2"
          md-input-label="Success Filled"
          name="inputSuccessFilled2"
          ng-model="$ctrl.inputsModel.success"
          md-input-group-size="small-12"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputErrorFilled2"
          md-input-label="Error Filled"
          name="inputErrorFilled2"
          ng-model="$ctrl.inputsModel.error"
          md-input-group-size="small-12"
          md-input-messages="$ctrl.messages"
          ng-minlength="20"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputWarningFilled2"
          md-input-label="Warning Filled"
          name="inputWarningFilled2"
          ng-model="$ctrl.inputsModel.warning"
          md-input-group-size="small-12"
          md-input-warning-message="This is a warning message"
          md-input-warning="$ctrl.warning"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="defaultFilled2"
          md-input-label="Default Filled"
          name="defaultFilled2"
          ng-model="$ctrl.inputsModel.default"
          md-input-group-size="small-12"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="pillFilled2"
          md-input-label="Pill Filled"
          name="pillFilled2"
          ng-model="$ctrl.inputsModel.pill"
          md-input-group-size="small-12"
          md-input-shape="pill"
          md-input-filled
        >
        <textarea
          md-input
          type="textarea"
          id="multilineFilled2"
          md-input-label="Multiline Filled"
          name="multilineFilled2"
          ng-model="$ctrl.inputsModel.multiline"
          md-input-group-size="small-12"
          rows="10"
          md-input-filled
        ></textarea>
        <div class="row">
          <input
            md-input
            type="text"
            id="nestedFilled2"
            md-input-label="Nested Filled"
            name="nestedFilled2"
            ng-model="$ctrl.inputsModel.nestedFilled2"
            md-input-group-size="small-6"
            md-input-nested="Filled2"
            md-input-filled
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested2Filled2"
            md-input-label="Nested 2 Filled"
            name="nested2Filled2"
            ng-model="$ctrl.inputsModel.nested2"
            md-input-group-size="small-6"
            md-input-nested="2"
            md-input-filled
          >
        </div>
        <div class="row">
          <input
            md-input
            type="text"
            id="nested2Filled2"
            md-input-label="Nested 3 Filled"
            name="nested2Filled2"
            ng-model="$ctrl.inputsModel.nested3"
            md-input-group-size="small-6"
            md-input-nested="3"
            md-input-filled
          >
        </div>
        <input
          md-input
          type="text"
          id="readOnlyFilled2"
          md-input-label="Read Only Filled"
          name="readOnlyFilled2"
          ng-model="$ctrl.inputsModel.readOnly"
          md-input-group-size="small-12"
          readonly
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="disabledFilled2"
          name="disabledFilled2"
          md-input-label="Disabled Filled"
          placeholder="Placeholder"
          ng-model="$ctrl.inputsModel.disabled"
          md-input-group-size="small-12"
          disabled
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="disabledWithValueFilled2"
          md-input-label="Disabled Value Filled"
          name="disabledWithValueFilled2"
          ng-model="$ctrl.inputsModel.disabledWithValue"
          md-input-group-size="small-12"
          disabled
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="disabledroFilled2"
          md-input-label="Disabled Read Only Filled"
          name="disabledroFilled2"
          ng-model="$ctrl.inputsModel.disabledro"
          md-input-group-size="small-12"
          disabled
          readonly
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="placeholderFilled2"
          name="placeholderFilled2"
          md-input-label="Placeholder Filled"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.placeholder"
          md-input-group-size="small-12"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="clearInputFilled2"
          md-input-label="Clear Filled"
          name="clearInputFilled2"
          ng-model="$ctrl.inputsModel.clearInput"
          md-input-group-size="small-12"
          md-input-clear
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="rightIconFilled2"
          name="rightIconFilled2"
          md-input-label="Right Icon Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.rightIcon"
          md-input-group-size="small-12"
          md-input-after="accessibility_16"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="leftIconFilled2"
          name="leftIconFilled2"
          md-input-label="Left Icon Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="leftIconDisabledFilled2"
          name="leftIconDisabledFilled2"
          md-input-label="Left Icon Disabled Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.leftIconDisabled"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          disabled
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="clearLeftIconFilled2"
          name="clearLeftIconFilled2"
          md-input-label="Clear and Left Icon Filled"
          placeholder="Placeholder Text"
          ng-model="$ctrl.inputsModel.clearLeftIcon"
          md-input-group-size="small-12"
          md-input-before="accessibility_16"
          clear
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="helpFilled2"
          name="helpFilled2"
          md-input-label="Help Text Filled"
          placeholder="With Placeholder"
          ng-model="$ctrl.inputsModel.help"
          md-input-group-size="small-12"
          md-input-help-text="This is help text or description for the normal input"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputSecondaryLabelFilled2"
          name="inputSecondaryLabelFilled2"
          md-input-label="Secondary Label Filled"
          ng-model="$ctrl.inputsModel.inputSecondaryLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabelFilled2"
          name="inputSecondaryHelpLabelFilled2"
          md-input-label="Secondary/Help Label Filled"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
          md-input-filled
        >
        <input
          md-input
          type="text"
          id="inputSecondaryHelpLabelDisabledFilled2"
          name="inputSecondaryHelpLabelDisabledFilled2"
          md-input-label="Disabled Secondary/Help Label Filled"
          ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
          md-input-group-size="small-12"
          md-input-secondary-label="Secondary Label"
          md-input-help-text="This is help text or description for the normal input"
          disabled
          md-input-filled
        >
      </div>
      <div class="md--contrast">
        <div class="row" style="padding: 16px;">
          <input
            md-input
            type="text"
            id="inputSuccess3"
            md-input-label="Success"
            name="inputSuccess3"
            ng-model="$ctrl.inputsModel.success"
            md-input-group-size="small-12"
          >
          <input
            md-input
            type="text"
            id="inputError3"
            md-input-label="Error"
            name="inputError3"
            ng-model="$ctrl.inputsModel.error"
            md-input-group-size="small-12"
            md-input-messages="$ctrl.messages"
            ng-minlength="20"
          >
          <input
            md-input
            type="text"
            id="inputWarning3"
            md-input-label="Warning"
            name="inputWarning3"
            ng-model="$ctrl.inputsModel.warning"
            md-input-group-size="small-12"
            md-input-warning-message="This is a warning message"
            md-input-warning="$ctrl.warning"
          >
          <input
            md-input
            type="text"
            id="default3"
            md-input-label="Default"
            name="default3"
            ng-model="$ctrl.inputsModel.default"
            md-input-group-size="small-12"
          >
          <input
            md-input
            type="text"
            id="pill3"
            md-input-label="Pill"
            name="pill3"
            ng-model="$ctrl.inputsModel.pill"
            md-input-group-size="small-12"
            md-input-shape="pill"
          >
          <textarea
            md-input
            type="textarea"
            id="multiline3"
            md-input-label="Multiline"
            name="multiline3"
            ng-model="$ctrl.inputsModel.multiline"
            md-input-group-size="small-12"
            rows="10"
          ></textarea>
          <div class="row">
            <input
              md-input
              type="text"
              id="nested3"
              md-input-label="Nested"
              name="nested3"
              ng-model="$ctrl.inputsModel.nested3"
              md-input-group-size="small-6"
              md-input-nested="3"
            >
          </div>
          <div class="row">
            <input
              md-input
              type="text"
              id="nested23"
              md-input-label="Nested 2"
              name="nested23"
              ng-model="$ctrl.inputsModel.nested2"
              md-input-group-size="small-6"
              md-input-nested="2"
            >
          </div>
          <div class="row">
            <input
              md-input
              type="text"
              id="nested23"
              md-input-label="Nested 3"
              name="nested23"
              ng-model="$ctrl.inputsModel.nested3"
              md-input-group-size="small-6"
              md-input-nested="3"
            >
          </div>
          <input
            md-input
            type="text"
            id="readOnly3"
            md-input-label="Read Only"
            name="readOnly3"
            ng-model="$ctrl.inputsModel.readOnly"
            md-input-group-size="small-12"
            readonly
          >
          <input
            md-input
            type="text"
            id="disabled3"
            name="disabled3"
            md-input-label="Disabled"
            placeholder="Placeholder"
            ng-model="$ctrl.inputsModel.disabled"
            md-input-group-size="small-12"
            disabled
          >
          <input
            md-input
            type="text"
            id="disabledWithValue3"
            md-input-label="Disabled Value"
            name="disabledWithValue3"
            ng-model="$ctrl.inputsModel.disabledWithValue"
            md-input-group-size="small-12"
            disabled
          >
          <input
            md-input
            type="text"
            id="disabledro3"
            md-input-label="Disabled Read Only"
            name="disabledro3"
            ng-model="$ctrl.inputsModel.disabledro"
            md-input-group-size="small-12"
            disabled
            readonly
          >
          <input
            md-input
            type="text"
            id="placeholder3"
            name="placeholder3"
            md-input-label="Placeholder"
            placeholder="With Placeholder"
            ng-model="$ctrl.inputsModel.placeholder"
            md-input-group-size="small-12"
          >
          <input
            md-input
            type="text"
            id="clearInput3"
            md-input-label="Clear"
            name="clearInput3"
            ng-model="$ctrl.inputsModel.clearInput"
            md-input-group-size="small-12"
            md-input-clear
          >
          <input
            md-input
            type="text"
            id="rightIcon3"
            name="rightIcon3"
            md-input-label="Right Icon"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.rightIcon"
            md-input-group-size="small-12"
            md-input-after="accessibility_16"
          >
          <input
            md-input
            type="text"
            id="leftIcon3"
            name="leftIcon3"
            md-input-label="Left Icon"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.leftIcon"
            md-input-group-size="small-12"
            md-input-before="accessibility_16"
          >
          <input
            md-input
            type="text"
            id="leftIconDisabled3"
            name="leftIconDisabled3"
            md-input-label="Left Icon Disabled"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.leftIconDisabled"
            md-input-group-size="small-12"
            md-input-before="accessibility_16"
            disabled
          >
          <input
            md-input
            type="text"
            id="clearLeftIcon3"
            name="clearLeftIcon3"
            md-input-label="Clear and Left Icon"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.clearLeftIcon"
            md-input-group-size="small-12"
            md-input-before="accessibility_16"
            clear
          >
          <input
            md-input
            type="text"
            id="help3"
            name="help3"
            md-input-label="Help Text"
            placeholder="With Placeholder"
            ng-model="$ctrl.inputsModel.help"
            md-input-group-size="small-12"
            md-input-help-text="This is help text or description for the normal input"
          >
          <input
            md-input
            type="text"
            id="inputSecondaryLabel3"
            name="inputSecondaryLabel3"
            md-input-label="Secondary Label"
            ng-model="$ctrl.inputsModel.inputSecondaryLabel"
            md-input-group-size="small-12"
            md-input-secondary-label="Secondary Label"
          >
          <input
            md-input
            type="text"
            id="inputSecondaryHelpLabel3"
            name="inputSecondaryHelpLabel3"
            md-input-label="Secondary/Help Label"
            ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
            md-input-group-size="small-12"
            md-input-secondary-label="Secondary Label"
            md-input-help-text="This is help text or description for the normal input"
          >
          <input
            md-input
            type="text"
            id="inputSecondaryHelpLabelDisabled3"
            name="inputSecondaryHelpLabelDisabled3"
            md-input-label="Disabled Secondary/Help Label"
            ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
            md-input-group-size="small-12"
            md-input-secondary-label="Secondary Label"
            md-input-help-text="This is help text or description for the normal input"
            disabled
          >
      <!-- Filled Inputs -->
          <input
            md-input
            type="text"
            id="inputSuccessFilled3"
            md-input-label="Success Filled"
            name="inputSuccessFilled3"
            ng-model="$ctrl.inputsModel.success"
            md-input-group-size="small-12"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="inputErrorFilled3"
            md-input-label="Error Filled"
            name="inputErrorFilled3"
            ng-model="$ctrl.inputsModel.error"
            md-input-group-size="small-12"
            md-input-messages="$ctrl.messages"
            ng-minlength="20"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="inputWarningFilled3"
            md-input-label="Warning Filled"
            name="inputWarningFilled3"
            ng-model="$ctrl.inputsModel.warning"
            md-input-group-size="small-12"
            md-input-warning-message="This is a warning message"
            md-input-warning="$ctrl.warning"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="defaultFilled3"
            md-input-label="Default Filled"
            name="defaultFilled3"
            ng-model="$ctrl.inputsModel.default"
            md-input-group-size="small-12"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="pillFilled3"
            md-input-label="Pill Filled"
            name="pillFilled3"
            ng-model="$ctrl.inputsModel.pill"
            md-input-group-size="small-12"
            md-input-shape="pill"
            md-input-filled
          >
          <textarea
            md-input
            type="textarea"
            id="multilineFilled3"
            md-input-label="Multiline Filled"
            name="multilineFilled3"
            ng-model="$ctrl.inputsModel.multiline"
            md-input-group-size="small-12"
            rows="10"
            md-input-filled
          ></textarea>
          <div class="row">
            <input
              md-input
              type="text"
              id="nestedFilled3"
              md-input-label="Nested Filled"
              name="nestedFilled3"
              ng-model="$ctrl.inputsModel.nestedFilled3"
              md-input-group-size="small-6"
              md-input-nested="Filled3"
              md-input-filled
            >
          </div>
          <div class="row">
            <input
              md-input
              type="text"
              id="nested2Filled3"
              md-input-label="Nested 2 Filled"
              name="nested2Filled3"
              ng-model="$ctrl.inputsModel.nested2"
              md-input-group-size="small-6"
              md-input-nested="2"
              md-input-filled
            >
          </div>
          <div class="row">
            <input
              md-input
              type="text"
              id="nested2Filled3"
              md-input-label="Nested 3 Filled"
              name="nested2Filled3"
              ng-model="$ctrl.inputsModel.nested3"
              md-input-group-size="small-6"
              md-input-nested="3"
              md-input-filled
            >
          </div>
          <input
            md-input
            type="text"
            id="readOnlyFilled3"
            md-input-label="Read Only Filled"
            name="readOnlyFilled3"
            ng-model="$ctrl.inputsModel.readOnly"
            md-input-group-size="small-12"
            readonly
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="disabledFilled3"
            name="disabledFilled3"
            md-input-label="Disabled Filled"
            placeholder="Placeholder"
            ng-model="$ctrl.inputsModel.disabled"
            md-input-group-size="small-12"
            disabled
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="disabledWithValueFilled3"
            md-input-label="Disabled Value Filled"
            name="disabledWithValueFilled3"
            ng-model="$ctrl.inputsModel.disabledWithValue"
            md-input-group-size="small-12"
            disabled
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="disabledroFilled3"
            md-input-label="Disabled Read Only Filled"
            name="disabledroFilled3"
            ng-model="$ctrl.inputsModel.disabledro"
            md-input-group-size="small-12"
            disabled
            readonly
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="placeholderFilled3"
            name="placeholderFilled3"
            md-input-label="Placeholder Filled"
            placeholder="With Placeholder"
            ng-model="$ctrl.inputsModel.placeholder"
            md-input-group-size="small-12"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="clearInputFilled3"
            md-input-label="Clear Filled"
            name="clearInputFilled3"
            ng-model="$ctrl.inputsModel.clearInput"
            md-input-group-size="small-12"
            md-input-clear
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="rightIconFilled3"
            name="rightIconFilled3"
            md-input-label="Right Icon Filled"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.rightIcon"
            md-input-group-size="small-12"
            md-input-after="accessibility_16"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="leftIconFilled3"
            name="leftIconFilled3"
            md-input-label="Left Icon Filled"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.leftIcon"
            md-input-group-size="small-12"
            md-input-before="accessibility_16"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="leftIconDisabledFilled3"
            name="leftIconDisabledFilled3"
            md-input-label="Left Icon Disabled Filled"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.leftIconDisabled"
            md-input-group-size="small-12"
            md-input-before="accessibility_16"
            disabled
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="clearLeftIconFilled3"
            name="clearLeftIconFilled3"
            md-input-label="Clear and Left Icon Filled"
            placeholder="Placeholder Text"
            ng-model="$ctrl.inputsModel.clearLeftIcon"
            md-input-group-size="small-12"
            md-input-before="accessibility_16"
            clear
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="helpFilled3"
            name="helpFilled3"
            md-input-label="Help Text Filled"
            placeholder="With Placeholder"
            ng-model="$ctrl.inputsModel.help"
            md-input-group-size="small-12"
            md-input-help-text="This is help text or description for the normal input"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="inputSecondaryLabelFilled3"
            name="inputSecondaryLabelFilled3"
            md-input-label="Secondary Label Filled"
            ng-model="$ctrl.inputsModel.inputSecondaryLabel"
            md-input-group-size="small-12"
            md-input-secondary-label="Secondary Label"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="inputSecondaryHelpLabelFilled3"
            name="inputSecondaryHelpLabelFilled3"
            md-input-label="Secondary/Help Label Filled"
            ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
            md-input-group-size="small-12"
            md-input-secondary-label="Secondary Label"
            md-input-help-text="This is help text or description for the normal input"
            md-input-filled
          >
          <input
            md-input
            type="text"
            id="inputSecondaryHelpLabelDisabledFilled3"
            name="inputSecondaryHelpLabelDisabledFilled3"
            md-input-label="Disabled Secondary/Help Label Filled"
            ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
            md-input-group-size="small-12"
            md-input-secondary-label="Secondary Label"
            md-input-help-text="This is help text or description for the normal input"
            disabled
            md-input-filled
          >
        </div>
        <div class="md--dark row" style="background-color: black; padding: 16px;">
          <div class="row" style="padding: 16px;">
            <input
              md-input
              type="text"
              id="inputSuccess4"
              md-input-label="Success"
              name="inputSuccess4"
              ng-model="$ctrl.inputsModel.success"
              md-input-group-size="small-12"
            >
            <input
              md-input
              type="text"
              id="inputError4"
              md-input-label="Error"
              name="inputError4"
              ng-model="$ctrl.inputsModel.error"
              md-input-group-size="small-12"
              md-input-messages="$ctrl.messages"
              ng-minlength="20"
            >
            <input
              md-input
              type="text"
              id="inputWarning4"
              md-input-label="Warning"
              name="inputWarning4"
              ng-model="$ctrl.inputsModel.warning"
              md-input-group-size="small-12"
              md-input-warning-message="This is a warning message"
              md-input-warning="$ctrl.warning"
            >
            <input
              md-input
              type="text"
              id="default4"
              md-input-label="Default"
              name="default4"
              ng-model="$ctrl.inputsModel.default"
              md-input-group-size="small-12"
            >
            <input
              md-input
              type="text"
              id="pill4"
              md-input-label="Pill"
              name="pill4"
              ng-model="$ctrl.inputsModel.pill"
              md-input-group-size="small-12"
              md-input-shape="pill"
            >
            <textarea
              md-input
              type="textarea"
              id="multiline4"
              md-input-label="Multiline"
              name="multiline4"
              ng-model="$ctrl.inputsModel.multiline"
              md-input-group-size="small-12"
              rows="10"
            ></textarea>
            <div class="row">
              <input
                md-input
                type="text"
                id="nested4"
                md-input-label="Nested"
                name="nested4"
                ng-model="$ctrl.inputsModel.nested4"
                md-input-group-size="small-6"
                md-input-nested="4"
              >
            </div>
            <div class="row">
              <input
                md-input
                type="text"
                id="nested24"
                md-input-label="Nested 2"
                name="nested24"
                ng-model="$ctrl.inputsModel.nested2"
                md-input-group-size="small-6"
                md-input-nested="2"
              >
            </div>
            <div class="row">
              <input
                md-input
                type="text"
                id="nested24"
                md-input-label="Nested 4"
                name="nested24"
                ng-model="$ctrl.inputsModel.nested4"
                md-input-group-size="small-6"
                md-input-nested="4"
              >
            </div>
            <input
              md-input
              type="text"
              id="readOnly4"
              md-input-label="Read Only"
              name="readOnly4"
              ng-model="$ctrl.inputsModel.readOnly"
              md-input-group-size="small-12"
              readonly
            >
            <input
              md-input
              type="text"
              id="disabled4"
              name="disabled4"
              md-input-label="Disabled"
              placeholder="Placeholder"
              ng-model="$ctrl.inputsModel.disabled"
              md-input-group-size="small-12"
              disabled
            >
            <input
              md-input
              type="text"
              id="disabledWithValue4"
              md-input-label="Disabled Value"
              name="disabledWithValue4"
              ng-model="$ctrl.inputsModel.disabledWithValue"
              md-input-group-size="small-12"
              disabled
            >
            <input
              md-input
              type="text"
              id="disabledro4"
              md-input-label="Disabled Read Only"
              name="disabledro4"
              ng-model="$ctrl.inputsModel.disabledro"
              md-input-group-size="small-12"
              disabled
              readonly
            >
            <input
              md-input
              type="text"
              id="placeholder4"
              name="placeholder4"
              md-input-label="Placeholder"
              placeholder="With Placeholder"
              ng-model="$ctrl.inputsModel.placeholder"
              md-input-group-size="small-12"
            >
            <input
              md-input
              type="text"
              id="clearInput4"
              md-input-label="Clear"
              name="clearInput4"
              ng-model="$ctrl.inputsModel.clearInput"
              md-input-group-size="small-12"
              md-input-clear
            >
            <input
              md-input
              type="text"
              id="rightIcon4"
              name="rightIcon4"
              md-input-label="Right Icon"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.rightIcon"
              md-input-group-size="small-12"
              md-input-after="accessibility_16"
            >
            <input
              md-input
              type="text"
              id="leftIcon4"
              name="leftIcon4"
              md-input-label="Left Icon"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.leftIcon"
              md-input-group-size="small-12"
              md-input-before="accessibility_16"
            >
            <input
              md-input
              type="text"
              id="leftIconDisabled4"
              name="leftIconDisabled4"
              md-input-label="Left Icon Disabled"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.leftIconDisabled"
              md-input-group-size="small-12"
              md-input-before="accessibility_16"
              disabled
            >
            <input
              md-input
              type="text"
              id="clearLeftIcon4"
              name="clearLeftIcon4"
              md-input-label="Clear and Left Icon"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.clearLeftIcon"
              md-input-group-size="small-12"
              md-input-before="accessibility_16"
              clear
            >
            <input
              md-input
              type="text"
              id="help4"
              name="help4"
              md-input-label="Help Text"
              placeholder="With Placeholder"
              ng-model="$ctrl.inputsModel.help"
              md-input-group-size="small-12"
              md-input-help-text="This is help text or description for the normal input"
            >
            <input
              md-input
              type="text"
              id="inputSecondaryLabel4"
              name="inputSecondaryLabel4"
              md-input-label="Secondary Label"
              ng-model="$ctrl.inputsModel.inputSecondaryLabel"
              md-input-group-size="small-12"
              md-input-secondary-label="Secondary Label"
            >
            <input
              md-input
              type="text"
              id="inputSecondaryHelpLabel4"
              name="inputSecondaryHelpLabel4"
              md-input-label="Secondary/Help Label"
              ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
              md-input-group-size="small-12"
              md-input-secondary-label="Secondary Label"
              md-input-help-text="This is help text or description for the normal input"
            >
            <input
              md-input
              type="text"
              id="inputSecondaryHelpLabelDisabled4"
              name="inputSecondaryHelpLabelDisabled4"
              md-input-label="Disabled Secondary/Help Label"
              ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
              md-input-group-size="small-12"
              md-input-secondary-label="Secondary Label"
              md-input-help-text="This is help text or description for the normal input"
              disabled
            >
        <!-- Filled Inputs -->
            <input
              md-input
              type="text"
              id="inputSuccessFilled4"
              md-input-label="Success Filled"
              name="inputSuccessFilled4"
              ng-model="$ctrl.inputsModel.success"
              md-input-group-size="small-12"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="inputErrorFilled4"
              md-input-label="Error Filled"
              name="inputErrorFilled4"
              ng-model="$ctrl.inputsModel.error"
              md-input-group-size="small-12"
              md-input-messages="$ctrl.messages"
              ng-minlength="20"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="inputWarningFilled4"
              md-input-label="Warning Filled"
              name="inputWarningFilled4"
              ng-model="$ctrl.inputsModel.warning"
              md-input-group-size="small-12"
              md-input-warning-message="This is a warning message"
              md-input-warning="$ctrl.warning"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="defaultFilled4"
              md-input-label="Default Filled"
              name="defaultFilled4"
              ng-model="$ctrl.inputsModel.default"
              md-input-group-size="small-12"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="pillFilled4"
              md-input-label="Pill Filled"
              name="pillFilled4"
              ng-model="$ctrl.inputsModel.pill"
              md-input-group-size="small-12"
              md-input-shape="pill"
              md-input-filled
            >
            <textarea
              md-input
              type="textarea"
              id="multilineFilled4"
              md-input-label="Multiline Filled"
              name="multilineFilled4"
              ng-model="$ctrl.inputsModel.multiline"
              md-input-group-size="small-12"
              rows="10"
              md-input-filled
            ></textarea>
            <div class="row">
              <input
                md-input
                type="text"
                id="nestedFilled4"
                md-input-label="Nested Filled"
                name="nestedFilled4"
                ng-model="$ctrl.inputsModel.nestedFilled4"
                md-input-group-size="small-6"
                md-input-nested="Filled4"
                md-input-filled
              >
            </div>
            <div class="row">
              <input
                md-input
                type="text"
                id="nested2Filled4"
                md-input-label="Nested 2 Filled"
                name="nested2Filled4"
                ng-model="$ctrl.inputsModel.nested2"
                md-input-group-size="small-6"
                md-input-nested="2"
                md-input-filled
              >
            </div>
            <div class="row">
              <input
                md-input
                type="text"
                id="nested2Filled4"
                md-input-label="Nested 3 Filled"
                name="nested2Filled4"
                ng-model="$ctrl.inputsModel.nested4"
                md-input-group-size="small-6"
                md-input-nested="4"
                md-input-filled
              >
            </div>
            <input
              md-input
              type="text"
              id="readOnlyFilled4"
              md-input-label="Read Only Filled"
              name="readOnlyFilled4"
              ng-model="$ctrl.inputsModel.readOnly"
              md-input-group-size="small-12"
              readonly
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="disabledFilled4"
              name="disabledFilled4"
              md-input-label="Disabled Filled"
              placeholder="Placeholder"
              ng-model="$ctrl.inputsModel.disabled"
              md-input-group-size="small-12"
              disabled
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="disabledWithValueFilled4"
              md-input-label="Disabled Value Filled"
              name="disabledWithValueFilled4"
              ng-model="$ctrl.inputsModel.disabledWithValue"
              md-input-group-size="small-12"
              disabled
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="disabledroFilled4"
              md-input-label="Disabled Read Only Filled"
              name="disabledroFilled4"
              ng-model="$ctrl.inputsModel.disabledro"
              md-input-group-size="small-12"
              disabled
              readonly
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="placeholderFilled4"
              name="placeholderFilled4"
              md-input-label="Placeholder Filled"
              placeholder="With Placeholder"
              ng-model="$ctrl.inputsModel.placeholder"
              md-input-group-size="small-12"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="clearInputFilled4"
              md-input-label="Clear Filled"
              name="clearInputFilled4"
              ng-model="$ctrl.inputsModel.clearInput"
              md-input-group-size="small-12"
              md-input-clear
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="rightIconFilled4"
              name="rightIconFilled4"
              md-input-label="Right Icon Filled"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.rightIcon"
              md-input-group-size="small-12"
              md-input-after="accessibility_16"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="leftIconFilled4"
              name="leftIconFilled4"
              md-input-label="Left Icon Filled"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.leftIcon"
              md-input-group-size="small-12"
              md-input-before="accessibility_16"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="leftIconDisabledFilled4"
              name="leftIconDisabledFilled4"
              md-input-label="Left Icon Disabled Filled"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.leftIconDisabled"
              md-input-group-size="small-12"
              md-input-before="accessibility_16"
              disabled
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="clearLeftIconFilled4"
              name="clearLeftIconFilled4"
              md-input-label="Clear and Left Icon Filled"
              placeholder="Placeholder Text"
              ng-model="$ctrl.inputsModel.clearLeftIcon"
              md-input-group-size="small-12"
              md-input-before="accessibility_16"
              clear
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="helpFilled4"
              name="helpFilled4"
              md-input-label="Help Text Filled"
              placeholder="With Placeholder"
              ng-model="$ctrl.inputsModel.help"
              md-input-group-size="small-12"
              md-input-help-text="This is help text or description for the normal input"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="inputSecondaryLabelFilled4"
              name="inputSecondaryLabelFilled4"
              md-input-label="Secondary Label Filled"
              ng-model="$ctrl.inputsModel.inputSecondaryLabel"
              md-input-group-size="small-12"
              md-input-secondary-label="Secondary Label"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="inputSecondaryHelpLabelFilled4"
              name="inputSecondaryHelpLabelFilled4"
              md-input-label="Secondary/Help Label Filled"
              ng-model="$ctrl.inputsModel.inputSecondaryHelpLabel"
              md-input-group-size="small-12"
              md-input-secondary-label="Secondary Label"
              md-input-help-text="This is help text or description for the normal input"
              md-input-filled
            >
            <input
              md-input
              type="text"
              id="inputSecondaryHelpLabelDisabledFilled4"
              name="inputSecondaryHelpLabelDisabledFilled4"
              md-input-label="Disabled Secondary/Help Label Filled"
              ng-model="$ctrl.inputsModel.inputSecondaryHelpLabelDisabled"
              md-input-group-size="small-12"
              md-input-secondary-label="Secondary Label"
              md-input-help-text="This is help text or description for the normal input"
              disabled
              md-input-filled
            >
          </div>
        </div>
      </div>
    </form>
  </div>
  `;
}
