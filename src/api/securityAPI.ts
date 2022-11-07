import { apiConfig } from "./apiConfig";



export const securityAPI = {
    getCaptchaUrl() {
        return apiConfig.get(`security/get-captcha-url`)
    }
}
