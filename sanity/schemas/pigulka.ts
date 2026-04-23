export default {
  name: 'pigulka',
  title: 'Pigułka Wiedzy',
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
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sciezka',
      title: 'Ścieżka',
      type: 'string',
      options: {
        list: [
          { title: 'SOS: Przebodźcowanie', value: 'SOS: Przebodźcowanie' },
          { title: 'Energia Mimo Braku Snu', value: 'Energia Mimo Braku Snu' },
          { title: 'Paliwo: Odżywianie', value: 'Paliwo: Odżywianie' },
          { title: 'Sen i Regeneracja', value: 'Sen i Regeneracja' },
          { title: 'Hormony', value: 'Hormony' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Opis (1-2 zdania)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'duration',
      title: 'Czas trwania (minuty)',
      type: 'number',
    },
    {
      name: 'audioUrl',
      title: 'Link do audio (Transistor.fm / MP3)',
      type: 'url',
      description: 'Bezpośredni link do pliku audio lub odcinka podcastu.',
    },
    {
      name: 'videoUrl',
      title: 'Link do wideo (YouTube Unlisted)',
      type: 'url',
      description: 'Link do prywatnego/unlisted wideo na YouTube.',
    },
    {
      name: 'pdfUrl',
      title: 'Link do PDF (cheat sheet)',
      type: 'url',
      description: 'Link do jednostronicowego podsumowania w PDF.',
    },
    {
      name: 'isFree',
      title: 'Darmowy podgląd (widoczny bez subskrypcji)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
    },
    {
      name: 'order',
      title: 'Kolejność w ścieżce',
      type: 'number',
      description: 'Niższa liczba = wyżej na liście.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sciezka',
    },
  },
}
