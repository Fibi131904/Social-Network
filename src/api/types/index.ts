import { UserType } from "../../redux/users-reducer"

export enum ResultCodesEnum {
Success= 0,
Error= 1,
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
  }

export enum ResultCodeForCaptchaEnum {
CaptchaIsRequired=10
}

export type MeResponseType = {
    data:{id:number, email: string, login:string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export type LoginResponseType = {
    data:{userId:number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}