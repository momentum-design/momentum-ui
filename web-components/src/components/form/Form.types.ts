export interface Subscription {
  unsubscribe(): void;
}

export type ValidationError = {
  type: string;
  count?: number;
};

export type ValidatorFn<FieldValue = unknown> = (value: FieldValue) => ValidationError | null;

export interface AbstractControl<ControlValue = unknown> {
  readonly value: ControlValue;
  readonly valid: boolean;
  validate(): void;
  onChange?: (listener: (control: AbstractControl<ControlValue>) => void) => Subscription;
  markAsTouched?(): void;
  markAllAsTouched?(): void;
}
