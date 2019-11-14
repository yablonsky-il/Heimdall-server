/* eslint-disable newline-per-chained-call */

import { getDate } from './util';

const NEEDED_CURRENCIES_AMOUNT = 6;

const comoditiesKeys = [
  'energy',
  'agriculture',
  'livestock',
  'industry',
  'index',
];

const currenciesKeys = [
  'topCurrencies',
  'crypto',
  'EURCross',
  'GBPCross',
  'AUDCross',
  'JPYCross',
];

const stocksKeys = [
  'Europe',
  'USA',
  'Asia',
  'Australia',
  'Africa',
];

export const parseTable = (tbody, key) => {
  const data = [];

  for (let i = 0; i < tbody.length; i += 1) {
    data.push({
      id: i,
      [key]: tbody.eq(i).children().eq(1).text().trim(),
      value: tbody.eq(i).children().eq(2).text().trim(),
    });
  }

  return data;
};

export const parseAnyIndicator = ($) => {
  const result = $('#ctl00_ContentPlaceHolder1_ctl01_UpdatePanel1').find('tbody tr');
  const arr = [];

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
  const data = {};

  for (let i = 1; i < result.length - 1; i += 1) {
    data[comoditiesKeys[i - 1]] = parseTable(
      result.eq(i).find('tbody').children(),
      'commoditie',
    );
  }

  return {
    date: getDate(),
    commodities: data,
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
