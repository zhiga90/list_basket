<template lang="pug">
.view-title
  h1.pa-4 {{title}}
  v-divider
</template>

<script>
export default {
  name: 'ViewTitle',

  computed: {
    title() { return this.$route && this.$route.meta ? this.$route.meta.title : '' },
  },
}
</script>

<style scoped>

</style>
