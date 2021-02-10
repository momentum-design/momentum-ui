import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableRow";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import "@/components/draggable/DraggableItem";
import { comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import { css, customElement, html, LitElement } from "lit-element";

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {
  static get styles() {
    return [
      css`
      .md-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        border: 1px solid #DEDEDE;
        background-color: #fff;
        max-width: 1000px;
        padding: 5px 10px;
      }
      .fourth {
        display: inline-flex;
        align-items: center;
      }
      md-draggable-row {
        display: flex;
        flex-direction: column;
      }

      md-icon.handle {
        cursor: grab;
      }

      .sandbox-sortable-drag {
        cursor: grabbing;
      }
    }`
    ];
  }

  render() {
    return html`
      <md-draggable handle=".handle" drag-class="sandbox-sortable-drag">
        <md-draggable-row slot="draggable-row">
          <div class="md-row">
            <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
            <div class="first">Europe Countries</div>
            <div class="second">
              <md-checkbox checked>Is country available from list ?</md-checkbox>
            </div>
            <div class="third">
              <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
            </div>
            <div class="fourth">
              <md-icon name="plus-circle_24" size="16"></md-icon>
            </div>
          </div>
        </md-draggable-row>
        <md-draggable-row slot="draggable-row">
          <div class="md-row">
            <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
            <div class="first">Asian Countries</div>
            <div class="second">
              <md-checkbox checked>Is country available from list ?</md-checkbox>
            </div>
            <div class="third">
              <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
            </div>
            <div class="fourth">
              <md-icon name="plus-circle_24" size="16"></md-icon>
            </div>
          </div>
        </md-draggable-row>
        <md-draggable-row slot="draggable-row">
          <div class="md-row">
            <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
            <div class="first">American Countries</div>
            <div class="second">
              <md-checkbox checked>Is country available from list ?</md-checkbox>
            </div>
            <div class="third">
              <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
            </div>
            <div class="fourth">
              <md-icon name="plus-circle_24" size="16"></md-icon>
            </div>
          </div>
        </md-draggable-row>
      </md-draggable>
    `;
  }
}

@customElement("shared-draggable-sandbox")
export class SharedDraggable extends LitElement {
  render() {
    return html``;
  }
}

export const draggableTemplate = html`
  <h3>Default</h3>
  <default-draggable-sandbox></default-draggable-sandbox>
  <h3>Shared</h3>
  <shared-draggable-sandbox></shared-draggable-sandbox>
`;
