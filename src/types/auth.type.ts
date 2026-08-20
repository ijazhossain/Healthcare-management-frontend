// import {  UserRole, UserStatus } from "@/enums/user.enums";


// export interface ILoginResponse{
//     token:string;
//     accessToken:string;
//     refreshToken:string;
//     user:{
//         name:string;
//         email:string;
//         emailVerified:boolean;
//         image:string;
//         isDeleted:boolean;
//         role:UserRole;
//         status:UserStatus;
//         needPasswordChange:boolean;

//     }
// }
export interface ILoginResponse {
    token : string;
    accessToken : string;
    refreshToken : string;
    user : {
        needPasswordChange : boolean;
        email : string;
        name : string;
        role : string;
        image: string;
        status : string;
        isDeleted : boolean;
        emailVerified : boolean;
    }
}