# Collector Capital Web

**Plataforma web para la exploración y gestión de estrategias de trading algorítmico.**

---

## Descripción general

Collector Capital Web es una aplicación web de página única (SPA) construida con React 19 y TypeScript 5.8. Permite a inversores y traders explorar estrategias de trading algorítmico, gestionar su lista de seguimiento (watchlist), autenticarse de forma segura y contactar al equipo de soporte. La plataforma cuenta con soporte multilingüe (español e inglés) y una interfaz moderna con animaciones fluidas.

---

## Stack tecnológico

| Categoría            | Tecnología                | Versión   |
| :------------------- | :------------------------ | :-------- |
| Runtime UI           | React                     | v19.x     |
| Lenguaje             | TypeScript                | ~5.8.2    |
| Build Tool           | Vite                      | v6.x      |
| Estilos              | Tailwind CSS              | v4.x      |
| Backend / Auth       | Supabase                  | v2.x      |
| Internacionalización | i18next + react-i18next   | v25 / v16 |
| Formularios          | react-hook-form           | v7.x      |
| Iconos               | lucide-react              | v0.5x     |
| Animaciones          | motion                    | v12.x     |
| Utilidades CSS       | clsx + tailwind-merge     | —         |
| Servidor local       | Express                   | v4.x      |
| Envío de emails      | Resend                    | v6.x      |
| CAPTCHA              | @marsidev/react-turnstile | v1.x      |
| IA generativa        | @google/genai             | v1.x      |

---

## Instalación y ejecución

### Prerrequisitos

