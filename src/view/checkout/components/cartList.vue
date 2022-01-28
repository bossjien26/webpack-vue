<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      ref="table"
    >
      <template slot="empty">
        <span>no data</span>
      </template>

      <el-table-column header-align="center" align="center" label="#">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="Name"
      >
      </el-table-column>
      <el-table-column
        prop="quantity"
        header-align="center"
        align="center"
        label="Quantity"
      >
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
    </el-table>
  </div>
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
import { getCart } from "../../../api/cart";

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
    async getCart() {
      try {
        var response = await getCart(1, this.$store.state.user.token);
        this.tableData = response.data.$values;
      } catch (error) {
        console.log(error);
      }
    },
    message(message, type) {
      this.$message({
        showClose: true,
        message: message,
        type: type,
      });
    },
  },
};
</script>