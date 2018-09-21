<template>
  <section class="todoapp">
    <header class="header">
      <h1>ToDo List</h1>
      <button class="pure-button pure-button-primary" @click="newTodo"><i class="fa fa-add"></i>Add Todo</button>
    </header>
    <section class="main">
      <label for="toggle-all" class="pure-checkbox">
        <input type="checkbox" id="toggle-all" :checked="numTodos === numCompletedTodos" @change="toggleAll">
        Mark all as complete
      </label>
      <ul class="todo-list">
        <todo :todo="todo" v-for="todo in todos" :key="todo.id"></todo>
      </ul>
    </section>
    <footer>
      <span>
        <strong>{{ numRemainingTodos }}</strong> item{{ numRemainingTodos === 1 ? '' : 's' }} left
      </span>
      <router-link to="/" exact class="pure-button" active-class="pure-button-active">All</router-link>
      <router-link to="/active" exact class="pure-button" active-class="pure-button-active">Active</router-link>
      <router-link to="/completed" exact class="pure-button" active-class="pure-button-active">Completed</router-link>
      <button class="pure-button" @click="clearCompletedTodos" v-if="numCompletedTodos > 0">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import Todo from './Todo'
  export default {
    name: 'Todos',
    components: {
      Todo
    },
    computed: {
      ...mapGetters([
        'allTodos',
        'completedTodos',
        'incompletedTodos',
      ]),
      numRemainingTodos() {
        return this.incompletedTodos.length
      },
      numCompletedTodos() {
        return this.completedTodos.length
      },
      numTodos() {
        return this.allTodos.length
      },
      todos() {
        if (this.$route.params.status === "active") {
          return [...this.incompletedTodos].reverse()
        } else if (this.$route.params.status === "completed") {
          return [...this.completedTodos].reverse()
        } else {
          return [...this.allTodos].reverse()
        }
      }
    },
    methods: {
      ...mapActions([
        'toggleTodo',
        'removeTodo',
        'addTodo',
        'toggleAll',
        'clearCompletedTodos'
      ]),
      async newTodo() {
        this.addTodo({
          title: '',
          complete: false,
          isEditing: true
        })
      },
    }
  }

</script>

<style>
  h1 {
    width: 100%;
    font-size: 4rem;
    font-weight: 100;
    text-align: center;
    color: rgba(66, 47, 175, 0.25);
  }

  ul {
    padding: 0px;
  }

  .todoapp {
    display: grid;
    grid-row-gap: 20px;
    margin-top: 25%;
    padding: 16px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  footer {
    display: grid;    
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

  @media only screen and (min-width: 500px) {
    footer {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 2fr
    }
  }

</style>
