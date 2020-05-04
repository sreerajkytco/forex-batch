import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";


/*
SecretString: '{"username":"oms","password":"oms2020","engine":"postgres","host":"skynet-qa.cqgwcdzlhgnl.ap-south-1.rds.amazonaws.com","port":5432,"dbInstanceIdentifier":"skynet-qa"}',
*/

export class SecretString {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  engine: string;

  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  @IsNotEmpty()
  port: number;

  @IsString()
  @IsOptional()
  dbInstanceIdentifier: string;

  constructor(secretString?: Partial<SecretString>) {
    secretString && Object.assign(this, secretString);
  }

}
