
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
const cookiesStore=await cookies();
   const decodedToken=cookiesStore.get("next-auth.session-token")?.value ||
   cookiesStore.get("__Secure-next-auth.session-token")?.value
  
const token = await decode({token:decodedToken , secret:process.env.AUTH_SECRET!})
console.log(token)

return token?.token as string
}