import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { CurrencyDetails } from './currency-details.dto';

export class ForexResponseDto {
  @ValidateNested({ each: true })
  @Type(() => CurrencyDetails)
  readonly result: CurrencyDetails;

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly exception?: any;

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly pagination?: any;
}
