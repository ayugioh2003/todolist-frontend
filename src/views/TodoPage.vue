<template>
  <div class="h-[100vh] flex justify-start items-center flex-col px-8">
    <HeaderComponent />
    <div class="bg-half"></div>
    <div class="flex mb-[16px] w-full relative shadow-custom">
      <input 
        v-model="todo"
        type="text"
        placeholder="新增待辦事項"
        class="
          w-full leading-[23px] text-[16px] 
          color-placeholder px-[12px] py-[16px] 
          rounded-[6px] border-0 bg-white
          h-[47px]
        "
      />
      <span class="text-error text-[14px] font-bold mt-[4px]">
        {{ todoError }}
      </span>
      <a
        class="absolute right-[15px] top-[4px]" 
        @click="addNewTodo()"
      >
        <img src="../assets/add.svg" alt="Create Todo">
      </a>
    </div>

    <div class="rounded-[10px] bg-white w-full">
      <ul class="todolist__tabs flex items-center flex-row justify-around shadow-custom">
        <li 
          v-for="tab in tabs" 
          :key="tab.value"
          class="w-full" 
          @click="activeTab = tab.value"
        >
          <a 
            href="#" 
            :class="{ active: activeTab === tab.value }"
            class="
              inline-flex justify-center items-center h-[51px] relative w-full
              after:content-[''] after:w-full after:absolute after:left-0 after:bottom-0 after:bg-border
              after:h-[2px] after:transition-all
            ">
            {{ tab.name }}
          </a>
        </li>
      </ul>

      <!-- Todo 列表 -->
      <div>
        <ul class="todolist__table">
          <li 
            v-for="n in 6"
            :key="n"
            class="flex justify-start items-center pl-[16px] h-[88px] border-b border-checked"
          >
            <input
              type="checkbox"
              class="
                check-input
                w-[20px] h-[20px] mr-[16px] rounded-[5px]
                checked:text-checked checked:line-through
                border-placeholder-500
              "
            >
            <span>爆肝趕作業</span>
            <a class="delete ml-auto mr-[18px]" href="#">
              <i class="fa fa-x"></i>
            </a>
          </li>
        </ul>

        <!-- 完成 -->
        <div class="h-[88px] flex justify-evenly items-center">
          <span>
              <a href="#">0</a>
            個已完成項目
          </span>
          <span 
            class="cursor-pointer text-placeholder" 
            @lick="clearCompletedTodo"
          >
            清除已完成項目
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Utils
import { onMounted, ref, reactive } from '@vue/runtime-core'
import { useForm, useField, useSubmitForm } from 'vee-validate'
import Swal from 'sweetalert2'
import { TodoSchema } from '@/utils/schema'
// API
import { getTodoListAPI } from '@/api/todo'
// Components
import HeaderComponent from '@/components/Header';

export default {
  name: 'TodoPage',
  components: {
    HeaderComponent
  },

  setup() {

    const tabs = reactive([
      { name: '全部', value: 'all' },
      { name: '待完成', value: 'no-completed' },
      { name: '已完成', value: 'completed' }
    ])

    const activeTab = ref('all')


    useForm({ validationSchema: TodoSchema })
    const { value: todo, errorMessage: todoError } = useField('todo');

    // 檢查表單
    const checkForm = useSubmitForm(async(values, actions) => {
      
    })

    onMounted(() => {
      getTodoList()
    })

    const getTodoList = async () => {
      await getTodoListAPI()
    }

    // 新增 Todo
    const addNewTodo = async () => {

    }

    // 清除已完成項目
    const clearCompletedTodo = async () => {

    }

    return {
      tabs,
      activeTab,
      HeaderComponent,
      checkForm,
      todo,
      todoError,
      addNewTodo,
      clearCompletedTodo
    }
  }

};
</script>

<style lang="postcss" scoped>
.todolist__tabs a.active:after {
  @apply bg-secondary;
}

.bg-half {
  width: 100%;
  height: 100vh;
  background: linear-gradient(175deg, #ffd370 100%, #fff 0%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 46%, 0 69%);
          clip-path: polygon(0 0, 100% 0, 100% 46%, 0 69%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.check-input:checked + span{
  text-decoration: line-through;
  @apply text-checked;
}


</style>