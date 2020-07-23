import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { userValidation } from '../middlewares/validation/userValidation';

const usersRoutes = Router();
const usersController = new UsersController();
const {
  signupValidationResult,
  signupValidator,
  signinValidation,
  signinValidationResult,
} = userValidation;

usersRoutes.post(
  '/signup',
  signupValidator,
  signupValidationResult,
  usersController.signup
);

usersRoutes.post(
  '/signin',
  signinValidation,
  signinValidationResult,
  usersController.signin
);

export default usersRoutes;
