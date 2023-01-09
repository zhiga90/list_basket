const state = {
  basket: JSON.parse(localStorage.getItem('basket')) || [],
}

const getters = {
  basket: state => state.basket,
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
  toBasket({ state, commit, dispatch }, { product, count }) {
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
  cleanBasket({ commit }, product) {
    commit('cleanBasket', product)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
