export default {
  name: 'category',
  title: 'Kategoria',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nazwa',
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
    },
  ],
}
