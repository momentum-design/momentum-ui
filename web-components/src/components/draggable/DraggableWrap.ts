import { CSSResultArray, customElement, html, internalProperty, LitElement, property, query } from "lit-element";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { DropEvent } from "@interactjs/actions/drop/DropEvent";

@customElement("md-draggable-wrap")
export class DraggableWrap extends LitElement { 

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("dropzone", "move");
  }

  handleDropHandler(event: DropEvent) {
    event.preventDefault();
    //this.appendChild(this.__draggingElement);
    this.removeAttribute("active");
    //this.__draggingElement = null;
    console.log(event);
  }

  handleDragLeave() {
    this.removeAttribute("active");
  }

  handleDragover(event: DragEvent) {
    event.preventDefault();
    this.setAttribute("active", "");
    let found;

    // if (!this.__draggingElement) {
    //   // find what we're looking for in the composed path that isn't a slot
    //   found = event.composedPath().find((i) => {
    //     if (i.nodeType === 1 && i.nodeName !== "SLOT") {
    //       return i;
    //     }
    //   });

    //   if (found) {
    //     // find where we are deep in the change
    //     const theLowestShadowRoot = found.getRootNode();
    //     this.__draggingElement = theLowestShadowRoot.querySelector(
    //       "[dragging]"
    //     );
    //   } else {
    //     this.__draggingElement = document.querySelector("[dragging]");
    //   }
    // }
  }

  static get styles(): CSSResultArray {
    return [reset, styles];
  }

  render() {

    return html`
      <div 
        class="md-draggable-wrap"
        @dragleave=${() => this.handleDragLeave()}
        @dragover=${(ev: DragEvent) => this.handleDragover(ev)}
        @drop=${(ev: DropEvent) => this.handleDropHandler(ev)}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-wrap": DraggableWrap;
  }
}