- **Node.js** v18 o superior
- Cuenta en [Supabase](https://supabase.com) (para autenticación y base de datos)
- Cuenta en [Resend](https://resend.com) (para el envío de emails de contacto)
- (Opcional) Cuenta en [Cloudflare](https://www.cloudflare.com) para Turnstile CAPTCHA

### 1. Clonar el repositorio

```bash
git clone https://github.com/simon25608/Collector-Capital-Web.git
cd Collector-Capital-Web
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Supabase
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-anon-key>

# Resend (solo servidor)
RESEND_API_KEY=<tu-resend-api-key>

# Cloudflare Turnstile (solo cliente)
VITE_TURNSTILE_SITE_KEY=<tu-site-key>
```

> **Nota:** Las variables con prefijo `VITE_` son accesibles en el cliente. Las variables sin prefijo (como `RESEND_API_KEY`) solo se usan en el servidor Express y nunca se exponen al bundle del navegador.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### 5. Compilar para producción

```bash
npm run build
```

Los archivos de salida se generan en `dist/`. El servidor Express compilado queda en `dist/server.cjs`.

### 6. Iniciar en producción

```bash
npm start
```

---

## Estructura del proyecto

```
Collector-Capital-Web/
├── index.html                  # Punto de entrada HTML
├── vite.config.ts              # Configuración de Vite
├── tsconfig.json               # Configuración de TypeScript
├── vercel.json                 # Configuración de despliegue en Vercel
├── server.ts                   # Servidor Express (dev + producción)
├── package.json
│
├── api/
│   └── contact.ts              # Handler serverless para el formulario de contacto
│
├── public/                     # Archivos estáticos públicos
│
├── src/
│   ├── App.tsx                 # Componente raíz — enrutador manual por URL params
│   ├── i18n.ts                 # Configuración i18next con traducciones EN/ES inline
│   ├── index.css               # Tokens de diseño Tailwind v4 (@theme) y estilos globales
│   ├── main.tsx                # Punto de entrada de React
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Barra de navegación global
│   │   │   └── Footer.tsx      # Pie de página global
│   │   └── ui/                 # Componentes UI primitivos reutilizables
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── channel-cards.tsx
│   │       ├── custom-select.tsx
│   │       └── input.tsx
│   │
│   ├── features/               # Módulos de dominio (Feature-Sliced Design)
│   │   ├── auth/
│   │   │   └── AuthView.tsx    # Login / registro con Supabase Auth
│   │   ├── dashboard/
│   │   │   └── DashboardView.tsx
│   │   ├── strategy/
│   │   │   ├── StrategyListView.tsx   # Listado de estrategias
│   │   │   ├── StrategyDetailView.tsx # Detalle de una estrategia
│   │   │   └── StrategyCard.tsx
│   │   ├── watchlist/
│   │   │   └── WatchlistView.tsx      # Lista de seguimiento del usuario
│   │   ├── contact/
│   │   │   └── ContactView.tsx        # Formulario de contacto con CAPTCHA
│   │   ├── support/
│   │   │   └── SupportView.tsx
│   │   ├── profile/
│   │   │   └── ProfileView.tsx        # Perfil y configuración del usuario
│   │   └── legal/
│   │       └── LegalView.tsx          # Avisos legales y términos
│   │
│   └── lib/
│       ├── supabase.ts         # Singleton del cliente Supabase
│       └── utils.ts            # Utilidades compartidas (helper `cn`, etc.)
│
└── supabase/
    ├── functions/
    │   └── fetch-myfxbook/     # Edge Function para integración con MyFXBook
    └── migrations/             # Migraciones SQL secuenciales
```

---

## Funcionalidades principales

### Autenticación

- Registro e inicio de sesión mediante **Supabase Auth** (email + contraseña).
- Gestión de sesión persistente con `supabase.auth.onAuthStateChange`.
- Protección de vistas privadas (Dashboard, Watchlist, Perfil) redirigiendo a la vista de autenticación.

### Dashboard

- Vista principal tras el login con resumen de la actividad del usuario y acceso rápido a las estrategias.

### Sincronización de datos con MyFXBook

Los datos de rendimiento de las estrategias se obtienen automáticamente desde **MyFXBook** mediante el siguiente pipeline:

1. Un **cron job** configurado en Supabase (`pg_cron`) se ejecuta periódicamente e invoca la Edge Function `fetch-myfxbook`.
2. La **Supabase Edge Function** (`supabase/functions/fetch-myfxbook/`) consulta la API de MyFXBook, transforma los datos y los persiste en la base de datos de Supabase (tabla de estrategias).
3. El frontend lee las estrategias directamente desde Supabase, garantizando que los datos mostrados están siempre actualizados sin depender de llamadas en tiempo real a MyFXBook.

La configuración del cron se encuentra en `supabase/migrations/manual_setup_cron_myfxbook.sql`. Debe ejecutarse manualmente en el **SQL Editor** del Dashboard de Supabase, ya que requiere permisos de superusuario para habilitar las extensiones `pg_cron` y `pg_net`.

### Explorador de estrategias

- Listado paginado y filtrable de estrategias de trading algorítmico obtenidas desde Supabase.
- Vista de detalle con métricas, descripción y estadísticas de rendimiento.
- Estrategias marcadas como `featured` se destacan visualmente.

### Watchlist

- Los usuarios autenticados pueden añadir y eliminar estrategias de su lista de seguimiento personal.
- Los datos se persisten en Supabase vinculados al `user_id`.

### Formulario de contacto

- Formulario con validación mediante **react-hook-form**.
- Protección anti-spam con **Cloudflare Turnstile** CAPTCHA.
- Envío de emails usando **Resend** a través de la ruta `/api/contact`.
- Pre-selección de asunto cuando se navega desde una estrategia.

### Perfil de usuario

- Visualización y edición del perfil del usuario autenticado (nombre de pantalla, etc.).

### Soporte y Legales

- Vista de soporte con preguntas frecuentes y canales de ayuda.
- Vista legal con términos de servicio, política de privacidad y avisos legales.

### Internacionalización

- Soporte completo en **español** e **inglés** usando i18next.
- Cambio de idioma desde la barra de navegación sin recarga de página.

### Enrutamiento

- Sin React Router — navegación mediante `window.location.search` (`?view=X&id=Y`) y `window.history.pushState`.
- Soporte para el botón "atrás" del navegador vía el evento `popstate`.
