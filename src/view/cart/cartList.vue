<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <template slot="empty">
      <span>no data</span>
    </template>
    <el-table-column prop="$id" header-align="center" align="center" label="#">
    </el-table-column>
    <el-table-column
      prop="name"
      header-align="center"
      align="center"
      label="Name"
    >
    </el-table-column>
    <el-table-column
      prop="scope"
      header-align="center"
      align="center"
      label="Quality"
    >
      <template slot-scope="scope">
        <el-input-number
          v-model="scope.row.quantity"
          @change="handleChange(scope.row.inventoryId, scope.row.quantity)"
          :min="1"
          :max="10"
        ></el-input-number>
      </template>
    </el-table-column>

    <el-table-column
      header-align="center"
      align="center"
      prop="price"
      label="Price"
    >
    </el-table-column>

    <el-table-column
      header-align="center"
      align="center"
      prop="scope"
      label="Total"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.price * scope.row.quantity }}</span>
      </template>
    </el-table-column>

    <el-table-column
      header-align="right"
      align="right"
      prop="scope"
      label="label"
      width="120"
    >
      <template slot-scope="scope">
        <span class="el-dropdown-link">
          <i
            class="el-icon-delete"
            @click="deleteCart(scope.row.inventoryId)"
          ></i>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
import { getCart, deleteCart } from "../../api/cart";

export default {
  data() {
    return {
      tableData: null,
      IsLogin: false,
    };
  },
  created() {
    this.IsLogin = this.$store.state.user.token != undefined ? true : false;
  },
  async mounted() {
    await this.getCart();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleDetails(index, row) {
      console.log(index, row);
    },
    handleChange(id, value) {
      console.log(id);
    },
    async getCart() {
      try {
        var response = await getCart(1, this.$store.state.user.token);
        this.tableData = response.data.$values;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCart(inventoryId) {
      try {
        await deleteCart(inventoryId, this.$store.state.user.token);
        this.reload();
      } catch (error) {
        console.log(error);
        this.$message({
          message: "Error",
          type: "error",
        });
      }
    },
  },
};
</script>