/* eslint-disable @typescript-eslint/no-explicit-any */
const legacyCustomElement = (tagName: string, clazz: any) => {
  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, clazz);
  }
  return clazz as any;
};

const standardCustomElement = (tagName: string, descriptor: any) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz: any) {
      if (!window.customElements.get(tagName)) {
        window.customElements.define(tagName, clazz);
      }
    }
  };
};

export const customElementWithCheck = (tagName: string) => (classOrDescriptor: any) =>
  typeof classOrDescriptor === "function"
    ? legacyCustomElement(tagName, classOrDescriptor)
    : standardCustomElement(tagName, classOrDescriptor);
