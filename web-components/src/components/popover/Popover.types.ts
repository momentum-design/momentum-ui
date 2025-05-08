import { COLOR, POPOVER_PLACEMENT, POPOVER_STRATEGY, TRIGGER } from "./Popover.constants";

export type ValueOf<T> = T[keyof T];

type PopoverPlacement = ValueOf<typeof POPOVER_PLACEMENT>;
type PopoverColor = ValueOf<typeof COLOR>;
type PopoverTrigger = ValueOf<typeof TRIGGER> | `${ValueOf<typeof TRIGGER>} ${ValueOf<typeof TRIGGER>}`;
type PopoverStrategy = ValueOf<typeof POPOVER_STRATEGY>;

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

interface Events {
  onShownEvent: Event;
  onHiddenEvent: Event;
  onCreatedEvent: Event;
  onDestroyedEvent: Event;
}

export const Strategy = ["fixed", "absolute"] as const;
export const PopoverRole = ["dialog", "menu", "tooltip"] as const;
export const Triggers = ["click", "mouseenter", "manual"] as const;

export type PlacementType = (typeof Placement)[number];
export type StrategyType = (typeof Strategy)[number];
export type PopoverRoleType = (typeof PopoverRole)[number];

export type { Events, PopoverColor, PopoverPlacement, PopoverStrategy, PopoverTrigger };
