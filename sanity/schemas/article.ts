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
        {
          type: 'object',
          name: 'inlineLink',
          title: 'Link wyróżniony (Doświadcz też / Dowiedz się)',
          fields: [
            {
              name: 'label',
              title: 'Etykieta',
              type: 'string',
              options: {
                list: [
                  { title: 'Doświadcz też', value: 'doswiadcz' },
                  { title: 'Dowiedz się też', value: 'dowiedz' },
                  { title: 'Sprawdź też', value: 'sprawdz' },
                  { title: 'Przeczytaj też', value: 'przeczytaj' },
                  { title: 'Zobacz też', value: 'zobacz' },
                ],
              },
            },
            { name: 'title', title: 'Tytuł linku', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'url', title: 'URL (artykuł, ebook, Instagram...)', type: 'url', validation: (Rule: any) => Rule.required() },
            {
              name: 'type',
              title: 'Typ',
              type: 'string',
              options: {
                list: [
                  { title: 'Artykuł', value: 'article' },
                  { title: 'Ebook', value: 'ebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Zewnętrzny', value: 'external' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'label' },
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
      name: 'tags',
      title: 'Tagi tematyczne',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Ziołolecznictwo', value: 'ziololecznictwo' },
          { title: 'Naturopatia', value: 'naturopatia' },
          { title: 'Medycyna Chińska', value: 'medycyna-chinska' },
          { title: 'Biohacking', value: 'biohacking' },
          { title: 'Longevity', value: 'longevity' },
          { title: 'Biochemia', value: 'biochemia' },
          { title: 'Nootropiki', value: 'nootropiki' },
          { title: 'Hormony', value: 'hormony' },
          { title: 'Cykl i Kobiecość', value: 'cykl-i-kobiecosc' },
          { title: 'Rytm Dobowy', value: 'rytm-dobowy' },
          { title: 'Sen', value: 'sen' },
          { title: 'Post Przerywany', value: 'post-przerywany' },
          { title: 'Odżywianie', value: 'odzywianie' },
          { title: 'Suplementacja', value: 'suplementacja' },
          { title: 'Detoks i Dom', value: 'detoks-i-dom' },
          { title: 'Mental Wellness', value: 'mental-wellness' },
          { title: 'Stres i Kortyzol', value: 'stres-i-kortyzol' },
        ],
      },
      description: 'Wybierz kilka tagów (multi-select) — pomagają w wyszukiwaniu i tworzą strony tematyczne',
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
