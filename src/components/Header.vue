<template>
  <header class="flex flex-row items-center justify-between py-[32px] w-full">
    <router-link :to="{ name: 'todo' }">
      <LogoImage class="h-[54px] w-[242px] flex justify-center items-center" />
    </router-link>
    <div class="flex flex-row items-center">
      <span 
        v-if="nickname"
        class="hidden sm:block sm:mr-[24px] font-bold text-secondary text-[14px] sm:text-[16px]">
        {{ nickname }} 的代辦
      </span>
      <button 
        class="whitespace-nowrap text-[14px] sm:text-[16px]"
        @click="fetchSignOut"
      >
        登出
      </button>
    </div>
  </header>
</template>

<script>
// Utils
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/token'
import { onMounted, ref } from 'vue'
// API
import { signOutAPI } from '@/api/user'
// Components
import LogoImage from '@/components/LogoImage';
import Swal from 'sweetalert2'

export default {
  name: 'HeaderComponent',
  components: {
    LogoImage
  },

  setup() {
    const router = useRouter()
    const nickname = ref()


    // 請求登出
    const fetchSignOut = async () => {
      
      try {
        const { message } = await signOutAPI()
        
        if (message && message === '已登出') {
          Swal.fire({
            icon: 'success',
            title: `成功`,
            html: message,
          })

          // 移除 Token
          removeToken()

          // 跳轉至登入頁
          router.push({ name: 'login' })
        }
      } catch (error) {
        removeToken()
      }
    }

    onMounted(() => {
      nickname.value = sessionStorage.getItem('nickname', nickname)
    })

    return {
      LogoImage,
      fetchSignOut,
      nickname,
    }
  }
}
</script>

<style>

</style>