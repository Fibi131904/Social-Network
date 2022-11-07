import { apiConfig } from "./apiConfig";
import { LoginResponseType, MeResponseType } from "./types";


export const authAPI = {
    async me() {
        const response = await apiConfig.get<MeResponseType>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string,
         rememberMe: boolean = false, captcha: null | string = null) {
        const response = await apiConfig.post<LoginResponseType>(`auth/login`, { email,
             password, rememberMe, captcha });
        return response.data;
    },
    logout() {
        return apiConfig.delete(`auth/login`)
    }
}

