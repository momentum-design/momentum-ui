
export class Handler {

  private static calculatedScrollbarWidth: number = null;

  public static getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  }

  public static findSingle(element: any, selector: string): any {
    if (element) {
      return element.querySelector(selector);
    }

    return null;
  }

  public static calculateScrollbarWidth(el?: HTMLElement): number {
    if (el) {
      const style = getComputedStyle(el);  // gets all the actual CSS property and values of the element.
      return (el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth));
    } else {

      if (this.calculatedScrollbarWidth !== null) {
        return this.calculatedScrollbarWidth;
      }

      const scrollDiv = document.createElement('div');

      scrollDiv.className = 'md-data-table__scrollbar';
      document.body.appendChild(scrollDiv);

      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);

      this.calculatedScrollbarWidth = scrollbarWidth;

      return scrollbarWidth;
    }
  }

  public static getOuterWidth(el, margin?) {
    let width = el.offsetWidth;

    if (margin) {
      const style = getComputedStyle(el);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  }

  public static getOuterHeight(el, margin?) {
    let height = el.offsetHeight;

    if (margin) {
      const style = getComputedStyle(el);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  }
}
