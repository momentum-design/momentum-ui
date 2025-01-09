import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { FocusMixin } from "@/mixins/FocusMixin";
import reset from "@/wc_scss/reset.scss";
import { LitElement, PropertyValues, html, internalProperty, property, query, queryAll } from "lit-element";
import { scroll } from "lit-virtualizer";
import styles from "./scss/module.scss";

export namespace AdvanceList {
  export const prefixId = "item-";
  @customElementWithCheck("md-advance-list")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Array }) items: any[] = [];
    @property({ type: Boolean }) isLoading = false;
    @property({ type: Boolean }) isMultiSelectEnabled = false;
    @property({ type: Boolean }) groupOnMultiSelect = false;
    @property({ type: Array }) selectedItemsIds: string[] = [];
    @property({ type: Array }) value: string[] = [];
    @property({ type: String }) ariaRoleList = "listbox";
    @property({ type: String }) ariaRoleListItem = "option";
    @property({ type: String }) ariaLabelList = "";
    @property({ type: Boolean }) isError = false;
    @property({ type: String }) containerHeight = "292px";
    @property({ type: String }) lastSelectedIdByOrder = "";
    @queryAll("div.default-wrapper") lists?: HTMLDivElement[];
    @query(".virtual-scroll") listContainer?: HTMLDivElement;
    @property({ type: Number }) totalRecords = 0;
    @internalProperty() scrollIndex = -1;
    @internalProperty() activeId = "";
    @internalProperty() isUserNavigated = false; // this flag is used to control scroll to index this will became true only when user navigated using keyboard

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
      // Clean up event listeners when the component is removed
      this.removeEventListener("click", this.handleClick);
      this.listContainer?.addEventListener("keydown", this.handleKeyDown);
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
      // Add keydown event listener to the list container
      this.listContainer?.addEventListener("keydown", this.handleKeyDown);
    }

    updated(changedProperties: PropertyValues) {
      if (changedProperties.has("value")) {
        this.requestUpdate().then(() => {
          this.selectedItemsIds = this.value;
          this.updateSelectedState();
        });
      }
    }

    updateWrapperAttributes(wrapper: HTMLElement, isSelected: boolean) {
      if (!this.isMultiSelectEnabled) {
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
        // update the wrapper attributes
        this.updateWrapperAttributes(wrapper as HTMLElement, isSelected);

        if (this.groupOnMultiSelect && wrapper.id === `${prefixId}${this.lastSelectedIdByOrder}`) {
          wrapper.classList.add("selected-border");
        } else {
          wrapper.classList.remove("selected-border");
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
      switch (event.key) {
        case Key.ArrowDown:
          {
            event.preventDefault();
            this.isUserNavigated = true;
            // incase of preselected value
            if (this.activeId === "" && this.value) {
              this.activeId = this.value[0];
            }
            const currentIndex = this.items.findIndex((item) => item.id === this.activeId);
            if (currentIndex < this.items.length - 1 && !this.isNextElemenentStatusIndicator(currentIndex)) {
              this.scrollIndex = currentIndex + 1;
              this.activeId = this.items[this.scrollIndex].id;
            }
          }
          break;

        case Key.ArrowUp:
          {
            event.preventDefault();
            this.isUserNavigated = true;
            // in case of preselected value
            if (this.activeId === "" && this.value) {
              this.activeId = this.value[0];
            }
            const upIndex = this.items.findIndex((item) => item.id === this.activeId);
            if (upIndex > 0) {
              this.scrollIndex = upIndex - 1;
              this.activeId = this.items[this.scrollIndex].id;
            }
          }
          break;

        case Key.Enter:
          {
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
          break;

        default:
          break;
      }
    };

    updateItemSelection(clickedItem: HTMLElement) {
      if (!clickedItem) return;

      this.activeId = clickedItem.id.substring(clickedItem.id.indexOf("-") + 1);
      const index = this.selectedItemsIds.indexOf(this.activeId);
      if (index === -1) {
        if (this.isMultiSelectEnabled) {
          this.selectedItemsIds.push(this.activeId);
        } else {
          this.selectedItemsIds = [this.activeId];
        }
      } else if (this.isMultiSelectEnabled) {
        this.selectedItemsIds.splice(index, 1);
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

    renderItem(item: any, index: number) {
      if (item.id === "status-indicator") {
        return html`
          <div class="default-wrapper-status-indicator" id="status-indicator">${item.template(item, index)}</div>
        `;
      }
      return html`
        <div
          class="default-wrapper ${item.id}"
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
          aria-label=${this.ariaLabelList}
          role=${this.ariaRoleList}
          @rangechange=${this.handleRangeChange}
        >
          ${scroll({
            items: this.items,
            renderItem: (item: any, index?: number) => this.renderItem(item, index || 0),
            useShadowDOM: true,
            scrollToIndex: this.isUserNavigated
              ? {
                  index: this.scrollIndex,
                  position: this.scrollIndex === 0 ? "start" : "center"
                }
              : undefined
          })}
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
