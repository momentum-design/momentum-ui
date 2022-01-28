import "@/components/sass-stats/SassStats";
import "@/components/theme/Theme";
import reset from "@/wc_scss/reset.scss";
import styles from "@/[sandbox]/sandbox.scss";
import "elix/define/ListExplorer.js";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import {
  accordionTemplate,
  alertBannerTemplate,
  alertTemplate,
  avatarTemplate,
  badgeTemplate,
  breadcrumbTemplate,
  buttonGroupTemplate,
  buttonTemplate,
  cardTemplate,
  chatMessageTemplate,
  checkboxTemplate,
  chipTemplate,
  coachTemplate,
  codeEditorTemplate,
  colorTableTemplate,
  comboBoxTemplate,
  datePickerTemplate,
  dateRangePickerTemplate,
  dateTimePickerTemplate,
  draggableTemplate,
  dropdownTemplate,
  editableField,
  favoriteTemplate,
  floatingModalTemplate,
  formTemplate,
  iconTemplate,
  inputFileTemplate,
  inputTemplate,
  labelTemplate,
  linkTemplate,
  listTemplate,
  loadingTemplate,
  meetingAlertTemplate,
  menuItemTemplate,
  menuOverlayTemplate,
  modalTemplate,
  paginationTemplate,
  phoneInputTemplate,
  progressBarTemplate,
  radioGroupTemplate,
  sliderTemplate,
  spinnerTemplate,
  tableAdvancedTemplate,
  tableTemplate,
  tabsTemplate,
  taskItemTemplate,
  timePickerTemplate,
  toggleSwitchTemplate,
  tooltipTemplate
} from "./examples";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  @property({ type: Boolean }) darkTheme = false;
  @property({ type: Boolean }) lumos = false;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.darkTheme) {
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }

  toggleSetting(event: MouseEvent) {
    const composedPath = event.composedPath();
    const target = (composedPath[0] as unknown) as HTMLOrSVGElement;
    const { aspect } = target.dataset;
    if (aspect === "lumos") {
      this.lumos = !this.lumos;
    } else if (aspect === "darkTheme") {
      this.darkTheme = !this.darkTheme;
    } else {
      console.error("Invalid data-aspect input");
      return;
    }
  }

  themeToggle() {
    return html`
      <div class="toggle-container">
        <label class="switch">
          <input
            type="checkbox"
            id="theme-switch"
            class="theme-switch"
            data-aspect="darkTheme"
            @click=${this.toggleSetting}
            ?checked=${this.darkTheme}
          />
          Dark Mode
        </label>
        <label class="switch">
          <input
            type="checkbox"
            class="lumos-switch"
            data-aspect="lumos"
            @click=${this.toggleSetting}
            ?checked=${this.lumos}
          />
          Lumos Theme
        </label>
      </div>
    `;
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <md-theme class="theme-toggle" id="app-theme" ?darkTheme=${this.darkTheme} ?lumos=${this.lumos}>
        ${this.themeToggle()}
        <elix-list-explorer class="explorer">
          <div class="container" aria-label="md-tabs">
            <h2>md-tabs</h2>
            <sass-stats component="tabs">
              ${tabsTemplate}
            </sass-stats>
          </div>
        </elix-list-explorer>
      </md-theme>
    `;
  }
}
