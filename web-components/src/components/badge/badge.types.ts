import { ICON_VARIANT, TYPE } from "./badge.constants";

type ValueOf<T> = T[keyof T];

type IconVariant = ValueOf<typeof ICON_VARIANT>;
type BadgeType = ValueOf<typeof TYPE>;

export type { BadgeType, IconVariant };
