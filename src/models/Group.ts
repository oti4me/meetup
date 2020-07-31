import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../database/db';
import { User } from './User';

export class Group extends Model {
  public id?: number;
  public name: string;
  public user_id: number;
  public readonly createdAt?: string;
  public readonly updatedAt?: string;

  public addUsers: (user: User) => {};
  public getUsers: () => User[];
  public removeUser: (user: User) => {};
}
Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: dbInstance.get(),
    tableName: 'groups',
  }
);
