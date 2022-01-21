<template>
  <div class="mt-5 mb-5">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>分類</el-breadcrumb-item>
      <el-breadcrumb-item v-if="category.id != null"
        ><a :href="'/product?categoryId=' + category.id">{{
          category.name
        }}</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
    </el-breadcrumb>
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
import { getProductDetail } from "../../api/product";
import { getCategoryDetail } from "../../api/category";
import Carousel from "./components/carousel.vue";
import productSelect from "./components/productSelect.vue";
import store from "../../store";

export default {
  store,
  components: { Carousel, productSelect },
  created: function () {
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);

    if (parsed.id != undefined) {
      this.productId = parsed.id;
    }
    if (document.referrer != "") {
      var url = new URL(document.referrer);
      var beforeParsed = url.searchParams.get("categoryId");

      if (beforeParsed != undefined) {
        this.categoryId = beforeParsed;
      }
    }
  },
  async mounted() {
    this.getCategory();
    this.getProduct();
  },
  data() {
    return {
      product: { name: "", describe: "", information: "" },
      imagePath: "~/img/",
      productId: 0,
      activeName: "first",
      category: { name: "" },
      categoryId: 0,
    };
  },
  methods: {
    async getProduct() {
      try {
        let response = await getProductDetail(this.productId);
        this.product = response.data.product;
      } catch (err) {
        console.log(err);
      }
    },
    async getCategory() {
      try {
        var response = await getCategoryDetail(this.categoryId);
        this.category = response.data;
      } catch (error) {}
    },
  },
};
</script>
