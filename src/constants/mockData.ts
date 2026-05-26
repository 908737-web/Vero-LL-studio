/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardCategory, FlashcardData, Gender } from '../types';

export const MOCK_FLASHCARDS: FlashcardData[] = [
  {
    id: '1',
    word_it: 'Libro',
    article: 'il',
    gender: Gender.MASCULINE,
    phonetic: '[il ˈli.bro]',
    translation_fa: 'کتاب',
    translation_en: 'book',
    category: CardCategory.NOUN,
    level: 'A1',
    media_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    audio_url: '#',
    gender_info_fa: 'اسم مذکر',
    tags: ['Basic', 'Objects', 'Essential'],
    examples: [
      { it: 'Leggo un libro ogni settimana.', en: 'I read a book every week.', fa: 'من هر هفته یک کتاب می‌خوانم.' },
      { it: 'Questo libro è molto interessante.', en: 'This book is very interesting.', fa: 'این کتاب خیلی جالب است.' }
    ],
    story_it: 'C\'era un vecchio libro in biblioteca. Marco lo ha aperto e ha trovato una mappa. La mappa portava a un tesoro nascosto.',
    story_fa: 'یک کتاب قدیمی در کتابخانه بود. مارکو آن را باز کرد و نقشه‌ای پیدا کرد. نقشه به یک گنج پنهان ختم می‌شد.',
    dialogs: [
      { sender: 'user', it: 'Hai visto il mio libro?', fa: 'کتاب من را دیدی؟' },
      { sender: 'ai', it: 'Sì, è sul tavolo in cucina.', fa: 'بله، روی میز در آشپزخانه است.' }
    ],
    synonyms: ['volume', 'opera'],
    antonyms: []
  },
  {
    id: '2',
    word_it: 'Mela',
    article: 'la',
    gender: Gender.FEMININE,
    phonetic: '[la ˈmela]',
    translation_fa: 'سیب',
    translation_en: 'apple',
    category: CardCategory.NOUN,
    level: 'A1',
    media_url: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80',
    audio_url: '#',
    gender_info_fa: 'اسم مؤنث',
    tags: ['Food', 'Fruit', 'Basic'],
    examples: [
      { it: 'Mangio una mela rossa.', en: 'I eat a red apple.', fa: 'من یک سیب قرمز می‌خورم.' }
    ],
    story_it: 'La mela è un frutto salutare. Contiene molte vitamine. Gli esperti dicono che una mela al giorno toglie il medico di torno.',
    story_fa: 'سیب یک میوه سالم است. ویتامین‌های زیادی دارد. متخصصان می‌گویند خوردن یک سیب در روز شما را از پزشک بی‌نیاز می‌کند.',
    dialogs: [
      { sender: 'user', it: 'Vuoi una mela?', fa: 'سیب می‌خواهی؟' },
      { sender: 'ai', it: 'No grazie, preferisco una pera.', fa: 'نه ممنون، گلابی را ترجیح می‌دهم.' }
    ],
    synonyms: [],
    antonyms: []
  },
  {
    id: '3',
    word_it: 'Bellissimo',
    phonetic: '[belˈlis.si.mo]',
    translation_fa: 'بسیار زیبا',
    translation_en: 'wonderful',
    category: CardCategory.ADJECTIVE,
    level: 'A1',
    media_url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=400&q=80',
    audio_url: '#',
    declensions: [
      { label: 'MS', value: 'Bellissimo' },
      { label: 'FS', value: 'Bellissima' },
      { label: 'MP', value: 'Bellissimi' },
      { label: 'FP', value: 'Bellissime' }
    ],
    tags: ['Description', 'Common', 'Intense'],
    examples: [
      { it: 'Venezia è un posto bellissimo.', en: 'Venice is a very beautiful place.', fa: 'ونیز مکانی بسیار زیباست.' }
    ],
    story_it: 'Oggi il tempo è bellissimo. Il sole splende e l\'aria è fresca. Andiamo a fare una passeggiata nel parco?',
    story_fa: 'امروز هوا عالی است. خورشید می‌درخشد و هوا تازه است. برویم در پارک قدم بزنیم؟',
    dialogs: [
      { sender: 'user', it: 'Ti piace questo vestito?', fa: 'این لباس را دوست داری؟' },
      { sender: 'ai', it: 'Sì, è bellissimo! Ti sta molto bene.', fa: 'بله، خیلی زیباست! خیلی بهت میاد.' }
    ],
    synonyms: ['stupendo', 'meraviglioso'],
    antonyms: ['bruttissimo', 'orribile']
  }
];
