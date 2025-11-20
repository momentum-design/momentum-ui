import "@testing-library/jest-dom";

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

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    text: () => Promise.resolve("<svg></svg>"),
    json: () => Promise.resolve({})
  })
);
