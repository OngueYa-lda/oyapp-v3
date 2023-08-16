// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from "next-axiom";
import { withExceptionFilter } from "./middleware";

async function search(
  req,
  res
) {
  const env = process.env.APP_DATA_ENV;
  const hoteis = (await import(`../../../mock/${env}/hoteis.json`)).default;
  const resorts = (await import(`../../../mock/${env}/resorts.json`)).default;

  /* checkin, checkout */
  const { where } = req.query;

  if (!where) {
    log.info('Search API: no place to search from. Missing "where" attr');
    res.status(400).send({
      error: "Bad request",
      code: 400,
      msg: 'request nao contem atributo "where"'
    });
    return;
  }

  const results = [
    hoteis.data,
    resorts.data
  ].flat()
    .filter(item => {
      const provincia = item?.localizacao?.provincia || "";
      return provincia === where;
    });

  res.status(200).json({
    data: results
  });
}

export default withExceptionFilter(search);
