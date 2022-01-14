<template>
  <div class="container mt-5 mb-5">
    <b-card-title class="text-center">
      <b-card-text class="mb-5">
        {{ product.name }}
      </b-card-text>
      <div class="row">
        <div class="col-sm-8">
          <Carousel></Carousel>
        </div>
        <div class="col-sm-4">
          <productSelect></productSelect>
        </div>
      </div>
      <div>
        <el-tabs v-model="activeName" class="mt-5">
          <el-tab-pane label="Describe" name="first">{{
            product.describe
          }}</el-tab-pane>
          <el-tab-pane label="Information" name="second">{{
            product.information
          }}</el-tab-pane>
        </el-tabs>
      </div>
    </b-card-title>
  </div>
</template>

<script>
import axios from "axios";
import Carousel from "./components/carousel.vue";
import productSelect from "./components/productSelect.vue";

export default {
  components: { Carousel, productSelect },
  created: function () {
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);
    if (parsed.id != undefined) {
      this.productId = parsed.id;
    }
  },
  async mounted() {
    this.getProduct();
  },
  data() {
    return {
      product: { name: "", describe: "", information: "" },
      imagePath: "~/img/",
      productId: 0,
      activeName: "first",
    };
  },
  methods: {
    async getProduct() {
      try {
        let response = await axios.get(
          "http://localhost:5002/api/Product/detail/" + this.productId
        );
        this.product = response.data.product;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
