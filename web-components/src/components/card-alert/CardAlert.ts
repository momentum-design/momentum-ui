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

export enum CardAlertSeverity {
  CRITICAL = "critical",
  MEDIUM = "medium"
}

export enum CardAlertStatus {
  DEFAULT = "default",
  CONFIGURED = "configured",
  PROCESSING = "processing",
  SCHEDULED = "scheduled",
  NEEDS_ATTENTION = "needs-attention",
  APPLIED = "applied",
  RESOLVED = "resolved"
}

const STATUS_MAP: Record<
  Exclude<CardAlertStatus, CardAlertStatus.DEFAULT>,
  { localeKey: "configured" | "processing" | "scheduled" | "needsAttention" | "applied" | "resolved"; icon: string }
> = {
  [CardAlertStatus.CONFIGURED]: { localeKey: "configured", icon: "info-badge-filled" },
  [CardAlertStatus.PROCESSING]: { localeKey: "processing", icon: "info-badge-filled" },
  [CardAlertStatus.SCHEDULED]: { localeKey: "scheduled", icon: "info-badge-filled" },
  [CardAlertStatus.NEEDS_ATTENTION]: { localeKey: "needsAttention", icon: "info-badge-filled" },
  [CardAlertStatus.APPLIED]: { localeKey: "applied", icon: "info-badge-filled" },
  [CardAlertStatus.RESOLVED]: { localeKey: "resolved", icon: "check-circle-badge-filled" }
};

const SEVERITY_MAP: Record<CardAlertSeverity, { icon: string; color: string }> = {
  [CardAlertSeverity.CRITICAL]: { icon: "flag-filled", color: "negative" },
  [CardAlertSeverity.MEDIUM]: { icon: "warning-filled", color: "warning" }
};

export interface CardAlertLocale {
  dismiss?: string;
  configured?: string;
  processing?: string;
  scheduled?: string;
  needsAttention?: string;
  applied?: string;
  resolved?: string;
  justNow: string;
  minutesAgo: (n: number) => string;
  hoursAgo: (n: number) => string;
  daysAgo: (n: number) => string;
}

type ResolvedCardAlertLocale = Required<CardAlertLocale>;

const DEFAULT_LOCALE: ResolvedCardAlertLocale = {
  dismiss: "Dismiss",
  configured: "Configured",
  processing: "Processing",
  scheduled: "Scheduled",
  needsAttention: "Needs attention",
  applied: "Applied",
  resolved: "Resolved",
  justNow: "Just now",
  minutesAgo: (n) => `${n} ${n === 1 ? "min" : "mins"} ago`,
  hoursAgo: (n) => `${n} ${n === 1 ? "hour" : "hours"} ago`,
  daysAgo: (n) => `${n} ${n === 1 ? "day" : "days"} ago`
};

const resolveLocale = (locale?: CardAlertLocale): ResolvedCardAlertLocale => ({
  ...DEFAULT_LOCALE,
  ...locale,
  dismiss: locale?.dismiss ?? DEFAULT_LOCALE.dismiss,
  configured: locale?.configured ?? DEFAULT_LOCALE.configured,
  processing: locale?.processing ?? DEFAULT_LOCALE.processing,
  scheduled: locale?.scheduled ?? DEFAULT_LOCALE.scheduled,
  needsAttention: locale?.needsAttention ?? DEFAULT_LOCALE.needsAttention,
  applied: locale?.applied ?? DEFAULT_LOCALE.applied,
  resolved: locale?.resolved ?? DEFAULT_LOCALE.resolved
});

export enum CardAlertDetailImpact {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  NEUTRAL = "neutral"
}

export namespace CardAlert {
  export interface DetailRow {
    label: string;
    value: string;
    subvalue?: string;
    impact?: CardAlertDetailImpact;
  }

  @customElementWithCheck("md-card-alert")
  export class ELEMENT extends LitElement {
    static readonly locale: CardAlertLocale = { ...DEFAULT_LOCALE };

    @property({ type: String }) severity: CardAlertSeverity | "" = "";
    @property({ type: String }) category = "";
    @property({ type: String }) secondaryChip = "";
    @property({ type: String }) timestamp = "";
    @property({ type: String }) status: CardAlertStatus = CardAlertStatus.DEFAULT;
    @property({ type: String }) title = "";
    @property({ type: String }) queueName = "";
    @property({ type: Array }) details: DetailRow[] = [];
    @property({ type: String }) insight = "";
    @property({ type: String }) primaryActionLabel = "";
    @property({ type: Boolean }) primaryActionDropdown = false;
    @property({ type: String }) detailsHeading = "";
    @property({ type: Boolean }) expanded = false;

    @state() private relativeTime = "";
    private timerInterval?: ReturnType<typeof setInterval>;

    static get styles() {
      return [reset, styles];
    }

    private get normalizedSeverity(): CardAlertSeverity | undefined {
      const severity = (this.severity ?? "").toLowerCase() as CardAlertSeverity;
      return Object.values(CardAlertSeverity).includes(severity) ? severity : undefined;
    }

    private get severityIcon(): string {
      return this.normalizedSeverity ? SEVERITY_MAP[this.normalizedSeverity].icon : "plus-circle-filled";
    }

