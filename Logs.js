import { red, green, cyanBright } from "console-log-colors";

const optionsDate = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export class Logs {
  static _getDateFormated() {
    const currentDate = new Date();
    return currentDate.toLocaleString("en-GB", optionsDate).replace(",", "");
  }

  static info(message) {
    console.log(
      green(`${this._getDateFormated()} - INFO - [on_message]: ${message}`)
    );
  }

  static error(message) {
    console.error(
      red(`${this._getDateFormated()} - ERROR - [on_error]: ${message}`)
    );
  }

  static warn(message) {
    console.warn(
      cyanBright(`${this._getDateFormated()} - WARN - [on_warn]: ${message}`)
    );
  }
}
