<template>
    <form 
      class="mt-[21px] mb-[12px] sm:mt-0 sm:w-[300px]"
      @submit.prevent="checkForm"
    >
      <h1 class="text-[24px] font-bold text-center">最實用的線上代辦事項服務</h1>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="email">Email</label>
        <input 
          id="email" 
          class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
          type="email" placeholder="請輸入Email"
          required />
        <span class="text-error text-[14px] font-bold mt-[4px]">此欄位不可為空</span>
      </div>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="password">密碼</label>
        <input 
        class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
        type="password" 
        placeholder="請輸入密碼"
        required>
        <span class="text-error text-[14px] font-bold mt-[4px]">請輸入密碼</span>
      </div>

      <div class="flex flex-col justify-items-center items-center">
        <button 
          class="w-[160px] h-[47px] mb-[24px] bg-secondary px-[12px] rounded-[10px] text-white"
          
        >
          登入
        </button>
        <button 
          class="mb-[24px] font-bold-700 text-secondary"
          @click="changePage"
        >
          註冊帳號
        </button>
      </div>
    </form>

</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';

export default defineComponent({
  components: {
    
  },
  setup(props, { emit }) {
    onMounted(() => console.log('component mounted!'));

    // 切換頁面
    const changePage = () => emit('changePage', 'login')
    const checkForm = () => {

    }

    return {
      checkForm,
      changePage
    };
  },
});
</script>

<style>

</style>
