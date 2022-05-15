<template>
    <CoverImage class="hidden sm:block" />
    
    <form class="mt-[21px] mb-[12px]">
      <h1 class="text-[24px] font-bold text-center">註冊帳號</h1>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px]" for="email">Email</label>
        <input 
        id="email" 
        class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
        type="text" placeholder="請輸入Email">
      </div>

      <div class="flex flex-col mb-[16px]">
        <label for="">您的暱稱</label>
        <input 
        id="name" 
        class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
        type="text" 
        placeholder="請輸入暱稱">
      </div>

      <div class="flex flex-col mb-[16px]">
        <label for="">密碼</label>
        <input 
        class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
        type="text" 
        placeholder="請輸入密碼">
      </div>

      <div class="flex flex-col mb-[16px]">
        <label for="">再次輸入密碼</label>
        <input 
        class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
        type="text" 
        placeholder="請再次輸入密碼">
      </div>

      <div class="flex flex-col justify-items-center items-center">
        <button class="w-[160px] h-[47px] mb-[24px] bg-secondary px-[12px] rounded-[10px] text-white">註冊帳號</button>
        <button class="mb-[24px] font-bold-700 text-secondary">登入</button>
      </div>
    </form>

</template>

<script>
import { ref, onMounted } from 'vue';
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
