import styles from "@/[sandbox]/sandbox.scss";
import "@/components/sass-stats/SassStats";
import "@/components/theme/Theme";
import { ThemeName } from "@/components/theme/Theme";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import {
  accordionTemplate,
  alertBannerTemplate,
  alertTemplate,
  audioPlayerTemplate,
  avatarTemplate,
  badgeTemplate,
  breadcrumbTemplate,
  buttonGroupTemplate,
  buttonTemplate,
  cardAiTemplate,
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
  grabberTemplate,
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
  tooltipTemplate,
  advanceListTemplate
} from "./examples";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  @property({ type: Boolean }) darkTheme = false;
  @property({ type: String }) theme: ThemeName = "lumos";

  connectedCallback(): void {
    super.connectedCallback();
    this.loadSettingsFromStorage();
    console.log("connected");
  }

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

  loadSettingsFromStorage() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      this.theme = storedTheme as ThemeName;
    }

    const storedDarkTheme = localStorage.getItem("darkTheme");
    if (storedDarkTheme) {
      this.darkTheme = JSON.parse(storedDarkTheme);
    }
  }

  toggleSetting(event: MouseEvent) {
    const composedPath = event.composedPath();
    const target = composedPath[0] as unknown as HTMLOrSVGElement;
    const { aspect } = target.dataset;
    if (aspect === "lumos" || aspect === "momentumV2" || aspect === "momentum") {
      this.theme = aspect;
      localStorage.setItem("theme", this.theme);
    } else if (aspect === "darkTheme") {
      this.darkTheme = !this.darkTheme;
      localStorage.setItem("darkTheme", JSON.stringify(this.darkTheme));
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
            type="radio"
            name="theme-switch"
            class="momentum-switch"
            data-aspect="momentum"
            @click=${this.toggleSetting}
            ?checked=${this.theme === "momentum"}
          />
          Momentum
        </label>
        <label class="switch">
          <input
            type="radio"
            name="theme-switch"
            class="lumos-switch"
            data-aspect="lumos"
            @click=${this.toggleSetting}
            ?checked=${this.theme === "lumos"}
          />
          Lumos
        </label>
        <label class="switch">
          <input
            type="radio"
            name="theme-switch"
            class="momentumv2-switch"
            data-aspect="momentumV2"
            @click=${this.toggleSetting}
            ?checked=${this.theme === "momentumV2"}
          />
          MomentumV2
        </label>
      </div>
    `;
  }

  containerColorOptionTemplate() {
    return html`
      <div class="container-color-bg-color-options">
        <label for="color-dropdown">container color:</label>
        <select id="color-dropdown" name="colors" @change=${this.handleContainerColorChange}>
          <option value="--md-primary-bg-color">--md-primary-bg-color</option>
          <option value="--md-secondary-bg-color">--md-secondary-bg-color</option>
          <option value="--md-primary-gradient-background">--md-primary-gradient-background</option>
          <option value="--md-secondary-gradient-background">--md-secondary-gradient-background</option>
          <option value="--md-secondary-bg-color">--md-secondary-bg-color</option>
          <option value="--md-tertiary-one-bg-color">--md-tertiary-one-bg-color</option>
          <option value="--md-quaternary-bg-color">--md-md-quaternary-bg-color</option>
          <option value="--md-secondary-white-bg-color">--md-secondary-white-bg-color</option>
        </select>
      </div>
    `;
  }

  handleContainerColorChange() {
    const colorDropdown = this.shadowRoot?.getElementById("color-dropdown") as HTMLSelectElement;
    const selectedColor = colorDropdown.value;
    const elements = this.shadowRoot?.querySelectorAll(".container");
    elements?.forEach((element) => {
      const containerElement = element as HTMLElement;
      containerElement.style.background = `var(${selectedColor})`;
    });
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <md-theme class="theme-toggle" id="app-theme" ?darkTheme=${this.darkTheme} theme=${this.theme}>
        <div class="header-controls">${this.themeToggle()} ${this.containerColorOptionTemplate()}</div>

        <md-tabs direction="vertical" class="explorer" persist-selection tabs-id="explorer">
          <md-tab slot="tab" name="Accordion">
            <span>md-accordion</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-accordion">
              <h2>md-accordion</h2>
              <sass-stats component="accordion"> ${accordionTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Alert Banner">
            <span>md-alert-banner</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-alert-banner">
              <h2>md-alert-banner</h2>
              <sass-stats component="alert-banner"> ${alertBannerTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Alert">
            <span>md-alert</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-alert">
              <h2>md-alert</h2>
              <sass-stats component="alert"> ${alertTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Audio Player">
            <span>md-audio-player</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-audio-player">
              <h2>md-audio-player</h2>
              <sass-stats component="audio-player"> ${audioPlayerTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Avatar">
            <span>md-avatar</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-avatar">
              <h2>md-avatar</h2>
              <sass-stats component="avatar"> ${avatarTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Badge">
            <span>md-badge</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-badge">
              <h2>md-badge</h2>
              <sass-stats component="badge"> ${badgeTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Breadcrumb">
            <span>md-breadcrumb</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-breadcrumb">
              <h2>md-breadcrumb</h2>
              <sass-stats component="breadcrumb"> ${breadcrumbTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Button">
            <span>md-button</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-button">
              <h2>md-button</h2>
              <sass-stats component="button"> ${buttonTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Button Group">
            <span>md-button-group</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-button-group">
              <h2>md-button-group</h2>
              <sass-stats component="button-group"> ${buttonGroupTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Card">
            <span>md-card</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-card">
              <h2>md-card</h2>
              <sass-stats component="card"> ${cardTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Card - AI">
            <span>md-card-ai</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-card-ai">
              <h2>md-card-ai</h2>
              <sass-stats component="card-ai"> ${cardAiTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Chat Message">
            <span>md-chat-message</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-chat-message">
              <h2>md-chat-message</h2>
              <sass-stats component="chat-message"> ${chatMessageTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Checkbox">
            <span>md-checkbox</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-checkbox">
              <h2>md-checkbox</h2>
              <sass-stats component="checkbox"> ${checkboxTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Chip">
            <span>md-chip</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-chip">
              <h2>md-chip</h2>
              <sass-stats component="chip"> ${chipTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Coachmark">
            <span>md-coachmark</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-coachmark">
              <h2>md-coachmark</h2>
              <sass-stats component="coachmark"> ${coachTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Code Editor">
            <span>md-code-editor</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-code-editor">
              <h2>md-code-editor</h2>
              <sass-stats component="code-editor"> ${codeEditorTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Combo Box">
            <span>md-combobox</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-combo-box">
              <h2>md-combobox</h2>
              <sass-stats component="combobox"> ${comboBoxTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Datepicker">
            <span>md-datepicker</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-datepicker">
              <h2>md-datepicker</h2>
              <sass-stats component="datepicker"> ${datePickerTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Date Range Picker">
            <span>md-date-range-picker</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-date-range-picker">
              <h2>md-date-range-picker</h2>
              <sass-stats component="datepicker"> ${dateRangePickerTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Date Time Picker">
            <span>md-date-time-picker</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-date-time-picker">
              <h2>md-date-time-picker</h2>
              <sass-stats component="date-time-picker"> ${dateTimePickerTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Dropdown">
            <span>md-dropdown</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-dropdown">
              <h2>md-dropdown</h2>
              <sass-stats component="dropdown"> ${dropdownTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Draggable">
            <span>md-draggable</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-draggable">
              <h2>md-draggable</h2>
              <sass-stats component="draggable"> ${draggableTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Editable Field">
            <span>md-editable-field</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-editable-field">
              <h2>md-editable-field</h2>
              <sass-stats component="editable-textfield"> ${editableField} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Favorite">
            <span>md-favorite</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-favorite">
              <h2>md-favorite</h2>
              <sass-stats component="favorite"> ${favoriteTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Floating Modal">
            <span>md-floating-modal</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-floating-modal">
              <h2>md-floating-modal</h2>
              <sass-stats component="floating-modal"> ${floatingModalTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Form">
            <span>md-form</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-form">
              <h2>md-form</h2>
              ${formTemplate}
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Grabber">
            <span>md-grabber</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-grabber">
              <h2>md-grabber</h2>
              ${grabberTemplate}
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Icon">
            <span>md-icon</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-icon">
              <h2>md-icon</h2>
              <sass-stats component="icon"> ${iconTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Input">
            <span>md-input</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-input">
              <h2>md-input</h2>
              <sass-stats component="input"> ${inputTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Input File">
            <span>md-input-file</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-input-file">
              <h2>md-input-file</h2>
              <sass-stats component="input-file"> ${inputFileTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Label">
            <span>md-label</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-label">
              <h2>md-label</h2>
              <sass-stats component="label"> ${labelTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Link">
            <span>md-link</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-link">
              <h2>md-link</h2>
              <sass-stats component="link"> ${linkTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="List">
            <span>md-list</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-list">
              <h2>md-list</h2>
              <sass-stats component="list"> ${listTemplate} </sass-stats>
            </div>
          </md-tab-panel>

            <md-tab slot="tab" name="List">
            <span>md-advance-list</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-list">
              <h2>md-advance-list</h2>
              <sass-stats component="list">
                ${advanceListTemplate}
              </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Loading">
            <span>md-loading</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-loading">
              <h2>md-loading</h2>
              <sass-stats component="loading"> ${loadingTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Meeting Alert">
            <span>md-meeting-alert</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-meeting-alert">
              <h2>md-meeting-alert</h2>
              <sass-stats component="meeting-alert"> ${meetingAlertTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Menu">
            <span>md-menu</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-menu">
              <h2>md-menu and md-menu-item</h2>
              <sass-stats component="menu"> ${menuItemTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Menu Overlay">
            <span>md-menu-overlay</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-menu-overlay">
              <h2>md-menu-overlay</h2>
              <sass-stats component="menu-overlay"> ${menuOverlayTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Modal">
            <span>md-modal</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-modal">
              <h2>md-modal</h2>
              <sass-stats component="modal"> ${modalTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Pagination">
            <span>md-pagination</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-pagination">
              <h2>md-pagination</h2>
              <sass-stats component="pagination"> ${paginationTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Phone Input">
            <span>md-phone-input</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-phone-input">
              <h2>md-phone-input</h2>
              <sass-stats component="phone-input"> ${phoneInputTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Progress Bar">
            <span>md-progress-bar</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-progress-bar">
              <h2>md-progress-bar</h2>
              <sass-stats component="progress-bar"> ${progressBarTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Radio">
            <span>md-radio</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-radio">
              <h2>md-radio</h2>
              <sass-stats component="radio"> ${radioGroupTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Slider">
            <span>md-slider</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-slider">
              <h2>md-slider</h2>
              <sass-stats component="slider"> ${sliderTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Spinner">
            <span>md-spinner</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-spinner">
              <h2>md-spinner</h2>
              <sass-stats component="spinner"> ${spinnerTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Table">
            <span>md-table</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-table">
              <h2>md-table</h2>
              <sass-stats component="table"> ${tableTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Table Advanced">
            <span>md-table-advanced</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-table-advanced">
              <h2>md-table-advanced</h2>
              <sass-stats component="table-advanced"> ${tableAdvancedTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Tabs">
            <span>md-tabs</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-tabs">
              <h2>md-tabs</h2>
              <sass-stats component="tabs"> ${tabsTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Task Item">
            <span>md-task-item</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-task-item">
              <h2>md-task-item</h2>
              <sass-stats component="taskitem"> ${taskItemTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Timepicker">
            <span>md-timepicker</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-timepicker">
              <h2>md-timepicker</h2>
              <sass-stats component="timepicker"> ${timePickerTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Toggle Switch">
            <span>md-toggle-switch</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-toggle-switch">
              <h2>md-toggle-switch</h2>
              <sass-stats component="toggle-switch"> ${toggleSwitchTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Tooltip">
            <span>md-tooltip</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="md-tooltip">
              <h2>md-tooltip</h2>
              <sass-stats component="tooltip"> ${tooltipTemplate} </sass-stats>
            </div>
          </md-tab-panel>

          <md-tab slot="tab" name="Colors">
            <span>Colors</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <div class="container" aria-label="internal/colors">
              <h2>Colors</h2>
              ${colorTableTemplate}
            </div>
          </md-tab-panel>
        </md-tabs>
      </md-theme>
    `;
  }
}
