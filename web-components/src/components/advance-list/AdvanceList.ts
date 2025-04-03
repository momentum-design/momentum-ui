import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusMixin } from "@/mixins/FocusMixin";
import reset from "@/wc_scss/reset.scss";
import "@lit-labs/virtualizer";
import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { property, query, queryAll, state } from "lit/decorators.js";
import styles from "./scss/module.scss";

export namespace AdvanceList {
  export const prefixId = "item-";
  @customElementWithCheck("md-advance-list")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Array }) items: any[] = [];
    @property({ type: Boolean }) isLoading = false;
    @property({ type: Boolean, attribute: "is-multi" }) isMulti = false;
    @property({ type: Boolean }) groupOnMultiSelect = false;
    @property({ type: Array }) value: string[] = [];
    @property({ type: String }) ariaRoleList = "listbox";
    @property({ type: String }) ariaRoleListItem = "option";
    @property({ type: String }) ariaLabelList = "";
    @property({ type: Boolean }) isError = false;
    @property({ type: String }) containerHeight = "292px";
    @property({ type: String }) lastSelectedIdByOrder = "";
    @property({ type: Boolean }) selectAllItems = false;
    @property({ type: Boolean }) focusReset = false;
    @property({ type: Array }) disabledItems: string[] = [];
    @property({ type: Number }) totalRecords = 0;
    @property({ type: Boolean }) isNonSelectable = false;
    @queryAll("div.default-wrapper") lists?: HTMLDivElement[];
    @query(".virtual-scroll") listContainer?: HTMLDivElement;

    @state()
    private scrollIndex = -1;

    @state()
    activeId = "";

    @state()
    selectedItemsIds: string[] = [];

    @state()
    private isUserNavigated = false; // this flag is used to control scroll to index this will became true only when user navigated using keyboard

    connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener("click", this.handleClick);
    }

    static get styles() {
      return [reset, styles];
    }

    private getStyles() {
      return html`
        <style>
          :host .virtual-scroll {
            height: ${this.containerHeight};
          }
        </style>
      `;
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("click", this.handleClick);
      this.listContainer?.removeEventListener("keydown", this.handleKeyDown);
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
      super.firstUpdated(_changedProperties);
      this.listContainer?.addEventListener("keydown", this.handleKeyDown);
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("value") && (changedProperties.get("value") !== undefined || this.value.length > 0)) {
        this.requestUpdate();
        this.updateComplete.then(() => {
          this.selectedItemsIds = this.value;
          this.updateSelectedState();
        });
      }
      if (changedProperties.has("selectAllItems")) {
        if (this.selectAllItems) {
          this.selectedItemsIds = this.items
            .filter((item) => !this.disabledItems.includes(item.id))
            .map((item) => item.id);
          this.updateSelectedState();
          this.notifySelectedChange();
        }
      }
      if (changedProperties.has("focusReset")) {
        if (this.focusReset) {
          this.activeId = "";
        }
      }
    }

    setCheckboxAttributes(isSelected: boolean, wrapper: HTMLElement) {
      if (
        isSelected &&
        (!wrapper.firstElementChild?.hasAttribute("disabled") ||
          wrapper.firstElementChild?.getAttribute("aria-disabled") !== "true")
      ) {
        wrapper.querySelector("md-checkbox")?.setAttribute("checked", "true");
      } else {
        wrapper.querySelector("md-checkbox")?.removeAttribute("checked");
      }
    }

    updateWrapperAttributes(wrapper: HTMLElement, isSelected: boolean) {
      if (this.isMulti) {
        this.setCheckboxAttributes(isSelected, wrapper);
      } else {
        wrapper.classList.toggle("selected", isSelected);
      }
      wrapper.setAttribute("selected", isSelected.toString());
      wrapper.setAttribute("aria-selected", isSelected.toString());
      wrapper.setAttribute("tabindex", isSelected ? "0" : "-1");
    }

    protected updateSelectedState() {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      wrappers.forEach((wrapper) => {
        const isSelected = this.selectedItemsIds.some((id) => wrapper.id === `${prefixId}${id}`);
        this.updateWrapperAttributes(wrapper as HTMLElement, isSelected);

        if (
          this.groupOnMultiSelect &&
          this.value.length > 0 &&
          this.items.length !== this.value.length &&
          wrapper.id === `${prefixId}${this.lastSelectedIdByOrder}`
        ) {
          wrapper.classList.add("selected-border-bottom");
        } else {
          wrapper.classList.remove("selected-border-bottom");
        }

        //active item should be focusable
        if (wrapper.id === `${prefixId}${this.activeId}`) {
          wrapper.setAttribute("tabindex", "0");
          (wrapper as any).focus();
        } else {
          wrapper.setAttribute("tabindex", "-1");
        }

        // Handle pre-selection of the active item if none is currently active
        if (this.activeId == "" && wrapper.id === `${prefixId}${this.value[0]}`) {
          wrapper.setAttribute("tabindex", "0");
        }

        const childWithDisabled =
          wrapper.firstElementChild?.hasAttribute("disabled") ||
          wrapper.firstElementChild?.getAttribute("aria-disabled") === "true";
        if (childWithDisabled) {
          wrapper.setAttribute("disabled", "");
          wrapper.setAttribute("aria-disabled", "true");
        } else {
          wrapper.removeAttribute("disabled");
          wrapper.removeAttribute("aria-disabled");
        }
      });
    }

    findClickedItem(event: Event): HTMLElement | 0 | undefined {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      const eventPath = event.composedPath();
      const clickedItem = wrappers.find((wrapper) => eventPath.includes(wrapper)) as HTMLElement | undefined;

      if (clickedItem) {
        const isDisabled =
          clickedItem?.hasAttribute("disabled") || clickedItem?.getAttribute("aria-disabled") === "true";
        if (isDisabled) {
          return 0; // Return 0 if the item is disabled
        }
        return clickedItem;
      }
      return undefined;
    }

    isNextElemenentStatusIndicator(index: number) {
      return (this.isLoading || this.isError) && index === this.items.length - 2;
    }

    handleKeyDown = (event: KeyboardEvent): void => {
      const { ArrowDown, ArrowUp, Tab, Space, Enter } = Key;
      const { code } = event;
      const isArrowDown = code === ArrowDown;
      const isArrowUp = code === ArrowUp;
      const isTab = code === Tab;
      const isSpace = code === Space;
      const isEnter = code === Enter;

      if (isArrowDown || isArrowUp) {
        event.preventDefault();
        this.isUserNavigated = true;

        // In case of preselected value
        if (this.activeId === "" && this.value.length > 0 && this.value[0] !== "") {
          this.activeId = this.value[0];
          return;
        } else if (this.activeId === "" && !isArrowUp && this.items.length > 0) {
          // Only for ArrowDown: Set to first item if no selection
          this.activeId = this.items[0].id;
          return;
        }

        const currentIndex = this.items.findIndex((item) => item.id === this.activeId);

        if (isArrowDown) {
          if (currentIndex < this.items.length - 1 && !this.isNextElemenentStatusIndicator(currentIndex)) {
            this.scrollIndex = currentIndex + 1;
            this.activeId = this.items[this.scrollIndex].id;
          }
        } else if (currentIndex > 0) {
          // isArrowUp
          this.scrollIndex = currentIndex - 1;
          this.activeId = this.items[this.scrollIndex].id;
        }
      } else if (isTab) {
        if (this.activeId === "" && this.value.length > 0) {
          this.activeId = this.value[0];
        }
      } else if (isSpace || isEnter) {
        event.preventDefault();
        if (this.activeId) {
          const selectedItem = this.shadowRoot?.querySelector(`#${prefixId}${this.activeId}`);
          if (selectedItem) {
            const isDisabled =
              selectedItem.getAttribute("aria-disabled") === "true" || selectedItem.hasAttribute("disabled");
            if (!isDisabled) {
              this.updateItemSelection(selectedItem as HTMLElement);
            }
          }
        }
      }
    };

    updateItemForMultiSelect(activeId: string) {
      const index = this.selectedItemsIds.indexOf(activeId);
      if (index === -1) {
        this.selectedItemsIds.push(this.activeId);
        if (this.selectedItemsIds.length === this.items.length - this.disabledItems.length) {
          this.selectAllItems = true;
        }
      } else {
        this.selectedItemsIds.splice(index, 1);
        this.selectAllItems = false;
      }
    }

    updateItemSelection(clickedItem: HTMLElement) {
      if (!clickedItem) return;

      this.activeId = clickedItem.id.substring(clickedItem.id.indexOf("-") + 1);
      if (this.isMulti) {
        this.updateItemForMultiSelect(this.activeId);
      } else {
        this.selectedItemsIds = [this.activeId];
      }
      this.updateSelectedState();
      this.notifySelectedChange();
    }

    handleClick(event: Event) {
      event.preventDefault();
      this.isUserNavigated = false; // Clear navigation flag on click
      const clickedItem = this.findClickedItem(event);
      if (clickedItem) {
        this.scrollIndex = parseInt(clickedItem.getAttribute("index") || "0");
        this.updateItemSelection(clickedItem);
      }
    }

    handleRangeChange = (e: any) => {
      const { last } = e;
      this.updateSelectedState();

      // Trigger 'load-more' event when more items need to be loaded
      if (this.items.length < this.totalRecords && last >= this.items.length - 1 && !this.isLoading && !this.isError) {
        this.dispatchEvent(
          new CustomEvent("load-more", {
            bubbles: true,
            composed: true
          })
        );
      }
      this.isUserNavigated = false;
    };

    notifySelectedChange() {
      this.dispatchEvent(
        new CustomEvent("list-item-change", {
          detail: { selected: this.selectedItemsIds },
          bubbles: true,
          composed: true
        })
      );
    }

    readonly renderItem = (item: any, index: number) : TemplateResult => {
      if (item.id === "status-indicator") {
        return html`
          <div class="default-wrapper-status-indicator" id="status-indicator">${item.template(item, index)}</div>
        `;
      }
      return html`
        <div
          class="default-wrapper ${item.id} ${this.isNonSelectable ? "non-selectable" : ""}"
          part="advance-list-item-wrapper"
          aria-setsize="${this.totalRecords}"
          aria-posinset="${index + 1}"
          role="${this.ariaRoleListItem}"
          aria-label=${item.name}
          id="${prefixId}${item.id}"
          index="${index}"
        >
          ${item.template(item, index)}
        </div>
      `;
    }

    getActiveDescendant() {
      if (this.activeId) {
        return `${prefixId}${this.activeId}`;
      } else if (this.value) {
        return `${prefixId}${this.value[0]}`;
      } else {
        return "";
      }
    }

    render() {
      return html`
        ${this.getStyles()}
        <div
          class="md-advance-list-wrapper virtual-scroll"
          tabindex="0"
          aria-activedescendant=${this.getActiveDescendant()}
          aria-multiselectable=${this.isMulti}
          aria-label=${this.ariaLabelList}
          role=${this.ariaRoleList}
          @rangechange=${this.handleRangeChange}
        >
          <lit-virtualizer
            .items=${this.items}
            .renderItem=${(item: any, index: number) => this.renderItem(item, index)}
          ></lit-virtualizer>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-advance-list": AdvanceList.ELEMENT;
  }
}
