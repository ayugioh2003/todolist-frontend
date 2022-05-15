<template>
<div class="inline-block">
  <img :src="image" class="mx-auto text-center" alt="Cover Image">
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
