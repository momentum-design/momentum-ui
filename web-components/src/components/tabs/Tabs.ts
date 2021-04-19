/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import "@/components/menu-overlay/MenuOverlay";
import { Key } from "@/constants";
import { ResizeMixin, RovingTabIndexMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues, query, queryAll } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { repeat } from "lit-html/directives/repeat";
import { styleMap } from "lit-html/directives/style-map";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { nanoid } from "nanoid";
import styles from "./scss/module.scss";
import { Tab, TabClickEvent, TabKeyDownEvent } from "./Tab";
import { TabPanel } from "./TabPanel";
import { MenuOverlay } from "../menu-overlay/MenuOverlay"; // Keep type import as a relative path

const MORE_MENU_TAB_TRIGGER_ID = "tab-more";
const MORE_MENU_WIDTH = "264px"; // Designed width
export const MORE_MENU_TAB_COPY_ID_PREFIX = "more-menu-copy-";

export namespace Tabs {
  type TabViewportData = {
    isTabInViewportHidden: boolean;
    tabOffsetWidth: number;
  };
  type TabsViewportDataList = TabViewportData[];

  type TabId = Element["id"];

  @customElementWithCheck("md-tabs")
  export class ELEMENT extends ResizeMixin(RovingTabIndexMixin(LitElement)) {
    @property({ type: Boolean }) justified = false;
    @property({ type: String }) overlowLabel = "More";
    @property({ type: String }) direction = "horizontal";
    @property({ type: Number, attribute: "more-items-scroll-limit" }) moreItemsScrollLimit = Number.MAX_SAFE_INTEGER;

    @query("slot[name='tab']") tabSlotElement?: HTMLSlotElement;
    @query("slot[name='panel']") panelSlotElement?: HTMLSlotElement;
    @query(".md-tab__list[part='tabs-list']") tabsListElement?: HTMLDivElement;
    @query(".md-menu-overlay__more_tab") moreTabMenuElement?: Tab.ELEMENT;
    @query("md-menu-overlay") menuOverlayElement?: MenuOverlay.ELEMENT;

    @query(".md-tab__list[part='tabs-more-list']") tabsMoreListElement?: HTMLDivElement;
    @queryAll(".md-menu-overlay__more_list md-tab") tabsCopyHiddenListElements?: NodeListOf<Tab.ELEMENT>;

    @internalProperty() private isMoreTabMenuVisible = false;
    @internalProperty() private isMoreTabMenuMeasured = false;
    @internalProperty() private isMoreTabMenuOpen = false;
    @internalProperty() private isMoreTabMenuSelected = false;
    @internalProperty() private isMoreTabMenuScrollable = false;
    @internalProperty() private moreTabMenuOffsetWidth = 0;
    @internalProperty() private moreTabMenuMaxHeight: string | null = null;
    @internalProperty() private tabsViewportDataList: TabsViewportDataList = [];
    @internalProperty() private tabsFilteredAsVisibleList: Tab.ELEMENT[] = [];
    @internalProperty() private tabsFilteredAsHiddenList: Tab.ELEMENT[] = [];

    private tabs: Tab.ELEMENT[] = [];
    private panels: TabPanel.ELEMENT[] = [];

    private tabsCopy: Tab.ELEMENT[] = [];

    private tabsHash: Record<TabId, Tab.ELEMENT> = {};
    private tabsCopyHash: Record<TabId, Tab.ELEMENT> = {};

    private tabsIdxHash: Record<TabId, number> = {};

    private tabsVisibleIdxHash: Record<TabId, number> = {};
    private tabsHiddenIdxHash: Record<TabId, number> = {};
    private tabHiddenIdPositiveTabIndex?: TabId;

    private getCopyTabId(tab: Tab.ELEMENT) {
      return `${MORE_MENU_TAB_COPY_ID_PREFIX}${tab.id}`;
    }

    private getNormalizedTabId(id: TabId) {
      return id.replace(MORE_MENU_TAB_COPY_ID_PREFIX, "");
    }

    static get styles() {
      return [reset, styles];
    }

