export default function cloneElement(vnode, createElement, props) {
  const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
  const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
  cloned.text = vnode.text;
  cloned.isComment = vnode.isComment;
  cloned.componentOptions = vnode.componentOptions;
  cloned.elm = vnode.elm;
  cloned.context = vnode.context;
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.componentOptions.propsData = { ...cloned.componentOptions.propsData, ...props};
  return cloned;
}
