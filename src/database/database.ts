import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { getAWSSecret } from '../aws/secrets/fetch-aws-secret';
import { Environment } from '../enum/environment.enum'
import { SecretString } from '../dto/secret-string.dto';

/**
 * Database manager class
 */
export class Database {
    private connectionManager: ConnectionManager
  
    constructor() {
        this.connectionManager = getConnectionManager()
    }
    
    public async getConnection(): Promise<Connection> {
      console.info('Database::getConnection');
        const CONNECTION_NAME = `default`;

        let connection: Connection = null;

        if (this.connectionManager.has(CONNECTION_NAME)) {
            console.info(`Database.getConnection()-using existing connection ...`);
            connection = await this.connectionManager.get(CONNECTION_NAME);

            if (!connection.isConnected) {
                connection = await connection.connect();
            }
            console.info(`Database.getConnection()-using existing connection done`);
        }
        else {
            console.info(`Database.getConnection()-creating connection ...`);
            const connectionOptions = await this.createConnectionOptions();
            connection = await createConnection(connectionOptions);
            console.info(`Database.getConnection()-creating connection done...`);
        }

        return connection;
    }

    private async createConnectionOptions() : Promise<ConnectionOptions> {
      console.info('Database::createConnectionOptions');
      const stage = process.env.STAGE;
      if ( stage === Environment.PROD || stage === Environment.DEV || stage === Environment.QA ){
        return await this.createConnectOptionsFromAws();
      }else if(stage == Environment.LOCAL){
        return await this.createConnectionOptionsFromLocal();
      }
      throw new Error('Unknown environment..');
    }

    private async createConnectOptionsFromAws(): Promise<ConnectionOptions> {
      console.info('Database::createConnectOptionsFromAws BEGIN');
      const awsSecret = await getAWSSecret(process.env.PG_SECRET_KEY);
     
      let secretString;
      if(awsSecret && awsSecret.SecretString){
        secretString = JSON.parse(awsSecret.SecretString );
        console.log(secretString);
      }else {
        throw new Error('SecretString is null');
      }

      const connectionOptions: ConnectionOptions = {
        type: `postgres`,
        host: secretString.host,
        port: secretString.port || 5432,
        username: secretString.username,
        password: secretString.password,
        database: 'oms',
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [
            __dirname + "/*.entity.js"
        ]
      };
      console.info(JSON.stringify(connectionOptions));
      console.info('Database::createConnectOptionsFromAws END');
      return connectionOptions;
    }

    private createConnectionOptionsFromLocal(): ConnectionOptions {
      console.log('createConnectionOptionsFromLocal');
      console.log(process.env.PG_SECRET_KEY);

      const connectionOptions: ConnectionOptions = {
        type: `postgres`,
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT) || 5432,
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [
            __dirname + "/*.entity.js"
        ]
      };
      return connectionOptions;
    }
}
