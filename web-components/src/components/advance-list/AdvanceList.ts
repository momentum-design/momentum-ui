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
    @property({ type: String }) selectedItemId = "";
    @property({ type: String }) value = "";
    @property({ type: String }) ariaRoleList = "";
    @property({ type: String }) ariaLabelList = "";
    @property({ type: Boolean }) isError = false;
    @queryAll("div.default-wrapper") lists?: HTMLDivElement[];
    @query(".virtual-scroll") listContainer?: HTMLDivElement;
    @internalProperty() page = 1;
    // @internalProperty() hasSlotContent = false;
    @property({ type: Number }) totalRecords = 0;
    // @internalProperty() activeItem: HTMLElement | null | undefined = null;
    @internalProperty() scrollIndex = -1;
    @internalProperty() activeId: string = "";
    // @internalProperty() selectedIndex = -1;
    @internalProperty() isUserNavigated = false;

    connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener("click", this.handleClick);
    }

    static get styles() {
      return [reset, styles];
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // Clean up event listeners when the component is removed
      this.removeEventListener("click", this.handleClick);
      this.listContainer?.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
      // Add keydown event listener to the list container
      this.listContainer?.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    updated(changedProperties: PropertyValues) {
      if (changedProperties.has("value")) {
        // Update the selected item for the preselect
        this.requestUpdate().then(() => {
          this.selectedItemId = `${this.value}`;
          this.updateSelectedState();
        });
      }
    }

    protected updateSelectedState() {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      wrappers.forEach((wrapper) => {
        const childWithDisabled = wrapper.firstElementChild?.hasAttribute("disabled") || wrapper.firstElementChild?.getAttribute("aria-disabled") === "true";

        if (wrapper.id === `${prefixId}${this.selectedItemId}`) {
          // Update selected item styles and attributes
          wrapper.classList.add("selected");
          wrapper.setAttribute("selected", "true");
          wrapper.setAttribute("aria-selected", "true");
          wrapper.setAttribute("tabindex", "0");
        } else {
          wrapper.classList.remove("selected");
          wrapper.removeAttribute("selected");
          wrapper.setAttribute("aria-selected", "false");
          wrapper.setAttribute("tabindex", "-1");
        }

        //active item should be focusable
        if (wrapper.id === `${prefixId}${this.activeId}`) {
          wrapper.setAttribute("tabindex", "0");
          (wrapper as any).focus();
        } else {
          wrapper.setAttribute("tabindex", "-1");
        }

        // Handle pre-selection of the active item if none is currently active
        if (this.activeId == "" && wrapper.id === `${prefixId}${this.value}`) {
          wrapper.setAttribute("tabindex", "0");
        }

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
          clickedItem?.hasAttribute("disabled") ||
          clickedItem.firstElementChild?.getAttribute("aria-disabled") === "true";
        if (isDisabled) {
          return 0; // Return 0 if the item is disabled
        }
        return clickedItem;
      }
      return undefined;
    }

    handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case Key.ArrowDown:
          event.preventDefault();
          this.isUserNavigated = true;
          // incase of preselected value
          if (this.activeId === "" && this.value) {
            this.activeId = this.value;
          }
          const currentIndex = this.items.findIndex(item => item.id === this.activeId);
          if (currentIndex < this.items.length - 1) {
            this.scrollIndex = currentIndex + 1;
            this.activeId = this.items[this.scrollIndex].id;  
          }
          break;

        case Key.ArrowUp:
          event.preventDefault();
          this.isUserNavigated = true;
          // in case of preselected value
          if (this.activeId === "" && this.value) {
            this.activeId = this.value;
          }
          const upIndex = this.items.findIndex(item => item.id === this.activeId);
          if (upIndex > 0) {
            this.scrollIndex = upIndex - 1;
            this.activeId = this.items[this.scrollIndex].id;  
          }
          break;

        case Key.Enter:
          if (this.activeId) {
            const selectedItem = this.shadowRoot?.querySelector(`#${prefixId}${this.activeId}`);
            if (selectedItem) {
              const isDisabled = selectedItem.getAttribute("aria-disabled") === "true" || selectedItem.hasAttribute("disabled");
              if (!isDisabled) {
                this.selectItem(selectedItem as HTMLElement);
              }
            }
          }
        default:
          break;
      }
    }

    selectItem(clickedItem: HTMLElement) {
      if (!clickedItem) return;

      this.clearFocusedState();
      clickedItem.focus();
      clickedItem.classList.add("selected");
      clickedItem.setAttribute("selected", "true");
      clickedItem.setAttribute("aria-selected", "true");

      this.activeId = clickedItem.id.substring(clickedItem.id.indexOf("-") + 1);
      this.selectedItemId = this.activeId;

      this.notifySelectedChange();
    }

    handleClick(event: Event) {
      event.preventDefault();
      this.isUserNavigated = false; // Clear navigation flag on click
      const clickedItem = this.findClickedItem(event);
      if (clickedItem) {
        this.scrollIndex = parseInt(clickedItem.getAttribute("index") || "0");
        this.selectItem(clickedItem);
      }
    }

    handleRangeChange = (e: any) => {
      const { last } = e;

      this.updateSelectedState();
      

      // Trigger 'load-more' event when more items need to be loaded
      if (this.items.length < this.totalRecords && last >= this.items.length - 1 && !this.isLoading && !this.isError) {
        this.scrollIndex = last;
        this.dispatchEvent(
          new CustomEvent("load-more", {
            detail: { page: this.page },
            bubbles: true,
            composed: true
          })
        );
        this.page += 1;
      }
      this.isUserNavigated = false;
    };

    clearFocusedState() {
      const wrappers = Array.from(this.shadowRoot?.querySelectorAll(".default-wrapper") || []);
      wrappers.forEach((wrapper) => {
        wrapper.classList.remove("selected");
        wrapper.removeAttribute("selected");
        wrapper.removeAttribute("aria-selected");
      });
    }

    notifySelectedChange() {
      this.dispatchEvent(
        new CustomEvent("list-item-change", {
          detail: { selected: this.selectedItemId },
          bubbles: true,
          composed: true
        })
      );
    }

    renderItem(item: any, index: number) {
      return html`
        <div
          class="default-wrapper"
          aria-setsize="${this.totalRecords}"
          aria-posinset="${index + 1}"
          role="option"
          aria-label=${item.name}
          id="${prefixId}${item.id}"
          index="${index}"
        >
          ${item.template(item, index)}
        </div>
      `;
    }

    render() {
      let ariaActiveDescendant: string = "";
      if (this.activeId) {
        ariaActiveDescendant = `${prefixId}${this.activeId}`;
      } else if (this.value) {
        ariaActiveDescendant = `${prefixId}${this.value}`;
      }

      return html`
        <div
          class="md-advance-list-wrapper virtual-scroll"
          tabindex="0"
          aria-live="polite"
          aria-activedescendant=${ariaActiveDescendant}
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
        ${this.isLoading ? html`<slot class="spin-loader" name="spin-loader"></slot>` : null}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-advance-list": AdvanceList.ELEMENT;
  }
}
