import api from "../api";
class FruitService {
  getAll() {
    return api.get("/todos");
  }
}

export default new FruitService();
