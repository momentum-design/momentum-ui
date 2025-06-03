import { AbstractControl } from "./Form.types";
import { FormArray } from "./FormArray";
import { ControlListener, FormControl } from "./FormControl";
import { ObservableControl } from "./ObservableControl";

export class FormGroup<FormValues extends Record<string, unknown>> extends ObservableControl<FormValues> implements AbstractControl<FormValues> {
    constructor(
        private readonly controls: {
            [Field in keyof FormValues]: AbstractControl<FormValues[Field]>;
        }
    ) {
        super();
        for (const key of Object.keys(this.controls) as Array<keyof FormValues>) {
            const child = this.controls[key];
            child.onChange?.(() => this.emitChange());
        }
    }

    // This cast to `any` is intentional:
    // - The return type is conditionally determined by the fieldName type passed in
    // - Consumers get fully typed access without needing to manually cast each time
    // - We can now do - this.form.get("description") and Typescript will infer the type on the return
    // - This is a common pattern in TypeScript for generic forms
    // - otherwise, we would have to use a type assertion every time we access a field. for example: this.form.get("description") as FormControl<string>
    get<Field extends keyof FormValues>(
        fieldName: Field
    ): FormValues[Field] extends Array<infer ElementType>
        ? FormArray<ElementType>
        : FormValues[Field] extends Record<string, unknown>
        ? FormGroup<FormValues[Field]>
        : FormControl<FormValues[Field]> {
        return this.controls[fieldName] as any;
    }

    get value(): FormValues {
        const result = {} as FormValues;
        for (const fieldName in this.controls) {
            result[fieldName] = this.controls[fieldName].value;
        }
        return result;
    }

    get valid(): boolean {
        return Object.values(this.controls).every((control) => control.valid);
    }

    validate(): void {
        for (const control of Object.values(this.controls)) {
            control.validate();
        }
        this.emitChange();
    }

    markAllAsTouched(): void {
        Object.values(this.controls).forEach((control) => {
            control.markAllAsTouched?.();
            control.markAsTouched?.();
        });
    }
}