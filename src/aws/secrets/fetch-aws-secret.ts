import { AwsSecret } from '../../dto/aws-secret.dto';
import { SecretString } from '../../dto/secret-string.dto';

const AWS = require('aws-sdk');
const client = new AWS.SecretsManager({region: 'ap-south-1'});

const getAwsSecret = (secretId) => {
  return client.getSecretValue({ SecretId: secretId }).promise();
}

async function getAwsSecretAsync (secretId: string) {
  let error;
  const response = await getAwsSecret(secretId).catch(err => (error = err));
  return [error, response];
}

export const getAWSSecret = async (secretId: string) => {
  console.info(`getAWSSecret BEGIN ${secretId}`);
  const [error, secret] = await getAwsSecretAsync(secretId);
  
  if (error) {
    console.error(error);
    throw new Error(`Unable to retrieve ${secretId} value`);
  }
  console.info(`getAWSSecret END ${secretId}`);
  return secret;
}
