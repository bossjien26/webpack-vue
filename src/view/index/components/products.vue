<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="product in products" :key="product.id" :item="product">
        <h3 class="medium">{{ product.name }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>


<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import carousel from "vue-owl-carousel";

Vue.use(VueAxios, axios);

export default {
  name: "Product",
  //   components: { carousel },
  // el: "#products",
  data() {
    return {
      products: null,
      imagePath: "~/img/",
    };
  },
  mounted() {
    axios
      .get("http://localhost:5002/api/Product/1")
      .then((response) => {
        this.products = response.data.$values;

        this.products.forEach((item) => {
          item.img = this.imagePath + item.id;
        });
      })
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
  },
};
</script>