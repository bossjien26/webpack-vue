<template>
  <div class="mt-5">
    <el-form
      class="information"
      ref="information"
      :rules="informationRules"
      :model="information"
      label-width="80px"
    >
      <el-card>
        <div slot="header">填寫送貨資訊</div>
        <b-row>
          <b-col cols="6">
            <el-form-item label="居住國家：" label-width="50" prop="country">
              <el-input
                v-model="information.country"
                placeholder="國家"
              ></el-input>
            </el-form-item>
          </b-col>
          <b-col cols="6">
            <el-form-item label="居住城市：" label-width="50" prop="city">
              <el-input
                v-model="information.city"
                placeholder="城市"
              ></el-input>
            </el-form-item>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col cols="6">
            <el-form-item label="聯絡地址：" label-width="50" prop="street">
              <el-input
                v-model="information.street"
                placeholder="地址"
              ></el-input>
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider></el-divider>

        <b-row class="mt-2">
          <b-col cols="6">
            <el-form-item label="寄件人姓名：" label-width="50" prop="sender">
              <el-input
                v-model="information.sender"
                placeholder="寄件人姓名"
              ></el-input>
            </el-form-item>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col cols="6">
            <el-form-item
              label="收件人姓名："
              label-width="50"
              prop="recipient"
            >
              <el-input
                v-model="information.recipient"
                placeholder="收件人姓名"
              ></el-input>
            </el-form-item>
          </b-col>
          <b-col cols="6">
            <el-form-item
              label="收件人Mail："
              label-width="50"
              prop="recipientMail"
            >
              <el-input
                v-model="information.recipientMail"
                placeholder="收件人Mail"
              ></el-input>
            </el-form-item>
          </b-col>
        </b-row>

        <el-divider></el-divider>

        <b-row class="mt-2">
          <b-col cols="6">
            <el-form-item
              label="收件人手機："
              label-width="50"
              prop="recipientPhone"
            >
              <el-input
                v-model="information.recipientPhone"
                placeholder="收件人手機"
              ></el-input>
            </el-form-item>
          </b-col>
        </b-row>
      </el-card>

      <el-card class="mt-5">
        <div slot="header">
          <span style="color: red; font-size: 12px">*</span> 選擇送貨方式
        </div>
        <div>
          <el-form-item label-width="50" prop="selectedDelivery.type">
            <el-radio-group
              v-model="information.selectedDelivery.type"
              style="display: block"
            >
              <div v-for="(delivery, index) in deliveryInfo" :key="index">
                <div v-if="index == 1" class="mt-4"></div>
                <el-radio
                  @click.native.capture="
                    handleChange(delivery.title, delivery.type)
                  "
                  :label="delivery.type"
                  >{{ delivery.title }}</el-radio
                >
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      {{ delivery.introduce
                      }}<i class="header-icon el-icon-info"></i>
                    </template>
                    <div>
                      {{ delivery.content }}
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { getDeliveryInfo } from "../../../api/delivery";

export default {
  data() {
    return {
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
      isFormRule: false,
      deliveryInfo: [],
      informationRules: {
        country: [
          { required: true, message: "請填寫居住國家", trigger: "blur" },
        ],
        city: [{ required: true, message: "請輸入居住城市", trigger: "blur" }],
        street: [
          { required: true, message: "請輸入聯絡地址", trigger: "blur" },
        ],
        recipient: [
          { required: true, message: "請輸入收件人姓名", trigger: "blur" },
        ],
        recipientMail: [
          { required: true, message: "請輸入收件人Mail", trigger: "blur" },
        ],
        recipientPhone: [
          { required: true, message: "請輸入收件人手機", trigger: "blur" },
        ],
        sender: [
          { required: true, message: "請輸入寄件人姓名", trigger: "blur" },
        ],
        selectedDelivery: {
          type: [
            { required: true, message: "請選擇送貨方式", trigger: "change" },
          ],
        },
      },
    };
  },
  watch: {
    information: {
      handler: function () {
        this.$refs.information.validate((valid) => {
          this.isFormRule = valid;
        });
        this.$emit("isFormRule", this.isFormRule);
        this.$emit("checkoutInformation", this.information);
      },
      deep: true,
    },
  },
  async mounted() {
    await this.getDeliveryInfo();
  },
  methods: {
    async getDeliveryInfo() {
      try {
        const { data } = await getDeliveryInfo();
        this.deliveryInfo = data.$values;
      } catch (error) {}
    },
    handleChange(title, type) {
      this.information.selectedDelivery.title = title;
      this.information.selectedDelivery.type = type;
    },
  },
};
</script>

<style scoped>
.information >>> .el-form-item__content {
  margin-left: 0px !important;
}
</style>