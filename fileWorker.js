import { workerData, parentPort } from "worker_threads";
import fs from "fs";

const { filePath, data, operation } = workerData;

if (operation === "read") {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      parentPort.postMessage({ error: err });
    } else {
      parentPort.postMessage({ result: data });
    }
  });
} else if (operation === "write") {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      parentPort.postMessage({ error: err });
    } else {
      parentPort.postMessage({ result: null });
    }
  });
}
