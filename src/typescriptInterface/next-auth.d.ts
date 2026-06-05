

import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {

            /** The user's postal address. */
            token: string
            address: string
        } & DefaultSession["user"]

    }

    //     interface User {
    //     token: string,
    //     email:string
    // }
    interface User {
        token: string
    }

}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        token: string,
        // email: string
        // name:string,
        idToken?: string
    }
}