import { Sequelize } from 'sequelize';
const config = require('../config/db');

class DB {
  /**
   * instance of sequlize
   *
   * @private
   * @type {Sequelize}
   * @memberOf DB
   */
  private sequelize: Sequelize;

  /**
   * Creates an instance of DB.
   *
   * @memberOf DB
   */
  constructor() {
    const env: string = process.env.NODE_ENV || 'development';
    const { database, username, password, host, dialect, logging } = config[
      env
    ];

    this.sequelize = new Sequelize(database, username, password, {
      host,
      dialect,
      logging,
    });
  }

  /**
   * Gets an instance of sequlize
   *
   * @returns {Sequelize}
   */
  public get(): Sequelize {
    return this.sequelize;
  }

  /**
   * authenticate
   */
  public async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export const dbInstance = new DB();
export default DB;
