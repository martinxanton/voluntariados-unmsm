export class UserUseCases {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  createUser(user) {
    return this.userRepository.createUser(user);
  }
}
