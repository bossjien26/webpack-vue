<template>
  <div class="mt-3">
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in orderStatuses"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { getOrderStatuses } from "../../../api/orderStatuses";
import dayjs from "dayjs";

export default {
  data() {
    return {
      orderStatuses: [],
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
    await this.getOrderStatuses();
  },
  methods: {
    async getOrderStatuses() {
      try {
        const { data } = await getOrderStatuses(this.orderId);
        this.orderStatuses = data.$values.map((row) => {
          row.timestamp = dayjs(row.timestamp).format("YYYY-MM-DD HH:mm:ss");
          return row;
        });
      } catch (error) {
        console.log(error);
        this.$message({
          showClose: true,
          message: "Error",
          type: "error",
        });
      }
    },
  },
};
</script>
