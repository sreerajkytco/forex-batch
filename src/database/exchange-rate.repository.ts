import { Database } from './database';
import { ExchangeRateDto } from '../dto/exchange-rate.dto';
import { ExchangeRate } from '../database/exchange-rate.entity';
import { Repository , Connection } from 'typeorm';


export class ExchangeRateRepository {
  private static initialized: boolean = false;
  private static exchangeRateDB: Repository<ExchangeRate>;
  private static database: Database;
  private static dbConnection: Connection;

  private static async init() {
    this.database = new Database();
    this.dbConnection = await this.database.getConnection();
    this.exchangeRateDB = await this.dbConnection.getRepository(ExchangeRate);
    this.initialized = true;
  }

  private static transformExchangeRateDtos(exchangeRateDtos : ExchangeRateDto[] ): ExchangeRate[] {
    const exchangeRates: ExchangeRate[] = [];
    for(const exchangeRateDto of exchangeRateDtos){
      exchangeRates.push(this.transformExchangeRateDto(exchangeRateDto));
    }
    return exchangeRates;
  }

  private static transformExchangeRateDto(exchangeRateDto: ExchangeRateDto): ExchangeRate {
    const exchangeRate = new ExchangeRate();
    exchangeRate.fromCurrency = exchangeRateDto.fromCurrency;
    exchangeRate.toCurrency = exchangeRateDto.toCurrency;
    exchangeRate.amount = exchangeRateDto.amount;

    return exchangeRate;
  }

  public static getExchangeRates( exchangeRateDtos : ExchangeRateDto[]): ExchangeRate[] {
    const exchangeRates = this.transformExchangeRateDtos(exchangeRateDtos);
    return exchangeRates;
  }
  
  public static async saveExchangeRates(exchangeRateDtos : ExchangeRateDto[]) : Promise<ExchangeRate[]> {
    console.info('ExchangeRateRepository::saveExchangeRates');
    if(!this.initialized) {
      await this.init();
      this.initialized = true;
    }

    const exchangeRates = this.getExchangeRates(exchangeRateDtos);
    await this.exchangeRateDB.clear();
    return await this.exchangeRateDB.save(exchangeRates);
  }

  public static async findAll() : Promise<void> {
    console.info('ExchangeRateRepository::findAll');
    if(!this.initialized) {
      await this.init();
      this.initialized = true;
    }
   
    const exchangeRates = await this.exchangeRateDB.find();
    exchangeRates.map(exchangeRate => console.log(exchangeRate) );
    console.info(exchangeRates.length);
  }

}
