import Enzyme, { ReactWrapper } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { act } from 'react';

Enzyme.configure({ adapter: new Adapter() });

global.IS_REACT_ACT_ENVIRONMENT = true;

const flush = callback => {
  let result;
  act(() => {
    result = callback();
  });
  return result;
};

const originalSetState = ReactWrapper.prototype.setState;
ReactWrapper.prototype.setState = function setState(...args) {
  return flush(() => originalSetState.apply(this, args));
};

// Jest 30 exposes a separate `jest` facade to every test module, so mutating
// its timer methods here does not affect the facade used by a test. These
// helpers keep legacy timer-driven Enzyme updates inside React 18's `act`.
global.runAllTimers = () => flush(() => jest.runAllTimers());
global.advanceTimersByTime = milliseconds =>
  flush(() => jest.advanceTimersByTime(milliseconds));
global.flushAct = flush;

const originalDispatchEvent = document.dispatchEvent.bind(document);
document.dispatchEvent = event => flush(() => originalDispatchEvent(event));

let activeElement = document.body;
Object.defineProperty(document, 'activeElement', {
  configurable: true,
  get: () => activeElement,
});
document.hasFocus = () => activeElement !== document.body;
HTMLElement.prototype.focus = function focus() {
  activeElement = this;
};
HTMLElement.prototype.blur = function blur() {
  if (activeElement === this) activeElement = document.body;
};
HTMLElement.prototype.getClientRects = function getClientRects() {
  return [{ bottom: 1, height: 1, left: 0, right: 1, top: 0, width: 1 }];
};
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  configurable: true,
  get() {
    return this.parentElement || document.body;
  },
});
