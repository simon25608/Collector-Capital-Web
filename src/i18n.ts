import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        dashboard: 'Dashboard',
        strategies: 'Strategies',
        support: 'Support',
        contact: 'Contact',
        legal: 'Legal',
        search: 'Search markets...',
        trade: 'Trade',
        signIn: 'Sign In'
      },
      dashboard: {
        heroTitle: 'Algorithmic Precision.',
        heroSubtitle: 'Institutional-grade quantitative strategies for the modern forex market. Deployed with zero latency, managed with absolute risk control.',
        investNow: 'Invest Now',
        viewLedger: 'View Public Ledger',
        featuredStrategy: 'Featured Strategy',
        institutionalExcellence: 'Institutional Excellence',
        createAccount: 'Create Account',
        exploreStrategies: 'Explore Strategies'
      },
      strategies: {
        title: 'Investment Strategies',
        subtitle: 'Deploy capital into institutional-grade portfolios. Our quantitative strategies leverage machine learning and global macro analysis to deliver risk-adjusted alpha in the forex markets.',
        searchPlaceholder: 'Search strategies (e.g. Scalper, Macro)...',
        riskLevel: 'Risk Level',
        assetType: 'Asset Type',
        returnRange: 'Return Range',
        exploreStrategy: 'Explore Strategy',
        backToStrategies: 'Back to Strategies'
      },
      auth: {
        joinTitle: 'Join the',
        joinHighlight: 'Architecture',
        joinSuffix: 'of Wealth.',
        joinSubtitle: 'Access institutional-grade liquidity and expert analysis in a space designed for the modern financial architect.',
        trustedBy: 'Trusted by 50,000+ traders',
        testimonial: '"The most intuitive data-driven interface I have used in 15 years of trading."',
        createAccount: 'Create an Account',
        secureAccess: 'Secure your access to global markets today.',
        orEmail: 'or email register',
        fullName: 'Full Name',
        email: 'Email Address',
        password: 'Password',
        strongSecurity: 'Strong Security Score',
        iAgree: 'I agree to the',
        terms: 'Terms of Service',
        and: 'and',
        privacy: 'Privacy Policy',
        createBtn: 'Create Account',
        alreadyHave: 'Already have an account?',
        signIn: 'Sign In',
        encryption: 'AES-256 Encryption Active'
      },
      support: {
        center: 'Support Center',
        title: 'How can we help?',
        searchPlaceholder: 'Search for questions, topics, or keywords...',
        gettingStarted: 'Getting Started',
        articlesCount: '5 articles in this category',
        stillHaveQuestions: 'Still have questions?',
        supportTeam: 'Our support team is available 24/7 to help you with any queries.',
        contactSupport: 'Contact Support',
        submitTicket: 'Submit a Ticket',
        directChannels: 'Direct Channels',
        priorityEmail: 'Priority Email',
        emailResponse: 'Response time under 15 minutes.',
        liveChat: '24/7 Live Chat',
        chatResponse: 'Connect instantly with an analyst.',
        startSession: 'Start Session',
        phone: 'Institutional Phone',
        phoneResponse: 'Dedicated line for high-net-worth.'
      },
      contact: {
        institutionalAccess: 'Institutional Access',
        title: 'Get in Touch',
        subtitle: 'Support for the Modern Investor. Reach out to our global desk for specialized investment inquiries and account management.',
        directInquiry: 'Direct Inquiry',
        fullName: 'Full Name',
        email: 'Email Address',
        strategyInterest: 'Strategy Interest',
        message: 'Message',
        messagePlaceholder: 'How can our architects assist you?',
        submit: 'Submit Inquiry',
        priorityEmail: 'Priority Email',
        emailResponse: 'Response time under 15 minutes for verified clients.',
        liveChat: '24/7 Live Chat',
        chatResponse: 'Connect instantly with a human desk analyst.',
        startSession: 'Start Session',
        phone: 'Institutional Support Phone',
        phoneResponse: 'Dedicated line for high-net-worth and corporate desks.',
        globalPresence: 'Global Presence',
        globalSubtitle: 'Our strategic desks operate in the world\'s most vital financial hubs to ensure seamless 24-hour market coverage.'
      },
      legal: {
        regulatoryDoc: 'Regulatory Document',
        title: 'Legal Notice & Disclosure',
        lastUpdated: 'Last Updated: October 24, 2023',
        downloadPdf: 'Download PDF Version',
        riskTitle: '1. Risk Disclosure',
        riskP1: 'Trading foreign exchange (Forex) and other financial instruments on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.',
        riskP2: 'The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose.',
        riskP3: 'You should be aware of all the risks associated with foreign exchange trading and seek advice from an independent financial advisor if you have any doubts. Any opinions, news, research, analyses, prices, or other information contained on this website is provided as general market commentary and does not constitute investment advice.',
        termsTitle: '2. Terms of Service',
        termsP1: 'By accessing this website and our trading platform, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.',
        termsL1: 'Execution Policy: All orders are executed at the best available market price provided by our liquidity partners.',
        termsL2: 'Account Security: Users are responsible for maintaining the confidentiality of their login credentials and 2FA keys.',
        termsL3: 'Platform Availability: While we strive for 99.9% uptime, we do not guarantee uninterrupted access during volatile market events.',
        regTitle: '3. Regulatory Compliance',
        regP1: 'Collector Capital Global Markets is authorized and regulated by the Global Financial Conduct Authority (GFCA) under license number #FC-982-11. We strictly adhere to Anti-Money Laundering (AML) and Know Your Customer (KYC) protocols.',
        regP2: 'All client funds are held in segregated Tier-1 bank accounts, separate from the company\'s operational funds, ensuring the highest level of capital protection for our institutional and retail clients alike.',
        limitationTitle: '4. Limitation of Liability',
        limitationP1: 'In no event shall Collector Capital or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform, even if Collector Capital has been notified orally or in writing of the possibility of such damage.',
        criticalNotice: 'CRITICAL NOTICE',
        criticalP1: 'Jurisdictional restrictions apply. Our services are not intended for distribution to, or use by, any person in any country where such distribution or use would be contrary to local law or regulation.',
        queriesTitle: 'Legal Queries?',
        queriesSubtitle: 'Our compliance team is available for any clarifications regarding our risk protocols or terms.',
        contactCompliance: 'Contact Compliance',
        supportCenter: 'Support Center'
      }
    }
  },
  es: {
    translation: {
      navbar: {
        dashboard: 'Panel',
        strategies: 'Estrategias',
        support: 'Soporte',
        contact: 'Contacto',
        legal: 'Legal',
        search: 'Buscar mercados...',
        trade: 'Operar',
        signIn: 'Iniciar Sesión'
      },
      dashboard: {
        heroTitle: 'Precisión Algorítmica.',
        heroSubtitle: 'Estrategias cuantitativas de grado institucional para el mercado de divisas moderno. Desplegadas con latencia cero, gestionadas con control absoluto de riesgos.',
        investNow: 'Invertir Ahora',
        viewLedger: 'Ver Libro Mayor Público',
        featuredStrategy: 'Estrategia Destacada',
        institutionalExcellence: 'Excelencia Institucional',
        createAccount: 'Crear Cuenta',
        exploreStrategies: 'Explorar Estrategias'
      },
      strategies: {
        title: 'Estrategias de Inversión',
        subtitle: 'Despliegue capital en carteras de grado institucional. Nuestras estrategias cuantitativas aprovechan el aprendizaje automático y el análisis macroeconómico global para ofrecer alfa ajustado al riesgo en los mercados de divisas.',
        searchPlaceholder: 'Buscar estrategias (ej. Scalper, Macro)...',
        riskLevel: 'Nivel de Riesgo',
        assetType: 'Tipo de Activo',
        returnRange: 'Rango de Retorno',
        exploreStrategy: 'Explorar Estrategia',
        backToStrategies: 'Volver a Estrategias'
      },
      auth: {
        joinTitle: 'Únete a la',
        joinHighlight: 'Arquitectura',
        joinSuffix: 'de la Riqueza.',
        joinSubtitle: 'Accede a liquidez de grado institucional y análisis experto en un espacio diseñado para el arquitecto financiero moderno.',
        trustedBy: 'Con la confianza de más de 50,000 traders',
        testimonial: '"La interfaz basada en datos más intuitiva que he usado en 15 años de trading."',
        createAccount: 'Crear una Cuenta',
        secureAccess: 'Asegura tu acceso a los mercados globales hoy.',
        orEmail: 'o regístrate por correo',
        fullName: 'Nombre Completo',
        email: 'Dirección de Correo',
        password: 'Contraseña',
        strongSecurity: 'Puntuación de Seguridad Fuerte',
        iAgree: 'Acepto los',
        terms: 'Términos de Servicio',
        and: 'y la',
        privacy: 'Política de Privacidad',
        createBtn: 'Crear Cuenta',
        alreadyHave: '¿Ya tienes una cuenta?',
        signIn: 'Iniciar Sesión',
        encryption: 'Cifrado AES-256 Activo'
      },
      support: {
        center: 'Centro de Soporte',
        title: '¿Cómo podemos ayudarte?',
        searchPlaceholder: 'Buscar preguntas, temas o palabras clave...',
        gettingStarted: 'Primeros Pasos',
        articlesCount: '5 artículos en esta categoría',
        stillHaveQuestions: '¿Aún tienes preguntas?',
        supportTeam: 'Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta.',
        contactSupport: 'Contactar Soporte',
        submitTicket: 'Enviar un Ticket',
        directChannels: 'Canales Directos',
        priorityEmail: 'Correo Prioritario',
        emailResponse: 'Tiempo de respuesta inferior a 15 minutos.',
        liveChat: 'Chat en Vivo 24/7',
        chatResponse: 'Conéctate al instante con un analista.',
        startSession: 'Iniciar Sesión',
        phone: 'Teléfono Institucional',
        phoneResponse: 'Línea dedicada para altos patrimonios.'
      },
      contact: {
        institutionalAccess: 'Acceso Institucional',
        title: 'Ponte en Contacto',
        subtitle: 'Soporte para el Inversor Moderno. Comunícate con nuestra mesa global para consultas de inversión especializadas y gestión de cuentas.',
        directInquiry: 'Consulta Directa',
        fullName: 'Nombre Completo',
        email: 'Dirección de Correo',
        strategyInterest: 'Interés de Estrategia',
        message: 'Mensaje',
        messagePlaceholder: '¿Cómo pueden nuestros arquitectos ayudarte?',
        submit: 'Enviar Consulta',
        priorityEmail: 'Correo Prioritario',
        emailResponse: 'Tiempo de respuesta inferior a 15 minutos para clientes verificados.',
        liveChat: 'Chat en Vivo 24/7',
        chatResponse: 'Conéctate al instante con un analista humano.',
        startSession: 'Iniciar Sesión',
        phone: 'Teléfono de Soporte Institucional',
        phoneResponse: 'Línea dedicada para altos patrimonios y mesas corporativas.',
        globalPresence: 'Presencia Global',
        globalSubtitle: 'Nuestras mesas estratégicas operan en los centros financieros más vitales del mundo para garantizar una cobertura de mercado ininterrumpida las 24 horas.'
      },
      legal: {
        regulatoryDoc: 'Documento Regulatorio',
        title: 'Aviso Legal y Divulgación',
        lastUpdated: 'Última Actualización: 24 de Octubre, 2023',
        downloadPdf: 'Descargar Versión PDF',
        riskTitle: '1. Divulgación de Riesgos',
        riskP1: 'Operar en divisas (Forex) y otros instrumentos financieros con margen conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. El alto grado de apalancamiento puede trabajar tanto en su contra como a su favor. Antes de decidir operar, debe considerar cuidadosamente sus objetivos de inversión, nivel de experiencia y apetito por el riesgo.',
        riskP2: 'Existe la posibilidad de que pueda sufrir una pérdida de parte o la totalidad de su inversión inicial y, por lo tanto, no debe invertir dinero que no pueda permitirse perder.',
        riskP3: 'Debe ser consciente de todos los riesgos asociados con el comercio de divisas y buscar asesoramiento de un asesor financiero independiente si tiene alguna duda. Cualquier opinión, noticia, investigación, análisis, precio u otra información contenida en este sitio web se proporciona como comentario general del mercado y no constituye asesoramiento de inversión.',
        termsTitle: '2. Términos de Servicio',
        termsP1: 'Al acceder a este sitio web y a nuestra plataforma de negociación, usted acepta estar sujeto a estos términos de servicio, a todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.',
        termsL1: 'Política de Ejecución: Todas las órdenes se ejecutan al mejor precio de mercado disponible proporcionado por nuestros socios de liquidez.',
        termsL2: 'Seguridad de la Cuenta: Los usuarios son responsables de mantener la confidencialidad de sus credenciales de inicio de sesión y claves 2FA.',
        termsL3: 'Disponibilidad de la Plataforma: Aunque nos esforzamos por lograr un tiempo de actividad del 99.9%, no garantizamos el acceso ininterrumpido durante eventos de mercado volátiles.',
        regTitle: '3. Cumplimiento Regulatorio',
        regP1: 'Collector Capital Global Markets está autorizada y regulada por la Autoridad de Conducta Financiera Global (GFCA) bajo la licencia número #FC-982-11. Nos adherimos estrictamente a los protocolos contra el lavado de dinero (AML) y conozca a su cliente (KYC).',
        regP2: 'Todos los fondos de los clientes se mantienen en cuentas bancarias segregadas de Nivel 1, separadas de los fondos operativos de la empresa, lo que garantiza el más alto nivel de protección de capital tanto para nuestros clientes institucionales como minoristas.',
        limitationTitle: '4. Limitación de Responsabilidad',
        limitationP1: 'En ningún caso Collector Capital o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o ganancias, o debido a la interrupción del negocio) que surja del uso o la incapacidad de usar los materiales en nuestra plataforma, incluso si Collector Capital ha sido notificado oralmente o por escrito de la posibilidad de tal daño.',
        criticalNotice: 'AVISO CRÍTICO',
        criticalP1: 'Se aplican restricciones jurisdiccionales. Nuestros servicios no están destinados a la distribución o uso por parte de ninguna persona en ningún país donde dicha distribución o uso sea contrario a la ley o regulación local.',
        queriesTitle: '¿Consultas Legales?',
        queriesSubtitle: 'Nuestro equipo de cumplimiento está disponible para cualquier aclaración sobre nuestros protocolos de riesgo o términos.',
        contactCompliance: 'Contactar Cumplimiento',
        supportCenter: 'Centro de Soporte'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
