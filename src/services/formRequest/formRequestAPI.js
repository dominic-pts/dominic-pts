import BaseAPI from '../baseAPI';

const API_ENDPOINT_POST = "/form-requests";

class FormRequestAPI extends BaseAPI {
    async postFormRepuest(formData) {
        try {
            const response = await this.post(API_ENDPOINT_POST, formData);
            return response;

        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }
    async getFormRepuest() {
        try {
          const response = await this.get(API_ENDPOINT_POST);
          return response; 
        } catch (error) {
          console.error("Error fetching sections:", error);
          throw error;
        }
      }
};

export default FormRequestAPI;
