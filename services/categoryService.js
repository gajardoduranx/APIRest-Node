

class CategoryService {

  constructor(){
  }
  async addCategory(data) {
    return data;
  }

  async getCategories() {
    return [];
  }

  async getOneCategory(id) {
    return { id };
  }

  async updateOneCategory(id, changes) {
    return {
      id,
      changes,
    };
  }

  async deleteOneCategory(id) {
    return { id };
  }

}

export default CategoryService;