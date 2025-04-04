// Mock ResizeObserver
class ResizeObserverMock {
  observe() {/* no-op */}
  unobserve() {/* no-op */}
  disconnect() {/* no-op */}
}

global.ResizeObserver = ResizeObserverMock;