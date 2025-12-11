import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/portal-access',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/studio-admin');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Redirect logged-in users away from login page
                if (nextUrl.pathname === '/portal-access') {
                    return Response.redirect(new URL('/studio-admin', nextUrl));
                }
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
