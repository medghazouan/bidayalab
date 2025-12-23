import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongoose"
import Admin from "@/models/Admin"
import { rateLimit } from "@/lib/rate-limit"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data

                    // Rate Limiting (Brute Force Protection)
                    // In-memory rate limiting to prevent spamming attempts on an account
                    if (!rateLimit({ ip: email, limit: 5, windowMs: 60 * 1000 })) {
                        throw new Error("Too many login attempts. Please try again later.");
                    }

                    await connectToDatabase();
                    const user = await Admin.findOne({ email });

                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

                    if (passwordsMatch) {
                        return {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        }
                    }
                }

                return null
            },
        }),
    ],
    pages: {
        signIn: "/admin",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")

            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === "/admin") {
                return Response.redirect(new URL("/dashboard", nextUrl))
            }

            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role as string
            }
            return session
        },
    },
})
