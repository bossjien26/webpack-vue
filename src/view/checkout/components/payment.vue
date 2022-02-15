<template>
  <div class="mt-3">
    <el-card>
      <div slot="header">付款資訊</div>
      <el-form
        :rules="paymentRules"
        ref="basicPaymentType"
        :model="basicPaymentType"
        label-width="100px"
      >
        <el-form-item label-width="50" prop="type">
          <el-radio-group
            v-model="basicPaymentType.type"
            style="display: block"
          >
            <div v-for="(paymentInfo, index) in paymentInfos" :key="index">
              <div v-if="index == 1" class="mt-4"></div>
              <el-radio
                @click.native.capture="
                  handleChange(paymentInfo.title, paymentInfo.type)
                "
                :label="paymentInfo.type"
                >{{ paymentInfo.title }}</el-radio
              >
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    {{ paymentInfo.introduce
                    }}<i class="header-icon el-icon-info"></i>
                  </template>
                  <div>
                    {{ paymentInfo.content }}
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-form
        :rules="creditRules"
        ref="basicPayment"
        :model="basicPayment"
        label-width="100px"
        class="demo-payment"
      >
        <div v-show="basicPaymentType.type == 2">
          <b-row class="mb-3">
            <b-col>
              <el-form-item label-width="50" prop="card1">
                <el-input
                  v-model="basicPayment.card1"
                  maxlength="4"
                  placeholder="信用卡號碼 1-4"
                ></el-input>
              </el-form-item>
            </b-col>
            <b-col>
              <el-form-item label-width="50" prop="card2">
                <el-input
                  v-model="basicPayment.card2"
                  maxlength="4"
                  placeholder="信用卡號碼 5-8"
                ></el-input>
              </el-form-item>
            </b-col>
            <b-col>
              <el-form-item label-width="50" prop="card3">
                <el-input
                  v-model="basicPayment.card3"
                  maxlength="4"
                  placeholder="信用卡號碼 8-12"
                ></el-input>
              </el-form-item>
            </b-col>
          </b-row>
          <b-row>
            <el-form-item label-width="50" prop="secret">
              <b-col>
                <el-input
                  v-model="basicPayment.secret"
                  maxlength="3"
                  placeholder="信用卡後三碼"
                ></el-input>
              </b-col>
            </el-form-item>
            <b-col>
              <el-form-item label-width="50" prop="selectedYear">
                <el-select
                  v-model="basicPayment.selectedYear"
                  placeholder="選擇到期卡片年份"
                  no-data-text="no data"
                >
                  <el-option
                    v-for="year in basicPayment.years"
                    :key="year"
                    :label="year"
                    :value="year"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </b-col>
            <b-col>
              <el-form-item label-width="50" prop="selectedMonth">
                <el-select
                  v-model="basicPayment.selectedMonth"
                  placeholder="選擇到期卡片月份"
                  no-data-text="no data"
                >
                  <el-option
                    v-for="month in basicPayment.months"
                    :key="month"
                    :label="month"
                    :value="month"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </b-col>
          </b-row>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import { getPaymentInfo } from "../../../api/payment";

export default {
  data() {
    return {
      basicPayment: {
        years: [],
        selectedYear: "",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        selectedMonth: "",
        secret: "",
        card1: "",
        card2: "",
        card3: "",
      },
      basicPaymentType: { type: "" },
      payment: {
        selectedYear: "",
        selectedMonth: "",
        secret: "",
        card1: "",
        card2: "",
        card3: "",
        selectedPayment: {
          title: "",
          type: "",
        },
      },
      paymentInfos: [],
      paymentRules: {
        type: [{ required: true, message: "請選擇付款方式", trigger: "blur" }],
      },
      creditRules: {
        selectedYear: [
          { required: true, message: "請選擇到期卡片年份", trigger: "blur" },
        ],
        selectedMonth: [
          { required: true, message: "請選擇到期卡片月份", trigger: "blur" },
        ],
        card1: [
          { required: true, message: "請輸入信用卡號碼1-4", trigger: "blur" },
        ],
        card2: [
          { required: true, message: "請輸入信用卡號碼5-8", trigger: "blur" },
        ],
        card3: [
          { required: true, message: "請輸入信用卡號碼8-12", trigger: "blur" },
        ],
        secret: [
          { required: true, message: "請輸入信用卡後三碼", trigger: "blur" },
        ],
      },
      isPaymentRule: false,
    };
  },
  async created() {
    const nowYear = new Date().getFullYear();
    for (let index = 0; index < 11; index++) {
      this.basicPayment.years[index] = nowYear + index;
    }
    await this.getPaymentInfo();
  },
  watch: {
    basicPayment: {
      handler: function () {
        this.emitParent();
      },
      deep: true,
    },
    basicPaymentType: {
      handler: function () {
        this.emitParent();
      },
      deep: true,
    },
  },
  methods: {
    async getPaymentInfo() {
      try {
        const { data } = await getPaymentInfo();
        this.paymentInfos = data.$values;
      } catch (error) {
      }
    },
    handleChange(title, type) {
      this.payment.selectedPayment.title = title;
      this.basicPaymentType.type = type;
    },
    transferPayment() {
      this.payment.selectedPayment.type = this.basicPaymentType.type;
      this.payment.selectedYear = this.basicPayment.selectedYear;
      this.payment.selectedMonth = this.basicPayment.selectedMonth;
      this.payment.card1 = this.basicPayment.card1;
      this.payment.card2 = this.basicPayment.card2;
      this.payment.card3 = this.basicPayment.card3;
      this.payment.secret = this.basicPayment.secret;
    },
    emitParent() {
      this.transferPayment();
      var isInformation = false;
      this.$refs.basicPaymentType.validate((valid) => {
        isInformation = valid;
      });
      var isCreditRule = false;
      this.$refs.basicPayment.validate((valid) => {
        isCreditRule = valid;
      });
      this.isPaymentRule =
        isInformation === false ||
        (isInformation === true &&
          this.payment.selectedPayment.type === 2 &&
          isCreditRule === false)
          ? false
          : true;
      this.$emit("isPaymentRule", this.isPaymentRule);
      this.$emit("checkoutPayment", this.payment);
    },
  },
};
</script>