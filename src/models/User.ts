import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { dbInstance } from '../database/db';
import { WELCOME_NOTIFICATION } from '../events/constants';

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
  }
);
User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});
User.afterCreate(async (user, options) => {
  const eventEmitter = global['eventEmitter'];
  eventEmitter.emit(WELCOME_NOTIFICATION, user);
});
