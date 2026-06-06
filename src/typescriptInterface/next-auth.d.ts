

import  { DefaultSession } from "next-auth"
import build from "next/dist/build"

declare module "next-auth" {
    interface Session {
        user: {

            /** The user's postal address. */
            token: string
            address: string
        } & DefaultSession["user"]

    }


    interface User {
        token: string
    }

}



declare module "next-auth/jwt" {
  
    interface JWT {
        token: string,
      
        idToken?: string
    }
}