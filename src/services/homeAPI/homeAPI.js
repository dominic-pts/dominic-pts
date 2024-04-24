import BaseAPI from "../baseAPI";

const API_ENDPOINT = "/texts/1";

class HomeAPI extends BaseAPI {
  async getSections() {
    try {
      const response = await this.get(API_ENDPOINT);
      return response; 
    } catch (error) {
      console.error("Error fetching sections:", error);
      throw error;
    }
  }
}

export default HomeAPI;
