class ToggleSwitchKitchenSinkController {
  public model = {
    toggleChecked1: true,
    toggleDisabledChecked1: true,
    toggleReadonlyChecked1: true,
  };
}

export class ToggleSwitchKitchenSink implements angular.IComponentOptions {
  public static selector = 'exampleToggleSwitchKitchenSink';
  public static bindings = {};
  public static controller = ToggleSwitchKitchenSinkController;
  public static template = `
    <form name="myInputsForm" novalidate>
      <div class="row" style="padding: 16px;">
        <md-toggle-switch
          ng-model="$ctrl.model.toggle1"
          toggle-id="toggle1"
          name="toggle1"
          md-label="md-toggle-switch"
        ></md-toggle-switch>
        <md-toggle-switch
          ng-model="$ctrl.model.toggleChecked1"
          toggle-id="toggleChecked1"
          name="toggleChecked1"
          md-label="Checked md-toggle-switch"
        ></md-toggle-switch>
        <md-toggle-switch
          ng-model="$ctrl.model.toggleDisabled1"
          toggle-id="toggleDisabled1"
          name="toggleDisabled1"
          md-label="Disabled md-toggle-switch"
          is-disabled="true"
        ></md-toggle-switch>
        <md-toggle-switch
          ng-model="$ctrl.model.toggleDisabledChecked1"
          toggle-id="toggleDisabledChecked1"
          name="toggleDisabledChecked1"
          md-label="Disabled Checked md-toggle-switch"
          is-disabled="true"
        ></md-toggle-switch>
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggle1"
          id="toggle1"
          name="toggle1"
          md-input-label="md-input"
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleChecked1"
          id="toggleChecked1"
          name="toggleChecked1"
          md-input-label="Checked md-input"
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleDisabled1"
          id="toggleDisabled1"
          name="toggleDisabled1"
          md-input-label="Disabled md-input"
          disabled
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleDisabledChecked1"
          id="toggleDisabledChecked1"
          name="toggleDisabledChecked1"
          md-input-label="Disabled Checked md-input"
          disabled
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleReadonly1"
          id="toggleReadonly1"
          name="toggleReadonly1"
          md-input-label="Readonly md-input"
          readonly
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleReadonlyChecked1"
          id="toggleReadonlyChecked1"
          name="toggleReadonlyChecked1"
          md-input-label="Readonly Checked md-input"
          readonly
        />
      </div>

      <div class=" md--dark row" style="background-color: black; padding: 16px;">
        <md-toggle-switch
          ng-model="$ctrl.model.toggle1"
          toggle-id="toggle1"
          name="toggle1"
          md-label="md-toggle-switch"
        ></md-toggle-switch>
        <md-toggle-switch
          ng-model="$ctrl.model.toggleChecked1"
          toggle-id="toggleChecked1"
          name="toggleChecked1"
          md-label="Checked md-toggle-switch"
        ></md-toggle-switch>
        <md-toggle-switch
          ng-model="$ctrl.model.toggleDisabled1"
          toggle-id="toggleDisabled1"
          name="toggleDisabled1"
          md-label="Disabled md-toggle-switch"
          is-disabled="true"
        ></md-toggle-switch>
        <md-toggle-switch
          ng-model="$ctrl.model.toggleDisabledChecked1"
          toggle-id="toggleDisabledChecked1"
          name="toggleDisabledChecked1"
          md-label="Disabled Checked md-toggle-switch"
          is-disabled="true"
        ></md-toggle-switch>
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggle1"
          id="toggle1"
          name="toggle1"
          md-input-label="md-input"
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleChecked1"
          id="toggleChecked1"
          name="toggleChecked1"
          md-input-label="Checked md-input"
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleDisabled1"
          id="toggleDisabled1"
          name="toggleDisabled1"
          md-input-label="Disabled md-input"
          disabled
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleDisabledChecked1"
          id="toggleDisabledChecked1"
          name="toggleDisabledChecked1"
          md-input-label="Disabled Checked md-input"
          disabled
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleReadonly1"
          id="toggleReadonly1"
          name="toggleReadonly1"
          md-input-label="Readonly md-input"
          readonly
        />
        <input
          md-input
          type="checkbox"
          md-toggle="true"
          ng-model="$ctrl.model.toggleReadonlyChecked1"
          id="toggleReadonlyChecked1"
          name="toggleReadonlyChecked1"
          md-input-label="Readonly Checked md-input"
          readonly
        />
      </div>
      <div class="md--contrast">
        <div class="row" style="padding: 16px;">
          <md-toggle-switch
            ng-model="$ctrl.model.toggle1"
            toggle-id="toggle1"
            name="toggle1"
            md-label="md-toggle-switch"
          ></md-toggle-switch>
          <md-toggle-switch
            ng-model="$ctrl.model.toggleChecked1"
            toggle-id="toggleChecked1"
            name="toggleChecked1"
            md-label="Checked md-toggle-switch"
          ></md-toggle-switch>
          <md-toggle-switch
            ng-model="$ctrl.model.toggleDisabled1"
            toggle-id="toggleDisabled1"
            name="toggleDisabled1"
            md-label="Disabled md-toggle-switch"
            is-disabled="true"
          ></md-toggle-switch>
          <md-toggle-switch
            ng-model="$ctrl.model.toggleDisabledChecked1"
            toggle-id="toggleDisabledChecked1"
            name="toggleDisabledChecked1"
            md-label="Disabled Checked md-toggle-switch"
            is-disabled="true"
          ></md-toggle-switch>
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggle1"
            id="toggle1"
            name="toggle1"
            md-input-label="md-input"
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleChecked1"
            id="toggleChecked1"
            name="toggleChecked1"
            md-input-label="Checked md-input"
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleDisabled1"
            id="toggleDisabled1"
            name="toggleDisabled1"
            md-input-label="Disabled md-input"
            disabled
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleDisabledChecked1"
            id="toggleDisabledChecked1"
            name="toggleDisabledChecked1"
            md-input-label="Disabled Checked md-input"
            disabled
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleReadonly1"
            id="toggleReadonly1"
            name="toggleReadonly1"
            md-input-label="Readonly md-input"
            readonly
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleReadonlyChecked1"
            id="toggleReadonlyChecked1"
            name="toggleReadonlyChecked1"
            md-input-label="Readonly Checked md-input"
            readonly
          />
        </div>

        <div
          class="md-radio-group md--dark row"
          style="background-color: black; padding: 16px;"
        >
          <md-toggle-switch
            ng-model="$ctrl.model.toggle1"
            toggle-id="toggle1"
            name="toggle1"
            md-label="md-toggle-switch"
          ></md-toggle-switch>
          <md-toggle-switch
            ng-model="$ctrl.model.toggleChecked1"
            toggle-id="toggleChecked1"
            name="toggleChecked1"
            md-label="Checked md-toggle-switch"
          ></md-toggle-switch>
          <md-toggle-switch
            ng-model="$ctrl.model.toggleDisabled1"
            toggle-id="toggleDisabled1"
            name="toggleDisabled1"
            md-label="Disabled md-toggle-switch"
            is-disabled="true"
          ></md-toggle-switch>
          <md-toggle-switch
            ng-model="$ctrl.model.toggleDisabledChecked1"
            toggle-id="toggleDisabledChecked1"
            name="toggleDisabledChecked1"
            md-label="Disabled Checked md-toggle-switch"
            is-disabled="true"
          ></md-toggle-switch>
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggle1"
            id="toggle1"
            name="toggle1"
            md-input-label="md-input"
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleChecked1"
            id="toggleChecked1"
            name="toggleChecked1"
            md-input-label="Checked md-input"
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleDisabled1"
            id="toggleDisabled1"
            name="toggleDisabled1"
            md-input-label="Disabled md-input"
            disabled
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleDisabledChecked1"
            id="toggleDisabledChecked1"
            name="toggleDisabledChecked1"
            md-input-label="Disabled Checked md-input"
            disabled
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleReadonly1"
            id="toggleReadonly1"
            name="toggleReadonly1"
            md-input-label="Readonly md-input"
            readonly
          />
          <input
            md-input
            type="checkbox"
            md-toggle="true"
            ng-model="$ctrl.model.toggleReadonlyChecked1"
            id="toggleReadonlyChecked1"
            name="toggleReadonlyChecked1"
            md-input-label="Readonly Checked md-input"
            readonly
          />
        </div>
      </div>
    </form>
  `;
}
