import { WordEntry, EssentialWord } from "../types/dictionary";

export const mockEsameData: WordEntry = {
  id: "esame",
  word: "esame",
  ipa: "/eˈza.me/",
  parts: [
    {
      type: "اسم (Noun)",
      definitions: [
        {
          text: "آزمون، امتحان (برای سنجش دانش یا مهارت)",
          synonyms: ["prova", "test", "verifica"],
          antonyms: ["fallimento"],
          examples: [
            { italian: "Domani ho un esame di letteratura.", persian: "فردا یک امتحان ادبیات دارم." },
            { italian: "Ha superato l'esame con successo.", persian: "او امتحان را با موفقیت پشت سر گذاشت." }
          ]
        }
      ]
    }
  ],
  grammarNote: "اسم مذکر است. جمع آن به «esami» ختم می‌شود.",
  phrases: [
    { italian: "dare un esame", persian: "امتحان دادن" },
    { italian: "passare un esame", persian: "قبول شدن در امتحان" }
  ],
  nearbyWords: ["esalare", "esaltante", "esaltare", "esaminare"]
};

export const essentialWords: EssentialWord[] = [
  // Greetings & Essentials
  { italian: "Ciao", persian: "سلام / خداحافظ" },
  { italian: "Buongiorno", persian: "صبح بخیر" },
  { italian: "Buonasera", persian: "عصر بخیر" },
  { italian: "Buonanotte", persian: "شب بخیر" },
  { italian: "Grazie", persian: "ممنون" },
  { italian: "Prego", persian: "خواهش می‌کنم" },
  { italian: "Per favore", persian: "لطفا" },
  { italian: "Sì", persian: "بله" },
  { italian: "No", persian: "نه" },
  { italian: "Scusa", persian: "ببخشید" },
  // Pronouns
  { italian: "Io", persian: "من" },
  { italian: "Tu", persian: "تو" },
  { italian: "Lui", persian: "او (مذکر)" },
  { italian: "Lei", persian: "او (مونث) / شما (رسمی)" },
  { italian: "Noi", persian: "ما" },
  { italian: "Voi", persian: "شما (جمع)" },
  { italian: "Loro", persian: "آن‌ها" },
  { italian: "Mio", persian: "مال من" },
  { italian: "Tuo", persian: "مال تو" },
  { italian: "Questo", persian: "این" },
  // Essential Verbs
  { italian: "Essere", persian: "بودن" },
  { italian: "Avere", persian: "داشتن" },
  { italian: "Fare", persian: "انجام دادن / ساختن" },
  { italian: "Dire", persian: "گفتن" },
  { italian: "Potere", persian: "توانستن" },
  { italian: "Volere", persian: "خواستن" },
  { italian: "Sapere", persian: "دانستن (فکت)" },
  { italian: "Vedere", persian: "دیدن" },
  { italian: "Andare", persian: "رفتن" },
  { italian: "Venire", persian: "آمدن" },
  { italian: "Dare", persian: "دادن" },
  { italian: "Parlare", persian: "صحبت کردن" },
  { italian: "Trovare", persian: "پیدا کردن" },
  { italian: "Mangiare", persian: "خوردن" },
  { italian: "Bere", persian: "نوشیدن" },
  { italian: "Capire", persian: "فهمیدن" },
  { italian: "Pensare", persian: "فکر کردن" },
  { italian: "Prendere", persian: "گرفتن" },
  { italian: "Lavorare", persian: "کار کردن" },
  { italian: "Piacere", persian: "دوست داشتن" },
  // Question Words
  { italian: "Chi", persian: "چه کسی" },
  { italian: "Cosa", persian: "چه چیزی" },
  { italian: "Dove", persian: "کجا" },
  { italian: "Quando", persian: "چه زمانی" },
  { italian: "Perché", persian: "چرا / زیرا" },
  { italian: "Come", persian: "چگونه" },
  { italian: "Quanto", persian: "چقدر / چندتا" },
  { italian: "Quale", persian: "کدام" },
  // Time & Days
  { italian: "Oggi", persian: "امروز" },
  { italian: "Ieri", persian: "دیروز" },
  { italian: "Domani", persian: "فردا" },
  { italian: "Ora / Adesso", persian: "اکنون" },
  { italian: "Giorno", persian: "روز" },
  { italian: "Notte", persian: "شب" },
  { italian: "Mattina", persian: "صبح" },
  { italian: "Settimana", persian: "هفته" },
  { italian: "Mese", persian: "ماه" },
  { italian: "Anno", persian: "سال" },
  { italian: "Tempo", persian: "زمان / آب و هوا" },
  { italian: "Sempre", persian: "همیشه" },
  // Common Nouns
  { italian: "Uomo", persian: "مرد" },
  { italian: "Donna", persian: "زن" },
  { italian: "Ragazzo", persian: "پسر" },
  { italian: "Ragazza", persian: "دختر" },
  { italian: "Amico / Amica", persian: "دوست" },
  { italian: "Famiglia", persian: "خانواده" },
  { italian: "Casa", persian: "خانه" },
  { italian: "Acqua", persian: "آب" },
  { italian: "Cibo", persian: "غذا" },
  { italian: "Macchina", persian: "ماشین" },
  { italian: "Lavoro", persian: "کار / شغل" },
  { italian: "Soldi", persian: "پول" },
  { italian: "Libro", persian: "کتاب" },
  { italian: "Scuola", persian: "مدرسه" },
  { italian: "Città", persian: "شهر" },
  { italian: "Strada", persian: "خیابان / جاده" },
  { italian: "Mondo", persian: "جهان" },
  { italian: "Bagno", persian: "دستشویی" },
  { italian: "Treno", persian: "قطار" },
  { italian: "Biglietto", persian: "بلیط" },
  // Adjectives & Adverbs
  { italian: "Buono", persian: "خوب" },
  { italian: "Cattivo", persian: "بد" },
  { italian: "Grande", persian: "بزرگ" },
  { italian: "Piccolo", persian: "کوچک" },
  { italian: "Nuovo", persian: "جدید" },
  { italian: "Vecchio", persian: "قدیمی / پیر" },
  { italian: "Bello", persian: "زیبا" },
  { italian: "Brutto", persian: "زشت" },
  { italian: "Molto", persian: "خیلی / زیاد" },
  { italian: "Poco", persian: "کم" },
  { italian: "Tutto", persian: "همه" },
  { italian: "Niente", persian: "هیچ" },
  { italian: "Bene", persian: "خوب (به خوبی)" },
  { italian: "Male", persian: "بد (به بدی)" },
  { italian: "Qui / Qua", persian: "اینجا" },
  { italian: "Lì / Là", persian: "آنجا" },
  { italian: "Vicino", persian: "نزدیک" },
  { italian: "Lontano", persian: "دور" },
  { italian: "Facile", persian: "آسان" },
  { italian: "Difficile", persian: "سخت" }
];
