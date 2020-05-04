import { IsArray, IsString, IsNotEmpty, IsDate, IsOptional } from "class-validator";

/*
{
  ARN: 'arn:aws:secretsmanager:ap-south-1:999999999:secret:skynet-qa/rds/oms-vXZyMZ',
  Name: 'skynet-qa/rds/oms',
  VersionId: 'c1fa8660-6c0c-4037-8e68-32b2a5f4d4a2',
  SecretString: '{"username":"oms","password":"oms2020","engine":"postgres","host":"skynet-qa.cqabcdzlabnl.ap-south-1.rds.amazonaws.com","port":5432,"dbInstanceIdentifier":"skynet-qa"}',
  VersionStages: [ 'AWSCURRENT' ],
  CreatedDate: 2020-04-29T10:04:22.637Z
}
*/

import { SecretString } from './secret-string.dto';
import { Type } from "class-transformer";

export class AwsSecret {
  @IsString()
  ARN: string;
  
  @IsString()
  Name: string;
  
  @IsString()
  VersionId: string;
  
  @Type(() => SecretString)
  @IsNotEmpty()
  SecretString: SecretString;

  @IsArray()
  VersionStages: string[];

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  CreatedDate: Date;

  constructor(awsSecret?: Partial<AwsSecret>) {
    this.SecretString = new SecretString();
   
    awsSecret && Object.assign(this, awsSecret);
  }
}
