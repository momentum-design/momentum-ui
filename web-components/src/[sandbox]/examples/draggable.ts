import "@/components/draggable/Draggable";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/icon/Icon";
import "@/components/draggable/DraggableItem";
import { comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import reset from "@/wc_scss/reset.scss";
import { List } from "@/components/list/List";
import { ListItem } from "@/components/list/ListItem";
import { css, customElement, html, LitElement, query, queryAll } from "lit-element";
import Sortable, { GroupOptions } from "sortablejs";

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {
  @query("md-list") list!: List.ELEMENT;
  @queryAll("md-list-item") listItem!: ListItem.ELEMENT[];

  handleDragEnd(event: CustomEvent<{ srcEvent: Sortable.SortableEvent }>) {
    const {
      detail: {
        srcEvent: { newIndex, newDraggableIndex }
      }
    } = event;

    if (newIndex) {
      this.list.activated = newIndex;
      return false;
    }

    if (newDraggableIndex) {
      this.list.activated = newDraggableIndex;
      return false;
    }
  }

  handleDragMove(event: CustomEvent<{ srcEvent: Sortable.MoveEvent }>) {
    const {
      detail: {
        srcEvent: { dragged }
      }
    } = event;

    const draggedIndex = [...this.listItem].findIndex(listItem => listItem.isSameNode(dragged));

    if (draggedIndex !== -1) {
      this.list.activated = draggedIndex;
    }
  }

  static get styles() {
    return [
      reset,
      css`
      md-draggable {
        width: 100%;
      }
     
    }`
    ];
  }

  render() {
    return html`
      <md-draggable>
        <md-draggable-item row>
          <div class="first">Agent Name</div>
            <div class="second">
              <md-checkbox checked>Left Option</md-checkbox>
            </div>
            <div class="third">
              <md-combobox .options=${comboBoxOptions} placeholder="Choose options" ></md-combobox>
            </div>
            <div class="fourth">
              <md-icon name="plus-circle_24" size="16"></md-icon>
              <span>Add Field Filter</span>
            </div>
        </md-draggable-item>
        <md-draggable-item row>
          <div class="first">Average Handle Time</div>
          <div class="second">
            <md-checkbox checked>Team Option</md-checkbox>
          </div>
          <div class="third">
            <md-combobox .options=${comboBoxOptions} placeholder="New options" ></md-combobox>
          </div>
          <div class="fourth">
            <md-icon name="plus-circle_24" size="16"></md-icon>
            <span>Add Field Filter</span>
          </div>
        </md-draggable-item>
        <md-draggable-item row>
          <div class="first">Agent New Name</div>
          <div class="second">
            <md-checkbox checked>Left Option</md-checkbox>
          </div>
          <div class="third">
            <md-combobox .options=${comboBoxOptions} placeholder="Choose options" ></md-combobox>
          </div>
          <div class="fourth">
            <md-icon name="plus-circle_24" size="16"></md-icon>
            <span>Add Field Filter</span>
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
      reset,
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
        <md-draggable>
          <md-draggable-item>
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
        <md-draggable>
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
  <h3>Default</h3>
  <default-draggable-sandbox></default-draggable-sandbox>
  <h3>Shared</h3>
  <shared-draggable-sandbox></shared-draggable-sandbox>
`;
