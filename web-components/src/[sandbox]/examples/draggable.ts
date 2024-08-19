import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/checkbox/Checkbox";
import "@/components/icon/Icon";
import "@/components/toggle-switch/ToggleSwitch";
import { css, customElement, html, internalProperty, LitElement } from "lit-element";
import { DraggableOptions } from "@/[sandbox]/sandbox.mock";
import { repeat } from "lit-html/directives/repeat";

const draggableItemStyle = css`
  md-draggable-item {
    position: relative;
    display: block;
    text-align: center;
  }

  .custom-ghost {
    background-color: #c8ebfb;
  }

  .custom-drag {
    border: 5px dashed #ddc74e;
    cursor: grabbing;
  }
`;

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {
  @internalProperty() private extended = false;

  static get styles() {
    return [
      css`
        ${draggableItemStyle}
      `
    ];
  }

  handleToggleClick(event: MouseEvent) {
    event.stopPropagation();
    this.extended = !this.extended;
  }

  render() {
    return html`
      <md-toggle-switch @click=${this.handleToggleClick}>Extend Draggable</md-toggle-switch>
      <md-draggable sort drag-class="custom-drag" ghost-class="custom-ghost">
        ${repeat(
          DraggableOptions,
          (option) => option.id,
          (option) => html`
            <md-draggable-item slot="draggable-item" ?extended=${this.extended}>
              <div>${option.name.first} ${option.name.last}</div>
              <div slot="extended">
                <md-checkbox ?checked=${option.isActive}>Active Status</md-checkbox>
              </div>
              <div slot="extended">${option.company}</div>
              <div slot="extended">
                <md-icon name="plus-circle_24" size="16"></md-icon>
                ${option.email}
              </div>
            </md-draggable-item>
          `
        )}
      </md-draggable>
    `;
  }
}

export const draggableTemplate = html` <default-draggable-sandbox></default-draggable-sandbox> `;
