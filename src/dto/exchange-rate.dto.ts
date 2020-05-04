import { IsNumber, IsString, Length } from 'class-validator';

export class ExchangeRateDto {
  @IsString()
  @Length(3, 3)
  fromCurrency: string;

  @IsString()
  @Length(3, 3)
  toCurrency: string;

  @IsNumber()
  amount: number;

  constructor(exchangeRateDto?: Partial<ExchangeRateDto>) {
    exchangeRateDto && Object.assign(this, exchangeRateDto);
  }
}
