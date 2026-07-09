/* =============================================================================
 *  📝 ملف محتوى الموقع — عدّل كل معلومات الموقع من هنا مباشرةً
 *  Site content file — edit ALL website information directly here.
 *
 *  كيف تعدّل؟ / How to edit:
 *  - كل نص له نسختان: عربي `ar` وإنكليزي `en`.
 *  - الصور: ضع الملف داخل مجلد  frontend/public  ثم اكتب مساره هنا،
 *    مثال: ملف  public/projects/villa-1.jpg  يُكتب  '/projects/villa-1.jpg'
 *    (يمكن أيضاً وضع رابط صورة خارجي يبدأ بـ https://)
 *  - لإضافة مشروع/خدمة/إحصائية: انسخ عنصراً موجوداً { ... } والصقه وعدّله،
 *    مع الانتباه لجعل `id` مختلفاً عن البقية.
 *  - بعد أي تعديل: احفظ الملف وارفعه إلى GitHub وسيُحدَّث الموقع تلقائياً.
 * ============================================================================= */

const content = {
  /* ---------------------------------------------------------------------------
   * معلومات الموقع العامة (الاسم، الهاتف، البريد، العنوان...)
   * ------------------------------------------------------------------------- */
  site: {
    name: { ar: 'RAMADAN', en: 'RAMADAN' },
    tagline: {
      ar: 'هندسة • استشارات • إكساء • تجهيز معامل',
      en: 'Engineering • Consulting • Finishing • Plant Fit-out',
    },
    logo: '/logo.svg',
    phone: '+963 998 556 619',
    // رقم الواتساب بالصيغة الدولية بدون + أو فراغات
    whatsapp: '963998556619',
    email: 'info@ramadan-eng.com',
    address: { ar: 'دمشق — الميدان', en: 'Damascus — Al-Midan' },
    workingHours: {
      ar: 'السبت – الخميس: 9 صباحاً – 5 مساءً',
      en: 'Sat – Thu: 9 AM – 5 PM',
    },
    // روابط التواصل الاجتماعي — اتركها فارغة '' لإخفائها
    social: { facebook: '', instagram: '', linkedin: '', x: '' },
  },

  /* ---------------------------------------------------------------------------
   * القسم الرئيسي في الصفحة الأولى (Hero)
   * ------------------------------------------------------------------------- */
  hero: {
    badge: { ar: 'منذ عام 1990', en: 'Since 1990' },
    title: {
      ar: 'نبني الثقة ونُصمّم المستقبل',
      en: 'We Build Trust and Design the Future',
    },
    subtitle: {
      ar: 'أكثر من ثلاثة عقود من الخبرة في الهندسة والاستشارات والإكساء وتجهيز المعامل، نحوّل أفكارك إلى مشاريع متكاملة بجودة عالية ولمسة عصرية.',
      en: 'Over three decades of experience in engineering, consulting, finishing and plant fit-out — turning your ideas into integrated, high-quality projects with a modern touch.',
    },
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    ctaPrimary: { ar: 'تصفّح أعمالنا', en: 'View Our Work' },
    ctaSecondary: { ar: 'تواصل معنا', en: 'Contact Us' },
  },

  /* ---------------------------------------------------------------------------
   * صفحة "من نحن"
   * ------------------------------------------------------------------------- */
  about: {
    title: { ar: 'من نحن', en: 'About Us' },
    lead: {
      ar: 'خبرة تتجاوز ثلاثة عقود في الهندسة والإبداع',
      en: 'Over three decades of engineering expertise and creativity',
    },
    body: {
      ar: 'تأسس مكتب RAMADAN الهندسي عام 1990 ليكون شريكاً موثوقاً في بناء وتصميم المشاريع. على مدى أكثر من ثلاثين عاماً، راكمنا خبرة واسعة في التصميم المعماري والإنشائي، الاستشارات والإشراف الهندسي، وأعمال الإكساء والديكور الداخلي والخارجي، إضافةً إلى تجهيز المعامل والمنشآت الصناعية. يقوم عملنا على كادر متكامل ومتخصص يجمع بين الخبرة والدقة، ورؤيتنا أن نقدّم حلولاً هندسية عملية وجمالية تواكب أحدث المعايير وتلبّي تطلعات عملائنا.',
      en: "RAMADAN Engineering Office was founded in 1990 to be a trusted partner in building and designing projects. Over more than thirty years we have built deep experience in architectural and structural design, engineering consultancy and supervision, interior and exterior finishing and decor, as well as the fit-out of factories and industrial facilities. Our work is driven by a fully integrated, specialized team that combines experience with precision, and our vision is to deliver practical, aesthetic engineering solutions that meet the latest standards and our clients' aspirations.",
    },
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
    points: [
      { id: 'p1', ar: 'كادر متكامل ومتخصص', en: 'Fully integrated specialized team' },
      { id: 'p2', ar: 'خبرة منذ عام 1990', en: 'Experience since 1990' },
      { id: 'p3', ar: 'التزام بالمواعيد والجودة', en: 'Commitment to deadlines and quality' },
      { id: 'p4', ar: 'متابعة كاملة من الفكرة حتى التسليم', en: 'Full follow-up from concept to delivery' },
    ],
  },

  /* ---------------------------------------------------------------------------
   * مقدمة صفحة "تواصل معنا"
   * ------------------------------------------------------------------------- */
  contact: {
    title: { ar: 'تواصل معنا', en: 'Contact Us' },
    subtitle: {
      ar: 'نسعد بالإجابة عن استفساراتك ومناقشة مشروعك القادم.',
      en: 'We are happy to answer your questions and discuss your next project.',
    },
  },

  /* ---------------------------------------------------------------------------
   * الإحصائيات (الأرقام في الصفحة الرئيسية)
   * ------------------------------------------------------------------------- */
  stats: [
    { id: 's1', value: '36', label: { ar: 'سنوات خبرة', en: 'Years of Experience' } },
    { id: 's2', value: '+2000', label: { ar: 'مشروع منجز', en: 'Completed Projects' } },
    { id: 's3', value: '+735', label: { ar: 'عميل', en: 'Clients' } },
    { id: 's4', value: '100%', label: { ar: 'كادر متكامل ومتخصص', en: 'Fully Integrated Team' } },
  ],

  /* ---------------------------------------------------------------------------
   * الخدمات — الأيقونات المتاحة:
   * ruler, chart, brush, factory, shield, clock, users, spark
   * ------------------------------------------------------------------------- */
  services: [
    {
      id: 'srv1',
      icon: 'ruler',
      title: { ar: 'الهندسة والتصميم', en: 'Engineering & Design' },
      description: {
        ar: 'تصميم معماري وإنشائي متكامل للمباني السكنية والتجارية مع مخططات تنفيذية دقيقة ونماذج ثلاثية الأبعاد.',
        en: 'Integrated architectural and structural design for residential and commercial buildings with precise execution drawings and 3D models.',
      },
    },
    {
      id: 'srv2',
      icon: 'chart',
      title: { ar: 'الاستشارات الهندسية', en: 'Engineering Consulting' },
      description: {
        ar: 'دراسات جدوى، إشراف هندسي، تقييم فني، وحلول لمشاكل التنفيذ بما يضمن أعلى كفاءة وأقل تكلفة.',
        en: 'Feasibility studies, engineering supervision, technical assessment, and execution problem-solving for maximum efficiency and lower cost.',
      },
    },
    {
      id: 'srv3',
      icon: 'brush',
      title: { ar: 'الإكساء والديكور', en: 'Finishing & Decor' },
      description: {
        ar: 'أعمال إكساء داخلي وخارجي وديكورات عصرية باختيار دقيق للخامات والتشطيبات لإبراز هوية المكان.',
        en: 'Interior and exterior finishing and modern decor with careful selection of materials and finishes to highlight the identity of the space.',
      },
    },
    {
      id: 'srv4',
      icon: 'factory',
      title: { ar: 'تجهيز المعامل', en: 'Factory & Plant Fit-out' },
      description: {
        ar: 'تصميم وتجهيز المعامل والمنشآت الصناعية بالكامل: دراسة المخططات، توزيع خطوط الإنتاج، البنية التحتية والأعمال الكهروميكانيكية بكفاءة عالية.',
        en: 'Complete design and fit-out of factories and industrial facilities: layout studies, production-line distribution, infrastructure and electromechanical works with high efficiency.',
      },
    },
  ],

  /* ---------------------------------------------------------------------------
   * المشاريع — التصنيفات المتاحة (category):
   * 'design' تصميم | 'consulting' استشارات | 'decor' إكساء وديكور | 'factory' معامل
   * `image` هي صورة الغلاف، و `images` كل صور المعرض (تشمل الغلاف عادةً).
   * ------------------------------------------------------------------------- */
  projects: [
    {
      id: 'prj1',
      title: { ar: 'تصميم صالة عرض ذهب ومجوهرات', en: 'Gold & Jewelry Showroom' },
      category: 'decor',
      year: '2024',
      location: { ar: 'دمشق', en: 'Damascus' },
      image: '/projects/showroom-1.jpg',
      images: ['/projects/showroom-1.jpg'],
      description: {
        ar: 'تصميم وتنفيذ صالة عرض فاخرة بخامات الأونيكس المضيء واللمسات الذهبية وإضاءة مدروسة تُبرز رقي المعروضات.',
        en: 'Design and fit-out of a luxurious showroom with backlit onyx surfaces, gold accents and refined lighting that elevates the displays.',
      },
    },
    {
      id: 'prj2',
      title: { ar: 'غرفة نوم رئيسية عصرية', en: 'Modern Master Bedroom' },
      category: 'decor',
      year: '2024',
      location: { ar: 'دمشق', en: 'Damascus' },
      image: '/projects/bedroom-1.jpg',
      images: [
        '/projects/bedroom-1.jpg',
        '/projects/bedroom-2.jpg',
        '/projects/bedroom-3.jpg',
        '/projects/bedroom-4.jpg',
      ],
      description: {
        ar: 'ديكور غرفة نوم رئيسية بطابع عصري هادئ، يمزج الأقمشة الرمادية مع لمسات تركوازية، صدر سرير منجّد، رخام مضيء، وركن تسريحة أنيق بإضاءة دافئة.',
        en: 'A calm, modern master bedroom blending grey upholstery with teal accents, an upholstered headboard, backlit marble and an elegant vanity corner with warm lighting.',
      },
    },
    {
      id: 'prj3',
      title: { ar: 'استقبال ومكاتب شركة', en: 'Company Reception & Offices' },
      category: 'decor',
      year: '2024',
      location: { ar: 'دمشق', en: 'Damascus' },
      image: '/projects/office-1.jpg',
      images: [
        '/projects/office-1.jpg',
        '/projects/office-2.jpg',
        '/projects/office-3.jpg',
        '/projects/office-4.jpg',
        '/projects/office-5.jpg',
      ],
      description: {
        ar: 'تصميم منطقة استقبال ومكاتب بطابع راقٍ يجمع الخشب الطبيعي والرخام والإضاءة الذهبية، مع مكتب استقبال مميّز وجدار شعار يعكس هوية الشركة.',
        en: 'An upscale reception and office area combining natural wood, marble and golden lighting, with a signature reception desk and a logo wall that reflects the company identity.',
      },
    },
    {
      id: 'prj4',
      title: { ar: 'تصميم صيدلية', en: 'Pharmacy Interior Design' },
      category: 'decor',
      year: '2025',
      location: { ar: 'دمشق', en: 'Damascus' },
      image: '/projects/pharmacy-1.jpg',
      images: [
        '/projects/pharmacy-1.jpg',
        '/projects/pharmacy-2.jpg',
        '/projects/pharmacy-3.jpg',
        '/projects/pharmacy-4.jpg',
        '/projects/pharmacy-5.jpg',
        '/projects/pharmacy-6.jpg',
        '/projects/pharmacy-7.jpg',
      ],
      description: {
        ar: 'تصميم صيدلية بهوية لونية هادئة (الأبيض والأخضر الزيتي) مع رفوف مقوّسة بإطارات ذهبية وإضاءة مدمجة وواجهة جذّابة تمنح تجربة عرض مريحة وأنيقة.',
        en: 'A pharmacy designed in a calm white-and-olive palette with arched, gold-trimmed shelving, integrated lighting and an attractive storefront that delivers a comfortable, elegant display experience.',
      },
    },
  ],

  /* ---------------------------------------------------------------------------
   * لماذا نحن؟ (المميزات في الصفحة الرئيسية)
   * ------------------------------------------------------------------------- */
  whyUs: [
    {
      id: 'w1',
      icon: 'shield',
      title: { ar: 'جودة مضمونة', en: 'Guaranteed Quality' },
      text: {
        ar: 'نلتزم بأعلى معايير الجودة في كل مرحلة من مراحل المشروع.',
        en: 'We commit to the highest quality standards at every project stage.',
      },
    },
    {
      id: 'w2',
      icon: 'clock',
      title: { ar: 'تسليم في الوقت', en: 'On-Time Delivery' },
      text: {
        ar: 'نحترم الجدول الزمني ونسلّم المشاريع ضمن المدة المتفق عليها.',
        en: 'We respect the timeline and deliver projects within the agreed period.',
      },
    },
    {
      id: 'w3',
      icon: 'users',
      title: { ar: 'فريق محترف', en: 'Professional Team' },
      text: {
        ar: 'مهندسون وخبراء بخبرة طويلة في مختلف التخصصات.',
        en: 'Engineers and experts with long experience across disciplines.',
      },
    },
    {
      id: 'w4',
      icon: 'spark',
      title: { ar: 'تصاميم مبتكرة', en: 'Innovative Designs' },
      text: {
        ar: 'نمزج بين الوظيفة والجمال لتقديم تصاميم تترك أثراً.',
        en: 'We blend function and beauty to deliver designs that leave an impact.',
      },
    },
  ],
}

/* =============================================================================
 * ⚠️ لا تعدّل ما يلي — يجعل مسارات الصور المحلية تعمل تلقائياً سواء نُشر
 * الموقع على الدومين الرئيسي أو على رابط فرعي مثل github.io/Ramadan_website
 * ============================================================================= */
const asset = (p) =>
  p && !p.startsWith('http') ? import.meta.env.BASE_URL + p.replace(/^\//, '') : p

export default {
  ...content,
  site: { ...content.site, logo: asset(content.site.logo) },
  hero: { ...content.hero, image: asset(content.hero.image) },
  about: { ...content.about, image: asset(content.about.image) },
  projects: content.projects.map((p) => ({
    ...p,
    image: asset(p.image),
    images: (p.images || []).map(asset),
  })),
}
