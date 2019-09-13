import { Observable } from 'rxjs';
import { NgControl } from '@angular/forms';


/** An interface which allows a control to work inside of a `InputGroup`. */
export abstract class InputGroupService<T> {
  /** The value of the control. */
  value: T | null;

  /**
   * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
   * needs to run change detection.
   */
  readonly stateChanges: Observable<void>;

  /** The element ID for this control. */
  readonly id: string;

  /** The placeholder for this control. */
  readonly placeholder: string;

  /** Gets the NgControl for this control. */
  readonly ngControl: NgControl | null;

  /** Whether the input is autofilled. */
  readonly focused: boolean;

  /**
   * Whether the input is currently in an autofilled state. If property is not present on the
   * control it is assumed to be false.
   */
  readonly autofilled: boolean;

  /** Whether the control is in an error state. */
  readonly errorState: boolean;

  /** Whether the control is empty. */
  readonly empty: boolean;

  /** Whether the control is required. */
  readonly required: boolean;

  /** Whether the control is readonly. */
  readonly readonly: boolean;

  /** Whether the control is disabled. */
  readonly disabled: boolean;

  /** Sets the type of message to style the input. */
  readonly status: string;

  /** Sets the list of element IDs that currently describe this control. */
  abstract setDescribedByIds(ids: string[]): void;
}
