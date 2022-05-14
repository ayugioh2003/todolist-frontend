<template>
  <div>
    Login
    <CoverImage />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import CoverImage from '@/components/CoverImage';

export default {
  components: {
    CoverImage,
  },
  setup() {
    onMounted(() => console.log('component mounted!'));

    return {
      CoverImage,
    };
  },
};
</script>

<style>

</style>
