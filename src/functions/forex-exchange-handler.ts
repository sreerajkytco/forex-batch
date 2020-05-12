"use strict";

import { Handler, APIGatewayEvent, Context } from "aws-lambda";
import { BulkFetch } from "./bulk-fetch";
import { ExchangeRateRepository } from "../database/exchange-rate.repository";

export const getForexExchangeRate: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: any
) => {
  try {
    const exchangeRateDtos = await BulkFetch.fetchAll();
    await ExchangeRateRepository.saveExchangeRates(exchangeRateDtos);
  } catch (e) {
    console.error(e);
  }
};
