import { Note, Exam, Article, Event } from '../types';

export const popularNotes: Note[] = [
  {
    id: 1,
    title: "Veri Yapıları ve Algoritmalar Ders Notları",
    subject: "Bilgisayar Bilimleri",
    author: "Ahmet Yılmaz",
    date: "2024-03-15",
    likes: 245,
    downloads: 178,
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop",
    university: "Boğaziçi Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    year: "2024",
    semester: "Bahar"
  },
  {
    id: 2,
    title: "Diferansiyel Denklemler Final Hazırlık Notları",
    subject: "Matematik",
    author: "Zeynep Kaya",
    date: "2024-03-14",
    likes: 312,
    downloads: 234,
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
    university: "ODTÜ",
    department: "Matematik",
    year: "2024",
    semester: "Bahar"
  },
  {
    id: 3,
    title: "Elektrik Devreleri Laboratuvar Notları",
    subject: "Elektrik-Elektronik",
    author: "Mehmet Demir",
    date: "2024-03-13",
    likes: 189,
    downloads: 145,
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&auto=format&fit=crop",
    university: "İTÜ",
    department: "Elektrik-Elektronik Mühendisliği",
    year: "2024",
    semester: "Bahar"
  },
  {
    id: 4,
    title: "İşletim Sistemleri Ders Özeti",
    subject: "Bilgisayar Bilimleri",
    author: "Can Öztürk",
    date: "2024-03-12",
    likes: 167,
    downloads: 123,
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop",
    university: "Hacettepe Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    year: "2024",
    semester: "Bahar"
  },
  {
    id: 5,
    title: "Organik Kimya Reaksiyon Mekanizmaları",
    subject: "Kimya",
    author: "Ayşe Yıldız",
    date: "2024-03-11",
    likes: 234,
    downloads: 178,
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
    university: "Koç Üniversitesi",
    department: "Kimya",
    year: "2024",
    semester: "Bahar"
  },
  {
    id: 6,
    title: "Makroiktisat Temel Kavramlar",
    subject: "İktisat",
    author: "Ali Şahin",
    date: "2024-03-10",
    likes: 156,
    downloads: 112,
    imageUrl: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&auto=format&fit=crop",
    university: "Bilkent Üniversitesi",
    department: "İktisat",
    year: "2024",
    semester: "Bahar"
  }
];

