
import axios from "axios";
import { ProfilePageType } from "../components/Profile/ProfileContainer";



const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '02e961ee-045c-4729-a140-71aed19c7552'
        }
    }
);

export const usersAPI = {
    async getUsers(currentPage : number, pageSize : number) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },

    follow(userId:number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId:number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile( userId:number | null){
    console.warn('Obsolute method.Please profileAPI object.')
        return   profileAPI.getProfile(userId)
          
       }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile: string) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipert/form-data'
            }
        })
    },
    saveProfile(profile: ProfilePageType | null) {
        return instance.put(`profile`, profile)
    }
}


export const authAPI= {
    me(){
        return  instance.get(`auth/me`)
       },
    login(email:string, password: string, rememberMe: boolean = false){
        return  instance.post(`auth/login`, {email, password, rememberMe})
       },
    logout(){
        return  instance.delete(`auth/login`)
       }

}