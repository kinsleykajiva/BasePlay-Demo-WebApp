<template>
  <table>
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
      <td><button @click="editItem(item)"  class="btn btn-warning" >Edit</button></td>
      <td><button @click="deleteItem(item)"  class="btn btn-danger" >Delete</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    editItem(item) {

    },
    deleteItem(item) {

    }
  }
}
</script>
