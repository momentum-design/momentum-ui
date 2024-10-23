export const Placement = [
  "auto",
  "auto-start",
  "auto-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "top-start",
  "top",
  "top-end",
  "bottom-start",
  "bottom",
  "bottom-end"
] as const;

export const ARROW_HEIGHT = 16;
export const Strategy = ["fixed", "absolute"] as const;
export const PopoverRole = ["dialog", "menu", "tooltip"] as const;

export type PlacementType = (typeof Placement)[number];
export type StrategyType = (typeof Strategy)[number];
export type PopoverRoleType = (typeof PopoverRole)[number];
