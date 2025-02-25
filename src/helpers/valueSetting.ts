export default function valueSetting(setValueError: (value: boolean) => void, ...args: number[]) {
  for (const arg of args) {
    if (isNaN(arg) || arg < 0) {
      setValueError(true);
      return false;
    }
  }

  return true;
}