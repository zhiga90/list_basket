const state = {
  basket: JSON.parse(localStorage.getItem('basket')) || [],
}

const getters = {
  basket: state => state.basket,
  basketFlat: state => state.basket.map(item => ({
    ...item,
    total: item.item.price * item.count,
  })),
  subtotal: state => state.basket
    .reduce((old, cur) => old + (cur.item.price * cur.count), 0),
}

const mutations = {
  addToBasket(state, item) {
    state.basket.push({ id: item.id, item, count: 1 })
    localStorage.setItem('basket', JSON.stringify(state.basket))
  },
  setCounter(state, { index, count }) {
    state.basket[index].count = count
    localStorage.setItem('basket', JSON.stringify(state.basket))
  },
  removeFromBasket(state, index) {
    if (state.basket[index]) state.basket.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(state.basket))
  },
  cleanBasket(state) {
    state.basket = []
    localStorage.setItem('basket', JSON.stringify(state.basket))
  },
}

const actions = {
  toBasket({ state, commit }, { product, count }) {
    const { basket } = state
    const indexById = basket.findIndex(item => item.id === product.id)
    if (indexById > -1) {
      if (count && count > 0) {
        commit('setCounter', { index: indexById, count })
      } else {
        commit('removeFromBasket', indexById)
      }
    } else {
      commit('addToBasket', product)
    }
  },
  removeFromBasket({ state, commit }, product) {
    const { basket } = state
    const indexById = basket.findIndex(item => item.id === product.id)
    commit('removeFromBasket', indexById)
  },
  cleanBasket({ commit }) {
    commit('cleanBasket')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
