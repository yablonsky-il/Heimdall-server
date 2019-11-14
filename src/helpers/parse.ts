/* eslint-disable newline-per-chained-call */

import { getDate } from './util';

const NEEDED_CURRENCIES_AMOUNT: number = 6;

const comoditiesKeys: ReadonlyArray<string> = [
  'energy',
  'agriculture',
  'livestock',
  'industry',
  'index',
];

const currenciesKeys: ReadonlyArray<string> = [
  'topCurrencies',
  'crypto',
  'EURCross',
  'GBPCross',
  'AUDCross',
  'JPYCross',
];

const stocksKeys: ReadonlyArray<string> = [
  'Europe',
  'USA',
  'Asia',
  'Australia',
  'Africa',
];

export const parseTable = (tbody, key): Array<any> => {
  const arr: Array<any> = [];

  for (let i = 0; i < tbody.length; i += 1) {
    arr.push({
      id: i,
      [key]: tbody.eq(i).children().eq(1).text().trim(),
      value: tbody.eq(i).children().eq(2).text().trim(),
    });
  }

  return arr;
};

export const parseAnyIndicator = ($): Array<any> => {
  const result = $('#ctl00_ContentPlaceHolder1_ctl01_UpdatePanel1').find('tbody tr');
  const arr: Array<any> = [];

  for (let i = 0; i < result.length; i += 1) {
    arr.push({
      id: i,
      country: result.eq(i).children().eq(0).text().trim(),
      value: result.eq(i).children().eq(1).text().trim(),
    });
  }

  return arr;
};

export const parseCommodities = ($) => {
  const result = $('.panel').children('.table-responsive');
  const obj = {};

  for (let i = 1; i < result.length - 1; i += 1) {
    obj[comoditiesKeys[i - 1]] = parseTable(
      result.eq(i).find('tbody').children(),
      'commoditie',
    );
  }

  return {
    date: getDate(),
    commodities: obj,
  };
};

export const parseCurrencies = ($) => {
  const result = $('.panel').children('.table-responsive');
  const data = {};

  for (let i = 0; i < NEEDED_CURRENCIES_AMOUNT; i += 1) {
    data[currenciesKeys[i]] = parseTable(
      result.eq(i).find('tbody').children(),
      'currency',
    );
  }

  return {
    date: getDate(),
    currencies: data,
  };
};

export const parseStocks = ($) => {
  const result = $('.panel').children('.table-responsive');
  const data = {};

  for (let i = 1; i < result.length; i += 1) {
    data[stocksKeys[i - 1]] = parseTable(
      result.eq(i).find('tbody').children(),
      'stock',
    );
  }

  return {
    date: getDate(),
    stocks: data,
  };
};
