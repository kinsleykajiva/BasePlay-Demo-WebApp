<template>
  <div>
    <div class="mb-3">


    </div>
    <table   class="table">
      <thead>
      <tr>
        <th>Category ID</th>
        <th>Slug</th>
        <th>Path</th>
        <th>Parent ID</th>
        <th>Locale Title</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr    v-for="category in categories" :key="category._id">
        <td>{{ category._id }}</td>
        <td>{{ category.slug }}</td>
        <td>{{ category.path }}</td>
        <td>{{ category.parent_id }}</td>
        <td>{{ category.locale.title }}</td>
        <td>
          <button @click="editCategory(category._id)" class="btn btn-default">Edit</button>
          <button @click="deleteCategory(category._id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"
import {EventBus} from "@/events/event-bus.js";



export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
   mounted() {

  },
  methods: {

    refreshCategories() {
      EventBus.$emit('refresh-categories');
    },editCategory(id){
      EventBus.$emit('edit-category',id);
    },
    deleteCategory(id) {
      if (window.confirm("Are you sure about Deleting?")) {
        axios.post('http://localhost:4130/api/v1/category/delete', {id})
          .then(response => {
            console.log(response)
            alert(response.data.message);

            this.refreshCategories();

          })
          .catch(error => {
            console.log(error)
          });
      }
    },

  }
}
</script>
