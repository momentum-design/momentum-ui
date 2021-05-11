/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { html, internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import Sortable from "sortablejs";
import reset from "@/wc_scss/reset.scss";
import styles from "./scss/module.scss";
import { debounce } from "@/utils/helpers";
import { customElementWithCheck, ResizeMixin, RovingTabIndexMixin, SlottedMixin } from "@/mixins";
import { DraggableTab, TabClickEvent } from "./DraggableTab";
import { DraggableTabPanel } from "./DraggableTabPanel";
import { nanoid } from "nanoid";
import { classMap } from "lit-html/directives/class-map";
import { MenuOverlay } from "../menu-overlay/MenuOverlay"; // Keep type import as a relative path
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { repeat } from "lit-html/directives/repeat";
import { styleMap } from "lit-html/directives/style-map";
import "@/components/icon/Icon";
import "@/components/menu-overlay/MenuOverlay";
import { threadId } from "worker_threads";

const MORE_MENU_TAB_TRIGGER_ID = "tab-more";
const MORE_MENU_WIDTH = "264px"; // Designed width
export const MORE_MENU_TAB_COPY_ID_PREFIX = "more-menu-copy-";

export namespace DraggableTabs {
  type TabViewportData = {
    isTabInViewportHidden: boolean;
    tabOffsetWidth: number;
  };
  type TabsViewportDataList = TabViewportData[];

  type TabId = Element["id"];
  @customElementWithCheck("md-draggable-tabs")
  export class ELEMENT extends ResizeMixin(RovingTabIndexMixin(SlottedMixin(LitElement))) {
    @property({ type: Boolean }) justified = false;

    @property({ type: Number }) delay = 0;
    @property({ type: Number }) animation = 100;
    @property({ type: String }) handle = "";
    @property({ type: String }) filter = "";
    @property({ type: String }) easing = "";
    @property({ type: String }) direction: "horizontal" | "vertical" = "horizontal";
    // @property({ type: Object }) group: Sortable.GroupOptions | null = null;
    @property({ type: String, attribute: "draggable-items" }) draggableItems = "md-draggable-tab";
    @property({ type: String, attribute: "ghost-class" }) ghostClass = "";
    @property({ type: String, attribute: "chosen-class" }) chosenClass = "";
    @property({ type: String, attribute: "drag-class" }) dragClass = "";
    @property({ type: String, attribute: "fallback-class" }) fallbackClass = "";
    @property({ type: Number, attribute: "swap-threshold" }) swapThreshold = 1;
    @property({ type: Number, attribute: "touch-start-threshold" }) touchStartThreshold = 0;
    @property({ type: Boolean, attribute: "force-fallback" }) forceFallback = false;
    @property({ type: Boolean, reflect: true }) sort = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) editable = false;

    @query("slot[name='tab']") tabSlotElement!: HTMLSlotElement;
    @query("slot[name='panel']") panelSlotElement?: HTMLSlotElement;
    @query(".md-tab__list[part='tabs-list']") tabsListElement?: HTMLDivElement;
    @query(".md-menu-overlay__more_tab") moreTabMenuElement?: DraggableTab.ELEMENT;
    @query("md-menu-overlay") menuOverlayElement?: MenuOverlay.ELEMENT;

    @query(".md-tab__list[part='tabs-more-list']") tabsMoreListElement?: HTMLDivElement;
    @queryAll(".md-menu-overlay__more_list md-tab") tabsCopyHiddenListElements?: NodeListOf<DraggableTab.ELEMENT>;

    @property({ type: String }) overlowLabel = "More";
    @property({ type: Number, attribute: "more-items-scroll-limit" }) moreItemsScrollLimit = Number.MAX_SAFE_INTEGER;
    @internalProperty() private isMoreTabMenuVisible = false;
    @internalProperty() private isMoreTabMenuMeasured = false;
    @internalProperty() private isMoreTabMenuOpen = false;
    @internalProperty() private isMoreTabMenuSelected = false;
    @internalProperty() private isMoreTabMenuScrollable = false;
    @internalProperty() private moreTabMenuOffsetWidth = 0;
    @internalProperty() private moreTabMenuMaxHeight: string | null = null;
    @internalProperty() private tabsViewportDataList: TabsViewportDataList = [];
    @internalProperty() private tabsFilteredAsVisibleList: DraggableTab.ELEMENT[] = [];
    @internalProperty() private tabsFilteredAsHiddenList: DraggableTab.ELEMENT[] = [];

    private sortableInstance: Sortable | null = null;
    private firstSortableInstance: Sortable | null = null;
    private secondSortableInstance: Sortable | null = null;

    private tabs: DraggableTab.ELEMENT[] = [];
    private panels: DraggableTabPanel.ELEMENT[] = [];

    private tabsCopy: DraggableTab.ELEMENT[] = [];

    private tabsHash: Record<TabId, DraggableTab.ELEMENT> = {};
    private tabsCopyHash: Record<TabId, DraggableTab.ELEMENT> = {};

    private tabsIdxHash: Record<TabId, number> = {};

    private tabsVisibleIdxHash: Record<TabId, number> = {};
    private tabsHiddenIdxHash: Record<TabId, number> = {};
    private tabHiddenIdPositiveTabIndex?: TabId;

    static get styles() {
      return [reset, styles];
    }

    get slotElement() {
      return this.tabSlotElement;
    }

    protected filterSlotted() {
      return this.tabSlotElement!.assignedElements() as HTMLElement[];
    }

    protected async handleResize(contentRect: DOMRect) {
      super.handleResize && super.handleResize(contentRect);
      await this.manageOverflow();
    }

    private async ensureTabsUpdateComplete(tabs: DraggableTab.ELEMENT[]) {
      const tabUpdatesCompletesPromises = tabs
        .map(tab => {
          if (typeof tab.updateComplete !== "undefined") {
            return tab.updateComplete;
          }
          return null;
        })
        .filter(promise => promise !== null);

      tabUpdatesCompletesPromises.length && (await Promise.all(tabUpdatesCompletesPromises));
    }

    // This operation may affect render performance when using frequently. Use careful!
    private measureTabsOffsetWidth() {
      return !this.justified && this.direction !== "vertical"
        ? this.tabs.map((tab, idx) => tab.offsetWidth)
        : this.tabs.map((tab, idx) => {
            tab.setAttribute("measuringrealwidth", "");
            const offsetWidth = tab.offsetWidth;
            tab.removeAttribute("measuringrealwidth");
            return offsetWidth;
          });
    }

    private measureHiddenTabsCopiesOffsetHeight() {
      return this.tabsCopy.map((tab, idx) => tab.offsetHeight);
    }

    private async manageOverflow() {
      if (this.direction !== "vertical") {
        const tabsCount = this.tabs.length;
        if (this.tabsListElement && tabsCount > 1) {
          const tabsListViewportOffsetWidth = this.tabsListElement.offsetWidth;

          // Awaiting all tabs updates
          await this.ensureTabsUpdateComplete(this.tabs);

          const tabsOffsetsWidths = this.measureTabsOffsetWidth();

          // All tabs total offsetsWidth
          const tabsTotalOffsetWidth = this.tabs.reduce((acc, tab, idx) => {
            acc += tabsOffsetsWidths[idx];
            return acc;
          }, 0);

          if (tabsTotalOffsetWidth) {
            // more
            await this.setupMoreTab();

            let isTabsFitInViewport = true;
            if (tabsListViewportOffsetWidth < tabsTotalOffsetWidth) {
              // console.log("Applied More button");
              isTabsFitInViewport = false;
            } else {
              // console.log("Removed More button");
            }

            const newTabsViewportList: TabsViewportDataList = [];
            let tabsOffsetWidthSum = 0;
            this.tabs.forEach((tab, idx) => {
              tabsOffsetWidthSum += tabsOffsetsWidths[idx];

              const isTabInViewportHidden = isTabsFitInViewport
                ? false
                : tabsOffsetWidthSum + (idx < tabsCount - 1 ? this.moreTabMenuOffsetWidth : 0) >
                  tabsListViewportOffsetWidth;

              newTabsViewportList.push({
                isTabInViewportHidden: isTabInViewportHidden,
                tabOffsetWidth: tabsOffsetsWidths[idx]
              });
            });

            this.tabsViewportDataList = newTabsViewportList;

            // Make real tabs viewportHidden update
            this.tabsViewportDataList.forEach(
              (tvd, idx) => (this.tabs[idx].viewportHidden = tvd.isTabInViewportHidden)
            );

            // Make more button hidden update
            this.isMoreTabMenuVisible = !!this.tabsViewportDataList.find(tvd => tvd.isTabInViewportHidden);

            // Only tabs going visible
            this.tabsFilteredAsVisibleList = this.tabs.filter(
              (t, idx) => !this.tabsViewportDataList[idx].isTabInViewportHidden
            );
            this.tabsVisibleIdxHash = this.tabsFilteredAsVisibleList.reduce((acc, tab, idx) => {
              acc[tab.id] = idx;
              return acc;
            }, {} as Record<TabId, number>);

            // Only tabs going hidden
            this.tabsFilteredAsHiddenList = this.tabs.filter(
              (t, idx) => this.tabsViewportDataList[idx].isTabInViewportHidden
            );
            this.tabsHiddenIdxHash = this.tabsFilteredAsHiddenList.reduce((acc, tab, idx) => {
              acc[tab.id] = idx;
              return acc;
            }, {} as Record<TabId, number>);
          }
        }

        this.updateIsMoreTabMenuSelected();

        const firstNotDisabledHiddenTab = this.tabsFilteredAsHiddenList.find(t => !t.disabled);
        this.updateHiddenIdPositiveTabIndex(firstNotDisabledHiddenTab);
      }
    }

    private updateIsMoreTabMenuSelected() {
      // More menu selected check
      this.isMoreTabMenuSelected = !!this.tabsFilteredAsHiddenList.find(tab => tab.selected);
    }

    private updateHiddenIdPositiveTabIndex(hiddenTab?: DraggableTab.ELEMENT) {
      this.tabHiddenIdPositiveTabIndex = hiddenTab ? hiddenTab.id : undefined;
    }

    private generateOptions() {
      return {
        group: "shared",
        disabled: this.disabled,
        animation: this.animation,
        sort: this.sort,
        delay: this.delay,
        handle: this.handle,
        easing: this.easing,
        filter: this.filter,
        swapThreshold: this.swapThreshold,
        touchStartThreshold: this.touchStartThreshold,
        draggable: this.draggableItems,
        direction: this.direction,
        ghostClass: this.ghostClass,
        chosenClass: this.chosenClass,
        dragClass: this.dragClass,
        fallbackClass: this.fallbackClass,
        forceFallback: this.forceFallback
      };
    }

    private getCopyTabId(tab: DraggableTab.ELEMENT) {
      return `${MORE_MENU_TAB_COPY_ID_PREFIX}${tab.id}`;
    }

    private getNormalizedTabId(id: TabId) {
      return id.replace(MORE_MENU_TAB_COPY_ID_PREFIX, "");
    }

    private makeTabCopyFocus(tabCopy: DraggableTab.ELEMENT) {
      if (tabCopy) {
        tabCopy.focus();
      }
    }

    handleTabClick(event: CustomEvent<TabClickEvent>) {
      const { id } = event.detail;

      const tab = this.tabsHash[this.getNormalizedTabId(id)];
      console.log("Clicked", tab, id);
      if (tab && !tab.disabled) {
        const newIndex = this.tabsIdxHash[tab.id];

        if (newIndex !== -1) {
          this.updateSelectedTab(newIndex);
        }

        // Setting up focus for tab copy (hidden menu)
        {
          const tabCopy = this.tabsCopyHash[this.getCopyTabId(tab)];
          tabCopy && this.makeTabCopyFocus(tabCopy);
          this.updateHiddenIdPositiveTabIndex(tab);
        }
      }
    }

    private updateSelectedTab(newSelectedIndex: number) {
      const { tabs, panels } = this;
      console.log(this.slotted, this.tabs);
      const oldSelectedIndex = this.tabs.findIndex(element => element.hasAttribute("selected"));

      if (oldSelectedIndex === newSelectedIndex) {
        return;
      }
      console.log(oldSelectedIndex, newSelectedIndex);
      if (tabs && panels) {
        Array.from(Array(this.slotted.length).keys()).forEach(index => {
          const tab = tabs[index];
          tab && tab.toggleAttribute("selected", false);
          const panel = panels[index];
          panel && panel.toggleAttribute("selected", false);
          if (tab) {
            const tabCopy = this.tabsCopyHash[this.getCopyTabId(tab)];
            if (tabCopy) {
              tabCopy.toggleAttribute("selected", false);
              this.isMoreTabMenuSelected = true;
            } else {
              this.isMoreTabMenuSelected = false;
            }
          }
        });
      }

      const newtab = tabs[newSelectedIndex];
      newtab && newtab.toggleAttribute("selected", true);
      const newpanel = panels[newSelectedIndex];
      newpanel && newpanel.toggleAttribute("selected", true);
      if (newtab) {
        const tabCopy = this.tabsCopyHash[this.getCopyTabId(newtab)];
        if (tabCopy) {
          tabCopy.toggleAttribute("selected", true);
          this.isMoreTabMenuSelected = true;
        } else {
          this.isMoreTabMenuSelected = false;
        }
      }

      this.dispatchEvent(
        new CustomEvent("selected-changed", {
          detail: {
            value: newSelectedIndex
          },
          composed: true,
          bubbles: true
        })
      );

      this.changeSelectedTabIdx(newSelectedIndex);
    }

    private changeSelectedTabIdx(newSelectedTabIdx: number) {
      this.selected = newSelectedTabIdx;
      this.updateIsMoreTabMenuSelected();
    }

    handleOverlayClose() {
      if (this.menuOverlayElement) {
        this.menuOverlayElement.isOpen = false;
      }
    }

    private setupTabsEvents() {
      this.addEventListener("tab-click", this.handleTabClick as EventListener);
    }

    private teardownTabsEvents() {
      this.removeEventListener("tab-click", this.handleTabClick as EventListener);
    }

    private async linkPanelsAndTabs() {
      const { tabs, panels } = this;

      if (tabs.length === 0 || panels.length === 0) {
        console.warn(`The tabs or panels count should't be equal zero.`);
        return;
      }

      if (tabs.length !== panels.length) {
        console.warn(`The amount of tabs (${tabs.length}) doesn't match the amount of panels (${panels.length}).`);
      }
      console.log("LUFFY", this.selected, panels);

      tabs.forEach((tab, index) => {
        const id = nanoid();

        tab.setAttribute("id", id);
        tab.setAttribute("aria-controls", id);
        tab.selected = this.selected === index;

        const panel = panels[index];

        if (panel) {
          panel.setAttribute("id", id);
          panel.setAttribute("aria-labelledby", id);
          if (this.selected === index) {
            panel.toggleAttribute("selected", true);
          }
          // panel.selected = this.selected === index;
          if (tab.disabled) {
            panel.hidden = true;
          }
        } else {
          tab.disabled = true;
        }
      });

      console.log("LUFFY2", tabs, panels);

      this.tabsHash = this.tabs.reduce((acc, tab) => {
        acc[tab.id] = tab;
        return acc;
      }, {} as Record<TabId, DraggableTab.ELEMENT>);

      this.tabsIdxHash = this.tabs.reduce((acc, tab, idx) => {
        acc[tab.id] = idx;
        return acc;
      }, {} as Record<TabId, number>);
    }

    private setupPanelsAndTabs() {
      if (this.tabSlotElement) {
        this.tabs = this.tabSlotElement.assignedElements() as DraggableTab.ELEMENT[];
      }
      if (this.panelSlotElement) {
        this.panels = this.panelSlotElement.assignedElements() as DraggableTabPanel.ELEMENT[];
      }
    }

    private async setupMoreTab() {
      if (this.direction !== "vertical") {
        if (this.moreTabMenuElement && !this.isMoreTabMenuMeasured) {
          this.moreTabMenuElement.classList.add("md-menu-overlay__more_tab--measuring");
          await this.moreTabMenuElement.updateComplete;
          if (this.moreTabMenuElement.offsetWidth) {
            this.moreTabMenuOffsetWidth = this.moreTabMenuElement.offsetWidth;
            this.isMoreTabMenuMeasured = true;
          }
          this.moreTabMenuElement.classList.remove("md-menu-overlay__more_tab--measuring");
        }
      }
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.setupTabsEvents();
      this.setupPanelsAndTabs();
      this.linkPanelsAndTabs();
    }

    @query("#firstTabs") firstTabElement?: HTMLElement;
    @query("#secondTabs") secondTabElement?: HTMLElement;

    private initializeSortable() {
      if (this.firstTabElement && this.secondTabElement) {
        // this.sortableInstance = Sortable.create(this, this.generateOptions());
        // console.log("HEllo", this, this.firstTabElement, this.tabsListElement)
        Sortable.create(this.firstTabElement, this.generateOptions());
        Sortable.create(this.secondTabElement, this.generateOptions());
      }
      // Sortable.create(this.secondTabElement, { group: 'shared', draggable: this.draggableItems, });
    }

    // private cleanupSortable() {
    //   if (this.sortableInstance) {
    //     this.sortableInstance.destroy();
    //     this.sortableInstance = null;
    //   }
    // }
    // private cleanupSortable() {
    //   if (this.firstSortableInstance && this.secondSortableInstance) {
    //     this.firstSortableInstance.destroy();
    //     this.firstSortableInstance = null;
    //     this.secondSortableInstance.destroy();
    //     this.secondSortableInstance = null;
    //   }
    // }

    connectedCallback() {
      super.connectedCallback();
      // this.initializeSortable();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // this.cleanupSortable();
      this.teardownTabsEvents();
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      this.initializeSortable();
      console.log("NAMI", this.tabsFilteredAsVisibleList, this.tabsFilteredAsHiddenList);
      // this.updateSortableInstance(changedProperties);
      if (changedProperties.has("tabsFilteredAsHiddenList")) {
        this.tabsCopy = Array.from(this.tabsCopyHiddenListElements?.values() || []);
        this.tabsCopyHash = this.tabsCopy.reduce((acc, tab) => {
          acc[tab.id] = tab;
          return acc;
        }, {} as Record<TabId, DraggableTab.ELEMENT>);
      }

      if (changedProperties.has("isMoreTabMenuOpen")) {
        if (this.isMoreTabMenuVisible) {
          const oldValue = changedProperties.get("isMoreTabMenuOpen");
          if (this.isMoreTabMenuOpen && !oldValue) {
            // Add/Remove more overlay scroll
            if (this.moreItemsScrollLimit < this.tabsCopy.length) {
              this.isMoreTabMenuScrollable = true;
              this.moreTabMenuMaxHeight = `${this.measureHiddenTabsCopiesOffsetHeight()
                .slice(0, this.moreItemsScrollLimit)
                .reduce((acc, h) => {
                  acc += h;
                  return acc;
                }, 0)}px`;
            } else {
              this.isMoreTabMenuScrollable = false;
              this.moreTabMenuMaxHeight = null;
            }
          }
        }
      }
    }

    protected slottedChanged() {
      this.initializeSortable();
    }

    // private setSortableOption(
    //   name: Partial<keyof Sortable.SortableOptions>,
    //   value: Sortable.SortableOptions[keyof Sortable.SortableOptions]
    // ) {
    //   if (this.sortableInstance && this.sortableInstance.option(name) !== undefined) {
    //     this.sortableInstance.option(name, value);
    //   }
    // }

    // private updateSortableInstance(changedProperties: PropertyValues) {
    //   for (const propertyKey of changedProperties.keys()) {
    //     const value = (this.firstTabElement as any);
    //     this.setSortableOption(
    //       propertyKey as keyof Sortable.SortableOptions,
    //       value as Sortable.SortableOptions[keyof Sortable.SortableOptions]
    //     );
    //   }
    // }

    render() {
      return html`
        <div
          role="tablist"
          part="tabs-list"
          class="md-tab__list ${classMap({
            "md-tab__justified": this.justified
          })}"
          aria-disabled=${this.disabled}
        >
          <slot name="tab" style="visibility: hidden;display: block;width: 0;"></slot>
          <div id="firstTabs" part="first-tabs" style="display: flex;flex-direction: row;width: 100%">
            ${repeat(
              this.tabsFilteredAsVisibleList,
              tab => tab.id,
              tab => html`
                <md-draggable-tab
                  slot="draggable-item"
                  .disabled="${tab.disabled}"
                  .selected="${tab.selected}"
                  id="${this.getCopyTabId(tab)}"
                  aria-label=${tab.ariaLabel}
                  aria-controls="${tab.id}"
                  @click="${() => this.handleOverlayClose()}"
                  tabIndex="${this.tabHiddenIdPositiveTabIndex === tab.id ? 0 : -1}"
                >
                  ${unsafeHTML(tab.innerHTML)}
                </md-draggable-tab>
              `
            )}
          </div>

          <md-menu-overlay
            custom-width="${MORE_MENU_WIDTH}"
            class="md-menu-overlay__more ${classMap({
              "md-menu-overlay__more--hidden": false
            })}"
            placement="bottom-end"
            @menu-overlay-open="${() => (this.isMoreTabMenuOpen = true)}"
            @menu-overlay-close="${() => (this.isMoreTabMenuOpen = false)}"
          >
            <md-draggable-tab
              slot="menu-trigger"
              id="${MORE_MENU_TAB_TRIGGER_ID}"
              aria-label="${this.overlowLabel}"
              aria-haspopup="true"
              tabindex="${this.isMoreTabMenuVisible ? 0 : -1}"
              .selected=${this.isMoreTabMenuVisible ? this.isMoreTabMenuSelected : false}
              class="md-menu-overlay__more_tab ${classMap({
                "md-menu-overlay__more_tab--hidden": false
              })}"
            >
              <span>${this.overlowLabel}</span>
              <md-icon name="${!this.isMoreTabMenuOpen ? "arrow-down_16" : "arrow-up_16"}"></md-icon>
            </md-draggable-tab>
            <div id="secondTabs" part="second-tabs">
              <!-- <md-draggable sort> -->
              ${repeat(
                this.tabsFilteredAsHiddenList,
                tab => tab.id,
                tab => html`
                  <md-draggable-tab
                    slot="draggable-item"
                    .disabled="${tab.disabled}"
                    .selected="${tab.selected}"
                    id="${this.getCopyTabId(tab)}"
                    aria-label=${tab.ariaLabel}
                    aria-controls="${tab.id}"
                    @click="${() => this.handleOverlayClose()}"
                    tabIndex="${this.tabHiddenIdPositiveTabIndex === tab.id ? 0 : -1}"
                  >
                    ${unsafeHTML(tab.innerHTML)}
                  </md-draggable-tab>
                `
              )}
            </div>
          </md-menu-overlay>
        </div>
        <div part="tabs-content" class="md-tab__content">
          <slot name="panel"></slot>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-draggable-tabs": DraggableTabs.ELEMENT;
  }
}
