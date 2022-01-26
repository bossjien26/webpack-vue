<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <CartList></CartList>
    <Information
      v-show="active == 0"
      @checkoutInformation="handleCheckoutInformation($event)"
    ></Information>
    <Payment
      @checkoutPayment="handlePayment($event)"
      v-show="active == 1"
    ></Payment>
    <Description
      :descriptionInformation="information"
      :descriptionPayment="payment"
      v-show="active == 2"
    ></Description>
    <el-button style="margin-top: 12px" @click="previous">上一步</el-button>
    <el-button style="margin-top: 12px" @click="next">{{ nextText }}</el-button>
  </div>
</template>

<script>
import CartList from "./components/cartList.vue";
import Information from "./components/information.vue";
import Description from "./components/description.vue";
import Payment from "./components/payment.vue";
import { orderInsert } from "../../api/order";
import { orderInventoryInsert } from "../../api/orderInventory";
import { orderPayInsert } from "../../api/orderPay";
export default {
  data() {
    return {
      active: 0,
      information: {
        country: "",
        city: "",
        street: "",
        recipient: "",
        recipientMail: "",
        recipientPhone: "",
        sender: "",
        selectedDelivery: {
          title: "",
          type: "",
        },
      },
      payment: {
        years: [],
        selectedYear: "",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        selectedMonth: "",
        value: "",
        secret: "",
        card1: "",
        card2: "",
        card3: "",
        selectedPayment: {
          title: "",
          type: "",
        },
      },
      nextText: "下一步",
    };
  },
  methods: {
    async next() {
      console.log(this.active);

      if (this.active >= 1) {
        this.nextText = "送出";
      }

      if (this.active == 2) {
        await this.orderInsert();
      }
      if (this.active < 2) {
        this.active++;
      }
    },
    previous() {
      console.log(this.active);

      if (this.active <= 0) {
        this.active = 0;
      } else {
        this.active--;
      }
      this.nextText = "下一步";
    },
    handleCheckoutInformation: function (data) {
      this.information = data;
    },
    handlePayment: function (data) {
      this.payment = data;
      console.log(data);
    },
    async orderInsert() {
      const order = {
        country: this.information.country,
        city: this.information.city,
        street: this.information.street,
        recipient: this.information.recipient,
        recipientMail: this.information.recipientMail,
        recipientPhone: this.information.recipientPhone,
        sender: this.information.sender,
      };
      try {
        var { data } = await orderInsert(order);
        await this.orderInventoryInsert(data.id);
        await this.orderPayInsert(data.id);
      } catch (error) {
        console.log(error);
        this.$message({
          showClose: true,
          message: "Error",
          type: "error",
        });
      }
    },
    async orderInventoryInsert(id) {
      await orderInventoryInsert({ orderId: id });
    },
    async orderPayInsert(id) {
      await orderPayInsert({
        orderId: id,
        Terms: this.payment.selectedPayment.type,
      });
    },
  },
  components: { CartList, Information, Description, Payment },
};
</script>