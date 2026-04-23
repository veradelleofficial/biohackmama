import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/premium',
    '/blog(.*)',
    '/kursy(.*)',
    '/ebooki(.*)',
    '/o-mnie',
    '/kontakt',
    '/narzedzia(.*)',
    '/regulamin',
    '/polityka-prywatnosci',
    '/szukaj',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/(.*)/.*',
    '/api/stripe/webhook',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
