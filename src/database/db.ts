import { Sequelize } from "sequelize";
const config = require("../config/dbConfig");

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
    const env: string = process.env.NODE_ENV || "development";
    const conf = config[env];

    this.sequelize = new Sequelize(
      conf.database,
      conf.username,
      conf.password,
      {
        host: conf.host,
        dialect: conf.dialect,
        logging: conf.logging,
      }
    );
  }

  /**
   * Gets an instance of sequlize
   *
   * @returns {Sequelize}
   */
  public getDB(): Sequelize {
    return this.sequelize;
  }

  /**
   * authenticate
   */
  public async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default DB;
