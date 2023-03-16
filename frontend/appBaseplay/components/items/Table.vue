<template>
  <div>

    <div class="card">
      <div class="card-header">
        <h5>Items Listing Table</h5>

      </div>
      <div class="card-block table-border-style">
        <div class="table-responsive">
          <table class="table table-columned" >
            <thead>
            <tr>
              <th>Content</th>
              <th>Item Type</th>
              <th>Slug</th>
              <th>Creator</th>
              <th>Categories</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.content }}</td>
              <td>{{ item.item_type }}</td>
              <td>{{ item.slug }}</td>
              <td>{{ item.creator }}</td>
              <td>{{ item.categories.join(', ') }}</td>
              <td><button @click="editItem(item._id)"  class="btn btn-warning" >Edit</button></td>
              <td><button @click="deleteItem(item._id)"  class="btn btn-danger" >Delete</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>





  </div>
</template>

<script>
import axios from "axios";
import {EventBus} from "@/events/event-bus.js";

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {

    refreshgetAllItemss() {
      EventBus.$emit('refresh-item');
    },editItem(id){
      EventBus.$emit('edit-item',id);
    },


    deleteItem(id) {


      if (window.confirm("Are you sure about Deleting?")) {
        axios.post('http://localhost:4130/api/v1/items/delete', {id})
          .then(response => {
            console.log(response)
            alert(response.data.message);
            this.refreshgetAllItemss();
          })
          .catch(error => {
            console.log(error)
          });
      }
    }
  }
}
</script>
