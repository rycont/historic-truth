import { appendFile } from "fs";
import colog, { Tlog } from "colog";

export default (type: Tlog, _message: string, _config = {}) =>
  new Promise(resolve => {
    const config = {
      displayOnly: false,
      ..._config
    };

    colog[type](_message);
    if (config.displayOnly) {
      resolve();
      return;
    }
    const path = `/log/tweet/${
      new Date().toJSON().split("T")[0]
    }__twitter_log.txt`;
    const message = `${new Date().toISOString()} [${type}]: ${_message}\n`;
    appendFile(path, message, err => {
      if (err) {
        resolve(err);
        return;
      }
      resolve({
        path,
        message
      });
    });
  });
