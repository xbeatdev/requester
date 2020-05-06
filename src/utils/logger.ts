const loggerTitle = '[Requester]';
export default class Logger {
  static log(...args: any): void {
    console.log(loggerTitle, ...args);
  }

  static warn(...args: any): void {
    console.warn(`${loggerTitle}`, ...args);
  }
}
