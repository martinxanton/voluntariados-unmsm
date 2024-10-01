import { Router } from "express";
import { MockUserRepository } from "../repositories/mockUserRepository.js";
import { UserUseCases } from "../../application/userUseCases.js";
import { UserController } from "../controllers/userController.js";

const userRepository = new MockUserRepository();
const userUseCases = new UserUseCases(userRepository);
const userController = new UserController(userUseCases);

const userRouter = Router();

userRouter.get("/user", (req, res) => userController.getAllUsers(req, res));
userRouter.post("/user", (req, res) => userController.createUser(req, res));

export default userRouter;
