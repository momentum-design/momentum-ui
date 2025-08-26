import { AbstractControl } from "./Form.types";
import { ObservableControl } from "./ObservableControl";

export class FormArray<ItemType> extends ObservableControl<ItemType[]> implements AbstractControl<ItemType[]> {
  constructor(private readonly controls: AbstractControl<ItemType>[]) {
    super();
    for (const child of this.controls) {
      child.onChange?.(() => this.emitChange());
    }
  }

  at(index: number): AbstractControl<ItemType> {
    return this.controls[index];
  }

  push(control: AbstractControl<ItemType>): void {
    this.controls.push(control);
    control.onChange?.(() => this.emitChange());
    this.emitChange();
  }

  removeAt(index: number): void {
    this.controls.splice(index, 1);
    this.emitChange();
  }

  get value(): ItemType[] {
    return this.controls.map((control) => control.value);
  }

  get valid(): boolean {
    return this.controls.every((control) => control.valid);
  }

  get length(): number {
    return this.controls.length;
  }

  getControls(): AbstractControl<ItemType>[] {
    return this.controls;
  }

  validate(): void {
    this.controls.forEach((control) => control.validate());
    this.emitChange();
  }

  markAllAsTouched(): void {
    this.controls.forEach((control) => {
      control.markAllAsTouched?.();
      control.markAsTouched?.();
    });
  }
}
