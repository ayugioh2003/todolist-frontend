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
          @click="changePage"
        >
          註冊帳號
        </button>
      </div>
    </form>

</template>

<script>
// Utils
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import { useForm, useField, useSubmitForm } from 'vee-validate'
import * as yup from 'yup'
import { LoginSchema } from '@/utils/schema' 
import Swal from 'sweetalert2'
// API
import { signInAPI } from '@/api/user.js'

export default defineComponent({
  setup(props, { emit }) {
    const router = useRouter()
    useForm({
      validationSchema: LoginSchema
    })

    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');

    // 切換頁面
    const changePage = () => emit('changePage', 'login')

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
        Swal.fire({
          icon: 'success',
          title: `成功`,
          html: message,
        })
        router.push({ name: 'todo' })
      }

    }

    return {
      checkForm,
      changePage,
      email,
      emailError,
      password,
      passwordError,
    };
  },
});
</script>

<style>

</style>
