export const isType = <T>(container: Array<string>, value: any): value is T => {
  return container.includes(value);
}