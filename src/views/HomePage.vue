<template>
  <div class="container px-[32px] py-[48px] bg-primary">
    <LogoImage class="flex justify-center items-center" />
    <LoginPage v-if="isRegister" />
    <RegisterPage v-else />
  </div>
</template>

<script>
import { ref } from 'vue';
import LoginPage from '@/components/LoginPage';
import RegisterPage from '@/components/RegisterPage';
import LogoImage from '@/components/LogoImage'

export default {
  name: 'HomeView',
  components: {
    LoginPage,
    RegisterPage,
    LogoImage
  },

  setup() {
    const isRegister = ref(false);

    return {
      isRegister,
      LogoImage
    };
  },
};
</script>
