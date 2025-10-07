import { AbstractControl } from "./Form.types";
import { ObservableControl } from "./ObservableControl";
export type ArrayValidatorFn<ItemType> = (arr: FormArray<ItemType>) => void;
export class FormArray<ItemType> extends ObservableControl<ItemType[]> implements AbstractControl<ItemType[]> {
  private inArrayValidation = false;
  constructor(
    private readonly controls: AbstractControl<ItemType>[],
    private readonly arrayValidators: ReadonlyArray<ArrayValidatorFn<ItemType>> = []
  ) {
    super();
    this.arrayValidators = arrayValidators;
    for (const child of this.controls) {
      child.onChange?.(() => {
        this.childChanged();
      });
      this.childChanged();
    }
  }

  at(index: number): AbstractControl<ItemType> {
    return this.controls[index];
  }

  private runArrayValidators(): void {
    if (!this.arrayValidators.length) {
      return;
    }
    this.inArrayValidation = true;
    try {
      for (const validatorFn of this.arrayValidators) {
        validatorFn(this);
      }
    } finally {
      this.inArrayValidation = false;
    }
  }

  push(control: AbstractControl<ItemType>): void {
    this.controls.push(control);
    control.onChange?.(() => {
      this.childChanged();
    });
    this.childChanged();
  }

  private childChanged = (): void => {
    if (!this.inArrayValidation) {
      this.runArrayValidators();
    }
    this.emitChange();
  };

  removeAt(index: number): void {
    this.controls.splice(index, 1);
    this.childChanged();
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
    this.childChanged();
  }

  markAllAsTouched(): void {
    this.controls.forEach((control) => {
      control.markAllAsTouched?.();
      control.markAsTouched?.();
    });
  }
}
