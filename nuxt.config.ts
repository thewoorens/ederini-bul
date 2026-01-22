import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  colorMode: {
    preference: "light",
    fallback: "light",
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});

