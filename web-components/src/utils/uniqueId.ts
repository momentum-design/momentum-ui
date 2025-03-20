const idCounters: { [key: string]: number } = {};

export function generateSimpleUniqueId(prefix = "id"): string {
  if (!idCounters[prefix]) {
    idCounters[prefix] = 0;
  }
  idCounters[prefix] += 1;

  return `${prefix}-${idCounters[prefix]}`;
}
