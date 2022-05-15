<template>
    <Form 
      :validation-schema="schema"
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
          @click="changePage"
        >
          登入
        </button>
      </div>
    </form>

</template>

<script>
// Utils
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter } from "vue-router";
import { Field, Form } from "vee-validate";
import { useForm, useField, useIsFormValid, useSubmitForm } from 'vee-validate';
import * as yup from 'yup';
import Swal from 'sweetalert2'
// API
import { signUpAPI } from '@/api/user.js'

export default defineComponent({
  components: {
    Field,
    Form,
  },
  setup(props, { emit }) {
    const router = useRouter()
    const form = ref(null) // undefined
    const schema = yup.object().shape({
      email: yup.string().required('此欄位不可為空').email('Email 格式無效'),
      name: yup.string().required('此欄位不可為空').min(2, '暱稱至少兩字'),
      password: yup.string().required('此欄位不可為空').min(6, '密碼必須至少 6 字'),
      confirmPassword: yup.string().required('此欄位不可為空').min(6, '密碼必須至少 6 字').oneOf([yup.ref('password')], '密碼與再次輸入密碼不同')
    });

    useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');
    const { value: name, errorMessage: nameError } = useField('name');
    const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword');

    // 切換頁面
    const changePage = () => emit('changePage', 'register')

    // 送出請求
    const checkForm = useSubmitForm(async (values, actions) => {  
      const params = {
        user: {
          email: email.value,
          name: name.value,
          password: password.value
        }
      }
      await fetchSignUp(params)
    })

    // 請求註冊 API
    const fetchSignUp = async (params) => {
      const { message } = await signUpAPI(params)
      
        if (message === '註冊成功') {
          Swal.fire({
            icon: 'success',
            title: `成功`,
            html: message,
          })

          // 跳轉頁面
          router.push({ name: 'home', params: { isRegister: false } })
        }
    }

    return {
      form,
      checkForm,
      changePage,
      schema,
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
});
</script>

<style>

</style>
