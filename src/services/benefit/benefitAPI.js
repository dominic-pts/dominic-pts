import BaseAPI from '../baseAPI';

const API_ENDPOINT = "/benefits-musics?populate=*";

class BenefitAPI extends BaseAPI {
    async getBenefit() {
        try {
            const response = await this.get(API_ENDPOINT);
            return response;
        } catch (error) {
            console.error("Error fetching sections:", error);
            throw error;
        }
    }
};

export default BenefitAPI;

