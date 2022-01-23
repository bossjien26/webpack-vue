<template>
  <div class="mt-5">
    <el-card>
      <div slot="header">填寫送貨資訊</div>
      <b-row>
        <b-col cols="6">
          <span>居住國家：</span>
          <el-input v-model="information.country" placeholder="國家"></el-input>
        </b-col>
        <b-col cols="6">
          <span>居住城市：</span>
          <el-input v-model="information.city" placeholder="城市"></el-input>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>聯絡地址：</span>
          <el-input v-model="information.street" placeholder="地址"></el-input>
        </b-col>
      </b-row>

      <el-divider></el-divider>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>寄件人姓名：</span>
          <el-input
            v-model="information.sender"
            placeholder="寄件人姓名"
          ></el-input>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>收件人姓名：</span>
          <el-input
            v-model="information.recipient"
            placeholder="收件人姓名"
          ></el-input>
        </b-col>
        <b-col cols="6">
          <span>收件人Mail：</span>
          <el-input
            v-model="information.recipientMail"
            placeholder="收件人Mail"
          ></el-input>
        </b-col>
      </b-row>

      <el-divider></el-divider>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>收件人手機：</span>
          <el-input
            v-model="information.recipientPhone"
            placeholder="收件人手機"
          ></el-input>
        </b-col>
      </b-row>
    </el-card>

    <el-card class="mt-5">
      <div slot="header">選擇送貨方式</div>
      <div>
        <div v-for="(delivery, index) in deliveryInfo" :key="index">
          <div v-if="index == 1" class="mt-4"></div>
          <el-radio
            @click.native.capture="handleChange(delivery.title, delivery.type)"
            >{{ delivery.title }}</el-radio
          >
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                {{ delivery.introduce }}<i class="header-icon el-icon-info"></i>
              </template>
              <div>
                {{ delivery.content }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-card>
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
      deliveryInfo: [],
    };
  },
  watch: {
    information: {
      handler: function () {
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
      this.selectedDelivery.title = title;
      this.selectedDelivery.type = type;
    },
  },
};
</script>