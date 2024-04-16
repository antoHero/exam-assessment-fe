import axios from "../axios";

class AssessmentService {
    async getAssessments() {
        const response = await axios.get('/assessments');
        return response;
    }

    async createAssessment(payload: object) {
        console.log("in here")
        const response = await axios.post('/assessments', payload);
        return response;
    }
}

export default new AssessmentService();