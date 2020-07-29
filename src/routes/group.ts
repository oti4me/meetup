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
  '/:goupId',
  createGroupValidator,
  updateGroupValidationResult,
  groupController.update
);

groupRoutes.delete('/:goupId', groupController.delete);

export default groupRoutes;
