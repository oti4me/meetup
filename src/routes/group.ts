import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';
import { groupValidation } from '../middlewares/validation/groupValidation';
import { auth } from '../middlewares/auth';

const groupRoutes = Router();
const groupController = new GroupController();
const { createGroupValidationResult, createGroupValidator } = groupValidation;

groupRoutes.post(
  '/create',
  createGroupValidator,
  createGroupValidationResult,
  groupController.create
);

export default groupRoutes;
