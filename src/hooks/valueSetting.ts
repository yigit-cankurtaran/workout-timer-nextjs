  export default function valueSetting(...args: number[]) {
    for (const arg of args) {
      if (isNaN(arg) || arg <= 0) {
        alert("all values must be greater than 0");
        // TODO: later replace with toast
        return false;
      }
    }

    return true;
  }