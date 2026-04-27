/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "../button/Button";
import "../chip/Chip";
import "../icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, nothing, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./scss/module.scss";

const SEVERITY_MAP: Record<string, { icon: string; color: string }> = {
  critical: { icon: "flag-filled", color: "negative" },
  warning: { icon: "warning-filled", color: "warning" }
};

export interface CardAlertLocale {
  live: string;
  dismiss: string;
  justNow: string;
  minutesAgo: (n: number) => string;
  hoursAgo: (n: number) => string;
  daysAgo: (n: number) => string;
}

const DEFAULT_LOCALE: CardAlertLocale = {
  live: "Live",
  dismiss: "Dismiss",
  justNow: "Just now",
  minutesAgo: (n) => `${n} ${n === 1 ? "min" : "mins"} ago`,
  hoursAgo: (n) => `${n} ${n === 1 ? "hour" : "hours"} ago`,
  daysAgo: (n) => `${n} ${n === 1 ? "day" : "days"} ago`
};

export namespace CardAlert {
  export interface DetailRow {
    label: string;
    value: string;
    highlighted?: boolean;
  }

  @customElementWithCheck("md-card-alert")
  export class ELEMENT extends LitElement {
    static readonly locale: CardAlertLocale = { ...DEFAULT_LOCALE };

    @property({ type: String }) severity = "";
    @property({ type: String }) category = "";
    @property({ type: String }) timestamp = "";
    @property({ type: Boolean }) live = false;
    @property({ type: String }) title = "";
    @property({ type: String }) queueName = "";
    @property({ type: Array }) details: DetailRow[] = [];
    @property({ type: String }) insight = "";
    @property({ type: String }) primaryActionLabel = "Click";
    @property({ type: Boolean }) primaryActionDropdown = false;
    @property({ type: String }) detailsHeading = "";
    @property({ type: Boolean }) showDismiss = true;
    @property({ type: Boolean }) expanded = false;

    @state() private relativeTime = "";
    private timerInterval?: ReturnType<typeof setInterval>;

    static get styles() {
      return [reset, styles];
    }

    private get severityIcon(): string {
      return SEVERITY_MAP[this.severity.toLowerCase()]?.icon ?? "info-circle-filled";
    }

    private get severityColor(): string {
      return SEVERITY_MAP[this.severity.toLowerCase()]?.color ?? "neutral";
    }

    private updateRelativeTime() {
      if (this.timestamp && !this.live) {
        this.relativeTime = this.formatRelativeTime(this.timestamp);
      }
    }

    private startTimer() {
      this.stopTimer();
      if (this.timestamp && !this.live) {
        this.updateRelativeTime();
        this.timerInterval = setInterval(() => this.updateRelativeTime(), 60000);
      }
    }

