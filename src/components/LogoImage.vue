<template>
<div>
  <img :src="image" alt="Logo">
</div>
</template>

<script>
import { ref } from 'vue';

export default {

  setup() {
    const image = ref(require('@/assets/logo.png'));

    return {
      image,
    };
  },
};
</script>

<style>

</style>
