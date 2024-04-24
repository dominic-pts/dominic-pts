import BaseAPI from '../baseAPI';

const API_ENDPOINT = "/mood-tests";

class MoodTestAPI extends BaseAPI {
    async getMoodTest() {
        try {
            const response = await this.get(API_ENDPOINT);
            return response;
        } catch (error) {
            console.error("Error fetching sections:", error);
            throw error;
        }
    }
};

export default MoodTestAPI;

