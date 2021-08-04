interface Heap {
  identify: (id: string) => void
  resetIdentity: () => void
  addUserProperties: (fields: Record<string, string>) => void
}

export declare global {
  interface Window {
    heap: Heap;
  }
}
