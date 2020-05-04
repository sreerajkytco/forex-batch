'use strict';

import { Handler, APIGatewayEvent,Context } from 'aws-lambda';
import { BulkFetch } from './bulk-fetch';
import { ExchangeRateRepository } from '../database/exchange-rate.repository';
import { Database } from '../database/database';


export const getForexExchangeRate : Handler = async (event:APIGatewayEvent ,context:Context, callback: any) => {
  try{
     // const database = new Database();
      //await database.getConnection();
    const exchangeRateDtos = await BulkFetch.fetchAll();
    await ExchangeRateRepository.saveExchangeRates(exchangeRateDtos);
      //await ExchangeRateRepository.findAll();
  }catch(e){
    console.error(e);
  }
};
