import User from "../Models/user.js";

class adminService {
  async checkAdmin(body) {
    try {
      if (!body) {
        throw ApiError.BadRequest("Uncorrect user");
      }

      const user = await User.findById(body);
      const role = user.roles[1];
      return role;
    } catch (error) {
      console.log(error);
      res.status(400).json();
    }
  }
}
export default new adminService();
