export default {
  name: 'course',
  title: 'Kurs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nazwa kursu',
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
      name: 'level',
      title: 'Poziom',
      type: 'string',
      options: {
        list: [
          { title: 'Początkujący', value: 'Początkujący' },
          { title: 'Średniozaawansowany', value: 'Średniozaawansowany' },
          { title: 'Zaawansowany', value: 'Zaawansowany' },
        ],
      },
    },
    {
      name: 'duration',
      title: 'Czas trwania',
      type: 'string',
      placeholder: 'np. 8 tygodni',
    },
    {
      name: 'lessons',
      title: 'Liczba lekcji',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Ocena (1-5)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'reviews',
      title: 'Liczba opinii',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Obraz kursu',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'curriculum',
      title: 'Program kursu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Nazwa modułu',
              type: 'string',
            },
            {
              name: 'lessons',
              title: 'Lekcje',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Tytuł lekcji',
                      type: 'string',
                    },
                    {
                      name: 'duration',
                      title: 'Czas trwania',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'courseUrl',
      title: 'Link do kursu (Notion)',
      type: 'url',
      description: 'Link do strony Notion z treścią kursu. Widoczny tylko po zakupie.',
    },
    {
      name: 'content',
      title: 'Zawartość',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
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
