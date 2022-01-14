<template>
  <div>
    <div
      class="mt-3"
      v-for="(productCategories, index) in products"
      :key="index"
    >
      <b-card-group deck>
        <div
          v-for="(productCategory, productIndex) in productCategories"
          :key="productIndex"
        >
          <b-card
            v-bind:title="productCategory.name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              {{ productCategory.describe }}
            </b-card-text>

            <b-button v-bind:href="productCategory.href" variant="primary"
              >Detail</b-button
            >
          </b-card>
        </div>
      </b-card-group>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      products: [],
      imagePath: "~/img/",
      categoryId: 1,
    };
  },
  created: function () {
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);
    if (parsed.categoryId != undefined) {
      this.categoryId = parsed.categoryId;
    }
  },
  async mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      var response = await axios.get(
        "http://localhost:5002/api/Product/category/" + this.categoryId + "/1"
      );
      try {
        var product = [];
        var count = 0;
        response.data.$values.forEach((item, index) => {
          item.img = this.imagePath + item.id;
          item.href = "/product/detail?id=" + item.id;
          if (item.id != null) {
            if (count % 3 == 0 && count != 0) {
              this.products.splice(product, 1);

              product = [];
            } else {
              product.push(item);
            }
            count++;
          }
        });
        this.products.push(product);
      } catch (error) {}
    },
  },
};
</script>