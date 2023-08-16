// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withExceptionFilter } from "./middleware";

async function pacotes(
  req,
  res
) {
  const env = process.env.APP_DATA_ENV;
  const data = (await import(`../../../mock/${env}/pacotes.json`)).default;

  const slug = req.query.slug;

  if (slug) {
    res.status(200).json(data.data.find(item => item.slug === req.query.slug));
  } else {
    res.status(200).json(data);
  }
}

export default withExceptionFilter(pacotes);
