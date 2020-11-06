<template>
  <div class="container">
    <div class="mb-5">
      <h2><strong>New Task</strong></h2>
    </div>
    <div class="mb-4">
      <input type="text" placeholder="Add new task ..." class="input-group form-control" v-model="title">
    </div>
    <div class="mb-4">
      <label for="description" style="float: left"><strong>Description</strong></label>
      <textarea type="text" id="description" class="input-group input-group-lg form-control" style="height: 200px" v-model="description"></textarea>
    </div>
    <div class="row">
      <div class="col-6">
        <label for="dueDate" style="float: left"><strong>Due Date</strong></label><br>
        <datepicker v-model="dueDate" id="dueDate"></datepicker>
      </div>
      <div class="col-6">
        <label for="priority" style="float: left"><strong>Priority</strong></label>
        <select id="priority" class="input-group input-group-lg form-control" v-model="priority">
          <option v-for="(label, index) in labelList" :key="index">
            {{label}}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-5">
      <button class="btn btn-success" @click="addNewTask" style="width: 100%">Add</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment'
  export default {
    name: 'AddNewTask',
    data() {
      return {
        title: '',
        description: '',
        dueDate: '',
        priority: 'Normal',
        labelList: ['Low', 'Normal', 'High']
      }
    },
    components: {
      Datepicker
    },
    methods: {
      async addNewTask() {
        if (this.title != null && this.title != '') {
          await axios.post('http://localhost:3000/add', {
            due_date: moment(this.dueDate).format("YYYY/MM/DD HH:mm:ss"),
            title: this.title,
            description: this.description,
            priority: this.priority
          }).then(() =>{
            this.$router.push('/todo-list')
          }).catch(err => {
            console.log(err)
          })
        } else {
          alert('Please enter title')
        }
      }
    }
  }
</script>
import datetime from 'vuejs-datetimepicker';

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #dueDate {
    // Change layout of datepicker
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 90%;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;

    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
</style>
