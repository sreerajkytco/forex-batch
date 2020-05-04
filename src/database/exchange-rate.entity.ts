import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, Unique, Index } from 'typeorm';

import { BaseEntity } from '../database/base.entity';
import { ExchangeRateDto } from '../dto/exchange-rate.dto';

@Exclude()
@Entity({ name: 'exchange_rate' })
@Unique(['fromCurrency', 'toCurrency'])
export class ExchangeRate extends BaseEntity {
  @Expose()
  @Index()
  @Column({ length: 3 })
  fromCurrency: string;

  @Expose()
  @Index()
  @Column({ length: 3 })
  toCurrency: string;

  @Expose()
  @Column({ type: 'decimal', precision: 11, scale: 7 })
  amount: number;

  constructor(exchangeRate?: Partial<ExchangeRate>) {
    super();

    exchangeRate && Object.assign(this, exchangeRate);
  }
}
