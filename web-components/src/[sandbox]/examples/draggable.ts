import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import "@/components/toggle-switch/ToggleSwitch";
import Sortable, { GroupOptions } from "sortablejs";
import { comboBoxOptions, draggableMock } from "@/[sandbox]/sandbox.mock";
import { css, customElement, html, internalProperty, LitElement, property, queryAll } from "lit-element";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import { DraggableItem } from "@/components/draggable/DraggableItem";

@customElement("shared-draggable-sandbox")
export class SharedDraggable extends LitElement {
  @property({ type: Boolean }) editMode = false;
  @internalProperty() selectedData: any = undefined;
  @internalProperty() selectedItem: any = undefined;

  @queryAll("#list1 md-draggable-item") dragItem!: DraggableItem.ELEMENT[];

  findSelected() {
    let result =  Array.from(draggableMock.filter(item => item.selected));
    this.selectedData = result;
  }

  handleDragMove(event: CustomEvent<{ srcEvent: Sortable.MoveEvent }>) {
    const {
      detail: {
        srcEvent: { dragged }
      }
    } = event;

    const foundIndex = draggableMock.findIndex(element => element.id === dragged.id)
    this.selectedItem = draggableMock[foundIndex];
    this.selectedItem.selected = true;
    console.log(dragged);
  }

  handleRowAdd(event: CustomEvent<{ srcEvent: Sortable.SortableEvent }>) {
    const {
      detail: {
        srcEvent: { item }
      }
    } = event;
    const dropContainer = event.detail.srcEvent.to;

    if (dropContainer.hasAttribute("sort")) {
      item.setAttribute("row", "true");
    }

    console.log(event.detail.srcEvent.to, item.id);
  }

  connectedCallback() {
    super.connectedCallback();
    this.findSelected();
  }

  handleEditMode() {
    this.editMode = !this.editMode;
    console.log(this.editMode);
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
      <br />
      <md-toggle-switch .checked=${this.editMode} @click=${this.handleEditMode}>
        Switch Edit Mode for Row
      </md-toggle-switch>
      <div class="draggable-row-wrap">
        <h3>Draggable Row</h3>
        <md-draggable
          sort
          .group=${{ name: "draggable", pull: "clone" } as GroupOptions}
          ?editable=${this.editMode}
          id="sortable"
          >
          ${this.selectedData.map((i: any) => html`
              <md-draggable-item row>
                <div class="first">${i.label}</div>
                <div slot="row" class="second">
                  <md-checkbox checked>${i.dateFormat}</md-checkbox>
                </div>
                <div slot="row" class="third">
                  <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
                </div>
                <div slot="row" class="fourth">
                  <md-icon name="plus-circle_24" size="16"></md-icon>
                </div>
              </md-draggable-item>
            `
          )}
        </md-draggable> 
      </div>
      <br />
      <h3>Draggable Item</h3>
      <div class="shared-draggable-wrapper">
        <md-draggable
          id="list1"
          .group=${{ name: "draggable", pull: "clone", put: false } as GroupOptions}
          @drag-end=${this.handleRowAdd}
          @drag-move=${this.handleDragMove}>
          ${repeat(
            draggableMock, // the array of items
            item => item.id, // the identify function
            (item, i) => html`
              ${item.selected === true
              ? html`
                <md-draggable-item id="${item.id}">
                  <md-icon name="tag_16"></md-icon>
                  <span>${item.label}</span>
                  <div slot="row" class="second">
                    <md-checkbox checked>${item.dateFormat}</md-checkbox>
                  </div>
                  <div slot="row" class="third">
                    <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
                  </div>
                  <div slot="row" class="fourth">
                    <md-icon name="plus-circle_24" size="16"></md-icon>
                  </div>
                </md-draggable-item>
                `
              : html`
                <md-draggable-item id="${item.id}">
                  <md-icon name="tag_16"></md-icon>
                  <span>${item.label}</span>
                  <div slot="row" class="second">
                    <md-checkbox checked>${item.dateFormat}</md-checkbox>
                  </div>
                  <div slot="row" class="third">
                    <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
                  </div>
                  <div slot="row" class="fourth">
                    <md-icon name="plus-circle_24" size="16"></md-icon>
                  </div>
                </md-draggable-item>
              `
              }
            ` // the template for each item
          )}
        </md-draggable>
        <md-draggable id="list2" .group=${{ name: "draggable", pull: "clone" } as GroupOptions}>
          ${this.selectedData.map((i: any) => html`
              <md-draggable-item id="${i.id}">
                <md-icon name="tag_16"></md-icon>
                <span>${i.label}</span>
                <div slot="row" class="second">
                    <md-checkbox checked>${i.dateFormat}</md-checkbox>
                  </div>
                  <div slot="row" class="third">
                    <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
                  </div>
                  <div slot="row" class="fourth">
                    <md-icon name="plus-circle_24" size="16"></md-icon>
                  </div>
              </md-draggable-item>
            `
          )}
        </md-draggable> 
      </div>
    `;
  }
}

export const draggableTemplate = html`
  <shared-draggable-sandbox></shared-draggable-sandbox>
  <br />
`;
