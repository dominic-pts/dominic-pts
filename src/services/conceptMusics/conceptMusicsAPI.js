import BaseAPI from '../baseAPI';

const API_ENDPOINT = "/concept-musics?populate=*";

class ConceptMusicsAPI extends BaseAPI {
    async getConceptMusic() {
        try {
            const response = await this.get(API_ENDPOINT);
            return response;
        } catch (error) {
            console.error("Error fetching sections:", error);
            throw error;
        }
    }
};

export default ConceptMusicsAPI;

