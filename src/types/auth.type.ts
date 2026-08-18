import { UserRole, UserStatus } from "@/enums/user.enums";

export interface ILoginResponse{
    token:string;
    accessToken:string;
    refreshToken:string;
    user:{
        name:string;
        email:string;
        emailVerified:boolean;
        image:string;
        isDeleted:boolean;
        role:UserRole;
        status:UserStatus;
        needPasswordChange:boolean;

    }
}