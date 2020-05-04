import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CurrencyDetails {
  @IsString()
  readonly sourceCurrency: string;

  @IsString()
  readonly destinationCurrency: string;

  @IsNumber()
  readonly destinationCurrencyCde: number;

  @IsNumber()
  readonly sourceCurrencyCde: number;

  @IsNumber()
  readonly conversionRate: number;

  @IsOptional()
  @IsNumber()
  readonly sellConversionRate: number;

  @IsNumber()
  readonly lastUpdateTime: number;

  @IsNumber()
  readonly pkey: number;

  @IsOptional()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsNumber()
  readonly crConversionRate: number;

  constructor(currencyDetails?: Partial<CurrencyDetails>) {
    currencyDetails && Object.assign(this, currencyDetails);
  }
}
