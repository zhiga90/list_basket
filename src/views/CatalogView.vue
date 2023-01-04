<template lang="pug">
v-row.catalog-view
  v-col(cols='2')
    v-sheet(rounded='lg')
      v-list(color='transparent')
        v-list-item(v-for='n in 5' :key='n' link)
          v-list-item-content
            v-list-item-title
              | List Item {{ n }}
        v-divider.my-2
        v-list-item(color='grey lighten-4' link)
          v-list-item-content
            v-list-item-title
              | Refresh
  v-col
    v-sheet(min-height='70vh' rounded='lg')
      h1.pa-4 {{title}}
      v-divider
      v-row.catalog-items.pa-4
        v-col.catalog-item-wrap(
          v-for='item in list'
          :key='item.id'
          cols='3'
        )
          v-card(outlined height='100%')
            v-img(:src='item.images[0]' height='200px')
            v-card-title {{item.title}}
            v-card-subtitle {{item.brand}}
            v-card-actions
              .mx-2 $ {{item.price}}

</template>

<script>
export default {
  name: 'CatalogView',

  data: () => ({
    list: [],
  }),

  computed: {
    title() { return this.$route && this.$route.meta ? this.$route.meta.title : '' },
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      this.$api('products')
        .then(res => this.formatList(res.data))
    },
    formatList(data) {
      this.list = data.products
    },
  },
}
</script>

<style lang="sass" scoped>
.catalog
  &-view
  &-items
  &-item
    &-wrap
    &-block
    &-label
</style>
