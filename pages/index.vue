<template>
  <div class="container">
    <h2 class="container__header">static components</h2>
    <nuxt-link to="two">two</nuxt-link>
    <div class="container__content">
      <component
        :is="comp.component"
        v-for="comp in components"
        :key="comp.name"
        v-bind="comp.props"
        class="container__item"
      />
    </div>
  </div>
</template>

<script>
const getComponent = (name) => ({
  component: import(`./../components/${name}`)
})

export default {
  async asyncData({ $axios }) {
    const componentsData = (await $axios.$get('/components')).data
    return { componentsData }
  },
  created() {
    const componentList = this.componentsData
    this.components = {}
    componentList.forEach((component) => {
      this.components[component.name] = {
        component: () => getComponent(component.name),
        name: component.name,
        props: component.settings
      }
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-gap: 20px 20px;
}
</style>
