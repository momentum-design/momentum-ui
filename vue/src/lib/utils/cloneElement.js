import assign from 'lodash/assign';

export default function cloneElement(vnode, createElement, props, children) {
  function cloneVNode(vnode, props, children) {
    const nodeTag = vnode.componentOptions ? vnode.componentOptions.tag : vnode.tag;
    const nodeChildren = vnode.componentOptions ? vnode.componentOptions.children : vnode.children;
    const clonedChildren = children || nodeChildren && nodeChildren.map(node => cloneVNode(node));
    const cloned = createElement(nodeTag, vnode.data, clonedChildren);
    cloned.text = vnode.text;
    cloned.isComment = vnode.isComment;
    cloned.componentOptions = vnode.componentOptions;
    cloned.elm = vnode.elm;
    cloned.context = vnode.context;
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    props && cloned.componentOptions && assign(cloned.componentOptions.propsData, props);
    if (children && cloned.componentOptions) {
      cloned.componentOptions.children = clonedChildren;
    }

    return cloned;
  }

  return cloneVNode(vnode, props, children);
}
