import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/blog(.*)',
    '/kursy(.*)',
    '/ebooki(.*)',
    '/o-mnie',
    '/kontakt',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhook(.*)',
    '/studio(.*)',
    '/polityka-prywatnosci',
    '/regulamin',
  ],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
