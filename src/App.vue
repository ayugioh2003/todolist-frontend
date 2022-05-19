<template>
  <div :class="{ 'bg-primary': !isTodoPage }" class="relative h-[100vh]">
    <div class="mx-auto container">
      <router-view/>
    </div>
  </div>
</template>

<script>
// Utils
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
      const route = useRoute();
      const isTodoPage = computed(() => {
        return route.name === "todo";
      })
      
      return {
          isTodoPage
      };
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