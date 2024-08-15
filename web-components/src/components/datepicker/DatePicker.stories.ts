import { ThemeNameValues } from "@/components/theme/Theme";
import { now } from "@/utils/dateUtils";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { DatePicker as DP } from "./DatePicker"; // Keep type import as a relative path

export default {
  title: "Components/Date Picker",
  component: "md-datepicker",
  parameters: {
    a11y: {
      element: "md-datepicker"
    }
  }
};

export const DatePicker = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const shouldCloseOnSelect = boolean("shouldCloseOnSelect", false);
  const weekStart = select("weekStart", DP.weekStartDays, "");
  const locale = text("locale", "en-US");
  const disabled = boolean("disabled", false);

  const minDate = text("minimum date", now().minus({ day: 5 }).toISODate());

  const maxDate = text("maximum date", now().plus({ day: 30 }).toISODate());

  const value = text("value", now().toISODate());

  return html`
    <md-theme class="theme-toggle" id="datepicker" ?darkTheme=${darkTheme} theme=${theme}>
      <md-datepicker
        ?disabled=${disabled}
        ?should-close-on-select=${shouldCloseOnSelect}
        value=${value}
        weekStart=${weekStart}
        locale=${locale}
        minDate=${minDate}
        maxDate=${maxDate}
      >
      </md-datepicker>
    </md-theme>
  `;
};
