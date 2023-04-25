import { Worker } from "worker_threads";
import path from "path";

export class FileHandler {
  static readFile(filePath) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(process.cwd(), "fileWorker.js"), {
        workerData: {
          filePath,
          operation: "read",
        },
      });

      worker.on("message", (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.result);
        }
      });

      worker.on("error", (err) => {
        reject(err);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  static writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(process.cwd(), "fileWorker.js"), {
        workerData: {
          filePath,
          data,
          operation: "write",
        },
      });

      worker.on("message", (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve();
        }
      });

      worker.on("error", (err) => {
        reject(err);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
}
