import express from 'express';

import { router as messenger } from './web-messenger/web-messenger';
import { router as authentication } from './authentication/index';
import { router as stocks } from './stocks/stocks';
import { router as currency } from './currency/currency';
import { router as inflation } from './inflation/inflation';
import { router as commodities } from './commodities/commodities';
import { router as interestRate } from './interest-rate/interest-rate';
import { router as salesTaxRate } from './sales-tax-rate/sales-tax-rate';
import { router as corrupationRank } from './corruption-rank/corruption-rank';
import { router as corporateTaxRate } from './corporate-tax-rate/corporate-tax-rate';
import { router as governmentDebtToGDP } from './government-debt-to-GDP/government-debt-to-GDP';
import { router as personalIncomeTaxRate } from './personal-income-tax-rate/personal-income-tax-rate';

export const router = express.Router();

router.use(stocks);
router.use(currency);
router.use(messenger);
router.use(inflation);
router.use(commodities);
router.use(interestRate);
router.use(salesTaxRate);
router.use(authentication);
router.use(corrupationRank);
router.use(corporateTaxRate);
router.use(governmentDebtToGDP);
router.use(personalIncomeTaxRate);
