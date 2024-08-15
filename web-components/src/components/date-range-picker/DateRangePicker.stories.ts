import "@/components/date-range-picker/DateRangePicker";
import { ThemeNameValues } from "@/components/theme/Theme";
import { now } from "@/utils/dateUtils";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { DatePicker as DP } from "../datepicker/DatePicker"; // Keep type import as a relative path
import "../theme/Theme";

export default {
  title: "Components/Date Range Picker",
  component: "md-date-range-picker",
  decorators: [withKnobs],
  parameters: {
    a11y: {
      element: "md-date-range-picker"
    }
  }
};

export const DateRangePicker = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const shouldCloseOnSelect = boolean("shouldCloseOnSelect", false);
  const weekStart = select("weekStart", DP.weekStartDays, "");
  const locale = text("locale", "en-US");
  const disabled = boolean("disabled", false);

  const minDate = text(
    "minimum date",
    now()
      .minus({ day: 5 })
      .toISODate()
  );

  const maxDate = text(
    "maximum date",
    now()
      .plus({ day: 30 })
      .toISODate()
  );

  const value = text("value", now().toISODate());
  const startDate = text("value", now().toISODate());
  const endDate = text("value", now().toISODate());

  return html`
    <md-theme class="theme-toggle" id="datepicker" ?darkTheme=${darkTheme} theme=${theme}>
      <md-date-range-picker
        ?disabled=${disabled}
        ?should-close-on-select=${shouldCloseOnSelect}
        value=${value}
        weekStart=${weekStart}
        locale=${locale}
        minDate=${minDate}
        maxDate=${maxDate}
        start-date=${startDate}
        end-date=${endDate}
      >
      </md-date-range-picker>
    </md-theme>
  `;
};
