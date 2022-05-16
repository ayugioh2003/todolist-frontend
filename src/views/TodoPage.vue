<template>
  <div >
    <HeaderComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header';
export default {
  name: 'TodoPage',
  components: {
    HeaderComponent
  },

  setup() {

    return {
      HeaderComponent
    }
  }

};
</script>
