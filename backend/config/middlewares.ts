export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',

 {
  name: 'strapi::cors',
  config: {
    origin: [
      'https://ecommerce-dashboard-hazel.vercel.app',
      'http://localhost:3000',
      'http://localhost:5174',
    ],
  },
},

  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

