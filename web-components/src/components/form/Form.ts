/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { customElementWithCheck, SlottedMixin } from "@/mixins";
import { html, LitElement, property, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";

export namespace Form {
  export type Method = "GET" | "get" | "POST" | "post" | "dialog";
  export type Enctype = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
  export type Target = "_self" | "_blank" | "_parent" | "_top";
  export type SubmittableElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  @customElementWithCheck("md-form")
  export class ELEMENT extends SlottedMixin(LitElement) {
    @property({ type: String }) rel = "";
    @property({ type: String }) name = "";
    @property({ type: String }) action = "";
    @property({ type: String }) label = "";
    @property({ type: String }) method: Method = "get";
    @property({ type: String }) target: Target = "_self";
    @property({ type: String }) enctype: Enctype = "application/x-www-form-urlencoded";
    @property({ type: Boolean, reflect: true, attribute: "no-validate" }) novalidate = false;
    @property({ type: String, reflect: true, attribute: "accept-charset" }) charset = "UTF-8";
    @property({ type: Boolean, reflect: true, attribute: "is-valid" }) isvalid = false;
    @property({ type: String, attribute: "autofill-token" }) token: AutoFill = "on";
    @property({ type: Boolean, attribute: "allow-redirect" }) allowRedirect = false;
    @property({ type: String, attribute: "autofill-name" }) autofillname = "input-name";

    @query(".md-form") protected form!: HTMLFormElement;

    private formElement: HTMLFormElement[] = [];

    private get formMethod() {
      if (this.method === "GET") {
        return "get";
      }
      if (this.method === "POST") {
        return "post";
      }
      return this.method;
    }

    private isSubmittable(element: HTMLElement) {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      ) {
        return true;
      }
      return false;
    }

    private isDisabled(element: HTMLElement) {
      return element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
    }

    private findSubmittable(
      parent: HTMLElement | ShadowRoot,
      submittable: Set<SubmittableElement>
    ): SubmittableElement[] {
      const children = Array.from(parent.children) as HTMLElement[];

      for (const child of children) {
        if (this.isDisabled(child)) {
          continue;
        }

        if (this.isSubmittable(child)) {
          submittable.add(child as SubmittableElement);
        }

        if (child.shadowRoot) {
          this.findSubmittable(child.shadowRoot, submittable);
        } else if (child.tagName === "SLOT") {
          const childElements = (child as HTMLSlotElement).assignedElements();
          if (childElements.length) {
            const { parentElement } = childElements[0];
            if (parentElement) {
              this.findSubmittable(parentElement, submittable);
            }
          }
        } else {
          this.findSubmittable(child, submittable);
        }
      }
      return [...submittable];
    }

    private validated() {
      if (this.novalidate) {
        return true;
      }
      return this.isvalid;
    }

    handleSubmit = (event: Event) => {
      event.preventDefault();

      if (this.validated()) {
        this.submitForm();
      }
    };

    handleFormSubmit = (event: Event) => {
      if (!this.allowRedirect) {
        event.preventDefault();
      }

      this.dispatchEvent(
        new CustomEvent("form-submitted", {
          composed: true,
          bubbles: true
        })
      );
    };

    private submitForm() {
      const { form } = this;

      if (form.requestSubmit) {
        form.requestSubmit();
      } else {
        form.submit();
      }
    }

    private get submitButton() {
      return (
        this.querySelector("button[type='submit']") ||
        this.querySelector("input[type='submit']") ||
        this.querySelector("md-button[type='submit']")
      );
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.cleanupWrappedForms();
      this.teardownEvents();
    }

    private deleteWrappedForm(element: HTMLFormElement) {
      element.removeEventListener("submit", this.handleFormSubmit);
    }

    private cleanupWrappedForms() {
      const { formElement } = this;
      if (formElement.length) {
        for (const element of formElement) {
          this.deleteWrappedForm(element);
        }
      }
      this.formElement = [];
    }

    private createWrappedForm(element: SubmittableElement) {
      const form = document.createElement("form");

      form.addEventListener("submit", this.handleFormSubmit);

      const { parentNode: parent } = element;

      element.autocomplete = this.token;

      if (!element.id) {
        element.id = this.autofillname;
      }
      if (!element.name) {
        element.name = this.autofillname;
      }
      if (parent) {
        this.formElement.push(form);

        parent.insertBefore(form, element);
        form.append(element);
      }
    }

    private teardownEvents() {
      if (this.submitButton) {
        this.submitButton.removeEventListener("click", this.handleSubmit);
      }
    }

    private setupEvents() {
      if (this.submitButton) {
        this.submitButton.addEventListener("click", this.handleSubmit);
      }
    }

    private setupSubmittable() {
      const elements = this.findSubmittable(this.form, new Set());

      if (elements.length) {
        for (const element of elements) {
          this.createWrappedForm(element);
        }
      }
    }

    protected slottedChanged() {
      this.setupSubmittable();
      this.setupEvents();
    }

    render() {
      return html`
        <form
          class="md-form"
          role="form"
          name=${ifDefined(this.name || undefined)}
          rel=${ifDefined(this.rel || undefined)}
          action=${ifDefined(this.action || undefined)}
          accept-charset=${this.charset}
          enctype=${this.enctype}
          aria-label=${ifDefined(this.label || undefined)}
          ?novalidate=${this.novalidate}
          method=${this.formMethod}
          target=${this.target}
          part="form"
          @submit=${this.handleFormSubmit}
        >
          <slot></slot>
        </form>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-form": Form.ELEMENT;
  }
}
