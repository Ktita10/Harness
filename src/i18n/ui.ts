export const languages = {
  es: 'ES',
  en: 'EN',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    // Nav
    'nav.services': 'SERVICIOS',
    'nav.process': 'CÓMO TRABAJAMOS',
    'nav.about': 'NOSOTROS',
    'nav.faq': 'FAQ',
    'nav.whatsapp': 'Hablar por WhatsApp',
    'nav.switchLang': 'Switch to English',
    'nav.menuOpen': 'Abrir menú de navegación',
    'nav.menuClose': 'Cerrar menú de navegación',

    // Hero
    'hero.phrase.part1': 'SOBRA CÓDIGO',
    'hero.phrase.part2': 'FALTA',
    'hero.phrase.part3': 'CRITERIO',
    'hero.scroll': 'Scroll',
    'hero.srTitle': 'HARNESS STUDIO — Desarrollo Web, Tiendas y Software a Medida',

    // Services & Process
    'services.tag': '// LO QUE CONSTRUIMOS',
    'services.title': 'SERVICIOS QUE',
    'services.titleAccent': 'OFRECEMOS',
    'services.viewService': 'VER DETALLES',
    'process.tag': '// METODOLOGÍA',
    'process.title': 'CÓMO',
    'process.titleAccent': 'TRABAJAMOS',

    // About Section
    'about.tag': '// EL EQUIPO DETRÁS DEL CÓDIGO',
    'about.title': 'QUIÉNES',
    'about.titleAccent': 'SOMOS',
    'about.subtitle': 'Ingeniería directa, sin intermediarios ni cuentas que diluyan tu mensaje.',
    'about.description': 'En Harness resolvemos los problemas reales de cada cliente con criterio técnico, compromiso y responsabilidad. Sin intermediarios: quien diseña tu solución es quien la construye. ',
    'about.dev1.name': 'Matias Fuentes',
    'about.dev1.role': 'Co-Founder & Creative Technologist',
    'about.dev1.specialty': 'Frontend & Experiencia Interactiva',
    'about.dev1.bio': 'Enfocado en interfaces de alta conversión, animaciones fluidas, optimización SEO técnica y experiencias de e-commerce pensadas para vender.',
    'about.dev2.name': 'Ignacio Diaz',
    'about.dev2.role': 'Co-Founder & Full-Stack Engineer',
    'about.dev2.specialty': 'Arquitectura & Sistemas',
    'about.dev2.bio': 'Especializado en arquitecturas escalables, desarrollo de software a medida e integraciones de alto rendimiento con foco en velocidad y estabilidad.',
    'about.dev3.name': 'Francisco Singla',
    'about.dev3.role': 'Co-Founder & Software Engineer',
    'about.dev3.specialty': 'Backend & Automatización',
    'about.dev3.bio': 'Especializado en lógica de negocio compleja, APIs robustas, bases de datos y automatización de procesos operativos para escalar sin fricción.',

    // FAQ Section
    'faq.title': 'PREGUNTAS',
    'faq.titleAccent': 'FRECUENTES',
    'faq.subtitle': 'Todo lo que necesitás saber sobre plazos, pagos, tecnología y formas de trabajo antes de arrancar.',

    // CTA Section
    'cta.title.default1': '“LA OBSESION',
    'cta.title.accent': 'ES NUESTRO',
    'cta.title.default2': 'MEJOR CODIGO”',
    'cta.btn': 'INICIAR PROYECTO',
    'cta.nav': '// NAVEGACIÓN',
    'cta.socials': '// REDES',
    'cta.message': 'Hola Harness Studio, quiero cotizar un proyecto',
    'cta.serviceTitlePrefix': '¿Listo para avanzar con',

    // Service Detail Page
    'service.breadcrumb.home': 'Inicio',
    'service.breadcrumb.services': 'Servicios',
    'service.consultWhatsApp': 'Consultar por WhatsApp',
    'service.viewPlans': 'Ver planes',
    'service.processTag': 'Paso a paso',
    'service.processTitle': 'PROCESO DE',
    'service.processTitleAccent': 'TRABAJO',
    'service.pricingTag': 'Inversión transparente',
    'service.pricingTitle': 'PLANES Y',
    'service.pricingTitleAccent': 'ESTIMACIONES',
    'service.pricingTerm': 'Plazo estimado',
    'service.badgeRecommended': 'Recomendado',
    'service.pricingBtn': 'Elegir este plan',
    'service.faqTag': 'Dudas comunes',
    'service.faqTitle': 'PREGUNTAS',
    'service.faqTitleAccent': 'DEL SERVICIO',

    // General & 404
    'skipLink': 'Saltar al contenido principal',
    'meta.home.title': 'HARNESS STUDIO | Desarrollo Web, Tiendas y Software a Medida',
    'meta.home.description': 'Desarrollo de sitios web ultrarrápidos, personalización de Tienda Nube, tiendas online y software a medida para pymes y emprendedores.',
    '404.title': '404 - Página no encontrada | HARNESS STUDIO',
    '404.heading': '404',
    '404.subheading': 'PÁGINA NO ENCONTRADA',
    '404.description': 'La ruta que buscas no existe o ha sido movida.',
    '404.btn': 'Volver al Inicio',
  },
  en: {
    // Nav
    'nav.services': 'SERVICES',
    'nav.process': 'HOW WE WORK',
    'nav.about': 'ABOUT US',
    'nav.faq': 'FAQ',
    'nav.whatsapp': 'Chat on WhatsApp',
    'nav.switchLang': 'Cambiar a Español',
    'nav.menuOpen': 'Open navigation menu',
    'nav.menuClose': 'Close navigation menu',

    // Hero
    'hero.phrase.part1': 'CODE IS CHEAP',
    'hero.phrase.part2': 'LACKING',
    'hero.phrase.part3': 'JUDGMENT',
    'hero.scroll': 'Scroll',
    'hero.srTitle': 'HARNESS STUDIO — Web Development, Online Stores & Custom Software',

    // Services & Process
    'services.tag': '// WHAT WE BUILD',
    'services.title': 'SERVICES WE',
    'services.titleAccent': 'OFFER',
    'services.viewService': 'VIEW DETAILS',
    'process.tag': '// METHODOLOGY',
    'process.title': 'HOW WE',
    'process.titleAccent': 'WORK',

    // About Section
    'about.tag': '// THE TEAM BEHIND THE CODE',
    'about.title': 'WHO WE',
    'about.titleAccent': 'ARE',
    'about.subtitle': 'Direct engineering, zero middlemen or account managers diluting your vision.',
    'about.description': 'At Harness, we solve our clients real problems with technical judgment, commitment, and accountability. No middlemen: the people who design your solution are the ones who build it.',
    'about.dev1.name': 'Matias Fuentes',
    'about.dev1.role': 'Co-Founder & Creative Technologist',
    'about.dev1.specialty': 'Frontend & Interactive Experience',
    'about.dev1.bio': 'Focused on high-converting interfaces, fluid motion systems, technical SEO optimization, and e-commerce experiences built to sell.',
    'about.dev2.name': 'Ignacio Diaz',
    'about.dev2.role': 'Co-Founder & Full-Stack Engineer',
    'about.dev2.specialty': 'Architecture & Systems',
    'about.dev2.bio': 'Specialized in scalable architectures, tailor-made software development, and high-performance integrations focused on speed and reliability.',
    'about.dev3.name': 'Francisco Singla',
    'about.dev3.role': 'Co-Founder & Software Engineer',
    'about.dev3.specialty': 'Backend & Automation',
    'about.dev3.bio': 'Specialized in complex business logic, robust APIs, databases, and operational workflow automation designed to scale seamlessly.',

    // FAQ Section
    'faq.title': 'FREQUENTLY ASKED',
    'faq.titleAccent': 'QUESTIONS',
    'faq.subtitle': 'Everything you need to know about timelines, pricing, tech stack, and workflow before starting.',

    // CTA Section
    'cta.title.default1': '“OBSESSION',
    'cta.title.accent': 'IS OUR',
    'cta.title.default2': 'BEST CODE”',
    'cta.btn': 'START PROJECT',
    'cta.nav': '// NAVIGATION',
    'cta.socials': '// SOCIALS',
    'cta.message': 'Hello Harness Studio, I would like to quote a project',
    'cta.serviceTitlePrefix': 'Ready to move forward with',

    // Service Detail Page
    'service.breadcrumb.home': 'Home',
    'service.breadcrumb.services': 'Services',
    'service.consultWhatsApp': 'Inquire on WhatsApp',
    'service.viewPlans': 'View plans',
    'service.processTag': 'Step by step',
    'service.processTitle': 'WORKFLOW',
    'service.processTitleAccent': 'PROCESS',
    'service.pricingTag': 'Transparent pricing',
    'service.pricingTitle': 'PLANS &',
    'service.pricingTitleAccent': 'ESTIMATES',
    'service.pricingTerm': 'Estimated timeframe',
    'service.badgeRecommended': 'Recommended',
    'service.pricingBtn': 'Choose this plan',
    'service.faqTag': 'Common doubts',
    'service.faqTitle': 'SERVICE',
    'service.faqTitleAccent': 'QUESTIONS',

    // General & 404
    'skipLink': 'Skip to main content',
    'meta.home.title': 'HARNESS STUDIO | Web Development, Stores & Custom Software',
    'meta.home.description': 'High-performance websites, Tiendanube customization, online stores, and tailor-made software for businesses and founders.',
    '404.title': '404 - Page Not Found | HARNESS STUDIO',
    '404.heading': '404',
    '404.subheading': 'PAGE NOT FOUND',
    '404.description': 'The page you are looking for does not exist or has been moved.',
    '404.btn': 'Back to Home',
  },
} as const;
