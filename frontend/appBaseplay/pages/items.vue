<template>


  <div>
    <AppHeader/>
    <div class="container">

      <h1>Items Page</h1>


    </div>
    <div v-if="!showTable" class="container">
      <h1>Items Form</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="content">Content:</label>

        </div>


        <div class="row">
          <div class="col-md-3 mb-3">
            <label class="form-label" for="validationCustom03"> media src</label>
            <input type="text" class="form-control" v-model="form.media.src" id="src" placeholder="" required="">

          </div>
          <div class="col-md-3 mb-3">
            <label class="form-label" for="validationCustom03"> Media type</label>
            <input type="text" class="form-control" v-model="form.media.type_" id="type_" placeholder="" required="">

          </div>


          <div class="col-md-3 mb-3">
            <label class="form-label" for="validationCustom04"> content extension</label>
            <input type="text" class="form-control" v-model="form.content.extension" placeholder="" required="">

          </div>
          <div class="col-md-3 mb-3">
            <label class="form-label" for="validationCustom05"> content text</label>
            <input type="text" class="form-control" v-model="form.content.text" placeholder="" required="">

          </div>
          <div class="col-md-3 mb-3">
            <label class="form-label" for="validationCustom05"> content quality</label>
            <input type="text" class="form-control" v-model="form.content.quality" placeholder="" required="">

          </div>
          <div class="col-md-3 mb-3">
            <label class="form-label" for="validationCustom05">content size</label>
            <input type="number" class="form-control" v-model="form.content.size" placeholder="" required="">

          </div>
          <div class="col-md-3 mb-3">
            <label class="form-label" for="validationCustom05"> content size unit</label>
            <input type="text" class="form-control" v-model="form.content.size_unit" placeholder="" required="">

          </div>


        </div>


        <div>
          <label for="item_type">Item Type:</label>
          <input class="form-control" type="text" id="item_type" v-model="form.item_type">
        </div>
        <div>
          <label for="slug">Slug:</label>
          <input class="form-control" type="text" id="slug" v-model="form.slug">
        </div>


        <div>
          <label for="creator">Creator:</label>
          <input class="form-control" type="text" id="creator" v-model="form.creator">
        </div>
        <div>
          <label for="creator">Category *:</label>
          <input class="form-control" type="text" id="category" v-model="form.categories">
        </div>


        <div class="">
          <label for="locale">Locale:</label>

          <div class="row">
            <div class="col-md-4 mb-3">
              <input class="form-control" type="text" v-model="form.locale.title" placeholder="Title">
            </div>
            <div class="col-md-4 mb-3">
              <input class="form-control" type="text" v-model="form.locale.description" placeholder="Description">
            </div>
            <div class="col-md-4 mb-3">
              <input class="form-control" type="text" v-model="form.locale.seo_title" placeholder="SEO Title">
            </div>
            <div class="col-md-4 mb-3">
              <input class="form-control" type="text" v-model="form.locale.summary" placeholder="Summary">
            </div>
            <div class="col-md-4 mb-3">
              <input class="form-control" type="text" v-model="form.locale.seo_description"
                     placeholder="SEO Description">
            </div>

          </div>

          <div class="row">

            <div class=" col-md-6">
              <label class="form-label" for="inputState">Categories (used Path but i am not using this one anymore
                )</label>
              <select id="category" v-model="form.category" class="form-select">
                <option v-for="category in categories" :value="category.id">{{ category.path }}</option>
              </select>
            </div>


            <div class="col-sm-6">
              <label for="use_seo_values">Use SEO Values:</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" value="option1" checked="" required
                       id="use_seo_values" v-model="form.locale.use_seo_values">
                <label class="form-check-label" for="gridRadios1">
                  Yes
                </label>
              </div>


              <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" value="option2" required
                       id="use_seo_values" v-model="form.locale.use_seo_values">
                <label class="form-check-label" for="gridRadios2">
                  No
                </label>
              </div>
              <br><br>
            </div>
          </div>


        </div>

        <div>

        </div>


        <span v-if="!isEditMode">
            <button class="btn btn-success" type="submit">Create</button>
              </span>

        <span v-if="isEditMode">
               <button class="btn btn-success" type="submit">Update</button>
            </span>
        <button class="btn btn-default" @click="showTable = true" v-if="!showTable">Cancel</button>


      </form>
    </div>

    <hr>
    <hr>


    <div v-if="showTable" class="container">

      <button @click="createItems" class="btn btn-primary"> Create Item</button>

      <Table :items="items"/>
    </div>


  </div>
