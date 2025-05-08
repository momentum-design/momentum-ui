/* eslint-disable no-undef */
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor() {
    jest.fn();
  }
}

global.ResizeObserver = ResizeObserverMock;
