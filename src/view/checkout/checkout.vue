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
    <Description :description="information" v-show="active == 2"></Description>
    <el-button style="margin-top: 12px" @click="previous">上一步</el-button>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>

<script>
import CartList from "./components/cartList.vue";
import Information from "./components/information.vue";
import Description from "./components/description.vue";
import Payment from "./components/payment.vue";

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
      },
      payment: {
        years: [],
        selectedYear: "",
        months: [],
        selectedMonth: "",
        value: "",
        secret: "",
        card1: "",
        card2: "",
        card3: "",
      },
    };
  },
  methods: {
    next() {
      if (this.active > 2) {
        this.active = 0;
      } else {
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
    },
    handleCheckoutInformation: function (data) {
      this.information = data;
    },
    handlePayment: function (data) {
      this.payment = data;
      console.log(data);
    },
  },
  components: { CartList, Information, Description, Payment },
};
</script>