import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/sign-in/',
          '/sign-up/',
          '/studio/',
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://biohackmama.pl/sitemap.xml',
    host: 'https://biohackmama.pl',
  }
}
