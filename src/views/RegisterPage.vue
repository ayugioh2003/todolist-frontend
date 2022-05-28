<template>
  <div class="px-[32px] py-[48px] sm:flex sm:flex-row sm:items-center sm:justify-center sm:h-[100vh]">
    <div class="sm:mr-[6rem]">
      <LogoImage class="sm:mb-[20px] flex justify-center items-center" />
      <CoverImage class="hidden sm:block sm:h-[386px]" />
    </div>

    <Form 
      :validation-schema="RegisterSchema"
      class="mt-[21px] mb-[12px] sm:mt-0 sm:w-[300px]"
      @submit="checkForm"
      ref="form"
    >
      <h1 class="text-[24px] font-bold text-center">註冊帳號</h1>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="email">Email</label>
        <Field 
          name="email"
          id="email" 
          class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
          type="email" placeholder="請輸入Email"
          v-model="email"
          />
        <span class="text-error text-[14px] font-bold mt-[4px]">{{ emailError }}</span>
      </div>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="name">您的暱稱</label>
        <Field 
          name="name"
          id="name" 
          class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
          type="text" 
          placeholder="請輸入暱稱"
          v-model="name"
        />
        <span class="text-error text-[14px] font-bold mt-[4px]">
          {{ nameError }}
        </span>
      </div>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="password">密碼</label>
        <Field 
          name="password"
          class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
          type="password" 
          placeholder="請輸入密碼"
          v-model="password"
        />
        <span class="text-error text-[14px] font-bold mt-[4px]">
          {{ passwordError }}
        </span>
      </div>

      <div class="flex flex-col mb-[16px]">
        <label class="text-[14px] font-bold" for="confirmPassword">再次輸入密碼</label>
        <Field 
          name="confirmPassword"
          class="placeholder:text-placholder px-[16px] py-[12px] rounded-[10px] mt-[4px]"
          id="confirmPassword"
          type="password" 
          placeholder="請再次輸入密碼"
          v-model="confirmPassword"
        />
        <span class="text-error text-[14px] font-bold mt-[4px]">
          {{ confirmPasswordError }}
        </span>
      </div>

      <div class="flex flex-col justify-items-center items-center">
        <button 
          class="w-[160px] h-[47px] mb-[24px] bg-secondary px-[12px] rounded-[10px] text-white"
          @click="checkForm"
        >
          註冊帳號
        </button>
        <button 
          class="mb-[24px] font-bold-700 text-secondary"
        >
          <router-link :to="{name: 'login'}">
            登入
          </router-link>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// Utils
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";
import { Field, Form } from "vee-validate";
import { useForm, useField, useSubmitForm } from 'vee-validate';
import { RegisterSchema } from '@/utils/schema'
import { showSuccess } from '@/utils/resHandle'
// API
import { signUpAPI } from '@/api/user.js'
// Component
import LogoImage from '@/components/LogoImage'
import CoverImage from '@/components/CoverImage';

export default {
  components: {
    LogoImage,
    CoverImage,
    Field,
    Form,
  },
  setup() {
    const router = useRouter()
    const form = ref(null) // undefined
    const user = reactive({
      email: '',
      nickname: ''
    })
    
    useForm({
      validationSchema: RegisterSchema,
    });

    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');
    const { value: name, errorMessage: nameError } = useField('name');
    const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword');

    // 送出請求
    const checkForm = useSubmitForm(async (values, actions) => {  
      const params = {
        user: {
          email: email.value,
          nickname: name.value,
          password: password.value
        }
      }
      await fetchSignUp(params)
    })

    // 請求註冊 API
    const fetchSignUp = async (params) => {
      const { message, nickname } = await signUpAPI(params)

        if (message === '註冊成功') {
          sessionStorage.setItem('nickname', nickname)
          showSuccess({ content: `${message}` })
          // 跳轉頁面
          router.push({ name: 'login', params: { isRegister: false } })
        }
    }

    return {
      user,
      form,
      checkForm,
      RegisterSchema,
      email,
      emailError,
      password,
      passwordError,
      name,
      nameError,
      confirmPassword,
      confirmPasswordError,
    };
  },
};
</script>

<style>

</style>
