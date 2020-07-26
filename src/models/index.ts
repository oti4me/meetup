import { Group } from './Group';
import { User } from './User';

/**
 * ***************
 * User group relationship, to prevent circle dependency
 * ***************
 */
User.hasMany(Group, {
  sourceKey: 'id',
  foreignKey: 'user_id',
});
Group.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'user_id',
});

export { Group, User };
