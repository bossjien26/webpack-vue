<template>
  <div>
    <div class="row" v-for="(specification, key) in specifications" :key="key">
      <div class="col-6 mt-2 mb-2">
        <span>{{ specification.value.name }}</span>
      </div>
      <div class="col-6 mt-2 mb-2">
        <el-select
          filterable
          placeholder="Select"
          @change="selectGet"
          v-model="changeSpecification[key]"
        >
          <el-option
            v-for="(specificationContent, index) in specification.value
              .specificationContentResponses.$values"
            :key="index"
            :label="specificationContent.name"
            :value="specification.value.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  created: function () {
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);
    if (parsed.id != undefined) {
      this.productId = parsed.id;
    }
  },
  data() {
    return {
      product: null,
      productName: "",
      quantity: 0,
      productId: 0,
      specifications: null,
      PreviousSpecifications: [4],
      changeSpecification: [],
      inventoryId: 0,
    };
  },
  mounted() {
    axios
      .post(
        "http://localhost:5002/api/ProductSpecification/nextSpecification",
        {
          ProductId: this.productId,
          specifications: [0],
          SpecificationContents: [0],
        }
      )
      .then((response) => {
        this.specifications = response.data.$values;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    greet: function (event) {
      if (event == 0) {
        if (this.quantity > 0) {
          this.quantity -= 1;
        }
      } else {
        return (this.quantity += 1);
      }
    },
    selectGet: function (rowId) {
      console.log(rowId);
      //   var selected =
      //     "rowId: " + rowId + ", target.value: " + event.target.value;
      this.getSpecification(rowId);
    },
    getSpecification: function (specificationId) {
      axios
        .post(
          "http://localhost:5002/api/ProductSpecification/nextSpecification",
          {
            ProductId: this.productId,
            specifications: [specificationId],
            SpecificationContents: this.changeSpecification,
          }
        )
        .then((response) => {
          if (typeof response.data.quantity !== "number") {
            this.specifications = response.data.$values;
          } else {
            this.inventoryId = response.data.id;
            this.quantity = response.data.quantity;
          }
        });
    },
    addCart: function () {
      axios
        .post(
          "http://localhost:5002/api/Cart",
          {
            InventoryId: this.inventoryId,
            Quantity: 1,
            Attribute: 1,
          },
          {
            headers: {
              Authorization: `Basic ${identification.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          sweetAlert("Cart", "Success add to shopping cart", "success");
        });
    },
  },
};
</script>
