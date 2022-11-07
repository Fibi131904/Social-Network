import { AxiosResponse } from "axios";
import { UserType } from "../redux/users-reducer";
import { apiConfig } from "./apiConfig";
import { GetItemsType } from "./types";


export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number,term: string = '', friend: null | boolean = null) {
        const response = await apiConfig.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
        return response.data;
    },
    follow(userId: number) {
        return apiConfig.post<'', AxiosResponse<UserType>>(`follow/${userId}`)
       
    },
    unfollow(userId: number) {
        return apiConfig.delete<'', AxiosResponse<UserType>>(`follow/${userId}`)
    },
}