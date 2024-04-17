import axios from "../axios";

class AssessmentService {
    async getAssessments() {
        const response = await axios.get('/assessments');
        return response;
    }

    async getAssessment(id: string | undefined){
        const response = await axios.get(`/assessments/${id}`);
        return response;
    }

    async getUesrsAssessmentResult(id: string | undefined){
        const response = await axios.get(`/assessments/${id}/result`);
        return response;
    }

    async createAssessment(payload: object) {
        const response = await axios.post('/assessments', payload);
        return response;
    }

    async updateAssessment(payload: object, id: string) {
        const response = await axios.put(`/assessments/${id}`, payload);
        return response;
    }

    async deleteAssessment(id: string) {
        const response = await axios.delete(`/assessments/${id}`);
        return response;
    }
}

export default new AssessmentService();