// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withExceptionFilter, withLogging } from "../middleware";

async function handler(
  req,
  res
) {
  const env = process.env.APP_DATA_ENV;
  const usuarios = (await import(`../../../../mock/${env}/usuarios.json`)).default;

  const body = req.body;
  const callbackUrl = body.callbackUrl;
  const user = body.credentials;
  const _senha = Buffer.from(body.credentials.senha).toString();

  user.senha = _senha;
  usuarios.data.push(user);

  res.status(200).json({
    senha: null,
    ...user,
    callbackUrl
  });
}

export default withExceptionFilter(
  withLogging(handler)
);
