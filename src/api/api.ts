import axios from "axios";
import { follow, unfollow } from "../redux/users-reducer";


const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '462c63fe-6366-487f-a694-53e99'
        }
    }
);

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(userId:number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId:number) {
        return instance.delete(`follow/${userId}`)
    },
    getUserProfile( userId:number){
        return   instance.get(`profile/`+ userId)
          
       }
}
    

export const authAPI= {
    me(){
        return  instance.get(`auth/me`)
       },
}