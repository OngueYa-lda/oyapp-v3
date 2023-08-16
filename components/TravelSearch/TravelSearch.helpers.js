import { safeValue as val } from "../../util/helpers";

export const filterProvinciaOnInput = e => ({ provincias }) => {
  const input = e.target.value;
  const normalize = s => s.toLocaleLowerCase();

  const found = provincias.filter(p => {
    const v = normalize(val(p, "name"));
    return v.includes(normalize(input));
  });

  return found;
};
