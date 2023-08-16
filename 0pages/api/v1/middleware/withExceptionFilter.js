import { log } from "next-axiom";

export function withExceptionFilter(handler) {
  return async(req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      const name = error.name || "";
      const code = error.code || 500;
      const msg = `API "${name}"`;

      log.debug(msg, {
        name,
        code,
        error
      });

      res.status(500).json({
        statusCode: 500,
        error: msg,
        errorCode: code,
        message: "Server Error!"
      });

      throw error;
    }
  };
}
