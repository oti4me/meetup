import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { userValidation } from '../middlewares/validation/userValidation';

const usersRoutes = Router();
const usersController = new UsersController();
const { signupValidationResult, signupValidator } = userValidation;

usersRoutes.post(
  '/signup',
  signupValidator,
  signupValidationResult,
  usersController.signup
);

export default usersRoutes;
