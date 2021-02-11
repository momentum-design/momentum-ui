import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import { GroupOptions } from "sortablejs";
import { comboBoxOptions, draggableMock } from "@/[sandbox]/sandbox.mock";
import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";

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

@customElement("shared-draggable-sandbox")
export class SharedDraggable extends LitElement {
  @internalProperty() selectedData: any = undefined;

  findSelected() {
    let result =  Array.from(draggableMock.filter(item => item.selected));
    this.selectedData = result;
    console.log(this.selectedData);
  }

  connectedCallback() {
    super.connectedCallback();
    this.findSelected();
  }

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
        <md-draggable
          .group=${{ name: "draggable", pull: "clone", put: false } as GroupOptions}>
          ${repeat(
            draggableMock, // the array of items
            item => item.id, // the identify function
              (item, i) => html`
                <md-draggable-item>
                  <md-icon name="tag_16"></md-icon>
                  <span>${item.label}</span>
                </md-draggable-item>
              ` // the template for each item
          )}
        </md-draggable>
        <md-draggable .group=${{ name: "draggable", pull: "clone" } as GroupOptions}>
          ${this.selectedData.map((i: any) => html`
              <md-draggable-item>
                <md-icon name="tag_16"></md-icon>
                <span>${i.label}</span>
              </md-draggable-item>
            `
          )}
        </md-draggable> 
      </div>
    `;
  }
}

export const draggableTemplate = html`
  <h3>Default Row</h3>
  <default-draggable-sandbox></default-draggable-sandbox>
  <br />
  <h3>Default Item</h3>
  <shared-draggable-sandbox></shared-draggable-sandbox>
  <br />
`;
