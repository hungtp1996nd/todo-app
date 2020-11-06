<template>
  <div class="container">
    <div class="mt-4 mb-4">
      <input type="text" placeholder="Add new task ..." class="input-group form-control" :value="item.title">
    </div>
    <div class="mb-4">
      <label for="description" style="float: left"><strong>Description</strong></label>
      <textarea type="text" id="description" class="input-group input-group-lg form-control" style="height: 200px" v-model="item.description"></textarea>
    </div>
    <div class="row">
      <div class="col-6">
        <label for="dueDate" style="float: left"><strong>Due Date</strong></label><br>
        <datepicker id="dueDate" v-model="item.due_date"></datepicker>
      </div>
      <div class="col-6">
        <label for="priority" style="float: left"><strong>Priority</strong></label>
        <select id="priority" class="input-group input-group-lg form-control" v-model="priority">
          <option v-for="(label, index) in labelList" :key="index">{{label}}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-5 mb-4">
      <button class="btn btn-success" style="width: 100%">Update</button>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  export default {
    name: "UpdateTask",
    data () {
      return {
        priority: '',
        labelList: ['Low', 'Normal', 'High']
      }
    },
    created() {
      this.priority = this.item.priority
    },
    components: {
      Datepicker
    },
    props: {
      item: Object
    },
    methods: {
    }
  }
</script>

<style>

</style>