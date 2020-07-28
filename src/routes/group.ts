import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';
import { groupValidation } from '../middlewares/validation/groupValidation';
import { auth } from '../middlewares/auth';

const groupRoutes = Router();
const groupController = new GroupController();
const { updateGroupValidationResult, createGroupValidator } = groupValidation;

groupRoutes.post(
  '/',
  createGroupValidator,
  updateGroupValidationResult,
  groupController.create
);

groupRoutes.put(
  '/:goupId',
  createGroupValidator,
  updateGroupValidationResult,
  groupController.update
);

export default groupRoutes;
