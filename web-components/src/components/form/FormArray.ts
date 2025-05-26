import { AbstractControl } from "./Form.types";

export class FormArray<ItemType> implements AbstractControl<ItemType[]> {
    constructor(private readonly controls: AbstractControl<ItemType>[]) { }

    at(index: number): AbstractControl<ItemType> {
        return this.controls[index];
    }

    push(control: AbstractControl<ItemType>): void {
        this.controls.push(control);
    }

    removeAt(index: number): void {
        this.controls.splice(index, 1);
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
    }
}