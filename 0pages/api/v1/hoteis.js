// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from "next-axiom";
import { withExceptionFilter } from "./middleware";

async function hoteis(
  req,
  res
) {   
  const slug = req.query.slug;
  
  const env = process.env.APP_DATA_ENV;
  const data = (await import(`../../../mock/${env}/hoteis.json`)).default;
  const quartos = (await import(`../../../mock/${env}/quartos.json`)).default;

  const _quartos = quartos.data.filter(quarto => quarto.hotel === slug);

  const withQuartos = data.data.map(item => {
    item.quartos = {
      data: _quartos
    };
    return item;
  });

  data.data = withQuartos;

  if (slug) {
    const found = data.data.find(item => item.slug === req.query.slug);

    if (!found) {
      log.info("Hotel not found");
      res.status(404).json({ code: 404, error: "Not found", msg: "Hotel not found" });
    } else {
      log.info("Hotel found and sent");
      res.status(200).json(found);
    }
    
    return;
  }

  res.status(200).json(data);
}

export default withExceptionFilter(hoteis);
