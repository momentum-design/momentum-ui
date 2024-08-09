import { Key } from "@/constants";

export function isActionKey(keyCode: string): boolean {
  return keyCode === Key.Enter || keyCode === Key.Space || keyCode === Key.NumpadEnter;
}
