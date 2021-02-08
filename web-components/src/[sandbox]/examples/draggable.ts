import "@/components/draggable/Draggable";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/icon/Icon";
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
      .sorting {
        opacity: 0.4;
        border-style: dashed;
        border-color: #333;
      }
      .md-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        border: 1px solid #DEDEDE;
        background-color: #fff;
        width: 100%;
        padding: 5px 10px;
      }
      .fourth {
        display: inline-flex;
        align-items: center;
      }
      md-list-item::part(list-item) {
        padding: 0;
        margin: 1px;
        background: #fff;
      }
    }`
    ];
  }

  render() {
    return html`
      <md-draggable
        draggable-items="md-list-item"
        @drag-end=${this.handleDragEnd}
        @drag-move=${this.handleDragMove}
        handle=".handle"
      >
        <md-list label="Transuranium elements">
          <md-list-item slot="list-item">
            <div class="md-row">
              <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
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
            </div>
          </md-list-item>
          <md-list-item slot="list-item">
            <div class="md-row">
              <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
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
            </div>
          </md-list-item>
          <md-list-item slot="list-item">
            <div class="md-row">
              <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
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
            </div>
          </md-list-item>
          <md-list-item slot="list-item">
            <div class="md-row">
              <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
              <div class="first">Agent Name 22</div>
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
            </div>
          </md-list-item>
          <md-list-item slot="list-item">
            <div class="md-row">
              <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
              <div class="first">Agent Name 333</div>
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
            </div>
          </md-list-item>
          <md-list-item slot="list-item">
            <div class="md-row">
              <md-icon class="handle" name="panel-control-dragger_16"></md-icon>
              <div class="first">Agent Name 5555</div>
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
            </div>
          </md-list-item>
        </md-list>
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
      .sorting {
        opacity: 0.4;
        border-style: dashed;
        border-color: #333;
        background-color: #fff;
      }
      md-list-item[selected]::part(list-item),
      md-list-item[draggable="true"]::part(list-item) {
        background: #fff !important;
      }
    }`
    ];
  }

  render() {
    return html`
      <div class="shared-draggable-wrapper">
        <md-draggable
          draggable-items="md-list-item"
          .group=${{ name: "md-list", pull: "clone" } as GroupOptions}
          filter="md-list-item[disabled]"
        >
          <md-list label="Transuranium elements">
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Average CSAT Scores
            </md-list-item>
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Average Handle Time
            </md-list-item>
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Total Contacts Handled
            </md-list-item>
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Internal Filter
            </md-list-item>
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Custom Filter
            </md-list-item>
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Test Filter
            </md-list-item>
          </md-list>
        </md-draggable>
        <md-draggable
          draggable-items="md-list-item"
          .group=${{ name: "md-list", pull: "clone" } as GroupOptions}
          filter="md-list-item[disabled]"
        >
          <md-list label="Transuranium elements">
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Internal Filter 1
            </md-list-item>
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Custom Filter 2
            </md-list-item>
            <md-list-item slot="list-item">
              <md-icon name="tag_16"></md-icon>
              Test Filter 1
            </md-list-item>
          </md-list>
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
