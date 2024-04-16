// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@pinia/nuxt"],

  colorMode: {
    classSuffix: "",
  },

  components: [
    { path: "~/components/global/", pathPrefix: false },
    { path: "~/components/shared/", pathPrefix: false },
    { path: "~/components/ui/", pathPrefix: false },
    "~/components",
  ],

  runtimeConfig: {
    public: {
      discordClientId: "", // can be overridden by NUXT_PUBLIC_DISCORD_CLIENT_ID environment variable
      discordRedirectUri: "", // can be overridden by NUXT_PUBLIC_DISCORD_REDIRECT_URI environment variable
    },

    backendUrl: "", // can be overridden by NUXT_BACKEND_URL environment variable
  },

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  ssr: false,
});