    private async ensureTabsUpdateComplete(tabs: Tab.ELEMENT[]) {
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

    private updateHiddenIdPositiveTabIndex(hiddenTab?: Tab.ELEMENT) {
      this.tabHiddenIdPositiveTabIndex = hiddenTab ? hiddenTab.id : undefined;
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

      tabs.forEach((tab, index) => {
        const id = nanoid();

        tab.setAttribute("id", id);
        tab.setAttribute("aria-controls", id);
        tab.selected = this.selected === index;

        if (this.direction === "vertical") {
          tab.vertical = true;
        }

        const panel = panels[index];

        if (panel) {
          panel.setAttribute("aria-labelledby", id);
          panel.selected = this.selected === index;
          if (tab.disabled) {
            panel.hidden = true;
          }
        } else {
          tab.disabled = true;
        }
      });

      this.tabsHash = this.tabs.reduce((acc, tab) => {
        acc[tab.id] = tab;
        return acc;
      }, {} as Record<TabId, Tab.ELEMENT>);

      this.tabsIdxHash = this.tabs.reduce((acc, tab, idx) => {
        acc[tab.id] = idx;
        return acc;
      }, {} as Record<TabId, number>);

      await this.manageOverflow();
    }

    get slotItem() {
      return this.tabSlotElement;
    }

    protected filterSlotted() {
      return this.tabSlotElement!.assignedElements() as HTMLElement[];
    }

    protected async handleResize(contentRect: DOMRect) {
      super.handleResize && super.handleResize(contentRect);
      await this.manageOverflow();
    }

    private updateSelectedTab(newSelectedIndex: number) {
      const { tabs, panels } = this;

      const oldSelectedIndex = this.slotted.findIndex(element => element.hasAttribute("selected"));

      if (oldSelectedIndex === newSelectedIndex) {
        return;
      }

      if (tabs && panels) {
        [oldSelectedIndex, newSelectedIndex].forEach(index => {
          const tab = tabs[index];
          tab && tab.toggleAttribute("selected");
          const panel = panels[index];
          panel && panel.toggleAttribute("selected");

          if (tab) {
            const tabCopy = this.tabsCopyHash[this.getCopyTabId(tab)];
            if (tabCopy) {
              tabCopy.toggleAttribute("selected");
              this.isMoreTabMenuSelected = true;
            } else {
              this.isMoreTabMenuSelected = false;
            }
          }
        });
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

    private makeTabCopyFocus(tabCopy: Tab.ELEMENT) {
      if (tabCopy) {
        tabCopy.focus();
      }
    }

    handleTabClick(event: CustomEvent<TabClickEvent>) {
      const { id } = event.detail;

      const tab = this.tabsHash[this.getNormalizedTabId(id)];

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

    private changeSelectedTabIdx(newSelectedTabIdx: number) {
      this.selected = newSelectedTabIdx;

      this.updateIsMoreTabMenuSelected();
    }

    handleOverlayClose() {
      if (this.menuOverlayElement) {
        this.menuOverlayElement.isOpen = false;
      }
    }

    handleTabKeydown(event: CustomEvent<TabKeyDownEvent>) {
      const { id, key, ctrlKey, shiftKey, altKey, srcEvent } = event.detail;

      const isMoreTriggerTab = this.isMoreTabMenuVisible ? id === MORE_MENU_TAB_TRIGGER_ID : false;

      const tab =
        !isMoreTriggerTab || !this.isMoreTabMenuVisible
          ? this.tabsHash[this.getNormalizedTabId(id)]
          : this.moreTabMenuElement;

      const isVisibleTab = this.isMoreTabMenuVisible ? tab && this.tabsVisibleIdxHash[tab.id] > -1 : true;
      const isHiddenTab = this.isMoreTabMenuVisible ? tab && this.tabsHiddenIdxHash[tab.id] > -1 : false;

      const firstVisibleTabIdx = 0;
      const lastVisibleTabIdx = this.isMoreTabMenuVisible
        ? this.tabsFilteredAsVisibleList.length - 1
        : this.tabs.length - 1;

      const firstHiddenTabIdx = this.isMoreTabMenuVisible ? this.tabsFilteredAsVisibleList.length : -1;
      const lastHiddenTabIdx = this.isMoreTabMenuVisible
        ? this.tabsFilteredAsVisibleList.length + this.tabsFilteredAsHiddenList.length - 1
        : -1;

      const makeNextCopyTabFocusByHiddenIdx = (hiddenListIdx: number) => {
        const nextTab = this.tabsFilteredAsHiddenList[hiddenListIdx];
        if (nextTab) {
          const nextCopyTab = this.tabsCopyHash[this.getCopyTabId(nextTab)];
          nextCopyTab && this.makeTabCopyFocus(nextCopyTab);
          !nextTab.disabled && this.updateHiddenIdPositiveTabIndex(nextTab);
        }
      };

      switch (key) {
        case Key.Tab: {
          if (isMoreTriggerTab) {
            // Support Shift + Tab from More to last visible tab
            if (!this.isMoreTabMenuOpen && shiftKey) {
              srcEvent.preventDefault();
              this.changeSelectedTabIdx(lastVisibleTabIdx);
            }
          } else if (isVisibleTab) {
            const oldSelectedIndex = this.slotted.findIndex(element => element.hasAttribute("selected"));
            this.changeSelectedTabIdx(oldSelectedIndex);
          } else if (isHiddenTab) {
            //
          }
          break;
        }
        case Key.End: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            this.changeSelectedTabIdx(lastVisibleTabIdx);
          } else if (isHiddenTab) {
            this.changeSelectedTabIdx(lastHiddenTabIdx);
            makeNextCopyTabFocusByHiddenIdx(this.tabsFilteredAsHiddenList.length - 1);
          }
          break;
        }
        case Key.Home: {
          if (isMoreTriggerTab) {
            this.changeSelectedTabIdx(firstVisibleTabIdx);
          } else if (isVisibleTab) {
            this.changeSelectedTabIdx(firstVisibleTabIdx);
          } else if (isHiddenTab) {
            this.changeSelectedTabIdx(firstHiddenTabIdx);
            makeNextCopyTabFocusByHiddenIdx(0);
          }
          break;
        }
        case Key.ArrowLeft: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            this.changeSelectedTabIdx(this.selected === firstVisibleTabIdx ? lastVisibleTabIdx : this.selected - 1);
          } else if (isHiddenTab) {
            //
          }
          break;
        }
        case Key.ArrowRight: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            this.changeSelectedTabIdx(this.selected === lastVisibleTabIdx ? firstVisibleTabIdx : this.selected + 1);
          } else if (isHiddenTab) {
            //
          }
          break;
        }
        case Key.ArrowUp: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            //
          } else if (isHiddenTab) {
            const idx = this.selected === firstHiddenTabIdx ? lastHiddenTabIdx : this.selected - 1;
            this.changeSelectedTabIdx(idx);
            makeNextCopyTabFocusByHiddenIdx(idx - this.tabsFilteredAsVisibleList.length);
          }
          break;
        }
        case Key.ArrowDown: {
          if (isMoreTriggerTab) {
            //
          } else if (isVisibleTab) {
            //
          } else if (isHiddenTab) {
            const idx = this.selected === lastHiddenTabIdx ? firstHiddenTabIdx : this.selected + 1;
            this.changeSelectedTabIdx(idx);
            makeNextCopyTabFocusByHiddenIdx(idx - this.tabsFilteredAsVisibleList.length);
          }
          break;
        }
        case Key.Enter:
        case Key.Space: {
          if (isMoreTriggerTab) {
            const tabsFilteredAsHiddenNonDisabledList = this.tabsFilteredAsHiddenList.filter(t => !t.disabled);
            const t =
              tabsFilteredAsHiddenNonDisabledList.find(t => t.selected) || tabsFilteredAsHiddenNonDisabledList.length
                ? tabsFilteredAsHiddenNonDisabledList[0]
                : undefined;
            this.updateHiddenIdPositiveTabIndex(t);
            if (t) {
              const idx = this.tabsIdxHash[this.getNormalizedTabId(t.id)];
              if (idx !== -1) {
                this.updateSelectedTab(idx);
              }
            }
          } else if (tab && !tab.disabled) {
            const idx = this.tabsIdxHash[this.getNormalizedTabId(tab.id)];
            if (idx !== -1) {
              this.updateSelectedTab(idx);
            }
          }
          break;
        }
      }
    }

    private setupTabsEvents() {
      this.addEventListener("tab-click", this.handleTabClick as EventListener);
      this.addEventListener("tab-keydown", this.handleTabKeydown as EventListener);
    }

    private teardownTabsEvents() {
      this.removeEventListener("tab-click", this.handleTabClick as EventListener);
      this.removeEventListener("tab-keydown", this.handleTabKeydown as EventListener);
    }

    private setupPanelsAndTabs() {
      if (this.tabSlotElement) {
        this.tabs = this.tabSlotElement.assignedElements() as Tab.ELEMENT[];
      }
      if (this.panelSlotElement) {
        this.panels = this.panelSlotElement.assignedElements() as TabPanel.ELEMENT[];
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

    disconnectedCallback() {
      super.disconnectedCallback();
      this.teardownTabsEvents();
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this.setupTabsEvents();
    }

    protected async updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("slotted")) {
        this.setupPanelsAndTabs();
        this.linkPanelsAndTabs();
      }

      if (changedProperties.has("tabsFilteredAsHiddenList")) {
        this.tabsCopy = Array.from(this.tabsCopyHiddenListElements?.values() || []);
        this.tabsCopyHash = this.tabsCopy.reduce((acc, tab) => {
          acc[tab.id] = tab;
          return acc;
        }, {} as Record<TabId, Tab.ELEMENT>);
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

    render() {
      return html`
        <div
          part="tabs-list"
          class="md-tab__list ${classMap({
            "md-tab__justified": this.justified && !this.isMoreTabMenuVisible
          })}"
          role="tablist"
        >
          <slot name="tab"></slot>

          <md-menu-overlay
            custom-width="${MORE_MENU_WIDTH}"
            class="md-menu-overlay__more ${classMap({
              "md-menu-overlay__more--hidden": this.isMoreTabMenuMeasured && !this.isMoreTabMenuVisible
            })}"
            placement="bottom-end"
            @menu-overlay-open="${() => (this.isMoreTabMenuOpen = true)}"
            @menu-overlay-close="${() => (this.isMoreTabMenuOpen = false)}"
          >
            <md-tab
              slot="menu-trigger"
              id="${MORE_MENU_TAB_TRIGGER_ID}"
              tabindex="${this.isMoreTabMenuVisible ? 0 : -1}"
              .selected=${this.isMoreTabMenuVisible ? this.isMoreTabMenuSelected : false}
              class="md-menu-overlay__more_tab ${classMap({
                "md-menu-overlay__more_tab--hidden": !this.isMoreTabMenuVisible
              })}"
            >
              <span>${this.overlowLabel}</span>
              <md-icon name="${!this.isMoreTabMenuOpen ? "arrow-down_16" : "arrow-up_16"}"></md-icon>
            </md-tab>
            <div
              part="tabs-more-list"
              class="md-tab__list md-menu-overlay__more_list"
              style="${styleMap(
                this.isMoreTabMenuScrollable && this.moreTabMenuMaxHeight
                  ? {
                      "overflow-y": "auto",
                      height: this.moreTabMenuMaxHeight,
                      "max-height": this.moreTabMenuMaxHeight
                    }
                  : {}
              )}"
            >
              ${repeat(
                this.tabsFilteredAsHiddenList,
                tab => tab.id,
                tab => html`
                  <md-tab
                    .disabled="${tab.disabled}"
                    .selected="${tab.selected}"
                    id="${this.getCopyTabId(tab)}"
                    aria-controls="${tab.id}"
                    @click="${() => this.handleOverlayClose()}"
                    tabIndex="${this.tabHiddenIdPositiveTabIndex === tab.id ? 0 : -1}"
                  >
                    ${unsafeHTML(tab.innerHTML)}
                  </md-tab>
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
    "md-tabs": Tabs.ELEMENT;
  }
}
