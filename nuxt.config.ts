// import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: import.meta.env.NUXT_PUBLIC_API_URL,
      apiVersion: '/v1',
    }
  },
  compatibilityDate: '2025-07-15',
  css: ['./app/assets/css/main.css'],
  icon: {
    customCollections: [{
      prefix: 'flag',
      dir: './app/assets/icons/flags'
    }]
  },
  modules: ['@nuxt/fonts', '@nuxt/ui', '@nuxt/image', '@pinia/nuxt'],
  components: [
    {
      path: '~/shared/components',
      pathPrefix: false,
    },
    {
      path: '~/modules',
      extensions: ['vue'],
      pathPrefix: true,
    },
  ],
  app: {
    head: {
      title: 'SeenTIX - Your Great Events Begin With Us.',
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=1,maximum-scale=4',
        },
        {
          name: 'description',
          content: 'Plafrotm Ticketing Digital yang memudahkan penyelenggara mengelola acara dan tiket, sekaligus temukan berbagai event yang menarik dan beli tiketnya dengan mudah.'
        }
      ]
    }
  },
  vite: {
    // plugins: [
    //   tailwindcss(),
    // ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod',
      ]
    }
  }
})