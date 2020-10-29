/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import dompurify from "dompurify";
import { CSSResultArray, customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import "../input/Input";
import { Input, Message } from "../input/Input";
import styles from "./scss/module.scss";

export const alignment = ["left", "right", "center"] as const;
export namespace EditableTextfield {
  export type Alignment = typeof alignment[number];
}
@customElement("md-editable-field")
export class EditableTextfield extends LitElement {
  @property({ type: String }) alignment: EditableTextfield.Alignment = "left";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) isEditing = false;
  @property({ type: String, attribute: "max-lines", reflect: true }) maxLines = "";
  @property({ type: String, reflect: true }) content = "Click to edit text";
  @property({ type: Object }) message: Input.Message | undefined = undefined;
  @property({ type: Boolean }) hideMessage = false;

  private readonly messageController: Message = new Message();

  @query(".md-editable-textfield") editableField: HTMLElement | undefined;

  connectedCallback() {
    super.connectedCallback();
    if (this.innerText) {
      this.content = this.innerText.trim();
    }
    this.addEventListener("focus", this.handleFocus);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("focus", this.handleFocus);
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    if (this.editableField) {
      this.editableField.innerText = dompurify.sanitize(this.content);
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("content")) {
      if (this.editableField) {
        this.editableField.innerText = dompurify.sanitize(this.content);
      }
    }
  }

  handleFocus = () => {
    if (this.disabled) {
      return;
    } else {
      this.isEditing = true;
      this.setRange();
    }
  };

  setRange() {
    if (this.editableField) {
      const range = document.createRange();
      const sel = window.getSelection();
      const position = this.editableField.childNodes[0].nodeValue?.length;
      range.setStart(this.editableField.childNodes[0], position ? position : 0);
      range.collapse(true);

      if (sel && sel.toString().length === 0) {
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        return;
      }

      if (this.maxLines.length > 0) {
        this.editableField.scrollTop = this.editableField.scrollHeight;
      }
    }
  }

  handleBlur = () => {
    if (this.editableField) {
      this.editableField.innerText = dompurify.sanitize(this.content);
    }
    this.isEditing = false;
    if (this.maxLines.length > 0) {
      this.editableField && this.editableField.scrollTo(0, 0);
    }
  };

  static get styles(): CSSResultArray {
    return [reset, styles];
  }

  get overflowStyles() {
    return (
      this.maxLines.length &&
      this.maxLines.length > 0 &&
      `max-height: ${2 * parseInt(this.maxLines)}rem; -webkit-line-clamp: ${this.maxLines}; word-break: break-all;`
    );
  }

  messagesTemplate() {
    return html`
      <div class="md-editable-textfield__messages" style="display: ${this.hideMessage ? "none" : "block"}">
        <md-help-text id="alert-message" role="alert" aria-live="assertive" .messageType=${this.message?.type}>
          ${this.message?.message}
        </md-help-text>
      </div>
    `;
  }

  render() {
    const classes = {
      [`md-editable-textfield--${this.alignment}`]: this.alignment,
      "md-editable-textfield--disabled": this.disabled,
      [`md-editable-textfield--${this.message?.type}`]: !!this.message?.type,
      "md-editable-textfield--textoverflow": this.maxLines.length > 0 && !this.isEditing
    };

    return html`
      <div
        class="md-editable-textfield ${classMap(classes)}"
        tabindex="0"
        ?contenteditable=${this.isEditing}
        @click=${this.handleFocus}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        aria-invalid=${this.message ? "true" : "false"}
        aria-errormessage="alert-message"
      >
        ${dompurify.sanitize(this.content)}
      </div>
      ${this.messagesTemplate()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-editable-field": EditableTextfield;
  }
}
