
export function snakeCase(word) {
  return `${word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
}