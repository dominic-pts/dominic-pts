import BaseAPI from '../baseAPI';

const API_ENDPOINT = "/slider-headers?populate=*";

class SliderHeaderAPI extends BaseAPI {
    async getSliderHeader() {
        try {
          const response = await this.get(API_ENDPOINT);
          return response; 
        } catch (error) {
          console.error("Error fetching sections:", error);
          throw error;
        }
      }
};

export default SliderHeaderAPI;
