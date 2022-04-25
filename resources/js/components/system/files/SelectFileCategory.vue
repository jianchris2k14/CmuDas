<template>
  <div class="row">
      <div class="col-lg-12">
          <v-select
          :items="category"
          item-text="category"
          item-value="category_id"
          label="Select Category"
          @change="onChangeCategory"
          dense
        >
        </v-select>
      </div>
        

  </div>
</template>
<script>

export default {

  data() {
    return {
        defaultSelect:{
            category_id:0,
        },
        peste:this.$store.state.filecategory.filecategory,
        kolera:null,
        selected:null,
    };
  },
  computed: {
    category() {
        const categ = this.$store.state.filecategory.filecategory
        return categ
    }


  },
  methods: {
    onChangeCategory(e) {
      this.category_id = e;
      this.$emit("selectcategory", e);
    },
  },

};
</script>
<style scoped>
@media print {
  .hidden-print {
    display: none !important;
  }
}
</style>
