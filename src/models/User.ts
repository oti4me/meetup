import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../database/db';
import { WELCOME_NOTIFICATION } from '../events/constants';
import { hashPassword } from '../helpers/bcrypt';
import { Group } from './Group';

export class User extends Model {
  public id?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public username: string;
  public phone: string;
  public password: string;
  public readonly createdAt?: string;
  public readonly updatedAt?: string;

  public getGroups: () => Group[];
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    phone: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize: dbInstance.get(),
    tableName: 'users',
  }
);
User.beforeCreate(async (user, options) => {
  user.password = hashPassword(user.password);
});
User.afterCreate(async (user, options) => {
  const eventEmitter = global['eventEmitter'];
  eventEmitter.emit(WELCOME_NOTIFICATION, user);
});
