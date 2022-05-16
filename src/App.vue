<template>
<div :class="{ 'bg-primary': !isTodoPage }">
  <div class="mx-auto container">
    <router-view/>
  </div>
</div>
</template>

<script>
import { useRoute, useLink } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const isTodoPage = route.name === 'todo'

    return {
      isTodoPage
    }
  },
}
</script>

<style lang="scss">
body {
  font-family: "Noto Sans TC";
  width: 100%;
  height: 100%;
}
#app {
  font-size: 14px;
  
}
</style>