
import { ForexRate } from './forex-rate';
import { ApiProviderService } from './api-provider';
import { ExchangeRateDto } from '../dto/exchange-rate.dto';

import { m2pCurrencies } from '../data/m2p-supported-currencies';

export class BulkFetch {
  public static async fetch(toCurrency: string): Promise<ExchangeRateDto[]> {
    console.info(`BulkFetch::fetch for currency ${toCurrency}`);
    const forexRate = new ForexRate(new ApiProviderService());
    const exchangeRatePromises: Promise<ExchangeRateDto>[] = [];
    const exchangeRates: ExchangeRateDto[] = [];
    for( const currency of m2pCurrencies) {
      if(toCurrency != currency){
          const promise = forexRate.getExchangeRate(currency, toCurrency);
          exchangeRatePromises.push(promise);
      }
    }
    
    for( const exchangeRatePromise of exchangeRatePromises) {
      await exchangeRatePromise.then(exchangeRate =>  exchangeRates.push(exchangeRate) ).catch(e => console.error(e));
    }
    console.info(`BulkFetch::done ${toCurrency}`);
    return exchangeRates;
  }

  public static async fetchAll(): Promise<ExchangeRateDto[]> {
    console.info('BulkFetch::fetchAll');
    const finalExchangeRates: ExchangeRateDto[] = [];
    const finalExchangeRatePromises: Promise<ExchangeRateDto[]>[] = [];
    for( const currency of m2pCurrencies) {
      const exchangeRatePromise =  BulkFetch.fetch(currency);
      finalExchangeRatePromises.push(exchangeRatePromise);
    }
        
    for(const finalExchangeRatePromise of finalExchangeRatePromises){
        await finalExchangeRatePromise.then(exchangeRates => finalExchangeRates.push( ...exchangeRates)).catch(e => console.log(e));
    }  
    console.info('BulkFetch::fetchAll done');
    return finalExchangeRates;
    
  }
}
