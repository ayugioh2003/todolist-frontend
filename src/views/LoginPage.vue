<template>
  <div class="px-[32px] py-[48px] sm:flex sm:flex-row sm:items-center sm:justify-center sm:h-[100vh]">
    <div class="sm:mr-[6rem]">
      <LogoImage class="sm:mb-[20px] flex justify-center items-center" />
      <CoverImage class="hidden sm:block sm:h-[386px]" />
    </div>
  
    <form 
      class="mt-[21px] mb-[12px] sm:mt-0 sm:w-[300px]"
      @submit.prevent="checkForm"
    >
      <h1 class="whitespace-nowrap mb-[20px] text-[24px] font-bold text-center">
        最實用的線上代辦事項服務
      </h1>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="email">Email</label>
        <input 
          id="email" 
          class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
          type="email" placeholder="請輸入Email"
          v-model="email"
        />
        <span class="text-error text-[14px] font-bold mt-[4px]">
          {{ emailError }}
        </span>
      </div>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="password">密碼</label>
        <input 
        class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
        type="password" 
        placeholder="請輸入密碼"
        v-model="password"
        />
        <span class="text-error text-[14px] font-bold mt-[4px]">
          {{ passwordError }}
        </span>
      </div>

      <div class="flex flex-col justify-items-center items-center">
        <button 
          class="w-[160px] h-[47px] mb-[24px] bg-secondary px-[12px] rounded-[10px] text-white"
        >
          登入
        </button>
        <button 
          class="mb-[24px] font-bold-700 text-secondary"
        >
          <router-link :to="{ name: 'register' }">
            註冊帳號
          </router-link>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// Utils
import { useRouter } from 'vue-router'
import { useForm, useField, useSubmitForm } from 'vee-validate'
import { LoginSchema } from '@/utils/schema' 
import { showSuccess } from '@/utils/resHandle'
// API
import { signInAPI } from '@/api/user.js'
// Component
import LogoImage from '@/components/LogoImage'
import CoverImage from '@/components/CoverImage';

export default {
  components: {
    LogoImage,
    CoverImage
  },
  setup() {
    const router = useRouter()
    useForm({
      validationSchema: LoginSchema
    })

    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');

    // 檢查表單
    const checkForm = useSubmitForm(async(values, actions) => {
      const params = {
        user: {
          email: email.value,
          password: password.value
        }
      }
      fetchSignIn(params)
    })

    // 請求登入 API
    const fetchSignIn = async (params) => {
      const { message } = await signInAPI(params)
        
      if (message === '登入成功') {
        showSuccess({ content: `${message}` })
        router.push({ name: 'todo' })
      }
    }

    return {
      checkForm,
      email,
      emailError,
      password,
      passwordError,
    };
  },
};
</script>

<style>

</style>
