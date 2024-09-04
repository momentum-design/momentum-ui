/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { ATTRIBUTES, Key } from "@/constants";
import { customElementWithCheck, FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined";
import { repeat } from "lit-html/directives/repeat";
import { debounce } from "@/utils/helpers";
import { styleMap } from "lit-html/directives/style-map";
import styles from "./scss/module.scss";

const EMPTY_KEY = "";

export namespace Dropdown {
  type OptionMember = { [key: string]: string };
  type Option = string | OptionMember;
  type RenderOptionMember = { key: string; value: string; option?: Option };

  export type EventDetail = {
    "dropdown-focus-in": undefined;
    "dropdown-focus-out": undefined;
    "dropdown-selected": {
      option: Option;
    };
    "dropdown-selection-removed": undefined;
  };

  export type MessageType = "error" | "success" | "warning";
  export type Message = {
    type: MessageType;
    message: string;
    id?: string;
    ariaLive?: "off" | "assertive" | "polite";
  };

  export class MessageController {
    determineMessageType(array: Dropdown.Message[]) {
      return array.reduce<Dropdown.MessageType>(
        (accumulator, errorMessage) =>
          (errorMessage as unknown as string) === "error" ? accumulator : errorMessage.type,
        "" as Dropdown.MessageType
      );
    }
    filterMessagesByType(array: Dropdown.Message[], value: string) {
      return array.reduce(
        (accumulator, errorMessage) =>
          errorMessage.type === value ? accumulator.concat(errorMessage.message) : accumulator,
        [] as string[]
      );
    }
  }

  @customElementWithCheck("md-dropdown")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: String, attribute: "title" }) title = "Select...";
    @property({ type: Array }) options: Option[] = [];
    @property({ type: String, attribute: "option-id" }) optionId = "";
    @property({ type: String, attribute: "option-value" }) optionValue = "";
    @property({ type: Object }) defaultOption: Option = EMPTY_KEY;

    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Number, attribute: "custom-tab-index", reflect: true }) customTabIndex = 0;
    @property({ type: Boolean, attribute: "allow-unselected", reflect: true }) allowUnselected = false;
    @property({ type: Number, attribute: "visible-option", reflect: true }) visibleOptions = 8;

    @property({ type: Boolean }) newMomentum = false;

    @property({ type: Boolean, reflect: true }) compact = false;
    @property({ type: Boolean, reflect: true }) searchable = false;
    @property({ type: Boolean, reflect: true }) searchItem = false;
    @property({ type: String, attribute: "input-value", reflect: true }) inputValue = "";
    @property({ type: String }) placeholder = "Select...";
    @property({ type: Boolean, reflect: true }) readOnly = false;
    @property({ type: Boolean, reflect: true }) autofocus = false;
    @property({ type: String, attribute: "left-icon", reflect: true }) leftIcon = "";
    @property({ type: Boolean, reflect: true, attribute: "search-trim-space" }) trimSpace = false;
    @property({ type: String, attribute: "no-results-i18n" }) resultsTextLocalization = "No Results";

    @property({ type: String }) helpText = "";
    @property({ type: Array }) messageArr: Dropdown.Message[] = [];
    @property({ type: String }) htmlId = "";

    @property({ type: String, attribute: "clear-aria-label" }) clearAriaLabel = "Clear";
    @property({ type: String, attribute: "clear-icon-height" }) clearIconHeight = "auto";
    @property({ type: String, attribute: "arrow-aria-label" }) arrowAriaLabel = "Expand";
    @property({ type: String, attribute: "popup-chevron-aria-hidden" }) popupChevronAriaHidden = "true";

    @property({ type: String, reflect: true }) ariaLabel = ""; // This aria-label is used by default when there is no search or list-items are displayed.
    @property({ type: String, attribute: "search-result-aria-label" }) searchResultAriaLabel = ""; // This aria-label is dynamic and used when there is search and list-items are displayed.
    @internalProperty() ariaLabelForDropdown = ""; // This internal property is used to conditionally set aria-label.

    @internalProperty() private renderOptions: RenderOptionMember[] = [];
    @internalProperty() private selectedKey: string = EMPTY_KEY;

    @internalProperty() private expanded = false;
    @internalProperty() private focusedIndex = -1;

    @query("label") label!: HTMLLabelElement;
    @query(".md-dropdown-input") input?: HTMLInputElement;
    @query("ul.md-dropdown-list") optionsList!: HTMLUListElement;
    @queryAll("li.md-dropdown-option") optionsListItems?: HTMLLIElement[];

    private readonly messageController = new MessageController();

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

      changedProperties.forEach((oldValue, name) => {
        if (name === "defaultOption") {
          if (this.defaultOption) {
            const { key } = this.getOptionKeyValuePair(this.defaultOption);
            this.selectedKey = key;
          }
        }
      });

      if (this.searchable) {
        this.setInitialValue();
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      changedProperties.forEach((oldValue, name) => {
        if (name === "options") {
          this.updateRenderOptions();
        }
        if (name === "selectedKey") {
          const idx = this.renderOptions.findIndex((o) => o.key === this.selectedKey);
          if (idx !== -1) {
            this.focusToIndex(idx);
            if (this.searchable) {
              this.setInitialValue();
            }
          }
        }
        if (name === "expanded") {
          this.updateListDOM();
        }
        if (name === "focusedIndex") {
          this.updateListDOM();
        }
        if (name === "defaultOption") {
          if (this.defaultOption) {
            const { key } = this.getOptionKeyValuePair(this.defaultOption);

            this.selectedKey = key;
          }
        }
      });
    }

    private notifySearchResultCount() {
      // this function is to update ariaLabelForComboBox for search result count.

      // If searchResultAriaLabel is passed, the {{}} is replaced with the search result count.
      if (this.searchResultAriaLabel) {
        const regex = /{{.*?}}/g;
        this.ariaLabelForDropdown = this.searchResultAriaLabel.replace(regex, this.filteredOptions.length.toString());
      }
      // If searchResultAriaLabel is not passed and ariaLabel is passed, the ariaLabel is appended with the search result count.
      else if (this.ariaLabel) {
        this.ariaLabelForDropdown = `${this.ariaLabel}, ${this.filteredOptions.length} results found.`;
      }
      // If both searchResultAriaLabel and ariaLabel are not passed, the default text is appended with the search result count.
      else {
        this.ariaLabelForDropdown = `Dropdown Element, ${this.filteredOptions.length} results found.`;
      }
    }

    private setInitialValue() {
      if (this.options.length) {
        const foundOptionMember = this.renderOptions.find((o) => o.key === this.selectedKey);
        const option = foundOptionMember?.option;
        if (option) {
          this.setInputValue(this.getOptionValue(option));
          this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
          this.notifyInputValueChanged(this.getOptionValue(option));
          this.requestUpdate();
        }
      }
    }

    private getOptionValue(option: string | OptionMember) {
      if (this.isOptionObject(option) && !this.optionValue) {
        return Object.values(option)[0];
      }
      return this.isOptionObject(option) ? (option as OptionMember)[this.optionValue] : (option as string);
    }

    private getOptionId(option: string | OptionMember) {
      return this.isOptionObject(option) ? (option as OptionMember)[this.optionId] : (option as string);
    }

    private isOptionObject(option: string | OptionMember) {
      return typeof option === "object" && option !== null;
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
      if (!this.expanded) {
        return;
      }
      await this.resizeDropdownList();
      await this.scrollToIndex(this.focusedIndex);
    }

    async resizeDropdownList() {
      await new Promise<void>((resolve) =>
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
        })
      );
    }

    protected handleFocusIn(event: Event) {
      if (!this.disabled || !this.readOnly) {
        super.handleFocusIn && super.handleFocusIn(event);
      }

      this.dispatchEvent(
        new CustomEvent<EventDetail["dropdown-focus-in"]>("dropdown-focus-in", {
          composed: true,
          bubbles: true
        })
      );
    }

    protected handleFocusOut(event: Event) {
      super.handleFocusOut && super.handleFocusOut(event);

      this.dispatchEvent(
        new CustomEvent<EventDetail["dropdown-focus-out"]>("dropdown-focus-out", {
          composed: true,
          bubbles: true
        })
      );
    }

    static get styles() {
      return [reset, styles];
    }

    get filteredOptions() {
      const inputValue = this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue;

      if (!inputValue.trim()) {
        return this.renderOptions;
      }
      const filtered = this.renderOptions.filter((o) => o.value.toLowerCase().includes(inputValue.toLowerCase()));

      if (filtered.length === 0) {
        return [{ key: "no-result", value: "No Result", disabled: true }];
      }

      return filtered;
    }

    get messageType(): Dropdown.MessageType | null {
      if (this.messageArr.length > 0) {
        return this.messageController.determineMessageType(this.messageArr);
      }
      return null;
    }

    get messages() {
      if (this.messageType) {
        return this.messageController.filterMessagesByType(this.messageArr, this.messageType);
      }
      return null;
    }

    private setVisualListbox(value: boolean) {
      this.expanded = value;
    }

    private updateOnNextFrame(cb: FrameRequestCallback) {
      requestAnimationFrame(cb);
    }

    private setInputValue(value = "") {
      this.input!.value = value;
    }

    private shouldChangeButton() {
      const shouldChange = this.input && this.input.value.length > 0;
      if (shouldChange) {
        document.dispatchEvent(new CustomEvent("on-widget-update"));
      }
      return shouldChange;
    }

    toggleVisualListBox(e: any) {
      if (this.readOnly) {
        return;
      }
      if (e.target.classList.contains("md-dropdown-input")) {
        e.target.focus();
      } else if (e.target.localName === "md-icon") {
        const parentElement = e.target.parentElement?.parentElement?.parentElement;
        if (parentElement) {
          const input = parentElement.querySelector(".md-dropdown-input");
          setTimeout(() => {
            input.focus();
          }, 10);
        }
      }
      if (this.expanded) {
        this.setVisualListbox(false);
      } else {
        // While open dropdown
        this.dispatchEvent(
          new CustomEvent("combobox-on-expand", {
            composed: true,
            bubbles: true
          })
        );
        this.notifySearchResultCount();
        this.setVisualListbox(true);
      }
      this.input!.focus();
    }

    handleRemoveAll(event: MouseEvent) {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent("remove-all-selected"));
    }

    private removeAllSelected() {
      this.focusReset();
      this.selectedKey = EMPTY_KEY;
      this.inputValue = "";
      this.setInputValue();
      this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, "");
      this.setVisualListbox(false);
      this.updateOnNextFrame(() => {
        this.input!.focus();
      });

      this.dispatchEvent(
        new CustomEvent("dropdown-selection-removed", {
          composed: true,
          bubbles: true,
          detail: {}
        })
      );
    }

    setupEvents() {
      document.addEventListener("click", this.onOutsideClick);

      this.addEventListener("keydown", this.onKeyDown);
      this.addEventListener("remove-all-selected", this.removeAllSelected);
    }

    teardownEvents() {
      document.removeEventListener("click", this.onOutsideClick);

      this.removeEventListener("keydown", this.onKeyDown);
      this.removeEventListener("remove-all-selected", this.removeAllSelected);
    }

    expand() {
      this.expanded = true;
      const selectedIndex = this.focusedIndex !== -1 ? `combo-${this.focusedIndex}` : "";
      document.dispatchEvent(new CustomEvent("on-widget-update"));
      this.label.setAttribute("aria-activedescendant", selectedIndex);
      if (this.optionsList) {
        (this.optionsList as HTMLElement).focus();
      }

      if (this.focusedIndex === -1) {
        this.focusNext();
      }
    }

    collapse() {
      this.expanded = false;
      if (!this.searchable) {
        this.label.setAttribute("aria-activedescendant", "");
      }
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
            new CustomEvent<EventDetail["dropdown-selected"]>("dropdown-selected", {
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
        insideSelfClick = !!path.find((element) => element === this);
        if (!insideSelfClick) {
          if (this.expanded) {
            this.collapse();
          }
        }
      }
    };

    onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case Key.Tab: {
          if (this.expanded) {
            e.stopPropagation();
            this.collapse();
          }
          break;
        }
        case Key.Space:
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
        case Key.Escape || Key.Backspace: {
          if (this.expanded) {
            e.stopPropagation();
            this.collapse();
          }
          break;
        }
      }
    };

    onLabelClick() {
      this.label.focus();
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

    focusToIndexWithOption(o: RenderOptionMember) {
      const n = this.renderOptions.findIndex((option) => option.key === o.key);
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
      await new Promise<void>((resolve) => {
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
        const option = this.renderOptions.find((o) => o.key === this.selectedKey);
        if (option) {
          return option.value;
        }
      }
      return this.title;
    }

    get dropDownClassMap() {
      return {
        "md-dropdown__expanded": this.expanded,
        [`md-${this.messageType}`]: !!this.messageType,
        "md-new-dropdown": this.newMomentum
      };
    }

    handleInput(event: Event) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.inputValue = inputValue.trim();
      this.notifyInputValueChanged(inputValue.trim());
    }

    private notifyInputValueChanged = debounce((value: string) => {
      this.dispatchEvent(
        new CustomEvent("dropdown-input", {
          composed: true,
          bubbles: true,
          detail: {
            value
          }
        })
      );

      this.notifySearchResultCount();
      requestAnimationFrame(() => {
        this.input!.focus();
      });
    }, 250);

    helpTextTemplate() {
      return this.helpText
        ? html`
            <md-help-text
              class="help-text ${classMap({ disabled: this.disabled, newMomentum: this.newMomentum })}"
              .message=${this.helpText}
              style=${styleMap({ width: "100%" })}
            ></md-help-text>
          `
        : nothing;
    }

    messagesTemplate() {
      return this.messages && !!this.messages.length
        ? html`
            <div id="${this.htmlId}-message" part="message" class="md-dropbox__messages">
              ${repeat(this.messages, (message, id) => {
                return html`
                  <md-help-text
                    .message=${message}
                    .id=${this.messageArr[id].id || ""}
                    .ariaLive=${this.messageArr[id].ariaLive || "polite"}
                    .messageType=${this.messageType as Dropdown.MessageType}
                  ></md-help-text>
                `;
              })}
            </div>
          `
        : nothing;
    }

    iconTemplate() {
      return html`
        <md-icon
          class="md-dropdown-left-icon"
          name="${this.leftIcon}"
          size="16"
          iconSet="momentumDesign"
          @click=${this.toggleVisualListBox}
        ></md-icon>
      `;
    }

    clearButtonTemplate() {
      return html`
        <button
          type="button"
          class="md-dropdown-button clear"
          aria-label=${this.clearAriaLabel}
          aria-controls="md-dropdown-input"
          tabindex="0"
          ?readonly=${this.readOnly}
          ?disabled=${this.disabled}
          @click=${this.handleRemoveAll}
        >
          <span>
            <md-icon
              class="md-input__icon-clear"
              name="cancel-bold"
              size="14"
              iconSet="momentumDesign"
              style="height: ${this.clearIconHeight};"
            ></md-icon
          ></span>
        </button>
      `;
    }

    arrowButtonTemplate() {
      return html`
        <button
          type="button"
          class="md-dropdown-button arrow-down"
          aria-expanded=${this.expanded}
          aria-label=${ifDefined(this.popupChevronAriaHidden === "true" ? undefined : this.arrowAriaLabel)}
          aria-controls="md-dropdown-input"
          tabindex="-1"
          aria-hidden=${this.popupChevronAriaHidden}
          ?readonly=${this.readOnly}
          ?disabled=${this.disabled}
          @click=${this.toggleVisualListBox}
        >
          <span>
            <md-icon name="arrow-down-bold" size="16" iconSet="momentumDesign"></md-icon>
          </span>
        </button>
      `;
    }

    render() {
      return html`
        <div class="md-dropdown ${classMap(this.dropDownClassMap)}" part="dropdown">
          ${!this.searchable
            ? html`
                <label
                  class="md-dropdown-label ${classMap({ "md-new-dropdown-label": this.newMomentum })}"
                  aria-expanded="${this.expanded}"
                  aria-label="${this.title}"
                  aria-controls="md-dropdown-list"
                  aria-haspopup="listbox"
                  ?disabled="${this.disabled}"
                  @click="${() => this.onLabelClick()}"
                  part="dropdown-header"
                  role="combobox"
                  tabindex="0"
                >
                  <span class="md-dropdown-label--text ${classMap({ "md-new-dropdown-label--text": this.newMomentum })}"
                    >${this.labelTitle}</span
                  >
                  <span class="md-dropdown-label--icon">
                    <md-icon name="arrow-down-bold" size="16" iconSet="momentumDesign"></md-icon>
                  </span>
                </label>
              `
            : html`
                <div part="group" class="group" ?readonly=${this.readOnly}>
                  ${this.leftIcon ? this.iconTemplate() : nothing}
                  <input
                    class="md-dropdown-input"
                    type="text"
                    role="combobox"
                    aria-autocomplete="both"
                    aria-label=${this.title}
                    part="dropdown-input"
                    aria-expanded=${this.expanded}
                    placeholder=${this.placeholder}
                    aria-controls="md-combobox-listbox"
                    ?readonly=${this.readOnly}
                    ?disabled=${this.disabled}
                    ?autofocus=${this.autofocus}
                    title=${this.title}
                    tabindex="0"
                    .value=${this.inputValue}
                    @click=${this.toggleVisualListBox}
                    @input=${this.handleInput}
                  />
                  ${this.compact || !this.searchable
                    ? nothing
                    : this.shouldChangeButton()
                      ? this.clearButtonTemplate()
                      : this.arrowButtonTemplate()}
                </div>
              `}
          <ul
            id="md-dropdown-list"
            class="md-dropdown-list"
            role="listbox"
            aria-label="${this.labelTitle}"
            aria-hidden="${!this.expanded}"
            part="dropdown-options"
            tabindex=${ifDefined(this.customTabIndex === -1 ? undefined : this.customTabIndex)}
          >
            ${this.filteredOptions.map(
              (o, idx) => html`
                <li
                  id="combo-${idx}"
                  class="md-dropdown-option"
                  role="option"
                  tabindex=${ifDefined(this.customTabIndex === -1 ? undefined : this.customTabIndex)}
                  aria-label="${o.value}"
                  label="${o.value}"
                  aria-selected="${o.key === this.selectedKey}"
                  part="dropdown-option"
                  ?focused="${idx === this.focusedIndex}"
                  ?selected="${o.key === this.selectedKey}"
                  @click="${() => {
                    this.focusToIndexWithOption(o);
                    this.select();
                    this.collapse();
                  }}"
                >
                  <span class="select-label" part="label">
                    <span>${o.value}</span>
                  </span>
                </li>
              `
            )}
          </ul>
        </div>
        ${this.messagesTemplate()} ${this.helpTextTemplate()}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-dropdown": Dropdown.ELEMENT;
  }
}
