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
          no-data-text="no data"
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

    <el-row>
      <el-input-number
        v-model="quantity"
        :min="1"
        :max="10"
        class="mt-5"
      ></el-input-number>
    </el-row>
    <el-row>
      <el-button
        class="mt-5"
        @click="addCart"
        type="primary"
        :disabled="!IsLogin"
        >Add Cart</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { getProductSpecification } from "../../../api/productSpecification";
import { addCart } from "../../../api/cart";

export default {
  created: function () {
    const queryString = require("query-string");
    const parsed = queryString.parse(location.search);
    if (parsed.id != undefined) {
      this.productId = parsed.id;
    }
    this.IsLogin = this.$store.state.user.token != undefined ? true : false;
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
      IsLogin: false,
    };
  },
  async mounted() {
    try {
      const response = await getProductSpecification(this.productId, [0], [0]);
      this.specifications = response.data.$values;
    } catch (error) {
      console.log(error);
    }
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
      this.getSpecification(rowId);
    },
    async getSpecification(specificationId) {
      try {
        const response = await getProductSpecification(
          this.productId,
          [specificationId],
          this.changeSpecification
        );
        if (typeof response.data.quantity !== "number") {
          this.specifications = response.data.$values;
        } else {
          this.inventoryId = response.data.id;
          this.quantity = response.data.quantity;
        }
      } catch (error) {}
    },
    async addCart() {
      if (!this.IsLogin) {
        this.message("請先登入", "warning");
      } else {
        try {
          const response = await addCart(
            this.inventoryId,
            this.quantity,
            this.$store.state.user.token
          );
          if (response.status == "201") {
            this.message("success add cart", "success");
          } else {
            this.message(response.data, "error");
          }
        } catch (error) {
          console.log(error);
          this.message("Oops,this is error message", "error");
        }
      }
    },
    message(message, type) {
      this.$message({
        message: message,
        type: type,
      });
    },
  },
};
</script>
