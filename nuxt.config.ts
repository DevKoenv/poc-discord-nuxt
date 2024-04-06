// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: '',
  },

  components: [
    { path: '~/components/global/', pathPrefix: false },
    { path: '~/components/shared/', pathPrefix: false },
    { path: '~/components/ui/', pathPrefix: false },
    '~/components',
  ],
});
