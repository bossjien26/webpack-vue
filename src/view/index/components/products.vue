<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item
        v-for="product in products"
        :key="product.id"
        :item="product"
      >
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
import { getProductList } from "../../../api/product";

export default {
  name: "Product",
  data() {
    return {
      products: null,
      imagePath: "~/img/",
    };
  },
  async mounted() {
    await this.getProductList();
  },
  methods: {
    async getProductList() {
      try {
        var response = await getProductList(1);
        this.products = response.data.$values;

        this.products.forEach((item) => {
          item.img = imagePath + item.id;
        });

        this.products.forEach((item) => {
          item.img = imagePath + item.id;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>