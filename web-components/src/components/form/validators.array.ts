import { FormArray } from "./FormArray";
import { FormGroup } from "./FormGroup";
import { FormControl } from "./FormControl";

const INCREASING_ONLY = "increasingOnly" as const;

/**
 * Array-level validator to ensure values are strictly increasing.
 * - Checks each control selected from the FormArray
 * - Adds a groupError to the first offending control
 */
export function strictIncreasingOnly<FormValues extends Record<string, unknown>>(
  select: (row: FormGroup<FormValues>) => FormControl<number>
) {
  return (arr: FormArray<FormValues>): void => {
    const rows = arr.getControls() as FormGroup<FormValues>[];
    let prev: number | null = null;

    for (const row of rows) {
      const ctrl = select(row);
      ctrl.clearGroupErrorsByType(INCREASING_ONLY);
    }

    for (const row of rows) {
      const ctrl = select(row);
      const current = ctrl.value;
      if (current == null || Number.isNaN(current)) {
        break;
      }

      if (prev != null && Number(current) <= Number(prev)) {
        ctrl.addGroupError({ type: INCREASING_ONLY, count: prev });
        break;
      }
      prev = current;
    }
  };
}

export const ArrayValidators = {
  strictIncreasingOnly
};
