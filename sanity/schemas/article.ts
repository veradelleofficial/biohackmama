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
      of: [{ type: 'block' }],
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
