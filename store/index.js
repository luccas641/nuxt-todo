import Vuex from 'vuex'

const store = function () {
  return new Vuex.Store({
    state: {
      todos: [],
      ids: 0
    },
    getters: {
      allTodos: state => state.todos,
      completedTodos: state => state.todos.filter(todo => todo.complete),
      incompletedTodos: state => state.todos.filter(todo => !todo.complete),
    },
    mutations: {
      addTodo (state, todo) {
        todo.id = state.ids++
        state.todos.push(todo)
      },
      editTodo (state, todo) {
        let todoIndex = state.todos.findIndex((currentTodo) => currentTodo.id == todo.id)
        state.todos[todoIndex] = todo
      },
      setTodos (state, todos) {
        state.todos = todos
      },
      removeTodo (state, todo) {
        state.todos = state.todos.filter((currentTodo) => currentTodo !== todo)
      }
    },
    actions: {
      addTodo ({commit}, todo) {
        commit('addTodo', todo)
      },
      editTodo ({commit}, todo) {
        commit('editTodo', todo)
      },
      toggleAll ({commit, state}) {
        let todos = state.todos.map((todo) => {
          return {
            ...todo,
            complete: !todo.complete
          }
        })
        commit('setTodos', todos)
      },
      removeTodo ({commit}, todo) {
          commit('removeTodo', todo)
      },
      toggleTodo ({commit}, todo) {
        todo.complete = !todo.complete
        commit('editTodo', todo)
      },
      clearCompletedTodos ({commit, getters}) {
        commit('setTodos', getters.incompletedTodos)
      },
    }
  })
}

export default store