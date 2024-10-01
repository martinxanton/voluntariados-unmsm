import { UserRepository } from "../../domain/userRepository.js";

export class MockUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  createUser(user) {
    this.users.push(user);
    return user;
  }
}
