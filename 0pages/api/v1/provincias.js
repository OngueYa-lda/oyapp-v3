// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withExceptionFilter } from "./middleware";

async function provincias(
  req,
  res
) {
  const env = process.env.APP_DATA_ENV;
  const hoteis = (await import(`../../../mock/${env}/hoteis.json`)).default;
  const resorts = (await import(`../../../mock/${env}/resorts.json`)).default;

  const visited = {};

  const result = [
    hoteis.data,
    resorts.data
  ].flat()
    .map(item => {
      let provincia = item?.localizacao?.provincia;
      // normalize provincia value to not have accents
      // @see https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
      provincia = provincia.normalize("NFD").replace(/\p{Diacritic}/gu, "");

      if (provincia && !visited[provincia]) {
        visited[provincia] = true;
        return {
          name: item.localizacao.provincia,
          ...item.localizacao
        };
      }

      return null;
    })
    .filter(item => item);

  res.status(200).json(result);
}

export default withExceptionFilter(provincias);
