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
        prop="productName"
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
import { getOrderInventory } from "../../../api/orderInventory";

export default {
  data() {
    return {
      tableData: null,
      orderId: 0,
    };
  },
  created() {
    var url = new URL(document.URL);
    var id = url.searchParams.get("id");
    if (id != undefined) {
      this.orderId = id;
    }
  },
  async mounted() {
    await this.getOrderInventory();
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
    async getOrderInventory() {
      try {
        var response = await getOrderInventory(this.orderId);
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