'use strict'
const { Pool } = require('pg')
let pool;

const database = {
      user: "postgres",
      host: "localhost",
      database: "todo_app",
      password: "root",
      port: 5432,
      idleTimeoutMillis: 1000
}

async function createPool(){
  pool = new Pool(database)
}

module.exports.createPool = createPool;

async function getClient(){
  return new Promise((resolve, reject) =>{
    pool.connect((err, client) => {
      if (err) {
        reject(err)
      } else {
        resolve(client)
      }
    })
  })
}
module.exports.getClient = getClient;
/**
 *
 * @param {String} sql SQL stament to execute
 * @param {Array} bindParams  parameters for SQL statement
 */
module.exports.singleExecute =  async function singleExecute(sql, bindParams){
  let _results;
  let client;
  try {
    client = await this.getClient();
  } catch (error) {
    throw error;
  }
  try {
    _results = await this.execute(sql, bindParams, client);
  } catch (error) {
    throw error;
  } finally {
    client.release()
  }
  return _results;
}

async function execute(sql, bindParams, client) {
  try {
    let results = await client.query(sql, bindParams);
    return results;
  } catch (err) {
    console.log(err)
    throw err;
  }
}
module.exports.execute = execute;


