export function formatLabel(value: string): string {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
