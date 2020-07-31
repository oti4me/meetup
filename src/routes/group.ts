import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';
import { groupValidation } from '../middlewares/validation/groupValidation';
import { auth } from '../middlewares/auth';

const groupRoutes = Router();
const groupController = new GroupController();
const {
  updateGroupValidationResult,
  createGroupValidator,
  createGroupValidationResult,
} = groupValidation;

groupRoutes.post(
  '/',
  createGroupValidator,
  createGroupValidationResult,
  groupController.create
);

groupRoutes.put(
  '/:groupId',
  createGroupValidator,
  updateGroupValidationResult,
  groupController.update
);

groupRoutes.delete('/:groupId', groupController.delete);
groupRoutes.post('/:groupId/user/:id', groupController.addUser);
groupRoutes.delete('/:groupId/user/:id', groupController.removeUser);

export default groupRoutes;
