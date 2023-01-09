<template lang="pug">
  v-row.basket-view
    v-col
      v-sheet(min-height='70vh' rounded='lg')
        view-title
        v-data-table(
          :headers='headers'
          :items='basketFlat'
          hide-default-footer
        )
          template(#item.count="{ item }")
            basket-line-counter(
              :value='item.count'
              @countInput='item.count = +$event'
              @checkCount='checkCount(item.item, item.count)'
              @countChange='toBasket({ product: item.item, count: item.count += $event })'
            )

          template(#header.actions)
            v-btn(
              icon
              color='primary'
              @click='cleanBasket'
            )
              v-icon mdi-delete

          template(#item.actions="{ item }")
            v-btn(
              icon
              color='primary'
              @click='removeFromBasket(item)'
            )
              v-icon mdi-delete

        v-row.pt-4.align-center
          v-col
            .px-4
              h4 Subtotal: $ {{ subtotal }}
          v-col
            .text-end.px-4
              v-btn(color='primary') Checkout
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import viewTitle from '@/components/viewTitle.vue'
import basketLineCounter from '@/components/basketLineCounter.vue'

export default {
  name: 'BasketView',
  components: {
    viewTitle, basketLineCounter,
  },

  data: () => ({
    headers: [
      { text: 'Item', value: 'title' },
      { text: 'Price', value: 'item.price' },
      { text: 'Qty', width: '150px', sortables: false, value: 'count' },
      { text: 'Total', value: 'total' },
      { sortable: false, value: 'actions', width: '36px', class: 'text-end', cellClass: 'text-end' },
    ],
  }),

  computed: {
    ...mapGetters('basket', ['basketFlat', 'subtotal']),
  },

  methods: {
    ...mapActions('basket', ['cleanBasket', 'toBasket', 'removeFromBasket']),
    checkCount(product, count) {
      let isValid = false
      if (count && Number.isInteger(count) && count > 0) isValid = true
      if (!isValid) count = 0
      this.toBasket({ product, count })
    },
  },
}
</script>
