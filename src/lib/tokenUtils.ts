"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";
const getTokenSecondsRemaining = (token: string): number => {
  if (!token) {
    return 0;
  }
  try {
    const tokenPayload = jwt.decode(token) as JwtPayload;
    if (tokenPayload && !tokenPayload.exp) {
      return 0;
    }
    const remainingSeconds =
      (tokenPayload.exp as number) - Math.floor(Date.now() / 1000);
    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
export const setTokenCookies=(name:string,token:string,fallBackMaxAgeInSeconds=60*60*24)=>{
let maxAgeInSeconds;
if(name!=="better-auth.session_token"){
    maxAgeInSeconds=getTokenSecondsRemaining(token);
}
setCookie(name,token,maxAgeInSeconds || fallBackMaxAgeInSeconds);
}
export  const isTokenExpiringSoon=(token:string,thresholdInSeconds=300):boolean=>{
    const remainingSeconds=getTokenSecondsRemaining(token);
    return remainingSeconds>0 && remainingSeconds<=thresholdInSeconds;
}
export const isTokenExpired= (token:string):boolean=>{
    const remainingSeconds=getTokenSecondsRemaining(token);
    return remainingSeconds===0;
}