import { ProfilePageType } from "../types/types";
import { apiConfig } from "./apiConfig";


export const profileAPI = {
    getProfile(userId: number| null ) {
        return apiConfig.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return apiConfig.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return apiConfig.put(`profile/status`, { status })
    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return apiConfig.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfilePageType | null) {
        return apiConfig.put(`profile`, profile);
    }
}
