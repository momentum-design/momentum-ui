import { AbstractControl, ValidationError, ValidatorFn } from "./Form.types";
import { ObservableControl } from "./ObservableControl";
export type ControlListener<ValueType> = (control: AbstractControl<ValueType>) => void;
export class FormControl<ValueType> extends ObservableControl<ValueType> implements AbstractControl<ValueType> {
  private currentValue: ValueType;
  private validationErrors: ValidationError[] = [];
  private touched = false;
  private readonly validators: ValidatorFn<ValueType>[];

  constructor(initialValue: ValueType, validators: ValidatorFn<ValueType>[] = []) {
    super();
    this.currentValue = initialValue;
    this.validators = validators;
    this.validate();
  }

  get value(): ValueType {
    return this.currentValue;
  }

  markAsTouched(): void {
    this.touched = true;
    this.validate();
  }

  get valid(): boolean {
    return this.validationErrors.length === 0;
  }

  get errors(): ValidationError[] {
    return this.touched ? this.validationErrors : [];
  }

  setValue(value: ValueType): void {
    this.currentValue = value;
    this.markAsTouched();
  }

  validate(): void {
    this.emitChange();
    this.validationErrors = this.validators
      .map((validate) => validate(this.currentValue))
      .filter((error): error is ValidationError => error !== null);
  }
}
