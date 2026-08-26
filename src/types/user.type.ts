import { UserRole } from "@/enums/user.enums";

// export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
export interface UserInfo {
    id : string;
    name : string,
    email : string,
    role : UserRole
}