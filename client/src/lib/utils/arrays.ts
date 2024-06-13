export function move<T>(arr: T[], from: number, to: number) {
  const copy = [...arr];
  const [removed] = copy.splice(from, 1);
  copy.splice(to, 0, removed);
  return copy;
}