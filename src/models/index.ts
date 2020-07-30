import { Group } from './Group';
import { User } from './User';

/**
 * ***************
 * User group relationship, to prevent circle dependency
 * ***************
 */
User.belongsToMany(Group, { through: 'UserGroups' });
Group.belongsToMany(User, { through: 'UserGroups' });

export { Group, User };
