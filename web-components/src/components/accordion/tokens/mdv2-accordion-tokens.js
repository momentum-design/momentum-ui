
const accordion = {
  prefix: "mdv2",
  component: "accordion",
  "bg-focus": {
    common: "$mds-color-theme-background-primary-active"
  },
  "border-color": {
    common: "$mds-color-theme-outline-secondary-normal"
  },
  default: {
    background: {
      common: "$mds-color-theme-background-primary-ghost"
    }
  },
  hover: {
    background: {
      common: "$mds-color-theme-background-primary-hover"
    }
  },
  active: {
    background: {
      common: "$mds-color-theme-background-primary-active"
    },
    "text-color": {
      common: "$mds-color-theme-text-primary-normal"
    }
  }
};

module.exports = accordion;
