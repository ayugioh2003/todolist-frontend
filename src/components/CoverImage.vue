<template>
<div>
  HomeCover
  <img :src="image" alt="">
</div>
</template>

<script>
import { ref } from 'vue';

export default {

  setup() {
    const image = ref(require('@/assets/index-left.png'));

    return {
      image,
    };
  },
};
</script>

<style>

</style>
