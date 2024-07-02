  export default function valueSetting(setValueError : (value: boolean) => void , ...args: number[]) {
    for (const arg of args) {
      if (isNaN(arg) || arg <= 0) {
        setValueError(true);
        return false;
      }
    }

    return true;
  }

  // will try to implement react-hot-toast here
  // this is just the function we use for the values
  // so maybe we can use a valueError function for this
  // then this sets valueError to true and we can use that in the component
  // then the components pulls up the toast