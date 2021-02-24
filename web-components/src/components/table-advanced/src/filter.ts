export namespace Filter {
  export type Options = {
    label: string;
    input: {
      placeholder: string;
      maxlength?: number;
      pattern?: string;
    };
    predicate: (data: string, input: string) => boolean;
  };

  const input = { placeholder: "Filter..." };
  export const OPTIONS = {
    equals: {
      label: "Equals",
      input,
      predicate: (x, v) => x == v
    } as Options,
    notEqual: {
      label: "Not equal",
      input,
      predicate: (x, v) => x != v
    } as Options,
    // STRING
    contains: {
      label: "Contains",
      input,
      predicate: (x, v) => x.includes(v)
    } as Options,
    notContains: {
      label: "Not contains",
      input,
      predicate: (x, v) => !x.includes(v)
    } as Options,
    startsWith: {
      label: "Starts with",
      input,
      predicate: (x, v) => x.startsWith(v)
    } as Options,
    endsWith: {
      label: "Ends with",
      input,
      predicate: (x, v) => x.endsWith(v)
    } as Options,

    // NUMBER
    lessThan: {
      label: "Less than",
      input,
      predicate: (x, v) => x < v
    } as Options,
    lessThanOrEquals: {
      label: "Less than or equals",
      input,
      predicate: (x, v) => x <= v
    } as Options,
    greaterThan: {
      label: "Greater than",
      input,
      predicate: (x, v) => x > v
    } as Options,
    greaterThanOrEquals: {
      label: "Greater than or equals",
      input,
      predicate: (x, v) => x >= v
    } as Options
  };

  export const optionsString = [
    OPTIONS.equals,
    OPTIONS.notEqual,
    OPTIONS.contains,
    OPTIONS.notContains,
    OPTIONS.startsWith,
    OPTIONS.endsWith
  ];

  export const optionsNumber = [
    OPTIONS.equals,
    OPTIONS.notEqual,
    OPTIONS.lessThan,
    OPTIONS.lessThanOrEquals,
    OPTIONS.greaterThan,
    OPTIONS.greaterThanOrEquals
  ];
}