</template>

<script>

import axios from 'axios'
import AppHeader from "../components/AppHeader.vue";
import Table from "@/components/items/Table.vue";
import {EventBus} from "@/events/event-bus.js";


export default {
  components: {AppHeader, Table},
  data() {
    return {
      showTable: true,
      isEditMode: false,
      items: [],
      categories: [],
      selectedCategories: [],
      form: {
        categories: [],
        content: {
          src: "",
          extension: "",
          text: "",
          quality: "",
          size: 0,
          size_unit: ""
        },
        item_type: '',
        category: '',
        slug: '',
        creator: '',
        locale: {
          title: '',
          description: '',
          seo_title: '',
          summary: '',
          seo_description: '',
          use_seo_values: false
        },
        media: {
          src: '',
          type_: '',

        },

      }
    }
  },
  mounted() {

    EventBus.$on('refresh-item', () => {
      this.getAllItems();
    })

    EventBus.$on('edit-item', (id) => {
      console.log('edit value', id); // Output: hello world


      this.isEditMode = true;
      this.showTable = false;

      let newFormObject = this.items.find(item => item._id === id);
      console.log('newFormObject', newFormObject)
      newFormObject.locale = newFormObject.locale[0];
      newFormObject.media = newFormObject.media[0];

      this.form = newFormObject;

      if (this.form.locale.use_seo_values == true) {
        this.form.locale.use_seo_values = 'option1';

      } else {
        this.form.locale.use_seo_values = 'option2';

      }


    });

    this.getAllItems();

    axios.get('http://localhost:4130/api/v1/category/all').then((response) => {
      this.categories = response.data.data.categories
    })
  },
  methods: {

    getAllItems: function () {
      axios.get('http://localhost:4130/api/v1/items/all').then((response) => {
        this.items = response.data.data.items;
      })
    },

    createItems() {
      this.showTable = false
    },
    submitForm() {

      if (this.form.locale.use_seo_values == true) {
      ///  this.form.locale.use_seo_values = 'option1';
        this.form.locale.use_seo_values = true;
      } else {
       // this.form.locale.use_seo_values = 'option2';
         this.form.locale.use_seo_values = false;
      }
console.log('this.form',this.form)
      const dataToPost =  {
        content: this.form.content,
        item_type: this.form.item_type,

        slug: this.form.slug,
        creator: this.form.creator,
        locale: {
          title: this.form.locale.title,
          description: this.form.locale.description,
          seo_title: this.form.locale.seo_title,
          summary: this.form.locale.summary,
          seo_description: this.form.locale.seo_description,
          use_seo_values: this.form.locale.use_seo_values
        },
        media:[{
          src: this.form.media.src,
          type_: this.form.media.type_,
        }],
        categories: this.form.categories
      };

      if (this.isEditMode) {
        dataToPost.id = this.form._id;
      }
      axios.post(this.isEditMode ? 'http://localhost:4130/api/v1/items/update' : 'http://localhost:4130/api/v1/items/save', dataToPost).then((res) => {
        console.log('response result', res);
        if (!res.data.success) {
          alert('Failed to create item')
          return;
        }
        this.showTable = true;
        this.isEditMode = false;
        alert(res.data.message);

        this.form =  {
          categories: [],
          content: {
            src: "",
            extension: "",
            text: "",
            quality: "",
            size: 0,
            size_unit: ""
          },
          item_type: '',
          category: '',
          slug: '',
          creator: '',
          locale: {
            title: '',
            description: '',
            seo_title: '',
            summary: '',
            seo_description: '',
            use_seo_values: false
          },
          media: {
            src: '',
            type_: '',

          },
        }


        this.getAllItems();

      }).catch((error) => {
        console.error(error)
        alert('Failed to create item')
      })
    }
  }
}
</script>
<style>
.container {
  justify-content: center;
  align-items: center;
  height: 100%;
}

select {
  display: block;
  width: 40%;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

select:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

</style>
