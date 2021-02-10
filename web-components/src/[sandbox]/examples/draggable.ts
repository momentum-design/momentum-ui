import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import { GroupOptions } from "sortablejs";
import { comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import { css, customElement, html, LitElement } from "lit-element";

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {

  render() {
    return html`
      <md-draggable
        sort
        editable
        handle = "md-icon[name='panel-control-dragger_16']"
        .group=${{ name: "draggable", pull: "clone" } as GroupOptions}>
        <md-draggable-item row>
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
        </md-draggable-item>
        <md-draggable-item row>
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
        </md-draggable-item>
        <md-draggable-item row>
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
        </md-draggable-item>
      </md-draggable>
    `;
  }
}

@customElement("custom-handle-draggable-sandbox")
export class CustomHandleDraggable extends LitElement {
  static get styles() {
    return [
      css`
      md-draggable-item::part(draggable-icon) {
        display: none;
      }
    }`
    ];
  }

  render() {
    return html`
      <md-draggable handle="md-icon[name='window-vertical-scrub_16']"> 
        <md-draggable-item row>
          <md-icon name="window-vertical-scrub_16"></md-icon>
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
        </md-draggable-item>
        <md-draggable-item row>
          <md-icon name="window-vertical-scrub_16"></md-icon>
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
        </md-draggable-item>
        <md-draggable-item row>
          <md-icon name="window-vertical-scrub_16"></md-icon>
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
        </md-draggable-item>
      </md-draggable>
    `;
  }
}

@customElement("shared-draggable-sandbox")
export class SharedDraggable extends LitElement {
  static get styles() {
    return [
      css`
      .shared-draggable-wrapper {
        display: flex;
        justify-content: space-around;
      }
    }`
    ];
  }

  render() {
    return html`
      <div class="shared-draggable-wrapper">
        <md-draggable .group=${{ name: "draggable", pull: "clone" } as GroupOptions}>
          <md-draggable-item disabled>
            <md-icon name="tag_16"></md-icon>
            <span>Average CSAT Scores</span>
          </md-draggable-item>
          <md-draggable-item>
            <md-icon name="tag_16"></md-icon>
            <span>Average Handle Time</span>
          </md-draggable-item>
          <md-draggable-item>
            <md-icon name="tag_16"></md-icon>
            <span>Total Contacts Handled</span>
          </md-draggable-item>
          <md-draggable-item>
            <md-icon name="tag_16"></md-icon>
            <span>Internal Filter</span>
          </md-draggable-item>
        </md-draggable>
        <md-draggable .group=${{ name: "draggable", pull: "clone" } as GroupOptions}>
          <md-draggable-item>
            <md-icon name="tag_16"></md-icon>
            <span>Internal Filter 1</span>
          </md-draggable-item>
          <md-draggable-item>
            <md-icon name="tag_16"></md-icon>
            <span>Test Filter 1</span>
          </md-draggable-item>
        </md-draggable>
      </div>
    `;
  }
}

export const draggableTemplate = html`
  <h3>Default Row</h3>
  <default-draggable-sandbox></default-draggable-sandbox>
  <br />
  <h3>Custom Handle for Drag</h3>
  <custom-handle-draggable-sandbox></custom-handle-draggable-sandbox>
  <br />
  <h3>Default Item</h3>
  <shared-draggable-sandbox></shared-draggable-sandbox>
  <br />
`;
