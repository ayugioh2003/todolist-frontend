<template>
  <div class="px-[32px] py-[48px] sm:flex sm:flex-row sm:items-center sm:justify-center sm:h-[100vh]">
    <div class="sm:mr-[6rem]">
      <LogoImage class="sm:mb-[20px] flex justify-center items-center" />
      <CoverImage class="hidden sm:block sm:h-[386px]" />
    </div>

    <!-- 登入 -->
    <LoginPage 
      v-if="isRegister"
      @changePage="changePage" 
    />

    <!-- 註冊 -->
    <RegisterPage 
      v-else 
      @changePage="changePage" 
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import LoginPage from '@/components/LoginPage';
import RegisterPage from '@/components/RegisterPage';
import LogoImage from '@/components/LogoImage'
import CoverImage from '@/components/CoverImage';

export default {
  name: 'HomeView',
  components: {
    LoginPage,
    RegisterPage,
    LogoImage,
    CoverImage
  },

  setup() {
    const isRegister = ref(false);

    const changePage = (page) => {
      isRegister.value = page === 'register'
    }

    return {
      isRegister,
      LogoImage,
      CoverImage,
      changePage
    };
  },
};
</script>
