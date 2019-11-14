import { job as stocksJob } from './stocks/stocks';
import { job as currencyJob } from './currency/currency';
import { job as inflationJob } from './inflation/inflation';
import { job as commoditiesJob } from './commodities/commodities';
import { job as salesTaxRateJob } from './sales-tax-rate/sales-tax-rate';
import { job as interestRateJob } from './interest-rate/interest-rate';
import { job as corruptionRankJob } from './corruption-rank/corruption-rank';
import { job as corporateTaxRateJob } from './corporate-tax-rate/corporate-tax-rate';
import { job as governmentDebtToDGPJob } from './government-debt-to-GDP/government-debt-to-GDP';
import { job as personalIncomeTaxRateJob } from './personal-income-tax-rate/personal-income-tax-rate';

export const jobs: Array<any> = [
  stocksJob,
  currencyJob,
  inflationJob,
  commoditiesJob,
  salesTaxRateJob,
  interestRateJob,
  corruptionRankJob,
  corporateTaxRateJob,
  governmentDebtToDGPJob,
  personalIncomeTaxRateJob,
];
