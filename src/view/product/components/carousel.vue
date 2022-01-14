<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
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
import axios from "axios";

export default {
  data() {
    return {
      categories: null,
      imagePath: "~/img/",
      range: 0,
      price: 0,
    };
  },
  mounted() {
    axios
      .get("http://localhost:5002/api/Category/1")
      .then((response) => {
        this.categories = response.data.$values;
        this.categories.forEach((item) => {
          item.img = this.imagePath + item.id;
          item.url = item.id;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  watch: {
    range: function (val) {
      this.range = val;
      this.price = this.range * 100;
    },
    price: function (val) {
      this.range = val / 100;
      this.price = val;
    },
  },
};
</script>