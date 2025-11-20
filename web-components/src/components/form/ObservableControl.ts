import { AbstractControl } from "./Form.types";

export abstract class ObservableControl<Value> implements AbstractControl<Value> {
  private listeners = new Set<(control: AbstractControl<Value>) => void>();

  onChange(listener: (control: AbstractControl<Value>) => void) {
    this.listeners.add(listener);
    return {
      unsubscribe: () => {
        this.listeners.delete(listener);
      }
    };
  }

  protected emitChange() {
    for (const listener of Array.from(this.listeners)) {
      // we know `this` is an AbstractControl<ValueType>, so cast for typescript
      listener(this as unknown as AbstractControl<Value>);
    }
  }

  abstract get value(): Value;
  abstract get valid(): boolean;
  abstract validate(): void;
}
