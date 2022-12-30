<template lang="pug">
  v-app
    v-app-bar(app color='primary' dark)
      v-container.py-0.fill-height
        v-avatar.mr-10
          img(
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            alt="Vuetify Logo"
          )
        v-btn(
          v-for="link in links"
          :key="link.label"
          :to="link.url"
          text
        ) {{ link.label }}
    v-main
      v-container
        router-view
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    links: [
      { label: 'Catalog', url: '/catalog' },
      { label: 'Basket', url: '/basket' },
    ],
  }),

  computed: {
    title() { return this.$route && this.$route.meta ? this.$route.meta.title : '' },
  },
}
</script>
