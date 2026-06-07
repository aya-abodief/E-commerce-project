
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
const cookiesStore=await cookies();
   const decodedToken=cookiesStore.get("next-auth.session-token")?.value ||
   cookiesStore.get("__Secure-next-auth.session-token")?.value
   if(!decodedToken)  {
        throw new Error(" you must Logged in to do this action")
    }
const token = await decode({token:decodedToken , secret:process.env.NEXTAUTH_SECRET!})
console.log(token)

return token?.token as string
}