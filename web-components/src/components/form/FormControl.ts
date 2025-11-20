import { AbstractControl, ValidationError, ValidatorFn } from "./Form.types";
import { ObservableControl } from "./ObservableControl";
export type ControlListener<ValueType> = (control: AbstractControl<ValueType>) => void;
export class FormControl<ValueType> extends ObservableControl<ValueType> implements AbstractControl<ValueType> {
  private currentValue: ValueType;
  private validationErrors: ValidationError[] = [];
  private touched = false;
  private readonly validators: ValidatorFn<ValueType>[];
  private groupErrors: ValidationError[] = [];

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
    return this.validationErrors.length === 0 && this.groupErrors.length === 0;
  }

  get errors(): ValidationError[] {
    const internal = this.touched ? this.validationErrors : [];
    return [...internal, ...this.groupErrors];
  }

  addGroupError(error: ValidationError): void {
    const uniqueErrors = this.groupErrors.filter((e) => e.type !== error.type);
    this.groupErrors = [...uniqueErrors, error];
    this.emitChange();
  }

  clearGroupErrorsByType(type: string): void {
    const next = this.groupErrors.filter((e) => e.type !== type);
    if (next.length !== this.groupErrors.length) {
      this.groupErrors = next;
      this.emitChange();
    }
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
