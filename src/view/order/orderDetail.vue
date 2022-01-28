<template>
  <div>
    <inventoryList :orderInfo="orderInfo" />
    <Description :orderInfo="orderInfo" />
  </div>
</template>

<script>
import { getOrderDetail } from "../../api/order";
import Description from "./components/description.vue";
import inventoryList from "./components/inventoryList.vue";
import dayjs from "dayjs";

export default {
  data() {
    return {
      orderInfo: {
        id: 0,
      },
    };
  },
  components: {
    Description,
    inventoryList,
  },
  created: function () {
    var url = new URL(document.URL);
    var id = url.searchParams.get("id");
    if (id != undefined) {
      this.id = id;
    }
  },
  async mounted() {
    await this.getOrderDetail();
  },
  methods: {
    async getOrderDetail() {
      try {
        const { data } = await getOrderDetail(this.id);
        this.orderInfo = data;
        this.orderInfo.createAt = dayjs(this.orderInfo.createAt).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } catch (error) {
        console.log(error);
        this.message("error", "error");
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