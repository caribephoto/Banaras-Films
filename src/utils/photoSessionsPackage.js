// Professional Photo Session at Bavaro Beach — currently DR-only.
// Booking reference (external listing on Booking.com):
// https://www.booking.com/attractions/en-gb/prru7zya2zen-professional-photo-session-at-a-bavaro-beach.html

const photoSessions = [
  {
    id: 'photo-session-bavaro',
    title: 'Professional Photo Session at Bavaro Beach',
    // TODO: replace with a dedicated Bavaro Beach photo when available.
    img: '/img/slide-4.jpg',
    content: [
      'Up to 4 people included',
      'Professional Photographer',
      'Bottled water',
      '1 hour professional photoshoot',
      'Private transportation',
      '75 pictures with manual single-frame color correction in Lightroom',
    ],
    additionalInfo: [
      'Infants are required to sit on an adult’s lap',
      'Specialized infant seats are not available',
      'Suitable for all physical fitness levels',
      'Not wheelchair accessible',
      'You need to be 18 years or older to book',
    ],
    bookingUrl:
      'https://www.booking.com/attractions/en-gb/prru7zya2zen-professional-photo-session-at-a-bavaro-beach.en-gb.html',
    usdPrice: 450,
    paxIncluded: 4,
    countries: ['DO'],
    category: 'photo-session',
  },
];

export { photoSessions };
