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
    'nav.faq': 'FAQ',
    'nav.whatsapp': 'Hablar por WhatsApp',
    'nav.switchLang': 'Switch to English',
    'nav.menuOpen': 'Abrir menú de navegación',
    'nav.menuClose': 'Cerrar menú de navegación',

    // Hero
    'hero.phrase.left.1': 'Sitios',
    'hero.phrase.left.2': 'web',
    'hero.phrase.left.3': 'y',
    'hero.phrase.left.4': 'tiendas',
    'hero.phrase.right.1': 'Software',
    'hero.phrase.right.2': 'a',
    'hero.phrase.right.3': 'medida',
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
    'nav.faq': 'FAQ',
    'nav.whatsapp': 'Chat on WhatsApp',
    'nav.switchLang': 'Cambiar a Español',
    'nav.menuOpen': 'Open navigation menu',
    'nav.menuClose': 'Close navigation menu',

    // Hero
    'hero.phrase.left.1': 'Websites',
    'hero.phrase.left.2': '&',
    'hero.phrase.left.3': 'online',
    'hero.phrase.left.4': 'stores',
    'hero.phrase.right.1': 'Custom',
    'hero.phrase.right.2': 'built',
    'hero.phrase.right.3': 'software',
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
