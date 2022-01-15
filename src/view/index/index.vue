<template>
  <div>
    <b-jumbotron header="Home" />
    <Product></Product>
  </div>
</template>

<script>
import Product from "./components/products.vue";

export default {
  components: {
    Product,
  },
};
</script>
