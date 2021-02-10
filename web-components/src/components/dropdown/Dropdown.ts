import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElement, internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { repeat } from "lit-html/directives/repeat.js";
import styles from "./scss/module.scss";

const EMPTY_KEY = "";

type OptionMember = { [key: string]: string };
type Option = string | OptionMember;
type RenderOptionMember = { key: string; value: string; option?: Option };

export type DropdownEvents = {
  "dropdown-focus-in": undefined;
  "dropdown-focus-out": undefined;
  "dropdown-selected": {
    option: Option;
  };
};

@customElement("md-dropdown")
export class Dropdown extends FocusMixin(LitElement) {
  @property({ type: String, attribute: "title" }) title = "Select...";
  @property({ type: Array }) options: Option[] = [];
  @property({ type: String, attribute: "option-id" }) optionId = "";
  @property({ type: String, attribute: "option-value" }) optionValue = "";
  @property({ type: Object }) defaultOption: Option = EMPTY_KEY;

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, attribute: "allow-unselected", reflect: true }) allowUnselected = false;
  @property({ type: Number, attribute: "visible-option", reflect: true }) visibleOptions = 8;

  @internalProperty() private renderOptions: RenderOptionMember[] = [];
  @internalProperty() private selectedKey: string = EMPTY_KEY;

  @internalProperty() private expanded = false;
  @internalProperty() private focusedIndex = -1;

  @query("label") label!: HTMLLabelElement;
  @query("ul.md-dropdown-list") optionsList!: HTMLUListElement;
  @queryAll("li.md-dropdown-option") optionsListItems?: HTMLLIElement[];

  private lastMaxHeight = "";

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
          this.focusToIndex(idx);
        }
      }
      if (name === "expanded") {
        if (this.expanded) {
          this.updateListDOM();
        }
      }
      if (name === "focusedIndex") {
        this.updateListDOM();
      }
    });
  }

  updateRenderOptions() {
    const existingKeys: string[] = [];

    this.focusReset();

    const renderOptions = this.options.reduce((acc, option) => {
      const { key, value } = this.getOptionKeyValuePair(option);

      if (existingKeys.indexOf(key) !== -1) {
        console.error(`Dropdown already have option key: "${key}". Ignoring `);
      } else if (!key) {
        console.error(`Dropdown key is not defined: "${key}". (value: "${value}"). Ignoring `);
      } else {
        existingKeys.push(key);
        acc.push({ key, value, option });
      }
      return acc;
    }, [] as RenderOptionMember[]);

    if (this.allowUnselected) {
      renderOptions.unshift({
        key: EMPTY_KEY,
        value: this.title // || "" ?
      });
    }

    this.renderOptions = renderOptions;
  }

  async updateListDOM() {
    await this.resizeDropdownList();
    await this.scrollToIndex(this.focusedIndex);
  }

  async resizeDropdownList() {
    await new Promise(resolve => {
      requestAnimationFrame(() => {
        if (this.optionsListItems) {
          if (this.optionsListItems.length > this.visibleOptions) {
            const maxHeight = [...this.optionsListItems]
              .slice(0, this.visibleOptions)
              .reduce((acc, option) => acc + option.offsetHeight, 0);

            const nextMaxHeight = `${maxHeight}px`;
            if (this.lastMaxHeight !== nextMaxHeight) {
              this.optionsList.style.maxHeight = nextMaxHeight;
              this.lastMaxHeight = nextMaxHeight;
            }
          } else {
            const nextMaxHeight = `auto`;
            if (this.lastMaxHeight !== nextMaxHeight) {
              this.optionsList.style.maxHeight = nextMaxHeight;
              this.lastMaxHeight = nextMaxHeight;
            }
          }
        }
        resolve();
      });
    });
  }

  protected handleFocusIn(event: Event) {
    if (!this.disabled) {
      super.handleFocusIn && super.handleFocusIn(event);
    }

    this.dispatchEvent(
      new CustomEvent<DropdownEvents["dropdown-focus-in"]>("dropdown-focus-in", {
        composed: true,
        bubbles: true
      })
    );
  }

  protected handleFocusOut(event: Event) {
    super.handleFocusOut && super.handleFocusOut(event);

    this.dispatchEvent(
      new CustomEvent<DropdownEvents["dropdown-focus-out"]>("dropdown-focus-out", {
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
      const renderOption = this.renderOptions[this.focusedIndex];

      const nextSelectedKey = renderOption.key;
      const prevSelectedKey = this.selectedKey;

      if (nextSelectedKey !== prevSelectedKey) {
        this.selectedKey = nextSelectedKey;

        this.dispatchEvent(
          new CustomEvent<DropdownEvents["dropdown-selected"]>("dropdown-selected", {
            composed: true,
            bubbles: true,
            detail: {
              option: renderOption.option ? renderOption.option : renderOption.key
            }
          })
        );
      }
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
        if (!this.expanded) {
          this.expand();
        } else {
          this.focusNext();
        }
        break;
      }
      case Key.ArrowUp: {
        if (!this.expanded) {
          this.expand();
        } else {
          this.focusPrev();
        }

        break;
      }
      case Key.Home: {
        if (!this.expanded) {
          this.expand();
        } else {
          this.focusFirst();
        }
        break;
      }
      case Key.End: {
        if (!this.expanded) {
          this.expand();
        } else {
          this.focusLast();
        }
        break;
      }
      case Key.Escape: {
        if (this.expanded) {
          this.collapse();
        }
        break;
      }
      default: {
        //
      }
    }
  };

  onLabelClick() {
    this.toggle();
  }

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

  focusToIndex(n: number) {
    if (this.renderOptions.length) {
      if (n >= 0 && n <= this.renderOptions.length - 1) {
        this.focusedIndex = n;
      }
    }
  }

  focusReset() {
    this.focusedIndex = -1;
  }

  async scrollToIndex(n: number) {
    await new Promise(resolve => {
      requestAnimationFrame(() => {
        if (
          this.optionsListItems &&
          this.optionsListItems.length > this.visibleOptions &&
          n >= 0 &&
          this.optionsListItems.length > n
        ) {
          let distance = 0;

          const { top, bottom } = this.optionsList.getBoundingClientRect();
          const option = this.optionsListItems[n];

          const nextOption = this.optionsListItems[n + 1] || option;
          const prevOption = this.optionsListItems[n - 1] || option;

          const nextOptionRect = nextOption.getBoundingClientRect();
          const prevOptionRect = prevOption.getBoundingClientRect();

          if (nextOptionRect.bottom > bottom) {
            distance = nextOptionRect.bottom - bottom + 2;
          } else if (prevOptionRect.top < top) {
            distance = prevOptionRect.top - top - 2;
          }

          this.optionsList.scrollTop += distance;
        }
        resolve();
      });
    });
  }

  getOptionKeyValuePair(option: Option) {
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

  get labelTitle() {
    if (this.selectedKey) {
      const option = this.renderOptions.find(o => o.key === this.selectedKey);
      if (option) {
        return option.value;
      }
    }
    return this.title;
  }

  render() {
    return html`
      <div
        class="${classMap({
          "md-dropdown": true,
          "md-dropdown__expanded": this.expanded
        })}"
      >
        <!-- <select class="md-dropdown-select" ?disabled="${this.disabled}">
          ${repeat(
          this.renderOptions,
          o => o.key,
          o => html`
            <option value="${o.key}" ?selected="${o.key === this.selectedKey}">${o.value}</option>
          `
        )}
        </select> -->
        <label
          class="md-dropdown-label"
          aria-expanded="${this.expanded}"
          aria-label="${this.labelTitle}"
          ?disabled="${this.disabled}"
          @click="${() => this.onLabelClick()}"
        >
          <span class="md-dropdown-label--text">${this.labelTitle}</span>
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
                @click="${() => {
                  this.focusToIndex(idx);
                  this.select();
                  this.collapse();
                }}"
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
