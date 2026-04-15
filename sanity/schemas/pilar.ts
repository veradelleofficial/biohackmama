export default {
  name: 'pilar',
  title: 'Pilar SEO',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nazwa pilara',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Opis (widoczny na stronie)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'metaTitle',
      title: 'Meta title (SEO)',
      type: 'string',
    },
    {
      name: 'metaDescription',
      title: 'Meta description (SEO)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'order',
      title: 'Kolejność',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
}
