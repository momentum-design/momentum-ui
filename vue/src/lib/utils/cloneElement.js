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

    if (options && options.props && cloned.componentOptions) {
      cloned.componentOptions.propsData = {...cloned.componentOptions.propsData, ...options.props};
    }
    if (options && options.listeners && cloned.componentOptions) {
      cloned.componentOptions.listeners = {...cloned.componentOptions.listeners, ...options.listeners};
    }
    if (options && options.children && cloned.componentOptions) {
      cloned.componentOptions.children = clonedChildren;
    }

    return cloned;
  }

  return cloneVNode(vnode, options);
}