    private stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = undefined;
      }
    }

    protected willUpdate(changedProperties: PropertyValues) {
      if (changedProperties.has("timestamp") || changedProperties.has("live")) {
        this.startTimer();
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.stopTimer();
    }

    private formatRelativeTime(timestamp: string | number): string {
      const loc = (this.constructor as typeof ELEMENT).locale;
      const now = Date.now();
      const then = typeof timestamp === "number" ? timestamp : new Date(timestamp).getTime();
      if (isNaN(then)) return "";
      const diffMs = now - then;
      if (diffMs < 0) return loc.justNow;
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return loc.justNow;
      if (diffMins < 60) return loc.minutesAgo(diffMins);
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return loc.hoursAgo(diffHours);
      const diffDays = Math.floor(diffHours / 24);
      return loc.daysAgo(diffDays);
    }

    private handlePrimaryAction() {
      this.dispatchEvent(new CustomEvent("primary-action-clicked", { bubbles: true, composed: true }));
    }

    private handleDismiss() {
      this.dispatchEvent(new CustomEvent("dismiss-clicked", { bubbles: true, composed: true }));
    }

    private renderTimestamp() {
      const loc = (this.constructor as typeof ELEMENT).locale;
      if (this.live) {
        return html`<span class="md-card-alert-live"
          ><md-icon
            name="active-presence-small-filled"
            size="10"
            iconSet="momentumDesign"
            class="md-card-alert-live-icon"
          ></md-icon
          >${loc.live}</span
        >`;
      }
      if (this.relativeTime) {
        return html`<span class="md-card-alert-timestamp">${this.relativeTime}</span>`;
      }
      return nothing;
    }

    private renderHeader() {
      if (!this.severity && !this.category && !this.timestamp && !this.live) return nothing;
      return html`
        <div class="md-card-alert-header">
          <div class="md-card-alert-chips">
            ${this.severity
              ? html`
                  <md-chip value=${this.severity} color=${this.severityColor} small>
                    <md-icon
                      name=${this.severityIcon}
                      size="14"
                      iconSet="momentumDesign"
                      slot="custom-left-content"
                    ></md-icon>
                  </md-chip>
                `
              : nothing}
            ${this.category ? html`<md-chip value=${this.category} color="neutral" small></md-chip>` : nothing}
          </div>
          ${this.renderTimestamp()}
        </div>
      `;
    }

    private renderTitleSection() {
      if (!this.title && !this.queueName) return nothing;
      return html`
        <div class="md-card-alert-title-section">
          ${this.title ? html`<h3 class="md-card-alert-title">${this.title}</h3>` : nothing}
          ${this.queueName
            ? html`
                <p class="md-card-alert-subtitle">
                  <md-icon
                    name="queue-contact-bold"
                    size="16"
                    iconSet="momentumDesign"
                    class="md-card-alert-subtitle-icon"
                  ></md-icon>
                  ${this.queueName}
                </p>
              `
            : nothing}
        </div>
      `;
    }

    private renderDetails() {
      if (!this.details || this.details.length === 0) return nothing;
      return html`
        <div class="md-card-alert-details">
          <span class="md-card-alert-details-heading">${this.detailsHeading}</span>
          ${this.details.map(
            (row) => html`
              <div class="md-card-alert-detail-row">
                <span class="md-card-alert-detail-label">${row.label}</span>
                <span
                  class=${classMap({
                    "md-card-alert-detail-value": true,
                    "md-card-alert-detail-value--highlighted": !!row.highlighted
                  })}
                  >${row.value}</span
                >
              </div>
            `
          )}
        </div>
      `;
    }

    private renderInsight() {
      if (!this.insight) return nothing;
      return html`
        <div class="md-card-alert-insight">
          <md-icon name="sparkle-filled" iconSet="momentumDesign" class="md-card-alert-insight-icon"></md-icon>
          <span class="md-card-alert-insight-text">${this.insight}</span>
        </div>
      `;
    }

    private renderActions() {
      return html`
        <div class="md-card-alert-actions">
          <md-button
            size="32"
            variant="primary"
            class="md-card-alert-primary-action"
            ariaLabel=${this.primaryActionLabel}
            @click=${this.handlePrimaryAction}
          >
            <span slot="text">${this.primaryActionLabel}</span>
            ${this.primaryActionDropdown
              ? html`<md-icon
                  name=${this.expanded ? "arrow-up-bold" : "arrow-down-bold"}
                  size="12"
                  iconSet="momentumDesign"
                ></md-icon>`
              : nothing}
          </md-button>
          ${this.showDismiss
            ? html`
                <md-button
                  size="32"
                  variant="secondary"
                  outline
                  class="md-card-alert-dismiss"
                  ariaLabel=${(this.constructor as typeof ELEMENT).locale.dismiss}
                  @click=${this.handleDismiss}
                >
                  <span slot="text">${(this.constructor as typeof ELEMENT).locale.dismiss}</span>
                </md-button>
              `
            : nothing}
        </div>
      `;
    }

    render() {
      return html`
        <div class="md-card-alert" part="card" tabindex="0">
          ${this.renderHeader()} ${this.renderTitleSection()} ${this.renderDetails()} ${this.renderInsight()}
          ${this.renderActions()}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-card-alert": CardAlert.ELEMENT;
  }
}
