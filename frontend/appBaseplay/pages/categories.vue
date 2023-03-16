<template>

  <div>
    <AppHeader/>

    <div class="container">
      <div>
        <div v-if="!showTable">

          <h2>Create Category</h2>
          <form @submit.prevent="addCategory">
            <div class="form-group row">


              <div class="col-sm-6 ">
                <label for="slug">Slug:</label>
                <input class="form-control" id="slug" v-model="newCategory.slug" type="text" required>
                <br>
              </div>


              <div class="col-sm-6 ">
                <label for="path">Path:</label>
                <input class="form-control" id="path" v-model="newCategory.path" type="text"
                       required>
                <br>
              </div>


              <div class="col-sm-6 ">
                <label for="title"> Locale Title:</label>
                <input class="form-control" id="title" v-model="newCategory.locale.title" type="text" required>
                <br>
              </div>

              <div class="col-sm-6 ">
                <label for="description"> locale Description:</label>
                <input class="form-control" id="description" v-model="newCategory.locale.description" type="text"
                       required>
                <br>
              </div>
            </div>


            <div class="form-group row">
              <div class="col-sm-6 ">


                <label for="seo_title">SEO Title:</label>
                <input class="form-control" id="seo_title" v-model="newCategory.locale.seo_title" type="text" required>
                <br>

              </div>

              <div class="col-sm-6 ">
                <label for="summary"> locale Summary:</label>
                <input class="form-control" id="summary" v-model="newCategory.locale.summary" type="text" required>
                <br>


                <br>
              </div>
            </div>


            <div class="form-group row">
              <div class="col-sm-6">
                <label for="seo_description"> locale SEO Description: </label>
                <input class="form-control" id="seo_description" v-model="newCategory.locale.seo_description"
                       type="text"
                       required>
              </div>
              <div class="col-sm-6">
                <label for="use_seo_values">Use SEO Values:</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" value="option1" checked="" required
                         id="use_seo_values" v-model="newCategory.locale.use_seo_values">
                  <label class="form-check-label" for="gridRadios1">
                    Yes
                  </label>
                </div>


                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" value="option2" required
                         id="use_seo_values" v-model="newCategory.locale.use_seo_values">
                  <label class="form-check-label" for="gridRadios2">
                    No
                  </label>
                </div>
                <br><br>
              </div>
            </div>

            <div class="form-group row">

              <div class="col-sm-6 ">
                <label for="ancestor_ids">Ancestor IDs (Comma Separate)</label>
                <input class="form-control" id="ancestor_ids" v-model="newCategory.ancestor_ids" type="text"
                       required>
                <br>
              </div>
              <div class="col-sm-6 ">
                <label for="parent_id">Parent ID </label>
                <input class="form-control" id="parent_id" v-model="newCategory.parent_id" type="text"
                       required>
                <br>
              </div>

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

        <div v-if="showTable">
          <h1>Categories</h1>
          <button @click="createCategory" class="btn btn-primary"> Create Category</button>
          <categories-table :categories="categories"/>
        </div>


      </div>

    </div>
  </div>
</template>


<script>
import axios from "axios";
import AppHeader from "../components/AppHeader.vue";
import CategoriesTable from "@/components/categories/CategoriesTable.vue";
import {EventBus} from "@/events/event-bus.js";

export default {
  components: {CategoriesTable, AppHeader},
  data() {
    return {
      showTable: true,
      isEditMode: false,
      categories: [],
      newCategory: {
        path: '',
        id: '',
        slug: '',
        ancestor_ids: '',
        parent_id: '',
        locale: {
          title: '',
          description: '',
          seo_title: '',
          summary: '',
          seo_description: '',
          use_seo_values: ''
        }

      },
      selectedCategory: '',

    };
  },

  async mounted() {
    this.fetchCategories();

    EventBus.$on('refresh-categories', () => {
      this.fetchCategories();
    })

    EventBus.$on('edit-category', (id) => {
      console.log('edit value', id); // Output: hello world
      this.editCategory(id);
    });
  },
  methods: {

    editCategory(id) {
      this.isEditMode = true;
      this.showTable = false;

      let newCategoryObject = this.categories.find(category => category._id === id);
      newCategoryObject.locale = newCategoryObject.locale[0];
      newCategoryObject.ancestor_ids = newCategoryObject.ancestor_ids.join(',');
      this.newCategory = newCategoryObject;

      if (this.newCategory.locale.use_seo_values == true) {
        this.newCategory.locale.use_seo_values = 'option1';
       // this.newCategory.locale.use_seo_values = true;
      } else {
        this.newCategory.locale.use_seo_values = 'option2';
       // this.newCategory.locale.use_seo_values = false;
      }


    },
    createCategory() {
      // navigate to the page where you can create a new category
      this.showTable = false;


    }
    , fetchCategories: function () {
      axios.get('http://localhost:4130/api/v1/category/all')
        .then(response => {
          this.categories = response.data.data.categories
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCategory() {

      if (this.newCategory.locale.use_seo_values == 'option1') {
        this.newCategory.locale.use_seo_values = true;
      } else {
        this.newCategory.locale.use_seo_values = false;
      }
      this.newCategory.ancestor_ids = this.newCategory.ancestor_ids.split(',');


      const dataToPost = {
        path: this.newCategory.path,
        id: '',
        slug: this.newCategory.slug,
        ancestor_ids: this.newCategory.ancestor_ids,
        parent_id: this.newCategory.parent_id,
        locale: {
          title: this.newCategory.locale.title,
          description: this.newCategory.locale.description,
          seo_title: this.newCategory.locale.seo_title,
          summary: this.newCategory.locale.summary,
          seo_description: this.newCategory.locale.seo_description,
          use_seo_values: this.newCategory.locale.use_seo_values
        }
      };
      if (this.isEditMode) {
        dataToPost.id = this.newCategory._id;
      }
      axios.post(this.isEditMode  ? 'http://localhost:4130/api/v1/category/update': 'http://localhost:4130/api/v1/category/save', dataToPost)
        .then((response) => {
          console.log(response);
          if (!response.data.success) {
            alert(response.data.message);
            return;
          }
          alert(response.data.message);
          this.isEditMode = false;
          this.showTable = true;
          // Reload categories after adding a new category
          this.fetchCategories();
          // Reset form data
          this.newCategory = {
            path: '',
            id: '',
            slug: '',
            ancestor_ids: '',
            parent_id: '',
            locale: {
              title: '',
              description: '',
              seo_title: '',
              summary: '',
              seo_description: '',
              use_seo_values: ''
            }
          };
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
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
