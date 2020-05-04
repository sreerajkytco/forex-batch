import { IsString, IsNotEmpty } from "class-validator";

export class RequestBody {

  @IsString()
  @IsNotEmpty()
  sourceCurrency: string;

  @IsString()
  @IsNotEmpty()
  destinationCurrency: string;

  constructor(sourceCurrency: string, destinationCurrency: string){
    this.sourceCurrency = sourceCurrency;
    this.destinationCurrency = destinationCurrency;
  }
};
