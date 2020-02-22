import express from 'express';

import {
  getAllCommodities,
  getCommoditiesByDate,
  getCommoditiesBySpehere,
  getCommoditiesBySpehereByParam,
} from '../../controllers/commodities/commodities';
import { API_PARAM } from '../../constants';

export const router = express.Router();
const indicator = 'commodities';

/**
 * get all documents from collection
 * @return {array} -> [{},{},...]
 * @example -> [{ id: string, date: object, commodities: array }, ...]
 */
router.get(`/${API_PARAM}/${indicator}`, getAllCommodities);

/**
 * get array data by :sphere from all documents
 * @param {:sphere} -> energy \\ agriculture \\ livestock \\ industry
 * @return {array} -> [{},{},...]
 * @example -> [{ id: number, commoditie: string, value: string }, ...]
 */
router.get(`/${API_PARAM}/${indicator}/sphere/:sphere`, getCommoditiesBySpehere);

/**
 * get document by :date
 * @param {:date} -> '14-06-2019'
 * @return {object}
 * @example -> { id: string, date: object, commodities: array }
 */
router.get(`/${API_PARAM}/${indicator}/date/:date`, getCommoditiesByDate);

/**
 * get array data by :param (key) by :sphere from all documents
 * @param {:param} -> id || commoditie || value
 * @return {array} -> [{},{},...]
 * @example -> [{ id: number, commoditie: string, value: string }, ...]
 */
router.get(`/${API_PARAM}/${indicator}/sphere/:sphere/:param`, getCommoditiesBySpehereByParam);
