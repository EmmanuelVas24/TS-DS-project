import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const mysql = require('mysql2');
const util = require('util');

const dbconpool = mysql.createPool({
  host: '127.0.0.1',
  //port: 0,
  user: 'root',
  password: 'password',
  database: 'sys',
  debug: false,
  multipleStatements: true
});

/*
const config = {
  name: 'mysql',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  //port: 0,
  user: 'root',
  password: 'password',
  database: 'sys'
};
*/

dbconpool.getConnection((err: any, connection: any) => {
  if(err){
    console.log(err.code);
    console.log(err.sqlMessage);
  }
  else{
    console.error('Database connected');
  }
  if(connection) connection.release()
  return;
});

dbconpool.query = util.promisify(dbconpool.query);
module.exports = dbconpool;

const config = {};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
