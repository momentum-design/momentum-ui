import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElement, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { repeat } from "lit-html/directives/repeat.js";
import styles from "./scss/module.scss";

type OptionMember = { [key: string]: string };
type RenderOptionMember = { key: string; value: string };

@customElement("md-dropdown")
export class Dropdown extends FocusMixin(LitElement) {
  @property({ type: String }) title = "Select...";
  @property({ type: Array }) options: (string | OptionMember)[] = [];
  @property({ type: String }) optionId = "";
  @property({ type: String }) optionValue = "";
  @property({ type: Object }) defaultOption: string | OptionMember = "";

  @property({ type: Boolean, reflect: true }) disabled = false;

  @internalProperty() private renderOptions: RenderOptionMember[] = [];
  @internalProperty() private selectedKey?: string;

  @internalProperty() private expanded = false;
  @internalProperty() private focusedIndex = -1;

  @query("label") label!: HTMLLabelElement;

  connectedCallback() {
    super.connectedCallback();

    this.setupEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.teardownEvents();
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    this.setAttribute("tabindex", "0");

    changedProperties.forEach((oldValue, name) => {
      if (name === "defaultOption") {
        if (this.defaultOption) {
          const { key, value } = this.getOptionKeyValuePair(this.defaultOption);
          this.selectedKey = key;
        }
      }
    });
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    changedProperties.forEach((oldValue, name) => {
      if (name === "options") {
        this.updateRenderOptions();
      }
      if (name === "selectedKey") {
        const idx = this.renderOptions.findIndex(o => o.key === this.selectedKey);
        if (idx !== -1) {
          this.focusTo(idx);
        }
      }
    });
  }

  updateRenderOptions() {
    const existingKeys: string[] = [];

    this.focusReset();

    this.renderOptions = this.options.reduce((acc, option) => {
      const { key, value } = this.getOptionKeyValuePair(option);

      if (existingKeys.indexOf(key) !== -1) {
        console.error(`Dropdown already have option key: "${key}". Ignoring `);
      } else {
        existingKeys.push(key);
        acc.push({ key, value });
      }
      return acc;
    }, [] as RenderOptionMember[]);
  }

  protected handleFocusIn(event: Event) {
    if (!this.disabled) {
      requestAnimationFrame(() => {
        this.label.focus();
        console.log("this.label.focus()");
      });

      super.handleFocusIn && super.handleFocusIn(event);
    }
    this.dispatchEvent(
      new CustomEvent("dropdown-focus-in", {
        composed: true,
        bubbles: true
      })
    );
  }

  protected handleFocusOut(event: Event) {
    super.handleFocusOut && super.handleFocusOut(event);
    this.dispatchEvent(
      new CustomEvent("dropdown-focus-out", {
        composed: true,
        bubbles: true
      })
    );
  }

  static get styles() {
    return [reset, styles];
  }

  setupEvents() {
    document.addEventListener("click", this.onOutsideClick);

    this.addEventListener("keydown", this.onKeyDown);
  }

  teardownEvents() {
    document.removeEventListener("click", this.onOutsideClick);

    this.removeEventListener("keydown", this.onKeyDown);
  }

  expand() {
    this.expanded = true;

    if (this.focusedIndex === -1) {
      this.focusNext();
    }
  }

  collapse() {
    this.expanded = false;
  }

  toggle() {
    !this.expanded ? this.expand() : this.collapse();
  }

  select() {
    if (this.focusedIndex !== -1) {
      this.selectedKey = this.renderOptions[this.focusedIndex].key;
    }
  }

  onOutsideClick = (e: MouseEvent) => {
    let insideSelfClick = false;
    const path = e.composedPath();
    if (path.length) {
      insideSelfClick = !!path.find(element => element === this);
      if (!insideSelfClick) {
        this.collapse();
      }
    }
  };

  onLabelClick() {
    this.toggle();
  }

  onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case Key.Enter: {
        if (!this.expanded) {
          this.expand();
        } else {
          this.select();

          this.collapse();
        }
        break;
      }
      case Key.ArrowDown: {
        this.focusNext();
        break;
      }
      case Key.ArrowUp: {
        this.focusPrev();
        break;
      }
      default: {
      }
    }
  };

  focusFirst() {
    if (this.renderOptions.length) {
      this.focusedIndex = 0;
    }
  }

  focusLast() {
    if (this.renderOptions.length) {
      this.focusedIndex = this.renderOptions.length - 1;
    }
  }

  focusNext() {
    if (this.renderOptions.length) {
      if (this.focusedIndex !== -1 && this.focusedIndex < this.renderOptions.length - 1) {
        this.focusedIndex++;
      } else {
        this.focusFirst();
      }
    }
  }

  focusPrev() {
    if (this.renderOptions.length) {
      if (this.focusedIndex > 0) {
        this.focusedIndex--;
      } else {
        this.focusLast();
      }
    }
  }

  focusTo(n: number) {
    if (this.renderOptions.length) {
      if (n >= 0 && n <= this.renderOptions.length - 1) {
        this.focusedIndex = n;
      }
    }
  }

  focusReset() {
    this.focusedIndex = -1;
  }

  getOptionKeyValuePair(option: string | OptionMember) {
    if (typeof option === "string") {
      return { key: option.trim(), value: option };
    }

    if (option && typeof option === "object") {
      const optionKeys = Object.keys(option as OptionMember);
      const optionValues = Object.values(option as OptionMember);

      if (optionKeys.length) {
        if (optionKeys.length === 1 || !this.optionId) {
          return { key: optionKeys[0], value: optionValues[0] };
        } else if (this.optionId) {
          return { key: option[this.optionId], value: option[this.optionValue || this.optionId] };
        }
      }
    }

    return { key: "undefined", value: "undefined" };
  }

  render() {
    return html`
      <div
        class="${classMap({
          "md-dropdown": true,
          "md-dropdown__expanded": this.expanded
        })}"
      >
        <select class="md-dropdown-select" ?disabled="${this.disabled}">
          ${repeat(
            this.renderOptions,
            o => o.key,
            o => html`
              <option value="${o.key}">${o.value}</option>
            `
          )}
        </select>
        <label class="md-dropdown-label" ?disabled="${this.disabled}" @click="${() => this.onLabelClick()}">
          <span class="md-dropdown-label--text">${this.title}</span>
          <span class="md-dropdown-label--icon">
            <md-icon name="icon-arrow-down_16"></md-icon>
          </span>
        </label>
        <ul class="md-dropdown-list">
          ${repeat(
            this.renderOptions,
            o => o.key,
            (o, idx) => html`
              <li
                class="md-dropdown-option"
                role="option"
                aria-label="${o.value}"
                ?focused="${idx === this.focusedIndex}"
              >
                <span class="select-label">
                  <span>${o.value}</span>
                </span>
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-dropdown": Dropdown;
  }
}
