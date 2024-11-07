/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/help-text/HelpText";
import "@/components/icon/Icon";
import { ATTRIBUTES, Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { debounce, findHighlight } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import { nothing, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { repeat } from "lit-html/directives/repeat";
import { styleMap } from "lit-html/directives/style-map";
import { scroll } from "lit-virtualizer";
import { setTimeout } from "timers";
import styles from "./scss/module.scss";

export namespace ComboBox {
  type OptionMember = { [key: string]: string };
  type SelectedEvent = {
    value?: string | OptionMember;
    selected: (string | OptionMember)[];
  };
  export type MessageType = "error" | "success" | "warning";
  export type Message = {
    type: MessageType;
    message: string;
    id?: string;
    ariaLive?: "off" | "assertive" | "polite";
  };

  export class MessageController {
    determineMessageType(array: ComboBox.Message[]) {
      return array.reduce<ComboBox.MessageType>(
        (accumulator, errorMessage) =>
          (errorMessage as unknown as string) === "error" ? accumulator : errorMessage.type,
        "" as ComboBox.MessageType
      );
    }
    filterMessagesByType(array: ComboBox.Message[], value: string) {
      return array.reduce(
        (accumulator, errorMessage) =>
          errorMessage.type === value ? accumulator.concat(errorMessage.message) : accumulator,
        [] as string[]
      );
    }
  }

  @customElementWithCheck("md-combobox")
  export class ELEMENT extends FocusMixin(LitElement) {
    private _focusedIndex = -1;
    private _focusedGroupIndex = -1;

    @property({ type: String }) label = "Options";
    @property({ type: Array }) options: (string | OptionMember)[] = [];
    @property({ type: Array, attribute: "custom-options" }) customOptions = [];
    @property({ type: String }) placeholder = "";
    @property({ type: Boolean, attribute: "is-multi" }) isMulti = false;
    @property({ type: Boolean, attribute: "use-virtual-scroll" }) useVirtualScroll = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) ordered = false;
    @property({ type: Boolean, reflect: true }) expanded = false;
    @property({ type: Array, reflect: true }) groupExpandedList: any = [];
    @property({ type: Boolean, reflect: true }) searchItem = false;
    @property({ type: Boolean, reflect: true }) compact = false;
    @property({ type: Boolean, attribute: "no-clear-icon" }) noClearIcon = false;
    @property({ type: Boolean, attribute: "select-when-in-focus" }) selectWhenInFocus = false;
    @property({ type: Array }) selectedOptions: (string | OptionMember)[] = [];
    @property({ type: Number, attribute: "visible-option", reflect: true }) visibleOptions = 8;
    @property({ type: String, attribute: "option-id", reflect: true }) optionId = "";
    @property({ type: String, attribute: "option-value", reflect: true }) optionValue = "";
    @property({ type: Boolean, attribute: "with-custom-content" }) isCustomContent = false;
    @property({ type: Boolean, reflect: true }) searchable = false;
    @property({ type: String }) shape = "none";
    @property({ type: Array }) value: (string | OptionMember)[] = [];
    @property({ type: String, attribute: "input-value", reflect: true }) inputValue = "";
    @property({ type: Boolean, attribute: "allow-custom-value", reflect: true }) allowCustomValue = false;
    @property({ type: Boolean, reflect: true }) autofocus = false;
    @property({ type: String, attribute: "no-results-i18n" }) resultsTextLocalization = "No Results";
    @property({ type: String, attribute: "no-options-i18n" }) optionsTextLocalization = "No Options";
    @property({ type: Boolean, reflect: true, attribute: "search-trim-space" }) trimSpace = false;
    @property({ type: Boolean, reflect: true }) invalid = false;
    @property({ type: String, reflect: true, attribute: "invalid-text-i18n" }) invalidText = "";

    @property({ type: String, reflect: true }) ariaLabel = ""; // This aria-label is used by default when there is no search or list-items are displayed.
    @property({ type: String, attribute: "search-result-aria-label" }) searchResultAriaLabel = ""; // This aria-label is dynamic and used when there is search and list-items are displayed.
    @internalProperty() ariaLabelForComboBox = ""; // This internal property is used to conditionally set aria-label.

    @property({ type: String, attribute: "clear-aria-label" }) clearAriaLabel = "Clear";
    @property({ type: String, attribute: "arrow-aria-label" }) arrowAriaLabel = "Expand";
    @property({ type: String, attribute: "clear-icon-height" }) clearIconHeight = "auto";

    @property({ type: String, attribute: "all-i18n" }) allTextLocalization = "All";
    @property({ type: String, attribute: "select-all-i18n" }) selectAllTextLocalization = "Select All";
    @property({ type: String, attribute: "selected-all-i18n" }) selectedTextLocalization = "Selected";

    @property({ type: Boolean, attribute: "allow-select-all", reflect: true }) allowSelectAll = false;
    @property({ type: Boolean, attribute: "show-custom-error", reflect: true }) showCustomError = false;
    @property({ type: Boolean, attribute: "show-loader", reflect: true }) showLoader = false;
    @property({ type: Boolean, attribute: "show-selected-count", reflect: true }) showSelectedCount = false;
    @property({ type: String, attribute: "popup-chevron-aria-hidden" }) popupChevronAriaHidden = "true";
    @property({ type: Boolean, reflect: true }) newMomentum = false;
    @property({ type: Boolean, attribute: "show-filter-icon" }) showFilterIcon = false;

    /**
     * When using the new momentum style sets whether to use the new combobox style arrow
     * or the arrow not in a div what a border to the right. This will be used for filter dropdowns
     * that were implemented using a combobox
     */
    @property({ type: Boolean, attribute: "is-dropdown-arrow" }) isDropdownArrow = false;

    @property({ type: String })
    comboboxId = "";
    @property({ type: String }) helpText = "";
    @property({ type: Array }) messageArr: ComboBox.Message[] = [];
    @property({ type: String }) htmlId = "";
    @property({ type: Boolean, reflect: true }) readOnly = false;

    private readonly messageController = new MessageController();

    @internalProperty()
    private isOptGroup = false;
    @internalProperty()
    private isSelectAllChecked = false;
    get focusedIndex() {
      return this._focusedIndex;
    }
    set focusedIndex(index: number) {
      this.updateFocusedIndex(index);
    }

    updateFocusedIndex(index: number) {
      const oldIndex = this._focusedIndex;
      if (this.checkForVirtualScroll()) {
        // Virtual Scroll is Enabled.
        let newId: any;
        if (this.allowSelectAll) {
          // "Select All" checkbox option is enabled.
          newId = index === 0 ? "selectAll" : this.getOptionId(this.filteredOptions[index - 1]);
        } else {
          newId = this.getOptionId(this.filteredOptions[index]);
        }
        const newList = this.lists ? [...this.lists]?.find((list) => list.offsetHeight !== 0 && list.id === newId) : "";
        if (this.lists) {
          [...this.lists].forEach((list) => {
            list.toggleAttribute("focused", false);
          });
        }
        if (newList) {
          newList?.toggleAttribute("focused", true);
        }
      } else {
        if (this.lists) {
          const oldFocusedOption = this.lists[oldIndex];
          if (oldFocusedOption) {
            oldFocusedOption.toggleAttribute("focused", false);
          }
          const newFocusedOption = this.lists[index];
          if (newFocusedOption) {
            newFocusedOption.toggleAttribute("focused", true);
          }
        }
      }
      this._focusedIndex = index;
      this.requestUpdate("focusedIndex", oldIndex);
    }

    get focusedGroupIndex() {
      return this._focusedGroupIndex;
    }

    set focusedGroupIndex(index: number) {
      const oldIndex = this._focusedGroupIndex;
      if (this.labels && this.labels.length !== 0) {
        const oldFocusedOption = this.labels[oldIndex];
        if (oldFocusedOption) {
          oldFocusedOption.toggleAttribute("focused", false);
        }
        const newFocusedOption = this.labels[index];
        if (newFocusedOption) {
          newFocusedOption.toggleAttribute("focused", true);
          newFocusedOption.focus();
        }
      }
      this._focusedGroupIndex = index;
      this.requestUpdate("focusedGroupIndex", oldIndex);
    }

    get messageType(): ComboBox.MessageType | null {
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

    private multiSelectedIndex = -1;
    private multiSelected: number[] = [];
    private customContent: Element[] = [];

    private notifySearchResultCount() {
      // this function is to update ariaLabelForComboBox for search result count.

      // If searchResultAriaLabel is passed, the {{}} is replaced with the search result count.
      if (this.searchResultAriaLabel) {
        const regex = /{{.*?}}/g;
        this.ariaLabelForComboBox = this.searchResultAriaLabel.replace(regex, this.filteredOptions.length.toString());
      }
      // If searchResultAriaLabel is not passed and ariaLabel is passed, the ariaLabel is appended with the search result count.
      else if (this.ariaLabel) {
        this.ariaLabelForComboBox = `${this.ariaLabel}, ${this.filteredOptions.length} results found.`;
      }
      // If both searchResultAriaLabel and ariaLabel are not passed, the default text is appended with the search result count.
      else {
        this.ariaLabelForComboBox = `ComboBox Element, ${this.filteredOptions.length} results found.`;
      }
    }

    @query(".group") group?: HTMLDivElement;
    @query(".md-combobox-listbox") input?: HTMLInputElement;
    @query(".md-combobox-button") button?: HTMLButtonElement;
    @query("div#md-combobox-listbox") listBox?: HTMLDivElement;
    @query(".virtual-scroll") virtualizer?: any;

    @queryAll("div.md-combobox-option") lists?: HTMLDivElement[];
    @queryAll(".group-label") labels?: HTMLDivElement[];
    @queryAll(".md-combobox-selected-item") selected?: HTMLDivElement[];

    protected firstUpdated(changedProperties: PropertyValues) {
      // Initially the ariaLabelForComboBox is set for ariaLabel value if found or a static text is set.
      this.ariaLabelForComboBox = this.ariaLabel ? this.ariaLabel : "ComboBox Element";
      super.firstUpdated(changedProperties);
      if (this.isCustomContent) {
        this.optionId = "id";
        this.optionValue = "value";
        this.setOptionCustomContent();
      }
      this.setInitialValue();
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("expanded")) {
        if (this.expanded) {
          this.resizeListbox();
          this.checkSelectedOptions();
        } else {
          this.unCheckAllOptions();
        }
      }
      if (changedProperties.has("focusedIndex")) {
        if (this.focusedIndex >= 0) {
          if (!this.checkForVirtualScroll()) {
            this.scrollToOption();
          }
        }
      }
      if (changedProperties.has("value")) {
        if (this.selectedOptions.length === 0) {
          this.setInitialValue();
        }
      }
      if (changedProperties.has("customOptions")) {
        if (this.isCustomContent) {
          this.setOptionCustomContent();
          this.resizeListbox();
        }
      }
      if (changedProperties.has("showCustomError")) {
        this.resizeListbox();
      }
      if (changedProperties.has("showLoader")) {
        this.resizeListbox();
      }
      if (changedProperties.has("searchItem")) {
        this.resizeListbox();
      }
    }

    protected handleFocusIn(event: Event) {
      if (!this.disabled || this.readOnly) {
        if (this.noClearIcon) {
          requestAnimationFrame(() => {
            this.input!.focus();
            this.focusedGroupIndex = -1;
          });

          if (this.selectWhenInFocus) {
            this.input!.select();
          }
        }
        super.handleFocusIn && super.handleFocusIn(event);
      }
      this.dispatchEvent(
        new CustomEvent("combobox-focus-in", {
          composed: true,
          bubbles: true
        })
      );
    }

    protected handleFocusOut(event: Event) {
      super.handleFocusOut && super.handleFocusOut(event);
      this.dispatchEvent(
        new CustomEvent("combobox-focus-out", {
          composed: true,
          bubbles: true
        })
      );
    }

    private findFilteredOption(option: string | OptionMember) {
      if (this.isOptionObject(option)) {
        return (this.filteredOptions as OptionMember[]).findIndex(
          (filteredOption) =>
            this.getOptionId(filteredOption) === this.getOptionId(option) &&
            this.getOptionValue(filteredOption) === this.getOptionValue(option)
        );
      }
      return this.filteredOptions.indexOf(option);
    }

    private setInitialValue() {
      if (this.value.length) {
        if (this.isMulti) {
          this.value.forEach((v) => {
            const selectedIndex = this.findFilteredOption(v);
            if (selectedIndex !== -1) {
              this.setSelectedOption(v);
            }
          });
        } else {
          const option = this.value[0];
          const selectedIndex = this.findFilteredOption(option);
          if (selectedIndex !== -1) {
            this.setSelectedOption(option);
            this.setInputValue(this.getOptionValue(option));
            this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
            this.focusedIndex = selectedIndex;
            this.focusedGroupIndex = -1;
          }
        }
      }
    }

    private isOptionObject(option: string | OptionMember) {
      return typeof option === "object" && option !== null;
    }

    private setOptionCustomContent() {
      if (this.isOptGroup) {
        const customOptionGroups = [...this.querySelectorAll(`optgroup`)];
        const final = [];
        for (const optgroup of customOptionGroups) {
          const label = optgroup.getAttribute("label");
          const childOptions = [...optgroup.querySelectorAll(`[slot]`)];

          final.push({ isLabel: "true", [this.optionValue]: label, groupName: label });
          for (const option of childOptions) {
            const customValue = option.getAttribute("aria-label");
            const displayCustomValue = option.getAttribute("display-value");
            const slotValue = option.getAttribute("slot");
            if (customValue && displayCustomValue) {
              final.push({
                [this.optionId]: customValue,
                [this.optionValue]: displayCustomValue,
                isLabel: "false",
                groupName: label,
                slot: slotValue
              });
            }
          }
        }
        this.options = final as OptionMember[];
      } else {
        this.customContent = [...this.querySelectorAll(`[slot]`)];
        if (this.customContent && this.customContent.length) {
          this.options = this.customContent.map((content) => {
            const customValue = content.getAttribute("aria-label");
            const displayCustomValue = content.getAttribute("display-value");
            if (customValue && displayCustomValue) {
              return { [this.optionId]: customValue, [this.optionValue]: displayCustomValue };
            }
          }) as OptionMember[];
        } else {
          this.options = [];
        }
      }
    }

    private getOptionValue(option: string | OptionMember) {
      return this.isOptionObject(option) ? (option as OptionMember)[this.optionValue] : (option as string);
    }

    private getOptionGroupName(option: any) {
      return option?.groupName;
    }

    private getOptionId(option: string | OptionMember) {
      return this.isOptionObject(option) ? (option as OptionMember)[this.optionId] : (option as string);
    }

    private getFocusedItem(focusedIndex: number) {
      if (focusedIndex >= 0) {
        return this.filteredOptions[focusedIndex];
      }
    }

    private setupEvents() {
      document.addEventListener("click", this.handleOutsideClick);
      this.addEventListener("remove-all-selected", this.removeAllSelected);
      this.addEventListener("selected-changed", this.selectedChange as EventListener);
    }

    private teardownEvents() {
      document.removeEventListener("click", this.handleOutsideClick);
      this.removeEventListener("remove-all-selected", this.removeAllSelected);
      this.removeEventListener("selected-changed", this.selectedChange as EventListener);
    }

    private setVisualListbox(value: boolean) {
      this.expanded = value;
    }

    private setGroupList(value: any) {
      if (this.groupExpandedList.includes(value)) {
        this.groupExpandedList.splice(this.groupExpandedList.indexOf(value), 1);
        this.groupExpandedList = [...this.groupExpandedList];
      } else {
        if (this.searchItem) this.groupExpandedList.push(value);
        else this.groupExpandedList = [value];
      }
    }

    private findSelectedOption(option: string | OptionMember) {
      if (this.optionId && option) {
        return this.selectedOptions.findIndex(
          (selectedOption) =>
            selectedOption &&
            (selectedOption as OptionMember)[this.optionId] === (option as OptionMember)[this.optionId]
        );
      } else {
        return this.selectedOptions.indexOf(option);
      }
    }

    private findOptionIndex(event: MouseEvent) {
      const eventPath = event.composedPath();
      if (this.checkForVirtualScroll()) {
        let id = "";
        [...this.lists!].forEach((listOption) => {
          if (eventPath.includes(listOption)) {
            id = listOption.id;
          }
        });
        return this.filteredOptions.findIndex((option: any) => this.getOptionId(option) === id);
      } else {
        return [...this.lists!].findIndex((listOption) => eventPath.includes(listOption));
      }
    }
    private checkSelectedOptions() {
      if (this.checkForVirtualScroll()) {
        const selectedOptionIds = this.selectedOptions.map((option) => this.getOptionId(option));
        const updatedLists = [...this.lists!].filter((list) => list.id !== "selectAll");
        updatedLists?.forEach((list: HTMLDivElement) => {
          if (selectedOptionIds.includes(list.id)) {
            if (this.isMulti) {
              list?.setAttribute("aria-checked", "true");
            }
            list?.setAttribute("aria-selected", "true");
          } else if (this.isMulti) {
            list?.setAttribute("aria-checked", "false");
          }
        });
      }
    }
    private unCheckAllOptions() {
      if (this.checkForVirtualScroll() && this.isMulti) {
        [...this.lists!]?.forEach((list: HTMLDivElement) => {
          if (list?.id !== "selectAll") {
            list?.setAttribute("aria-checked", "false");
          }
        });
      }
    }

    private setSelectedOption(option: string | OptionMember) {
      if (!this.isMulti) {
        this.selectedOptions = [];
      }
      const selectedIndex = this.findSelectedOption(option);
      if (selectedIndex !== -1) {
        const removedOption = this.selectedOptions[selectedIndex];
        this.selectedOptions.splice(selectedIndex, 1);
        this.notifySelectedChange({
          value: removedOption,
          selected: this.selectedOptions
        });
      } else {
        this.selectedOptions.push(option);
        this.notifySelectedChange({
          value: option,
          selected: this.selectedOptions
        });
      }
      this.checkSelectedOptions();
      if (this.isMulti && this.allowSelectAll) {
        this.isSelectAllChecked = this.isSelectAllSelected();
      }
      this.requestUpdate();
    }

    private notifySelectedChange = debounce((detail: SelectedEvent) => {
      this.dispatchEvent(
        new CustomEvent<SelectedEvent>("change-selected", {
          composed: true,
          bubbles: true,
          detail
        })
      );
    }, 0);

    private handleGroupFilter = (finalFilteredOption: (string | OptionMember)[]) => {
      const tempGroupExpandedList = finalFilteredOption.filter((item) => {
        if (typeof item !== "string" && item.isLabel === "true") {
          return item.groupName;
        }
      });
      this.searchItem = true;
      this.groupExpandedList = tempGroupExpandedList.map((a) => {
        if (typeof a !== "string") {
          return a.groupName;
        }
      });

      return finalFilteredOption.filter((option: string | OptionMember) => {
        if (typeof option !== "string" && option.isLabel === "true") {
          const isGroupOption = finalFilteredOption.find((option2) => {
            if (typeof option !== "string" && typeof option2 !== "string") {
              return option.groupName === option2.groupName && option2.isLabel === "false";
            }
          });
          return isGroupOption ? true : false;
        } else {
          return true;
        }
      });
    };

    private filterOptions(value: string): (string | OptionMember)[] {
      if (value && value.length) {
        const finalFilteredOption = this.options.filter((option: string | OptionMember) => {
          if (this.isOptGroup && typeof option !== "string" && option.isLabel === "true") {
            return option;
          } else {
            return (this.isCustomContent ? this.getOptionId(option) : this.getOptionValue(option))
              .toLowerCase()
              .includes(value.toLowerCase());
          }
        });

        if (this.isOptGroup) {
          return this.handleGroupFilter(finalFilteredOption);
        } else {
          return finalFilteredOption;
        }
      } else {
        this.searchItem = false;
        return this.options;
      }
    }

    private getListBoxVerticalPadding() {
      if (this.listBox) {
        const computedStyle = window.getComputedStyle(this.listBox, null);
        const paddingTop = parseInt(computedStyle.getPropertyValue("padding-top"));
        const paddingBottom = parseInt(computedStyle.getPropertyValue("padding-bottom"));
        const padding = paddingTop + paddingBottom;

        if (!isNaN(padding)) {
          return padding + 2;
        }
      }

      return 10;
    }

    private resizeListbox() {
      this.updateOnNextFrame(() => {
        let height = 0;
        let labelHeight = 0;
        let virtualizerHeight = 0;
        const verticalPadding: number = this.getListBoxVerticalPadding();
        if (this.lists) {
          const updatedList = this.checkForVirtualScroll()
            ? [...this.lists].filter((list) => list.offsetHeight !== 0)
            : [...this.lists];

          height = updatedList
            .slice(0, this.visibleOptions)
            .reduce((accumulator, option) => accumulator + option.offsetHeight, 0);
          virtualizerHeight =
            this.checkForVirtualScroll() && this.allowSelectAll
              ? updatedList
                  .slice(1, this.visibleOptions)
                  .reduce((accumulator, option) => accumulator + option.offsetHeight, 0)
              : updatedList
                  .slice(0, this.visibleOptions)
                  .reduce((accumulator, option) => accumulator + option.offsetHeight, 0);
        }
        if (this.labels) {
          labelHeight = [...this.labels]
            .slice(0, this.visibleOptions)
            .reduce((accumulator, option) => accumulator + option.offsetHeight, 0);
        }
        if (this.listBox) {
          this.listBox.style.maxHeight = `${height + labelHeight + verticalPadding}px`;
        }

        if (this.virtualizer) {
          this.virtualizer.style.height = `${virtualizerHeight + verticalPadding}px`;
        }
        if (this.showCustomError || this.showLoader) {
          const customContent = this.listBox?.querySelector("[slot]");
          if (this.listBox && customContent) {
            this.listBox.style.height = `${customContent.clientHeight + verticalPadding}px`;
            this.listBox.style.maxHeight = `${customContent.clientHeight + verticalPadding}px`;
          }
        }
      });
    }

    private setInputValue(value = "") {
      this.input!.value = value;
    }

    private updateOnNextFrame(cb: FrameRequestCallback) {
      requestAnimationFrame(cb);
    }

    private unCheckedAllOptions() {
      if (this.isMulti) {
        this.lists!.forEach((list, index) => this.unCheckedOption(index));
        this.isSelectAllChecked = false;
      }
    }

    private unCheckedOption(index: number) {
      if (this.isMulti) {
        this.lists![index].setAttribute("aria-checked", "false");
        this.notifySelectedChange({
          value: this.filteredOptions[index],
          selected: this.selectedOptions
        });
      }
    }

    private checkAllOptions() {
      if (this.isMulti) {
        this.lists!.forEach((list, index) => this.checkOption(index));
      }
    }

    private checkOption(index: number) {
      if (this.isMulti) {
        this.lists![index].setAttribute("aria-checked", "true");
        this.notifySelectedChange({
          value: this.filteredOptions[index],
          selected: this.selectedOptions
        });
      }
    }

    private isSelectAllSelected() {
      return this.selectedOptions.length === this.options.length;
    }

    private setFocusOnHost(force: boolean) {
      if (this.setFocus) {
        this.setFocus(force);
      }
    }

    private isOptionFocused(optionIndex: number) {
      return this.focusedIndex === optionIndex;
    }

    private getAriaState(optionIndex: number) {
      return this.isOptionFocused(optionIndex);
    }

    private scrollToOption() {
      let distance = 0;
      const { top, bottom } = this.listBox!.getBoundingClientRect();
      const option = this.lists![this.focusedIndex];
      const nextOption = (this.lists![this.focusedIndex + 1] || option)?.getBoundingClientRect();
      const prevOption = (this.lists![this.focusedIndex - 1] || option)?.getBoundingClientRect();

      if (nextOption?.bottom > bottom) {
        distance = nextOption.bottom - bottom + 2;
      } else if (prevOption?.top < top) {
        distance = prevOption.top - top - 2;
      }
      this.updateOnNextFrame(() => {
        this.listBox!.scrollTop += distance;
      });
    }

    private getCustomContentName(option: string | OptionMember) {
      const index = this.options.indexOf(option);
      if (this.isOptGroup) {
        const selectedOption = this.options[index];
        if (selectedOption && typeof selectedOption !== "string") {
          return selectedOption.slot;
        }
      } else {
        if (index !== -1) {
          return this.customContent[index].slot;
        }
      }
    }

    private setInputSelectionRange(start: number, end: number) {
      this.input!.setSelectionRange(start, end);
    }

    private isOptionChecked(option: string | OptionMember) {
      if (this.findSelectedOption(option) !== -1) {
        return "true";
      }
      return "false";
    }

    private getInputSelection() {
      return this.input!.selectionStart;
    }

    private canMultiSelect() {
      const inputSelection = this.getInputSelection();
      return inputSelection === 0 && this.selectedOptions.length !== 0 && this.isMulti;
    }

    private removeMultiTag() {
      if (this.selected) {
        this.multiSelected.forEach((index) => {
          const selected = this.selected![index];
          if (selected && selected.hasAttribute("selected")) {
            this.removeSelected(this.selectedOptions[index]);
          }
        });
      }
    }

    private unselectedAllMultiTag() {
      if (this.selected) {
        this.selected.forEach((selected) => selected.removeAttribute("selected"));
      }
      this.multiSelectedIndex = -1;
    }

    private findLastMultiSelected() {
      return this.selected![this.multiSelectedIndex];
    }

    private toggleMultiSelectedTag(selected: HTMLElement | undefined, force: boolean) {
      if (selected) {
        selected.toggleAttribute("selected", force);
      }
    }

    private selectMultiTag(isShiftKey: boolean) {
      if (this.canMultiSelect()) {
        if (!isShiftKey) {
          this.multiSelected = [];
          const oldSelected = this.findLastMultiSelected();
          this.toggleMultiSelectedTag(oldSelected, false);
        }
        if (this.multiSelectedIndex <= 0) {
          this.multiSelectedIndex = this.selectedOptions.length - 1;
        } else {
          this.multiSelectedIndex--;
        }
        this.multiSelected.push(this.multiSelectedIndex);
        const newSelected = this.findLastMultiSelected();
        this.toggleMultiSelectedTag(newSelected, true);
      }
    }

    async handleListClick(event: MouseEvent) {
      this.dispatchEvent(
        new CustomEvent("selected-changed", {
          detail: {
            event
          }
        })
      );
      await this.updateComplete;

      if (this.isMulti) {
        this.setVisualListbox(true);
      } else {
        this.setVisualListbox(false);
      }

      this.updateOnNextFrame(() => {
        this.input!.focus();
        this.focusedGroupIndex = -1;
      });
    }

    async handleSelectAll() {
      this.isSelectAllChecked = !this.isSelectAllChecked;
      if (this.isSelectAllChecked) {
        this.selectedOptions = [...this.options];
        this.checkAllOptions();
      } else {
        this.selectedOptions = [];
        this.unCheckedAllOptions();
      }

      await this.updateComplete;
      this.setVisualListbox(true);
      this.notifySelectedChange({
        selected: this.selectedOptions
      });
    }

    handleInputKeyUp(event: KeyboardEvent) {
      switch (event.code) {
        case Key.Escape: {
          break;
        }
        case Key.Backspace:
          {
            this.setFocusOnHost(true);
            this.setVisualListbox(true);
            this.resizeListbox();
            this.removeMultiTag();
          }
          break;
        case Key.ArrowLeft:
          {
            if (this.isMulti) {
              if (event.shiftKey) {
                this.selectMultiTag(true);
              } else {
                this.selectMultiTag(false);
              }
            }
          }
          break;
        default: {
          if (this.isMulti) {
            this.unselectedAllMultiTag();
          }
          break;
        }
      }
    }

    private notifyInputValueChanged = debounce((value: string) => {
      this.dispatchEvent(
        new CustomEvent("combobox-input", {
          composed: true,
          bubbles: true,
          detail: {
            value
          }
        })
      );

      this.notifySearchResultCount();
      this.focusedGroupIndex = 0;
      requestAnimationFrame(() => {
        this.input!.focus();
        this.focusedGroupIndex = -1;
      });
    }, 250);

    handleInput(event: Event) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.inputValue = inputValue.trim();
      this.notifyInputValueChanged(inputValue.trim());
    }

    private removeAllSelected() {
      this.focusedIndex = -1;
      this.focusedGroupIndex = -1;
      this.selectedOptions = [];
      this.inputValue = "";
      this.setInputValue();
      this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, "");
      this.setVisualListbox(false);
      this.unCheckedAllOptions();
      this.setSelectedAttribute(undefined);
      this.updateOnNextFrame(() => {
        this.input!.focus();
      });
      this.notifySelectedChange({
        selected: this.selectedOptions
      });
    }

    private removeSelected(option: string | OptionMember) {
      const index = this.findSelectedOption(option);
      const checkedOptionIndex = this.filteredOptions.indexOf(option);

      if (checkedOptionIndex !== -1) {
        this.unCheckedOption(checkedOptionIndex);
      }
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
        this.requestUpdate();
      }
      this.updateOnNextFrame(() => {
        this.input!.focus();
        this.focusedGroupIndex = -1;
      });
    }

    private selectedChange(event: CustomEvent<{ event: MouseEvent }>) {
      const { event: clickEvent } = event.detail;
      let optionIndex = this.findOptionIndex(clickEvent);
      if (optionIndex !== -1) {
        this.focusedIndex = this.allowSelectAll && this.checkForVirtualScroll() ? optionIndex + 1 : optionIndex;
        if (this.isMulti && this.allowSelectAll && !this.checkForVirtualScroll()) {
          optionIndex = optionIndex - 1;
        }
        const option = this.getFocusedItem(optionIndex);
        this.setSelectedAttribute(option);
        if (option) {
          this.setSelectedOption(option);
          if (!this.isMulti) {
            this.setInputValue(this.getOptionValue(option));
            this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
          } else if (this.isMulti && this.allowSelectAll) {
            this.isSelectAllChecked = this.isSelectAllSelected();
          }
        }
      }
    }

    private setSelectedAttribute(option: string | OptionMember | undefined) {
      let optionId = "";
      if (option) {
        optionId = this.getOptionId(option);
      }
      this.lists?.forEach((list, _index) => {
        if (list?.id === optionId) {
          list?.setAttribute("selected", "true");
        } else {
          list?.setAttribute("selected", "false");
        }
      });
    }

    private shouldChangeButton() {
      const shouldChange =
        (this.input && this.input.value.length > 0 && !this.noClearIcon) ||
        (this.isMulti && this.selectedOptions.length && !this.noClearIcon);
      if (shouldChange) {
        document.dispatchEvent(new CustomEvent("on-widget-update"));
      }
      return shouldChange;
    }

    private setCustomValue() {
      if (!this.optionId && !this.optionValue) {
        this.options = [...this.options, this.inputValue];

        this.setSelectedOption(this.inputValue);

        if (!this.isMulti) {
          this.updateOnNextFrame(() => {
            this.focusedIndex = this.filteredOptions.length - 1;
            const option = this.getFocusedItem(this.focusedIndex);
            if (option) {
              this.setInputValue(this.getOptionValue(option));
              this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
            }
          });
        }

        this.dispatchEvent(
          new CustomEvent("custom-value-add", {
            composed: true,
            bubbles: true,
            detail: {
              value: this.inputValue
            }
          })
        );
      }
      this.inputValue = "";
    }

    handleGroupFocus() {
      this.setFocusOnHost(false);
      if (!this.expanded) {
        this.setVisualListbox(true);
      }
      if (this.filteredGroupOptions.length > 0 && this.focusedGroupIndex === -1) {
        this.focusedGroupIndex = this.filteredGroupOptions.findIndex((item) => {
          return typeof item !== "string" && item.groupName === this.groupExpandedList[0];
        });
      }
      this.updateOnNextFrame(() => {
        if (
          this.focusedGroupIndex === -1 ||
          (!this.allowSelectAll && this.focusedGroupIndex >= this.filteredGroupOptions.length - 1) ||
          (this.allowSelectAll && this.focusedGroupIndex >= this.filteredGroupOptions.length)
        ) {
          this.focusedGroupIndex = 0;
        } else {
          this.focusedGroupIndex++;
        }
      });
      this.focusedIndex = -1;
    }

    handleInputKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case Key.Backspace:
          {
            this.focusedIndex = -1;
          }
          break;
        case Key.Tab:
        case Key.Enter:
          {
            this.setFocusOnHost(true);
            if (this.expanded) {
              this.updateOnNextFrame(() => {
                const option = this.getFocusedItem(!this.allowSelectAll ? this.focusedIndex : this.focusedIndex - 1);
                if (this.allowCustomValue && this.input && this.input.value.length) {
                  const isOptionAlreadyExist = this.findFilteredOption(this.inputValue) === -1;
                  if (isOptionAlreadyExist) {
                    this.setCustomValue();
                    return;
                  }
                }
                if (option) {
                  this.setSelectedAttribute(option);
                  this.setSelectedOption(option);
                  if (!this.showSelectedCount) {
                    this.setInputValue(this.getOptionValue(option));
                    this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
                  }
                }
                if (this.isMulti && this.allowSelectAll && this.focusedIndex === 0) {
                  this.handleSelectAll();
                }
              });
            }
            this.setVisualListbox(false);
            if (event.code === Key.Tab && this.isMulti) {
              return;
            }
          }
          break;
        case Key.ArrowDown:
          {
            if (this.isOptGroup && this.filteredOptions.length === 0) {
              this.handleGroupFocus();
              return;
            }
            this.setFocusOnHost(false);
            if (!this.expanded) {
              this.setVisualListbox(true);
            }
            this.updateOnNextFrame(() => {
              if (
                this.focusedIndex === -1 ||
                (!this.allowSelectAll && this.focusedIndex >= this.filteredOptions.length - 1) ||
                (this.allowSelectAll && this.focusedIndex >= this.filteredOptions.length)
              ) {
                this.focusedIndex = 0;
              } else {
                this.focusedIndex++;
              }
              const option = this.getFocusedItem(this.focusedIndex);
              this.groupExpandedList = [this.getOptionGroupName(option)];
              if (!this.showSelectedCount && option) {
                this.setInputValue(this.getOptionValue(option));
                this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
              }
              this.focusedGroupIndex = -1;
            });
          }
          break;
        case Key.ArrowUp:
          {
            if (this.isOptGroup && this.filteredOptions.length === 0) {
              this.handleGroupFocus();
              return;
            }
            this.setFocusOnHost(false);
            if (!this.expanded) {
              this.setVisualListbox(true);
            }
            this.updateOnNextFrame(() => {
              if (this.focusedIndex <= 0) {
                this.focusedIndex = !this.allowSelectAll
                  ? this.filteredOptions.length - 1
                  : this.filteredOptions.length;
              } else {
                this.focusedIndex--;
              }
              const option = this.getFocusedItem(this.focusedIndex);
              this.groupExpandedList = [this.getOptionGroupName(option)];
              if (option && !this.showSelectedCount) {
                this.setInputValue(this.getOptionValue(option));
                this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
                this.focusedGroupIndex = -1;
              }
            });
          }
          break;
        case Key.ArrowLeft:
        case Key.ArrowRight:
          {
            event.stopPropagation();
          }
          break;
        case Key.Escape:
          {
            this.setFocusOnHost(true);
            if (this.expanded) {
              event.stopPropagation();
              this.setVisualListbox(false);
            } else {
              this.setInputValue();
              this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, "");
              this.focusedIndex = -1;
              this.focusedGroupIndex = -1;
              this.removeAllSelected();
              this.setSelectedAttribute(undefined);
            }
          }
          break;
        case Key.Home:
          {
            this.setInputSelectionRange(0, 0);
          }
          break;
        case Key.End:
          {
            const { length } = this.inputValue;
            this.setInputSelectionRange(length, length);
          }
          break;
        case Key.Space: {
          if (this.isMulti && this.expanded) {
            event.preventDefault();
            const option = this.getFocusedItem(!this.allowSelectAll ? this.focusedIndex : this.focusedIndex - 1);
            if (option) {
              this.setSelectedOption(option);
              this.setSelectedAttribute(option);
              if (!this.showSelectedCount) {
                this.setInputValue();
                this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, "");
              }
            }
            if (this.focusedIndex === 0 && this.allowSelectAll) {
              this.handleSelectAll();
            }
          }
          this.expanded = true;
          break;
        }
        default: {
          break;
        }
      }
    }

    handleGroupLabelKeyDown(event: KeyboardEvent, option: OptionMember) {
      switch (event.code) {
        case Key.Tab:
          {
            this.handleGroupFocus();
          }
          break;
        case Key.Enter:
        case Key.Space:
          {
            if (this.focusedGroupIndex !== -1) {
              this.toggleGroupListBox(event, option.value);
            } else {
              this.setFocusOnHost(true);
              this.setVisualListbox(false);
              this.updateOnNextFrame(() => {
                const option = this.getFocusedItem(!this.allowSelectAll ? this.focusedIndex : this.focusedIndex - 1);
                if (option) {
                  this.setSelectedOption(option);
                  if (!this.showSelectedCount) {
                    this.setInputValue(this.getOptionValue(option));
                    this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
                    this.updateOnNextFrame(() => {
                      this.input!.focus();
                      this.focusedGroupIndex = -1;
                    });
                  }
                }
                if (this.isMulti && this.allowSelectAll && this.focusedIndex === 0) {
                  this.handleSelectAll();
                }
              });
            }
          }
          break;
        case Key.ArrowDown:
          {
            if (this.filteredOptions.length === 0) {
              return;
            }
            this.setFocusOnHost(false);
            this.updateOnNextFrame(() => {
              if (
                this.focusedIndex === -1 ||
                (!this.allowSelectAll && this.focusedIndex >= this.filteredOptions.length - 1) ||
                (this.allowSelectAll && this.focusedIndex >= this.filteredOptions.length)
              ) {
                this.focusedIndex = 0;
              } else {
                this.focusedIndex++;
              }
              const option = this.getFocusedItem(this.focusedIndex);
              this.groupExpandedList = [this.getOptionGroupName(option)];
              if (!this.showSelectedCount && option) {
                this.setInputValue(this.getOptionValue(option));
                this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(option));
              }
              this.focusedGroupIndex = -1;
            });
          }
          break;
        case Key.ArrowUp:
          {
            if (this.isOptGroup && this.filteredOptions.length === 0) {
              return;
            }
            this.setFocusOnHost(false);
            this.updateOnNextFrame(() => {
              if (this.focusedIndex <= 0) {
                this.focusedIndex = !this.allowSelectAll
                  ? this.filteredOptions.length - 1
                  : this.filteredOptions.length;
              } else {
                this.focusedIndex--;
              }
              const item = this.getFocusedItem(this.focusedIndex);
              this.groupExpandedList = [this.getOptionGroupName(item)];
              if (item && !this.showSelectedCount) {
                this.setInputValue(this.getOptionValue(item));
                this.input?.setAttribute(ATTRIBUTES.AriaActivedescendant, this.getOptionId(item));
              }
            });
          }
          break;
        case Key.Escape:
          {
            this.focusedGroupIndex = -1;
            this.setVisualListbox(false);
            this.setFocusOnHost(true);
            this.input!.focus();
          }
          break;
        default: {
          this.setVisualListbox(true);
          break;
        }
      }
    }

    toggleVisualListBox(e: any) {
      if (this.readOnly) {
        return;
      }
      if (e.target.classList.contains("md-combobox-listbox")) {
        e.target.focus();
      } else if (e.target.localName === "md-icon") {
        const parentElement = e.target.parentElement?.parentElement?.parentElement;
        if (parentElement) {
          const input = parentElement.querySelector(".md-combobox-listbox");
          setTimeout(() => {
            input.focus();
          }, 10);
        }
      }
      if (this.expanded) {
        this.setVisualListbox(false);
      } else {
        // While open combo-box
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
      this.setGroupList("");
      this.focusedGroupIndex = -1;
    }

    toggleGroupListBox(e: Event, data: string) {
      e.stopPropagation();
      this.focusedGroupIndex = this.filteredGroupOptions.findIndex((item) => {
        return typeof item !== "string" && item.groupName === data;
      });
      this.setGroupList(data);
      this.resizeListbox();
    }

    handleRemoveAll(event: MouseEvent) {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent("remove-all-selected"));
    }

    handleOutsideClick = (event: MouseEvent) => {
      let insideInputClick = false;
      const path = event.composedPath();
      if (path.length) {
        insideInputClick = !!path.find((element) => element === this);
        if (!insideInputClick) {
          this.setVisualListbox(false);
          this.unselectedAllMultiTag();
        }
      }
    };

    connectedCallback() {
      super.connectedCallback();
      this.setupEvents();
      const isOptGroup = this.querySelector("optgroup");
      if (isOptGroup) this.isOptGroup = true;
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.teardownEvents();
    }

    static get styles() {
      return [reset, styles];
    }

    get listItemOptionMap() {
      return {
        "md-combobox-multiselect": this.isMulti,
        compact: this.compact
      };
    }

    get filteredOptions() {
      return this.filterOptions(this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue).filter(
        (options: string | OptionMember) => {
          if (this.isOptGroup) {
            if (typeof options !== "string" && this.groupExpandedList.includes(this.getOptionGroupName(options))) {
              return options.isLabel === "false";
            }
          } else {
            return true;
          }
        }
      );
    }

    get filteredGroupOptions() {
      return this.filterOptions(this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue).filter(
        (options: string | OptionMember) => {
          if (this.isOptGroup) {
            if (typeof options !== "string") {
              return options.isLabel === "true";
            }
          } else {
            return true;
          }
        }
      );
    }

    get comboBoxTemplateClassMap() {
      return {
        [`md-combobox--${this.shape}`]: !!this.shape,
        "md-combobox-searchable": this.searchable,
        "md-combobox-has-leading-icon": this.searchable || this.showFilterIcon,
        "md-new-combobox": this.newMomentum,
        [`md-${this.messageType}`]: !!this.messageType,
        "md-combobox-readonly": this.readOnly,
        "md-combobox-compact": this.compact
      };
    }

    searchIconTemplate() {
      return this.leadingIconTemplate("search-bold", "search-icon");
    }

    filterIconTemplate() {
      return this.leadingIconTemplate("filter-bold", "filter-icon");
    }

    leadingIconTemplate(iconName: string, iconClass: string) {
      return html`
        <md-icon
          name=${iconName}
          class=${iconClass}
          size="16"
          iconSet="momentumDesign"
          @click=${this.toggleVisualListBox}
        ></md-icon>
      `;
    }

    selectedOptionTemplate(selectedOption: string | OptionMember) {
      return html`
        <div class="md-combobox-selected-item">
          <span>${this.getOptionValue(selectedOption)}</span>
          <md-icon
            class="remove-item"
            name="cancel-bold"
            size=${this.newMomentum ? "16" : "8"}
            iconSet="momentumDesign"
            @click=${() => this.removeSelected(selectedOption)}
          ></md-icon>
        </div>
      `;
    }

    clearButtonTemplate() {
      return html`
        <button
          type="button"
          class="md-combobox-button clear"
          aria-label=${this.clearAriaLabel}
          aria-controls="md-combobox-listbox"
          tabindex="0"
          ?disabled=${this.disabled}
          ?readonly=${this.readOnly}
          @click=${this.handleRemoveAll}
        >
          <md-icon
            class="md-input__icon-clear"
            name="cancel-bold"
            size="14"
            iconSet="momentumDesign"
            style="height: ${this.clearIconHeight};"
          ></md-icon>
        </button>
      `;
    }

    arrowButtonTemplate() {
      return html`
        <button
          type="button"
          class="md-combobox-button arrow-down"
          aria-expanded=${this.expanded}
          aria-label=${ifDefined(this.popupChevronAriaHidden === "true" ? undefined : this.arrowAriaLabel)}
          aria-controls="md-combobox-listbox"
          tabindex="-1"
          aria-hidden=${ifDefined(this.popupChevronAriaHidden === "true" ? "true" : undefined)}
          ?disabled=${this.disabled}
          ?readonly=${this.readOnly}
          @click=${this.toggleVisualListBox}
        >
          <md-icon name="arrow-down-bold" size="16" iconSet="momentumDesign"></md-icon>
        </button>
      `;
    }

    groupArrowButtonTemplate(data: string) {
      const iconName = this.groupExpandedList.includes(data) ? "arrow-up-bold" : "arrow-down-bold";
      return html`
        <button
          type="button"
          class="md-combobox-button"
          aria-label=${ifDefined(this.popupChevronAriaHidden === "true" ? undefined : this.arrowAriaLabel)}
          aria-controls="md-combobox-listbox"
          tabindex="-1"
          aria-hidden=${this.popupChevronAriaHidden === "true" ? "true" : "false"}
          ?disabled=${this.disabled}
          ?readonly=${this.readOnly}
          @click=${(e: MouseEvent) => this.toggleGroupListBox(e, data)}
        >
          <span>
            <md-icon name=${iconName} size="12" iconSet="momentumDesign"></md-icon>
          </span>
        </button>
      `;
    }

    getSelectAllOption() {
      const ariaLabelForCount = this.checkForVirtualScroll() ? `, 1 of ${this.options.length + 1}` : "";
      return html`
        <div
          id="selectAll"
          part="combobox-option"
          class="md-combobox-option ${classMap(this.listItemOptionMap)}"
          @click=${this.handleSelectAll}
          aria-label="${this.selectAllTextLocalization}${ariaLabelForCount}"
          aria-checked=${ifDefined(this.isSelectAllChecked ? "true" : undefined)}
          role="checkbox"
        >
          <span class="select-option" aria-hidden="true">
            <md-icon name="check-bold" size="14" iconSet="momentumDesign"></md-icon>
          </span>

          <span part="label" class="select-label" aria-hidden="true">${this.selectAllTextLocalization}</span>
        </div>
      `;
    }

    getSelctedCount() {
      if (this.selectedOptions.length === 0) {
        return nothing;
      } else if (this.isSelectAllSelected()) {
        return html` <span class="selected-count">${this.allTextLocalization}</span> `;
      }
      return html`
        <span class="selected-count">${this.selectedOptions.length} ${this.selectedTextLocalization}</span>
      `;
    }
    checkForVirtualScroll() {
      return this.useVirtualScroll && !this.isOptGroup;
    }

    rangeChanged() {
      this.updateFocusedIndex(this.focusedIndex);
      this.checkSelectedOptions();
      this.resizeListbox();
    }

    getCustomErrorContent() {
      const element = this.querySelector("[slot]") || this.shadowRoot!.querySelector("[slot]");
      return document.createRange().createContextualFragment(`${element?.outerHTML}`);
    }

    getCustomContent(option: string | OptionMember) {
      const slotName = this.getCustomContentName(option);
      if (this.isOptGroup) {
        const slot = [...this.querySelectorAll(`[slot]`)].find((element) => element.slot === slotName);
        if (slot) {
          return document.createRange().createContextualFragment(`${slot.outerHTML}`);
        } else {
          return html``;
        }
      } else {
        return html` <slot name=${ifDefined(slotName)}></slot> `;
      }
    }

    renderGroupLabelHeader(option: OptionMember, optionIndex: number) {
      return html`
        <div
          part="group-label"
          class="group-label"
          role="listbox"
          aria-controls="md-combobox-listbox"
          aria-label=${option.value}
          @click=${(e: MouseEvent) => this.toggleGroupListBox(e, option.value)}
          @keydown=${(e: KeyboardEvent) => {
            this.handleGroupLabelKeyDown(e, option);
          }}
          tabindex="1"
          aria-selected=${this.getAriaState(optionIndex)}
        >
          <span part="group-label">${option.value}</span>
          ${this.groupArrowButtonTemplate(option.value)}
        </div>
      `;
    }

    renderWithoutVirtualScroll() {
      return repeat(
        this.filterOptions(this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue),
        (option: string | OptionMember) => this.getOptionId(option),
        (option: string | OptionMember, optionIndex) => {
          if (typeof option !== "string" && this.isOptGroup && option.isLabel === "true") {
            return this.renderGroupLabelHeader(option, optionIndex);
          } else if (!(this.isOptGroup && !this.groupExpandedList.includes(this.getOptionGroupName(option)))) {
            return this.renderItem(option, optionIndex);
          }
        }
      );
    }

    highlightingSearchedText(option: OptionMember | string) {
      return findHighlight(
        this.getOptionValue(option),
        this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue
      ).map(({ text, matching }) =>
        matching
          ? html` <span class="highlight-text" part="select-label">${text}</span> `
          : html` <span class="selected-label-text" part="select-label">${text}</span> `
      );
    }

    addStyle() {
      const isInvisible = this.expanded
        ? this.options.length && this.filteredOptions.length === 0 && this.inputValue && this.allowCustomValue
        : true;
      if (!this.checkForVirtualScroll()) {
        return styleMap({
          display: isInvisible ? "none" : "block",
          "z-index": "99",
          overflow: "auto"
        });
      } else {
        return styleMap({
          visibility: isInvisible ? "hidden" : "visible",
          "z-index": isInvisible ? "-1" : "99",
          overflow: "hidden"
        });
      }
    }

    renderItem(option: OptionMember | string, index: number) {
      const count = this.allowSelectAll ? index + 2 : index + 1;
      const total = this.allowSelectAll ? this.options.length + 1 : this.options.length;
      const ariaLabelForCount = this.checkForVirtualScroll() ? `, ${count} of ${total}` : "";
      return html`
        <div
          id=${this.getOptionId(option)}
          title="${this.getOptionValue(option)}"
          part="combobox-option"
          class="md-combobox-option"
          aria-posinset=${count}
          aria-setsize=${total}
          role=${this.isMulti ? "checkbox" : "listitem"}
          aria-label="${this.isCustomContent
            ? this.getOptionId(option)
            : this.getOptionValue(option)}${ariaLabelForCount}"
          tabindex="-1"
          @click=${this.handleListClick}
          aria-checked=${ifDefined(this.isMulti ? this.isOptionChecked.call(this, option) : undefined)}
        >
          ${this.isMulti
            ? html`
                <span class="select-option" aria-hidden="true">
                  <md-icon name="check-bold" size="14" iconSet="momentumDesign"></md-icon>
                </span>
              `
            : nothing}
          <span part="label" class="select-label" aria-hidden="true">
            ${this.isCustomContent ? this.getCustomContent(option) : this.highlightingSearchedText(option)}
          </span>
        </div>
      `;
    }

    inputTitle() {
      if (this.isMulti) {
        // For multi select, The title should be the selected items count
        return this.selectedOptions.length > 0
          ? `${this.selectedOptions.length} ${this.selectedTextLocalization}`
          : this.placeholder;
      }
      return this.selectedOptions.length > 0 ? this.getOptionValue(this.selectedOptions[0]) : this.placeholder;
    }

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
            <div id="${this.htmlId}-message" part="message" class="md-combobox__messages">
              ${repeat(this.messages, (message, id) => {
                return html`
                  <md-help-text
                    .message=${message}
                    .id=${this.messageArr[id].id || ""}
                    .ariaLive=${this.messageArr[id].ariaLive || "polite"}
                    .messageType=${this.messageType as ComboBox.MessageType}
                  ></md-help-text>
                `;
              })}
            </div>
          `
        : nothing;
    }

    get renderNewMomentumArrow(): TemplateResult {
      return html`
        ${this.isDropdownArrow
          ? this.arrowButtonTemplate()
          : html`<div class="md-combobox-right-arrow">${this.arrowButtonTemplate()}</div>`}
      `;
    }

    render() {
      return html`
        <div part="combobox" class="md-combobox md-combobox-list ${classMap(this.comboBoxTemplateClassMap)}">
          <div part="group" class="group ${classMap(this.listItemOptionMap)}">
            ${this.searchable ? this.searchIconTemplate() : this.showFilterIcon ? this.filterIconTemplate() : nothing}
            <div class="md-combobox__multiwrap" part="multiwrap">
              ${this.isMulti
                ? this.isMulti && !this.showSelectedCount
                  ? repeat(this.selectedOptions, (selectedOption) => this.selectedOptionTemplate(selectedOption))
                  : this.getSelctedCount()
                : nothing}
              <input
                id=${ifDefined(this.comboboxId || undefined)}
                class="md-combobox-listbox"
                type="text"
                role="combobox"
                aria-autocomplete="both"
                aria-label=${this.ariaLabelForComboBox}
                part="multiwrap-input"
                aria-expanded=${this.expanded}
                placeholder=${this.isMulti && this.showSelectedCount && this.selectedOptions.length !== 0
                  ? ""
                  : this.placeholder}
                aria-controls="md-combobox-listbox"
                ?readonly=${this.allowSelectAll || this.readOnly}
                ?disabled=${this.disabled}
                ?autofocus=${this.autofocus}
                title=${ifDefined(this.inputTitle())}
                .value=${this.inputValue}
                @click=${this.toggleVisualListBox}
                @input=${this.handleInput}
                @keyup=${this.handleInputKeyUp}
                @keydown=${this.handleInputKeyDown}
              />
            </div>
            ${this.compact
              ? nothing
              : this.shouldChangeButton()
                ? this.clearButtonTemplate()
                : !this.newMomentum
                  ? this.arrowButtonTemplate()
                  : nothing}
            ${this.newMomentum ? this.renderNewMomentumArrow : nothing}
          </div>

          ${this.showLoader || this.showCustomError
            ? html`
                <div
                  id="md-combobox-listbox"
                  part="combobox-options"
                  aria-label=${this.ariaLabel}
                  style=${styleMap({
                    display: this.expanded ? "block" : "none",
                    "z-index": "99"
                  })}
                >
                  ${this.getCustomErrorContent()}
                </div>
              `
            : html`
                <div
                  id="md-combobox-listbox"
                  part="combobox-options"
                  aria-label=${this.ariaLabel || this.label}
                  style=${this.addStyle()}
                  role=${ifDefined(this.checkForVirtualScroll() ? undefined : "list")}
                >
                  ${this.isMulti && this.allowSelectAll && this.expanded ? this.getSelectAllOption() : nothing}
                  ${!this.checkForVirtualScroll()
                    ? this.renderWithoutVirtualScroll()
                    : this.options.length !== 0 &&
                        this.filterOptions(this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue)
                          .length > 0
                      ? html`
                          <div class="virtual-scroll" @rangechange=${this.rangeChanged}>
                            ${scroll({
                              items: this.filterOptions(
                                this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue
                              ),
                              renderItem: (item: string | OptionMember, index?: number) =>
                                this.renderItem(item, index || 0),
                              useShadowDOM: false,
                              scrollToIndex: {
                                index: this.focusedIndex,
                                position: this.focusedIndex === -1 ? "start" : "center"
                              }
                            })}
                          </div>
                        `
                      : nothing}
                  ${this.options.length &&
                  this.filteredOptions.length === 0 &&
                  this.inputValue &&
                  !this.allowCustomValue
                    ? html`
                        <div class="no-result md-combobox-option" role="option" aria-selected="false" tabindex="-1">
                          ${this.resultsTextLocalization.trim()}
                        </div>
                      `
                    : nothing}
                  ${this.options.length === 0
                    ? html`
                        <div class="no-result md-combobox-option" role="option" aria-selected="false" tabindex="-1">
                          ${this.optionsTextLocalization.trim()}
                        </div>
                      `
                    : nothing}
                </div>
              `}
        </div>
        ${this.invalid
          ? html`
              <div part="message" class="md-combobox-error ${classMap({ "md-new-combobox-error": this.newMomentum })}">
                <md-help-text .message=${this.invalidText} messageType="error"></md-help-text>
              </div>
            `
          : nothing}
        ${this.messagesTemplate()} ${this.helpTextTemplate()}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-combobox": ComboBox.ELEMENT;
  }
}
