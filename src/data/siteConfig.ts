export const brand = {
  name: 'Atelier Lumière', descriptor: 'Events, with feeling.', location: 'New York · Available worldwide',
  email: 'bonjour@atelierlumiere.events', instagram: 'https://instagram.com/',
  inquiryLabel: 'Begin a conversation',
}

export const copy = {
  heroEyebrow: 'New York · Everywhere', heroTitle: 'Gather beautifully', heroDescription: 'Thoughtful celebrations, made to feel like yours.',
  introEyebrow: 'A little more than a party', introTitleFirst: 'Good things happen', introTitleSecond: 'when people gather.', introBody: 'We create soulful celebrations with a point of view, a generous spirit, and a lovely sense of ease.',
  servicesEyebrow: 'Made for your kind of magic', servicesTitleFirst: 'What are we', servicesTitleSecond: 'celebrating?', servicesBody: 'From the grand occasion to the gathering just because, every celebration begins with a feeling.',
  processEyebrow: 'Thoughtfully, all the way through', processTitleFirst: 'Room for the', processTitleSecond: 'unexpected.',
  portfolioEyebrow: 'Gathered with intention', portfolioTitleFirst: 'Little windows', portfolioTitleSecond: 'into our world.', portfolioBody: "Every event is its own universe. Here are a few we've had the joy of creating.",
  storiesEyebrow: 'The loveliest part', inquiryEyebrow: 'Your turn, your story', inquiryTitleFirst: 'Something', inquiryTitleSecond: 'beautiful starts', inquiryTitleThird: 'with hello.',
  inquirySubmit: 'Begin a conversation', footerNote: 'Made of moments, meant to last.',
}

export const navigation = [
  { label: 'Services', href: '#services' }, { label: 'Portfolio', href: '#portfolio' },
  { label: 'Our approach', href: '#approach' }, { label: 'Kind words', href: '#stories' },
]

export const services = [
  { id: 'weddings', title: 'Bespoke weddings', subtitle: 'A day that feels like only you.', deliverables: 'Creative direction · Full planning · Destination celebrations', image: 'photo-1519741497674-611481863552', alt: 'Romantic outdoor wedding ceremony surrounded by florals' },
  { id: 'birthdays', title: 'Milestone birthdays', subtitle: 'A new chapter, beautifully marked.', deliverables: 'Concept & styling · Guest experience · Full production', image: 'photo-1511795409834-ef04bbd61622', alt: 'Elegant dinner celebration with candlelight and flowers' },
  { id: 'soirees', title: 'Private soirées', subtitle: 'The art of bringing everyone in.', deliverables: 'Intimate dinners · At-home gatherings · Seasonal fêtes', image: 'photo-1519167758481-83f550bb49b3', alt: 'Warmly lit private dinner reception' },
  { id: 'corporate', title: 'Corporate galas', subtitle: 'A room full of possibility.', deliverables: 'Brand-led events · Galas · Leadership retreats', image: 'photo-1464366400600-7168b8af9bc3', alt: 'Gala table setting with glassware and golden light' },
]

export const process = [
  { number: '01', title: 'Vision & concept', copy: 'We begin with the feeling. Your people, your story, the little details you want to remember. From there, a singular creative direction takes shape.', note: 'Listen closely. Imagine freely.' },
  { number: '02', title: 'Curation & design', copy: 'A thoughtful world, built piece by piece. We bring together spaces, flowers, textures, menus and makers into one expressive point of view.', note: 'Every detail belongs.' },
  { number: '03', title: 'Production & logistics', copy: 'Behind the beauty, a quietly precise plan. Our trusted team handles the moving parts, the timing and every thoughtful contingency.', note: 'Considered, down to the last hour.' },
  { number: '04', title: 'The celebration', copy: 'Then the plans fall away, and the feeling takes over. We are there, tending to every last detail, so you can be fully in the moment.', note: 'All that remains is the joy.' },
]

export type EventCategory = 'Weddings' | 'Birthdays' | 'Corporate' | 'Soirées'
export type PortfolioItem = { id: number; title: string; category: EventCategory; location: string; guests: string; theme: string; image: string; alt: string; size: 'tall' | 'wide' | 'square' }
export const portfolio: PortfolioItem[] = [
  { id: 1, title: 'A garden in September', category: 'Weddings', location: 'Hudson Valley, New York', guests: '148 guests', theme: 'Sculptural garden · Candlelit supper', image: 'photo-1519741497674-611481863552', alt: 'Garden ceremony framed by white flowers', size: 'tall' },
  { id: 2, title: 'The golden hour club', category: 'Birthdays', location: 'Montauk, New York', guests: '62 guests', theme: 'Sun-washed coastal dinner', image: 'photo-1511795409834-ef04bbd61622', alt: 'Golden candlelit table dressed for a special dinner', size: 'wide' },
  { id: 3, title: 'An evening in bloom', category: 'Soirées', location: 'Brooklyn, New York', guests: '36 guests', theme: 'Wild botanicals · At-home gathering', image: 'photo-1519167758481-83f550bb49b3', alt: 'Candlelit private dining room filled with flowers', size: 'square' },
  { id: 4, title: 'The art of gathering', category: 'Corporate', location: 'New York City', guests: '220 guests', theme: 'Modern heritage · Black tie', image: 'photo-1464366400600-7168b8af9bc3', alt: 'Elegant gala table with white blooms and gold accents', size: 'tall' },
  { id: 5, title: 'Where the wild roses grow', category: 'Weddings', location: 'Catskills, New York', guests: '94 guests', theme: 'Romantic meadow · Long-table feast', image: 'photo-1464366400600-7168b8af9bc3', alt: 'Outdoor wedding dinner in warm late light', size: 'wide' },
  { id: 6, title: 'Forty, in full color', category: 'Birthdays', location: 'Manhattan, New York', guests: '80 guests', theme: 'Modern maximalism · Champagne tower', image: 'photo-1519167758481-83f550bb49b3', alt: 'Festive and refined private celebration', size: 'square' },
]

export const testimonials = [
  { quote: 'It felt like our story, told back to us in the most beautiful way. And somehow, we got to enjoy every single second of it.', name: 'Sophie & James', event: 'A September wedding in the Hudson Valley', image: 'photo-1519741497674-611481863552', alt: 'Couple celebrating beneath a floral arch' },
  { quote: 'There was a moment when I looked around the table and thought: this is exactly what I hoped it would feel like.', name: 'Camille R.', event: 'A fortieth birthday, in full bloom', image: 'photo-1511795409834-ef04bbd61622', alt: 'Intimate birthday dinner in candlelight' },
]

export const imageUrl = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
