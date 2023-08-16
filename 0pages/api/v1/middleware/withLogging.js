import { log } from "next-axiom";

export function withLogging(handler) {
  return async(req, res) => {
    const { method, url } = req;
    const { statusCode } = res;

    log.info(`${method}: "${url}"`);
    log.info(`Status: ${statusCode}`);
    return handler(req, res);
  };
}
