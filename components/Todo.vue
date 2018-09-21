<template>
  <li :class="{ editing: todo.isEditing }">
    <form class="pure-form" v-show="!todo.isEditing">
      <label for="completed" class="pure-checkbox">
        <input type="checkbox" id="completed" class="toggle" :checked="todo.complete" @change="toggle">
      </label>
      <label @dblclick="edit">{{ todo.title | defaultText }}</label>
      <button class="pure-button button-error" type="button" @click="destroy"><i class="fa fa-times-circle "></i></button>
    </form>
    <input class="edit" type="text" v-show="todo.isEditing" ref="title" v-model="todo.title" placeholder="Type text"
      @blur="doneEdit" @keyup.enter="doneEdit">
  </li>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    name: "Todo",
    props: ['todo'],
    filters: {
      defaultText(text) {
        if (text == '') {
          return "(Double click to edit)"
        }
        return text
      }
    },
    watch: {
      'todo.isEditing'() {
        this.checkFocus()
      }
    },
    created() {
      this.checkFocus()
    },
    methods: {
      ...mapActions([
        'toggleTodo',
        'removeTodo',
        'editTodo',
        'addTodo',
      ]),
      doneEdit() {
        this.todo.isEditing = false
        if (this.todo.title == "") {
          this.removeTodo(this.todo)
        } else {
          this.editTodo(this.todo)
        }
      },
      destroy() {
        this.removeTodo(this.todo)
      },
      toggle() {
        this.toggleTodo(this.todo)
      },
      edit() {
        this.todo.isEditing = true
      },
      checkFocus() {
        if (this.todo.isEditing) {
          this.$nextTick(() => this.$refs.title.focus())
        }
      }
    }
  }

</script>

<style>
  form {
    display: grid;
    grid-template-columns: 3rem 1fr 3rem
  }

  li {
    list-style: none;
    background: #eee;
    padding: 8px;
    border-radius: 8px;
    margin: 2px;
  }
  .button-error {
    background: rgb(202, 60, 60);
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }

  .edit {
    width: calc(100% - 16px);
  }

  .editing {
    background-color: rgb(128, 128, 255)
  }
</style>
