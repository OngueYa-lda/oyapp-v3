// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from "next-axiom";
import { withExceptionFilter } from "./middleware";

async function processed(
  req,
  res
) {
  const env = process.env.APP_DATA_ENV;
  const hoteis = (await import(`../../../mock/${env}/hoteis.json`)).default;
  const resorts = (await import(`../../../mock/${env}/resorts.json`)).default;
  const experiencias = (await import(`../../../mock/${env}/experiencias.json`)).default;
  const atraccoes = (await import(`../../../mock/${env}/atraccoes.json`)).default;
  const pacotes = (await import(`../../../mock/${env}/pacotes.json`)).default;

  const procMinPrice = item => {
    const _preco = item?.preco?.minimo || "";
    const preco = String(_preco);
    const num = preco.replace(/\./gm, "");
    return Number(num);
  };

  const procData = (acc, item) => {
    if (!acc) return item;
    if (procMinPrice(acc) <= procMinPrice(item)) return acc;
    return item;
  };

  const procHotels = hoteis.data.reduce(procData, null);
  const procResorts = resorts.data.reduce(procData, null);
  const procExperiencias = experiencias.data.reduce(procData, null);
  const procAtraccoes = atraccoes.data.reduce(procData, null);
  const procPacotes = pacotes.data.reduce(procData, null);

  log.info("Processed data sent");
  res.status(200).json({
    data: {
      hoteis: {
        data: procHotels
      },
      resorts: {
        data: procResorts
      },
      experiencias: {
        data: procExperiencias
      },
      atraccoes: {
        data: procAtraccoes
      },
      pacotes: {
        data: procPacotes
      }
    }
  });
}

export default withExceptionFilter(processed);
