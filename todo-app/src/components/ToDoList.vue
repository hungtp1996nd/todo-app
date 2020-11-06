<template>
  <div class="container" v-if="todoList.length > 0">
    <div class="mt-4 mb-5">
      <h2><strong>To Do List</strong></h2>
    </div>
    <div class="mt-4">
      <input type="text" placeholder="Search ..." class="input-group form-control" v-model="search" @keyup.enter="searchingByTitle()">
    </div>
    <div class="mt-4">
      <div v-for="(item, index) in todoList" :key="index">
        <div class="card mt-4 card-block d-flex" style="height: 60px">
          <div class="row">
            <div class="col-1 card-body align-items-center d-flex justify-content-center">
              <input type="checkbox" style="justify-content: center">
            </div>
            <div class="col-5 card-body">
              <span class="textModify">{{item.title}}</span>
            </div>
            <div class="col-6 btnPosition">
              <div class="float-right">
                <button class="btn btn-info" style="margin-right: 30px" @click="item.show = !item.show">Detail</button>
                <button class="btn btn-danger" @click="removeItem(item.id)">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="item.show" class="card">
          <update-task :item="item"></update-task>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="card">
      No task in the list.
    </div>
  </div>
</template>

<script>
import UpdateTask from "./UpdateTask";
import Vue from 'vue'
import axios from 'axios'
export default {
  name: "ToDoList",
  components: {UpdateTask},
  data () {
    return {
      search: '',
      todoList: []
    }
  },
  async created() {
    let res = await axios.get('http://localhost:3000/list');
    this.todoList = res.data
    for(let i = 0; i < this.todoList.length; i++) {
      Vue.set(this.todoList[i], 'show', false);
      this.todoList[i].due_date = this.todoList[i].due_date.substring(0,10)
    }
  },
  methods: {
    searchingByTitle() {
      axios.get('http://localhost:3000/search', {
        params: {
          keyword: this.search
        }
      }).then(res => {
        this.todoList = res.data
        console.log(this.todoList)
      }).catch(err => {
        console.log(err)
      })
    },
    removeItem (id) {
      axios.get('http://localhost:3000/delete/' + id).then(res => {
        this.todoList = res.data
        this.todoList.forEach(item => {
          item.show = false
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .textModify {
    float: left;
    font-weight: bold;
    font-size: 16px;
  }
  .btnPosition {
    margin-top: 10px;
    padding-right: 40px;
  }
</style>
