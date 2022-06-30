/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/help-text/HelpText";
import "@/components/icon/Icon";
import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { debounce, findHighlight } from "@/utils/helpers";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { repeat } from "lit-html/directives/repeat";
import { styleMap } from "lit-html/directives/style-map";
import { setTimeout } from "timers";
import styles from "./scss/module.scss";

export namespace ComboBox {
  type OptionMember = { [key: string]: string };
  type SelectedEvent = {
    value?: string | OptionMember;
    selected: (string | OptionMember)[];
  };

  @customElementWithCheck("md-combobox")
  export class ELEMENT extends FocusMixin(LitElement) {
    private _focusedIndex = -1;

    @property({ type: String }) label = "Options";
    @property({ type: Array }) options: (string | OptionMember)[] = [];
    @property({ type: Array, attribute: "custom-options" }) customOptions = [];
    @property({ type: String }) placeholder = "";
    @property({ type: Boolean, attribute: "is-multi" }) isMulti = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) ordered = false;
    @property({ type: Boolean, reflect: true }) expanded = false;
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

    @property({ type: String, attribute: "aria-label" }) ariaLabel = "Combobox Input";
    @property({ type: String, attribute: "clear-aria-label" }) clearAriaLabel = "Clear";
    @property({ type: String, attribute: "arrow-aria-label" }) arrowAriaLabel = "Expand";

    @property({ type: String, attribute: "all-i18n" }) allTextLocalization = "All";
    @property({ type: String, attribute: "select-all-i18n" }) selectAllTextLocalization = "Select All";
    @property({ type: String, attribute: "selected-all-i18n" }) selectedTextLocalization = "Selected";

    @property({ type: Boolean, attribute: "allow-select-all", reflect: true }) allowSelectAll = false;
    @property({ type: Boolean, attribute: "show-custom-error", reflect: true }) showCustomError = false;
    @property({ type: Boolean, attribute: "show-selected-count", reflect: true }) showSelectedCount = false;

    @property({ type: Number, attribute: false })
    @internalProperty() 
    private isOptGroup = false;
    @internalProperty()
    private isSelectAllChecked = false;
    get focusedIndex() {
      return this._focusedIndex;
    }
    set focusedIndex(index: number) {
      const oldIndex = this._focusedIndex;
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
      this._focusedIndex = index;
      this.requestUpdate("focusedIndex", oldIndex);
    }

    private multiSelectedIndex = -1;
    private multiSelected: number[] = [];
    private customContent: Element[] = [];

    @query(".group") group?: HTMLDivElement;
    @query(".md-combobox-listbox") input?: HTMLInputElement;
    @query(".md-combobox-button") button?: HTMLButtonElement;
    @query("ul[role='listbox'") listBox?: HTMLUListElement;

