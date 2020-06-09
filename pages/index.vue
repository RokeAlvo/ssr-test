<template>
  <div class="container">
    <h2>static components</h2>
    <div>
      <component
        :is="comp.component"
        v-for="comp in components"
        :key="comp.name"
        v-bind="comp.props"
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
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
