<template>
  <div class="h-[100vh] flex justify-start items-center flex-col px-8">
    <HeaderComponent />
    <div class="bg-half"></div>
    <div class="w-full">
      <form 
        class="flex mb-[16px] w-full relative shadow-custom"
        @submit.prevent="checkForm"
      >
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
          @click="checkForm()"
        >
          <img src="../assets/add.svg" alt="Create Todo">
        </a>
      </form>
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
            v-for="todo in todos"
            :key="todo.id"
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
            <span>{{ todo.content }}</span>
            <a 
              class="delete ml-auto mr-[18px]" 
              @click="deleteTodo(todo.id)"
            >
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
import { TodoSchema } from '@/utils/schema'
import { showSuccess } from '@/utils/resHandle'
// API
import { getTodoListAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI } from '@/api/todo'
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
    let todos = ref([])


    useForm({ validationSchema: TodoSchema })
    const { value: todo, errorMessage: todoError } = useField('todo');

    // 檢查表單
    const checkForm = useSubmitForm(async(values, actions) => {
      const params = {
        todo: {
          content: todo.value
        }
      }

      // 請求 API
      fetchCreateTodo(params)

    })

    onMounted(() => {
      getTodoList()
    })

    // 請求清單
    const getTodoList = async () => {
      const res = await getTodoListAPI()
      todos.value = res.todos
    }

    // 新增 Todo
    const fetchCreateTodo = async (params) => {
      try {
        const { id, content } = await createTodoAPI(params)        
        if (id && content) handleSuccessCreateTodo(content)
      } catch (error) {
        console.error(error)
      }
    }

    const handleSuccessCreateTodo = (content) => {
      showSuccess({ content: `${content} 建立成功` })
      getTodoList()
    }

    const deleteTodo = async (id) => {
      try {
        const { message } = await deleteTodoAPI(id)

        if (message === '已刪除') {
          showSuccess({ content: `${id} 刪除成功` })
          getTodoList()
        }
      } catch (error) {
        console.error(error)
      }
    }

    // 清除已完成項目
    const clearCompletedTodo = async () => {

    }

    return {
      tabs,
      activeTab,
      HeaderComponent,
      checkForm,
      todos,
      todo,
      todoError,
      fetchCreateTodo,
      clearCompletedTodo,
      deleteTodo
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