import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();
const users = new UsersController();

usersRoutes.post("/signup", users.signup);

export default usersRoutes;
