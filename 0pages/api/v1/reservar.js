// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { log } from "next-axiom";
import { withExceptionFilter } from "./middleware";

async function reservar(
  req,
  res
) {
  const env = process.env.APP_DATA_ENV;
  const hoteis = (await import(`../../../mock/${env}/hoteis.json`)).default;
  const resorts = (await import(`../../../mock/${env}/resorts.json`)).default;
  const quartos = (await import(`../../../mock/${env}/quartos.json`)).default;

  const { qname, slug, option, unitKind, unit } = req.query;

  const selector = {
    hoteis,
    resorts
  };

  const data = selector[unitKind] || {};
  const _quartos = quartos.data.filter(quarto => quarto.hotel === slug);

  const withQuartos = data.data.map(item => {
    item.quartos = {
      data: _quartos
    };
    return item;
  });

  data.data = withQuartos;
  const found = data.data.find(item => item.slug === unit);

  if (!found) {
    log.info("Reservar API: Hotel not found");
    res.status(404).json({ code: 404, error: "Hotel Not found", msg: "Item not found" });
    return;
  }

  const quartoFound = found.quartos.data.find(item => {
    const inm = item.name.replace(/\s/g, "");
    const qnm = qname.replace(/\s/g, "");
    return inm === qnm;
  });

  if (!quartoFound) {
    log.info("Reservar API: quarto not found");
    res.status(404).json({ code: 404, error: "Quarto Not found", msg: "Item not found" });
    return;
  }

  const _option = parseInt(option, 10);
  const optionIndex = _option - 1;
  const quartoOption = quartoFound.options.data[optionIndex];

  const quarto = quartoFound;
  quarto.option = quartoOption;

  res.status(200).json({
    ...quarto,
    unit: {
      name: found.name,
      endereco: found.localizacao.texto,
      horas: {
        checkin: found.comodidades.checkin.hora,
        checkout: found.comodidades.checkout.hora
      }
    }
  });
}

export default withExceptionFilter(reservar);
