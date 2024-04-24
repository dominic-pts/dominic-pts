import BaseAPI from '../baseAPI';

const API_ENDPOINT = "/music-heals?populate=*";

class HealAPI extends BaseAPI {
    async getHealMusic() {
        try {
            const response = await this.get(API_ENDPOINT);
            return response;
        } catch (error) {
            console.error("Error fetching sections:", error);
            throw error;
        }
    }
};

export default HealAPI;

