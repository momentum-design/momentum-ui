import { Key } from "@/constants";

const navigationKeys = [Key.ArrowDown, Key.ArrowUp, Key.ArrowLeft, Key.ArrowRight, Key.Home, Key.End];

export function isActionKey(keyCode: string): boolean {
  return keyCode === Key.Enter || keyCode === Key.Space || keyCode === Key.NumpadEnter;
}

export function isNavigationKey(keyCode: string): boolean {
  return navigationKeys.includes(keyCode as Key);
}
