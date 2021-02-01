module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'lousy poetry // a personal collection of what I call poetry',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'here, I will publish everything that I call done for now',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: "canonical", href: "https://poetry.hannes.cool" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    '~/plugins/firebase.js'
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  styleResources: {
    scss: ['assets/scss/main.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxyHeaders: false,
    headers: {
      post: {
        'token': 'AUqJMpG70Yy1tF0HwtCZuQtt',
        'version': 'published'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  generate: {
    fallback: true
  },
  buildModules: [
    '@nuxtjs/dotenv'
  ],
}
