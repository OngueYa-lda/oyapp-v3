export const safeFun = fn => fn && typeof fn === 'function' ? fn : () => {};

/**
 * Builds a classname based on boolean states
 * @param {{string: boolean}} buildObj class names to append by bool state
 * @param {string} className classname to append to
 */
export function classNameBuilder(buildObj, className = '') {
  if (buildObj) {
    for (const k in buildObj) {
      if (buildObj[k]) {
        className = className.length ? className.concat(' ', k) : className.concat(k);
      }
    }
  }

  return className || '';
}

export const isDef = val => val !== null && val !== void 0;

/**
 * Acessa uma propriedade definida no objecto ou retona undefined
 * @param {object} obj objecto a verificar
 * @param {string} key propriedade a procurar no objecto
 */
export function accessProperty(obj, key) {
  const MAX_RECURSIVE_ACESS = 7;

  if (!isDef(key) && typeof key !== 'string') {
    return undefined;
  }

  const list = key.split('.');

  const h = (_obj, _key, start = 0) => {
    let i = start;
    const j = list[i];

    // if no object to query
    if (!isDef(_obj)) return undefined;

    const value = _obj[j];

    // if no value
    if (!isDef(value)) return undefined;

    if (list.length >= MAX_RECURSIVE_ACESS) {
      throw Error(`reached max recursive acess ${MAX_RECURSIVE_ACESS}`);
    }

    if (i < list.length - 1) {
      return h(value, _key, ++i);
    }

    return value;
  };

  return h(obj, key);
}

/**
 * Retona um valor proprio para mostrar na tela em vez de 'undefined'
 * @param {object} item objecto a verificar
 * @param {string} key propriedade a procurar no objecto
 * @param {any} _default valor default para retonar se o valor procurado for 'undefined'
 */
export const safeValue = (item, key, _default = '') =>
  accessProperty(item, key) || _default || '';

export function removeCurrencySeparatorToNumber(numStr) {
  const _num = numStr.replace(/\./gm, '');
  return Number(_num);
}

export function addCurrencySeparatorToNumber(num) {
  const CURRENCY_DIVIDER = 3;
  const CURRENCY_SEPARATOR = '.';

  const numberAsString = String(num);
  let stringBuilder = '';
  let stringToModify = numberAsString;

  while (stringToModify.length > CURRENCY_DIVIDER) {
    const last3StartIndex = stringToModify.length - CURRENCY_DIVIDER;

    const last3 = stringToModify.substring(
      last3StartIndex, numberAsString.length
    );

    stringBuilder = ''.concat(CURRENCY_SEPARATOR, last3, stringBuilder);
    stringToModify = stringToModify.substring(0, last3StartIndex);

    if (stringToModify.length <= 3) {
      stringBuilder = stringToModify.concat(stringBuilder);
    }
  }

  return stringBuilder ? stringBuilder : numberAsString;
}

export function readablePrice(priceStr) {
  return priceStr;
}

export const countText = (count, singular, plural) => count === 1 ? singular : plural;
