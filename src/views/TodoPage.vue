<template>
  <div class="h-[100vh] flex justify-start items-center flex-col px-8">
    <HeaderComponent />
    <div class="bg-half"></div>
    <div class="w-full flex justify-center">
      <form 
        class="flex mb-[16px] w-full relative max-w-[500px] flex-col"
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
            h-[47px] shadow-custom
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

    <div 
      v-if="allTodo && allTodo.length > 0"
      class="rounded-[10px] bg-white sm:w-[500px] w-full">
      <ul class="todolist__tabs flex items-center flex-row justify-around shadow-custom">
        <li 
          v-for="tab in tabs" 
          :key="tab.value"
          class="w-full" 
          @click="setTodoFilter(tab.value)"
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
              :checked="todo.completed_at"
              @click="updateTodo(todo.id)"
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
              <a href="#">{{ completeCount }}</a>
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

    <div v-else class="mt-[60px] flex flex-col justify-center items-center">
      <h2 class="text-[16px] font-normal">目前尚無待辦事項</h2>
      <img class="mt-[16px]" src="@/assets/empty.png" alt="目前尚無待辦事項">
    </div>
  </div>
</template>

<script>
// Utils
import { onMounted, ref, reactive, computed } from 'vue'
import { useForm, useField, useSubmitForm } from 'vee-validate'
import { TodoSchema } from '@/utils/schema'
import { showSuccess } from '@/utils/resHandle'
// API
import { getTodoListAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI, toggleTodoAPI } from '@/api/todo'
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


    let allTodo = ref([])
    let todos = ref([])
    const activeTab = ref('all')
    let completeCount = ref(0)

    // 表單驗證
    useForm({ validationSchema: TodoSchema })
    const { value: todo, errorMessage: todoError } = useField('todo');

    const setTodoFilter = (tab) => {
      activeTab.value = tab

      switch (tab) {
        case 'all':
          console.log('all')
          todos.value = allTodo.value
          break
        case 'no-completed':
          todos.value = allTodo.value.filter(todo => todo.completed_at === null)
          break
        case 'completed':
          todos.value = allTodo.value.filter(todo => todo.completed_at)
          break
      }
    }

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
      allTodo.value = res.todos
      todos.value = res.todos

      completeCount.value = allTodo.value.filter(item => item.completed_at).length 
    }

    // 新增 Todo
    const fetchCreateTodo = async (params) => {
      const { id, content } = await createTodoAPI(params)  
      
      // 處理成功
      if (id && content) {
        showSuccess({ content: `${content} 建立成功` })
        getTodoList()
      }
    }

    const deleteTodo = async (id) => {
      const { message } = await deleteTodoAPI(id)

      if (message === '已刪除') {
        showSuccess({ content: `${id} 刪除成功` })
        getTodoList()
      }
    }

    const updateTodo = async (id) => {
      const { id: todoId } = await toggleTodoAPI(id)

      if (todoId) {
        getTodoList()
        completeCount.value = todos.value.filter(item => item.completed_at === null).length 
        showSuccess({ content: `切換狀態成功` })
      }
    }

    // 清除已完成項目
    const clearCompletedTodo = async (id) => {
      await updateTodoAPI(id)
    }

    return {
      allTodo,
      tabs,
      activeTab,
      HeaderComponent,
      checkForm,
      todos,
      todo,
      todoError,
      fetchCreateTodo,
      clearCompletedTodo,
      deleteTodo,
      updateTodo,
      completeCount,
      setTodoFilter
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
  background: linear-gradient(172.7deg, #FFD370 5.12%, #FFD370 53.33%, #FFD370 53.44%, #FFFFFF 53.45%, #FFFFFF 94.32%);
  position: absolute;
  top: 0px;
  left: 0;
  z-index: -1;
}

.check-input:checked + span{
  text-decoration: line-through;
  @apply text-checked;
}


</style>