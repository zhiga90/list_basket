<template lang="pug">
v-row.catalog-view
  v-col(cols='2')
    v-sheet(rounded='lg')
      v-list-item(
        color='grey lighten-4'
        link
        @click='search()'
      )
        v-list-item-content
          v-list-item-title
            | All Categories
      v-divider
      v-list.py-0(color='transparent')
        v-list-item-group(
          v-model='catIndex'
          color='primary'
        )
          v-list-item(
            v-for='cat in categories'
            :key='cat'
            link
            @click='search({cat})'
          )
            v-list-item-content
              v-list-item-title {{cat}}
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
          v-card.d-flex.flex-column(outlined height='100%')
            v-img(:src='item.images[0]' height='200px')
            v-card-title {{item.title}}
            v-card-subtitle(v-if="catIndex < 0") {{item.category}}
            v-spacer
            v-divider.mt-auto
            v-card-actions
              .mx-2 $ {{item.price}}
              v-spacer
              v-text-field.basket-input(
                v-if='item.isInBasket'
                :value='item.basketCount'
                type='number'
                hide-spin-buttons
                icon
                @input='countInput($event, item)'
                @blur='checkCount(item)'
              )
                template(#prepend)
                  v-icon(@click='countChange(item, -1)') mdi-minus
                template(#append)
                  v-icon(@click='countChange(item, 1)') mdi-plus
              v-btn(
                v-else
                icon
                @click='toBasketClicked(item)'
              )
                v-icon mdi-basket

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CatalogView',

  data: () => ({
    list: [],
    categories: [],
    catIndex: -1,
  }),

  computed: {
    title() { return this.$route && this.$route.meta ? this.$route.meta.title : '' },
    query() { return this.$route && this.$route.query ? this.$route.query : {} },
    ...mapGetters('basket', ['basket']),
  },

  mounted() {
    this.getList()
    this.getCategoryList()
  },

  watch: {
    $route() {
      this.getList()
    },
  },

  methods: {
    ...mapActions('basket', ['toBasket']),
    getList() {
      let url = 'products'
      if (this.query && this.query.cat) {
        url += '/category/' + this.query.cat
      }
      this.$api(url)
        .then(res => this.formatList(res.data))
    },
    formatList(data) {
      this.list = data.products
        .map(product => {
          const basketIndex = this.basket.findIndex(basketItem => basketItem.id === product.id)
          const isInBasket = basketIndex > -1
          return {
            ...product,
            isInBasket,
            basketCount: isInBasket ? this.basket[basketIndex].count : 0,
          }
        })
    },
    getCategoryList() {
      this.$api('products/categories')
        .then(res => this.formatCategories(res.data))
    },
    formatCategories(data) {
      data.sort()
      this.categories = data
      const query = this.query.cat
      if (query) this.catIndex = data.indexOf(query)
    },
    search(searchParams = {}) {
      const query = { ...this.query }
      delete query.cat
      const { cat } = searchParams
      cat
        ? query.cat = cat
        : this.catIndex = -1
      this.$router.push({ path: '/catalog', query }).catch(() => {})
    },
    toBasketClicked(product) {
      product.basketCount = 1
      product.isInBasket = true
      this.toBasket({ product, count: 1 })
    },
    countChange(product, count) {
      product.basketCount += count
      product.isInBasket = !!product.basketCount
      this.toBasket({ product, count: product.basketCount })
    },
    countInput(value, product) {
      product.basketCount = +value
    },
    checkCount(product) {
      let count = product.basketCount
      let isValid = false
      if (count && Number.isInteger(count) && count > 0) isValid = true
      if (!isValid) count = 0
      product.basketCount = count
      product.isInBasket = !!product.basketCount
      this.toBasket({ product, count })
    },
  },
}
</script>

<style lang="sass" scoped>
.basket-input
  height: 36px
  padding-top: 0
  margin-top: 0
  max-width: 88px
</style>
