import { User } from "../../domain/user.js";

export class UserController {
  constructor(userUseCases) {
    this.userUseCases = userUseCases;
  }

  getAllUsers(req, res) {
    const users = this.userUseCases.getAllUsers();
    res.json(users);
  }

  createUser(req, res) {
    const { name, email } = req.body;
    const newUser = new User(Date.now(), name, email);
    const createdUser = this.userUseCases.createUser(newUser);
    res.status(201).json(createdUser);
  }
}