export const popularExams: Exam[] = [
  {
    id: 1,
    title: "Veri Yapıları ve Algoritmalar Final Sınavı",
    subject: "Veri Yapıları",
    professor: "Prof. Dr. Ahmet Yılmaz",
    term: "Bahar",
    year: "2024",
    likes: 156,
    downloads: 89,
    university: "Boğaziçi Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    questions: [
      {
        id: 1,
        text: "Aşağıdakilerden hangisi bir ikili ağacın dengeli olduğunu gösterir?",
        options: [
          "Her düğümün en fazla iki alt düğümü vardır",
          "Sol ve sağ alt ağaçların yükseklikleri arasındaki fark en fazla 1'dir",
          "Tüm yapraklar aynı seviyededir",
          "Ağaçtaki tüm düğümler sıralıdır"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        text: "Quicksort algoritmasının ortalama zaman karmaşıklığı nedir?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: "Diferansiyel Denklemler Vize Sınavı",
    subject: "Matematik",
    professor: "Doç. Dr. Zeynep Kaya",
    term: "Güz",
    year: "2023",
    likes: 234,
    downloads: 167,
    university: "ODTÜ",
    department: "Matematik",
    questions: [
      {
        id: 1,
        text: "Birinci dereceden diferansiyel denklemin genel çözümü nedir?",
        options: [
          "y = Ce^x",
          "y = x + C",
          "y = ln|x| + C",
          "y = sin(x) + C"
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 3,
    title: "Elektrik Devreleri Final Sınavı",
    subject: "Elektrik",
    professor: "Prof. Dr. Mehmet Demir",
    term: "Bahar",
    year: "2023",
    likes: 189,
    downloads: 145,
    university: "İTÜ",
    department: "Elektrik-Elektronik Mühendisliği",
    questions: [
      {
        id: 1,
        text: "RLC devresinde rezonans frekansı nasıl hesaplanır?",
        options: [
          "f = 1/(2π√LC)",
          "f = RC",
          "f = L/C",
          "f = 1/RC"
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 4,
    title: "İşletim Sistemleri Ara Sınav",
    subject: "Bilgisayar",
    professor: "Dr. Can Öztürk",
    term: "Güz",
    year: "2023",
    likes: 145,
    downloads: 98,
    university: "Hacettepe Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    questions: [
      {
        id: 1,
        text: "Hangi process scheduling algoritması en kısa işlem süresine sahip processi önceliklendirir?",
        options: [
          "Round Robin",
          "First Come First Serve",
          "Shortest Job First",
          "Priority Scheduling"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 5,
    title: "Organik Kimya Final Sınavı",
    subject: "Kimya",
    professor: "Prof. Dr. Ayşe Yıldız",
    term: "Bahar",
    year: "2023",
    likes: 178,
    downloads: 134,
    university: "Koç Üniversitesi",
    department: "Kimya",
    questions: [
      {
        id: 1,
        text: "Alkanların genel formülü nedir?",
        options: [
          "CnH2n",
          "CnH2n+2",
          "CnH2n-2",
          "CnHn"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 6,
    title: "Makroiktisat Vize Sınavı",
    subject: "İktisat",
    professor: "Doç. Dr. Ali Şahin",
    term: "Güz",
    year: "2023",
    likes: 167,
    downloads: 123,
    university: "Bilkent Üniversitesi",
    department: "İktisat",
    questions: [
      {
        id: 1,
        text: "GSYH'yi hesaplamak için kullanılan yaklaşımlardan hangisi harcama yaklaşımıdır?",
        options: [
          "C + I + G + (X-M)",
          "Ücretler + Kiralar + Faizler + Karlar",
          "Toplam Üretim - Ara Malı Kullanımı",
          "Tarım + Sanayi + Hizmetler"
        ],
        correctAnswer: 0
      }
    ]
  }
];

export const popularArticles: Article[] = [
  {
    id: 1,
    title: "Yapay Zeka ve Eğitimde Dönüşüm",
    author: "Dr. Ahmet Yılmaz",
    date: "2024-03-15",
    likes: 245,
    downloads: 178,
    content: "# Yapay Zeka ve Eğitimde Dönüşüm\n\nBu makale, yapay zeka teknolojilerinin eğitim alanında yarattığı dönüşümü incelemektedir...",
    tags: ["Yapay Zeka", "Eğitim Teknolojileri", "Dijital Dönüşüm"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
    university: "Boğaziçi Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    abstract: "Bu çalışma, yapay zeka teknolojilerinin eğitim sistemlerinde yarattığı dönüşümü ve gelecekteki potansiyel etkilerini incelemektedir.",
    isFavorite: false
  },
  {
    id: 2,
    title: "Sürdürülebilir Enerji Sistemleri",
    author: "Prof. Dr. Zeynep Kaya",
    date: "2024-03-14",
    likes: 312,
    downloads: 234,
    content: "# Sürdürülebilir Enerji Sistemleri\n\nYenilenebilir enerji kaynaklarının sürdürülebilir kalkınmadaki rolü...",
    tags: ["Yenilenebilir Enerji", "Sürdürülebilirlik", "Çevre"],
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop",
    university: "ODTÜ",
    department: "Enerji Sistemleri Mühendisliği",
    abstract: "Bu araştırma, sürdürülebilir enerji sistemlerinin geliştirilmesi ve uygulanmasında karşılaşılan zorlukları ve fırsatları analiz etmektedir.",
    isFavorite: false
  },
  {
    id: 3,
    title: "Kuantum Hesaplama ve Kriptografi",
    author: "Dr. Mehmet Demir",
    date: "2024-03-13",
    likes: 189,
    downloads: 145,
    content: "# Kuantum Hesaplama ve Kriptografi\n\nKuantum bilgisayarların kriptografik sistemler üzerindeki potansiyel etkileri...",
    tags: ["Kuantum Bilgisayarlar", "Kriptografi", "Siber Güvenlik"],
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    university: "İTÜ",
    department: "Matematik Mühendisliği",
    abstract: "Kuantum hesaplama teknolojilerinin gelişimi ile birlikte mevcut kriptografik sistemlerin güvenliği yeniden değerlendirilmektedir.",
    isFavorite: false
  },
  {
    id: 4,
    title: "Nöral Ağlar ve Derin Öğrenme",
    author: "Doç. Dr. Can Öztürk",
    date: "2024-03-12",
    likes: 267,
    downloads: 198,
    content: "# Nöral Ağlar ve Derin Öğrenme\n\nDerin öğrenme algoritmalarının görüntü işleme uygulamalarındaki başarısı...",
    tags: ["Derin Öğrenme", "Yapay Zeka", "Görüntü İşleme"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
    university: "Hacettepe Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    abstract: "Bu çalışma, derin öğrenme algoritmalarının görüntü işleme alanındaki uygulamalarını ve elde edilen sonuçları incelemektedir.",
    isFavorite: false
  },
  {
    id: 5,
    title: "İklim Değişikliği ve Biyoçeşitlilik",
    author: "Prof. Dr. Ayşe Yıldız",
    date: "2024-03-11",
    likes: 234,
    downloads: 178,
    content: "# İklim Değişikliği ve Biyoçeşitlilik\n\nKüresel ısınmanın ekosistemler üzerindeki etkileri...",
    tags: ["İklim Değişikliği", "Biyoçeşitlilik", "Ekoloji"],
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop",
    university: "Koç Üniversitesi",
    department: "Çevre Bilimleri",
    abstract: "İklim değişikliğinin biyoçeşitlilik üzerindeki etkileri ve alınabilecek önlemler bu makalede detaylı olarak incelenmektedir.",
    isFavorite: false
  },
  {
    id: 6,
    title: "Blok Zinciri ve Finans",
    author: "Dr. Ali Şahin",
    date: "2024-03-10",
    likes: 156,
    downloads: 112,
    content: "# Blok Zinciri ve Finans\n\nBlok zinciri teknolojisinin finansal sistemlere entegrasyonu...",
    tags: ["Blok Zinciri", "Finans", "Kripto Para"],
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop",
    university: "Bilkent Üniversitesi",
    department: "İşletme",
    abstract: "Blok zinciri teknolojisinin finansal sistemlere entegrasyonu ve yaratacağı potansiyel değişimler ele alınmaktadır.",
    isFavorite: false
  }
];

export const events: Event[] = [
  {
    id: 1,
    title: "Yapay Zeka ve Gelecek Konferansı",
    description: "Yapay zeka teknolojilerinin geleceği ve toplum üzerindeki etkileri hakkında uzman konuşmacıların katılacağı konferans.",
    startDate: "2024-04-15T10:00:00",
    endDate: "2024-04-15T17:00:00",
    location: "Ana Konferans Salonu",
    organizer: "Bilgisayar Mühendisliği Kulübü",
    university: "Boğaziçi Üniversitesi",
    department: "Bilgisayar Mühendisliği",
    type: "academic",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
    registrationUrl: "https://example.com/register",
    isOnline: false,
    isFeatured: true
  },
  {
    id: 2,
    title: "Kariyer Günleri 2024",
    description: "Teknoloji sektöründen önde gelen şirketlerin katılımıyla gerçekleşecek kariyer ve staj fırsatları etkinliği.",
    startDate: "2024-04-20T09:00:00",
    endDate: "2024-04-21T18:00:00",
    location: "Merkez Kampüs",
    organizer: "Kariyer Merkezi",
    university: "ODTÜ",
    type: "career",
    imageUrl: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=800&auto=format&fit=crop",
    registrationUrl: "https://example.com/register",
    isOnline: false,
    isFeatured: true
  },
  {
    id: 3,
    title: "Online Matematik Semineri",
    description: "Modern matematik teorileri ve uygulamaları üzerine çevrimiçi seminer serisi.",
    startDate: "2024-04-25T14:00:00",
    endDate: "2024-04-25T16:00:00",
    location: "Zoom",
    organizer: "Matematik Bölümü",
    university: "İTÜ",
    department: "Matematik",
    type: "academic",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    registrationUrl: "https://example.com/register",
    isOnline: true,
    isFeatured: false
  },
  {
    id: 4,
    title: "Bahar Şenliği 2024",
    description: "Geleneksel bahar şenliği kapsamında konserler, yarışmalar ve çeşitli aktiviteler.",
    startDate: "2024-05-01T10:00:00",
    endDate: "2024-05-03T22:00:00",
    location: "Kampüs Festival Alanı",
    organizer: "Öğrenci Konseyi",
    university: "Hacettepe Üniversitesi",
    type: "social",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop",
    registrationUrl: null,
    isOnline: false,
    isFeatured: true
  },
  {
    id: 5,
    title: "Girişimcilik Zirvesi",
    description: "Başarılı girişimciler ve yatırımcılarla buluşma fırsatı sunan girişimcilik zirvesi.",
    startDate: "2024-05-10T09:00:00",
    endDate: "2024-05-10T18:00:00",
    location: "İşletme Fakültesi Konferans Salonu",
    organizer: "Girişimcilik Kulübü",
    university: "Koç Üniversitesi",
    department: "İşletme",
    type: "career",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop",
    registrationUrl: "https://example.com/register",
    isOnline: false,
    isFeatured: false
  },
  {
    id: 6,
    title: "Sürdürülebilirlik Çalıştayı",
    description: "Çevre sorunları ve sürdürülebilir çözümler üzerine interaktif çalıştay.",
    startDate: "2024-05-15T13:00:00",
    endDate: "2024-05-15T17:00:00",
    location: "Çevrimiçi Platform",
    organizer: "Çevre Mühendisliği Bölümü",
    university: "Bilkent Üniversitesi",
    department: "Çevre Mühendisliği",
    type: "academic",
    imageUrl: "https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?w=800&auto=format&fit=crop",
    registrationUrl: "https://example.com/register",
    isOnline: true,
    isFeatured: false
  }
];