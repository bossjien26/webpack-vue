<template>
  <div class="mt-3">
    <el-card>
      <div slot="header">訂購資訊</div>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="寄件人">
          <el-tag size="small">{{ orderInfo.sender }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="收件人姓名"
          ><el-tag type="success">
            {{ orderInfo.recipient }}
          </el-tag></el-descriptions-item
        >
        <el-descriptions-item label="收件人手機">{{
          orderInfo.recipientPhone
        }}</el-descriptions-item>
        <el-descriptions-item label="收件人信箱" :span="2">{{
          orderInfo.country + " " + orderInfo.city
        }}</el-descriptions-item>
        <el-descriptions-item label="國家">{{
          orderInfo.country
        }}</el-descriptions-item>
        <el-descriptions-item label="城市">{{
          orderInfo.city
        }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{
          orderInfo.street
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="mt-4">
      <div slot="header">物流資訊</div>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="方式">{{
          orderDelivery.title
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- el-card class="mt-4">
      <div slot="header">付款資訊</div>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="方式">{{
          orderInfo.selectedPayment.title
        }}</el-descriptions-item>
        <el-descriptions-item
          v-if="orderInfo.selectedPayment.type == 2"
          label="信用卡後三碼"
          >{{ orderInfo.secret }}</el-descriptions-item
        >
        <el-descriptions-item
          v-if="orderInfo.selectedPayment.type == 2"
          label="到期卡片年份"
        >
          {{ orderInfo.selectedYear }}
        </el-descriptions-item>
        <el-descriptions-item
          v-if="orderInfo.selectedPayment.type == 2"
          label="到期卡片月份"
          >{{ orderInfo.selectedMonth }}</el-descriptions-item
        >
        <el-descriptions-item
          v-if="orderInfo.selectedPayment.type == 2"
          label="信用卡卡號"
          >{{
            orderInfo.card1 + "-" + orderInfo.card2 + "-" + orderInfo.card3
          }}</el-descriptions-item
        >
      </el-descriptions>
    </!-->
  </div>
</template>

<script>
import { getOrderDelivery } from "../../../api/orderDelivery";
import { getOrderPay } from "../../../api/orderPay";
export default {
  data() {
    return {
      orderDelivery: { type: null },
      orderPay: {},
      orderId: 0,
    };
  },
  props: {
    orderInfo: { type: Object },
  },
  created() {
    var url = new URL(document.URL);
    var id = url.searchParams.get("id");
    if (id != undefined) {
      this.orderId = id;
    }
  },
  async mounted() {
    await this.getOrderDelivery();
  },
  methods: {
    async getOrderDelivery() {
      try {
        console.log(this.orderId);
        const { data } = await getOrderDelivery(this.orderId);
        this.orderDelivery = data;
      } catch (error) {}
    },
    async getOrderPay() {
      try {
        const { data } = await getOrderPay(this.orderInfo.id);
        this.orderPay = data;
      } catch (error) {}
    },
  },
};
</script>