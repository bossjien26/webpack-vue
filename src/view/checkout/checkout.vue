<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="確認資訊"></el-step>
    </el-steps>

    <CartList></CartList>
    <Information
      v-show="active == 0"
      @isFormRule="handleIsFormRule($event)"
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
    <el-button
      style="margin-top: 12px"
      :disabled="active === 0"
      @click="previous"
      >上一步</el-button
    >
    <el-button
      style="margin-top: 12px"
      v-loading.fullscreen.lock="fullscreenLoading"
      :disabled="!isFormRule"
      @click="next"
      >{{ nextText }}</el-button
    >
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
import { orderDeliveryInsert } from "../../api/orderDelivery";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      active: 0,
      isFormRule: false,
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
      fullscreenLoading: false,
      nextText: "下一步",
    };
  },
  methods: {
    async next() {
      if (this.isFormRule) {
        if (this.active >= 1) {
          this.nextText = "送出";
        }

        if (this.active == 2) {
          await this.orderInsert();
        }
        if (this.active < 2) {
          this.active++;
        }
      }
    },
    previous() {
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
    },
    async orderInsert() {
      this.fullscreenLoading = true;
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
        await this.orderDeliveryInsert(data.id);
        await this.orderPayInsert(data.id);
        this.$notify({
          title: "Success",
          message: "Success Create Order!",
          type: "success",
        });
        this.$router.push({ path: this.redirect || "/order" });
      } catch (error) {
        console.log(error);
        this.$message({
          showClose: true,
          message: "Error",
          type: "error",
        });
      }
      this.fullscreenLoading = false;
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
    async orderDeliveryInsert(id) {
      await orderDeliveryInsert({
        orderId: id,
        type: this.information.selectedDelivery.type,
      });
    },
    handleIsFormRule: function (data) {
      this.isFormRule = data;
    },
  },
  components: { CartList, Information, Description, Payment },
};
</script>