import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import "@/components/toggle-switch/ToggleSwitch";
import { DraggableItem } from "@/components/draggable/DraggableItem";
import { css, customElement, html, internalProperty, LitElement, property, queryAll } from "lit-element";
import Sortable, { GroupOptions, SortableEvent } from "sortablejs";
import { comboBoxOptions, draggableMock } from "@/[sandbox]/sandbox.mock";
import { repeat } from "lit-html/directives/repeat";

const draggableItemStyle = css`
  md-draggable-item {
    position: relative;
    display: block;
    text-align: center;
  }

  md-draggable-item[extended] md-icon[name="tag_16"]{
    display: none;
  }

  .shared-draggable-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .custom-ghost {
    background-color: #c8ebfb;
    border: 2px dashed #ddc74e;
  }
`;

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {
  @property({ type: Boolean }) editMode = false;
  @internalProperty() selectedData: any = undefined;
  @internalProperty() selectedItem: any = undefined;

  @queryAll("#main md-draggable-item") dragItem!: DraggableItem.ELEMENT[];
  @queryAll("#list2 md-draggable-item") dropItem!: DraggableItem.ELEMENT[];

  findSelected() {
    let result =  Array.from(draggableMock.filter(item => item.selected));
    this.selectedData = result;
  }

  connectedCallback() {
    super.connectedCallback();
    this.findSelected();
  }

  handleEditMode() {
    this.editMode = !this.editMode;
  }

   handleDragMove(event: CustomEvent<{ srcEvent: Sortable.MoveEvent }>) {
    const {
      detail: {
        srcEvent: { dragged }
      }
    } = event;

    const foundIndex = draggableMock.findIndex(element => element.id === dragged.id)
    this.selectedItem = draggableMock[foundIndex];
    //this.selectedItem.selected = true;
  }

  handleRowAdd(event: CustomEvent<{ srcEvent: Sortable.SortableEvent }>) {
    const {
      detail: {
        srcEvent: { item }
      }
    } = event;
    const dropContainer = event.detail.srcEvent.to;

    if (dropContainer.hasAttribute("sort")) {
      item.setAttribute("extended", "true");
    }
    console.log(item)
  }
  
  static get styles() {
    return [
      css`
        ${draggableItemStyle}
      `
    ];
  }

  render() {
    return html`
      <h3>Draggable Row</h3>
      <md-toggle-switch .checked=${this.editMode} @click=${this.handleEditMode}>
        Switch Edit Mode for Row
      </md-toggle-switch>
      <md-draggable
        sort
       .group=${{ name: "draggable", pull: "clone" } as GroupOptions}
        handle = "md-icon[name='panel-control-dragger_16']"
        ?editable=${this.editMode}
        id="sortable"
        >
        ${this.selectedData.map((i: any) => html`
            <md-draggable-item slot="draggable-item" extended >
              <div class="first">${i.label}</div>
              <div slot="extended" class="second">
                <md-checkbox checked>${i.dateFormat}</md-checkbox>
              </div>
              <div slot="extended" class="third">
                <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
              </div>
              <div slot="extended" class="fourth">
                <md-icon name="plus-circle_24" size="16"></md-icon>
              </div>
            </md-draggable-item>
          `
        )}
      </md-draggable> 
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
                <md-draggable-item slot="draggable-item" id="${item.id}">
                  <md-icon name="tag_16"></md-icon>
                  <span>${item.label}</span>
                  <div slot="extended" class="second">
                    <md-checkbox checked>${item.dateFormat}</md-checkbox>
                  </div>
                  <div slot="extended" class="third">
                    <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
                  </div>
                  <div slot="extended" class="fourth">
                    <md-icon name="plus-circle_24" size="16"></md-icon>
                  </div>
                </md-draggable-item>
                `
          : html`
                <md-draggable-item slot="draggable-item" id="${item.id}">
                  <md-icon name="tag_16"></md-icon>
                  <span>${item.label}</span>
                  <div slot="extended" class="second">
                    <md-checkbox checked>${item.dateFormat}</md-checkbox>
                  </div>
                  <div slot="extended" class="third">
                    <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
                  </div>
                  <div slot="extended" class="fourth">
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
                <div slot="extended" class="second">
                    <md-checkbox checked>${i.dateFormat}</md-checkbox>
                  </div>
                  <div slot="extended" class="third">
                    <md-combobox .options=${comboBoxOptions} placeholder="Choose Country"></md-combobox>
                  </div>
                  <div slot="extended" class="fourth">
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

@customElement("not-sortable-draggable-sandbox")
export class NotSortableDraggable extends LitElement {
  static get styles() {
    return [
      css`
        ${draggableItemStyle}
      `
    ];
  }

  render() {
    return html`
      <md-draggable>
        <md-draggable-item slot="draggable-item">Not Sortable Item1</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item2</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item3</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item4</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item5</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item6</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item7</md-draggable-item>
      </md-draggable>
    `;
  }
}

export const draggableTemplate = html`
  <default-draggable-sandbox></default-draggable-sandbox>
`;
