import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models/responce/AuthResponse";
import TokenService from "./TokenService";

class AuthService {
    login (username: string, password: string) {
        return $api
            .post('/auth/signin', {
                username,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    };

    register(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/signup', {username, email, password})
    }

    logout() {
        TokenService.removeUser();
    }
}

export default new AuthService();