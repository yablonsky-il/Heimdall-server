import { requestStocks } from './stocks/stocks';
import { requestCurrencies } from './currency/currency';
import { requestInflations } from './inflation/inflation';
import { requestCommodities } from './commodities/commodities';
import { requestSalesTaxRate } from './sales-tax-rate/sales-tax-rate';
import { requestInterestRate } from './interest-rate/interest-rate';
import { requestCorruptionRank } from './corruption-rank/corruption-rank';
import { requestCorporateTaxRate } from './corporate-tax-rate/corporate-tax-rate';
import { requestGovernmentDebtToGDP } from './government-debt-to-GDP/government-debt-to-GDP';
import { requestPersonalIncomeTaxRate } from './personal-income-tax-rate/personal-income-tax-rate';

export const allRequests = [
  requestStocks,
  requestCurrencies,
  requestInflations,
  requestCommodities,
  requestSalesTaxRate,
  requestInterestRate,
  requestCorruptionRank,
  requestCorporateTaxRate,
  requestGovernmentDebtToGDP,
  requestPersonalIncomeTaxRate,
];