    @queryAll("li[role='option']") lists?: HTMLLIElement[];
    @queryAll(".group-label") labels?: HTMLLIElement[];
    @queryAll(".md-combobox-selected-item") selected?: HTMLDivElement[];

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.setAttribute("tabindex", "0");
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
        }
      }
      if (changedProperties.has("focusedIndex")) {
        if (this.focusedIndex >= 0) {
          this.scrollToOption();
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
    }

    protected handleFocusIn(event: Event) {
      if (!this.disabled) {
        requestAnimationFrame(() => {
          this.input!.focus();
        });

        if (this.selectWhenInFocus) {
          this.input!.select();
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
          filteredOption =>
            this.getOptionId(filteredOption) === this.getOptionId(option) &&
            this.getOptionValue(filteredOption) === this.getOptionValue(option)
        );
      }
      return this.filteredOptions.indexOf(option);
    }

    private setInitialValue() {
      if (this.value.length) {
        if (this.isMulti) {
          this.value.forEach(v => {
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
            this.focusedIndex = selectedIndex;
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
        let final = [];
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
          this.options = this.customContent.map(content => {
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

    private findSelectedOption(option: string | OptionMember) {
      if (this.optionId && option) {
        return this.selectedOptions.findIndex(
          selectedOption =>
            selectedOption &&
            (selectedOption as OptionMember)[this.optionId] === (option as OptionMember)[this.optionId]
        );
      } else {
        return this.selectedOptions.indexOf(option);
      }
    }

    private findOptionIndex(event: MouseEvent) {
      const eventPath = event.composedPath();
      return [...this.lists!].findIndex(listOption => eventPath.includes(listOption));
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
          return finalFilteredOption.filter((option: string | OptionMember) => {
            if (typeof option !== "string" && option.isLabel === "true") {
              const isGroupOption = finalFilteredOption.find(option2 => {
                if (typeof option !== "string" && typeof option2 !== "string") {
                  return option.groupName === option2.groupName && option2.isLabel === "false";
                }
              });
              return isGroupOption ? true : false;
            } else {
              return true;
            }
          });
        } else {
          return finalFilteredOption;
        }
      } else {
        return this.options;
      }
    }

    private resizeListbox() {
      this.updateOnNextFrame(() => {
        if (this.lists) {
          const height = [...this.lists]
            .slice(0, this.visibleOptions)
            .reduce((accumulator, option) => accumulator + option.offsetHeight, 0);

          if (this.listBox) {
            this.listBox.style.maxHeight = `${height}px`;
          }
        }
        if (this.labels && this.lists) {
          const labelHeight = [...this.labels]
            .slice(0, this.visibleOptions)
            .reduce((accumulator, option) => accumulator + option.offsetHeight, 0);
          const height = [...this.lists]
            .slice(0, this.visibleOptions)
            .reduce((accumulator, option) => accumulator + option.offsetHeight, 0);
          if (this.listBox) {
            this.listBox.style.maxHeight = `${height + labelHeight}px`;
          }
        }
        if (this.showCustomError) {
          const errorContent = this.listBox?.querySelector("[slot]");
          if (this.listBox && errorContent) {
            this.listBox.style.height = `${errorContent.clientHeight}px`;
            this.listBox.style.maxHeight = `${errorContent.clientHeight}px`;
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

      if (nextOption.bottom > bottom) {
        distance = nextOption.bottom - bottom + 2;
      } else if (prevOption.top < top) {
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
        this.multiSelected.forEach(index => {
          const selected = this.selected![index];
          if (selected && selected.hasAttribute("selected")) {
            this.removeSelected(this.selectedOptions[index]);
          }
        });
      }
    }

    private unselectedAllMultiTag() {
      if (this.selected) {
        this.selected.forEach(selected => selected.removeAttribute("selected"));
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
      });
    }

    async handleSelectAll() {
      if (this.selectedOptions.length === 0 || this.isSelectAllSelected()) {
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
    }

    handleInputKeyUp(event: KeyboardEvent) {
      switch (event.code) {
        case Key.Escape: {
          return;
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
    }, 250);

    handleInput(event: Event) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.inputValue = inputValue;
      this.notifyInputValueChanged(inputValue);
    }

    private removeAllSelected() {
      this.focusedIndex = -1;
      this.selectedOptions = [];
      this.inputValue = "";
      this.setInputValue();
      this.setVisualListbox(false);
      this.unCheckedAllOptions();
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
      });
    }

    private selectedChange(event: CustomEvent<{ event: MouseEvent }>) {
      const { event: clickEvent } = event.detail;
      let optionIndex = this.findOptionIndex(clickEvent);
      if (optionIndex !== -1) {
        this.focusedIndex = optionIndex;
        if (this.isMulti && this.allowSelectAll) {
          optionIndex = optionIndex - 1;
        }
        const option = this.getFocusedItem(optionIndex);
        if (option) {
          this.setSelectedOption(option);
          if (!this.isMulti) {
            this.setInputValue(this.getOptionValue(option));
          } else if (this.isMulti && this.allowSelectAll) {
            this.isSelectAllChecked = this.isSelectAllSelected();
          }
        }
      }
    }

    private shouldChangeButton() {
      return (
        (this.input && this.input.value.length > 0 && !this.noClearIcon) ||
        (this.isMulti && this.selectedOptions.length && !this.noClearIcon)
      );
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
            this.setVisualListbox(false);
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
                this.setSelectedOption(option);
                if (!this.showSelectedCount) {
                  this.setInputValue(this.getOptionValue(option));
                }
              }
              if (this.isMulti && this.allowSelectAll && this.focusedIndex === 0) {
                this.handleSelectAll();
              }
            });
          }
          break;
        case Key.ArrowDown:
          {
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
              if (!this.showSelectedCount && option) {
                this.setInputValue(this.getOptionValue(option));
              }
            });
          }
          break;
        case Key.ArrowUp:
          {
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
              if (option && !this.showSelectedCount) {
                this.setInputValue(this.getOptionValue(option));
              }
            });
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
              this.focusedIndex = -1;
              this.removeAllSelected();
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
          if (this.isMulti) {
            event.preventDefault();
            const option = this.getFocusedItem(!this.allowSelectAll ? this.focusedIndex : this.focusedIndex - 1);
            if (option) {
              this.setSelectedOption(option);
              if (!this.showSelectedCount) this.setInputValue();
            }
            if (this.focusedIndex === 0 && this.allowSelectAll) {
              this.handleSelectAll();
            }
          }
          break;
        }
        default: {
          this.setVisualListbox(true);
          break;
        }
      }
    }

    toggleVisualListBox(e: any) {
      if (e.target.classList.contains("md-combobox-listbox")) {
        e.target.focus();
      } else if(e.target.localName === "md-icon") {
        const parentElement = e.target.parentElement?.parentElement?.parentElement;
        if(parentElement) {
          const input = parentElement.querySelector(".md-combobox-listbox");
          setTimeout(() => {
            input.focus();
          }, 10)
        }
      }
      if (this.expanded) {
        this.setVisualListbox(false);
      } else {
        this.setVisualListbox(true);
      }
      this.input!.focus();
    }

    handleRemoveAll(event: MouseEvent) {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent("remove-all-selected"));
    }

    handleOutsideClick = (event: MouseEvent) => {
      let insideInputClick = false;
      const path = event.composedPath();
      if (path.length) {
        insideInputClick = !!path.find(element => element === this);
        if (!insideInputClick) {
          this.setVisualListbox(false);
          this.unselectedAllMultiTag();
        }
      }
    };

    connectedCallback() {
      super.connectedCallback();
      this.setupEvents();
      const isOptGroup = this.querySelector("optgroup")
      if(isOptGroup) this.isOptGroup = true;
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
        "md-combobox-multiselect": this.isMulti
      };
    }

    get filteredOptions() {
      return this.filterOptions(this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue).filter(
        (options: string | OptionMember) => {
          if (this.isOptGroup) {
            if (typeof options !== "string") {
              return options.isLabel === "false";
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
        "md-combobox-searchable": this.searchable
      };
    }

    searchIconTemplate() {
      return html`
        <md-icon name="icon-search_16" @click=${this.toggleVisualListBox}></md-icon>
      `;
    }

    selectedOptionTemplate(selectedOption: string | OptionMember) {
      return html`
        <div class="md-combobox-selected-item">
          <span>${this.getOptionValue(selectedOption)}</span>
          <md-icon class="remove-item" name="cancel_8" @click=${() => this.removeSelected(selectedOption)}></md-icon>
        </div>
      `;
    }

    clearButtonTemplate() {
      return html`
        <button
          type="button"
          class="md-combobox-button clear"
          aria-label=${this.clearAriaLabel}
          aria-expanded=${this.expanded}
          aria-controls="md-combobox-listbox"
          tabindex="-1"
          ?disabled=${this.disabled}
          @click=${this.handleRemoveAll}
        >
          <span> <md-icon class="md-input__icon-clear" name="clear-active_12"></md-icon></span>
        </button>
      `;
    }

    arrowButtonTemplate() {
      return html`
        <button
          type="button"
          class="md-combobox-button arrow-down"
          aria-label=${this.arrowAriaLabel}
          aria-expanded=${this.expanded}
          aria-controls="md-combobox-listbox"
          tabindex="-1"
          ?disabled=${this.disabled}
          @click=${this.toggleVisualListBox}
        >
          <span><md-icon name="icon-arrow-down_16"></md-icon> </span>
        </button>
      `;
    }

    getSelectAllOption() {
      return html`
        <li
          id="selectAll"
          part="combobox-option"
          role="option"
          class="md-combobox-option ${classMap(this.listItemOptionMap)}"
          @click=${this.handleSelectAll}
          aria-checked=${ifDefined(this.isSelectAllChecked ? "true" : undefined)}
        >
          ${!this.isSelectAllChecked && this.selectedOptions.length !== 0
            ? html`
                <span class="select-option indeterminate">
                  <md-icon name="icon-minus_14"></md-icon>
                </span>
              `
            : html`
                <span class="select-option">
                  <md-icon name="icon-check_14"></md-icon>
                </span>
              `}
          <span part="label" class="select-label">${this.selectAllTextLocalization}</span>
        </li>
      `;
    }

    getSelctedCount() {
      if (this.selectedOptions.length === 0) {
        return nothing;
      } else if (this.isSelectAllSelected()) {
        return html`
          <md-span class="selected-count">${this.allTextLocalization}</md-span>
        `;
      }
      return html`
        <md-span class="selected-count">${this.selectedOptions.length} ${this.selectedTextLocalization}</md-span>
      `;
    }

    getCustomErrorContent() {
      return this.querySelector("[slot]") || this.shadowRoot!.querySelector("[slot]");
    }
    getCustomContent(option: string | OptionMember) {
      const slotName = this.getCustomContentName(option);
      if (this.isOptGroup) {
        const slot = [...this.querySelectorAll(`[slot]`)].find(element => element.slot === slotName);
        if (slot) {
          return document.createRange().createContextualFragment(`${slot.outerHTML}`)
        } else {
          return html``;
        }
      } else {
        return html`
          <slot name=${ifDefined(slotName)}></slot>
        `;
      }
    }
    render() {
      return html`
        <div
          part="combobox"
          aria-label=${this.ariaLabel}
          class="md-combobox md-combobox-list ${classMap(this.comboBoxTemplateClassMap)}"
        >
          <div part="group" class="group ${classMap(this.listItemOptionMap)}">
            ${this.searchable ? this.searchIconTemplate() : nothing}
            <div class="md-combobox__multiwrap" part="multiwrap">
              ${this.isMulti
                ? this.isMulti && !this.showSelectedCount
                  ? repeat(this.selectedOptions, selectedOption => this.selectedOptionTemplate(selectedOption))
                  : this.getSelctedCount()
                : nothing}
              <input
                class="md-combobox-listbox"
                type="text"
                role="combobox"
                aria-autocomplete="both"
                aria-label=${this.ariaLabel}
                part="multiwrap-input"
                aria-expanded=${this.expanded}
                placeholder=${this.isMulti && this.showSelectedCount && this.selectedOptions.length !== 0
                  ? ""
                  : this.placeholder}
                aria-controls="md-combobox-listbox"
                ?disabled=${this.disabled}
                ?autofocus=${this.autofocus}
                title=${ifDefined(this.selectedOptions.length > 0 ? this.selectedOptions[0] : this.placeholder)}
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
              : this.arrowButtonTemplate()}
          </div>
          ${!this.showCustomError
            ? html`
                <ul
                  id="md-combobox-listbox"
                  part="combobox-options"
                  role="listbox"
                  aria-label=${this.label}
                  style=${styleMap({
                    display: this.expanded
                      ? this.options.length &&
                        this.filteredOptions.length === 0 &&
                        this.inputValue &&
                        this.allowCustomValue
                        ? "none"
                        : "block"
                      : "none",
                    "z-index": "1"
                  })}
                >
                  ${this.isMulti && this.allowSelectAll ? this.getSelectAllOption() : nothing}
                  ${repeat(
                    this.filterOptions(this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue),
                    (option: string | OptionMember) => this.getOptionId(option),
                    (option: string | OptionMember, optionIndex) => {
                      if (typeof option !== "string" && this.isOptGroup && option.isLabel === "true") {
                        return html`
                          <span part="group-label" class="group-label">${option.value}</span>
                        `;
                      } else {
                        return html`
                          <li
                            id=${this.getOptionId(option)}
                            title="${this.getOptionValue(option)}"
                            part="combobox-option"
                            role="option"
                            class="md-combobox-option"
                            aria-label=${this.getOptionValue(option)}
                            aria-selected=${this.getAriaState(optionIndex)}
                            tabindex="-1"
                            @click=${this.handleListClick}
                            aria-checked=${ifDefined(this.isMulti ? this.isOptionChecked(option) : undefined)}
                          >
                            ${this.isMulti
                              ? html`
                                  <span class="select-option">
                                    <md-icon name="icon-check_14"></md-icon>
                                  </span>
                                `
                              : nothing}
                            <span part="label" class="select-label">
                              ${this.isCustomContent
                                ? this.getCustomContent(option)
                                : findHighlight(
                                    this.getOptionValue(option),
                                    this.trimSpace ? this.inputValue.replace(/\s+/g, "") : this.inputValue
                                  ).map(({ text, matching }) =>
                                    matching
                                      ? html`
                                          <span class="highlight-text">${text}</span>
                                        `
                                      : html`
                                          <span class="selected-label-text">${text}</span>
                                        `
                                  )}
                            </span>
                          </li>
                        `;
                      }
                    }
                  )}
                  ${this.options.length &&
                  this.filteredOptions.length === 0 &&
                  this.inputValue &&
                  !this.allowCustomValue
                    ? html`
                        <li class="no-result" role="option" aria-selected="false" tabindex="-1">
                          ${this.resultsTextLocalization.trim()}
                        </li>
                      `
                    : nothing}
                  ${this.options.length === 0
                    ? html`
                        <li class="no-result" role="option" aria-selected="false" tabindex="-1">
                          ${this.optionsTextLocalization.trim()}
                        </li>
                      `
                    : nothing}
                </ul>
              `
            : html`
                <ul
                  id="md-combobox-listbox"
                  part="combobox-options"
                  role="listbox"
                  aria-label=${this.label}
                  style=${styleMap({
                    display: this.expanded ? "block" : "none",
                    "z-index": "1"
                  })}
                >
                  ${this.getCustomErrorContent()}
                </ul>
              `}
        </div>
        ${this.invalid
          ? html`
              <div part="message" class="md-combobox-error">
                <md-help-text .message=${this.invalidText} messageType="error"></md-help-text>
              </div>
            `
          : nothing}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-combobox": ComboBox.ELEMENT;
  }
}
