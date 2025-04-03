/* eslint-disable no-undef */

const table = {
  prefix: "mdv2",
  component: "table",
  header: {
    "bg-color": {
      common: "transparent"
    }
  },
  hover: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-hover"
    }
  },
  pressed: {
    "bg-color": {
      common: "$mds-color-theme-background-primary-active"
    }
  },
  "border-color": {
    common: "$mds-color-theme-outline-secondary-normal"
  },
  "text-color": {
    common: "$mds-color-theme-text-secondary-normal"
  },
  stripped: {
    "bg-color": {
      common: "$mds-color-theme-button-primary-disabled"
    }
  },
  "main-border": {
    common: "none"
  },
  "column-border": {
    common: "none"
  },
  "row-border": {
    common: "1px solid var(--table-border-color)"
  },
  "header-row-border": {
    common: "1px solid $mds-color-theme-outline-primary-normal"
  }
};

module.exports = table;
