export default {
  name: 'article',
  title: 'Artykuł',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Streszczenie',
      type: 'text',
      rows: 3,
    },
    {
      name: 'content',
      title: 'Zawartość',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object',
          name: 'callout',
          title: 'Ramka (callout)',
          fields: [
            {
              name: 'variant',
              title: 'Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'Pro-tip', value: 'protip' },
                  { title: 'Ostrzeżenie', value: 'warning' },
                  { title: 'Badanie', value: 'research' },
                  { title: 'Info', value: 'info' },
                  { title: 'Ciekawostka', value: 'fact' },
                ],
              },
            },
            { name: 'title', title: 'Tytuł ramki', type: 'string' },
            { name: 'body', title: 'Treść', type: 'text', rows: 4 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'variant' },
          },
        },
        {
          type: 'object',
          name: 'pullQuote',
          title: 'Cytat wyróżniony',
          fields: [
            { name: 'text', title: 'Cytat', type: 'text', rows: 2 },
            { name: 'attribution', title: 'Autor cytatu', type: 'string' },
          ],
          preview: {
            select: { title: 'text', subtitle: 'attribution' },
          },
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Obraz wierzchołka',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Subkategoria',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Wybierz subkategorię – pilar zostanie przypisany automatycznie',
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
    },
    {
      name: 'readTime',
      title: 'Czas czytania (minuty)',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
}
