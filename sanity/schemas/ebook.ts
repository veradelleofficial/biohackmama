export default {
  name: 'ebook',
  title: 'Ebook',
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
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 4,
    },
    {
      name: 'price',
      title: 'Cena (zł)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'pages',
      title: 'Liczba stron',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Okładka',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Zawartość',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'benefits',
      title: 'Korzyści',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'downloadUrl',
      title: 'Link do pobrania',
      type: 'url',
    },
    {
      name: 'createdAt',
      title: 'Data utworzenia',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
