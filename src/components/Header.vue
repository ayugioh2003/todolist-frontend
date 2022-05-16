<template>
  <header class="flex flex-row items-center justify-between px-[32px]">
    <router-link :to="{ name: 'todo' }">
      <LogoImage class="h-[54px] w-[242px] flex justify-center items-center" />
    </router-link>
    <div class="flex flex-row items-center">
      <span class="hidden sm:block sm:mr-[24px] font-bold text-secondary text-[14px] sm:text-[16px]">
        王小明的代辦
      </span>
      <button class="whitespace-nowrap text-[14px] sm:text-[16px]">登出</button>
    </div>
  </header>
</template>

<script>
import LogoImage from '@/components/LogoImage';

export default {
  name: 'HeaderComponent',
  components: {
    LogoImage
  },

  setup() {

    return {
      LogoImage
    }
  }
}
</script>

<style>

</style>