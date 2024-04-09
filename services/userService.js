class UserService {
  constructor() {}

  async addUser(data) {
    return data;
  }

  async getUsers() {
    return [];
  }

  async getOneUser(id) {
    return { id };
  }

  async updateOneUser(id, changes) {
    return {
      id,
      changes,
    };
  }

  async deleteOneUser(id) {
    return { id };
  }
}

export default UserService;