import { ValidationError, ValidatorFn } from "./Form.types";

export const Validators = {
  required:
    <FieldValue>(): ValidatorFn<FieldValue> =>
    (value: FieldValue) => {
      const isEmpty = value === null || value === undefined || (typeof value === "string" && value.trim() === "");
      return isEmpty ? { type: "required" } : null;
    },

  minLength: (min: number): ValidatorFn<string> => {
    return (value: string): ValidationError | null => {
      return value.length < min ? { type: "minLength", count: min } : null;
    };
  },

  maxLength: (max: number): ValidatorFn<string> => {
    return (value: string): ValidationError | null => {
      return value.length > max ? { type: "maxLength", count: max } : null;
    };
  },

  nonNegative: (): ValidatorFn<number> => {
    return (value: number): ValidationError | null => {
      if (value === null || value === undefined) return null;
      return value < 0 ? { type: "nonNegative" } : null;
    };
  }
};
