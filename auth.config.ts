import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/portal-access',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // No protected routes after dashboard removal
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
