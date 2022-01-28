<template>
  <el-table v-loading="loading" :data="tableData" style="width: 100%">
    <template slot="empty">
      <span>no data</span>
    </template>
    <el-table-column header-align="center" align="center" label="#">
      <template slot-scope="scope">
        <span>{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
    <el-table-column label="OrderNumber" prop="id"> </el-table-column>
    <el-table-column label="CreateAt" prop="createAt"> </el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <el-button size="mini" @click="getDetail(scope.row.id)"
          >Detail</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getOrder } from "../../api/order";
import dayjs from "dayjs";

export default {
  data() {
    return {
      tableData: [],
      search: "",
      page: 1,
      loading: true,
    };
  },
  async mounted() {
    await this.getOrder();
  },
  methods: {
    getDetail(orderId) {
      this.$router.push({
        path: this.redirect || "/orderDetail?id=" + orderId,
      });
    },
    async getOrder() {
      try {
        const { data } = await getOrder(this.page);
        this.tableData = data.$values.map((row) => {
          row.createAt = dayjs(row.createAt).format("YYYY-MM-DD HH:mm:ss");
          return row;
        });
      } catch (error) {
        console.log(error);
        this.message("error", "error");
      }
      this.loading = false;
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