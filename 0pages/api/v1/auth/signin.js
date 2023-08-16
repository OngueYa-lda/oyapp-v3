// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withExceptionFilter, withLogging } from "../middleware";

async function handler(
  req,
  res
) {
  const env = process.env.APP_DATA_ENV;
  const usuarios = (await import(`../../../../mock/${env}/usuarios.json`)).default;

  const body = req.body;
  const ctx = req.query.ctx || "usuarios";

  const callbackUrl = body.callbackUrl;
  // const lembrar = body.credentials.lembrar;
  const _senha = Buffer.from(body.credentials.senha).toString();

  const match = (a, b) => {
    if (a.kind !== b.kind) return false;
    if (a.senha !== b.senha) return false;
    if (a.email !== b.email) return false;
    return true;
  };

  const data = usuarios.data.find(user => match({
    email: user.email,
    senha: user.senha,
    kind: user.dataKind
  }, {
    email: body.credentials.email,
    senha: _senha,
    kind: ctx
  }));

  if (data) {
    res.status(200).json({
      senha: null,
      ...data,
      callbackUrl
    });
    return;
  }

  res.status(404).json({
    code: 404,
    msg: "user not found",
    error: "Not found",
    callbackUrl,
    dne: true
  });
}

export default withExceptionFilter(
  withLogging(handler)
);
