/**
 * Returns an array with all DOM elements affected by an event.
 * The function serves as a polyfill for
 * [`Event.composedPath()`](https://dom.spec.whatwg.org/#dom-event-composedpath).
 *
 * @category Event
 * @param {Event} evt The triggered event.
 * @return {Array.<HTMLElement>} The DOM elements affected by the event.
 *
 * @example
 * let domChild = document.createElement("div"),
 * 	domParent = document.createElement("div"),
 * 	domGrandparent = document.createElement("div"),
 * 	body = document.body,
 * 	html = document.querySelector("html");
 *
 * domParent.appendChild(domChild);
 * domGrandparent.appendChild(domParent);
 * body.appendChild(domGrandparent);
 *
 * domChild.addEventListener("click", dealWithClick);
 * const dealWithClick = evt => getEventPath(evt);
 *
 * // when domChild is clicked:
 * // => [domChild, domParent, domGrandparent, body, html, document, window]
 */

export default function eventPath(evt) {
    let path = (evt.composedPath && evt.composedPath()) || evt.path,
      target = evt.target;
  
    if (path != null) {
      // Safari doesn't include Window, and it should.
      path = path.indexOf(window) < 0 ? path.concat([window]) : path;
      return path;
    }
  
    if (target === window) {
      return [window];
    }
  
    function getParents(node, memo) {
      memo = memo || [];
      let parentNode = node !== undefined ? node.parentNode : false;
  
      if (!parentNode) {
        return memo;
      } else {
        return getParents(parentNode, memo.concat([parentNode]));
      }
    }
  
    return [target].concat(getParents(target)).concat([window]);
  }
  