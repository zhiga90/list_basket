<template lang="pug">
  v-text-field.basket-input(
    :value='value'
    type='number'
    hide-spin-buttons
    icon
    @input='$emit("countInput", $event)'
    @blur='$emit("checkCount")'
  )
    template(#prepend)
      v-icon(@click='$emit("countChange", -1)') mdi-minus
    template(#append)
      v-icon(@click='$emit("countChange", 1)') mdi-plus
</template>

<script>
export default {
  name: 'basketLineCounter',

  props: {
    value: { type: [String, Number] },
  },
}
</script>
