import axios from "../axios";
import { userInfo } from "../helpers/helpers";

class AuthService {
    async login(payload: object) {
        const { setToken, setUser } = userInfo();
        const response = await axios.post('/auth/login', payload);
        if(response.status === 200) {
            setUser(response.data.data);
            setToken(response.data.token);
        }
        return response;
    }

    async logout() {
        const response = await axios.post('/logout');
        if(response.status === 200) {
            localStorage.clear();
            window.location.href = '/'
        }
    }
}

export default new AuthService();