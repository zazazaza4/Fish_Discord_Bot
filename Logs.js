import { red, green, cyanBright } from "console-log-colors";

new Date().toLocaleString("en-US", {
  timeZone: "UTC",
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});

export class Logs {
  static info(message) {
    console.log(
      green(
        `${new Date().toLocaleString("en-US", {
          timeZone: "UTC",
        })} - INFO - [on_message]: ${message}`
      )
    );
  }

  static error(message) {
    console.error(
      red(
        `${new Date().toLocaleString("en-US", {
          timeZone: "UTC",
        })} - ERROR - [on_error]: ${message}`
      )
    );
  }

  static warn(message) {
    console.warn(
      cyanBright(
        `${new Date().toLocaleString("en-US", {
          timeZone: "UTC",
        })} - WARN - [on_warn]: ${message}`
      )
    );
  }
}
