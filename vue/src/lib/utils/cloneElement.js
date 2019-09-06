import assign from 'lodash/assign';

export default function cloneElement(vnode, createElement, options) {
  function cloneVNode(vnode, options) {
    const nodeTag = vnode.componentOptions ? vnode.componentOptions.tag : vnode.tag;
    const nodeChildren = vnode.componentOptions ? vnode.componentOptions.children : vnode.children;
    const clonedChildren = options && options.children || nodeChildren && nodeChildren.map(node => cloneVNode(node));
    const cloned = createElement(nodeTag, vnode.data, clonedChildren);
    cloned.text = vnode.text;
    cloned.isComment = vnode.isComment;
    cloned.componentOptions = vnode.componentOptions;
    cloned.elm = vnode.elm;
    cloned.context = vnode.context;
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    options && options.props && cloned.componentOptions && assign(cloned.componentOptions.propsData, options.props);
    options && options.listeners && cloned.componentOptions && assign(cloned.componentOptions.listeners, options.listeners);
    if (options && options.children && cloned.componentOptions) {
      cloned.componentOptions.children = clonedChildren;
    }

    return cloned;
  }

  return cloneVNode(vnode, options);
}
