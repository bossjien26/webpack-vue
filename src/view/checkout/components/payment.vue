<template>
  <div class="mt-3">
    <el-card>
      <div slot="header">信用卡付款資訊</div>
      <b-row class="mb-3">
        <b-col>
          <el-input
            v-model="payment.card1"
            maxlength="4"
            placeholder="信用卡號碼 1-4"
          ></el-input>
        </b-col>
        <b-col>
          <el-input
            v-model="payment.card2"
            maxlength="4"
            placeholder="信用卡號碼 5-8"
          ></el-input>
        </b-col>
        <b-col>
          <el-input
            v-model="payment.card3"
            maxlength="4"
            placeholder="信用卡號碼 8-12"
          ></el-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <el-input
            v-model="payment.secret"
            maxlength="3"
            placeholder="信用卡後三碼"
          ></el-input>
        </b-col>
        <b-col>
          <el-select
            v-model="payment.selectedYear"
            placeholder="選擇到期卡片年份"
            no-data-text="no data"
          >
            <el-option
              v-for="year in payment.years"
              :key="year"
              :label="year"
              :value="year"
            >
            </el-option>
          </el-select>
        </b-col>
        <b-col>
          <el-select
            v-model="payment.selectedMonth"
            placeholder="選擇到期卡片月份"
            no-data-text="no data"
          >
            <el-option
              v-for="month in payment.months"
              :key="month"
              :label="month"
              :value="month"
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
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        selectedMonth: "",
        value: "",
        secret: "",
        card1: "",
        card2: "",
        card3: "",
      },
    };
  },
  created() {
    const nowYear = new Date().getFullYear();
    for (let index = 0; index < 11; index++) {
      this.payment.years[index] = nowYear + index;
    }
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