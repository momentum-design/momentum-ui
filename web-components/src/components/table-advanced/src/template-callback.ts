import { directive, NodePart, Part } from "lit-html";

interface PreviousValue {
  readonly template: HTMLTemplateElement;
  readonly fragment: DocumentFragment;
}

// For each part, remember the value that was last rendered to the part by the
// templateContent directive, and the DocumentFragment that was last set as a
// value. The DocumentFragment is used as a unique key to check if the last
// value rendered to the part was with templateContent. If not, we'll always
// re-render the value passed to templateContent.
const previousValues = new WeakMap<NodePart, PreviousValue>();

type Payload = {
  iCol: number;
  iRow: number;
  value: string;
  template: HTMLTemplateElement;
  cb: TemplateCallback;
};
export type TemplateCallback = (p: { iCol: number; iRow: number; value: string; fragment: DocumentFragment }) => void;

export const templateCallback = directive((p: Payload) => (part: Part): void => {
  if (!(part instanceof NodePart)) {
    throw new Error("templateCallback can only be used in text bindings");
  }

  const previousValue = previousValues.get(part);

  if (previousValue !== undefined && p.template === previousValue.template && part.value === previousValue.fragment) {
    return;
  }

  const fragment = document.importNode(p.template.content, true);

  p.cb({
    iRow: p.iRow,
    iCol: p.iCol,
    value: p.value,
    fragment
  });

  part.setValue(fragment);
  previousValues.set(part, { template: p.template, fragment });
});