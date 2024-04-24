import BaseAPI from '../baseAPI';

const API_ENDPOINT = "/cafe-locations?populate=*";

class CafeLocationAPI extends BaseAPI {
    async getCafeLocation() {
        try {
            const response = await this.get(API_ENDPOINT);
            return response;
        } catch (error) {
            console.error("Error fetching sections:", error);
            throw error;
        }
    }
};

export default CafeLocationAPI;

