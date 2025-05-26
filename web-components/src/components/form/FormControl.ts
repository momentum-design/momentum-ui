import { AbstractControl, ValidationError, ValidatorFn } from "./Form.types";

export class FormControl<ValueType> implements AbstractControl<ValueType> {
    private currentValue: ValueType;
    private validationErrors: ValidationError[] = [];
    private readonly validators: ValidatorFn<ValueType>[];

    constructor(initialValue: ValueType, validators: ValidatorFn<ValueType>[] = []) {
        this.currentValue = initialValue;
        this.validators = validators;
        this.validate();
    }

    get value(): ValueType {
        return this.currentValue;
    }

    get valid(): boolean {
        return this.validationErrors.length === 0;
    }

    get errors(): ValidationError[] {
        return this.validationErrors;
    }

    setValue(value: ValueType): void {
        this.currentValue = value;
        this.validate();
    }

    validate(): void {
        this.validationErrors = this.validators
            .map((validate) => validate(this.currentValue))
            .filter((error): error is ValidationError => error !== null);
    }
}