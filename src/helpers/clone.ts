// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function clone<T>(value: any): T {
  return JSON.parse(JSON.stringify(value));
}
