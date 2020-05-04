import { ApiProviderService } from './api-provider';
import { ExchangeRateDto } from '../dto/exchange-rate.dto';
import { ForexResponseDto } from '../dto/forex-response.dto';
import { ApiRequest } from '../interfaces/api-request';
import { RequestBody } from '../dto/request-body.dto';

export class ForexRate {
  constructor(private readonly apiProviderService:ApiProviderService){}

  public async getExchangeRate(sourceCurrency: string, destinationCurrency: string): Promise<ExchangeRateDto> {
    //console.info('ForexRate::getExchangeRate');
    if (sourceCurrency.toLowerCase() === destinationCurrency.toLowerCase()) {
      console.error('sourceCurrency and destinationCurrency same');
      throw new Error(`sourceCurrency and destinationCurrency cannot be same`);
    }

    try {
      const requestBody = new  RequestBody (sourceCurrency, destinationCurrency);
        
      const response: ForexResponseDto = await this.callCurrencyExchangeRateApi(requestBody);
      const converstionRate = response.result.conversionRate;
      const exchangeRate: ExchangeRateDto = this.createExchangeRate(sourceCurrency, destinationCurrency, converstionRate);
      
      return exchangeRate;
    } catch (e) {
      console.error(`getExchangeRate source : ${sourceCurrency} , destination: ${destinationCurrency}`);
      console.error(JSON.stringify(e));

      throw new Error('Failed to fetch currency converions rate');
    }
  }

  private async callCurrencyExchangeRateApi(data: RequestBody): Promise<ForexResponseDto> {
    const apiRequest: ApiRequest = {
      url: process.env.EXCHANGE_RATE_URL,
      method: 'post',
      headers: {
        Authorization: process.env.FOREX_API_BEARER_TOKEN,
        TENANT: process.env.FOREX_API_TENANT,
      },
      data: data,
      timeout: Number(process.env.FOREX_API_TIMEOUT),
    };

    const response = await this.apiProviderService.request(apiRequest);
    if(response.data && response.data.result){
      return response.data;
    }
    throw new Error('Not supported');
  }

  private createExchangeRate(
    sourceCurrency: string,
    destinationCurrency: string,
    conversionRate: number,
  ): ExchangeRateDto {
    const exchangeRate: ExchangeRateDto = {
      fromCurrency: sourceCurrency,
      toCurrency: destinationCurrency,
      amount: conversionRate,
    };

    return exchangeRate;
  }
}