    private get severityColor(): string {
      return this.normalizedSeverity ? SEVERITY_MAP[this.normalizedSeverity].color : "neutral";
    }

    private get hasInsight(): boolean {
      return (this.insight ?? "").trim().length > 0;
    }

    private get detailRows(): DetailRow[] {
      return Array.isArray(this.details) ? this.details : [];
    }

    private get resolvedLocale(): ResolvedCardAlertLocale {
      return resolveLocale((this.constructor as typeof ELEMENT).locale);
    }

    private get normalizedStatus(): CardAlertStatus {
      return Object.values(CardAlertStatus).includes(this.status) ? this.status : CardAlertStatus.DEFAULT;
    }

    private updateRelativeTime() {
      this.relativeTime = this.timestamp ? this.formatRelativeTime(this.timestamp) : "";
    }

    private startTimer() {
      this.stopTimer();
      this.updateRelativeTime();
      if (this.timestamp) {
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
      if (changedProperties.has("timestamp") || changedProperties.has("status")) {
        if (this.normalizedStatus === CardAlertStatus.DEFAULT) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.stopTimer();
    }

    private formatRelativeTime(timestamp: string | number): string {
      const loc = this.resolvedLocale;
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

    private renderStatusOrTimestamp(status: CardAlertStatus) {
      if (status !== CardAlertStatus.DEFAULT) {
        const { icon, localeKey } = STATUS_MAP[status];
        return html`
          <span class="md-card-alert-status md-card-alert-status--${status}">
            <md-icon name=${icon} size="16" iconSet="momentumDesign" ariaHidden="true"></md-icon>
            ${this.resolvedLocale[localeKey]}
          </span>
        `;
      }

      if (this.relativeTime) {
        return html`<span class="md-card-alert-timestamp">${this.relativeTime}</span>`;
      }
      return nothing;
    }

    private renderHeader() {
      const status = this.normalizedStatus;
      if (!this.severity && !this.category && !this.timestamp && status === CardAlertStatus.DEFAULT) return nothing;
      return html`
        <div class="md-card-alert-header">
          <div class="md-card-alert-chips">
            <md-chip color=${this.severityColor} value=${this.category} small>
              <md-icon
                name=${this.severityIcon}
                size="14"
                iconSet="momentumDesign"
                slot="custom-left-content"
              ></md-icon>
            </md-chip>
            ${this.secondaryChip
              ? html`<md-chip color="confidence-cobalt" value=${this.secondaryChip} small></md-chip>`
              : nothing}
          </div>
          ${this.renderStatusOrTimestamp(status)}
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
                  <span class="md-card-alert-subtitle-text">${this.queueName}</span>
                </p>
              `
            : nothing}
        </div>
      `;
    }

    private renderDetails() {
      if (this.detailRows.length === 0) return nothing;
      return html`
        <div class="md-card-alert-details">
          <span class="md-card-alert-details-heading">${this.detailsHeading}</span>
          ${this.detailRows.slice(0, 3).map(
            (row) => html`
              <div class="md-card-alert-detail-row">
                <span class="md-card-alert-detail-label">${row.label}</span>
                <span
                  class=${classMap({
                    "md-card-alert-detail-value": true,
                    "md-card-alert-detail-value--positive": row.impact === CardAlertDetailImpact.POSITIVE,
                    "md-card-alert-detail-value--negative": row.impact === CardAlertDetailImpact.NEGATIVE
                  })}
                >
                  ${row.value}
                  ${row.subvalue ? html`<span class="md-card-alert-detail-subvalue">${row.subvalue}</span>` : nothing}
                </span>
              </div>
            `
          )}
        </div>
      `;
    }

    private renderInsight() {
      if (!this.hasInsight) return nothing;
      return html`
        <div class="md-card-alert-insight">
          <md-icon name="sparkle-filled" iconSet="momentumDesign" class="md-card-alert-insight-icon"></md-icon>
          <span class="md-card-alert-insight-text">${this.insight}</span>
        </div>
      `;
    }

    private renderActions() {
      const status = this.normalizedStatus;
      const isResolved = status === CardAlertStatus.RESOLVED;
      const showDismiss = status !== CardAlertStatus.DEFAULT && !isResolved;
      const dismissLabel = this.resolvedLocale.dismiss;

      return html`
        <div class="md-card-alert-actions">
          ${this.primaryActionLabel
            ? html`
                <md-button
                  size="32"
                  variant="primary"
                  class="md-card-alert-primary-action"
                  .maxWidth=${"100%"}
                  ariaLabel=${this.primaryActionLabel}
                  ?disabled=${isResolved}
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
              `
            : nothing}
          ${showDismiss
            ? html`
                <md-button
                  size="32"
                  variant="secondary"
                  class="md-card-alert-dismiss"
                  ariaLabel=${dismissLabel}
                  @click=${this.handleDismiss}
                >
                  <span slot="text">${dismissLabel}</span>
                </md-button>
              `
            : nothing}
        </div>
      `;
    }

    render() {
      return html`
        <div
          class=${classMap({
            "md-card-alert": true,
            "md-card-alert--no-insight": !this.hasInsight,
            "md-card-alert--expanded": this.expanded
          })}
          part="card"
          tabindex="0"
        >
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
