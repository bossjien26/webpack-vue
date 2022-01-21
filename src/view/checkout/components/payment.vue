<template>
  <div class="mt-3">
    <el-card>
      <div slot="header">信用卡付款資訊</div>
      <b-row class="mb-3">
        <b-col>
          <el-input
            v-model="payment.card1"
            placeholder="信用卡號碼 1-4"
          ></el-input>
        </b-col>
        <b-col>
          <el-input
            v-model="payment.card2"
            placeholder="信用卡號碼 5-8"
          ></el-input>
        </b-col>
        <b-col>
          <el-input
            v-model="payment.card3"
            placeholder="信用卡號碼 8-12"
          ></el-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <el-input
            v-model="payment.secret"
            placeholder="信用卡後三碼"
          ></el-input>
        </b-col>
        <b-col>
          <el-select
            v-model="payment.selectedYear"
            placeholder="選擇到期卡片年份"
          >
            <el-option
              v-for="year in payment.years"
              :key="year.value"
              :label="year.label"
              :value="year.value"
              no-data-text="no data"
            >
            </el-option>
          </el-select>
        </b-col>
        <b-col>
          <el-select
            v-model="payment.selectedMonth"
            placeholder="選擇到期卡片月份"
          >
            <el-option
              v-for="month in payment.months"
              :key="month.value"
              :label="month.label"
              :value="month.value"
              no-data-text="no data"
            >
            </el-option>
          </el-select>
        </b-col>
      </b-row>
    </el-card>
  </div>
</template>

<script>
import { getPaymentInfo } from "../../../api/payment";

export default {
  data() {
    return {
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
      payment: [],
    };
  },
  watch: {
    payment: {
      handler: function () {
        this.$emit("checkoutPayment", this.payment);
      },
      deep: true,
    },
  },
  methods: {
    async getPaymentInfo() {
      try {
        this.payment = await getPaymentInfo();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>