<template>
  <dl>
    <dt>from component props</dt>
    <dd>{{ text }}</dd>
    <dt>from fetch</dt>
    <dd>{{ dinamicData }}</dd>
  </dl>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  async fetch() {
    const { data } = await this.$axios.$get('/api')
    this.dinamicData = data
  },
  data() {
    return {
      dinamicData: ''
    }
  }
}
</script>

<style scoped>
dl {
  padding: 40px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
}
dd {
  font-style: italic;
}
</style>
