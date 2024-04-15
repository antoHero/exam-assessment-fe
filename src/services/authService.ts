import axios from "../axios";
import { userInfo } from "../helpers/helpers";

class AuthService {
    async login(payload: object) {
        const { setToken, setUser } = userInfo();
        const response = await axios.post('/auth/login', payload);
        if(response.status === 200) {
            setUser(response.data.user);
            setToken(response.data.token);
        }
        console.log(response);
        return response;
    }

    async logout() {
        const response = await axios.post('/logout');
        localStorage.clear();
        window.location.href = '/auth/login'
        if(response.status === 200) {
            window.location.href = '/auth/login'
        }
    }
}

export default new AuthService();