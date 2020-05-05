# forex-batch

initial steps:
 - npm install
 - npm run build # compiles the ts files


1. To run locally the business logic/code:
serverless invoke local --function forex-exchange-handler -e PG_HOST=localhost -e PG_USERNAME=kyt -e PG_PASSWORD=kyt -e PG_DATABASE=oms -e STAGE=local

2. config/<env>.yml holds the config based parameters.

3. current env=prod,qa,dev,local
  
4. To create a package:

  - serverless package --stage=dev 
  - serverless package --stage=qa
  - serverless package --stage=prod
  
5. To deploy the package:
  
   - serverless deploy --stage=dev
   - serverless deploy --stage=qa
   - serverless deploy --stage=prod
  
  
  
