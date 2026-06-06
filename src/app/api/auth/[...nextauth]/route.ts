import { jwtDecode } from "jwt-decode"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
         
            credentials: {
                email: { label: "email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials) {
        
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()
                if (data && data.message == 'success') {
                    const decodedToken:{id:string} = jwtDecode(data.token);
                    return {
                        id: decodedToken.id,
                        name: data.user.name,
                        role: data.user.role,
                        email: data.user.email,
                        token: data.token
                    }
                }else
                {
                    throw new Error(data.message || "Wrong Credintails")
                }
               
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                
                    token.token = user.token,
                    token.email = user.email
            }
            return token
        }
        ,
        async session({ session, token }) {
            if (token) {
                session.user.email = token.email
                session.user.token = token.token
                
            }
            return session

        }
    },
    pages:{
        signIn:('/login')
    }
})
export { handler as GET, handler as POST }
