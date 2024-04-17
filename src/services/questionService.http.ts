import axios from "../axios";

class QuestionService {
    async getQuestion(questionId: string | undefined) {
        const response = await axios.get(`/questions/question/${questionId}`);
        return response;
    }

    async createQuestion(assessmentId: string, payload: object) {
        const response = await axios.post(`/questions/${assessmentId}`, payload);
        return response;
    }

    async answerQuestion(questionId: string, payload: object) {
        const response = await axios.post(`/answers/${questionId}`, payload);
        return response;
    }

    async updateQuestion(id: string, payload: object) {
        const response = await axios.put(`/questions/question/${id}`, payload);
        return response;
    }

    async addOptionForQuestion(id: string, payload: object) {
        const response = await axios.post(`/options/${id}`, payload);
        return response;
    }

    async updateOptionForQuestion(id: string, payload: object) {
        const response = await axios.put(`/options/option/${id}`, payload);
        return response;
    }

    async deleteQuestion(id: string) {
        const response = await axios.delete(`/questions/question/${id}`);
        return response;
    }
}

export default new QuestionService();