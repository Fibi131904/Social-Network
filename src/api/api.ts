
import axios, { AxiosResponse } from "axios";
import { UserType } from "../redux/users-reducer";
import { ProfilePageType } from "../types/types";




const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '02e961ee-045c-4729-a140-71aed19c7552'
        }
    }
);
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
  }

 
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number,term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`) )
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<'', AxiosResponse<UserType>>(`follow/${userId}`)
       
    },
    unfollow(userId: number) {
        return instance.delete<'', AxiosResponse<UserType>>(`follow/${userId}`)
        
    },
    getProfile(userId: number | null) {
        console.log('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number| null ) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status })
    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfilePageType | null) {
        return instance.put(`profile`, profile);
    }
}
export enum ResultCodesEnum {
Success= 0,
Error= 1,
}

export enum ResultCodeForCaptchaEnum {
CaptchaIsRequired=10
}

type MeResponseType = {
    data:{id:number, email: string, login:string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data:{userId:number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    async me() {
        const response = await instance.get<MeResponseType>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string,
         rememberMe: boolean = false, captcha: null | string = null) {
        const response = await instance.post<LoginResponseType>(`auth/login`, { email,
             password, rememberMe, captcha });
        return response.data;
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}