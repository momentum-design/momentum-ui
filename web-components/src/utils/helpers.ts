/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const indicesOf = (text: string, searchString: string) => {
  const searchStringLen = searchString.length;

  if (searchStringLen === 0) {
    return [];
  }

  const indices = [];
  const strCpy = text.toLowerCase();
  const searchStringCpy = searchString.toLowerCase();

  let startIndex = 0;
  let index = strCpy.indexOf(searchStringCpy, startIndex);
  while (index > -1) {
    startIndex = index + searchStringLen;
    indices.push([index, startIndex]);

    index = strCpy.indexOf(searchStringCpy, index + 1);
  }

  return indices;
};

export const mergeRange = ([...ranges]) => {
  if (!ranges.length) return [];

  ranges.sort((fir, sec) => {
    if (fir[0] !== sec[0]) return fir[0] - sec[0];
    return fir[1] - sec[1];
  });

  const merged = [];

  let curStart = ranges[0][0];
  let curEnd = ranges[0][1];

  ranges.shift();

  ranges.forEach(([start, end]) => {
    if (start >= curEnd) {
      merged.push([curStart, curEnd]);
      curStart = start;
      curEnd = end;
    } else if (end > curEnd) curEnd = end;
  });

  merged.push([curStart, curEnd]);

  return merged;
};

export const findHighlight = (text: string, query: string) => {
  const queries = [query];
  const matches: number[][] = [];

  queries.forEach((query) => {
    matches.push(...indicesOf(text, query));
  });

  const highlights = mergeRange(matches);

  const chunks = [];
  let lastEnd = 0;

  highlights.forEach(([start, end]) => {
    if (lastEnd !== start) {
      chunks.push({
        range: [start, end],
        matching: false,
        text: text.slice(lastEnd, start)
      });
    }
    chunks.push({
      range: [start, end],
      matching: true,
      text: text.slice(start, end)
    });

    lastEnd = end;
  });

  if (lastEnd !== text.length) {
    chunks.push({
      range: [lastEnd],
      matching: false,
      text: text.slice(lastEnd)
    });
  }
  return chunks;
};

export function debounce<T>(func: Function, wait: number, immediate?: boolean) {
  let timeout: ReturnType<typeof setTimeout> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: T, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout!);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export const throttle = (fn: (...args: any[]) => unknown, delay = 1000 / 60) => {
  let lastTimeoutRef: number | undefined = undefined;
  let last = Date.now();

  // Throttling
  const next = (...args: any[]) => {
    const now = Date.now();
    window.clearTimeout(lastTimeoutRef);

    if (!last || now - last >= delay) {
      last = now;
      fn.call(fn, ...args);
    } else {
      lastTimeoutRef = window.setTimeout(() => next(...args), delay - (now - last));
    }
  };

  return (...args: any[]) => next(...args);
};

export function closestElement(selector: string, base: HTMLElement) {
  function __closestFrom(el: any): HTMLElement | null {
    if (!el || el === document || el === window) return null;

    const found = el.closest(selector);
    return found ? found : __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
